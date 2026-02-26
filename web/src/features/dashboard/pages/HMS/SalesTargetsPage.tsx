import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SalesTargets from "./SalesTargets";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const SalesTargetsPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "HMS", icon: <FileTextOutlined /> },
            ]}
        >
            <SalesTargets/>
        </DashboardLayout>
    );
};

export default SalesTargetsPage;