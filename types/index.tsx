import { ReactNode } from "react";

export interface ChildrenType {
  children: ReactNode;
}

export interface SidebarType {
  name: string;
  icon: ReactNode;
  path: string;
}
export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  role?: string;
  status?: string;
  token?: string;
  active?: boolean;
  is_deleted?: boolean;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
  work_date?: string; // ISO date string
  work_end?: string | null; // null or ISO date string
  last_active_date?: string; // ISO date string
}
export interface TatilType {
  _id: string;
  start_date: string;
  end_date: string;
  reason: string;
}
