// src/components/Notes/SubjectAccordion.tsx
"use client";

import React from "react";
// import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, ArrowUpRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Types mirrored from the page.tsx file
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

type Props = { 
    notes: Subject[], 
    semesterName: string 
};

export const SubjectAccordion = ({ notes, semesterName }: Props) => {
  // Local state to track which subject's topics are open.
  const [openSubject, setOpenSubject] = React.useState<string | null>(null);

  const toggleSubject = (title: string) => {
    setOpenSubject(openSubject === title ? null : title);
  };

  return (
    <div className="pb-6">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-primary">
        Semester {semesterName}
      </h3>
      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.map((subject, index) => {
            const isOpen = openSubject === subject.title;
            return (
              <div
                key={index}
                className="border rounded-lg transition-shadow bg-card shadow-sm"
              >
                {/* Accordion Trigger/Header */}
                <div
                  onClick={() => toggleSubject(subject.title)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="w-6 h-6 text-emerald-500" />
                    <div className="flex flex-col text-left">
                      <span className="text-lg font-semibold">{subject.title}</span>
                      <span className="text-sm text-muted-foreground">{subject.description}</span>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 ml-2 transition-transform duration-200",
                      isOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                </div>

                {/* Accordion Content/Dropdown List */}
                {isOpen && (
                  <div className="border-t bg-muted/30 dark:bg-muted/50 transition-all duration-300 overflow-hidden">
                    <div className="p-4 space-y-2">
                      
                      {subject.topics.length > 0 ? (
                        subject.topics.map((topic, topicIndex) => (
                          <a
                            key={topicIndex}
                            href={topic.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-3 py-2 bg-background rounded-md transition-colors hover:bg-secondary"
                          >
                            <span className="text-sm text-foreground">{topic.name}</span>
                            <ArrowUpRight className="w-4 h-4 text-primary" />
                          </a>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No individual topic links available yet.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-muted-foreground">No notes currently available for Semester {semesterName}.</p>
        )}
      </div>
    </div>
  );
};