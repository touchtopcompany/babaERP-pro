import React, { useState, useMemo } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Typography,
  Tag,
  message,
  Row,
  Col,
  Dropdown,
  Checkbox,
  Select,
} from "antd";
import {
  SafetyOutlined,
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
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

export interface RoleData {
  key: string;
  id: string;
  name: string;
  description: string;
  permissions: string[];
  usersCount: number;
  status: "active" | "inactive";
  createdAt: string;
}

const Roles: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    name: true,
    id: true,
    description: true,
    permissions: true,
    usersCount: true,
    status: true,
    createdAt: true,
    action: true,
  });

  // Mock data - replace with API call
  const defaultRoles: RoleData[] = [
    {
      key: "1",
      id: "ROL-001",
      name: "Administrator",
      description: "Full system access with all permissions",
      permissions: ["All Permissions"],
      usersCount: 2,
      status: "active",
      createdAt: "2024-01-01",
    },
    {
      key: "2",
      id: "ROL-002",
      name: "Manager",
      description: "Can manage sales, purchases, and inventory",
      permissions: ["Sales", "Purchases", "Inventory", "Reports"],
      usersCount: 5,
      status: "active",
      createdAt: "2024-01-05",
    },
    {
      key: "3",
      id: "ROL-003",
      name: "Sales Agent",
      description: "Can create sales and view reports",
      permissions: ["Sales", "Reports"],
      usersCount: 8,
      status: "active",
      createdAt: "2024-01-10",
    },
    {
      key: "4",
      id: "ROL-004",
      name: "Staff",
      description: "Basic access for daily operations",
      permissions: ["Sales", "Inventory"],
      usersCount: 12,
      status: "active",
      createdAt: "2024-01-12",
    },
    {
      key: "5",
      id: "ROL-005",
      name: "Viewer",
      description: "Read-only access to reports",
      permissions: ["Reports"],
      usersCount: 3,
      status: "inactive",
      createdAt: "2024-01-15",
    },
  ];

  const [roles, setRoles] = useState<RoleData[]>(defaultRoles);

  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    user: {
      label: "Role:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        ...defaultRoles.map((r) => ({ label: r.name, value: r.name })),
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

  // Filter roles based on search text and filters
  const filteredRoles = useMemo(() => {
    let filtered = roles;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (role) =>
          role.name.toLowerCase().includes(searchLower) ||
          role.description.toLowerCase().includes(searchLower) ||
          role.id.toLowerCase().includes(searchLower) ||
          role.permissions.some((p) => p.toLowerCase().includes(searchLower))
      );
    }

    // Apply filters
    if (filters.user !== "all") {
      filtered = filtered.filter((r) => r.name === filters.user);
    }

    return filtered;
  }, [roles, searchText, filters]);

  const handleAddRole = () => {
    // TODO: Navigate to add role page or open add role modal
    message.info("Add role functionality coming soon");
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh roles
    setTimeout(() => {
      setLoading(false);
      message.success("Roles refreshed successfully");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = ["Role ID", "Name", "Description", "Permissions", "Users Count", "Status", "Created At"];
    const csvData = filteredRoles.map((role) => [
      role.id,
      role.name,
      role.description,
      role.permissions.join("; "),
      role.usersCount.toString(),
      role.status,
      role.createdAt,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `roles_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Roles exported to CSV successfully");
  };

  const handleExportExcel = () => {
    message.info("Excel export will be available soon. Exporting as CSV for now.");
    handleExportCSV();
  };

  const handleExportPDF = () => {
    message.info("PDF export functionality coming soon");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const tableHTML = `
      <html>
        <head>
          <title>Roles Report</title>
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
          <h1>Roles Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Role ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Permissions</th>
                <th>Users Count</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              ${filteredRoles
                .map(
                  (role) => `
                <tr>
                  <td>${role.id}</td>
                  <td>${role.name}</td>
                  <td>${role.description}</td>
                  <td>${role.permissions.join(", ")}</td>
                  <td>${role.usersCount}</td>
                  <td>${role.status}</td>
                  <td>${role.createdAt}</td>
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
        key: "name",
        label: (
          <Checkbox
            checked={columnVisibility.name}
            onChange={(e) => handleColumnVisibilityChange("name", e.target.checked)}
          >
            Name
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
            Role ID
          </Checkbox>
        ),
      },
      {
        key: "description",
        label: (
          <Checkbox
            checked={columnVisibility.description}
            onChange={(e) => handleColumnVisibilityChange("description", e.target.checked)}
          >
            Description
          </Checkbox>
        ),
      },
      {
        key: "permissions",
        label: (
          <Checkbox
            checked={columnVisibility.permissions}
            onChange={(e) => handleColumnVisibilityChange("permissions", e.target.checked)}
          >
            Permissions
          </Checkbox>
        ),
      },
      {
        key: "usersCount",
        label: (
          <Checkbox
            checked={columnVisibility.usersCount}
            onChange={(e) => handleColumnVisibilityChange("usersCount", e.target.checked)}
          >
            Users Count
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

  const columns: ColumnsType<RoleData> = [
    {
      title: "Role Name",
      key: "name",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <Space>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: isDark ? "rgba(24, 144, 255, 0.2)" : "rgba(24, 144, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1890ff",
              fontSize: "18px",
            }}
          >
            <SafetyOutlined />
          </div>
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
              {record.id}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
      sorter: (a, b) => a.description.localeCompare(b.description),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      width: 250,
      render: (permissions: string[]) => (
        <Space size={[0, 8]} wrap>
          {permissions.slice(0, 3).map((perm, index) => (
            <Tag
              key={index}
              color="blue"
              style={{
                borderRadius: "4px",
                padding: "2px 8px",
                fontSize: "11px",
                margin: 0,
              }}
            >
              {perm}
            </Tag>
          ))}
          {permissions.length > 3 && (
            <Tag
              color="default"
              style={{
                borderRadius: "4px",
                padding: "2px 8px",
                fontSize: "11px",
                margin: 0,
              }}
            >
              +{permissions.length - 3} more
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Users",
      dataIndex: "usersCount",
      key: "usersCount",
      width: 100,
      align: "center",
      sorter: (a, b) => a.usersCount - b.usersCount,
      render: (count: number) => (
        <Tag
          color="geekblue"
          style={{
            borderRadius: "4px",
            padding: "4px 12px",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {count} users
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
              setSelectedRole(record);
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
              setSelectedRole(record);
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
              setSelectedRole(record);
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
    if (col.key === "name") return columnVisibility.name;
    if (col.key === "id") return columnVisibility.id;
    if (col.key === "description") return columnVisibility.description;
    if (col.key === "permissions") return columnVisibility.permissions;
    if (col.key === "usersCount") return columnVisibility.usersCount;
    if (col.key === "status") return columnVisibility.status;
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
            Roles Management
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Manage user roles and permissions
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
              onClick={handleAddRole}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Add Role
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

      {/* Roles Management Section */}
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
              Roles Management
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
          .roles-table .ant-table-thead > tr > th {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .roles-table .ant-table-thead > tr > th:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .roles-table .ant-table-thead > tr > th:first-child {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "#1890ff"} !important;
            color: ${isDark ? "rgba(255,255,255,0.85)" : "#fff"} !important;
          }
          .roles-table .ant-table-thead > tr > th:first-child:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .roles-table .ant-table-tbody > tr {
            transition: all 0.2s ease;
          }
          .roles-table .ant-table-tbody > tr:hover > td {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
          }
          .roles-table .ant-table-tbody > tr:hover {
            transform: translateY(-1px);
            box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
          }
          .roles-table .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.85)"} !important;
          }
          .roles-table .ant-table-column-sorted .ant-table-column-sorter-up,
          .roles-table .ant-table-column-sorted .ant-table-column-sorter-down,
          .roles-table .ant-table-column-sorter-up.on,
          .roles-table .ant-table-column-sorter-down.on,
          .roles-table .ant-table-column-sorter-up.active,
          .roles-table .ant-table-column-sorter-down.active {
            color: ${isDark ? "#fff" : "#fff"} !important;
            opacity: 1 !important;
          }
          .roles-table .ant-table-thead > tr > th:first-child .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)"} !important;
          }
          .roles-table .ant-table-thead > tr > th:first-child .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.85)"} !important;
          }
        `}</style>
        <Table
          className="roles-table"
          columns={visibleColumns}
          dataSource={filteredRoles}
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
          setSelectedRole(null);
        }}
        title="Role Details"
        data={selectedRole}
        fields={[
          { key: "id", label: "Role ID" },
          { key: "name", label: "Role Name" },
          {
            key: "description",
            label: "Description",
            render: (value: string) => (
              <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>
                {value || "-"}
              </Text>
            ),
          },
          {
            key: "permissions",
            label: "Permissions",
            render: (value: string[]) => (
              <Space size={[0, 8]} wrap>
                {value.map((perm, index) => (
                  <Tag key={index} color="blue">
                    {perm}
                  </Tag>
                ))}
              </Space>
            ),
          },
          { key: "usersCount", label: "Users Count" },
          { key: "status", label: "Status" },
          { key: "createdAt", label: "Created At" },
        ]}
        width={700}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedRole(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update role
            // await updateRole(selectedRole?.key, _values);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Role updated successfully");
            setEditModalOpen(false);
            setSelectedRole(null);
          } catch (_error) {
            message.error("Failed to update role");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit Role"
        data={selectedRole}
        fields={[
          { name: "name", label: "Role Name", type: "text", required: true },
          {
            name: "description",
            label: "Description",
            type: "textarea",
            required: false,
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
          setSelectedRole(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete role
            // await deleteRole(selectedRole?.key);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Role deleted successfully");
            setRoles(roles.filter((r) => r.key !== selectedRole?.key));
            setDeleteModalOpen(false);
            setSelectedRole(null);
          } catch (_error) {
            message.error("Failed to delete role");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete Role"
        itemName={selectedRole?.name}
        loading={actionLoading}
      />
    </div>
  );
};

export default Roles;

