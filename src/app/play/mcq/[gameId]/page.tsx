import { redirect } from 'next/navigation';
import React from 'react';
import { getAuthSession } from '@/lib/nextauth';
import { prisma } from '@/lib/db';
import MCQ from '@/components/MCQ';

type Props = {
    params: {
        gameId: string;
    }
};

const MCQPage = async ({params}: Props) => {
    const {gameId} = params;
    const session = await getAuthSession();
    if (!session?.user) {
        return redirect('/');
    }
    const game = await prisma.game.findUnique({
        where : {
            id: gameId
        },
        include: {
            Questions: {
                select: {
                    id: true,
                    question: true,
                    options: true,
                },
            },
        },
    });
    if(!game || game.gameType !== 'mcq'){
        return redirect('/quiz');
    }
  return <MCQ game={{ ...game, questions: game.Questions }} />;

};

export default MCQPage;