import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import PurchaseSaleReport from "./PurchaseSaleReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const PurchaseSaleReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Purchase & Sale Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <PurchaseSaleReport />
    </DashboardLayout>
  );
};

export default PurchaseSaleReportPage;
