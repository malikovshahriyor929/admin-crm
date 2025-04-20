import axios from "axios";
export const Myaxios = axios.create({
  baseURL: process.env.NEXT_BASE_URL,
  // withCredentials: true,
});
