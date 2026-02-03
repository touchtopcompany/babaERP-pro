import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import Transactions from "./Transactions";
import { DashboardOutlined, FileTextOutlined } from "@ant-design/icons";

const TransactionsPage: React.FC = () => {
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
      label: "Transactions",
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Transactions />
    </DashboardLayout>
  );
};

export default TransactionsPage;
