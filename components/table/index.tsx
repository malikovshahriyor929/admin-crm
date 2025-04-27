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
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Myaxios } from "@/request/axios";
import { Skeleton } from "../ui/skeleton";
const TableComponent = () => {
  const { data, isLoading,isError
   } = useQuery({
    queryKey: ["ashb"],
    queryFn: () =>
      Myaxios.get("/api/staff/all-managers").then((res) => res.data.data),
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Foydalanuvchilar ro'yxati</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ism</TableHead>
            <TableHead>Familiya</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Holat</TableHead>
            <TableHead className="text-center">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading||!isError
            ? data?.map((user: User) => (
                <TableRow key={user._id}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline">
                      <Pencil className="w-4 h-4 mr-1" /> Tahrirlash
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4 mr-1" /> O'chirish
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            : Array(10)
                .fill(1)
                .map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline">
                        <Pencil className="w-4 h-4 mr-1" /> Tahrirlash
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4 mr-1" /> O'chirish
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
