import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ListExpenses from "./ListExpenses";
import { DashboardOutlined, MinusCircleOutlined } from "@ant-design/icons";

const ListExpensesPage: React.FC = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Expenses",
      icon: <MinusCircleOutlined />,
    },
    {
      label: "List Expenses",
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ListExpenses />
    </DashboardLayout>
  );
};

export default ListExpensesPage;

