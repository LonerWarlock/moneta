import { CheckCircle2, XCircle } from "lucide-react";
import React from "react";
import { Card } from "./ui/card";

type Props = {
  correctAnswers: number;
  wrongAnswers: number;
};

const MCQCounter = ({ correctAnswers, wrongAnswers }: Props) => {
  return (
    <Card className="flex items-center justify-between w-[120px] py-2 rounded-xl">
      <div className="flex items-center space-x-1">
        <CheckCircle2 className="text-green-600" size={20} />
        <span className="text-lg font-semibold text-green-700 pr-2">
          {correctAnswers}
        </span>

        <span className="text-lg font-semibold text-red-600 pl-2">
          {wrongAnswers}
        </span>
        <XCircle className="text-red-600" size={20} />
      </div>
    </Card>
  );
};

export default MCQCounter;
