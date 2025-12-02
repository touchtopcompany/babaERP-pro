
export interface ThemeContextType {
  theme: string | null;
  setTheme: (value: string) => void;
  autoTheme: boolean;
  setAutoTheme: (value: boolean) => void;
}
