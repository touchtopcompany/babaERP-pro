import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import BusinessLocations from "./BusinessLocations";
import { DashboardOutlined, SettingOutlined, EnvironmentOutlined } from "@ant-design/icons";

const BusinessLocationsPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Settings", icon: <SettingOutlined />, path: "/settings/business-settings" },
    { label: "Business Locations", icon: <EnvironmentOutlined /> },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <BusinessLocations />
    </DashboardLayout>
  );
};

export default BusinessLocationsPage;
