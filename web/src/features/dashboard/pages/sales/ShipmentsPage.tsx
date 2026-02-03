import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import Shipments from "./Shipments";
import { DashboardOutlined, ShoppingOutlined, TruckOutlined } from "@ant-design/icons";

const ShipmentsPage: React.FC = () => {
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
      label: "Shipments",
      icon: <TruckOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Shipments />
    </DashboardLayout>
  );
};

export default ShipmentsPage;



