import type { ReactNode } from "react";
import { useEffect } from "react";
import useTheme from "./useTheme";
import { ConfigProvider, theme as antdTheme } from "antd";
import { applyColorVariables } from "../utils/colorUtils";

export const primaryColor = "#1890ff";

export const ThemeWraper = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  useEffect(() => {
    applyColorVariables(primaryColor);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
          fontFamily: ` ui-sans-serif, system-ui, -apple-system, \
                        BlinkMacSystemFont, "Segoe UI", Roboto,\
                        "Helvetica Neue", Arial, "Noto Sans", sans-serif, \
                        "Apple Color Emoji", "Segoe UI Emoji", \
                        "Segoe UI Symbol", "Noto Color Emoji"`,
        },
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        components: {
          Modal: {
            colorBgElevated: theme === "dark" ? "#1F2937" : "rgba(255,255,255)",
          },
          Menu: {
            itemBg: "transparent",
            itemPaddingInline: 16,
            fontSize: 16,
            itemMarginBlock: 8,
            borderRadiusOuter: 0,
            colorText: theme === "dark" ? "#fff" : "#000",
            colorBorderBg: "transparent",
            itemSelectedColor: primaryColor,
            itemSelectedBg:
              theme === "dark"
                ? "rgba(24, 144, 255, 0.25)"
                : "rgba(24, 144, 255, 0.12)",
          },
          Drawer: {
            margin: 0,
            colorBgElevated: theme === "dark" ? "#1F2937" : "rgba(255,255,255)",
          },
          Button: {
            colorPrimary: primaryColor,
            colorPrimaryHover: primaryColor,
            colorPrimaryActive: primaryColor,
          },
          Card: {
            colorBgContainer:
              theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255)",
          },
          Segmented: {
            itemSelectedBg: primaryColor,
            itemSelectedColor: "#fff",
          },
          Input: {
            colorBgContainer:
              (theme === "dark" && "rgba(255,255,255,0.1)") || "",
          },
          Select: {
            colorBgContainer:
              (theme === "dark" && "rgba(255,255,255,0.1)") || "",
          },
          Table: {
            colorBgContainer:
              theme === "dark" ? "rgba(0,0,0,0)" : "rgba(255,255,255)",
            headerBg: primaryColor,
            headerColor: "#fff",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
