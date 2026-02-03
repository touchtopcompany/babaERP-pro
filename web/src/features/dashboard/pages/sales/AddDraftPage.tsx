import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AddDraft from "./AddDraft";
import {
  DashboardOutlined,
  ArrowUpOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const AddDraftPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Sell", icon: <ArrowUpOutlined />, path: "/sell/all-sales" },
        { label: "Add Draft", icon: <PlusOutlined /> },
      ]}
      showFilters={false}
    >
      <AddDraft />
    </DashboardLayout>
  );
};

export default AddDraftPage;

