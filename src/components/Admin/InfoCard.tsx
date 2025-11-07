// src/components/Admin/InfoCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
    title: string;
    value: number | string;
    icon: React.ReactNode;
};

const InfoCard = ({ title, value, icon }: Props) => {
  return (
    <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
            </CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold">{value}</div>
        </CardContent>
    </Card>
  );
};

export default InfoCard;