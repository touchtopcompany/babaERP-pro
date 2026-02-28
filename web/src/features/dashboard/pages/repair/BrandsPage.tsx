import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { DashboardOutlined, TagsOutlined } from "@ant-design/icons";
import Brands from "./Brands";

const BrandsPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "Brands", icon: <TagsOutlined /> },
            ]}
        >
            <Brands />
        </DashboardLayout>
    );
};

export default BrandsPage;