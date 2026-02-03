import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import RegisterReport from "./RegisterReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const RegisterReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Register Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <RegisterReport />
    </DashboardLayout>
  );
};

export default RegisterReportPage;
