import React from "react";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HistoryComponent from "@/components/HistoryComponent";

const HistoryPage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    // This main container fills the screen and centers the card, preventing page scroll
    <main className="flex items-center justify-center pt-3">
      {/* pt-16 is a common navbar height (4rem), adjust if yours is different */}
      <Card className="w-full max-w-2xl max-h-[85vh] flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Your Quiz Journey</CardTitle>
            <Link href="/dashboard" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </CardHeader>

        {/* This content area will scroll if the history list is long */}
        <CardContent className="flex-grow overflow-y-auto">
          <HistoryComponent limit={100} userId={session.user.id} />
        </CardContent>
      </Card>
    </main>
  );
};

export default HistoryPage;