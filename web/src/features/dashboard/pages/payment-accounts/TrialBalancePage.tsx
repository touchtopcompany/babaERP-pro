import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import TrialBalance from "./TrialBalance";
import { DashboardOutlined, DollarOutlined } from "@ant-design/icons";

const TrialBalancePage: React.FC = () => {
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
      label: "Trial Balance",
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <TrialBalance />
    </DashboardLayout>
  );
};

export default TrialBalancePage;

