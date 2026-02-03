import { Card, Typography, Button, Space, List } from "antd";
import { Area } from "@ant-design/charts";
import { SettingOutlined } from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import type { ReactNode } from "react";

interface ProjectItem {
  name: string;
  type: string;
  value: string;
  projects: string;
  icon: ReactNode;
  iconColor: string;
}

interface TotalSalesCardProps {
  totalValue: string;
  percentage: string;
  chartData: Array<{ date: string; value: number }>;
  projects: ProjectItem[];
  loading?: boolean;
}

const TotalSalesCard: React.FC<TotalSalesCardProps> = ({
  totalValue,
  percentage,
  chartData,
  projects,
  loading = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartConfig = {
    data: chartData,
    xField: "date",
    yField: "value",
    smooth: true,
    area: {
      style: {
        fill: "rgba(255,255,255,0.3)",
      },
    },
    lineStyle: {
      lineWidth: 2,
    },
    color: ["#ffffff"],
    xAxis: false,
    yAxis: false,
    tooltip: false,
    animation: false,
    height: 80,
  };

  return (
    <Card
      style={{
        borderRadius: "8px",
        background: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
        border: "none",
        height: "100%",
      }}
      styles={{ 
        body: { padding: "24px" },
      }}
    >
      <div style={{ color: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
          <div>
            <Typography.Text
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#fff",
                display: "block",
                marginBottom: "4px",
              }}
            >
              {totalValue}
            </Typography.Text>
            <Typography.Text
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Total Sales
            </Typography.Text>
          </div>
          <Space>
            <Typography.Text
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#fff",
              }}
            >
              {percentage}
            </Typography.Text>
            <Button
              type="text"
              icon={<SettingOutlined />}
              style={{ color: "#fff" }}
            />
          </Space>
        </div>
        <div style={{ marginBottom: "20px", height: "80px" }}>
          <Area {...chartConfig} />
        </div>
        <List
          dataSource={projects}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "12px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    background: item.iconColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "16px",
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <Typography.Text
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#fff",
                      display: "block",
                    }}
                  >
                    {item.name}
                  </Typography.Text>
                  <Typography.Text
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {item.type}
                  </Typography.Text>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Typography.Text
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#fff",
                      display: "block",
                    }}
                  >
                    {item.value}
                  </Typography.Text>
                  <Typography.Text
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {item.projects}
                  </Typography.Text>
                </div>
              </div>
            </List.Item>
          )}
        />
        <Button
          type="primary"
          block
          style={{
            marginTop: "16px",
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff",
          }}
        >
          FULL DETAILS
        </Button>
      </div>
    </Card>
  );
};

export default TotalSalesCard;

