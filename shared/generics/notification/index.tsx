import { toast } from "sonner";

type notificationApi = "login" | "wrong_login" | "LogOut" | "add" | "edit";

export const notificationApi = () => {
  const notify = (type: notificationApi) => {
    switch (type) {
      case "login":
        return toast.success("Siz tizimga kirdingiz");
      case "wrong_login":
        return toast.error("Nimadur tizimga kirishga xalaqit beryapti!");
      case "LogOut":
        return toast.success("Muvoffaqiyatli chiqdingiz!");
      case "add":
        return toast.success("Muvoffaqiyatli Admin Qo'shdingiz!");
      case "edit":
        return toast.success("Muvoffaqiyatli O'zgartingiz!");
    }
  };
  return notify;
};
