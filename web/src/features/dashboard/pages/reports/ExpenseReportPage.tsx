import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ExpenseReport from "./ExpenseReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const ExpenseReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Expense Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ExpenseReport />
    </DashboardLayout>
  );
};

export default ExpenseReportPage;
