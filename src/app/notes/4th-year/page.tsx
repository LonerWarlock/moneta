// src/app/notes/4th-year/page.tsx
import React from "react";
// import { getAuthSession } from "@/lib/nextauth";
// import { redirect } from "next/navigation";
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
    title: "ISR",
    description: "Information and Storage Retrieval",
    semester: "VII",
    topics: [
        {name: "Unit 1: Introduction to Information Retrieval", link: "https://drive.google.com/file/d/15pHjnkG2qmtN2dk4kbPzy-5sHK39fuwD/view?usp=drive_link"},
        {name: "Unit 2: Indexing and Searching Techniques", link: "https://drive.google.com/file/d/1W2vfuDEYaNiqK1341nECOXBt9KotrJsg/view?usp=drive_link"},
        {name: "Unit 3: Evaluation and Visualization of Information Retrieval System", link: "https://drive.google.com/file/d/1LGWWSqAxl9w1Di1sGN3ScZt6O2lf7pA4/view?usp=drive_link"},
        {name: "Unit 4: Distributed and Multimedia IR", link: "https://drive.google.com/file/d/1TDAMLOr7CvjDqAVnVKEkw9dWFCWodRKT/view?usp=sharing"},
        {name: "Unit 5: Web Searching", link: "https://drive.google.com/file/d/1PiqcA2EEa-CL88BocEC-kPfVOId78dJP/view?usp=drive_link"},
        {name: "Unit 6: Advanced Information Retrieval", link: "https://drive.google.com/file/d/1qgk_E9x9GaZPZcPobnugAjS3RrZcG172/view?usp=drive_link"},
        {name: "ISR Endsem Decode", link: "https://drive.google.com/file/d/12Plkdja_5VHGsczf7r4KuA2qmAhVMU7j/view?usp=drive_link"},
        {name: "PYQs", link: "https://drive.google.com/drive/folders/1ScTrOXZELzwoSNtujicfN9Taq_c6RTz5?usp=drive_link"},
    ],
  },
  {
    title: "SPM",
    description: "Software Project Management",
    semester: "VII",
    topics: [
        {name: "Unit 1: Introduction to Software Project Management", link: "https://drive.google.com/file/d/11AsP7MkjSkzzzRH3Ex4W8DThlVx2YXIZ/view?usp=drive_link"},
        {name: "Unit 2: Project Design and Evaluation", link: "https://drive.google.com/file/d/1qMCYR6vt8G97q1mV0UKmxiA9hGj-OEck/view?usp=drive_link"},
        {name: "Unit 3: Activity Planning & Risk Management", link: "https://drive.google.com/file/d/10GKygkW0-9OPfFLtos7KOqA75vpwM6AF/view?usp=drive_link"},
        {name: "Unit 4: Project Tracking, Monitoring & Control", link: "https://drive.google.com/file/d/12O-GDHQ6x3vhbgNo0c4fI1kHil7xjpFI/view?usp=drive_link"},
        {name: "Unit 5: Managing People and Organizing Teams", link: "https://drive.google.com/file/d/1rEcp40QR6UQQ1aT4i6HwYEYYF360WDKB/view?usp=sharing"},
        {name: "Unit 6: Applications of Software Project Management in Industry", link: "https://drive.google.com/file/d/169mdBoUFkuu9Accblg1HmLIk5jaHBCqo/view?usp=sharing"},
        {name: "SPM Endsem Decode", link: "https://drive.google.com/file/d/1cIAZhKBR0judIIUYSvVC_h29dRUE1nUG/view?usp=drive_link"},
        {name: "SPM Endsem Technical", link: "https://drive.google.com/file/d/16srza3muL9roptcsS8l7jO_G4-F7StMi/view?usp=drive_link"},
        {name: "PYQs", link: "https://drive.google.com/drive/folders/1qQNQ2fSKTqG9NgNr312oQcFLOliikUnJ?usp=drive_link"},
    ],
  },
  {
    title: "DL",
    description: "Deep Learning",
    semester: "VII",
    topics: [
        {name: "Unit 1: Fundamentals of Deep Learning", link: "https://drive.google.com/file/d/1-L_7P-25e6IgpmuctJI1nsjSkBWD-qRy/view?usp=drive_link"},
        {name: "Unit 2: Convolutional Neural Network", link: "https://drive.google.com/file/d/1uaw-AD7zqcF8b0zbmhEHzSf67jsCq44Y/view?usp=drive_link"},
        {name: "Unit 3: Recurrent Neural Networks", link: "https://drive.google.com/file/d/1vFtjrO_Uk1pBId6HXlhiCtOnweiJic65/view?usp=drive_link"},
        {name: "Unit 4: Autoencoders", link: "https://drive.google.com/file/d/1nVROejMzgEOz9-AAHDoAHhmzuqOK-e8G/view?usp=sharing"},
        {name: "Unit 5: Representation Learning", link:"https://drive.google.com/file/d/1pLbjQj5kLO60NhFzFQTjPbDQ0MlFjanz/view?usp=sharing"},
        {name: "Unit 6: Applications of Deep Learning", link: "https://drive.google.com/file/d/1EyFYY-udKaCZ2krkQYuYBbfJszDoj5ED/view?usp=drive_link"},
        {name: "DL Endsem Decode", link: "https://drive.google.com/file/d/1Gvgq0N8uuPK991NH_zWD1UeLFTySldTt/view?usp=drive_link"},
        {name: "DL Endsem Technical", link: "https://drive.google.com/file/d/1DO_Kvl2Wy-FGuxOJb5uibrpgzJij-l28/view?usp=drive_link"},
        {name: "PYQs", link: "https://drive.google.com/drive/folders/1Ul_hsY2I19rJkPcxFtUPMF7D2_WKPKj1?usp=drive_link"},
        {name: "Screenshots", link: "https://drive.google.com/drive/folders/16yGcFSUXztZOrNVteyzLA0NcnCv-rPY3?usp=drive_link"},
    ],
  },
  {
    title: "HPC",
    description: "High Performance Computing (Elective III)",
    semester: "VII",
    topics: [
        {name: "Unit 1: Introduction to Parallel Computing", link: "https://drive.google.com/file/d/1zieGshOyY9g8rBqBt77EaBR6zE6Ettj6/view?usp=drive_link"},
        {name: "Unit 2: Principles of Parallel Algorithm Design", link: "https://drive.google.com/file/d/1ZAEKxPo529zYI1Nv_ivwcYzy0_1clk9X/view?usp=drive_link"},
        {name: "Unit 3: Basic Communication", link: "https://drive.google.com/file/d/1l2m8uhzosRFM5yJYLhN9aYGJBjqZwPHz/view?usp=drive_link"},
        {name: "Unit 4: Analytical Modeling of Parallel Programs", link: "https://drive.google.com/file/d/1BFwdoGbliU_9otFrV-3CWtKlqR_2yGU1/view?usp=drive_link"},
        {name: "Unit 5: Shared Memory Programming", link:"https://drive.google.com/file/d/1VZXN6E4CjlcGQbjAhV4VEZpWPvbKr7Ah/view?usp=sharing"},
        {name: "Unit 6: Parallel Algorithms and Applications", link: "https://drive.google.com/file/d/1gmtR8m4zFJ7h98KQsG-Y1gGba2txLjDx/view?usp=drive_link"},
        {name: "PYQs", link: "https://drive.google.com/drive/folders/10uBA7BMYh09L6wGfyX1Qyxl8aMbcwZSS?usp=drive_link"},
        {name: "INSEM Question Bank", link: "https://drive.google.com/file/d/1wXL6UYDacORTPkgfT308RPYak17pRSCk/view?usp=drive_link"},
    ],
  },
  {
    title: "MC",
    description: "Mobile Computing (Elective III)",
    semester: "VII",
    topics: [
        {name: "PYQs", link: "https://drive.google.com/drive/folders/1-x__VIs-P_ZvMOqB2VhA5kbMVqYKZz2w?usp=drive_link"},
    ],
  },
  {
    title: "DevOps",
    description: "Introduction to DevOps (Elective IV)",
    semester: "VII",
    topics: [
        {name: "Unit 1: Introduction to DevOps and the Culture", link: "https://drive.google.com/file/d/1JHkJZMk7B1dvmoTNPRZkvLBTt4-xzZNy/view?usp=drive_link"},
        {name: "Unit 2: Microservices Architecture and Cloud Native Development", link: "https://drive.google.com/file/d/1oHN7_vij401cY9pcvieSII5rtsRDVc4c/view?usp=drive_link"},
        {name: "Unit 3: Will be uploaded by 19 Dec 3:00pm", link: ""},
        {name: "Unit 4: Will be uploaded by 19 Dec 9:00pm", link: ""},
        {name: "Unit 5: Will be uploaded by 20 Dec 3:00pm", link: ""},
        {name: "Unit 6: Will be uploaded by 20 Dec 9:00pm", link: ""},
        {name: "DevOps Endsem Techknowledge", link: "https://drive.google.com/file/d/1OhrjdRlSCcyEuFi23BHHyOYkEaIRgsmB/view?usp=sharing"},
        {name: "PYQs", link: "https://drive.google.com/drive/folders/1Cei5lOw1qcEMJo_FJusRrZu9Ld3ygwpq?usp=drive_link"},
    ],
  },
  {
    title: "LP-III",
    description: "Laboratory Practice III",
    semester: "VII",
    topics: [
      { name: "LP-III Oral Notes", link: "https://drive.google.com/file/d/11oKT3W67wu1Oy6x3ogiMnZx6diiKnRoJ/view?usp=drive_link" },
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
      { name: "Transfer Learning (VGG16)", link: "https://colab.research.google.com/drive/1c8r-xJDJ7t7YJpYto2P34q-cBDUU_i4d?usp=sharing" },
      { name: "TL Dataset", link: "https://drive.google.com/drive/folders/1dylqJotdNxDNoMc8AsDCULxVLmlG0Qj0?usp=sharing" },
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
//    const session = await getAuthSession();
//    if (!session?.user) {
//      return redirect("/");
//    }

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