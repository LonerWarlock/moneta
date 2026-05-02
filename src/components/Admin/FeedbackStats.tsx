"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  feedbacks: any[];
};

const FeedbackStats = ({ feedbacks }: Props) => {
  const avgRating = feedbacks.length > 0 
    ? (feedbacks.reduce((acc, curr) => acc + curr.supportRating, 0) / feedbacks.length).toFixed(1)
    : 0;

  const chartData = Array.from({ length: 10 }, (_, i) => ({
    rating: i + 1,
    count: feedbacks.filter((f) => f.supportRating === i + 1).length,
  }));

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-8">
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-xl">Average Support</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[150px] md:h-[200px]">
          <div className="text-5xl md:text-6xl font-bold text-emerald-600">{avgRating}</div>
          <div className="text-lg md:text-xl text-muted-foreground ml-2">/ 10</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-xl">Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[150px] md:h-[200px] p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="rating" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackStats;