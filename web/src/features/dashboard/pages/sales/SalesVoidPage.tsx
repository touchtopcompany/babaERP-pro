import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import SalesVoid from "./SalesVoid";
import { DashboardOutlined, ShoppingOutlined, CloseCircleOutlined } from "@ant-design/icons";

const SalesVoidPage: React.FC = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Sales",
      icon: <ShoppingOutlined />,
    },
    {
      label: "Sales Void",
      icon: <CloseCircleOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <SalesVoid />
    </DashboardLayout>
  );
};

export default SalesVoidPage;

