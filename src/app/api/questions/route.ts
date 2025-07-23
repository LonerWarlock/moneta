import { NextResponse } from "next/server";
import { quizCreationSchema } from "@/schemas/form/quiz";   
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";

// POST /api/questions
export const POST = async (req : Request) => {
try {
    const session = await getAuthSession();
    if(!session?.user){
        return NextResponse.json(
            { error: "You must be logged in to create a quiz" },
            { status: 401 }
        )
    }

    const body = await req.json();
    const {topic, type, amount} = quizCreationSchema.parse(body);
    let questions;
    if(type === "open_ended"){
        questions = await strict_output(
        "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
        new Array(amount).fill(
          `You are to generate a random easy open-ended questions about ${topic}`
        ),
        {
          question: "question", 
          answer: "answer with max length of 15 words",
        }
      );
    }else if(type === "mcq"){
        questions = await strict_output(
            "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
            new Array(amount).fill(
              `You are to generate a random easy mcq question about ${topic}`
            ),
            {
                question: "question",
                answer : "answer with max length of 15 words",
                option1: "option1 with max length of 15 words which is not the answer",
                option2: "option2 with max length of 15 words which is not the answer",
                option3: "option3 with max length of 15 words which is not the answer",
            }
        )
    }
    return NextResponse.json(
        { questions },
        { status: 200 }
    )
} catch (error) {
    if(error instanceof ZodError){
        return NextResponse.json(
            { error: error.issues },
            { status: 400 }
        )
    }
    console.error("Unexpected error in /api/questions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
}
}
