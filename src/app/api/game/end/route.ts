import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/nextauth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { gameId } = await req.json();

    await prisma.game.update({
      where: { id: gameId },
      data: {
        timeEnded: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error ending game:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
