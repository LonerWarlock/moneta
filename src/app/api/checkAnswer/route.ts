import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import { compareTwoStrings } from "string-similarity";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { questionId, userAnswer, keyword } = checkAnswerSchema.parse(body);
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });
    if (!question) {
      return NextResponse.json(
        { message: "Question not found" },
        { status: 404 }
      );
    }

    if (question.questionType === "mcq") {
      const isCorrect =
        question.answer.toLocaleLowerCase().trim() ===
        userAnswer.toLowerCase().trim();
      await prisma.question.update({
        where: { id: questionId },
        data: { userAnswer, isCorrect },
      });
      return NextResponse.json({ isCorrect }, { status: 200 });
    } else if (question.questionType === "open_ended") {
      if (typeof keyword !== "string") {
        return NextResponse.json(
          { message: "Keyword not provided for comparison." },
          { status: 400 }
        );
      }
      
      let percentSimilar = compareTwoStrings(
        keyword.toLowerCase().trim(),
        userAnswer.toLowerCase().trim()
      );
      percentSimilar = Math.round(percentSimilar * 100);
      await prisma.question.update({
        where: { id: questionId },
        data: {
          userAnswer: userAnswer,
          percentageCorrect: percentSimilar,
        },
      });
      return NextResponse.json({ percentSimilar }, { status: 200 });
    }
    // 1. ADD THIS: Handle any other unexpected question types
    return NextResponse.json(
      { message: "Invalid question type" },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error.issues,
        },
        {
          status: 400,
        }
      );
    }
    // 2. ADD THIS: Catch any other server-side errors
    console.error("API Error:", error); // Good for debugging
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}