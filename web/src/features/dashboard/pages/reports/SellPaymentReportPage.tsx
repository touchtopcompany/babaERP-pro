import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import SellPaymentReport from "./SellPaymentReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const SellPaymentReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Sell Payment Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <SellPaymentReport />
    </DashboardLayout>
  );
};

export default SellPaymentReportPage;
