import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "llama3-70b-8192",
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
) {
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou must output only a valid JSON ${
      list_output ? "array of objects" : "object"
    } that strictly matches this schema: ${JSON.stringify(output_format)}.

⚠️ Rules:
- No explanation, heading, or introductory text.
- Every key must be enclosed in double quotes.
- All string values must escape internal quotes.
- Escape all internal double quotes inside string values (e.g., use \\").
- Do NOT include any markdown formatting like \`\`\`json.
- Output ONLY the raw JSON string.`;

    if (list_output) {
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
    }

    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
    }

    if (list_input) {
      output_format_prompt += `\nGenerate an array of json, one json for each input element.`;
    }

    if (JSON.stringify(output_format).includes("answer")) {
      system_prompt += `

IMPORTANT: For open-ended questions:
- The 'answer' field must be a complete, grammatically correct sentence carrying the actual answer word as the first key word.
- The actual answer must be the first keyword. Any other keywords in the sentece can not come before the actual answer.
- It must contain the correct keyword naturally within the sentence.
- Do NOT respond with just a word or phrase.
- Format it so it can be turned into a fill-in-the-blank question later.
Example: 
Q. Which city is known as the pink city ?
Instead of "Jaipur", write "aipur is famously known as the Pink City due to its distinctive building color."`;
    }

    const response = await openai.chat.completions.create({
      temperature: temperature,
      model: model,
      messages: [
        {
          role: "system",
          content: system_prompt + output_format_prompt + error_msg,
        },
        { role: "user", content: user_prompt.toString() },
      ],
    });

    const rawRes = response.choices[0].message.content ?? "";

    // Try to extract the first valid JSON array or object from the response
    const match = rawRes.match(
      /(\[\s*\{[\s\S]*\}\s*\])|(\{\s*".*?":[\s\S]*\})/
    );
    let res = match ? match[0] : rawRes;

    // Replace invalid JSON artifacts
    res = res
      .replace(/“|”/g, '"') // smart quotes → straight quotes
      .replace(/(\w)"s\b/g, "$1's") // fix broken `"s` words
      .replace(/(\w)"(\w)/g, "$1'$2"); // fix misquoted contractions like it"s
    // single → double quotes

    if (verbose) {
      console.log(
        "System prompt:",
        system_prompt + output_format_prompt + error_msg
      );
      console.log("\nUser prompt:", user_prompt);
      console.log("\nGPT response:", res);
    }

    try {
      if (res.startsWith("```json")) {
        res = res.replace(/```json|```/g, "").trim();
      } else if (res.startsWith("```")) {
        res = res.replace(/```/g, "").trim();
      }

      let output = JSON.parse(res);

      if (list_input) {
        if (!Array.isArray(output)) {
          throw new Error("Output format not in an array of json");
        }
      } else {
        output = [output];
      }

      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          if (/<.*?>/.test(key)) continue;

          if (!(key in output[index])) {
            throw new Error(`${key} not in json output`);
          }

          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            if (Array.isArray(output[index][key])) {
              output[index][key] = output[index][key][0];
            }
            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }
            if (output[index][key].includes(":")) {
              output[index][key] = output[index][key].split(":")[0];
            }
          }
        }

        if (output_value_only) {
          output[index] = Object.values(output[index]);
          if (output[index].length === 1) {
            output[index] = output[index][0];
          }
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
      console.log("An exception occurred:", e);
      console.log("Current invalid json format ", res);
    }
  }

  return [];
}
