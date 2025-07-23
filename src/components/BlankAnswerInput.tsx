import React from "react";
import keyword_extractor from "keyword-extractor";

type Props = {
  answer: string; 
  setBlankAnswer: React.Dispatch<React.SetStateAction<string>>;
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
};

const BLANKS = "______";

const BlankAnswerInput = ({ answer, setBlankAnswer, setKeywords }: Props) => {
  const keywords = React.useMemo(() => {
    const words = keyword_extractor.extract(answer, {
      language: "english",
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: false,
    });
    // const shuffle = words.sort(() => Math.random() - 0.5);
    // return shuffle.slice(0, 2);
    return words.slice(0, 1);
  }, [answer]);

  const answerWithBlanks = React.useMemo(() => {
    const answerWithBlanks = keywords.reduce((acc, keyword) => {
      return acc.replace(keyword, BLANKS);
    }, answer);
    setBlankAnswer(answerWithBlanks);
    return answerWithBlanks;
  }, [keywords, answer, setBlankAnswer]);

  React.useEffect(() => {
    setBlankAnswer(answerWithBlanks);
    setKeywords(keywords);
  }, [answerWithBlanks, keywords, setBlankAnswer, setKeywords])

  return (
    <div className="flex justify-start w-full mt-4">
      <h1 className="text-xl font-semibold">
        {answerWithBlanks.split(BLANKS).map((part, index) => {
          return (
            <>
              {part}
              {index === keywords.length ? null : (
                <input
                  id="user-blank-input"
                  className="text-center border-b-2 border-black dark:border-white w-28 focus:border-2 focus:border-b-4 focus:outline-none"
                />
              )}
            </>
          );
        })}
      </h1>
    </div>
  );
};

export default BlankAnswerInput;
