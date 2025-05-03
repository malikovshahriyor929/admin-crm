import GroupComponents from "@/components/groups";
import { Myaxios } from "@/request/axios";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const Groups = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["teacher"],
    queryFn: () =>
      Myaxios.get("/api/group/get-all-group").then((res) => res.data.data),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="p-4 ">
      <HydrationBoundary state={dehydratedState}>
        <GroupComponents />
      </HydrationBoundary>
    </div>
  );
};

export default Groups;
