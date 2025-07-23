import AverageAccuracy from '@/components/statistics/AverageAccuracy';
import ResultCard from '@/components/statistics/ResultCard';
import TimeTaken from '@/components/statistics/TimeTaken';
import { buttonVariants } from '@/components/ui/button';
import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';
import { LucideLayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: {
    gameId: string;
  }
};

const StatisticsPage =  async ({params: {gameId}}: Props) => {
  const session = await getAuthSession ();
  if(!session?.user){
    return redirect("/");
  }
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
        Questions: true,
    }
  })
  if(!game){
    return redirect("/");
  }

  let accuracy: number = 0
  if(game.gameType === 'mcq'){
    let totalCorrect = game.Questions.reduce((acc, question) => {
        if(question.isCorrect){
          return acc + 1;
        }
        return acc;
    }, 0)
    accuracy = (totalCorrect / game.Questions.length) * 100;
  }else if (game.gameType === 'open_ended') {
    // HERE
  }

  return (
    <div className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Quiz Report
        </h2>
        <div className="flex items-center space-x-2">
          <Link href={'/dashboard'} className={buttonVariants()}>
            <LucideLayoutDashboard className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-7">
        <ResultCard accuracy={20} />
        <AverageAccuracy  accuracy={20}/>
        <TimeTaken timeEnded={new Date()} timeStarted={new Date()}/>
        {/*MAKING CARDS FOR THIS*/}
      </div>
    </div>
  )
};

export default StatisticsPage;