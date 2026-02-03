import { Card, Typography, Space, Tooltip, Skeleton } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";
import useTheme from "@/theme/useTheme";

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color?: string;
  showInfo?: boolean;
  subtitle?: string;
  extraInfo?: {
    label: string;
    value: string;
  }[];
  loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color = "#1890ff",
  showInfo = false,
  subtitle,
  extraInfo,
  loading = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card
      hoverable
      style={{
        borderRadius: "8px",
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        boxShadow: isDark 
          ? "0 2px 8px rgba(0,0,0,0.3)" 
          : "0 2px 8px rgba(0,0,0,0.06)",
        height: "100%",
        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
        transition: "all 0.3s ease",
      }}
      styles={{ 
        body: { padding: "24px" },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 4px 16px rgba(0,0,0,0.4)"
          : "0 4px 16px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 2px 8px rgba(0,0,0,0.3)"
          : "0 2px 8px rgba(0,0,0,0.06)";
      }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 2 }} />
      ) : (
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography.Text
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {title}
            </Typography.Text>
            {showInfo && (
              <Tooltip title="Additional information">
                <InfoCircleOutlined style={{ color: "#bfbfbf", fontSize: "14px", cursor: "pointer" }} />
              </Tooltip>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "12px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: color,
                fontSize: "28px",
                border: `1px solid ${color}30`,
              }}
            >
              {icon}
            </div>
            <div style={{ flex: 1 }}>
              <Typography.Text
                strong
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  color: isDark ? "#fff" : "#1f1f1f",
                  display: "block",
                  lineHeight: "1.2",
                }}
              >
                {value}
              </Typography.Text>
              {subtitle && (
                <Typography.Text type="secondary" style={{ fontSize: "13px", marginTop: "4px", display: "block" }}>
                  {subtitle}
                </Typography.Text>
              )}
            </div>
          </div>
          {extraInfo && extraInfo.length > 0 && (
            <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #f0f0f0" }}>
              {extraInfo.map((info, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <Typography.Text type="secondary" style={{ fontSize: "12px", fontWeight: 400 }}>
                    {info.label}:
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: "12px", fontWeight: 500 }}>{info.value}</Typography.Text>
                </div>
              ))}
            </div>
          )}
        </Space>
      )}
    </Card>
  );
};

export default MetricCard;

