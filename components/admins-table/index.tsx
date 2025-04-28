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
import { MoreHorizontal } from "lucide-react";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Myaxios } from "@/request/axios";
import { Skeleton } from "../ui/skeleton";
import {
  deleteAdminCase,
  useEditMutation,
  useTatildaMutaion,
} from "@/request/mutation";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
const formSchema = z.object({
  email: z.string().email("To‘g‘ri email kiriting").min(5),
  last_name: z.string().min(5),
  first_name: z.string().min(5),
});

const tatilSchema = z.object({
  start_date: z.string(),
  end_date: z.string(),
  reason: z.string().min(5),
});

const AdminsTableComponent = () => {
  const { mutate } = useEditMutation();
  const [open, setOpen] = useState(false);
  const [tatil, setTatil] = useState({ bool: false, id: "" });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const deleteAdminCas = deleteAdminCase();
  const { mutate: tatilMutate } = useTatildaMutaion();
  const { data, isLoading, isError, refetch } = useQuery({
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
  const tatilForm = useForm<z.infer<typeof tatilSchema>>({
    resolver: zodResolver(tatilSchema),
    defaultValues: {
      start_date: "",
      end_date: "",
      reason: "",
    },
  });
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
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
      deleteAdminCas(data);
    });
  };
  const tatilFn = (values: z.infer<typeof tatilSchema>) => {
    tatilMutate(
      { ...values, _id: tatil.id },
      {
        onSuccess() {
          setTatil({ bool: false, id: "" });
          tatilForm.reset();
          refetch();
        },
      }
    );
  };
  const tatildanChiqish = (id: string) => {
    Myaxios.post("/api/staff/leave-exit-staff", { _id: id }).then(() =>
      refetch()
    );
  };
  return (
    <div className=" relative">
      <div className="flex items-center justify-between  ">
        <h2 className="text-xl font-semibold mb-4 max-[400px]:text-lg">
          Aminlar ro&apos;yxati
        </h2>
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
                    <TableCell className="text-right space-x-2 flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="">
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              form.setValue("email", user.email);
                              form.setValue("last_name", user.last_name);
                              form.setValue("first_name", user.first_name);
                              setOpen(true);
                            }}
                          >
                            Tahrirlash
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => delteAdmin(user)}>
                            O&apos;chirish
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              setTatil({ bool: true, id: user._id })
                            }
                          >
                            Ta&apos;tilga chiqarish
                          </DropdownMenuItem>
                          {user.status == "ta'tilda" && (
                            <DropdownMenuItem
                              onClick={() => tatildanChiqish(user._id)}
                            >
                              Tatildan chiqrish
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="">
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                          <DropdownMenuItem>O&apos;hirish</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
        </TableBody>
      </Table>
      {/* edit modal */}
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
      {/* tatil modal */}
      <Dialog
        open={tatil.bool}
        onOpenChange={() => setTatil({ bool: !tatil.bool, id: "" })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tatilga chiqarish</DialogTitle>
          </DialogHeader>
          <Form {...tatilForm}>
            <form
              onSubmit={tatilForm.handleSubmit(tatilFn)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={tatilForm.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Boshlanish sanasi
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="2025-05-1" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={tatilForm.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Tugash sanasi
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="2025-05-1" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={tatilForm.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Sabab</FormLabel>
                    <FormControl>
                      <Input placeholder="Tobi yoq" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Yuborish</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminsTableComponent;
