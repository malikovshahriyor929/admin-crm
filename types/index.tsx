import { ReactNode } from "react";

export interface ChildrenType {
  children: ReactNode;
}

export interface SidebarType {
  name: string;
  icon: ReactNode;
  path: string;
}
