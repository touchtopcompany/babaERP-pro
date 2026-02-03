import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import NotificationTemplates from "./NotificationTemplates";
import { DashboardOutlined, MailOutlined } from "@ant-design/icons";

const NotificationTemplatesPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined /> },
    { label: "Notification Templates", icon: <MailOutlined /> },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <NotificationTemplates />
    </DashboardLayout>
  );
};

export default NotificationTemplatesPage;
