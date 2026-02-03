import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ListDrafts from "./ListDrafts";
import { DashboardOutlined, ShoppingOutlined, FileTextOutlined } from "@ant-design/icons";

const ListDraftsPage: React.FC = () => {
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
      label: "List Drafts",
      icon: <FileTextOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ListDrafts />
    </DashboardLayout>
  );
};

export default ListDraftsPage;

