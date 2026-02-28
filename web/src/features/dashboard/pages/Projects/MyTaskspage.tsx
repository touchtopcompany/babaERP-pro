import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import MyTasks from "./MyTasks";
import { DashboardOutlined, FileTextOutlined } from "@ant-design/icons";

const MyTaskspage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Projects", icon: <FileTextOutlined />, path: "/dashboard/projects" },
    { label: "My Tasks", icon: <FileTextOutlined /> },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <MyTasks />
    </DashboardLayout>
  );
};

export default MyTaskspage;
