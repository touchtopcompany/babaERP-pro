import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Reminder from "./Reminder";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const ReminderPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "Essentials", icon: <FileTextOutlined /> },
            ]}
        >
            < Reminder />
        </DashboardLayout>
    );
};

export default ReminderPage;