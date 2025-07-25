// src/app/api/game/start/route.ts
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { z } from "zod";

const startGameSchema = z.object({
  gameId: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
    }

    const body = await req.json();
    const { gameId } = startGameSchema.parse(body);

    const game = await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        timeStarted: new Date(),
      },
    });

    return NextResponse.json(game, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}