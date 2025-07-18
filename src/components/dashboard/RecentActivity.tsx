import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';

// type Props = {};

const RecentActivities = ({/*props: Props*/}) => {
  return(
    <Card className="col-span-4 lg:col-span-3">
        <CardHeader>
            <CardTitle className="text-2xl font-bold">Recent Activities</CardTitle>
            <CardDescription>
                You have no recent activities.
            </CardDescription>
        </CardHeader>

        <CardContent className="max-h-[500px] overflow-scroll">
            History
        </CardContent>

    </Card>
  );
};

export default RecentActivities;