import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Messages from "./Messages";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const MessagesPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "Essentials", icon: <FileTextOutlined /> },
            ]}
        >
            <Messages />
        </DashboardLayout>
    );
};

export default MessagesPage;