import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import POS from "./POS";
import {
  DashboardOutlined,
  ArrowUpOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const POSPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Sell", icon: <ArrowUpOutlined />, path: "/sell/all-sales" },
        { label: "POS", icon: <ShoppingCartOutlined /> },
      ]}
      showFilters={false}
    >
      <POS />
    </DashboardLayout>
  );
};

export default POSPage;

