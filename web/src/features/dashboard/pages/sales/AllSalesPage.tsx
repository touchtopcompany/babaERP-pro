import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AllSales from "./AllSales";
import {
  DashboardOutlined,
  ArrowUpOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const AllSalesPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Sell", icon: <ArrowUpOutlined />, path: "/sell" },
        { label: "All Sales", icon: <UnorderedListOutlined /> },
      ]}
      showFilters={false}
    >
      <AllSales />
    </DashboardLayout>
  );
};

export default AllSalesPage;

