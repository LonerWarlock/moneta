import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CustomWordCloud from '../CustomWordCloud';
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
                Click on the most searched topics to be part of the latest discussions and resources.
            </CardDescription>
        </CardHeader>

        <CardContent className="pl-2">
            <CustomWordCloud formattedTopics={formattedTopics} />
        </CardContent>
    </Card>
  );
};

export default HotTopicsCard;