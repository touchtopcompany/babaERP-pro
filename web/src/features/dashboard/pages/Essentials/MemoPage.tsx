import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Memo from "./Memo";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const MemoPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "Essentials", icon: <FileTextOutlined /> },
            ]}
        >
            <Memo />
        </DashboardLayout>
    );
};

export default MemoPage;