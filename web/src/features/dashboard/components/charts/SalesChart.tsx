import React from "react";
import { Card, Typography, Dropdown, Button } from "antd";
import { Line } from "@ant-design/charts";
import { MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import useTheme from "@/theme/useTheme";

const { Title } = Typography;

interface SalesChartProps {
  data?: Array<{
    date: string;
    value: number;
    business: string;
  }>;
}

const SalesChart: React.FC<SalesChartProps> = ({ data = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Default data if none provided
  const chartData =
    data.length > 0
      ? data
      : Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return {
            date: date.toISOString().split("T")[0],
            value: Math.floor(Math.random() * 150000) + 25000,
            business: "C2Z Digital Solutions (C2Z1)",
          };
        });

  const config = {
    data: chartData,
    xField: "date",
    yField: "value",
    seriesField: "business",
    smooth: true,
    point: {
      size: 4,
      shape: "circle",
    },
    lineStyle: {
      lineWidth: 2,
    },
    color: ["#1890ff"],
    xAxis: {
      label: {
        formatter: (text: string) => {
          const date = new Date(text);
          return `${date.getDate()} ${date.toLocaleString("default", {
            month: "short",
          })}`;
        },
      },
    },
    yAxis: {
      label: {
        formatter: (value: number) => {
          if (value >= 1000) {
            return `${(value / 1000).toFixed(0)}k`;
          }
          return value.toString();
        },
      },
      title: {
        text: "Total Sales (TZS)",
      },
    },
    legend: {
      position: "top" as const,
    },
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: datum.business,
          value: `${datum.value.toLocaleString()} TZS`,
        };
      },
    },
    animation: {
      appear: {
        animation: "wave-in",
        duration: 1000,
      },
    },
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "export",
      label: "Export Data",
    },
    {
      key: "settings",
      label: "Chart Settings",
    },
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
        marginTop: "24px",
        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
        transition: "all 0.3s ease",
      }}
      styles={{ body: { padding: "24px" } }}
      title={
        <Title level={4} style={{ margin: 0, fontWeight: 600, color: isDark ? "#fff" : "#1f1f1f" }}>
          Sales Last 30 Days
        </Title>
      }
      extra={
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Button
            type="text"
            icon={<MoreOutlined />}
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
      }
    >
      <Line {...config} />
    </Card>
  );
};

export default SalesChart;

