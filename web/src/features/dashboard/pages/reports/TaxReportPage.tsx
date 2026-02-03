import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import TaxReport from "./TaxReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const TaxReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Tax Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <TaxReport />
    </DashboardLayout>
  );
};

export default TaxReportPage;
