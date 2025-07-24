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

  return (
    <div className="space-y-4">
      {games.map((game) => {
        return (
          <div
            className="flex items-center justify-between p-3 transition-all rounded-lg hover:bg-muted/50"
            key={game.id}
          >
            <div className="flex items-center space-x-4">
              {game.gameType === "mcq" ? (
                <CopyCheck className="w-5 h-5" />
              ) : (
                <Edit2 className="w-5 h-5" />
              )}
              <div className="space-y-1">
                <Link
                  href={`/statistics/${game.id}`}
                  className="text-base font-medium leading-none underline"
                >
                  {game.topic}
                </Link>
                <p className="flex items-center text-xs font-light text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(game.timeStarted).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="px-2 py-1 text-xs font-semibold text-white dark:text-black rounded-md bg-primary">
              {game.gameType === "mcq" ? "MCQ" : "Open Ended"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryComponent;