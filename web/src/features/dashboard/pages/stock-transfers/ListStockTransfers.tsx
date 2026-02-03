import React, { useState, useMemo } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Typography,
  message,
  Row,
  Col,
  Dropdown,
  Select,
  Checkbox,
  Tag,
} from "antd";
import type { MenuProps } from "antd";
import {
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
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

export interface StockTransferData {
  key: string;
  date: string;
  referenceNo: string;
  locationFrom: string;
  locationTo: string;
  status: "pending" | "in_transit" | "completed" | "cancelled";
  shippingCharges: number;
  totalAmount: number;
  additionalNotes?: string;
}

const ListStockTransfers: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<StockTransferData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  
  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    locationFrom: {
      label: "Location (From):",
      value: "all",
      options: [
        { label: "All locations", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
      ],
    },
    locationTo: {
      label: "Location (To):",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
      ],
    },
    status: {
      label: "Status:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "In Transit", value: "in_transit" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2025-01-01"), dayjs("2025-12-31")],
    },
    modifiedTransfer: {
      label: "Modified Transfer",
      value: false,
    },
  });

  // Convert FilterConfig to filters object for filtering logic
  const filters = {
    locationFrom: filterConfig.locationFrom?.value || "all",
    locationTo: filterConfig.locationTo?.value || "all",
    status: filterConfig.status?.value || "all",
    dateRange: filterConfig.dateRange?.value || [dayjs(), dayjs()],
    modifiedTransfer: filterConfig.modifiedTransfer?.value || false,
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    date: true,
    referenceNo: true,
    locationFrom: true,
    locationTo: true,
    status: true,
    shippingCharges: true,
    totalAmount: true,
    additionalNotes: true,
    action: true,
  });

  // Mock data - replace with API call
  const defaultTransfers: StockTransferData[] = [
    {
      key: "1",
      date: "2025-01-15",
      referenceNo: "ST-2025-001",
      locationFrom: "C2Z Digital Solutions (C2Z1)",
      locationTo: "Location 2",
      status: "completed",
      shippingCharges: 5000.00,
      totalAmount: 125000.00,
      additionalNotes: "Urgent delivery required",
    },
    {
      key: "2",
      date: "2025-01-16",
      referenceNo: "ST-2025-002",
      locationFrom: "Location 2",
      locationTo: "C2Z Digital Solutions (C2Z1)",
      status: "in_transit",
      shippingCharges: 7500.00,
      totalAmount: 189500.00,
      additionalNotes: "Fragile items - handle with care",
    },
    {
      key: "3",
      date: "2025-01-17",
      referenceNo: "ST-2025-003",
      locationFrom: "C2Z Digital Solutions (C2Z1)",
      locationTo: "Location 2",
      status: "pending",
      shippingCharges: 3000.00,
      totalAmount: 87500.00,
      additionalNotes: "",
    },
    {
      key: "4",
      date: "2025-01-18",
      referenceNo: "ST-2025-004",
      locationFrom: "Location 2",
      locationTo: "C2Z Digital Solutions (C2Z1)",
      status: "completed",
      shippingCharges: 10000.00,
      totalAmount: 245000.00,
      additionalNotes: "Bulk transfer - multiple items",
    },
    {
      key: "5",
      date: "2025-01-19",
      referenceNo: "ST-2025-005",
      locationFrom: "C2Z Digital Solutions (C2Z1)",
      locationTo: "Location 2",
      status: "in_transit",
      shippingCharges: 4500.00,
      totalAmount: 112000.00,
      additionalNotes: "Standard delivery",
    },
    {
      key: "6",
      date: "2025-01-20",
      referenceNo: "ST-2025-006",
      locationFrom: "Location 2",
      locationTo: "C2Z Digital Solutions (C2Z1)",
      status: "pending",
      shippingCharges: 6000.00,
      totalAmount: 156000.00,
      additionalNotes: "Priority shipment",
    },
    {
      key: "7",
      date: "2025-01-21",
      referenceNo: "ST-2025-007",
      locationFrom: "C2Z Digital Solutions (C2Z1)",
      locationTo: "Location 2",
      status: "completed",
      shippingCharges: 8500.00,
      totalAmount: 198000.00,
      additionalNotes: "Express delivery",
    },
    {
      key: "8",
      date: "2025-01-22",
      referenceNo: "ST-2025-008",
      locationFrom: "Location 2",
      locationTo: "C2Z Digital Solutions (C2Z1)",
      status: "cancelled",
      shippingCharges: 0.00,
      totalAmount: 0.00,
      additionalNotes: "Cancelled due to inventory issues",
    },
    {
      key: "9",
      date: "2025-01-23",
      referenceNo: "ST-2025-009",
      locationFrom: "C2Z Digital Solutions (C2Z1)",
      locationTo: "Location 2",
      status: "in_transit",
      shippingCharges: 5500.00,
      totalAmount: 134500.00,
      additionalNotes: "Regular transfer",
    },
    {
      key: "10",
      date: "2025-01-24",
      referenceNo: "ST-2025-010",
      locationFrom: "Location 2",
      locationTo: "C2Z Digital Solutions (C2Z1)",
      status: "pending",
      shippingCharges: 4000.00,
      totalAmount: 98000.00,
      additionalNotes: "",
    },
    {
      key: "11",
      date: "2025-01-25",
      referenceNo: "ST-2025-011",
      locationFrom: "C2Z Digital Solutions (C2Z1)",
      locationTo: "Location 2",
      status: "completed",
      shippingCharges: 9200.00,
      totalAmount: 221000.00,
      additionalNotes: "High-value items",
    },
    {
      key: "12",
      date: "2025-01-26",
      referenceNo: "ST-2025-012",
      locationFrom: "Location 2",
      locationTo: "C2Z Digital Solutions (C2Z1)",
      status: "in_transit",
      shippingCharges: 6800.00,
      totalAmount: 167800.00,
      additionalNotes: "Temperature-controlled shipment",
    },
    {
      key: "13",
      date: "2025-01-27",
      referenceNo: "ST-2025-013",
      locationFrom: "C2Z Digital Solutions (C2Z1)",
      locationTo: "Location 2",
      status: "completed",
      shippingCharges: 3500.00,
      totalAmount: 89500.00,
      additionalNotes: "Standard transfer",
    },
    {
      key: "14",
      date: "2025-01-28",
      referenceNo: "ST-2025-014",
      locationFrom: "Location 2",
      locationTo: "C2Z Digital Solutions (C2Z1)",
      status: "pending",
      shippingCharges: 7800.00,
      totalAmount: 192400.00,
      additionalNotes: "Bulk order transfer",
    },
    {
      key: "15",
      date: "2025-01-29",
      referenceNo: "ST-2025-015",
      locationFrom: "C2Z Digital Solutions (C2Z1)",
      locationTo: "Location 2",
      status: "completed",
      shippingCharges: 6200.00,
      totalAmount: 153600.00,
      additionalNotes: "Routine stock replenishment",
    },
  ];

  const [transfers, setTransfers] = useState<StockTransferData[]>(defaultTransfers);

  // Filter transfers based on search text and filters
  const filteredTransfers = useMemo(() => {
    let filtered = transfers;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (transfer) =>
          transfer.referenceNo.toLowerCase().includes(searchLower) ||
          transfer.locationFrom.toLowerCase().includes(searchLower) ||
          transfer.locationTo.toLowerCase().includes(searchLower) ||
          transfer.additionalNotes?.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    if (filters.locationFrom !== "all") {
      filtered = filtered.filter((t) => t.locationFrom === filters.locationFrom);
    }
    if (filters.locationTo !== "all") {
      filtered = filtered.filter((t) => t.locationTo === filters.locationTo);
    }
    if (filters.status !== "all") {
      filtered = filtered.filter((t) => t.status === filters.status);
    }
    if (filters.modifiedTransfer) {
      // TODO: Implement modified transfer filter logic
    }

    return filtered;
  }, [transfers, searchText, filters]);

  // Calculate summary totals
  const summaryTotals = useMemo(() => {
    const totalShippingCharges = filteredTransfers.reduce((sum, t) => sum + t.shippingCharges, 0);
    const totalAmount = filteredTransfers.reduce((sum, t) => sum + t.totalAmount, 0);

    return {
      totalShippingCharges,
      totalAmount,
    };
  }, [filteredTransfers]);

  const handleAddTransfer = () => {
    message.info("Add stock transfer functionality coming soon");
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Stock transfers refreshed successfully");
    }, 1000);
  };

  const handleView = (record: StockTransferData) => {
    setSelectedTransfer(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: StockTransferData) => {
    setSelectedTransfer(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: StockTransferData) => {
    setSelectedTransfer(record);
    setDeleteModalOpen(true);
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Reference No",
      "Location (From)",
      "Location (To)",
      "Status",
      "Shipping Charges",
      "Total Amount",
      "Additional Notes",
    ];
    const csvData = filteredTransfers.map((transfer) => [
      transfer.date,
      transfer.referenceNo,
      transfer.locationFrom,
      transfer.locationTo,
      transfer.status,
      transfer.shippingCharges,
      transfer.totalAmount,
      transfer.additionalNotes || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `stock_transfers_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Stock transfers exported to CSV successfully");
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
          <title>Stock Transfers Report</title>
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
          <h1>Stock Transfers Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference No</th>
                <th>Location (From)</th>
                <th>Location (To)</th>
                <th>Status</th>
                <th>Shipping Charges</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              ${filteredTransfers
                .map(
                  (transfer) => `
                <tr>
                  <td>${transfer.date}</td>
                  <td>${transfer.referenceNo}</td>
                  <td>${transfer.locationFrom}</td>
                  <td>${transfer.locationTo}</td>
                  <td>${transfer.status}</td>
                  <td>TSh ${transfer.shippingCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td>TSh ${transfer.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
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
    items: Object.keys(columnVisibility).map((key) => ({
      key,
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={columnVisibility[key]}
            onChange={(e) => handleColumnVisibilityChange(key, e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          {key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .trim()}
        </div>
      ),
    })),
  };

  const columns: ColumnsType<StockTransferData> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150,
      sorter: (a, b) => a.date.localeCompare(b.date),
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
      title: "Reference No",
      dataIndex: "referenceNo",
      key: "referenceNo",
      width: 150,
      sorter: (a, b) => a.referenceNo.localeCompare(b.referenceNo),
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
      title: "Location (From)",
      dataIndex: "locationFrom",
      key: "locationFrom",
      width: 200,
      sorter: (a, b) => a.locationFrom.localeCompare(b.locationFrom),
    },
    {
      title: "Location (To)",
      dataIndex: "locationTo",
      key: "locationTo",
      width: 200,
      sorter: (a, b) => a.locationTo.localeCompare(b.locationTo),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          pending: { color: "warning", text: "Pending" },
          in_transit: { color: "processing", text: "In Transit" },
          completed: { color: "success", text: "Completed" },
          cancelled: { color: "error", text: "Cancelled" },
        };
        const config = statusConfig[text] || { color: "default", text: text };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Shipping Charges",
      dataIndex: "shippingCharges",
      key: "shippingCharges",
      width: 150,
      align: "right",
      sorter: (a, b) => a.shippingCharges - b.shippingCharges,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 150,
      align: "right",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (value: number) => (
        <Text
          strong
          style={{
            fontSize: "13px",
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "Additional Notes",
      dataIndex: "additionalNotes",
      key: "additionalNotes",
      width: 200,
      render: (text: string | undefined) => (
        <Text
          ellipsis
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text || "-"}
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
            onClick={() => handleView(record)}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#1890ff",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#52c41a",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
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
    if (!col.key) return true;
    return columnVisibility[col.key as string] !== false;
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
            Stock Transfers
          </Title>
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
              onClick={handleAddTransfer}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Add
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

      {/* All Stock Transfers Section */}
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
              All Stock Transfers
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

        <Table
          columns={visibleColumns}
          dataSource={filteredTransfers}
          loading={loading}
          scroll={{ x: "max-content" }}
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
          locale={{
            emptyText: (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                  }}
                >
                  No data available in table
                </Text>
              </div>
            ),
          }}
          style={{
            width: "100%",
          }}
          summary={() => {
            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={5}>
                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f" }}>
                      Total:
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5} align="right">
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "13px",
                          color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                          marginBottom: "4px",
                        }}
                      >
                        Shipping Charges :
                      </div>
                      <Text
                        strong
                        style={{
                          fontSize: "13px",
                          color: isDark ? "#fff" : "#1f1f1f",
                        }}
                      >
                        TSh {summaryTotals.totalShippingCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Text>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6} align="right">
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "13px",
                          color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                          marginBottom: "4px",
                        }}
                      >
                        Total Amount: TSh
                      </div>
                      <Text
                        strong
                        style={{
                          fontSize: "13px",
                          color: isDark ? "#fff" : "#1f1f1f",
                        }}
                      >
                        {summaryTotals.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Text>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7} colSpan={2} />
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </Card>

      {/* Modals */}
      {selectedTransfer && (
        <>
          <ViewModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Stock Transfer Details"
            data={selectedTransfer}
          />
          <EditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit Stock Transfer"
            data={selectedTransfer}
            onSave={async (_values) => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to update stock transfer
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Stock transfer updated successfully");
                setEditModalOpen(false);
              } catch (_error) {
                message.error("Failed to update stock transfer");
              } finally {
                setActionLoading(false);
              }
            }}
          />
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Stock Transfer"
            message={`Are you sure you want to delete stock transfer "${selectedTransfer.referenceNo}"?`}
            onConfirm={async () => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to delete stock transfer
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setTransfers(transfers.filter((t) => t.key !== selectedTransfer.key));
                message.success("Stock transfer deleted successfully");
                setDeleteModalOpen(false);
              } catch (_error) {
                message.error("Failed to delete stock transfer");
              } finally {
                setActionLoading(false);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default ListStockTransfers;

