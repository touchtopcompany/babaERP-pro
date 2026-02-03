import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/services/apiRequest";
import { ENDPOINTS } from "@/services/end-points";
import { logger } from "@/utils/functions";

export const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        const response = await apiRequest.post(ENDPOINTS.LOGOUT, {}).request;
        logger.log("Logout successful:", response.data);
        return response.data;
      } catch (error) {
        // Even if the API call fails, we should still log the user out locally
        logger.error("Logout API error (continuing with local logout):", error);
        return { success: true };
      }
    },
    onError: (error: Error) => {
      logger.error("Logout error:", error);
    },
  });
};

