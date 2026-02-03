import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ChartOfAccounts from "./ChartOfAccounts";
import { DashboardOutlined, FileTextOutlined } from "@ant-design/icons";

const ChartOfAccountsPage: React.FC = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Accounting",
      icon: <FileTextOutlined />,
    },
    {
      label: "Chart of accounts",
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ChartOfAccounts />
    </DashboardLayout>
  );
};

export default ChartOfAccountsPage;

