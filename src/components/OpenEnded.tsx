"use client";

import React from "react";
import { Game, Question } from "@prisma/client";
import { BarChart, ChevronRight, Timer } from "lucide-react";
import { cn, formatTimeDelta } from "@/lib/utils";
import Link from "next/link";
import { differenceInSeconds } from "date-fns";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button, buttonVariants } from "./ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import axios from "axios";
import BlankAnswerInput from "./BlankAnswerInput";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
};

const OpenEnded = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [now, setNow] = React.useState(new Date());
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [, setBlankAnswer] = React.useState<string>("");
  const [hasEnded, setHasEnded] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEnded]);

  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  // 1. Change mutationFn to accept the payload as a variable
  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async (payload: z.infer<typeof checkAnswerSchema>) => {
      const response = await axios.post("/api/checkAnswer", payload);
      return response.data;
    },
  });

  const { mutate: endGame } = useMutation({
  mutationFn: async () => {
    await axios.post("/api/game/end", { gameId: game.id });
  },
});

  // 2. Update handleNext to create the payload and pass it to checkAnswer
  const handleNext = React.useCallback(() => {
    if (isChecking) return;

    // Move the input gathering and payload creation here
    const userInput =
      (document.querySelector("#user-blank-input") as HTMLInputElement)
        ?.value || "";

    const payload = {
      questionId: currentQuestion.id,
      userAnswer: userInput,
      keyword: keywords[0],
    };

    // Pass the payload directly when calling the mutation
    checkAnswer(payload, {
      onSuccess: ({ percentSimilar }) => {
        toast.success(
          <div>
            <strong>Your answer is {percentSimilar}% similar</strong>
            <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>
              Answers are matched based on similarity comparisons.
            </div>
          </div>
        );

        if (questionIndex === game.questions.length - 1) {
          setHasEnded(true);
          endGame();
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [
    checkAnswer,
    isChecking,
    questionIndex,
    game.questions.length,
    currentQuestion, // Add currentQuestion as a dependency
    keywords, // Add keywords as a dependency
    endGame,
  ]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);

  if (hasEnded) {
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          Click the Link Below to view your Quiz Report
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
        <BlankAnswerInput
          key={currentQuestion.id} // <-- ADD THIS LINE TO GENRATE EMPTY INPUTS FOR EACH QUESTION
          answer={currentQuestion.answer}
          setBlankAnswer={setBlankAnswer}
          setKeywords={setKeywords}
        />
        <Button className="mt-2" onClick={handleNext} disabled={isChecking}>
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OpenEnded;