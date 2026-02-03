import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import StockAdjustmentReport from "./StockAdjustmentReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const StockAdjustmentReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Stock Adjustment Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <StockAdjustmentReport />
    </DashboardLayout>
  );
};

export default StockAdjustmentReportPage;
