import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ListAccounts from "./ListAccounts";
import { DashboardOutlined, DollarOutlined } from "@ant-design/icons";

const ListAccountsPage: React.FC = () => {
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
      label: "List Accounts",
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ListAccounts />
    </DashboardLayout>
  );
};

export default ListAccountsPage;

