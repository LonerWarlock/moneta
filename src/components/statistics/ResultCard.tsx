import { Award, Trophy } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type Props = {
    accuracy: number;
};

const ResultCard = ({accuracy}: Props) => {
  return (
    <Card className="md:col-span-7">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
            <CardTitle className="text-2xl font-bold">
                Results
            </CardTitle>
            <Award/>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-3/5">
            {accuracy >= 75 && (
                <>
                <Trophy className='mr-4' stroke='gold' size={50}/>
                <div className="flex flex-col text-2xl font-semibold text-yellow-400">
                    <span>Impressive</span>
                    <span className="text-sm text-center text-black dark:text-white opacity-50">
                        {"> 75% accuacy"}
                    </span>
                </div>
                </>
            )}
            {accuracy < 75 && accuracy >= 25 && (
                <>
                <Trophy className='mr-4' stroke='silver' size={50}/>
                <div className="flex flex-col text-2xl font-semibold text-slate-400">
                    <span>Good Job</span>
                    <span className="text-sm text-center text-black dark:text-white opacity-50">
                        {"> 25% accruacy"}
                    </span>
                </div>
                </>
            )}
            {accuracy < 25 && accuracy >= 0 && (
                <>
                <Trophy className='mr-4' stroke='red' size={50}/>
                <div className="flex flex-col text-2xl font-semibold text-red-400">
                    <span>Nice Try</span>
                    <span className="text-sm text-center text-black dark:text-white opacity-50">
                        {"< 25% accuacy"}
                    </span>
                </div>
                </>
            )}
            
        </CardContent>
    </Card>
  )
};

export default ResultCard;
