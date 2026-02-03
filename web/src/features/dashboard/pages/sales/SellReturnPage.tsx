import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import SellReturn from "./SellReturn";
import { DashboardOutlined, ShoppingOutlined, UndoOutlined } from "@ant-design/icons";

const SellReturnPage: React.FC = () => {
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
      label: "Sell Return",
      icon: <UndoOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <SellReturn />
    </DashboardLayout>
  );
};

export default SellReturnPage;

