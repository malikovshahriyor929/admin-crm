"use client";
import { SidebarType } from "@/types";
import { other_links, sidebarLinks } from "@/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { LogOut } from "lucide-react";
import Cookie from "js-cookie";
import { notificationApi } from "@/shared/generics/notification";
import { SidebarTrigger } from "../ui/sidebar";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const notify = notificationApi();
  return (
    <div className="w-[300px border-r border-foreground/40 h-full bg-background max-[350px]:">
      <div className="p-4 flex items-center justify-between">
        <h1 className=" font-bold">Admin CRM</h1>
        <SidebarTrigger className="hidden max-[400px]:flex" />
      </div>
      <div className="p-4 h-[calc(100vh-3.5rem) overflow-y-scrol">
        <h2 className="font-semibold  mb-4">Menu</h2>
        <ul className="space-y-2">
          {sidebarLinks.map((link: SidebarType) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all border border-transparent  ${
                  pathname === link.path
                    ? "!border-foreground/40  "
                    : "hover:!border-foreground/70 "
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="font-semibold  my-4">Boshqalar</h2>
        <ul className="space-y-2">
          {other_links.map((link: SidebarType) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all border border-transparent  ${
                  pathname === link.path
                    ? "!border-foreground/40  "
                    : "hover:!border-foreground/70 "
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
          <div
            onClick={() => {
              router.push("/login");
              Cookie.remove("token");
              Cookie.remove("user");
              notify("LogOut");
            }}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all border border-transparent hover:!border-foreground/70`}
          >
            <LogOut />
            Chiqish
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
