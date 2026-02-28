import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Knowledge from "./Knowledge";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const KnowledgePage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "Essentials", icon: <FileTextOutlined /> },
            ]}
        >
            < Knowledge />
        </DashboardLayout>
    );
};

export default KnowledgePage;