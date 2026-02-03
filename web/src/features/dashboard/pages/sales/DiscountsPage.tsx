import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import Discounts from "./Discounts";
import { DashboardOutlined, ShoppingOutlined, TagOutlined } from "@ant-design/icons";

const DiscountsPage: React.FC = () => {
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
      label: "Discounts",
      icon: <TagOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Discounts />
    </DashboardLayout>
  );
};

export default DiscountsPage;

