"use client";

import React from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Props = {
  feedbacks: any[];
};

const FeedbackTable = ({ feedbacks }: Props) => {
  return (
    <Card className="mt-6 w-full">
      <CardHeader className="px-4 py-4">
        <CardTitle className="text-xl">Feedback Details</CardTitle>
      </CardHeader>

      <CardContent className="p-0">

        {/* 🔥 MOBILE VIEW (stacked cards) */}
        <div className="block md:hidden max-h-[300px] overflow-y-auto px-3 py-2 space-y-2">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="border rounded-lg p-3 space-y-2">
              
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={fb.user.image} />
                  <AvatarFallback>{fb.user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{fb.user.name}</span>
              </div>

              <div className="text-xs text-muted-foreground">
                {fb.college}
              </div>

              <div className="flex justify-between items-center">
                <Badge variant="outline" className="text-[10px]">
                  {fb.supportRating}/10
                </Badge>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-7 text-[10px] px-2">
                      View
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="w-[90vw] max-w-[400px]">
                    <DialogHeader>
                      <DialogTitle>Feedback: {fb.user.name}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>College:</span>
                        <span>{fb.college}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Rating:</span>
                        <span>{fb.supportRating}/10</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Scores Increased:</span>
                        <Badge variant={fb.scoresIncreased ? "default" : "destructive"}>
                          {fb.scoresIncreased ? "YES" : "NO"}
                        </Badge>
                      </div>

                      <div className="flex justify-between">
                        <span>Semester Catch Up:</span>
                        <Badge variant={fb.semesterCatchUp ? "default" : "destructive"}>
                          {fb.semesterCatchUp ? "YES" : "NO"}
                        </Badge>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>

        {/* 💻 DESKTOP VIEW (contained table) */}
        <div className="hidden md:block max-h-[400px] overflow-y-auto">
          <Table>

            {/* 🔥 sticky header */}
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>College</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead className="text-right px-4">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {feedbacks.map((fb) => (
                <TableRow key={fb.id}>
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={fb.user.image} />
                        <AvatarFallback>{fb.user.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{fb.user.name}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">{fb.college}</TableCell>

                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {fb.supportRating}/10
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right px-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="h-8 text-xs px-2">
                          View
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-[400px]">
                        <DialogHeader>
                          <DialogTitle>Feedback: {fb.user.name}</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>College:</span>
                            <span>{fb.college} {fb.graduationYear}</span>
                          </div>

                          <div className="flex justify-between">
                            <span>Rating:</span>
                            <span>{fb.supportRating}/10</span>
                          </div>

                          <div className="flex justify-between">
                            <span>Scores Increased:</span>
                            <Badge variant={fb.scoresIncreased ? "default" : "destructive"}>
                              {fb.scoresIncreased ? "YES" : "NO"}
                            </Badge>
                          </div>

                          <div className="flex justify-between">
                            <span>Semester Catch Up:</span>
                            <Badge variant={fb.semesterCatchUp ? "default" : "destructive"}>
                              {fb.semesterCatchUp ? "YES" : "NO"}
                            </Badge>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </div>

      </CardContent>
    </Card>
  );
};

export default FeedbackTable;