import React from "react";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { TopicGroup } from "@/components/Interview/TopicGroup";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Interview Preparation | Moneta",
  description: "Curated topic notes for interview preparation.",
};

const webFundamentals = [
  {
    name: "HTML",
    description: "HyperText Markup Language — the foundation of web pages",
    link: "https://drive.google.com/file/d/1mpCQsBICRyliTNkaRnc2oZjEaeVUhF10/view",
  },
  {
    name: "CSS",
    description: "Cascading Style Sheets — styling and layout",
    link: "https://drive.google.com/file/d/1ZCGjPHEvXC5HK-Cnf5E1rDgtLvIoHgO8/view",
  },
  {
    name: "Javascript",
    description: "Core programming language of the web",
    link: "https://drive.google.com/file/d/1pO_XBojrxS4qZE6oWbdHYRCV8Hap95Py/view",
  },
  {
    name: "Jquery",
    description: "Fast and feature-rich JavaScript library",
    link: "https://drive.google.com/file/d/1_akvfFBNX0jchZC82FUbcIVvLtIMIdVg/view",
  },
];

const frontendFullstack = [
  {
    name: "REACT",
    description: "A JavaScript library for building user interfaces",
    link: "https://drive.google.com/file/d/1W9xAOGe6ALe-SmZSjbcCLihods25ASze/view",
  },
  {
    name: "MERN",
    description: "MongoDB, Express.js, React, Node.js — full stack development",
    link: "https://drive.google.com/file/d/1BMBKBPlCnXYKDiiZ8isCfIMkuUvOS_Wr/view",
  },
];

const databases = [
  {
    name: "SQL-50",
    description: "50 essential SQL queries and database operations",
    link: "https://drive.google.com/file/d/1TtyzHCpAzKwsW9cacECf5qgmFBMHvpKy/view",
  },
  {
    name: "DBMS",
    description: "Database Management Systems — core concepts and architecture",
    link: "https://drive.google.com/file/d/1pPAroNJ0ufz0se6SSl_LiutivhhJDhlc/view",
  },
];

const csFundamentals = [
  {
    name: "OS",
    description: "Operating Systems — process, memory, and file management",
    link: "https://drive.google.com/file/d/1Z774D8Dduz9cFsVDqpdsuMUO7DT4aY-_/view",
  },
  {
    name: "OOP",
    description: "Object-Oriented Programming — concepts and principles",
    link: "https://drive.google.com/file/d/1b9rPOfycvuWGgT0A14B-T4kF9oamFDF1/view",
  },
];

const InterviewPage = async () => {
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
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: "outline" }), "mb-6")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <Card className="mt-4">
        <CardContent className="space-y-8">
          <TopicGroup categoryName="Web Fundamentals" topics={webFundamentals} />
          <TopicGroup categoryName="Frontend & Full Stack" topics={frontendFullstack} />
          <TopicGroup categoryName="Databases" topics={databases} />
          <TopicGroup categoryName="CS Fundamentals" topics={csFundamentals} />
        </CardContent>
      </Card>
    </main>
  );
};

export default InterviewPage;
