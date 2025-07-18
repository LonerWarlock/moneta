import React from 'react';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import QuizCreation from '@/components/QuizCreation';

// type Props = {};

export const metadata = {
  title: "Quiz | Moneta",
  description: "Test your knowledge with our quizzes",
};

const QuizPage = async ({/*props: Props*/}) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return redirect("/"); // Redirect to home if not authenticated
    }
  return <QuizCreation />;
};

export default QuizPage;