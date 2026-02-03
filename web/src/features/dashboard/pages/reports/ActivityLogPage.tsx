import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ActivityLog from "./ActivityLog";
import { DashboardOutlined, BarChartOutlined } from "@ant-design/icons";

const ActivityLogPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Reports", icon: <BarChartOutlined /> },
    { label: "Activity Log" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ActivityLog />
    </DashboardLayout>
  );
};

export default ActivityLogPage;
