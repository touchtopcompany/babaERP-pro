import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import StockTaking from "./StockTaking";
import { DashboardOutlined, DatabaseOutlined } from "@ant-design/icons";

const StockTakingPage: React.FC = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Stock Taking",
      icon: <DatabaseOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <StockTaking />
    </DashboardLayout>
  );
};

export default StockTakingPage;

