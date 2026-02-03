import { Card, Typography, Progress } from "antd";
import { Line } from "@ant-design/charts";
import type { ReactNode } from "react";
import useTheme from "@/theme/useTheme";
import { Skeleton } from "antd";

interface TaskProgressCardProps {
  title: string;
  value: string;
  progress: number;
  trend: string;
  icon: ReactNode;
  color: string;
  chartData: Array<{ date: string; value: number }>;
  loading?: boolean;
}

const TaskProgressCard: React.FC<TaskProgressCardProps> = ({
  title,
  value,
  progress,
  trend,
  icon,
  color,
  chartData,
  loading = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartConfig = {
    data: chartData,
    xField: "date",
    yField: "value",
    smooth: true,
    point: false,
    lineStyle: {
      lineWidth: 2,
    },
    color: [color],
    xAxis: false,
    yAxis: false,
    tooltip: false,
    animation: false,
    height: 40,
  };

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
      }}
      styles={{ 
        body: { padding: "20px" },
      }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 2 }} />
      ) : (
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
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
            <div style={{ flex: 1 }}>
              <Typography.Text
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: isDark ? "#fff" : "#1f1f1f",
                  display: "block",
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
                {title}
              </Typography.Text>
            </div>
          </div>
          <div style={{ marginTop: "16px", marginBottom: "12px" }}>
            <Line {...chartConfig} />
          </div>
          <div>
            <Progress
              percent={progress}
              strokeColor={color}
              showInfo={false}
              style={{ marginBottom: "8px" }}
            />
            <Typography.Text
              style={{
                fontSize: "12px",
                color: isDark ? "rgba(255,255,255,0.65)" : "#595959",
              }}
            >
              {trend}
            </Typography.Text>
          </div>
        </div>
      )}
    </Card>
  );
};

export default TaskProgressCard;

