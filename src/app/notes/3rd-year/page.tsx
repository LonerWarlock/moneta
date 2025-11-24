// src/app/notes/3rd-year/page.tsx
import React from "react";
// import { getAuthSession } from "@/lib/nextauth";
// import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { SubjectAccordion } from "@/components/Notes/SubjectAccordion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "3rd Year Notes | Moneta",
  description: "Access your curated Google Drive study notes for 3rd Year.",
};

const thirdYearNotes = [
    // --- SEMESTER V NOTES ---
    {
        title: "TOC",
        description: "Theory of Computation",
        semester: "V",
        topics: [
            { name: "Unit 1: Finite Automata", link: "https://drive.google.com/file/d/1BomXj_BJvP8XVaK5Bmq8jnaC9C03AeZ6/view?usp=drivesdk" },
            { name: "Unit 2: Regular Expressions and Languages", link: "https://drive.google.com/file/d/1J6SQTl_1ReZC3FjreqrZ9B386RDmlFLG/view?usp=drivesdk" },
            { name: "Unit 3: Context Free Grammar and Language", link: "https://drive.google.com/file/d/1nBd2R1jjvK8Cu5nEf2oT4Vvm7VaV5lD3/view?usp=drivesdk" },
            { name: "Unit 4: Pushdown Automata and Post Machine", link: "https://drive.google.com/file/d/1kPNf1lD_9gdbRvNIFzYwvkawTMgAzGi7/view?usp=drivesdk" },
            { name: "Unit 5: Turing Machine", link: "https://drive.google.com/file/d/18KQfx0xm7LiIn9IFifHyk1jCxzUSGX-A/view?usp=drivesdk" },
            { name: "Unit 6: Computational Complexity", link: "https://drive.google.com/file/d/1G9ha4rYrc-s3hf4rBPCI4h0WA5f5E5nb/view?usp=drivesdk" },
            { name: "Screenshots", link: "https://drive.google.com/drive/folders/1_uFrhC_dKOwgZmQ2DUASBYrB1VTl44zj" },
        ],
    },
    {
        title: "OS",
        description: "Operating Systems",
        semester: "V",
        topics: [
            { name: "Unit 1: Overview of Operating System", link: "https://drive.google.com/file/d/1cLRi3xLr29fFngFWpjRfdvLnlMw1jEX0/view?usp=drivesdk" },
            { name: "Unit 2: Process Management", link: "https://drive.google.com/file/d/1GijPM_GQ1BSl9IPl2M6jzlCIi4URnnOU/view?usp=drivesdk" },
            { name: "Unit 3: Concurrency Control", link: "https://drive.google.com/file/d/1W5UOh8H9r3rElvJ5hB26zz59BZWjOWiv/view?usp=drivesdk" },
            { name: "Unit 4: Memory Management", link: "https://drive.google.com/file/d/1pOSpEft53kE2ApThzOjRvMVATwxEiAmP/view?usp=drivesdk" },
            { name: "Unit 5: Input/Output and File Management", link: "https://drive.google.com/file/d/1f2QLRE5spwJBET__LrNyPS4AP4Hkt4mK/view?usp=drivesdk" },
            { name: "Unit 6: System Software and its Importance", link: "https://drive.google.com/file/d/1xONwkIXWP_JqktlaC6BIKvFMaR-8Agwn/view?usp=drivesdk" },
            { name: "Screenshots", link: "https://drive.google.com/drive/folders/1LXdBq7Psy0-Sp7dbnHoHOYXaZIdlagIK" },
        ],
    },
    // --- SEMESTER VI NOTES ---
    {
        title: "ML",
        description: "Machine Learning",
        semester: "V",
        topics: [
            { name: "Unit 1: Introduction to Machine Learning", link: "https://drive.google.com/file/d/16KoK0Nyap6ESqbJHjiri-K5K00K0NhDu/view?usp=drivesdk" },
            { name: "Unit 2: Classification", link: "https://drive.google.com/file/d/1TjpMPP6VApVeHZzW4oxRn6jdYvBTlhOX/view?usp=drivesdk" },
            { name: "Unit 3: Regression", link: "https://drive.google.com/file/d/1pU8VdqviuifP-47czBxvsZW_O6yZzAfc/view?usp=drivesdk" },
            { name: "Unit 4: Tree Based and Probabilistic Models", link: "https://drive.google.com/file/d/12l-QebzZLnykyujkh2fM3Ou3QuhQ76Fy/view?usp=drivesdk" },
            { name: "Unit 5: Distance and Rule Based Models", link: "https://drive.google.com/file/d/16piUAs5v43eL4NKUQrvUkwmoUdg_4Hxs/view?usp=drivesdk" },
            { name: "Unit 6: Introduction to Artificial Neural Network", link: "https://drive.google.com/file/d/1yxov5v-BDQZwxxnHbqQquIeHGabNpsW1/view?usp=drivesdk" },
            { name: "Screenshots", link: "https://drive.google.com/drive/folders/1GRncLm1NrFmYhgmpWrXjo4qfu8mGbQhN" },
        ],
    },
    {
        title: "HCI",
        description: "Human Computer Interaction",
        semester: "V",
        topics: [
            { name: "Unit 1: Introduction", link: "https://drive.google.com/file/d/1IM1DV9mR6n4NvybL8WOMZa-0-0Xw58-t/view?usp=drivesdk" },
            { name: "Unit 2: Understanding the Human and Human Interaction", link: "https://drive.google.com/file/d/1RDW6769i2HrYZkJQ_NtcbLZI0QOdBXRy/view?usp=drivesdk" },
            { name: "Unit 3: HCI Models and Theories", link: "https://drive.google.com/file/d/1Dy41J6kdfOfW-tTk2suqz0feR4K9sNDu/view?usp=drivesdk" },
            { name: "Unit 4: Design Process", link: "https://drive.google.com/file/d/1E_z686ZrQz2xmoVz2LaUospiItghSaHs/view?usp=drivesdk" },
            { name: "Unit 5: HCI Guidelines and Evaluation Techniques", link: "https://drive.google.com/file/d/10caW_BouyFgQOJcxmEEh0XmjP1rUFmm_/view?usp=drivesdk" },
            { name: "Unit 6: Future Trends", link: "https://drive.google.com/file/d/1lMjKdOia5r1N7OJnBGm57uW-GmqdvOI6/view?usp=drivesdk" },
            { name: "Screenshots", link: "https://drive.google.com/drive/folders/1U5ffpc5yj5mOQwnj2mhazzBqeWygXXiv" },
        ],
    },
    {
        title: "DAA",
        description: "Design and Analysis of Algorithm (Elective I)",
        semester: "V",
        topics: [
            {name: "Unit 1: Introduction", link: "https://drive.google.com/file/d/1PftsnfC3NtYEaMW2pLGkOkLeSklzW9Je/view?usp=drivesdk" },
            { name: "Unit 2: Divide and Conquer and Greedy Methdd", link: "https://drive.google.com/file/d/1YU5hZKAPPysqckrYVSLDzmO2YO4O0cpm/view?usp=drivesdk" },
            { name: "Unit 3: Dynamic Programming", link: "https://drive.google.com/file/d/1ilv1BsJ0ofA_wql_rdAF2aN3QnVvXKLa/view?usp=drivesdk" },
            { name: "Unit 4: Backtracking", link: "https://drive.google.com/file/d/1P8E8ysLmuc-EaigErYGxA6bGutdJH1qh/view?usp=drivesdk" },
            { name: "Unit 5: Branch and Bound", link: "https://drive.google.com/file/d/13NBtzynSvtA9WOkRcPA5n8sYQ5YtWo9D/view?usp=drivesdk" },
            { name: "Unit 6: Computational Complexity", link: "https://drive.google.com/file/d/1PSNQ9M6ey9b57WC9jahfjgW-lbm9-aLc/view?usp=drivesdk" },
            { name: "Screenshots", link: "https://drive.google.com/drive/folders/1C1ckyF10dzzhMxl-azEANxgwssGkb3wv" },
        ],
    }
];
// === END: DATA STRUCTURE FOR 3RD YEAR NOTES (EDIT THIS SECTION) ===


