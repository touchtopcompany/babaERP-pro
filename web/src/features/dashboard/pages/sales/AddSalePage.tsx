import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AddSale from "./AddSale";
import {
  DashboardOutlined,
  ArrowUpOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const AddSalePage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Sell", icon: <ArrowUpOutlined />, path: "/sell/all-sales" },
        { label: "Add Sale", icon: <PlusOutlined /> },
      ]}
      showFilters={false}
    >
      <AddSale />
    </DashboardLayout>
  );
};

export default AddSalePage;

