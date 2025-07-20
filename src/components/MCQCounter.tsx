import { CheckCircle2, XCircle } from 'lucide-react';
import React from 'react';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

type Props = {
    correctAnswers : number,
    wrongAnswers : number,
};

const MCQCounter = ({correctAnswers, wrongAnswers}: Props) => {
  return (
    <Card className="flex flex-row items-center justify-center p-2">
        <CheckCircle2 color="green" size={25} />
        <span className="mx-1 text-2xl text-[green]">{correctAnswers}</span>

        <span className="mx-1 text-2xl text-[red]">{wrongAnswers}</span>
        <XCircle color="red" size={25} />
    </Card>
);
};

export default MCQCounter;