import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import Projects from "./Projects";
import { DashboardOutlined, FileTextOutlined } from "@ant-design/icons";

const ProjectsPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Projects", icon: <FileTextOutlined /> },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <Projects />
    </DashboardLayout>
  );
};

export default ProjectsPage;
