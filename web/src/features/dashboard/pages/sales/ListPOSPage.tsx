import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ListPOS from "./ListPOS";
import {
  DashboardOutlined,
  ArrowUpOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const ListPOSPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Sell", icon: <ArrowUpOutlined />, path: "/sell/all-sales" },
        { label: "List POS", icon: <UnorderedListOutlined /> },
      ]}
      showFilters={false}
    >
      <ListPOS />
    </DashboardLayout>
  );
};

export default ListPOSPage;

