// "use client";

// import React, { FormEvent } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useLoginMutation } from "@/request/mutation";
// import { DarkMode } from "../darkModeChange";

// const formSchema = z.object({
//   email: z.string().email("To‘g‘ri email kiriting").min(5),
//   password: z.string().min(8, "Kamida 8 ta belgi bo‘lishi kerak"),
// });

// type FormData = z.infer<typeof formSchema>;
// const GlassLogin = () => {
//   const { mutate, isPending } = useLoginMutation();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//   });
//   const onSubmit = (data: FormData) => {
    
//     mutate(data);
//   };

//   return (
//     <div className="h-screen relative w-full flex items-center justify-center bg-gradient-to-br from-background to-background px-4">
//       <div className="absolute top-5 left-5">
//         <DarkMode />
//       </div>
//       <div className="backdrop-blur bg-white/5 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
//         <h2 className="text-3xl font-semibold text-foreground text-center mb-4">
//           Xush kelibsiz 👋
//         </h2>
//         <p className="text-foreground text-sm text-center mb-6">
//           Hisobingizga kirish uchun email va parolni kiriting
//         </p>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           <div className="flex flex-col gap-1">
//             <label htmlFor="email" className="text-foreground font-medium">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="you@example.com"
//               className="bg-background text-foreground placeholder-white px-3 py-2 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
//               {...register("email")}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>

//           <div className="flex flex-col gap-1">
//             <label htmlFor="password" className="text-foreground font-medium">
//               Parol
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="********"
//               className="bg-background text-foreground placeholder-white px-3 py-2 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-foreground/60"
//               {...register("password")}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={isPending}
//             className="w-full bg-foreground text-background py-2 px-4 rounded transition"
//           >
//             {isPending ? "Yuklanmoqda..." : "Kirish"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default GlassLogin;

"use client";

import React, { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DarkMode } from "../darkModeChange";
import { useLoginMutation } from "@/request/mutation";

const formSchema = z.object({
  email: z.string().email("To‘g‘ri email kiriting").min(5),
  password: z.string().min(8, "Kamida 8 ta belgi bo‘lishi kerak"),
});

const GlassLogin = () => {
  const { mutate, isPending } = useLoginMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
    if (isPending) {
      console.log(values);
    }
  }

  return (
    <div className="h-screen  relative  w-full flex items-center justify-center bg-gradient-to-br from-background to-background px-4">
      <div className="absolute top-5 left-5   ">
        <DarkMode />
      </div>
      <div className="backdrop-blur bg-white/5 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-semibold text-foreground text-center mb-4">
          Xush kelibsiz 👋
        </h2>
        <p className="text-foreground text-sm text-center mb-6">
          Hisobingizga kirish uchun email va parolni kiriting
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      className="bg-white/40 text-foreground  placeholder-white focus-visible:ring-foreground border border-white/30"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Parol</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      className="bg-white/40 text-foreground placeholder-white focus-visible:ring-white/70 border border-white/30"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full transition">
              Kirish
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};