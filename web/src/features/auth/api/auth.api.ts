import { apiRequest } from "@/services/apiRequest";
import { ENDPOINTS } from "@/services/end-points";
import { logger } from "@/utils/functions";
import { useMutation } from "@tanstack/react-query";
import useSerialize from "@/hooks/useSerialize";

type LoginData = {
  username: string;
  password: string;
};

type ForgotPasswordData = {
  email: string;
};

export const useLogin = () => {
  const { saveToStorage } = useSerialize();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginData) => {
      // Map username to identifier for backend
      const response = await apiRequest.post(ENDPOINTS.LOGIN, {
        identifier: data.username,
        password: data.password,
      }).request;
      logger.log(response.data);
      return response.data;
    },
    onSuccess: async (data: any) => {
      // Store user and token using encrypted storage
      if (data.data?.user && data.data?.token) {
        try {
          await saveToStorage("user", data.data.user);
          localStorage.setItem("token", data.data.token);
          logger.log("User and token stored successfully");
          window.location.replace("/dashboard");
        } catch (error) {
          logger.error("Error storing user data:", error);
        }
      } else {
        logger.error("Invalid login response:", data);
      }
    },
    onError: (error: Error) => {
      logger.error(error);
    },
  });
};

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
