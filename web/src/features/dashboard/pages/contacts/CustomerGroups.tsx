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
} from "antd";
import {
  TeamOutlined,
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
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";

const { Title, Text } = Typography;
const { Search } = Input;

export interface CustomerGroupData {
  key: string;
  id: string;
  name: string;
  description: string;
  customersCount: number;
  status: "active" | "inactive";
  createdAt: string;
}

const CustomerGroups: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<CustomerGroupData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    name: true,
    id: true,
    description: true,
    customersCount: true,
    status: true,
    createdAt: true,
    action: true,
  });

  // Mock data - replace with API call
  const defaultGroups: CustomerGroupData[] = [
    {
      key: "1",
      id: "CG-001",
      name: "VIP Customers",
      description: "High-value customers with premium services",
      customersCount: 25,
      status: "active",
      createdAt: "2024-01-01",
    },
    {
      key: "2",
      id: "CG-002",
      name: "Regular Customers",
      description: "Standard customer group for regular purchases",
      customersCount: 150,
      status: "active",
      createdAt: "2024-01-05",
    },
    {
      key: "3",
      id: "CG-003",
      name: "Wholesale Customers",
      description: "Bulk purchase customers with special pricing",
      customersCount: 45,
      status: "active",
      createdAt: "2024-01-10",
    },
    {
      key: "4",
      id: "CG-004",
      name: "Retail Customers",
      description: "Individual retail customers",
      customersCount: 320,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      key: "5",
      id: "CG-005",
      name: "Corporate Clients",
      description: "Business-to-business customers",
      customersCount: 18,
      status: "active",
      createdAt: "2024-01-20",
    },
  ];

  const [groups, setGroups] = useState<CustomerGroupData[]>(defaultGroups);

  // Filter groups based on search text
  const filteredGroups = useMemo(() => {
    if (!searchText) return groups;
    const searchLower = searchText.toLowerCase();
    return groups.filter(
      (group) =>
        group.name.toLowerCase().includes(searchLower) ||
        group.description.toLowerCase().includes(searchLower) ||
        group.id.toLowerCase().includes(searchLower)
    );
  }, [groups, searchText]);

  const handleAddGroup = () => {
    // TODO: Navigate to add group page or open add group modal
    message.info("Add customer group functionality coming soon");
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh groups
    setTimeout(() => {
      setLoading(false);
      message.success("Customer groups refreshed successfully");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = ["Group ID", "Name", "Description", "Customers Count", "Status", "Created At"];
    const csvData = filteredGroups.map((group) => [
      group.id,
      group.name,
      group.description,
      group.customersCount,
      group.status,
      group.createdAt,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `customer_groups_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Customer groups exported to CSV successfully");
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
          <title>Customer Groups Report</title>
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
          <h1>Customer Groups Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Group ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Customers Count</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              ${filteredGroups
                .map(
                  (group) => `
                <tr>
                  <td>${group.id}</td>
                  <td>${group.name}</td>
                  <td>${group.description}</td>
                  <td>${group.customersCount}</td>
                  <td>${group.status}</td>
                  <td>${group.createdAt}</td>
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
            Group ID
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
        key: "customersCount",
        label: (
          <Checkbox
            checked={columnVisibility.customersCount}
            onChange={(e) => handleColumnVisibilityChange("customersCount", e.target.checked)}
          >
            Customers Count
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

  const columns: ColumnsType<CustomerGroupData> = [
    {
      title: "Group Name",
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
          overflow: "hidden",
          maxWidth: "100%",
              background: isDark ? "rgba(24, 144, 255, 0.2)" : "rgba(24, 144, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1890ff",
              fontSize: "18px",
            }}
          >
            <TeamOutlined />
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
      title: "Customers",
      dataIndex: "customersCount",
      key: "customersCount",
      width: 120,
      align: "center",
      sorter: (a, b) => a.customersCount - b.customersCount,
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
          {count} customers
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
              setSelectedGroup(record);
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
              setSelectedGroup(record);
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
              setSelectedGroup(record);
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
    if (col.key === "customersCount") return columnVisibility.customersCount;
    if (col.key === "status") return columnVisibility.status;
    if (col.key === "createdAt") return columnVisibility.createdAt;
    if (col.key === "action") return columnVisibility.action;
    return true;
  });

  return (
    <div>
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
            Customer Groups
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Manage customer groups and categories
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
              onClick={handleAddGroup}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Add Group
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Card
        style={{
          marginBottom: "24px",
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
        }}
        bodyStyle={{ padding: "16px 24px" }}
      >
        <Row gutter={16} align="middle">
          <Col xs={24} sm={24} md={12} lg={10}>
            <Search
              placeholder="Search customer groups by name, description, or ID..."
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
                width: "100%",
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={14}>
            <Space
              style={{
                width: "100%",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
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
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Customer Groups Table */}
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
        <style>{`
          .customer-groups-table .ant-table-thead > tr > th {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .customer-groups-table .ant-table-thead > tr > th:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .customer-groups-table .ant-table-thead > tr > th:first-child {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "#1890ff"} !important;
            color: ${isDark ? "rgba(255,255,255,0.85)" : "#fff"} !important;
          }
          .customer-groups-table .ant-table-thead > tr > th:first-child:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .customer-groups-table .ant-table-tbody > tr {
            transition: all 0.2s ease;
          }
          .customer-groups-table .ant-table-tbody > tr:hover > td {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
          }
          .customer-groups-table .ant-table-tbody > tr:hover {
            transform: translateY(-1px);
            box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
          }
          .customer-groups-table .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.85)"} !important;
          }
          .customer-groups-table .ant-table-column-sorted .ant-table-column-sorter-up,
          .customer-groups-table .ant-table-column-sorted .ant-table-column-sorter-down,
          .customer-groups-table .ant-table-column-sorter-up.on,
          .customer-groups-table .ant-table-column-sorter-down.on,
          .customer-groups-table .ant-table-column-sorter-up.active,
          .customer-groups-table .ant-table-column-sorter-down.active {
            color: ${isDark ? "#fff" : "#fff"} !important;
            opacity: 1 !important;
          }
        `}</style>
        <Table
          className="customer-groups-table"
          columns={visibleColumns}
          dataSource={filteredGroups}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} customer groups`,
            pageSizeOptions: ["10", "25", "50", "100"],
            style: {
              marginTop: "16px",
            },
          }}
          scroll={{ x: "max-content" }}
          style={{
            background: isDark ? "transparent" : "#fafafa",
          }}
        />
      </Card>

      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedGroup(null);
        }}
        title="Customer Group Details"
        data={selectedGroup}
        fields={[
          { key: "id", label: "Group ID" },
          { key: "name", label: "Group Name" },
          { key: "description", label: "Description" },
          { key: "customersCount", label: "Customers Count" },
          { key: "status", label: "Status" },
          { key: "createdAt", label: "Created At" },
        ]}
        width={600}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedGroup(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update customer group
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Customer group updated successfully");
            setEditModalOpen(false);
            setSelectedGroup(null);
          } catch (_error) {
            message.error("Failed to update customer group");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit Customer Group"
        data={selectedGroup}
        fields={[
          { name: "name", label: "Group Name", type: "text", required: true },
          { name: "description", label: "Description", type: "text" },
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
          setSelectedGroup(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete customer group
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Customer group deleted successfully");
            setGroups(groups.filter((g) => g.key !== selectedGroup?.key));
            setDeleteModalOpen(false);
            setSelectedGroup(null);
          } catch (_error) {
            message.error("Failed to delete customer group");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete Customer Group"
        itemName={selectedGroup?.name}
        loading={actionLoading}
      />
    </div>
  );
};

export default CustomerGroups;

