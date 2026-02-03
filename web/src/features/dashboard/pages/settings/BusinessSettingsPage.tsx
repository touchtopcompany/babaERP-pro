import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import BusinessSettings from "./BusinessSettings";
import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";

const BusinessSettingsPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Settings", icon: <SettingOutlined /> },
    { label: "Business Settings" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <BusinessSettings />
    </DashboardLayout>
  );
};

export default BusinessSettingsPage;
