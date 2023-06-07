import { useQuery } from "@tanstack/react-query";
import { ApiResponse, api } from "./api";

export type Project = {
  description: string;
  gatewayIds: string[];
  image: string;
  industry: string;
  name: string;
  projectId: string;
  rule: string;
  structure: string;
  userIds: string[];
  website: string;
};

async function getProjects() {
  const {
    data: { data },
  } = await api.get<ApiResponse<Project[]>>("projects");
  return data;
}

export function useProjects() {
  return useQuery({ queryKey: ["projects"], queryFn: getProjects });
}
