// src/app/admin/page.tsx
import React from "react";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
// IMPORTANT: Assumes these components were created in src/components/Admin/
import InfoCard from "@/components/Admin/InfoCard";
import UserTable from "@/components/Admin/UserTable";
import { Users, BrainCircuit } from "lucide-react";


export const metadata = {
  title: "Admin Console | Moneta",
  description: "Administrative console for Moneta application.",
};

const AdminPage = async () => {
  const session = await getAuthSession();
  
  // === 1. SECURITY CHECK (Access Control by Hardcoded Email from .env) ===
  // NOTE: You must set ADMIN_EMAIL="your_admin_email@example.com" in your .env file
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL; 
  
  if (!session?.user || session.user.email !== ADMIN_EMAIL) {
    // Redirect unauthorized users (keeping the page secret)
    return redirect("/");
  }

  // === 2. DATA FETCHING (Features) ===
  const [userCount, totalQuizzes, users] = await Promise.all([
    prisma.user.count(), 
    prisma.game.count(),
    prisma.user.findMany({ 
        select: { 
            id: true, 
            name: true, 
            email: true, 
            image: true
        }
    }),
    prisma.topicCount.count(),
  ]);

  return (
    <main className="p-8 mx-auto max-w-7xl">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-dashed">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Admin Console
        </h1>
      </div>

      {/* Info Cards Row: Total Users, Quizzes, Unique Topics */}
      <div className="grid gap-4 mt-8 md:grid-cols-2">
        
        <InfoCard title="Total Users" value={userCount} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        
        <InfoCard title="Total Quizzes Created" value={totalQuizzes} icon={<BrainCircuit className="h-4 w-4 text-muted-foreground" />} />
        
     </div>

      {/* User List Table */}
      <div className="mt-8">
        <UserTable users={users} />
      </div>
    </main>
  );
};

export default AdminPage;