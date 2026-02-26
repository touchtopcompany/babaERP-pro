import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Leave from "./Leave";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const LeavePage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "HMS", icon: <FileTextOutlined /> },
            ]}
        >
            <Leave />
        </DashboardLayout>
    );
};

export default LeavePage;