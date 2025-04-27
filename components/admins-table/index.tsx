"use client";
import React, { useState } from "react";
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
import { deleteAdminCase, useEditMutation } from "@/request/mutation";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Admin_tools from "./admin-add";
const formSchema = z.object({
  email: z.string().email("To‘g‘ri email kiriting").min(5),
  last_name: z.string().min(5),
  first_name: z.string().min(5),
});

const AdminsTableComponent = () => {
  const { mutate } = useEditMutation();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // const [selectedUserForDelete, setSelectedUserForDelete] =
  //   useState<User | null>(null);
  const deleteAdminCas = deleteAdminCase();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admins"],
    queryFn: () =>
      Myaxios.get("/api/staff/all-admins").then((res) => res.data.data),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      last_name: "",
      first_name: "",
    },
  });
  const editAdmin = (values: z.infer<typeof formSchema>) => {
    mutate(
      {
        ...values,
        _id: selectedUser?._id,
        status: selectedUser?.status,
      },
      {
        onSuccess(data) {
          console.log(data);
          setOpen(false);
          form.reset();
        },
      }
    );
  };
  const delteAdmin = (data: User) => {
    Myaxios({
      url: "/api/staff/deleted-admin",
      data: { _id: data?._id },
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then(() => {
      // if (selectedUserForDelete?._id) {
      deleteAdminCas(data);
      // }
    });
  };
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  return (
    <div className=" relative">
      <div className="flex items-center justify-between  ">
        <h2 className="text-xl font-semibold mb-4 max-[400px]:text-lg">Aminlar ro'yxati</h2>
        <div>{user?.role == "manager" && <Admin_tools />}</div>
      </div>
      <Table>
        <TableHeader className="">
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
          {!isLoading || isError
            ? data?.map((user: User, idx: number) => (
                <TableRow key={user._id ? user._id : idx}>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        onClick={() => {
                          setSelectedUser(user);
                          form.setValue("email", user.email);
                          form.setValue("last_name", user.last_name);
                          form.setValue("first_name", user.first_name);
                          setOpen(true);
                        }}
                        size="sm"
                        variant="outline"
                      >
                        <Pencil className="w-4 h-4 mr-1" /> Tahrirlash
                      </Button>
                      <Button
                        onClick={() => delteAdmin(user)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> O'chirish
                      </Button>
                    </TableCell>
                  </Dialog>
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit admins</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(editAdmin)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminsTableComponent;
