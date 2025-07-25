import { prisma } from "@/lib/db";
import { Clock, CopyCheck, Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    where: {
      userId,
    },
    take: limit,
    orderBy: {
      timeStarted: "desc",
    },
  });

  if (games.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        You have not played any games yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {games.map((game) => {
        const isMcq = game.gameType === "mcq";
        return (
          <div
            className="flex items-center justify-between p-4 rounded-lg border transition-shadow hover:shadow-md"
            key={game.id}
          >
            <div className="flex items-center space-x-4">
              {isMcq ? (
                <CopyCheck className="w-6 h-6 text-green-500" />
              ) : (
                <Edit2 className="w-6 h-6 text-blue-500" />
              )}
              <div className="flex flex-col space-y-1">
                <Link
                  href={`/statistics/${game.id}`}
                  className="text-lg font-semibold leading-none underline-offset-4 hover:underline"
                >
                  {game.topic}
                </Link>
                <p className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1.5" />
                  {new Date(game.timeStarted).toLocaleString()}
                </p>
              </div>
            </div>

            <div
              className={`px-3 py-1.5 text-sm font-bold rounded-full text-white ${
                isMcq ? "bg-green-500" : "bg-blue-500"
              }`}
            >
              {isMcq ? "MCQ" : "Open Ended"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryComponent;