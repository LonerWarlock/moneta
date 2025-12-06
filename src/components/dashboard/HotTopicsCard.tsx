// src/components/dashboard/HotTopicsCard.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// Assuming the file is now named WordCloud in a clean component structure
import WordCloud from '../CustomWordCloud'; 
import { prisma } from '@/lib/db';

// type Props = {};

const HotTopicsCard = async ({/*props: Props*/}) => {
  const topics = await prisma.topicCount.findMany({})
  const formattedTopics = topics.map(topic => {
    return {
      text: topic.topic,
      value: topic.count,
    }
  })
  return (
    <Card className="col-span-4">
        <CardHeader>
            <CardTitle className="text-2xl font-bold">Trending Topics</CardTitle>
            <CardDescription>
                Click on the most searched topics to be part of the latest discussions and resources. (Feature temporarily disabled)
            </CardDescription>
        </CardHeader>

        <CardContent className="pl-2">
            <WordCloud formattedTopics={formattedTopics} />
        </CardContent>
    </Card>
  );
};

export default HotTopicsCard;