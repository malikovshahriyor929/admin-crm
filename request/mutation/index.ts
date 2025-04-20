import { useMutation } from "@tanstack/react-query";
import { Myaxios } from "../axios";
import axios from "axios";

export const useLoginMutation = () => {
  return useMutation({
    mutationKey:["login"],
    mutationFn: async (data: object) =>
      axios({ url: "https://admin-crm.onrender.com/api/auth/sign-in", method: "POST", data: data }),
    onSuccess(data) {
      localStorage.setItem("sadad", JSON.stringify(data));
      console.log(data);
    },
  });
};
