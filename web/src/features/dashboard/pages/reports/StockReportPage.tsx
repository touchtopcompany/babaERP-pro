import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import StockReport from "./StockReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const StockReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Stock Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <StockReport />
    </DashboardLayout>
  );
};

export default StockReportPage;
