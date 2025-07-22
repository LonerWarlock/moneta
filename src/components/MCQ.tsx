"use client";

import React from "react";
import { differenceInSeconds } from "date-fns";
import { Game, Question } from "@prisma/client";
import { Timer } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import MCQCounter from "./MCQCounter";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import axios from "axios";
import { toast } from "sonner";
import { BarChart } from "lucide-react";
import Link from "next/link";
import { cn, formatTimeDelta } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";


type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "options">[] };
};

const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);
  const [correct_Answers, setCorrectAnswers] = React.useState(0);
  const [wrong_Answers, setWrongAnswers] = React.useState(0);
  const [now, setNow] = React.useState(new Date());
  const [hasEnded, setHasEnded] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if(!hasEnded){
        setNow(new Date());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEnded])

  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userAnswer: options[selectedChoice],
      };
      const response = await axios.post("/api/checkAnswer", payload);
      return response.data;
    },
  });

  const handleNext = React.useCallback(() => {
    if (isChecking) return;
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          toast.success("Correct Answer", {
            style: {
              background: "#065f46", // light green
              color: "#d1fae5", // dark green text
            },
          });
          setCorrectAnswers((prev) => prev + 1);
        } else {
          toast.error("Wrong Answer", {
            style: {
              background: "#991b1b", // light red
              color: "#fee2e2", // dark red text
            },
          });
          setWrongAnswers((prev) => prev + 1);
        }
        if (questionIndex === game.questions.length - 1) {
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, isChecking, questionIndex, game.questions.length]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "1") {
        setSelectedChoice(0);
      } else if (e.key === "2") {
        setSelectedChoice(1);
      } else if (e.key === "3") {
        setSelectedChoice(2);
      } else if (e.key === "4") {
        setSelectedChoice(3);
      } else if (e.key === "Enter") {
        handleNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  if (hasEnded) {
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          You Completed in{" "}
          {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
        </div>
        <Link
          href={`/statistics/${game.id}`}
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          View Statistics
          <BarChart className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[80vw] h-[75vh] top-1/2 left-1/2">
      <div className="flex items-center justify-between w-full">
        {/* Left group: Topic + Timer */}
        <div className="flex flex-col scale-90">
          <p className="flex items-center">
            <span className="mr-2 text-slate-400">Topic</span>
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}
            </span>
          </p>
          <div className="flex items-center text-slate-400 py-2">
            <Timer className="mr-2" />
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>

        {/* Right: Counter */}
        <MCQCounter
          correctAnswers={correct_Answers}
          wrongAnswers={wrong_Answers}
        />
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
        <Button className="mt-2" onClick={handleNext} disabled={isChecking}>
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
