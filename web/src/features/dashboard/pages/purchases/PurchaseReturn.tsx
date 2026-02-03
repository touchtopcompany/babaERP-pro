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
  Collapse,
  DatePicker,
  Tooltip,
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
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";
import AddPurchaseReturnModal from "@/components/modals/AddPurchaseReturnModal";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs, { Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

export interface PurchaseReturnData {
  key: string;
  date: string;
  referenceNo: string;
  parentPurchase: string;
  location: string;
  supplier: string;
  paymentStatus: string;
  grandTotal: number;
  paymentDue: number;
}

const PurchaseReturn: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<PurchaseReturnData | null>(null);
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
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2025-01-01"), dayjs("2025-12-31")],
    },
  });

  // Convert FilterConfig to filters object for filtering logic
  const filters = {
    businessLocation: filterConfig.businessLocation?.value || "all",
    dateRange: filterConfig.dateRange?.value || [dayjs(), dayjs()],
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    action: true,
    date: true,
    referenceNo: true,
    parentPurchase: true,
    location: true,
    supplier: true,
    paymentStatus: true,
    grandTotal: true,
    paymentDue: true,
  });

  // Mock data - replace with API call
  const defaultReturns: PurchaseReturnData[] = [
    {
      key: "1",
      date: "2025-01-20",
      referenceNo: "PR-2025-001",
      parentPurchase: "PUR-2025-001",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "ABC Trading Co.",
      paymentStatus: "paid",
      grandTotal: 25000.00,
      paymentDue: 0.00,
    },
    {
      key: "2",
      date: "2025-01-25",
      referenceNo: "PR-2025-002",
      parentPurchase: "PUR-2025-002",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "XYZ Suppliers Ltd",
      paymentStatus: "partial",
      grandTotal: 15000.00,
      paymentDue: 5000.00,
    },
    {
      key: "3",
      date: "2025-02-01",
      referenceNo: "PR-2025-003",
      parentPurchase: "PUR-2025-003",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "Global Imports Inc",
      paymentStatus: "due",
      grandTotal: 30000.00,
      paymentDue: 30000.00,
    },
    {
      key: "4",
      date: "2025-02-05",
      referenceNo: "PR-2025-004",
      parentPurchase: "PUR-2025-004",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "ABC Trading Co.",
      paymentStatus: "paid",
      grandTotal: 18000.00,
      paymentDue: 0.00,
    },
    {
      key: "5",
      date: "2025-02-10",
      referenceNo: "PR-2025-005",
      parentPurchase: "PUR-2025-005",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "XYZ Suppliers Ltd",
      paymentStatus: "partial",
      grandTotal: 22000.00,
      paymentDue: 10000.00,
    },
    {
      key: "6",
      date: "2025-02-15",
      referenceNo: "PR-2025-006",
      parentPurchase: "PUR-2025-006",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "Global Imports Inc",
      paymentStatus: "paid",
      grandTotal: 12000.00,
      paymentDue: 0.00,
    },
  ];

  const [returns, setReturns] = useState<PurchaseReturnData[]>(defaultReturns);

  // Filter returns based on search text and filters
  const filteredReturns = useMemo(() => {
    let filtered = returns;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (returnItem) =>
          returnItem.referenceNo.toLowerCase().includes(searchLower) ||
          returnItem.parentPurchase.toLowerCase().includes(searchLower) ||
          returnItem.supplier.toLowerCase().includes(searchLower) ||
          returnItem.location.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    if (filters.businessLocation && filters.businessLocation !== "all") {
      filtered = filtered.filter((r) => r.location === filters.businessLocation);
    }

    return filtered;
  }, [returns, searchText, filters]);

  // Calculate summary totals
  const summaryTotals = useMemo(() => {
    const totalGrandTotal = filteredReturns.reduce((sum, r) => sum + r.grandTotal, 0);
    const totalPaymentDue = filteredReturns.reduce((sum, r) => sum + r.paymentDue, 0);

    return {
      grandTotal: totalGrandTotal,
      paymentDue: totalPaymentDue,
    };
  }, [filteredReturns]);

  const handleAddReturn = () => {
    setAddModalOpen(true);
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh returns
    setTimeout(() => {
      setLoading(false);
      message.success("Purchase returns refreshed successfully");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Reference No",
      "Parent Purchase",
      "Location",
      "Supplier",
      "Payment Status",
      "Grand Total",
      "Payment due",
    ];
    const csvData = filteredReturns.map((returnItem) => [
      returnItem.date,
      returnItem.referenceNo,
      returnItem.parentPurchase,
      returnItem.location,
      returnItem.supplier,
      returnItem.paymentStatus,
      returnItem.grandTotal.toFixed(2),
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
    link.setAttribute("download", `purchase_returns_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Purchase returns exported to CSV successfully");
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
          <title>Purchase Returns Report</title>
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
          <h1>Purchase Returns Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference No</th>
                <th>Parent Purchase</th>
                <th>Location</th>
                <th>Supplier</th>
                <th>Grand Total</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredReturns
                .map(
                  (returnItem) => `
                <tr>
                  <td>${returnItem.date}</td>
                  <td>${returnItem.referenceNo}</td>
                  <td>${returnItem.parentPurchase}</td>
                  <td>${returnItem.location}</td>
                  <td>${returnItem.supplier}</td>
                  <td>TSh ${returnItem.grandTotal.toFixed(2)}</td>
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

  const columns: ColumnsType<PurchaseReturnData> = [
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
      title: "Parent Purchase",
      dataIndex: "parentPurchase",
      key: "parentPurchase",
      width: 150,
      sorter: (a, b) => a.parentPurchase.localeCompare(b.parentPurchase),
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
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 200,
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      width: 200,
      sorter: (a, b) => a.supplier.localeCompare(b.supplier),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 150,
      sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
      render: (text: string) => {
        const statusColors: Record<string, string> = {
          paid: "#52c41a",
          partial: "#faad14",
          due: "#ff4d4f",
        };
        return (
          <Text
            style={{
              fontSize: "13px",
              color: statusColors[text.toLowerCase()] || isDark ? "rgba(255,255,255,0.85)" : "#595959",
            }}
          >
            {text}
          </Text>
        );
      },
    },
    {
      title: "Grand Total",
      dataIndex: "grandTotal",
      key: "grandTotal",
      width: 150,
      align: "right",
      sorter: (a, b) => a.grandTotal - b.grandTotal,
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
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedReturn(record);
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
              setSelectedReturn(record);
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
              setSelectedReturn(record);
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
    if (!col.key) return true;
    return columnVisibility[col.key as string] !== false;
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
            Purchase Return
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
              onClick={handleAddReturn}
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

      {/* All Purchase Returns Section */}
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
              All Purchase Returns
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
          .purchase-return-table .ant-table-thead > tr > th {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .purchase-return-table .ant-table-thead > tr > th:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .purchase-return-table .ant-table-tbody > tr {
            transition: all 0.2s ease;
          }
          .purchase-return-table .ant-table-tbody > tr:hover > td {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
          }
          .purchase-return-table .ant-table-tbody > tr:hover {
            transform: translateY(-1px);
            box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
          }
          .purchase-return-table .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.45)"} !important;
          }
          .purchase-return-table .ant-table-column-sorted .ant-table-column-sorter-up,
          .purchase-return-table .ant-table-column-sorted .ant-table-column-sorter-down,
          .purchase-return-table .ant-table-column-sorter-up.on,
          .purchase-return-table .ant-table-column-sorter-down.on,
          .purchase-return-table .ant-table-column-sorter-up.active,
          .purchase-return-table .ant-table-column-sorter-down.active {
            color: ${isDark ? "#fff" : "#1890ff"} !important;
            opacity: 1 !important;
          }
        `}</style>
        <Table
          className="purchase-return-table"
          columns={visibleColumns}
          dataSource={filteredReturns}
          loading={loading}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            style: {
              marginTop: "16px",
            },
          }}
          locale={{
            emptyText: "No data available in table",
          }}
          scroll={{ x: "max-content" }}
          style={{
            background: isDark ? "transparent" : "#fafafa",
          }}
          summary={(pageData) => {
            if (pageData.length === 0) return null;
            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={5}>
                    <Text
                      strong
                      style={{
                        fontSize: "14px",
                        color: isDark ? "#fff" : "#1f1f1f",
                      }}
                    >
                      Total:
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5} align="right">
                    <Text
                      strong
                      style={{
                        fontSize: "13px",
                        color: isDark ? "#fff" : "#1f1f1f",
                      }}
                    >
                      TSh {summaryTotals.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                      TSh {summaryTotals.paymentDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7} colSpan={1} />
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </Card>

      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedReturn(null);
        }}
        title="Purchase Return Details"
        data={selectedReturn}
        fields={[
          { key: "date", label: "Date" },
          { key: "referenceNo", label: "Reference No" },
          { key: "parentPurchase", label: "Parent Purchase" },
          { key: "location", label: "Location" },
          { key: "supplier", label: "Supplier" },
          { key: "paymentStatus", label: "Payment Status" },
          { key: "grandTotal", label: "Grand Total" },
          { key: "paymentDue", label: "Payment Due" },
        ]}
        width={600}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedReturn(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update purchase return
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Purchase return updated successfully");
            setEditModalOpen(false);
            setSelectedReturn(null);
          } catch (_error) {
            message.error("Failed to update purchase return");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit Purchase Return"
        data={selectedReturn}
        fields={[
          { name: "referenceNo", label: "Reference No", type: "text", required: true },
          { name: "parentPurchase", label: "Parent Purchase", type: "text", required: true },
          { name: "grandTotal", label: "Grand Total", type: "number", required: true },
        ]}
        loading={actionLoading}
        width={600}
      />

      {/* Add Purchase Return Modal */}
      <AddPurchaseReturnModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={() => {
          // Refresh the list after saving
          handleRefresh();
        }}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedReturn(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete purchase return
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Purchase return deleted successfully");
            setReturns(returns.filter((r) => r.key !== selectedReturn?.key));
            setDeleteModalOpen(false);
            setSelectedReturn(null);
          } catch (_error) {
            message.error("Failed to delete purchase return");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete Purchase Return"
        itemName={selectedReturn?.referenceNo}
        loading={actionLoading}
      />
    </div>
  );
};

export default PurchaseReturn;

