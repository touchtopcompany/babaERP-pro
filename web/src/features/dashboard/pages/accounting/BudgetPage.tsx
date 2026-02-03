import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import Budget from "./Budget";
import { DashboardOutlined, FileTextOutlined } from "@ant-design/icons";

const BudgetPage: React.FC = () => {
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
      label: "Budget",
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Budget />
    </DashboardLayout>
  );
};

export default BudgetPage;
