import { useQuery } from "@tanstack/react-query";
import { ApiResponse, api } from "./api";

export type User = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
};

async function getUser() {
  const {
    data: { data },
  } = await api.get<ApiResponse<User[]>>("users");
  return data[0];
}

export function useUser() {
  return useQuery({ queryKey: ["user"], queryFn: getUser });
}
