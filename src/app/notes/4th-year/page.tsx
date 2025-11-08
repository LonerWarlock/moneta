// src/app/notes/4th-year/page.tsx
import React from "react";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
// Import the new Client Component
import { SubjectAccordion } from "@/components/Notes/SubjectAccordion";
import { ChevronLeft } from "lucide-react"; 
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "4th Year Notes | Moneta",
  description: "Access your curated Google Drive study notes for 4th Year.",
};

// === NEW NESTED DATA STRUCTURE FOR 4TH YEAR NOTES ===
const fourthYearNotes = [
  // --- Semester VII Notes ---
  {
    title: "LP-III",
    description: "Laboratory Practice III",
    semester: "VII",
    topics: [
      { name: "LP-III Oral Notes", link: "https://drive.google.com/drive/lp3-topic1-link" },
    ],
  },
  {
    title: "LP-IV",
    description: "Laboratory Practice IV",
    semester: "VII",
    topics: [
      { name: "Feedforward Neural Network (MNIST Dataset)", link: "https://colab.research.google.com/drive/1cRSuKkYPY6C22XeHoiHlzJz73IEnIeWk?usp=sharing" },
      { name: "Feedforward Neural Network (CIFAR-10 Dataset)", link: "https://colab.research.google.com/drive/1L3vMqV_xA4UcPhY6zS8RYn_1Tf5EBOYo?usp=sharing" },
      { name: "Convolutional Neural Network (MNIST Dataset)", link: "https://colab.research.google.com/drive/1wmB4r8-WTHr0NEdXWwK86Y3aMSsYbBmH?usp=sharing" },
      { name: "Convolutional Neural Network (CIFAR-10 Dataset)", link: "https://colab.research.google.com/drive/1pktDtusoaTfOi6Um2to1Tm-0Rd3t7gNW?usp=drive_link" },
      { name: "Anomaly Detection (ECG Dataset)", link: "https://colab.research.google.com/drive/1z9aiVZkrhdCpFb4ZvjSwXWIIc4qM51pM?usp=sharing"},
      { name: "Anomaly Detection (Credit Card Dataset)", link: "https://colab.research.google.com/drive/1CExfKTfLcsz_GvK2g-oUt9guHx63W__a?usp=drive_link"},
      { name: "Continuous Bag of Words (CBOW)", link: "https://colab.research.google.com/drive/1E_7nyxPDCyVKjAP6OsxljuY58Uch69Kv?usp=sharing"},
      { name: "Transfer Learning (VGG16)", link: "https://colab.research.google.com/drive/1nSm1U56Fz4psJxlggTeQWdUlczU6YfbM?usp=sharing" },
      { name: "Datasets", link: "https://drive.google.com/drive/folders/1Kv2HcDKaFByzI1EAU5wgsNCuVqK-uRvc?usp=sharing" },
    ],
  },
  // --- Semester VIII Notes ---
  /*
  {
    title: "Elective IV: Cloud Computing",
    description: "Notes for Cloud Computing (Elective IV).",
    semester: "VIII",
    topics: [
      { name: "CC Unit 1: Cloud Architecture", link: "https://drive.google.com/drive/cc-unit1-link" },
      { name: "CC Unit 2: Virtualisation", link: "https://drive.google.com/drive/cc-unit2-link" },
    ],
  },
  */
];

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


const FourthYearNotesPage = async ({}) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  // Filter notes for each semester
  const semVIINotes = fourthYearNotes.filter(note => note.semester === "VII") as Subject[];
  const semVIIINotes = fourthYearNotes.filter(note => note.semester === "VIII") as Subject[];

  return (
    <main className="p-8 mx-auto max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b-2 border-dashed">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
         4<sup className="text-xl">th</sup> Year Notes
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
          {/* SEMESTER VII SECTION: Using the interactive SubjectAccordion */}
          <SubjectAccordion notes={semVIINotes} semesterName="VII" />

          {/* SEMESTER VIII SECTION: Using the interactive SubjectAccordion */}
          <SubjectAccordion notes={semVIIINotes} semesterName="VIII" />
        </CardContent>
      </Card>
    </main>
  );
};

export default FourthYearNotesPage;