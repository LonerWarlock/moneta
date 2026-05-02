// src/app/dashboard/page.tsx
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import FeedbackSkipCheck from "@/components/FeedbackSkipCheck";
import React from "react";
import { BookOpenText, TrendingUp } from "lucide-react";
import NotesCard from "@/components/NotesCard";

export const metadata = {
  title: "Dashboard | Moneta",
};

const Dashboard = async () => {
  const session = await getAuthSession();
  
  if (!session?.user) {
    return redirect("/");
  }

  // Fetch feedback status from database[cite: 1]
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { hasGivenFeedback: true },
  });

  return (
    <main className="p-8 mx-auto max-w-7xl">
      {/* Logic to detect fresh session and redirect if needed[cite: 1] */}
      <FeedbackSkipCheck hasGivenFeedback={!!user?.hasGivenFeedback} />

      <div className="flex items-center justify-between pb-4 border-b-2 border-dashed">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Dashboard
        </h1>
      </div>

      <div className="grid gap-8 mt-8 md:grid-cols-1">
        <NotesCard
          title="SPPU IT-2019 Notes"
          description="Click to access all the study material related to SPPU IT-2019 Pattern."
          bgClass="bg-emerald-500 text-white dark:bg-emerald-600"
          route="/notes"
          icon={<BookOpenText size={24} strokeWidth={2.5} />}
        />
      </div>

      <div className="grid gap-8 mt-8 md:grid-cols-1">
        <NotesCard
          title="Interview Preparation Guide"
          description="Your all-in-one hub for placements, from aptitude to final HR round."
          bgClass="bg-amber-500 text-white dark:bg-amber-600"
          route="/interview"
          icon={<TrendingUp size={24} strokeWidth={2.5} />}
        />
      </div>
    </main>
  );
};

export default Dashboard;