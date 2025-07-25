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
  const [currentGame, setCurrentGame] = React.useState(game);
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
    return currentGame.questions[questionIndex];
  }, [questionIndex, currentGame.questions]);

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

 const { mutate: startGame } = useMutation({
    mutationFn: async () => {
     const response = await axios.post("/api/game/start", { gameId: currentGame.id });
     return response.data as Game;
    },
   onSuccess: (updatedGame) => {
     setCurrentGame((prev) => ({ ...prev, timeStarted: updatedGame.timeStarted }));
   }
  });

type EndGameVars = {
  gameId: string;
};

  const { mutate: endGame } = useMutation({
  mutationFn: async ({ gameId }: EndGameVars) => {
    await axios.post("/api/game/end", { gameId: gameId });
  },
});

  const handleNext = React.useCallback(() => {
    if (isChecking) return;
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          toast.success("Correct Answer", {
            style: {
              background: "#065f46",
              color: "#d1fae5",
            },
          });
          setCorrectAnswers((prev) => prev + 1);
        } else {
          toast.error("Wrong Answer", {
            style: {
              background: "#991b1b",
              color: "#fee2e2",
            },
          });
          setWrongAnswers((prev) => prev + 1);
        }
        if (questionIndex === currentGame.questions.length - 1) {
          setHasEnded(true);
          endGame({ gameId: currentGame.id })
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, isChecking, questionIndex, currentGame.id, currentGame.questions.length, endGame]);

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

React.useEffect(() => {
  startGame();
}, [startGame]);

  const options = React.useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  if (hasEnded) {
    return (
        <div className="absolute inset-x-0 top-20 bottom-0">
  <div className="flex flex-col items-center justify-center h-full pb-10 text-center">

    <p className="mt-4 text-muted-foreground">
      You have completed the quiz!
      <br />
      Click the button below to view your report.
    </p>

    <Link
      href={`/statistics/${currentGame.id}`}
      className={cn(buttonVariants({ size: "lg" }), "mt-6")}
    >
      View Report
      <BarChart className="w-4 h-4 ml-2" />
    </Link>
  </div>
</div>
    );
  }

  return (
    <div className="absolute top-17 left-0 right-0 bottom-0">
      <div className="flex flex-col h-full max-w-4xl mx-auto px-4 sm:px-8 pb-8">
        <div className="flex items-center justify-between w-full flex-shrink-0">
          <div className="flex flex-col">
            <p className="flex items-center">
              <span className="mr-2 text-slate-500 dark:text-slate-400">Topic</span>
              <span className="px-2 py-1 text-white rounded-lg bg-slate-800 dark:bg-slate-700">
                {currentGame.topic}
              </span>
            </p>
            <div className="flex items-center mt-2 text-slate-500 dark:text-slate-400">
              <Timer className="mr-2" />
              {currentGame.timeStarted ? formatTimeDelta(differenceInSeconds(now, currentGame.timeStarted)) : "0s"}
            </div>
          </div>
          <MCQCounter
            correctAnswers={correct_Answers}
            wrongAnswers={wrong_Answers}
          />
        </div>

        <Card className="w-full mt-4 flex-shrink-0">
          <CardHeader className="flex flex-row items-center">
            <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
              <div>{questionIndex + 1}</div>
              <div className="text-base text-slate-400">
                {currentGame.questions.length}
              </div>
            </CardTitle>
            <CardDescription className="flex-grow text-lg text-slate-900 dark:text-slate-100">
              {currentQuestion?.question || "Loading..."}
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="flex flex-col w-full flex-grow mt-4 space-y-2 md:space-y-4">
          {options.map((option, index) => {
            return (
              <Button
                key={index}
                className="justify-start w-full h-auto py-3 whitespace-normal"
                variant={selectedChoice === index ? "default" : "secondary"}
                onClick={() => {
                  setSelectedChoice(index);
                }}
              >
                <div className="flex items-center justify-start text-left">
                  <div className="p-2 px-3 mr-5 border rounded-md">
                    {index + 1}
                  </div>
                  <div className="text-base">{option}</div>
                </div>
              </Button>
            );
          })}
        </div>

        <div className="flex justify-center w-full mt-4 flex-shrink-0">
            <Button onClick={handleNext} disabled={isChecking} size="lg">
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
      </div>
    </div>
  );
};

export default MCQ;