import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {DashboardOutlined, FileTextOutlined,} from "@ant-design/icons";
import JobSheets from "./JobSheets";

const JobSheetsPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Job Sheets", icon: <FileTextOutlined /> },
            ]}
        >
            <JobSheets />
        </DashboardLayout>
    );
};

export default JobSheetsPage;