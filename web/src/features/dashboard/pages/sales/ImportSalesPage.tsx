import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ImportSales from "./ImportSales";
import { DashboardOutlined, ShoppingOutlined, ImportOutlined } from "@ant-design/icons";

const ImportSalesPage: React.FC = () => {
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
      label: "Import Sales",
      icon: <ImportOutlined />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ImportSales />
    </DashboardLayout>
  );
};

export default ImportSalesPage;

