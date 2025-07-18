"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";
import { useRouter } from "next/navigation";

// type Props = {};

const HistoryCard = ({/*props: Props*/}) => {
  const router = useRouter();
  return (
    <Card
      className="hover:cursor-pointer hover:capacity-75"
      onClick={() => router.push("/history")}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Recent Quizes</CardTitle>
        <History size={24} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          View your recent quiz attempts and track your progress over time.
        </p>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
