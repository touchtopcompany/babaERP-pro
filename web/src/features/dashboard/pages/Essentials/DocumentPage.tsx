import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Document from "./Document";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const DocumentPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "Essentials", icon: <FileTextOutlined /> },
            ]}
        >
            <Document />
        </DashboardLayout>
    );
};

export default DocumentPage;