type Topic = {
  name: string;
  link: string;
};

type Subject = {
  title: string;
  description: string;
  semester: string;
  topics: Topic[];
};


const ThirdYearNotesPage = async ({}) => {
//   const session = await getAuthSession();
//   if (!session?.user) {
//     return redirect("/");
//   }

  // Filter notes for SEMESTER V and VI
  const semVNotes = thirdYearNotes.filter(note => note.semester === "V") as Subject[];
  const semVINotes = thirdYearNotes.filter(note => note.semester === "VI") as Subject[];

  return (
    <main className="p-8 mx-auto max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b-2 border-dashed">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {/* Superscript for 'rd' in '3rd' */}
          3<sup className="text-xl">rd</sup> Year Notes
        </h1>
      </div>

      <div className="mt-6">
        <Link href="/notes" className={cn(buttonVariants({ variant: "outline" }), "mb-6")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </div>

      <Card className="mt-4">
        <CardContent className="space-y-8">
          {/* SEMESTER V SECTION: Using the interactive SubjectAccordion */}
          <SubjectAccordion notes={semVNotes} semesterName="V" />

          {/* SEMESTER VI SECTION: Using the interactive SubjectAccordion */}
          <SubjectAccordion notes={semVINotes} semesterName="VI" />

        </CardContent>
      </Card>
    </main>
  );
};

export default ThirdYearNotesPage;






/*
<Card className="mt-2">
  <CardHeader className="text-center">
    <CardTitle className="text-2xl font-bold">Notes</CardTitle>
  </CardHeader>

  <CardContent className="flex flex-col items-center justify-center p-8 text-center bg-muted/30 dark:bg-muted/50 rounded-b-xl">
    <CalendarClock className="w-12 h-12 text-yellow-500 mb-4 animate-pulse" />
    <h2 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400">
      Coming Soon!
    </h2>
    <p className="text-muted-foreground mt-2 max-w-sm">
      We are diligently compiling and updating the 3rd Year notes for you.
      Please check back later!
    </p>
  </CardContent>
</Card>;
*/