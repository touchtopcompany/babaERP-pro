import DashboardLayout from "../../components/layout/DashboardLayout";
import Users from "./Users";
import {
    DashboardOutlined,
    UsergroupAddOutlined,
    UserOutlined,
} from "@ant-design/icons";

const UsersPage: React.FC = () => {
    return (
        <DashboardLayout
            businessName="C2Z Electronics"
            breadcrumbs={[
                { label: "Dashboard", icon: <DashboardOutlined /> },
                { label: "User Management", icon: <UsergroupAddOutlined /> },
                { label: "Users", icon: <UserOutlined /> },
            ]}
            showFilters={false}
        >
            <Users />
        </DashboardLayout>
    );
};

export default UsersPage;

