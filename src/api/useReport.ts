import { useQuery } from "@tanstack/react-query";
import { ApiResponse, api } from "./api";

export type Payment = {
  amount: number;
  projectId: string;
  gatewayId: string;
  paymentId: string;
  created: string;
  modified: string;
  userIds: string[];
};

async function getReport(params: Params) {
  const {
    data: { data },
  } = await api.post<ApiResponse<Payment[]>>("report", params);
  return data;
}

export type Params = {
  from?: string;
  to?: string;
  projectId?: string;
  gatewayId?: string;
};

export function useReport({ from, to, projectId, gatewayId }: Params) {
  return useQuery({
    queryKey: ["report", from, to, projectId, gatewayId],
    queryFn: () => getReport({ from, to, projectId, gatewayId }),
    select: (data) =>
      data.sort((a, b) =>
        a.created < b.created ? 1 : a.created > b.created ? -1 : 0
      ),
  });
}
