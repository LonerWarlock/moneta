import React from "react";
// import { getAuthSession } from "@/lib/nextauth";
// import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { ChevronLeft, CalendarClock } from "lucide-react"; 
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "2nd Year Notes | Moneta",
  description: "Access your curated Google Drive study notes for 2nd Year.",
};

// Removed the 'secondYearNotes' array as we are replacing the document list.

const SecondYearNotesPage = async () => {
//   const session = await getAuthSession();
//   if (!session?.user) {
//     return redirect("/"); 
// }

 return (
 <main className="p-8 mx-auto max-w-4xl">
 <div className="flex items-center justify-between pb-4 border-b-2 border-dashed">
 <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
 2nd Year Notes
 </h1>
 </div>

 <div className="mt-6">
 <Link href="/notes" className={cn(buttonVariants({ variant: "outline" }), "mb-6")}>
 <ChevronLeft className="mr-2 h-4 w-4" />
 Back to Years
 </Link>
 </div>



<Card className="mt-2">
            <CardHeader className="text-center">
 <CardTitle className="text-2xl font-bold">Notes</CardTitle>
 </CardHeader>
            
            {/* ELEGANT "COMING SOON" MESSAGE */}
 <CardContent className="flex flex-col items-center justify-center p-8 text-center bg-muted/30 dark:bg-muted/50 rounded-b-xl">
                <CalendarClock className="w-12 h-12 text-yellow-500 mb-4 animate-pulse" />
                <h2 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400">
                    Coming Soon!
                </h2>
                <p className="text-muted-foreground mt-2 max-w-sm">
                    We are diligently compiling and updating the 2nd Year notes for you. Please check back later!
                </p>
 </CardContent>
        </Card>
    </main>
  );
};

export default SecondYearNotesPage;