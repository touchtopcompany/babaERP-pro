import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ProfitLossReport from "./ProfitLossReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const ProfitLossReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Profit / Loss Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ProfitLossReport />
    </DashboardLayout>
  );
};

export default ProfitLossReportPage;
