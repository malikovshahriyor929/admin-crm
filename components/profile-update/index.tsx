"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditProfileMutaion } from "@/request/mutation";
import Cookies from "js-cookie";
const formSchema = z.object({
  email: z.string().email("To‘g‘ri email kiriting").min(5),
  last_name: z.string().min(5),
  first_name: z.string().min(5),
});
export interface EditProfileType {
  first_name: string;
  last_name: string;
  email: string;
}
const Profile_tools = ({
  setUserInfo,
  userInfo,
}: {
  setUserInfo: any;
  userInfo: any;
}) => {
  const { mutate } = useEditProfileMutaion();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });
  const userCookie = Cookies.get("user");
  const addAdmin = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess() {
        setOpen(false);
        form.reset();
      },
    });
    if (userCookie) {
      const profile = JSON.parse(userCookie);
      Cookies.set("user", JSON.stringify({ ...profile, ...values }));
      setUserInfo({
        ...userInfo,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
      });
    }
  };
  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => {
          const userCookie = Cookies.get("user");
          if (userCookie) {
            const profile = JSON.parse(userCookie); // 👈 parse cookie if it's JSON
            form.reset({
              first_name: profile.first_name || "",
              last_name: profile.last_name || "",
              email: profile.email || "",
            });
          }
          setOpen(true);
        }}
        size="sm"
      >
        O'zgartirish
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addAdmin)}
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

export default Profile_tools;
