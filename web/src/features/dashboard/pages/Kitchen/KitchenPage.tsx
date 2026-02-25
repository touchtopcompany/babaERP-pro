import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Kitchen from "./Kitchen";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const KitchenPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "Kitchen", icon: <FileTextOutlined /> },
            ]}
        >
            <Kitchen />
        </DashboardLayout>
    );
};

export default KitchenPage;