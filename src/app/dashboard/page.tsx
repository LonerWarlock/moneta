import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";
import QuizMeCard from "@/components/QuizMeCard";
import HistoryCard from "@/components/dashboard/HistoryCard";
import HotTopicsCard from "@/components/dashboard/HotTopicsCard";
import RecentActivities from "@/components/dashboard/RecentActivity";

export const metadata = {
  title: "Dashboard | Moneta",
  description: "Your personal quiz dashboard.",
};

const Dashboard = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <main className="p-8 mx-auto max-w-7xl">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-dashed">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Dashboard
        </h1>
      </div>

      <div className="grid gap-8 mt-8 md:grid-cols-2">
        {/* Main Action Cards */}
        <QuizMeCard />
        <HistoryCard />
      </div>

      <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-7">
        {/* Secondary Info Cards */}
        <HotTopicsCard />
        <RecentActivities />
      </div>
    </main>
  );
};

export default Dashboard;