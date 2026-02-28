import React from "react";
import DashboardLayout from "@/features/dashboard/components/layout/DashboardLayout";
import ProjectCategories from "./ProjectCategories";
import { DashboardOutlined, FileTextOutlined } from "@ant-design/icons";

const ProjectCategoriesPage: React.FC = () => {
  const breadcrumbs = [
    { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Projects", icon: <FileTextOutlined />, path: "/dashboard/projects" },
    { label: "Project Categories", icon: <FileTextOutlined /> },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      < ProjectCategories />
    </DashboardLayout>
  );
};

export default ProjectCategoriesPage;
