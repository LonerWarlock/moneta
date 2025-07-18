import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CustomWordCloud from '../CustomWordCloud';

// type Props = {};

const HotTopicsCard = ({/*props: Props*/}) => {
  return (
    <Card className="col-span-4">
        <CardHeader>
            <CardTitle className="text-2xl font-bold">Trending Topics</CardTitle>
            <CardDescription>
                Click on a topic to explore the latest discussions and resources.
            </CardDescription>
        </CardHeader>

        <CardContent className="pl-2">
            <CustomWordCloud />
        </CardContent>
    </Card>
  );
};

export default HotTopicsCard;