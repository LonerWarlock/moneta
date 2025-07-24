import React from 'react';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import QuizCreation from '@/components/QuizCreation';

type Props = {
    searchParams: {
        topic?: string;
    };
};

export const metadata = {
  title: "Quiz | Moneta",
  description: "Test your knowledge with our quizzes",
};

const QuizPage = async ({searchParams}: Props) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return redirect("/"); // Redirect to home if not authenticated
    }
  return <QuizCreation topicParams={searchParams.topic ?? ""} />;
};

export default QuizPage;