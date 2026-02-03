import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import AddStockTransfer from "./AddStockTransfer";
import { DashboardOutlined, SwapOutlined, PlusOutlined } from "@ant-design/icons";

const AddStockTransferPage: React.FC = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: "Stock Transfers",
      icon: <SwapOutlined />,
    },
    {
      label: "Add Stock Transfer",
      icon: <PlusOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <AddStockTransfer />
    </DashboardLayout>
  );
};

export default AddStockTransferPage;

