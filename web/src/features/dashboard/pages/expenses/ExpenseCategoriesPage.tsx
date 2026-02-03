import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ExpenseCategories from "./ExpenseCategories";
import { DashboardOutlined, MinusCircleOutlined } from "@ant-design/icons";

const ExpenseCategoriesPage: React.FC = () => {
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
      label: "Expense Categories",
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ExpenseCategories />
    </DashboardLayout>
  );
};

export default ExpenseCategoriesPage;

