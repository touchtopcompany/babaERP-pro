import { apiRequest } from "@/services/apiRequest";
import { ENDPOINTS } from "@/services/end-points";
import { logger } from "@/utils/functions";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () =>
  useMutation<Response  , Error , DATA>({
    mutationKey: ["login"],
    mutationFn: async (data: any) => {
      const response = await apiRequest.post(ENDPOINTS.LOGIN, data).request;

      logger.log(response.data);

      return response.data;
    },

    onSuccess: (data: any) => {
      window.location.replace("dashboard");
    },

    onError: (error: Error) => {
      logger.error(error);
    },
  });

  
