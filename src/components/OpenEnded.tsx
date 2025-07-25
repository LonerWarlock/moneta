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
  const [currentGame, setCurrentGame] = React.useState(game);
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
    return currentGame.questions[questionIndex];
  }, [questionIndex, currentGame.questions]);

  // --- Start of Timer Fix Logic ---
  const { mutate: startGame } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/game/start", { gameId: currentGame.id });
      return response.data as Game;
    },
    onSuccess: (updatedGame) => {
      setCurrentGame((prev) => ({ ...prev, timeStarted: updatedGame.timeStarted }));
    },
  });

  type EndGameVars = {
    gameId: string;
  };

  const { mutate: endGame } = useMutation({
    mutationFn: async ({ gameId }: EndGameVars) => {
      await axios.post("/api/game/end", { gameId: gameId });
    },
  });

  React.useEffect(() => {
    startGame();
  }, [startGame]);
  // --- End of Timer Fix Logic ---

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async (payload: z.infer<typeof checkAnswerSchema>) => {
      const response = await axios.post("/api/checkAnswer", payload);
      return response.data;
    },
  });

  const handleNext = React.useCallback(() => {
    if (isChecking) return;
    const userInput = (document.querySelector("#user-blank-input") as HTMLInputElement)?.value || "";
    const payload = {
      questionId: currentQuestion.id,
      userAnswer: userInput,
      keyword: keywords[0],
    };

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

        if (questionIndex === currentGame.questions.length - 1) {
          setHasEnded(true);
          endGame({ gameId: currentGame.id });
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [
    checkAnswer,
    isChecking,
    questionIndex,
    currentGame.questions.length,
    currentGame.id,
    currentQuestion,
    keywords,
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
      <div className="absolute inset-x-0 top-20 bottom-0">
        <div className="flex flex-col items-center justify-center h-full pb-10 p-4 text-center">
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
    <div className="absolute top-20 left-0 right-0 bottom-0">
      <div className="flex flex-col h-full max-w-4xl mx-auto px-4 sm:px-8 pb-8">
        {/* Top Bar */}
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
              {currentGame.timeStarted ? formatTimeDelta(differenceInSeconds(now, currentGame.timeStarted)) : "00:00"}
            </div>
          </div>
        </div>

        {/* Question Card */}
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

        {/* Answer Input Area */}
        <div className="flex flex-col w-full flex-grow justify-center mt-4">
          <BlankAnswerInput
            key={currentQuestion.id}
            answer={currentQuestion.answer}
            setBlankAnswer={setBlankAnswer}
            setKeywords={setKeywords}
          />
        </div>

        {/* Next Button Container */}
        <div className="flex justify-center w-full mt-4 flex-shrink-0">
          <Button onClick={handleNext} disabled={isChecking} size="lg">
            Next <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OpenEnded;