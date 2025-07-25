"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import { useRouter } from "next/navigation";

// type Props = {};

const QuizMeCard = ({/*props: Props*/}) => {
  const router = useRouter();
  return (
    <Card
      className="hover:cursor-pointer hover:capacity-75"
      onClick={() => router.push("/quiz")}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">New Quiz</CardTitle>
        <BrainCircuit size={24} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Click here to start a new quiz and test your knowledge on various
          topics.
        </p>
      </CardContent>
    </Card>
  );
};

export default QuizMeCard;
