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
  Tooltip,
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
  InfoCircleOutlined,
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

export interface SellReturnData {
  key: string;
  date: string;
  invoiceNo: string;
  parentSale: string;
  customerName: string;
  location: string;
  paymentStatus: string;
  totalAmount: number;
  paymentDue: number;
}

const SellReturn: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<SellReturnData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  
  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    businessLocation: {
      label: "Business Location:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
      ],
    },
    customer: {
      label: "Customer:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "John Doe", value: "John Doe" },
        { label: "Mary Johnson", value: "Mary Johnson" },
        { label: "Peter Wilson", value: "Peter Wilson" },
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2025-01-01"), dayjs("2025-12-31")],
    },
    user: {
      label: "User:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Jane Smith", value: "Jane Smith" },
        { label: "Bob Johnson", value: "Bob Johnson" },
      ],
    },
  });

  // Convert FilterConfig to filters object for filtering logic
  const filters = {
    businessLocation: filterConfig.businessLocation?.value || "all",
    customer: filterConfig.customer?.value || "all",
    dateRange: filterConfig.dateRange?.value || [dayjs(), dayjs()],
    user: filterConfig.user?.value || "all",
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    action: true,
    date: true,
    invoiceNo: true,
    parentSale: true,
    customerName: true,
    location: true,
    paymentStatus: true,
    totalAmount: true,
    paymentDue: true,
  });

  // Mock data - replace with API call
  const defaultReturns: SellReturnData[] = [
    {
      key: "1",
      date: "2025-01-20",
      invoiceNo: "INV-2025-001",
      parentSale: "SALE-2025-001",
      customerName: "John Doe",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      totalAmount: 25000.00,
      paymentDue: 0.00,
    },
    {
      key: "2",
      date: "2025-01-25",
      invoiceNo: "INV-2025-002",
      parentSale: "SALE-2025-002",
      customerName: "Mary Johnson",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "partial",
      totalAmount: 15000.00,
      paymentDue: 5000.00,
    },
    {
      key: "3",
      date: "2025-02-01",
      invoiceNo: "INV-2025-003",
      parentSale: "SALE-2025-003",
      customerName: "Peter Wilson",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "due",
      totalAmount: 30000.00,
      paymentDue: 30000.00,
    },
    {
      key: "4",
      date: "2025-02-05",
      invoiceNo: "INV-2025-004",
      parentSale: "SALE-2025-004",
      customerName: "Sarah Brown",
      location: "Location 2",
      paymentStatus: "paid",
      totalAmount: 18000.00,
      paymentDue: 0.00,
    },
    {
      key: "5",
      date: "2025-02-10",
      invoiceNo: "INV-2025-005",
      parentSale: "SALE-2025-005",
      customerName: "Michael Davis",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "partial",
      totalAmount: 22000.00,
      paymentDue: 10000.00,
    },
    {
      key: "6",
      date: "2025-02-15",
      invoiceNo: "INV-2025-006",
      parentSale: "SALE-2025-006",
      customerName: "Emily White",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      totalAmount: 12000.00,
      paymentDue: 0.00,
    },
  ];

  const [returns, setReturns] = useState<SellReturnData[]>(defaultReturns);

  // Filter returns based on search text and filters
  const filteredReturns = useMemo(() => {
    let filtered = returns;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (returnItem) =>
          returnItem.invoiceNo.toLowerCase().includes(searchLower) ||
          returnItem.parentSale.toLowerCase().includes(searchLower) ||
          returnItem.customerName.toLowerCase().includes(searchLower) ||
          returnItem.location.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    if (filters.businessLocation && filters.businessLocation !== "all") {
      filtered = filtered.filter((r) => r.location === filters.businessLocation);
    }
    if (filters.customer !== "all") {
      filtered = filtered.filter((r) => r.customerName === filters.customer);
    }

    return filtered;
  }, [returns, searchText, filters]);

  // Calculate summary totals
  const summaryTotals = useMemo(() => {
    const totalAmount = filteredReturns.reduce((sum, r) => sum + r.totalAmount, 0);
    const totalPaymentDue = filteredReturns.reduce((sum, r) => sum + r.paymentDue, 0);

    return {
      totalAmount,
      paymentDue: totalPaymentDue,
    };
  }, [filteredReturns]);

  const handleAddReturn = () => {
    // TODO: Navigate to add sell return page or open modal
    message.info("Add Sell Return functionality coming soon");
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Sell returns refreshed successfully");
    }, 1000);
  };

  const handleView = (record: SellReturnData) => {
    setSelectedReturn(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: SellReturnData) => {
    setSelectedReturn(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: SellReturnData) => {
    setSelectedReturn(record);
    setDeleteModalOpen(true);
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Invoice No.",
      "Parent Sale",
      "Customer name",
      "Location",
      "Payment Status",
      "Total amount",
      "Payment due",
    ];
    const csvData = filteredReturns.map((returnItem) => [
      returnItem.date,
      returnItem.invoiceNo,
      returnItem.parentSale,
      returnItem.customerName,
      returnItem.location,
      returnItem.paymentStatus,
      returnItem.totalAmount.toFixed(2),
      returnItem.paymentDue.toFixed(2),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `sell_returns_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Sell returns exported to CSV successfully");
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
          <title>Sell Returns Report</title>
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
          <h1>Sell Returns Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Invoice No.</th>
                <th>Parent Sale</th>
                <th>Customer Name</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredReturns
                .map(
                  (returnItem) => `
                <tr>
                  <td>${returnItem.date}</td>
                  <td>${returnItem.invoiceNo}</td>
                  <td>${returnItem.parentSale}</td>
                  <td>${returnItem.customerName}</td>
                  <td>TSh ${returnItem.totalAmount.toFixed(2)}</td>
                  <td>${returnItem.paymentStatus}</td>
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
          <input
            type="checkbox"
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

  const columns: ColumnsType<SellReturnData> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
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
      title: "Invoice No.",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
      width: 150,
      sorter: (a, b) => a.invoiceNo.localeCompare(b.invoiceNo),
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
      title: "Parent Sale",
      dataIndex: "parentSale",
      key: "parentSale",
      width: 150,
      sorter: (a, b) => a.parentSale.localeCompare(b.parentSale),
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
      title: "Customer name",
      dataIndex: "customerName",
      key: "customerName",
      width: 180,
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 200,
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 150,
      sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
      render: (text: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          paid: { color: "success", text: "Paid" },
          partial: { color: "warning", text: "Partial" },
          due: { color: "error", text: "Due" },
        };
        const config = statusConfig[text.toLowerCase()] || { color: "default", text: text };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Total amount",
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
      title: (
        <Space>
          <Text>Payment due</Text>
          <Tooltip title="Outstanding payment amount">
            <InfoCircleOutlined
              style={{
                color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                fontSize: "12px",
                cursor: "help",
              }}
            />
          </Tooltip>
        </Space>
      ),
      dataIndex: "paymentDue",
      key: "paymentDue",
      width: 150,
      align: "right",
      sorter: (a, b) => a.paymentDue - b.paymentDue,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: value > 0 ? "#ff4d4f" : isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            }}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
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
    <div>
      {/* Header Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24}>
          <Title
            level={2}
            style={{
              margin: 0,
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            Sell Return
          </Title>
        </Col>
      </Row>

      {/* Filters */}
      <FilterPanel
        filters={filterConfig}
        onFilterChange={setFilterConfig}
        defaultExpanded={true}
      />

      {/* Sell Return Section */}
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
              Sell Return
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
          dataSource={filteredReturns}
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
          locale={{
            emptyText: "No data available in table",
          }}
          summary={(pageData) => {
            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={6}>
                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f" }}>
                      Total:
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6} align="right">
                    <Text
                      strong
                      style={{
                        fontSize: "13px",
                        color: isDark ? "#fff" : "#1f1f1f",
                      }}
                    >
                      TSh {summaryTotals.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7} align="right">
                    <Text
                      strong
                      style={{
                        fontSize: "13px",
                        color: summaryTotals.paymentDue > 0 ? "#ff4d4f" : isDark ? "#fff" : "#1f1f1f",
                      }}
                    >
                      TSh {summaryTotals.paymentDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8} />
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </Card>

      {/* Modals */}
      {selectedReturn && (
        <>
          <ViewModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Sell Return Details"
            data={selectedReturn}
          />
          <EditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit Sell Return"
            data={selectedReturn}
            onSave={async (_values) => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to update sell return
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Sell return updated successfully");
                setEditModalOpen(false);
              } catch (_error) {
                message.error("Failed to update sell return");
              } finally {
                setActionLoading(false);
              }
            }}
          />
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Sell Return"
            message={`Are you sure you want to delete sell return "${selectedReturn.invoiceNo}"?`}
            onConfirm={async () => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to delete sell return
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setReturns(returns.filter((r) => r.key !== selectedReturn.key));
                message.success("Sell return deleted successfully");
                setDeleteModalOpen(false);
              } catch (_error) {
                message.error("Failed to delete sell return");
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

export default SellReturn;

