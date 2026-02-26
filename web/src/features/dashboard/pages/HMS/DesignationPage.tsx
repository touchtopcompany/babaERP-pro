import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Designation from "./Designation";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const DesignationPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "HMS", icon: <FileTextOutlined /> },
            ]}
        >
            <Designation />
        </DashboardLayout>
    );
};

export default DesignationPage;