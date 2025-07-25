import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/nextauth";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import axios from "axios";

// api/game
export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 }
      );
    }
    const body = await req.json();
    const { topic, type, amount } = quizCreationSchema.parse(body);
    const game = await prisma.game.create({
      data: {
        gameType: type,
        userId: session.user.id,
        topic,
      },
    });

    await prisma.topicCount.upsert({
      where: {
        topic,
      },
      create: {
        topic,
        count: 1,
      },
      update: {
        count: {
          increment: 1,
        },
      }
    })

    const {data} = await axios.post(`${process.env.API_URL}/api/questions`, {
      amount,
      topic,
      type
    });

    if(type === 'mcq'){
        type mcqQuestion = {
            question: string;
            answer: string;
            option1: string;
            option2: string;
            option3: string;
        }
        const manyData = data.questions.map((question: mcqQuestion) => {
            let options = [question.answer, question.option1, question.option2, question.option3];
            options = options.sort(() => Math.random() - 0.5); // Shuffle options
            return {
                question: question.question,
                answer: question.answer,
                options: JSON.stringify(options),
                gameId: game.id,
                questionType: 'mcq',
            };
        }) 
        await prisma.question.createMany({
            data: manyData,
        });  
    } else if(type === 'open_ended'){
        type openQuestion = {
            question: string;
            answer: string;
        }
        const manyData = data.questions.map((question: openQuestion) => {
            return {
                question: question.question,
                answer: question.answer,
                gameId: game.id,
                questionType: 'open_ended',
            };
        });
        await prisma.question.createMany({
            data: manyData, 
        })
    }

    return NextResponse.json(
      { gameId: game.id },
      { status: 200 }
    );

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Unexpected error in /api/game:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
