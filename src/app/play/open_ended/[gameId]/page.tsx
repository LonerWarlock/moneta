import { redirect } from "next/navigation";
import React from "react";
import { getAuthSession } from "@/lib/nextauth";
import { prisma } from "@/lib/db";
import OpenEnded from "@/components/OpenEnded";

type Props = {
  params: {
    gameId: string;
  };
};

const OpenEndedPage = async ({ params: { gameId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      Questions: {
        select: {
          id: true,
          question: true,
          answer: true,
        },
      },
    },
  });
  if (!game || game.gameType !== "open_ended") {
    return redirect("/quiz");
  }
  const { Questions, ...rest } = game;

  return <OpenEnded game={{ ...rest, questions: Questions }} />;
};

export default OpenEndedPage;
