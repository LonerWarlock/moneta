// src/app/about/page.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeveloperCard from "@/components/About/DeveloperCard";
import { BookOpen, Code, Lightbulb, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "About Moneta | Notes App",
  description: "The story, mission, and people behind Moneta.",
};

type Contributor = {
  name: string;
  role: string;
  email: string;
  image: string;
  githubLink: string;
  linkedinLink: string;
  instagramLink: string;
};

const developers: Contributor[] = [
  {
    name: "Soham Phatak",
    role: "Lead Developer",
    email: "phataksoham2109@gmail.com",
    image: "/soham.jpg",
    githubLink: "https://github.com/LonerWarlock",
    linkedinLink: "https://www.linkedin.com/in/soham-phatak",
    instagramLink: "https://www.instagram.com/sohamphatak21/",
  },
  {
    name: "Prafulla Bhand",
    role: "Frontend Developer",
    email: "bhandprafulla@gmail.com",
    image: "/prafulla.jpg",
    githubLink: "https://github.com/Prafullabhand",
    linkedinLink: "https://www.linkedin.com/in/prafulla-bhand-508257290",
    instagramLink: "https://www.instagram.com/_prafulla29_xs/",
  },
];

const noteContributors: Contributor[] = [
  {
    name: "Soham Phatak",
    role: "SPPU IT-2019 Notes",
    email: "phataksoham2109@gmail.com",
    image: "/soham.jpg",
    githubLink: "https://github.com/LonerWarlock",
    linkedinLink: "https://www.linkedin.com/in/soham-phatak",
    instagramLink: "https://www.instagram.com/sohamphatak21/",
  },
  /*
  {
    name: "Prafulla Bhand",
    role: "Interview Preparation Guide",
    email: "bhandprafulla@gmail.com",
    image: "/prafulla.jpg",
    githubLink: "https://github.com/Prafullabhand",
    linkedinLink: "https://www.linkedin.com/in/prafulla-bhand-508257290",
    instagramLink: "https://www.instagram.com/_prafulla29_xs/",
  },
  {
    name: "Samyak Bora",
    role: "LP-VI (BAI) Notes | SPPU IT-2019 Sem-8",
    email: "samyakkiranbora@gmail.com",
    image: "",
    githubLink: "https://github.com/Samyakkb1008",
    linkedinLink: "https://www.linkedin.com/in/samyak-kiran-bora",
    instagramLink: "https://www.instagram.com/samyak_bora_108",
  },
  */
];

const AboutPage = async () => {
  return (
    <main className="p-8 mx-auto max-w-6xl">
      
      {/* Page Title */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-dashed mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          The Story Behind Moneta
        </h1>
        <Lightbulb className="h-8 w-8 text-yellow-500" />
      </div>

      {/* Section 1: About Moneta */}
      <section className="mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <BookOpen className="h-6 w-6" />
              <span>About Moneta</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-muted-foreground">
              'Moneta' is inspired by Juno Moneta, the Roman goddess associated
              with memory and preservation. The name reflects the core idea of
              this platform, creating a space where knowledge is stored,
              organized, and easily revisited. Moneta is built to help students
              retain what they learn by making study material structured,
              accessible, and reliable.
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-8" />

      {/* Section 2: Mission */}
      <section className="mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <BookOpen className="h-6 w-6" />
              <span>Our Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-muted-foreground">
              Moneta exists to remove friction from studying. By providing
              subject-wise simplified notes in one place, it enables faster,
              clearer, and more focused learning. Instead of searching endlessly
              for resources, students can concentrate on understanding and
              mastering concepts.
            </p>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-8" />

      {/* Developers */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-6 flex items-center space-x-2">
          <Code className="h-7 w-7 text-green-500" />
          <span>Our Creators</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((dev, index) => (
            <DeveloperCard key={index} developer={dev} />
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Contributors */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 flex items-center space-x-2">
          <Heart className="h-7 w-7 text-red-500" />
          <span>Our Note-masters</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {noteContributors.map((c, index) => (
            <DeveloperCard key={index} developer={c} />
          ))}
        </div>

        <div className="text-center pt-8 text-muted-foreground">
          Built by Students, for Students. Shared knowledge makes everyone better.
        </div>
      </section>
    </main>
  );
};

export default AboutPage;