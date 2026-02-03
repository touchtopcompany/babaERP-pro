/**
 * BABAERP Color System
 * Centralized color palette following the application's design system
 */

export const primaryColor = "#1890ff"; // Primary brand color (blue)

// Color Palette
export const colors = {
  // Primary Colors
  primary: primaryColor,
  primaryLight: "#40a9ff",
  primaryDark: "#0050b3",
  
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
  '--primary-shadow': 'rgba(24, 144, 255, 0.3)',
  '--primary-shadow-light': 'rgba(24, 144, 255, 0.2)',
  '--primary-bg-light': 'rgba(24, 144, 255, 0.1)',
  '--primary-bg-medium': 'rgba(24, 144, 255, 0.15)',
} as const;

export type ColorKey = keyof typeof colors;

