import React from "react";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import InfoCard from "@/components/Admin/InfoCard";
import UserTable from "@/components/Admin/UserTable";
import FeedbackStats from "@/components/Admin/FeedbackStats";
import FeedbackTable from "@/components/Admin/FeedbackTable";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Users, MessageSquareText } from "lucide-react";

export const metadata = {
  title: "Admin Console | Moneta",
  description: "Administrative console for Moneta application.",
};

const AdminPage = async () => {
  const session = await getAuthSession();

  const ADMIN_EMAIL_1 = process.env.ADMIN_EMAIL_1;
  const ADMIN_EMAIL_2 = process.env.ADMIN_EMAIL_2;

  if (!session?.user || (session.user.email !== ADMIN_EMAIL_1 && session.user.email !== ADMIN_EMAIL_2)) {
    return redirect("/");
  }

  const [userCount, totalQuizzes, users, feedbacks] = await Promise.all([
    prisma.user.count(),
    prisma.game.count(),
    prisma.user.findMany({
      include: {
        _count: {
          select: { games: true },
        },
        feedbacks: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    }),
    prisma.feedback.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <main className="p-4 md:p-8 mx-auto max-w-7xl">
      <div className="flex items-center justify-between pb-4 border-b-2 border-dashed">
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl">Admin Console</h1>
      </div>

      <div className="grid gap-4 mt-8 grid-cols-1 sm:grid-cols-2">
        <InfoCard title="Total Users" value={userCount} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        <InfoCard title="Feedback Received" value={feedbacks.length} icon={<MessageSquareText className="h-4 w-4 text-muted-foreground" />} />
      </div>

      <Tabs defaultValue="users" className="mt-8">
        <TabsList className="flex w-full">
          <TabsTrigger value="users" className="flex-1">User Directory</TabsTrigger>
          <TabsTrigger value="feedback" className="flex-1">Feedback Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="mt-4">
            <UserTable users={users} />
          </div>
        </TabsContent>

        <TabsContent value="feedback">
          <FeedbackStats feedbacks={feedbacks} />
          <FeedbackTable feedbacks={feedbacks} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AdminPage;