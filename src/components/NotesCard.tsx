"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type NotesCardProps = {
  title: string;
  description: string;
  bgClass?: string;
  route: string;
  icon?: React.ReactNode;
};

const NotesCard = ({
  title,
  description,
  bgClass = "bg-emerald-500 text-white",
  route,
  icon,
}: NotesCardProps) => {
  const router = useRouter();

  return (
    <Card
      className={`hover:cursor-pointer hover:opacity-90 transition-opacity ${bgClass}`}
      onClick={() => router.push(route)}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        {icon}
      </CardHeader>

      <CardContent>
        <p className="text-sm text-white/90">{description}</p>
      </CardContent>
    </Card>
  );
};

export default NotesCard;