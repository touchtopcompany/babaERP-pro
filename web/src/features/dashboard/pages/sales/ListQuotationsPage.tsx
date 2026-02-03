import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ListQuotations from "./ListQuotations";
import { DashboardOutlined, ShoppingOutlined, FileTextOutlined } from "@ant-design/icons";

const ListQuotationsPage: React.FC = () => {
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
      label: "List Quotations",
      icon: <FileTextOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ListQuotations />
    </DashboardLayout>
  );
};

export default ListQuotationsPage;

