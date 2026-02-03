import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import CashFlow from "./CashFlow";
import { DashboardOutlined, DollarOutlined } from "@ant-design/icons";

const CashFlowPage: React.FC = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Payment Accounts",
      icon: <DollarOutlined />,
    },
    {
      label: "Cash Flow",
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <CashFlow />
    </DashboardLayout>
  );
};

export default CashFlowPage;

