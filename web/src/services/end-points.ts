export const ENDPOINTS = {
  root: "/v1",
  LOGIN: "/auth/login",
  FORGOT_PASSWORD: "/auth/forgot-password",
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;
