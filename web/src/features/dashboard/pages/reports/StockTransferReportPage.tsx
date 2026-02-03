import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import StockTransferReport from "./StockTransferReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const StockTransferReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Stock Transfer Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <StockTransferReport />
    </DashboardLayout>
  );
};

export default StockTransferReportPage;
