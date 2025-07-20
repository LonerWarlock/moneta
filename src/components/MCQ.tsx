"use client";

import React from "react";
import { Game, Question } from "@prisma/client";
import { Timer } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import MCQCounter from "./MCQCounter";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "options">[] };
};

const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);

  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[80vw] h-[75vh] top-1/2 left-1/2">
      <div className="flex items-center justify-between w-full">
        {/* Left group: Topic + Timer */}
        <div className="flex items-center space-x-6">
          <p className="flex items-center">
            <span className="mr-2 text-slate-400">Topic</span>
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}
            </span>
          </p>
          <div className="flex items-center text-slate-400">
            <Timer className="mr-2" />
            <span>00:00</span>
          </div>
        </div>

        {/* Right: Counter */}
        <MCQCounter correctAnswers={0} wrongAnswers={0} />
      </div>

      <Card className="w-full py-4 mt-5">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-800/50">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion?.question || "Loading..."}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, index) => {
          return (
            <Button
              key={index}
              className="justify-start w-full py-8 mb-4"
              variant={selectedChoice === index ? "default" : "secondary"}
              onClick={() => {
                setSelectedChoice(index);
              }}
            >
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border rounded-md">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button className="mt-2">
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
