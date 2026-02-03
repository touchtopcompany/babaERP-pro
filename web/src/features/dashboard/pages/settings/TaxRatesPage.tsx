import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import TaxRates from "./TaxRates";
import { DashboardOutlined, SettingOutlined, PercentageOutlined } from "@ant-design/icons";

const TaxRatesPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Settings", icon: <SettingOutlined />, path: "/settings/business-settings" },
    { label: "Tax Rates", icon: <PercentageOutlined /> },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <TaxRates />
    </DashboardLayout>
  );
};

export default TaxRatesPage;
