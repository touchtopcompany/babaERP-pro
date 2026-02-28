import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ProjectsReports from "./ProjectsReports";
import { DashboardOutlined, FileTextOutlined } from "@ant-design/icons";

const ProjectsReportsPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Projects", icon: <FileTextOutlined />, path: "/dashboard/projects" },
    { label: "Reports", icon: <FileTextOutlined /> },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <ProjectsReports />
    </DashboardLayout>
  );
};

export default ProjectsReportsPage;
