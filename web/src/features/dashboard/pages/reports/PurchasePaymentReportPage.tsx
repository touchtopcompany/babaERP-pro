import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import PurchasePaymentReport from "./PurchasePaymentReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const PurchasePaymentReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Purchase Payment Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <PurchasePaymentReport />
    </DashboardLayout>
  );
};

export default PurchasePaymentReportPage;
