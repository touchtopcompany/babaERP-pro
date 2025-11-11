import type { AxiosResponse } from "axios";
import { api } from "./api";

type ApiRequestResult<T> = {
  request: Promise<AxiosResponse<T>>;
  cancel: () => void;
};

function createRequest<T = any>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: any,
  config: any = {}
): ApiRequestResult<T> {
  const controller = new AbortController();

  const request = api.request<T>({
    method,
    url,
    data,
    ...config,
    signal: controller.signal,
  });

  return {
    request,
    cancel: () => controller.abort(),
  };
}

export const apiRequest = {
  get: <T = any>(url: string, config?: any) =>
    createRequest<T>("get", url, undefined, config),

  post: <T = any>(url: string, data?: any, config?: any) =>
    createRequest<T>("post", url, data, config),

  put: <T = any>(url: string, data?: any, config?: any) =>
    createRequest<T>("put", url, data, config),

  patch: <T = any>(url: string, data?: any, config?: any) =>
    createRequest<T>("patch", url, data, config),

  delete: <T = any>(url: string, config?: any) =>
    createRequest<T>("delete", url, undefined, config),
};

