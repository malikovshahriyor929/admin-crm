"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { ChevronRight, CircleUser, Users } from "lucide-react";
import { DarkMode } from "../darkModeChange";
import Cookies from "js-cookie";
import { User } from "@/types";

const Header = () => {
  const pathname = usePathname();
  const userInfo: User = JSON.parse(Cookies?.get("user") as string) || {};

  return (
    <div className="p-3 border-b border-foreground/40 w-full flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <div className="flex items-center gap-2 ">
            <p className="font-medium"> Asosiy</p>
            <ChevronRight
              size={18}
              className={`${pathname == "/" && "hidden"}`}
            />
            <p>
              {pathname == "/"
                ? ""
                : pathname.slice(1, 2).toUpperCase() + pathname.slice(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <DarkMode />
        <div className="flex items-center  gap-2">
          <div className="flex flex-col items-end">
            <h1>
              {userInfo?.first_name} {userInfo?.last_name}
            </h1>
            <p className=" flex items-center gap-1 text-sm">
              <Users size={16} />
              {userInfo.role.slice(0, 1).toUpperCase() + userInfo.role.slice(1)}
            </p>
          </div>
          <CircleUser size={35} />
        </div>
      </div>
    </div>
  );
};

export default Header;
