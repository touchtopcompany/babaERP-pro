import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import BalanceSheet from "./BalanceSheet";
import { DashboardOutlined, DollarOutlined } from "@ant-design/icons";

const BalanceSheetPage: React.FC = () => {
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
      label: "Balance Sheet",
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <BalanceSheet />
    </DashboardLayout>
  );
};

export default BalanceSheetPage;

