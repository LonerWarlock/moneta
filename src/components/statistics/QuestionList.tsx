"use client"

import React from "react";
import { Question } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

type Props = {
  questions: Question[];
};

const QuestionList = ({ questions }: Props) => {

React.useEffect(() => {
  const handlePopState = () => {
    history.pushState(null, "", location.href); // Push back to current page
  };

  history.pushState(null, "", location.href); // Initial push
  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, []);



  const gameType = questions[0].questionType;
  return (
    <Table className="mt-4">
      <TableCaption>End of List</TableCaption>
      <TableHeader>
        <TableRow className="">
          <TableHead className="w-[10px] text-slate-500">Q.no</TableHead>
          <TableHead className="text-slate-500">
            Question & Correct Answer
          </TableHead>
          <TableHead className="text-slate-500">Your Answer</TableHead>
          {gameType === "open_ended" && (
            <TableHead className="w-[10px] text-right text-slate-500">
              Accuracy
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions.map((question, index) => {
            return (
              <TableRow key={question.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>

                <TableCell>
                  {question.question}
                  <br />
                  <br />
                  <span className="font-semibold">{question.answer}</span>
                </TableCell>

                {gameType === "mcq" && (
                  <TableCell
                    className={cn({
                      "text-green-500": question.isCorrect,
                      "text-red-500": !question.isCorrect,
                    })}
                  >
                    {question.userAnswer}
                  </TableCell>
                )}

                {gameType === "open_ended" && (
                  <TableCell>{question.userAnswer}</TableCell>
                )}

                {gameType === "open_ended" && (
                  <TableCell className="text-right">
                    {question.percentageCorrect}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionList;
