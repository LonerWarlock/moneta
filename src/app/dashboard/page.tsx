import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import React from 'react';
import QuizMeCard from '@/components/QuizMeCard';
import HistoryCard from '@/components/dashboard/HistoryCard';
import HotTopicsCard from '@/components/dashboard/HotTopicsCard';
import RecentActivities from '@/components/dashboard/RecentActivity';

// type Props = {};

export const metadata = {
  title: "Dashboard | Moneta",
  description: "Your personal dashboard",
};

const Dashboard = async ({/*props: Props*/}) => {
    const session = await getAuthSession();
    if(!session?.user) {
        return redirect("/"); // Redirect to home if not authenticated
    }
  return <main className="p-8 max-auto max-w-7xl">
    <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
    </div>

    <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizMeCard />
        <HistoryCard />
    </div>

    <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicsCard />
        <RecentActivities />
    </div>
  </main>;
};

export default Dashboard;