import { apiRequest } from "@/services/apiRequest";
import { ENDPOINTS } from "@/services/end-points";
import { logger } from "@/utils/functions";
import { useMutation } from "@tanstack/react-query";

type LoginData = {
  username: string;
  password: string;
};

type ForgotPasswordData = {
  email: string;
};

export const useLogin = () =>
  useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginData) => {
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

export const useForgotPassword = () =>
  useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: async (data: ForgotPasswordData) => {
      const response = await apiRequest.post(ENDPOINTS.FORGOT_PASSWORD, data).request;
      return response.data;
    },
    onError: (error: Error) => {
      logger.error('Forgot password error:', error);
      throw error;
    },
  });
