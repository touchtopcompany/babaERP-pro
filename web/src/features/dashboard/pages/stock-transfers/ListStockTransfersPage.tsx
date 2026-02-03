import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ListStockTransfers from "./ListStockTransfers";
import { DashboardOutlined, SwapOutlined, UnorderedListOutlined } from "@ant-design/icons";

const ListStockTransfersPage: React.FC = () => {
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
      label: "List Stock Transfers",
      icon: <UnorderedListOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ListStockTransfers />
    </DashboardLayout>
  );
};

export default ListStockTransfersPage;

