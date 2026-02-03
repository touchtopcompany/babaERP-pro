import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import AddExpense from "./AddExpense";
import { DashboardOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const AddExpensePage: React.FC = () => {
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
      label: "Add Expense",
      icon: <PlusOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <AddExpense />
    </DashboardLayout>
  );
};

export default AddExpensePage;

