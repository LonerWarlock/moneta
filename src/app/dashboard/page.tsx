// src/app/dashboard/page.tsx
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";
//import QuizMeCard from "@/components/QuizMeCard";
//import HistoryCard from "@/components/dashboard/HistoryCard";
//import HotTopicsCard from "@/components/dashboard/HotTopicsCard";
//import RecentActivities from "@/components/dashboard/RecentActivity";
import NotesCard from "@/components/NotesCard"; // <<< ADD THIS IMPORT

// ... (metadata is unchanged)

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

      {/* NEW: Notes Card in its own full-width row to be prominent */}
      <div className="grid gap-8 mt-8 md:grid-cols-1"> 
        <NotesCard />
      </div>

      <div className="grid gap-8 mt-8 md:grid-cols-2">
        {/* Existing Main Action Cards (Quiz and History) */}
        {/* <QuizMeCard />
        <HistoryCard /> */}
      </div>

      <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-7">
        {/* Secondary Info Cards */}
        {/* <HotTopicsCard />
        <RecentActivities /> */}
      </div>

    </main>
  );
};

export default Dashboard;