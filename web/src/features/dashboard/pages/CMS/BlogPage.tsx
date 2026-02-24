import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Bloge from "./Bloge";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const BlogPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "CMS", icon: <FileTextOutlined /> },
            ]}
        >
            <Bloge />
        </DashboardLayout>
    );
};

export default BlogPage;