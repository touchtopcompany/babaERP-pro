/**
 * My Enterprise level axios : API handler and configurations ...
 * Written by Nasr developer @link nasrkihagila@gmail.com
 * This can use by all kind of Applications
 * Approved
 */

import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { message } from "antd";
import { getStoredToken } from "@/utils/secureStore";
import { logger } from "@/utils/functions";

const SHOW_ERROR_TOAST = false;

// Base Axios instance
export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || "",
  timeout: 10000,
  timeoutErrorMessage: "Request was taking too long to respond",
  withCredentials: false,
});

// Request interceptor: set headers
api.interceptors.request.use(
  async (request) => {
    if (request.data instanceof FormData) {
      request.headers.setContentType("multipart/form-data");
    } else {
      request.headers.setContentType("application/json");
    }

    const decryptedToken = await getStoredToken();
    const plainToken = localStorage.getItem("token");
    logger.log("🔍 API Request:", request.url);
    logger.log("🔍 Decrypted token:", decryptedToken ? "Present" : "Missing");
    logger.log("🔍 Plain token:", plainToken ? "Present" : "Missing");
    
    const token = decryptedToken || plainToken;
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }

    return request;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    let errObj: { type: string; status?: number; data?: any; message: string } =
      {
        type: "unknown",
        message: "An unknown error occurred",
      };

    if (axios.isCancel(error) || error.name === "CanceledError") {
      errObj = { type: "canceled", message: "Request was canceled" };
    } else if (error.code === "ECONNABORTED") {
      errObj = { type: "timeout", message: "Request timed out" };
    } else if (error.response) {
      const { status, data } = error.response;
      errObj = {
        type: "http",
        status,
        data,
        message: data?.message || `Request failed with status ${status}`,
      };

      // Handle authentication errors (401, 403)
      if (status === 401 || status === 403) {
        logger.error("❌ Authentication error:", status, errObj.message);
        logger.log("🔍 Current path:", window.location.pathname);
        logger.log("🔍 Request URL:", error.config?.url);
        
        // Clear stored tokens
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect to login page
        if (typeof window !== "undefined" && 
            !window.location.pathname.includes("/signin") && 
            !window.location.pathname.includes("/auth/") &&
            window.location.pathname !== "/") {
          logger.log("🚪 Redirecting to signin page");
          window.location.href = "/signin";
        }
      }
    } else if (error.request) {
      errObj = { type: "network", message: "No response received from server" };
    } else if (error.message) {
      errObj = { type: "unknown", message: error.message };
    }

    if (SHOW_ERROR_TOAST) message.error(errObj.message);

    return Promise.reject(errObj);
  }
);
