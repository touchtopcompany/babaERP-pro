import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import CustomerGroupsReport from "./CustomerGroupsReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const CustomerGroupsReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Customer Groups Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <CustomerGroupsReport />
    </DashboardLayout>
  );
};

export default CustomerGroupsReportPage;
