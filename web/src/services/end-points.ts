export const ENDPOINTS = {
  root: "/v1",
 
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;
