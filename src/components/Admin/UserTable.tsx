// src/components/Admin/UserTable.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import UserAvatar from "../UserAvatar"; 

// Defining the shape of the data we fetch from Prisma
type UserData = Pick<User, "id" | "name" | "email" | "image">;

type Props = {
  users: UserData[];
};

const UserTable = ({ users }: Props) => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Registered Users</CardTitle>
        <CardDescription>
          A full list of all users who have signed up.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableCaption>Total of {users.length} users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                    {/* FIX: Explicitly pass only name and image to UserAvatar to satisfy its prop type */}
                    <UserAvatar user={{ name: user.name, image: user.image }} />
                </TableCell>
                <TableCell className="font-medium">{user.name || "N/A"}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserTable;