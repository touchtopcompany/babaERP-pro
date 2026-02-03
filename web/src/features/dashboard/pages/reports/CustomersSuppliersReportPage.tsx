import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import CustomersSuppliersReport from "./CustomersSuppliersReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const CustomersSuppliersReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Customers & Suppliers Reports" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <CustomersSuppliersReport />
    </DashboardLayout>
  );
};

export default CustomersSuppliersReportPage;
