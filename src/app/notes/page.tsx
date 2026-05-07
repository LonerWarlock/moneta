// src/app/notes/page.tsx
import React from "react";
// import { getAuthSession } from "@/lib/nextauth";
// import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Study Notes | Moneta",
  description: "Access your curated Google Drive study notes.",
};

// Replace these with your actual Google Drive share links
const yearButtons = [
    { 
        year: "2nd Year", 
        path: "/notes/2nd-year"
    },
    { 
        year: "3rd Year", 
        path: "/notes/3rd-year"
    },
    { 
        year: "4th Year", 
        path: "/notes/4th-year"
    },
];

const NotesPage = async () => {
//    const session = await getAuthSession();
//    if (!session?.user) {
//      return redirect("/"); // Redirect unauthenticated users
//    }

  return (
    <main className="p-8 mx-auto max-w-4xl">
        <div className="flex items-center justify-between pb-4 border-b-2 border-dashed">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                SPPU IT-2019 Notes
            </h1>
        </div>

        <div className="mt-6">
            <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }), "mb-6")}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
        </div>

        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Select your Year of Study</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {yearButtons.map((button, index) => (
                    <React.Fragment key={index}>
                            <Link 
                                href={button.path} 
                                // TIGHTENED SPACING: Reduced vertical padding (py-1.5) and adjusted margins to fit
                                className="flex items-center justify-between py-1.5 transition-colors duration-150 hover:bg-secondary-foreground/5 dark:hover:bg-primary/10 -mx-1 px-1"
                            >
                                <div className="flex items-center space-x-4">
                                    {/* Using vibrant icon colour for prominence */}
                                    <GraduationCap className="w-6 h-6 text-emerald-500" />
                                    <div className="flex flex-col text-left">
                                        <span className="text-lg font-semibold">{button.year}</span>
    
                                    </div>
                                </div>
                                {/* Styled as an action button to clearly indicate navigation */}
                                <div className={cn(buttonVariants({ variant: "default", size: "sm" }), "pointer-events-none")}>
                                    Select
                                    <ChevronRight className="w-4 h-4 ml-1" /> 
                                </div>
                            </Link>
                            {/* TIGHTENED SPACING: Reduced margin around separator, not applied to the last item */}
                            {index < yearButtons.length - 1 && (
                                <Separator className="my-0.5 -mx-1" />
                            )}
                        </React.Fragment>
                ))}

                <div className="text-sm text-center pt-4 text-muted-foreground opacity-70">
                    Ghoom phir ke aa hi gaye na yaha!
                </div>
            </CardContent>
        </Card>
    </main>
  );
};

export default NotesPage;