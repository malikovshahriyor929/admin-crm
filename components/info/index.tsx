"use client";
import { Myaxios } from "@/request/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
interface Id {
  id: string;
}
const InfoComponents = ({ id }: Id) => {
  const { data } = useQuery({
    queryKey: ["admins"],
    queryFn: () =>
      Myaxios.get(`/api/teacher/get-teacher/${id}`).then(
        (res) => res.data.data
      ),
  });
  console.log(data);

  return <div>InfoComponents</div>;
};

export default InfoComponents;
