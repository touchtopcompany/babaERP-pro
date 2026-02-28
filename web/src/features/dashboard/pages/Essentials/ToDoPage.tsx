import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ToDo from "./ToDo";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const ToDoPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "Essentials", icon: <FileTextOutlined /> },
            ]}
        >
            <ToDo />
        </DashboardLayout>
    );
};

export default ToDoPage;