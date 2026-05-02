// // src/app/interview/page.tsx
// import React from "react";
// import { getAuthSession } from "@/lib/nextauth";
// import { redirect } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
// import Link from "next/link";
// import { buttonVariants } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { Separator } from "@/components/ui/separator";

// export const metadata = {
//   title: "Career Prep | Moneta",
//   description: "Interview prep resources, curated for placements.",
// };

// const sections = [
//   { title: "Aptitude", path: "/interview/aptitude" },
//   { title: "DSA", path: "/interview/dsa" },
//   { title: "Core CS", path: "/interview/core" },
//   { title: "Interview Questions", path: "/interview/questions" },
// ];

// const InterviewPage = async () => {
//   const session = await getAuthSession();
//   if (!session?.user) {
//     return redirect("/");
//   }

//   return (
//     <main className="p-8 mx-auto max-w-4xl">
//       <div className="flex items-center justify-between pb-4 border-b-2 border-dashed">
//         <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
//           Career Launchpad
//         </h1>
//       </div>

//       <div className="mt-6">
//         <Link
//           href="/dashboard"
//           className={cn(buttonVariants({ variant: "outline" }), "mb-6")}
//         >
//           <ChevronLeft className="mr-2 h-4 w-4" />
//           Back to Dashboard
//         </Link>
//       </div>

//       <Card className="mt-4">
//         <CardHeader>
//           <CardTitle>Select a Prep Area</CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           {sections.map((section, index) => (
//             <React.Fragment key={index}>
//               <Link
//                 href={section.path}
//                 className="flex items-center justify-between py-1.5 transition-colors duration-150 hover:bg-secondary-foreground/5 dark:hover:bg-primary/10 -mx-1 px-1"
//               >
//                 <div className="flex items-center space-x-4">
//                   <Briefcase className="w-6 h-6 text-emerald-500" />
//                   <div className="flex flex-col text-left">
//                     <span className="text-lg font-semibold">
//                       {section.title}
//                     </span>
//                   </div>
//                 </div>

//                 <div
//                   className={cn(
//                     buttonVariants({ variant: "default", size: "sm" }),
//                     "pointer-events-none"
//                   )}
//                 >
//                   Open
//                   <ChevronRight className="w-4 h-4 ml-1" />
//                 </div>
//               </Link>

//               {index < sections.length - 1 && (
//                 <Separator className="my-0.5 -mx-1" />
//               )}
//             </React.Fragment>
//           ))}

//           <div className="text-sm text-center pt-4 text-muted-foreground opacity-70">
//             Ab placement bhi crack kar lo.
//           </div>
//         </CardContent>
//       </Card>
//     </main>
//   );
// };

// export default InterviewPage;

import React from "react";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { ChevronLeft, CalendarClock } from "lucide-react"; 
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "2nd Year Notes | Moneta",
  description: "Access your curated Google Drive study notes for 2nd Year.",
};


const SecondYearNotesPage = async () => {
   const session = await getAuthSession();
   if (!session?.user) {
     return redirect("/"); 
}

 return (
 <main className="p-8 mx-auto max-w-4xl">
 <div className="flex items-center justify-between pb-4 border-b-2 border-dashed">
 <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
 Interview Preparation Guide
 </h1>
 </div>

 <div className="mt-6">
 <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }), "mb-6")}>
 <ChevronLeft className="mr-2 h-4 w-4" />
 Back
 </Link>
 </div>



<Card className="mt-2">
            <CardHeader className="text-center">
 <CardTitle className="text-2xl font-bold">Guide</CardTitle>
 </CardHeader>
            
            {/* ELEGANT "COMING SOON" MESSAGE */}
 <CardContent className="flex flex-col items-center justify-center p-8 text-center bg-muted/30 dark:bg-muted/50 rounded-b-xl">
                <CalendarClock className="w-12 h-12 text-yellow-500 mb-4 animate-pulse" />
                <h2 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400">
                    Coming Soon!
                </h2>
                <p className="text-muted-foreground mt-2 max-w-sm">
                    We are diligently compiling and updating the Interview Prep Guide for you. Please check back later!
                </p>
 </CardContent>
        </Card>
    </main>
  );
};

export default SecondYearNotesPage;