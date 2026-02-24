import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CMS from "./CMS";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const CMSPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "CMS", icon: <FileTextOutlined /> },
            ]}
        >
            <CMS />
        </DashboardLayout>
    );
};

export default CMSPage;