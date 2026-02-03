import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ListStockAdjustments from "./ListStockAdjustments";
import { DashboardOutlined, HourglassOutlined } from "@ant-design/icons";

const ListStockAdjustmentsPage: React.FC = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Stock Adjustment",
      icon: <HourglassOutlined />,
    },
    {
      label: "List Stock Adjustments",
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ListStockAdjustments />
    </DashboardLayout>
  );
};

export default ListStockAdjustmentsPage;

