import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import Printers from "./Printers";
import { DashboardOutlined, SettingOutlined, PrinterOutlined } from "@ant-design/icons";

const PrintersPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Settings", icon: <SettingOutlined />, path: "/settings/business-settings" },
    { label: "Receipt Printers", icon: <PrinterOutlined /> },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Printers />
    </DashboardLayout>
  );
};

export default PrintersPage;
