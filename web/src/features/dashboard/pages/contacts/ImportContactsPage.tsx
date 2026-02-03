import DashboardLayout from "../../components/layout/DashboardLayout";
import ImportContacts from "./ImportContacts";
import {
  DashboardOutlined,
  ContactsOutlined,
  ImportOutlined,
} from "@ant-design/icons";

const ImportContactsPage: React.FC = () => {
  return (
    <DashboardLayout
      businessName="C2Z Electronics"
      breadcrumbs={[
        { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
        { label: "Contacts", icon: <ContactsOutlined />, path: "/contacts" },
        { label: "Import Contacts", icon: <ImportOutlined /> },
      ]}
      showFilters={false}
    >
      <ImportContacts />
    </DashboardLayout>
  );
};

export default ImportContactsPage;

