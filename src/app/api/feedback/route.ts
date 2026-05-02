import { getAuthSession } from "@/lib/nextauth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { 
      college, 
      graduationYear, 
      supportRating, 
      scoresIncreased, 
      semesterCatchUp 
    } = body;

    // 2. Execute Transaction
    // We create the feedback record and update the user flag simultaneously
    await prisma.$transaction([
      prisma.feedback.create({
        data: {
          userId: session.user.id,
          college: college,
          graduationYear: graduationYear,
          supportRating: supportRating,
          scoresIncreased: scoresIncreased,
          semesterCatchUp: semesterCatchUp,
        },
      }),
      prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          hasGivenFeedback: true,
        },
      }),
    ]);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("FEEDBACK_POST_ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}