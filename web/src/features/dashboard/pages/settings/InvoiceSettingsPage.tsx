import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import InvoiceSettings from "./InvoiceSettings";
import { DashboardOutlined, SettingOutlined, FileTextOutlined } from "@ant-design/icons";

const InvoiceSettingsPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Settings", icon: <SettingOutlined />, path: "/settings/business-settings" },
    { label: "Invoice Settings", icon: <FileTextOutlined /> },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <InvoiceSettings />
    </DashboardLayout>
  );
};

export default InvoiceSettingsPage;
