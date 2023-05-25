import { useQuery } from "@tanstack/react-query";
import { ApiResponse, api } from "./api";

export type Gateways = {
  apiKey: string;
  description: string;
  gatewayId: string;
  name: string;
  secondaryApiKey: string;
  type: string;
  userIds: string[];
};

async function getGateways() {
  const {
    data: { data },
  } = await api.get<ApiResponse<Gateways[]>>("gateways");
  return data;
}

export function useGateways() {
  return useQuery({ queryKey: ["gateways"], queryFn: getGateways });
}
