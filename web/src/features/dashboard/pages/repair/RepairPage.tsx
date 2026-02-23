import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    DashboardOutlined,
    ToolOutlined,
} from "@ant-design/icons";
import Repair from "./Repair";

const RepairPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Repair", icon: <ToolOutlined /> },
            ]}
        >
            <Repair />
        </DashboardLayout>
    );
};

export default RepairPage;