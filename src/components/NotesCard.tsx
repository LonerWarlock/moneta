// src/components/NotesCard.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenText } from "lucide-react";
import { useRouter } from "next/navigation";

const NotesCard = () => {
  const router = useRouter();
  return (
    <Card
      // A vibrant emerald background and white text for high contrast.
      // The hover opacity and transition provide a nice visual feedback.
      className="hover:cursor-pointer hover:opacity-90 transition-opacity bg-emerald-500 text-white dark:bg-emerald-600 dark:text-white"
      onClick={() => router.push("/notes")}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">SPPU IT-2019 Notes</CardTitle>
        <BookOpenText size={24} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-white/90 dark:text-white/80">
          Your central hub for learning resources. Click to access all the study material related to SPPU IT-2019 Pattern.
        </p>
      </CardContent>
    </Card>
  );
};

export default NotesCard;