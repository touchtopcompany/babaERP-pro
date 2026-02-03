import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ItemsReport from "./ItemsReport";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const ItemsReportPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Items Report" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ItemsReport />
    </DashboardLayout>
  );
};

export default ItemsReportPage;
