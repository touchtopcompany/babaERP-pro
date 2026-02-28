import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Spreadsheet from "./Spreadsheet";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const SpreadsheetPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "", icon: <FileTextOutlined /> },
            ]}
        >
            <Spreadsheet />
        </DashboardLayout>
    );
};

export default SpreadsheetPage;