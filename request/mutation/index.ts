import { notificationApi } from "@/shared/generics/notification";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
const notify = notificationApi();
export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: object) =>
      axios({
        url: "https://admin-crm.onrender.com/api/auth/sign-in",
        method: "POST",
        data: data,
      }),
    onSuccess(res) {
      localStorage.setItem("sadad", JSON.stringify(res));
      Cookie.set("token", res.data.data.token);
      Cookie.set("user", JSON.stringify(res.data.data));
      notify("login");
    },
    onError() {
      notify("wrong_login");
    },
  });
};
