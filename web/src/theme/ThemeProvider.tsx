import { createContext, useEffect, useState, type ReactNode } from "react";
import useLocalstorage from "../hooks/useLocalstorage";
import type { ThemeContextType } from "../types";
import { ToastContainer } from "react-toastify";
import { APP_THEME_NAME } from "@/utils/constants";
import ThemeBtn from "./ThemeBtn";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [autoTheme, setAutoTheme] = useState(false);
  const [theme, setTheme] = useState<ThemeContextType["theme"]>(null);
  const { isItem, getItem, setItem } = useLocalstorage();

  useEffect(() => {
    const osTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    const appTheme = (isItem(APP_THEME_NAME)
      ? getItem(APP_THEME_NAME)
      : osTheme) as ThemeContextType["theme"];

    if (autoTheme) {
      setTheme(osTheme);
      setItem(APP_THEME_NAME, osTheme);
      if (!theme) return;
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(theme);
      return;
    }

    setTheme(appTheme);
    setItem(APP_THEME_NAME, appTheme);
    if (!theme) return;
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [autoTheme, getItem, isItem, setItem, theme]);

  // OS theme change listener
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (autoTheme) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        setItem(APP_THEME_NAME, newTheme);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [autoTheme, setItem, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, autoTheme, setAutoTheme }}>
      {children}

      {/* The main notification component */}
      <ToastContainer theme={theme === "dark" ? "dark" : "colored"} />
      <ThemeBtn />
    </ThemeContext.Provider>
  );
};
