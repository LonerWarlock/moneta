"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

type Props = {
  users: any[];
};

const UserTable = ({ users }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader className="px-4 py-4">
        <CardTitle className="text-xl">User Directory</CardTitle>
      </CardHeader>

      <CardContent className="p-0">

        {/* 🔥 MOBILE */}
        <div className="block md:hidden max-h-[300px] overflow-y-auto px-3 py-2 space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-lg border px-3 py-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={user.image} />
                  <AvatarFallback>
                    {user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-sm truncate">
                    {user.name || "Anonymous"}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </span>
                </div>
              </div>

              {user.hasGivenFeedback ? (
                <Badge className="bg-emerald-500 text-[10px] gap-1 px-2">
                  <CheckCircle2 className="w-3 h-3" /> Done
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px] gap-1 px-2">
                  <XCircle className="w-3 h-3" /> Pending
                </Badge>
              )}
            </div>
          ))}
        </div>

        {/* 💻 DESKTOP */}
        <div className="hidden md:block max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="w-[200px]">User</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-3 py-3 px-4">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={user.image} />
                      <AvatarFallback>
                        {user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-sm truncate">
                        {user.name || "Anonymous"}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center py-3 px-4">
                    {user.hasGivenFeedback ? (
                      <Badge className="bg-emerald-500 text-xs gap-1 px-2">
                        <CheckCircle2 className="w-3 h-3" /> Submitted
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs gap-1 px-2">
                        <XCircle className="w-3 h-3" /> Pending
                      </Badge>
                    )}
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

export default UserTable;