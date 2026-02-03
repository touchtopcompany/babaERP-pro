import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import SalesRepresentativeReport from "./SalesRepresentativeReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const SalesRepresentativeReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Sales Representative Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <SalesRepresentativeReport />
    </DashboardLayout>
  );
};

export default SalesRepresentativeReportPage;
