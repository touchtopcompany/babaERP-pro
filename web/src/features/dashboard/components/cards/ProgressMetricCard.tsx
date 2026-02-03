import { Card, Typography, Progress, Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";
import useTheme from "@/theme/useTheme";
import { Skeleton } from "antd";

interface ProgressMetricCardProps {
  value: string;
  description: string;
  progress: number;
  progressLabel: string;
  icon: ReactNode;
  color: string;
  loading?: boolean;
}

const ProgressMetricCard: React.FC<ProgressMetricCardProps> = ({
  value,
  description,
  progress,
  progressLabel,
  icon,
  color,
  loading = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const menuItems = [
    { key: "view", label: "View Details" },
    { key: "export", label: "Export" },
  ];

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
        body: { padding: "20px" },
      }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 3 }} />
      ) : (
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  background: `${color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: color,
                  fontSize: "20px",
                }}
              >
                {icon}
              </div>
              <div>
                <Typography.Text
                  style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: isDark ? "#fff" : "#1f1f1f",
                    display: "block",
                    lineHeight: "1.2",
                  }}
                >
                  {value}
                </Typography.Text>
                <Typography.Text
                  type="secondary"
                  style={{
                    fontSize: "13px",
                    color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                  }}
                >
                  {description}
                </Typography.Text>
              </div>
            </div>
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <Button
                type="text"
                icon={<MoreOutlined />}
                style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }}
              />
            </Dropdown>
          </div>
          <div style={{ marginTop: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <Typography.Text
                style={{
                  fontSize: "12px",
                  color: isDark ? "rgba(255,255,255,0.65)" : "#595959",
                  fontWeight: 500,
                }}
              >
                {progressLabel}
              </Typography.Text>
              <Typography.Text
                style={{
                  fontSize: "12px",
                  color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
                  fontWeight: 600,
                }}
              >
                {progress}%
              </Typography.Text>
            </div>
            <Progress
              percent={progress}
              strokeColor={color}
              showInfo={false}
              style={{ marginBottom: 0 }}
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProgressMetricCard;

