export const ENDPOINTS = {
  root: "/v1",
 LOGIN: "/auth/login"
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;
