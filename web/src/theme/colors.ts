/**
 * BABAERP Color System
 * Centralized color palette following the application's design system
 */

export const primaryColor = "#D99"; // Primary brand color (light purple/pink)

// Color Palette
export const colors = {
  // Primary Colors
  primary: primaryColor,
  primaryLight: "#E5B3E5",
  primaryDark: "#C47BC4",
  
  // Neutral Colors
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  
  // Status Colors
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
  
  // Dark Mode Colors
  dark: {
    bg: "#1F2937",
    surface: "rgba(255, 255, 255, 0.1)",
    text: "#FFFFFF",
    textSecondary: "rgba(255, 255, 255, 0.7)",
  },
  
  // Light Mode Colors
  light: {
    bg: "#FFFFFF",
    surface: "#FFFFFF",
    text: "#000000",
    textSecondary: "#6B7280",
  },
} as const;

// CSS Custom Properties
export const colorVariables = {
  '--primary-color': primaryColor,
  '--primary-color-light': colors.primaryLight,
  '--primary-color-dark': colors.primaryDark,
  '--primary-shadow': 'rgba(221, 153, 221, 0.3)',
  '--primary-shadow-light': 'rgba(221, 153, 221, 0.2)',
  '--primary-bg-light': 'rgba(221, 153, 221, 0.1)',
  '--primary-bg-medium': 'rgba(221, 153, 221, 0.15)',
} as const;

export type ColorKey = keyof typeof colors;
