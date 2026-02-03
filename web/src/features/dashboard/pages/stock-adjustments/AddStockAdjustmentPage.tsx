import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import AddStockAdjustment from "./AddStockAdjustment";
import { DashboardOutlined, HourglassOutlined, PlusOutlined } from "@ant-design/icons";

const AddStockAdjustmentPage: React.FC = () => {
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
      label: "Add Stock Adjustment",
      icon: <PlusOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <AddStockAdjustment />
    </DashboardLayout>
  );
};

export default AddStockAdjustmentPage;

