import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import LeaveType from "./leaveType";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const LeaveTypePage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "HMS", icon: <FileTextOutlined /> },
            ]}
        >
            <LeaveType />
        </DashboardLayout>
    );
};

export default LeaveTypePage;