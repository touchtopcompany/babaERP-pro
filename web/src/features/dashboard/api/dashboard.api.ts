import { apiRequest } from "@/services/apiRequest";
import { ENDPOINTS } from "@/services/end-points";
import { useQuery } from "@tanstack/react-query";

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: async () => {
      const response = await apiRequest.get(ENDPOINTS.DASHBOARD_METRICS).request;
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDashboardSales = () => {
  return useQuery({
    queryKey: ["dashboard", "sales"],
    queryFn: async () => {
      const response = await apiRequest.get(ENDPOINTS.DASHBOARD_SALES).request;
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

