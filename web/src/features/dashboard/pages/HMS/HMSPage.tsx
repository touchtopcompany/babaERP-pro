import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import HMS from "./HMS";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const HMSPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "HMS", icon: <FileTextOutlined /> },
            ]}
        >
            <HMS />
        </DashboardLayout>
    );
};

export default HMSPage;