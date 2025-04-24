"use client";
import React, { useState, useEffect } from "react";
import { CircleUser, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    createdAt: "",
  });

  useEffect(() => {
    const cookieData = Cookies.get("user");
    if (cookieData) {
      try {
        const parsed = JSON.parse(cookieData);
        setUserInfo(parsed);
      } catch (err) {
        console.error("Invalid JSON in cookie", err);
      }
    }
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-background shadow  rounded-xl p-6 flex justify-between items-center">
        <div className=" flex items-center gap-4">
          <CircleUser size={80} className="!text-foreground" />
          <div>
            <h1 className="text-2xl font-bold">
              {userInfo?.first_name} {userInfo?.last_name}
            </h1>
            <p>{userInfo?.email}</p>
            <div className="flex items-center gap-2 text-sm mt-2">
              <Calendar size={16} />
              <p>
                Qo'shilgan:
                {new Date(userInfo?.createdAt).toLocaleString("uz-UZ")}
              </p>
            </div>
          </div>
        </div>
        <div>
          <span className="bg-red-600 text-white  px-3 py-1 rounded-sm text-sm">
            {userInfo?.role}
          </span>
        </div>
      </div>

      <div className=" rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Profil ma'lumotlari</h2>
        <p className="text-sm text-gray-500 mb-4">
          Shaxsiy ma'lumotlaringizni yangilashingiz mumkin.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Ism</label>
            <Input value={userInfo?.first_name} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium">Familiya</label>
            <Input value={userInfo?.last_name} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input value={userInfo?.email} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium">Rol</label>
            <Input value={userInfo?.role} readOnly />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button>Saqalsh</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
