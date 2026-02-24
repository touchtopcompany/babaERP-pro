import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Testimonial from "./Testimonial";
import {
    DashboardOutlined,
    FileTextOutlined,
} from "@ant-design/icons";

const TestimonialPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
                { label: "CMS", icon: <FileTextOutlined /> },
            ]}
        >
            <Testimonial />
        </DashboardLayout>
    );
};

export default TestimonialPage;