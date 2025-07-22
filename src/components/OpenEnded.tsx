"use client";

import React from "react";
import { Game, Question } from "@prisma/client";
import { ChevronRight, Timer } from "lucide-react";
import { formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
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
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);
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
        userAnswer: "",
      };
      const response = await axios.post("/api/checkAnswer", payload);
      return response.data;
    },
  });

  const handleNext = React.useCallback(() => {
    if (isChecking) return;
    checkAnswer(undefined, {
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
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, isChecking, questionIndex, game.questions.length]);

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
        <BlankAnswerInput answer={currentQuestion.answer}/>
        <Button className="mt-2" onClick={handleNext} disabled={isChecking}>
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OpenEnded;
