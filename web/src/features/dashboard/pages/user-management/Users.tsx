import React, { useState, useMemo } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Typography,
  Avatar,
  Tag,
  message,
  Row,
  Col,
  Dropdown,
  Checkbox,
  Select,
  Modal,
  Form,
  Divider,
  Tooltip,
} from "antd";
import type { MenuProps } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  DownOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

export interface UserData {
  key: string;
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin?: string;
  createdAt: string;
  avatar?: string;
}

const Users: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    user: true,
    id: true,
    role: true,
    status: true,
    lastLogin: true,
    createdAt: true,
    action: true,
  });

  // Mock data - replace with API call
  const defaultUsers: UserData[] = [
    {
      key: "1",
      id: "USR-001",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      lastLogin: "2024-01-20 10:30 AM",
      createdAt: "2024-01-15",
    },
    {
      key: "2",
      id: "USR-002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Manager",
      status: "active",
      lastLogin: "2024-01-19 02:15 PM",
      createdAt: "2024-01-10",
    },
    {
      key: "3",
      id: "USR-003",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "Sales Agent",
      status: "inactive",
      lastLogin: "2024-01-18 09:00 AM",
      createdAt: "2024-01-05",
    },
    {
      key: "4",
      id: "USR-004",
      name: "Alice Williams",
      email: "alice.williams@example.com",
      role: "Staff",
      status: "active",
      lastLogin: "2024-01-20 11:45 AM",
      createdAt: "2024-01-12",
    },
    {
      key: "5",
      id: "USR-005",
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      role: "Manager",
      status: "active",
      lastLogin: "2024-01-19 04:20 PM",
      createdAt: "2024-01-08",
    },
  ];

  const [users, setUsers] = useState<UserData[]>(defaultUsers);

  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    user: {
      label: "User:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        ...defaultUsers.map((u) => ({ label: u.name, value: u.name })),
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2024-01-01"), dayjs()],
    },
  });

  // Convert FilterConfig to filters object for filtering logic
  const filters = {
    user: filterConfig.user?.value || "all",
    dateRange: filterConfig.dateRange?.value || [dayjs(), dayjs()],
  };

  // Filter users based on search text and filters
  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.role.toLowerCase().includes(searchLower) ||
          user.id.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    if (filters.user !== "all") {
      filtered = filtered.filter((u) => u.name === filters.user);
    }

    return filtered;
  }, [users, searchText, filters]);

  const handleAddUser = () => {
    setAddUserModalOpen(true);
    form.resetFields();
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh users
    setTimeout(() => {
      setLoading(false);
      message.success("Users refreshed successfully");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = ["User ID", "Name", "Email", "Role", "Status", "Last Login", "Created At"];
    const csvData = filteredUsers.map((user) => [
      user.id,
      user.name,
      user.email,
      user.role,
      user.status,
      user.lastLogin || "Never",
      user.createdAt,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `users_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Users exported to CSV successfully");
  };

  const handleExportExcel = () => {
    // For Excel export, we'll use CSV format (can be enhanced with a library like xlsx)
    message.info("Excel export will be available soon. Exporting as CSV for now.");
    handleExportCSV();
  };

  const handleExportPDF = () => {
    message.info("PDF export functionality coming soon");
    // TODO: Implement PDF export using a library like jsPDF or react-pdf
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const tableHTML = `
      <html>
        <head>
          <title>Users Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1f1f1f; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Users Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              ${filteredUsers
        .map(
          (user) => `
                <tr>
                  <td>${user.id}</td>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  <td>${user.role}</td>
                  <td>${user.status}</td>
                  <td>${user.lastLogin || "Never"}</td>
                  <td>${user.createdAt}</td>
                </tr>
              `
        )
        .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(tableHTML);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleColumnVisibilityChange = (key: string, visible: boolean) => {
    setColumnVisibility((prev) => ({ ...prev, [key]: visible }));
  };

  const columnVisibilityMenu: MenuProps = {
    items: [
      {
        key: "user",
        label: (
          <Checkbox
            checked={columnVisibility.user}
            onChange={(e) => handleColumnVisibilityChange("user", e.target.checked)}
          >
            User
          </Checkbox>
        ),
      },
      {
        key: "id",
        label: (
          <Checkbox
            checked={columnVisibility.id}
            onChange={(e) => handleColumnVisibilityChange("id", e.target.checked)}
          >
            User ID
          </Checkbox>
        ),
      },
      {
        key: "role",
        label: (
          <Checkbox
            checked={columnVisibility.role}
            onChange={(e) => handleColumnVisibilityChange("role", e.target.checked)}
          >
            Role
          </Checkbox>
        ),
      },
      {
        key: "status",
        label: (
          <Checkbox
            checked={columnVisibility.status}
            onChange={(e) => handleColumnVisibilityChange("status", e.target.checked)}
          >
            Status
          </Checkbox>
        ),
      },
      {
        key: "lastLogin",
        label: (
          <Checkbox
            checked={columnVisibility.lastLogin}
            onChange={(e) => handleColumnVisibilityChange("lastLogin", e.target.checked)}
          >
            Last Login
          </Checkbox>
        ),
      },
      {
        key: "createdAt",
        label: (
          <Checkbox
            checked={columnVisibility.createdAt}
            onChange={(e) => handleColumnVisibilityChange("createdAt", e.target.checked)}
          >
            Created At
          </Checkbox>
        ),
      },
    ],
  };

  const columns: ColumnsType<UserData> = [
    {
      title: "User",
      key: "user",
      width: 250,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <Space>
          <Avatar
            size={40}
            icon={<UserOutlined />}
            src={record.avatar}
            style={{
              background: isDark ? "rgba(24, 144, 255, 0.2)" : "#1890ff",
            }}
          />
          <div>
            <Text
              strong
              style={{
                fontSize: "14px",
                color: isDark ? "#fff" : "#1f1f1f",
                display: "block",
              }}
            >
              {record.name}
            </Text>
            <Text
              style={{
                fontSize: "12px",
                color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              }}
            >
              {record.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
      width: 120,
      sorter: (a, b) => a.id.localeCompare(b.id),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            fontFamily: "monospace",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 150,
      sorter: (a, b) => a.role.localeCompare(b.role),
      render: (role: string) => (
        <Tag
          color={role === "Admin" ? "red" : role === "Manager" ? "blue" : "green"}
          style={{
            borderRadius: "4px",
            padding: "4px 12px",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status: string) => (
        <Tag
          color={status === "active" ? "success" : "default"}
          style={{
            borderRadius: "4px",
            padding: "4px 12px",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      width: 180,
      sorter: (a, b) => {
        if (!a.lastLogin && !b.lastLogin) return 0;
        if (!a.lastLogin) return 1;
        if (!b.lastLogin) return -1;
        return new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime();
      },
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text || "Never"}
        </Text>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedUser(record);
              setViewModalOpen(true);
            }}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#1890ff",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedUser(record);
              setEditModalOpen(true);
            }}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#52c41a",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedUser(record);
              setDeleteModalOpen(true);
            }}
            danger
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#ff4d4f",
            }}
          />
        </Space>
      ),
    },
  ];

  // Filter columns based on visibility
  const visibleColumns = columns.filter((col) => {
    if (col.key === "user") return columnVisibility.user;
    if (col.key === "id") return columnVisibility.id;
    if (col.key === "role") return columnVisibility.role;
    if (col.key === "status") return columnVisibility.status;
    if (col.key === "lastLogin") return columnVisibility.lastLogin;
    if (col.key === "createdAt") return columnVisibility.createdAt;
    if (col.key === "action") return columnVisibility.action;
    return true;
  });

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      {/* Header Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Title
            level={2}
            style={{
              margin: 0,
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            Users Management
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Manage system users, roles, and permissions
          </Text>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Space
            style={{
              width: "100%",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <Button
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              loading={loading}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddUser}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Add User
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Filters Section */}
      <FilterPanel
        filters={filterConfig}
        onFilterChange={setFilterConfig}
        defaultExpanded={true}
      />

      {/* Users Management Section */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
        }}
        bodyStyle={{ padding: "24px", overflow: "hidden" }}
      >
        <Row gutter={[16, 16]} style={{ marginBottom: "16px" }} align="middle">
          <Col xs={24} sm={24} md={12} lg={8}>
            <Title
              level={4}
              style={{
                margin: 0,
                color: isDark ? "#fff" : "#1f1f1f",
                fontWeight: 600,
              }}
            >
              Users Management
            </Title>
          </Col>
          <Col xs={24} sm={24} md={12} lg={16}>
            <Space
              style={{
                width: "100%",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <Select
                value={pageSize}
                onChange={setPageSize}
                style={{ width: 150 }}
                suffixIcon={<DownOutlined />}
              >
                <Select.Option value={10}>Show 10 entries</Select.Option>
                <Select.Option value={25}>Show 25 entries</Select.Option>
                <Select.Option value={50}>Show 50 entries</Select.Option>
                <Select.Option value={100}>Show 100 entries</Select.Option>
              </Select>
              <Button
                icon={<FileTextOutlined />}
                onClick={handleExportCSV}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Export to CSV
              </Button>
              <Button
                icon={<FileExcelOutlined />}
                onClick={handleExportExcel}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Export to Excel
              </Button>
              <Button
                icon={<PrinterOutlined />}
                onClick={handlePrint}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Print
              </Button>
              <Dropdown
                menu={columnVisibilityMenu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button
                  icon={<UnorderedListOutlined />}
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                    fontWeight: 500,
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  Column visibility
                </Button>
              </Dropdown>
              <Button
                icon={<FilePdfOutlined />}
                onClick={handleExportPDF}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Export to PDF
              </Button>
              <Search
                placeholder="Search..."
                allowClear
                enterButton={
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{
                      height: "40px",
                      borderRadius: "0 6px 6px 0",
                    }}
                  />
                }
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={(value) => setSearchText(value)}
                style={{
                  width: 200,
                }}
              />
            </Space>
          </Col>
        </Row>
        <style>{`
          .users-table .ant-table-thead > tr > th {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .users-table .ant-table-thead > tr > th:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .users-table .ant-table-thead > tr > th:first-child {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "#1890ff"} !important;
            color: ${isDark ? "rgba(255,255,255,0.85)" : "#fff"} !important;
          }
          .users-table .ant-table-thead > tr > th:first-child:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .users-table .ant-table-tbody > tr {
            transition: all 0.2s ease;
          }
          .users-table .ant-table-tbody > tr:hover > td {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
          }
          .users-table .ant-table-tbody > tr:hover {
            transform: translateY(-1px);
            box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
          }
          .users-table .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.85)"} !important;
          }
          .users-table .ant-table-column-sorted .ant-table-column-sorter-up,
          .users-table .ant-table-column-sorted .ant-table-column-sorter-down,
          .users-table .ant-table-column-sorter-up.on,
          .users-table .ant-table-column-sorter-down.on,
          .users-table .ant-table-column-sorter-up.active,
          .users-table .ant-table-column-sorter-down.active {
            color: ${isDark ? "#fff" : "#fff"} !important;
            opacity: 1 !important;
          }
          .users-table .ant-table-thead > tr > th:first-child .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)"} !important;
          }
          .users-table .ant-table-thead > tr > th:first-child .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.85)"} !important;
          }
        `}</style>
        <Table
          className="users-table"
          columns={visibleColumns}
          dataSource={filteredUsers}
          loading={loading}
          pagination={{
            pageSize,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            style: {
              marginTop: "16px",
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            },
          }}
          scroll={{ x: "max-content" }}
          style={{
            background: isDark ? "transparent" : "#fafafa",
            width: "100%",
          }}
        />
      </Card>

      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedUser(null);
        }}
        title="User Details"
        data={selectedUser}
        fields={[
          { key: "id", label: "User ID" },
          { key: "name", label: "Full Name" },
          { key: "email", label: "Email Address" },
          { key: "role", label: "Role" },
          { key: "status", label: "Status" },
          { key: "lastLogin", label: "Last Login" },
          { key: "createdAt", label: "Created At" },
        ]}
        width={600}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedUser(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update user
            // await updateUser(selectedUser?.key, _values);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("User updated successfully");
            setEditModalOpen(false);
            setSelectedUser(null);
          } catch (_error) {
            message.error("Failed to update user");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit User"
        data={selectedUser}
        fields={[
          { name: "name", label: "Full Name", type: "text", required: true },
          { name: "email", label: "Email Address", type: "email", required: true },
          {
            name: "role",
            label: "Role",
            type: "select",
            required: true,
            options: [
              { label: "Admin", value: "Admin" },
              { label: "Manager", value: "Manager" },
              { label: "Sales Agent", value: "Sales Agent" },
              { label: "Staff", value: "Staff" },
            ],
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            required: true,
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
          },
        ]}
        loading={actionLoading}
        width={600}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete user
            // await deleteUser(selectedUser?.key);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("User deleted successfully");
            setUsers(users.filter((u) => u.key !== selectedUser?.key));
            setDeleteModalOpen(false);
            setSelectedUser(null);
          } catch (_error) {
            message.error("Failed to delete user");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete User"
        itemName={selectedUser?.name}
        loading={actionLoading}
      />

      {/* Add User Modal */}
      <Modal
        title="Add user"
        open={addUserModalOpen}
        onCancel={() => {
          setAddUserModalOpen(false);
          form.resetFields();
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setAddUserModalOpen(false);
              form.resetFields();
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={async () => {
              try {
                const values = await form.validateFields();
                setActionLoading(true);
                // TODO: Implement API call to add user
                // await addUser(values);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("User added successfully");
                setAddUserModalOpen(false);
                form.resetFields();
                // Refresh users list
                handleRefresh();
              } catch (error) {
                console.error("Validation failed:", error);
              } finally {
                setActionLoading(false);
              }
            }}
            loading={actionLoading}
          >
            Save
          </Button>,
        ]}
        width={700}
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          style={{
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          }}
        >
          {/* User Details Section */}
          <Row gutter={[16, 0]}>
            <Col span={8}>
              <Form.Item
                label="Prefix"
                name="prefix"
              >
                <Input placeholder="Mr / Mrs / Miss" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please input first name!" }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please input last name!" }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                name="isActive"
                valuePropName="checked"
              >
                <Checkbox>
                  Is active?
                  <Tooltip title="Enable or disable user account">
                    <InfoCircleOutlined style={{ marginLeft: 4, color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />
                  </Tooltip>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Divider style={{ margin: "20px 0" }} />

          {/* Roles and Permissions Section */}
          <Title level={5} style={{ marginBottom: 16 }}>Roles and Permissions</Title>

          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                name="allowLogin"
                valuePropName="checked"
              >
                <Checkbox>Allow login</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                label="Username"
                name="username"
                help="Leave blank to auto generate username"
              >
                <Input placeholder="Username" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input password!" }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select a role!" }]}
              >
                <Select placeholder="Select role" suffixIcon={<InfoCircleOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}>
                  <Option value="Admin">Admin</Option>
                  <Option value="Manager">Manager</Option>
                  <Option value="Sales Agent">Sales Agent</Option>
                  <Option value="Staff">Staff</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider style={{ margin: "20px 0" }} />

          {/* Access locations Section */}
          <Title level={5} style={{ marginBottom: 16 }}>Access locations</Title>

          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                name="allLocations"
                valuePropName="checked"
              >
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      form.setFieldsValue({ locations: [] });
                    }
                  }}
                >
                  All Locations
                  <Tooltip title="Grant access to all locations">
                    <InfoCircleOutlined style={{ marginLeft: 4, color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />
                  </Tooltip>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                label="Specific Locations"
                name="locations"
                tooltip="Select specific locations for user access. Leave empty if 'All Locations' is checked."
              >
                <Select
                  mode="multiple"
                  placeholder="Select locations"
                  style={{ width: '100%' }}
                  options={[
                    { value: 'headquarters', label: 'Headquarters' },
                    { value: 'branch-north', label: 'Branch North' },
                    { value: 'branch-south', label: 'Branch South' },
                    { value: 'branch-east', label: 'Branch East' },
                    { value: 'branch-west', label: 'Branch West' },
                    { value: 'warehouse-main', label: 'Main Warehouse' },
                    { value: 'warehouse-secondary', label: 'Secondary Warehouse' },
                  ]}
                  disabled={form.getFieldValue('allLocations')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;

