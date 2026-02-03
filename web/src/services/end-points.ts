export const ENDPOINTS = {
  root: "/v1",
  LOGIN: "/v1/auth/login",
  LOGOUT: "/v1/auth/logout",
  FORGOT_PASSWORD: "/v1/auth/forgot-password",
  DASHBOARD_METRICS: "/v1/dashboard/metrics",
  DASHBOARD_SALES: "/v1/dashboard/sales",
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;
