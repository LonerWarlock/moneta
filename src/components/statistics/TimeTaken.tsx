import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Hourglass } from 'lucide-react';
import { formatTimeDelta } from '@/lib/utils';
import { differenceInSeconds } from 'date-fns';

type Props = {
    timeEnded: Date;
    timeStarted: Date | null;
};

const TimeTaken = ({timeEnded, timeStarted}: Props) => {

    const timeDifference =
    timeStarted && timeEnded
      ? formatTimeDelta(differenceInSeconds(timeEnded, timeStarted))
      : "0s";

  return (
    <Card className="md:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-2xl font-bold">
                Time Taken
            </CardTitle>
            <Hourglass />
        </CardHeader>
        <CardContent>
            <div className="text-xl font-medium">
                {timeDifference}
            </div>
        </CardContent>
    </Card>
  );
};

export default TimeTaken;
