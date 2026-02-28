import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
    DashboardOutlined,
    ToolOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import AddJobSheet from "./AddJobSheet";

const AddJobSheetPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Repair", icon: <ToolOutlined /> },
                { label: "Add Job Sheet", icon: <PlusOutlined /> },
            ]}
        >
            <AddJobSheet />
        </DashboardLayout>
    );
};

export default AddJobSheetPage;