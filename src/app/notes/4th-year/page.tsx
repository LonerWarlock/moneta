// src/app/notes/4th-year/page.tsx
import React from "react";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, ArrowUpRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "4th Year Notes | Moneta",
  description: "Access your curated Google Drive study notes for 4th Year.",
};

// === 4th Year Specific Notes Links (Categorised by Semester) ===
const fourthYearNotes = [
    // --- Semester VII Notes ---
    { 
        title: "LP-III", 
        link: "https://drive.google.com/file/d/11oKT3W67wu1Oy6x3ogiMnZx6diiKnRoJ/view?usp=drive_link", // <--- UPDATE THIS LINK
        description: "Laboratory Practice III",
        semester: "VII"
    },
    { 
        title: "ISR", 
        link: "https://drive.google.com/drive/folders/11ZPlZWe_Ds_DtLzM5dM6ueVii5NsWwMq?usp=drive_link", // <--- UPDATE THIS LINK
        description: "Information Storage and Retrieval",
        semester: "VII"
    },
    
    // --- Semester VIII Notes (Original Notes now in Sem VIII) ---
    /*
    { 
        title: "Dissertation Research (PDF)", 
        link: "https://drive.google.com/open?id=YOUR_4TH_YEAR_DISSERTATION_ID",
        description: "Guidelines and methodology notes for your final project.",
        semester: "VIII"
    },
    { 
        title: "Advanced Game Theory (PDF)", 
        link: "https://drive.google.com/open?id=YOUR_4TH_YEAR_GAMETHEORY_ID",
        description: "Complex strategies and solution concepts notes.",
        semester: "VIII"
    },
    */
];

const FourthYearNotesPage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/"); 
  }

  // Filter notes for each semester
  const semVIINotes = fourthYearNotes.filter(note => note.semester === "VII");
  const semVIIINotes = fourthYearNotes.filter(note => note.semester === "VIII");

  // Helper component to render a list of notes for a given semester
  const renderNotesSection = (notes: typeof fourthYearNotes, semesterName: string) => (
      <div className="pb-6">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-primary">
              Semester {semesterName}
          </h3>
          <div className="space-y-4">
              {notes.length > 0 ? (
                  notes.map((note, index) => (
                      <div 
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg transition-shadow hover:shadow-md"
                      >
                          <div className="flex items-center space-x-4">
                              <FileText className="w-6 h-6 text-emerald-500" />
                              <div className="flex flex-col">
                                  <span className="text-lg font-semibold">{note.title}</span>
                                  <span className="text-sm text-muted-foreground">{note.description}</span>
                              </div>
                          </div>
                          <a 
                              href={note.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={cn(buttonVariants({ variant: "default" }))}
                          >
                              View Notes
                              <ArrowUpRight className="w-4 h-4 ml-2" />
                          </a>
                      </div>
                  ))
              ) : (
                  <p className="text-muted-foreground">No notes currently available for Semester {semesterName}.</p>
              )}
          </div>
      </div>
  );

  return (
    <main className="p-8 mx-auto max-w-4xl">
        <div className="flex items-center justify-between pb-4 border-b-2 border-dashed">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                4th Year Notes
            </h1>
        </div>

        <div className="mt-6">
            <Link href="/notes" className={cn(buttonVariants({ variant: "outline" }), "mb-6")}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Years
            </Link>
        </div>

        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Available Documents</CardTitle>
                <CardDescription>
                    Click below to open the 4th Year notes.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* SEMESTER VII SECTION */}
                {renderNotesSection(semVIINotes, "VII")}

                {/* SEMESTER VIII SECTION */}
                {renderNotesSection(semVIIINotes, "VIII")}
            </CardContent>
        </Card>
    </main>
  );
};

export default FourthYearNotesPage;