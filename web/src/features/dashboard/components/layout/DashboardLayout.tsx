import React from "react";
import { Layout, Space, Typography } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useTheme from "@/theme/useTheme";
import type { ReactNode } from "react";

const { Content } = Layout;

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: ReactNode;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  businessName?: string;
  breadcrumbs?: BreadcrumbItem[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  businessName,
  breadcrumbs = [
    { label: "Home", icon: <HomeOutlined /> },
    { label: "Dashboard", icon: <DashboardOutlined /> },
  ] as BreadcrumbItem[],
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Default icon mapping for common breadcrumb labels
  const getDefaultIcon = (label: string): ReactNode => {
    const iconMap: Record<string, ReactNode> = {
      Home: <HomeOutlined />,
      Dashboard: <DashboardOutlined />,
      "User Management": <UsergroupAddOutlined />,
      Users: <UserOutlined />,
      Roles: <UserOutlined />,
      "Sales Commission Agents": <UserOutlined />,
    };
    return iconMap[label] || null;
  };

  return (
    <Layout style={{ minHeight: "100vh", position: "relative" }}>
      <Header
        collapsed={collapsed}
        onToggle={toggleSidebar}
        businessName={businessName}
      />
      <Sidebar collapsed={collapsed} isMobile={isMobile} />
      <Layout>
        <div 
          style={{ 
            marginTop: 64, 
            marginLeft: isMobile ? 0 : (collapsed ? 80 : 250), 
            transition: "margin-left 0.2s",
            width: isMobile ? "100%" : `calc(100% - ${collapsed ? 80 : 250}px)`,
            maxWidth: "100%",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: isDark ? "#141414" : "#ffffff",
              padding: isMobile ? "12px 16px" : "12px 24px",
              borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: isMobile ? "2px" : "4px", flex: isMobile ? "1 1 100%" : "0 0 auto" }}>
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                const icon = crumb.icon || getDefaultIcon(crumb.label);
                
                return (
                  <React.Fragment key={index}>
                    <Space
                      size={8}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        background:
                          index === 0
                            ? isDark
                              ? "rgba(24, 144, 255, 0.15)"
                              : "rgba(24, 144, 255, 0.08)"
                            : "transparent",
                        transition: "all 0.2s ease",
                        cursor: crumb.path ? "pointer" : "default",
                      }}
                      onMouseEnter={(e) => {
                        if (crumb.path && index !== 0) {
                          e.currentTarget.style.background = isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(0,0,0,0.02)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (crumb.path && index !== 0) {
                          e.currentTarget.style.background = "transparent";
                        }
                      }}
                      onClick={() => {
                        if (crumb.path) {
                          window.location.href = crumb.path;
                        }
                      }}
                    >
                      {icon && (
                        <span
                          style={{
                            fontSize: "14px",
                            color:
                              index === 0
                                ? "#1890ff"
                                : isLast
                                ? isDark
                                  ? "rgba(255,255,255,0.65)"
                                  : "#8c8c8c"
                                : isDark
                                ? "rgba(255,255,255,0.85)"
                                : "#595959",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {icon}
                        </span>
                      )}
                      <Typography.Text
                        style={{
                          fontSize: "14px",
                          color:
                            index === 0
                              ? "#1890ff"
                              : isLast
                              ? isDark
                                ? "rgba(255,255,255,0.65)"
                                : "#8c8c8c"
                              : isDark
                              ? "rgba(255,255,255,0.85)"
                              : "#595959",
                          fontWeight: index === 0 ? 600 : isLast ? 400 : 500,
                          lineHeight: "1.5",
                        }}
                      >
                        {crumb.label}
                      </Typography.Text>
                    </Space>
                    {!isLast && (
                      <RightOutlined
                        style={{
                          fontSize: "12px",
                          color: isDark ? "rgba(255,255,255,0.3)" : "#bfbfbf",
                          margin: "0 4px",
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <Content
            style={{
              margin: isMobile ? "16px" : "24px",
              padding: isMobile ? "16px" : "32px",
              background: theme === "dark" ? "#0a0a0a" : "#f5f7fa",
              minHeight: "calc(100vh - 140px)",
              transition: "background 0.3s ease",
              maxWidth: "100%",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {children}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

