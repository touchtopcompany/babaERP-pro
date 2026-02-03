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
  Avatar,
  Select,
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
  DollarOutlined,
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

export interface SalesCommissionAgentData {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  commissionRate: number;
  totalSales: number;
  totalCommission: number;
  status: "active" | "inactive";
  createdAt: string;
  avatar?: string;
}

const SalesCommissionAgents: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<SalesCommissionAgentData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    agent: true,
    id: true,
    commissionRate: true,
    totalSales: true,
    totalCommission: true,
    status: true,
    createdAt: true,
    action: true,
  });

  // Mock data - replace with API call
  const defaultAgents: SalesCommissionAgentData[] = [
    {
      key: "1",
      id: "SCA-001",
      name: "John Sales",
      email: "john.sales@example.com",
      phone: "+255 123 456 789",
      commissionRate: 5.0,
      totalSales: 150000,
      totalCommission: 7500,
      status: "active",
      createdAt: "2024-01-01",
    },
    {
      key: "2",
      id: "SCA-002",
      name: "Jane Manager",
      email: "jane.manager@example.com",
      phone: "+255 987 654 321",
      commissionRate: 7.5,
      totalSales: 250000,
      totalCommission: 18750,
      status: "active",
      createdAt: "2024-01-05",
    },
    {
      key: "3",
      id: "SCA-003",
      name: "Bob Agent",
      email: "bob.agent@example.com",
      phone: "+255 555 123 456",
      commissionRate: 4.0,
      totalSales: 80000,
      totalCommission: 3200,
      status: "active",
      createdAt: "2024-01-10",
    },
    {
      key: "4",
      id: "SCA-004",
      name: "Alice Seller",
      email: "alice.seller@example.com",
      phone: "+255 444 567 890",
      commissionRate: 6.0,
      totalSales: 120000,
      totalCommission: 7200,
      status: "inactive",
      createdAt: "2024-01-12",
    },
    {
      key: "5",
      id: "SCA-005",
      name: "Charlie Rep",
      email: "charlie.rep@example.com",
      phone: "+255 333 789 012",
      commissionRate: 5.5,
      totalSales: 95000,
      totalCommission: 5225,
      status: "active",
      createdAt: "2024-01-15",
    },
  ];

  const [agents, setAgents] = useState<SalesCommissionAgentData[]>(defaultAgents);

  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    user: {
      label: "Agent:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        ...defaultAgents.map((a) => ({ label: a.name, value: a.name })),
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

  // Filter agents based on search text and filters
  const filteredAgents = useMemo(() => {
    let filtered = agents;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchLower) ||
          agent.email.toLowerCase().includes(searchLower) ||
          agent.phone.toLowerCase().includes(searchLower) ||
          agent.id.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    if (filters.user !== "all") {
      filtered = filtered.filter((a) => a.name === filters.user);
    }

    return filtered;
  }, [agents, searchText, filters]);

  const handleAddAgent = () => {
    // TODO: Navigate to add agent page or open add agent modal
    message.info("Add sales commission agent functionality coming soon");
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh agents
    setTimeout(() => {
      setLoading(false);
      message.success("Sales commission agents refreshed successfully");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = [
      "Agent ID",
      "Name",
      "Email",
      "Phone",
      "Commission Rate (%)",
      "Total Sales",
      "Total Commission",
      "Status",
      "Created At",
    ];
    const csvData = filteredAgents.map((agent) => [
      agent.id,
      agent.name,
      agent.email,
      agent.phone,
      agent.commissionRate.toString(),
      agent.totalSales.toString(),
      agent.totalCommission.toString(),
      agent.status,
      agent.createdAt,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `sales_commission_agents_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Sales commission agents exported to CSV successfully");
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
          <title>Sales Commission Agents Report</title>
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
          <h1>Sales Commission Agents Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Agent ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Commission Rate (%)</th>
                <th>Total Sales</th>
                <th>Total Commission</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              ${filteredAgents
                .map(
                  (agent) => `
                <tr>
                  <td>${agent.id}</td>
                  <td>${agent.name}</td>
                  <td>${agent.email}</td>
                  <td>${agent.phone}</td>
                  <td>${agent.commissionRate}%</td>
                  <td>TSh ${agent.totalSales.toLocaleString()}</td>
                  <td>TSh ${agent.totalCommission.toLocaleString()}</td>
                  <td>${agent.status}</td>
                  <td>${agent.createdAt}</td>
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
        key: "agent",
        label: (
          <Checkbox
            checked={columnVisibility.agent}
            onChange={(e) => handleColumnVisibilityChange("agent", e.target.checked)}
          >
            Agent
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
            Agent ID
          </Checkbox>
        ),
      },
      {
        key: "commissionRate",
        label: (
          <Checkbox
            checked={columnVisibility.commissionRate}
            onChange={(e) => handleColumnVisibilityChange("commissionRate", e.target.checked)}
          >
            Commission Rate
          </Checkbox>
        ),
      },
      {
        key: "totalSales",
        label: (
          <Checkbox
            checked={columnVisibility.totalSales}
            onChange={(e) => handleColumnVisibilityChange("totalSales", e.target.checked)}
          >
            Total Sales
          </Checkbox>
        ),
      },
      {
        key: "totalCommission",
        label: (
          <Checkbox
            checked={columnVisibility.totalCommission}
            onChange={(e) => handleColumnVisibilityChange("totalCommission", e.target.checked)}
          >
            Total Commission
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

  const columns: ColumnsType<SalesCommissionAgentData> = [
    {
      title: "Agent",
      key: "agent",
      width: 250,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <Space>
          <Avatar
            size={40}
            icon={<TeamOutlined />}
            src={record.avatar}
            style={{
              background: isDark ? "rgba(82, 196, 26, 0.2)" : "#52c41a",
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
      title: "Agent ID",
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
      title: "Commission Rate",
      dataIndex: "commissionRate",
      key: "commissionRate",
      width: 150,
      align: "right",
      sorter: (a, b) => a.commissionRate - b.commissionRate,
      render: (rate: number) => (
        <Tag
          color="green"
          icon={<DollarOutlined />}
          style={{
            borderRadius: "4px",
            padding: "4px 12px",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {rate}%
        </Tag>
      ),
    },
    {
      title: "Total Sales",
      dataIndex: "totalSales",
      key: "totalSales",
      width: 150,
      align: "right",
      sorter: (a, b) => a.totalSales - b.totalSales,
      render: (amount: number) => (
        <Text
          strong
          style={{
            fontSize: "13px",
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          TSh {amount.toLocaleString()}
        </Text>
      ),
    },
    {
      title: "Total Commission",
      dataIndex: "totalCommission",
      key: "totalCommission",
      width: 150,
      align: "right",
      sorter: (a, b) => a.totalCommission - b.totalCommission,
      render: (amount: number) => (
        <Text
          strong
          style={{
            fontSize: "13px",
            color: "#52c41a",
          }}
        >
          TSh {amount.toLocaleString()}
        </Text>
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
              setSelectedAgent(record);
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
              setSelectedAgent(record);
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
              setSelectedAgent(record);
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
    if (col.key === "agent") return columnVisibility.agent;
    if (col.key === "id") return columnVisibility.id;
    if (col.key === "commissionRate") return columnVisibility.commissionRate;
    if (col.key === "totalSales") return columnVisibility.totalSales;
    if (col.key === "totalCommission") return columnVisibility.totalCommission;
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
            Sales Commission Agents
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Manage sales commission agents and their rates
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
              onClick={handleAddAgent}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Add Agent
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

      {/* Sales Commission Agents Section */}
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
              Sales Commission Agents
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
          .agents-table .ant-table-thead > tr > th {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .agents-table .ant-table-thead > tr > th:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .agents-table .ant-table-thead > tr > th:first-child {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "#1890ff"} !important;
            color: ${isDark ? "rgba(255,255,255,0.85)" : "#fff"} !important;
          }
          .agents-table .ant-table-thead > tr > th:first-child:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .agents-table .ant-table-tbody > tr {
            transition: all 0.2s ease;
          }
          .agents-table .ant-table-tbody > tr:hover > td {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
          }
          .agents-table .ant-table-tbody > tr:hover {
            transform: translateY(-1px);
            box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
          }
          .agents-table .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.85)"} !important;
          }
          .agents-table .ant-table-column-sorted .ant-table-column-sorter-up,
          .agents-table .ant-table-column-sorted .ant-table-column-sorter-down,
          .agents-table .ant-table-column-sorter-up.on,
          .agents-table .ant-table-column-sorter-down.on,
          .agents-table .ant-table-column-sorter-up.active,
          .agents-table .ant-table-column-sorter-down.active {
            color: ${isDark ? "#fff" : "#fff"} !important;
            opacity: 1 !important;
          }
          .agents-table .ant-table-thead > tr > th:first-child .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)"} !important;
          }
          .agents-table .ant-table-thead > tr > th:first-child .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.85)"} !important;
          }
        `}</style>
        <Table
          className="agents-table"
          columns={visibleColumns}
          dataSource={filteredAgents}
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
          setSelectedAgent(null);
        }}
        title="Sales Commission Agent Details"
        data={selectedAgent}
        fields={[
          { key: "id", label: "Agent ID" },
          { key: "name", label: "Full Name" },
          { key: "email", label: "Email Address" },
          { key: "phone", label: "Phone Number" },
          {
            key: "commissionRate",
            label: "Commission Rate",
            render: (value: number) => (
              <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>
                {value}%
              </Text>
            ),
          },
          {
            key: "totalSales",
            label: "Total Sales",
            render: (value: number) => (
              <Text style={{ color: isDark ? "#fff" : "#1f1f1f" }}>
                TSh {value.toLocaleString()}
              </Text>
            ),
          },
          {
            key: "totalCommission",
            label: "Total Commission",
            render: (value: number) => (
              <Text style={{ color: "#52c41a", fontWeight: 600 }}>
                TSh {value.toLocaleString()}
              </Text>
            ),
          },
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
          setSelectedAgent(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update agent
            // await updateSalesCommissionAgent(selectedAgent?.key, _values);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Sales commission agent updated successfully");
            setEditModalOpen(false);
            setSelectedAgent(null);
          } catch (_error) {
            message.error("Failed to update sales commission agent");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit Sales Commission Agent"
        data={selectedAgent}
        fields={[
          { name: "name", label: "Full Name", type: "text", required: true },
          { name: "email", label: "Email Address", type: "email", required: true },
          { name: "phone", label: "Phone Number", type: "phone", required: true },
          {
            name: "commissionRate",
            label: "Commission Rate (%)",
            type: "number",
            required: true,
            placeholder: "Enter commission rate (e.g., 5.0)",
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
          setSelectedAgent(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete agent
            // await deleteSalesCommissionAgent(selectedAgent?.key);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Sales commission agent deleted successfully");
            setAgents(agents.filter((a) => a.key !== selectedAgent?.key));
            setDeleteModalOpen(false);
            setSelectedAgent(null);
          } catch (_error) {
            message.error("Failed to delete sales commission agent");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete Sales Commission Agent"
        itemName={selectedAgent?.name}
        loading={actionLoading}
      />
    </div>
  );
};

export default SalesCommissionAgents;

