import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import BarcodeSettings from "./BarcodeSettings";
import { DashboardOutlined, SettingOutlined, BarcodeOutlined } from "@ant-design/icons";

const BarcodeSettingsPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Settings", icon: <SettingOutlined />, path: "/settings/business-settings" },
    { label: "Barcode Settings", icon: <BarcodeOutlined /> },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <BarcodeSettings />
    </DashboardLayout>
  );
};

export default BarcodeSettingsPage;
