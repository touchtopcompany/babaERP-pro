import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Department from "./Department";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";


const DepartmentPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "HMS", icon: <FileTextOutlined /> },
            ]}
        >
            <Department/>
        </DashboardLayout>
    );
};

export default DepartmentPage;