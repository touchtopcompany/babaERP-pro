/**
 * Utility functions for dynamic color theming
 */

/**
 * Convert hex color to RGB values
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/**
 * Convert RGB values to hex color
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Lighten a color by a percentage
 */
export const lightenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const { r, g, b } = rgb;
  const newR = Math.min(255, Math.floor(r + (255 - r) * percent));
  const newG = Math.min(255, Math.floor(g + (255 - g) * percent));
  const newB = Math.min(255, Math.floor(b + (255 - b) * percent));
  
  return rgbToHex(newR, newG, newB);
};

/**
 * Darken a color by a percentage
 */
export const darkenColor = (hex: string, percent: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const { r, g, b } = rgb;
  const newR = Math.max(0, Math.floor(r * (1 - percent)));
  const newG = Math.max(0, Math.floor(g * (1 - percent)));
  const newB = Math.max(0, Math.floor(b * (1 - percent)));
  
  return rgbToHex(newR, newG, newB);
};

/**
 * Generate CSS custom properties for a primary color
 */
export const generateColorVariables = (primaryColor: string) => {
  const rgb = hexToRgb(primaryColor);
  if (!rgb) return {};

  const { r, g, b } = rgb;
  
  return {
    '--primary-color': primaryColor,
    '--primary-color-light': lightenColor(primaryColor, 0.3),
    '--primary-color-dark': darkenColor(primaryColor, 0.2),
    '--primary-gradient-start': primaryColor,
    '--primary-gradient-end': darkenColor(primaryColor, 0.15),
    '--primary-shadow': `rgba(${r}, ${g}, ${b}, 0.3)`,
    '--primary-shadow-light': `rgba(${r}, ${g}, ${b}, 0.2)`,
    '--primary-bg-light': `rgba(${r}, ${g}, ${b}, 0.1)`,
    '--primary-bg-medium': `rgba(${r}, ${g}, ${b}, 0.15)`,
  };
};

/**
 * Apply color variables to the document root
 */
export const applyColorVariables = (primaryColor: string) => {
  const variables = generateColorVariables(primaryColor);
  const root = document.documentElement;
  
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

/**
 * Get contrasting text color (black or white) for a background color
 */
export const getContrastColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000000';
  
  const { r, g, b } = rgb;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128 ? '#000000' : '#ffffff';
};
