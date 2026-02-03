import { useState } from "react";
import { Input, Typography, Tag, Space, Avatar, Badge } from "antd";
import {
  SearchOutlined,
  DesktopOutlined,
  FileAddOutlined,
  UserAddOutlined,
  ProjectOutlined,
  ContactsOutlined,
  MailOutlined,
  FileTextOutlined,
  CheckSquareOutlined,
  TeamOutlined,
  BookOutlined,
  ShareAltOutlined,
  DatabaseOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface SearchOverlayProps {
  visible: boolean;
  onClose: () => void;
}

interface RecentItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  path: string;
  shortcut: string;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const searchFilters = [
    { key: "projects", label: "Projects", icon: <ProjectOutlined /> },
    { key: "leads", label: "Leads", icon: <ContactsOutlined /> },
    { key: "contacts", label: "Contacts", icon: <ContactsOutlined /> },
    { key: "inbox", label: "Inbox", icon: <MailOutlined /> },
    { key: "invoices", label: "Invoices", icon: <FileTextOutlined /> },
    { key: "tasks", label: "Tasks", icon: <CheckSquareOutlined /> },
    { key: "customers", label: "Customers", icon: <TeamOutlined /> },
    { key: "notes", label: "Notes", icon: <BookOutlined /> },
    { key: "affiliate", label: "Affiliate", icon: <ShareAltOutlined /> },
    { key: "storage", label: "Storage", icon: <DatabaseOutlined /> },
    { key: "calendar", label: "Calendar", icon: <CalendarOutlined /> },
  ];

  const recentItems: RecentItem[] = [
    {
      id: "1",
      icon: <DesktopOutlined />,
      title: "Dashboard overview",
      path: "Home / Dashboard",
      shortcut: "/ ⌘",
    },
    {
      id: "2",
      icon: <FileAddOutlined />,
      title: "Add new product",
      path: "Home / Products / Add Product",
      shortcut: "N ⌘",
    },
    {
      id: "3",
      icon: <UserAddOutlined />,
      title: "Add new customer",
      path: "Home / Contacts / Customers",
      shortcut: "P ⌘",
    },
  ];

  const users: User[] = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Bob Johnson" },
    { id: "4", name: "Alice Williams" },
    { id: "5", name: "Charlie Brown" },
  ];

  const handleFilterClick = (filterKey: string) => {
    setSelectedFilter(filterKey);
    // Navigate to the appropriate page based on filter
    const routes: Record<string, string> = {
      projects: "/products",
      leads: "/contacts/customers",
      contacts: "/contacts",
      inbox: "/inbox",
      invoices: "/sell/all-sales",
      tasks: "/tasks",
      customers: "/contacts/customers",
      notes: "/notes",
      affiliate: "/affiliate",
      storage: "/products",
      calendar: "/calendar",
    };
    if (routes[filterKey]) {
      navigate(routes[filterKey]);
      onClose();
    }
  };

  const handleRecentItemClick = (item: RecentItem) => {
    const routes: Record<string, string> = {
      "1": "/dashboard",
      "2": "/products/add-product",
      "3": "/contacts/customers",
    };
    if (routes[item.id]) {
      navigate(routes[item.id]);
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)",
        zIndex: 1001,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "80px",
        backdropFilter: "blur(4px)",
      }}
      onMouseDown={onClose}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "600px",
          background: isDark ? "#1f1f1f" : "#ffffff",
          borderRadius: "12px",
          boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.15)",
          overflow: "hidden",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseEnter={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div style={{ padding: "20px", borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <SearchOutlined style={{ fontSize: "18px", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }} />
            <Input
              placeholder="Search...."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                fontSize: "16px",
                color: isDark ? "#fff" : "#1f1f1f",
              }}
              autoFocus
            />
            <Tag
              style={{
                margin: 0,
                padding: "4px 8px",
                background: isDark ? "rgba(255,255,255,0.1)" : "#f5f5f5",
                border: "none",
                color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                cursor: "pointer",
              }}
              onClick={onClose}
            >
              ESC
            </Tag>
          </div>
        </div>

        {/* Search Filters */}
        <div style={{ padding: "20px", borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
          <Text
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginBottom: "12px",
            }}
          >
            I'm searching for...
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {searchFilters.map((filter) => (
              <Tag
                key={filter.key}
                onClick={() => handleFilterClick(filter.key)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: selectedFilter === filter.key
                    ? `1px solid #1890ff`
                    : isDark
                    ? "1px solid rgba(255,255,255,0.2)"
                    : "1px solid #d9d9d9",
                  background: selectedFilter === filter.key
                    ? "rgba(24, 144, 255, 0.1)"
                    : isDark
                    ? "rgba(255,255,255,0.05)"
                    : "#fafafa",
                  color: selectedFilter === filter.key
                    ? "#1890ff"
                    : isDark
                    ? "rgba(255,255,255,0.85)"
                    : "#1f1f1f",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (selectedFilter !== filter.key) {
                    e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedFilter !== filter.key) {
                    e.currentTarget.style.background = selectedFilter === filter.key
                      ? "rgba(24, 144, 255, 0.1)"
                      : isDark
                      ? "rgba(255,255,255,0.05)"
                      : "#fafafa";
                  }
                }}
              >
                {filter.icon}
                {filter.label}
              </Tag>
            ))}
          </div>
        </div>

        {/* Recent Items */}
        <div style={{ padding: "20px", borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Text
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              }}
            >
              Recent
            </Text>
            <Badge
              count={recentItems.length}
              style={{
                background: isDark ? "rgba(255,255,255,0.2)" : "#d9d9d9",
                color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
              }}
            />
          </div>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            {recentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleRecentItemClick(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    background: isDark ? "rgba(24, 144, 255, 0.2)" : "rgba(24, 144, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1890ff",
                    fontSize: "16px",
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: isDark ? "#fff" : "#1f1f1f",
                      display: "block",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: "12px",
                      color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                    }}
                  >
                    {item.path}
                  </Text>
                </div>
                <Tag
                  style={{
                    margin: 0,
                    padding: "2px 8px",
                    background: isDark ? "rgba(255,255,255,0.1)" : "#f5f5f5",
                    border: "none",
                    color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                    fontSize: "11px",
                    fontFamily: "monospace",
                  }}
                >
                  {item.shortcut}
                </Tag>
              </div>
            ))}
          </Space>
        </div>

        {/* Users Section */}
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Text
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              }}
            >
              Users
            </Text>
            <Badge
              count={users.length}
              style={{
                background: isDark ? "rgba(255,255,255,0.2)" : "#d9d9d9",
                color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
              }}
            />
          </div>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            {users.map((user) => (
              <div
                key={user.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Avatar
                  size={32}
                  style={{
                    background: "#1890ff",
                  }}
                >
                  {user.name.charAt(0)}
                </Avatar>
                <Text
                  style={{
                    fontSize: "14px",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  {user.name}
                </Text>
              </div>
            ))}
          </Space>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;

