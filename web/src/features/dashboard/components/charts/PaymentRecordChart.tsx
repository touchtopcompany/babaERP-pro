import React from "react";
import { Card, Typography, Row, Col } from "antd";
import { Column } from "@ant-design/charts";
import useTheme from "@/theme/useTheme";
import PaymentSummaryCard from "../cards/PaymentSummaryCard";

interface PaymentRecordChartProps {
  data?: Array<{
    date: string;
    barValue: number;
    lineValue: number;
  }>;
  summary?: {
    awaiting: { value: string; progress: number };
    completed: { value: string; progress: number };
    rejected: { value: string; progress: number };
    revenue: { value: string; progress: number };
  };
}

const PaymentRecordChart: React.FC<PaymentRecordChartProps> = ({ 
  data = [],
  summary,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = data.length > 0
    ? data
    : [
        { date: "JAN/23", barValue: 45000, lineValue: 42000 },
        { date: "FEB/23", barValue: 32000, lineValue: 35000 },
        { date: "MAR/23", barValue: 55000, lineValue: 50000 },
        { date: "APR/23", barValue: 68000, lineValue: 65000 },
        { date: "MAY/23", barValue: 40000, lineValue: 45000 },
        { date: "JUN/23", barValue: 35000, lineValue: 38000 },
        { date: "JUL/23", barValue: 58000, lineValue: 55000 },
        { date: "AUG/23", barValue: 42000, lineValue: 40000 },
        { date: "SEP/23", barValue: 65000, lineValue: 62000 },
        { date: "OCT/23", barValue: 48000, lineValue: 50000 },
        { date: "NOV/23", barValue: 60000, lineValue: 58000 },
        { date: "DEC/23", barValue: 45000, lineValue: 42000 },
      ];

  const barConfig = {
    data: chartData,
    xField: "date",
    yField: "barValue",
    color: "#1890ff",
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    xAxis: {
      label: {
        style: {
          fill: isDark ? "rgba(255,255,255,0.65)" : "#595959",
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
        style: {
          fill: isDark ? "rgba(255,255,255,0.65)" : "#595959",
        },
      },
    },
  };

  const defaultSummary = summary || {
    awaiting: { value: "$5,486", progress: 25 },
    completed: { value: "$9,275", progress: 45 },
    rejected: { value: "$3,868", progress: 20 },
    revenue: { value: "$50,668", progress: 100 },
  };

  return (
    <Card
      style={{
        borderRadius: "8px",
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        boxShadow: isDark 
          ? "0 2px 8px rgba(0,0,0,0.3)" 
          : "0 2px 8px rgba(0,0,0,0.06)",
        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
        height: "100%",
      }}
      styles={{ body: { padding: "24px" } }}
      title={
        <Typography.Title level={4} style={{ margin: 0, fontWeight: 600, color: isDark ? "#fff" : "#1f1f1f" }}>
          Payment Record
        </Typography.Title>
      }
    >
      <div style={{ marginBottom: "24px", height: "300px" }}>
        <Column {...barConfig} />
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} lg={6}>
          <PaymentSummaryCard
            label="Awaiting"
            value={defaultSummary.awaiting.value}
            progress={defaultSummary.awaiting.progress}
            color="#1890ff"
          />
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <PaymentSummaryCard
            label="Completed"
            value={defaultSummary.completed.value}
            progress={defaultSummary.completed.progress}
            color="#52c41a"
          />
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <PaymentSummaryCard
            label="Rejected"
            value={defaultSummary.rejected.value}
            progress={defaultSummary.rejected.progress}
            color="#ff4d4f"
          />
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <PaymentSummaryCard
            label="Revenue"
            value={defaultSummary.revenue.value}
            progress={defaultSummary.revenue.progress}
            color="#595959"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default PaymentRecordChart;

