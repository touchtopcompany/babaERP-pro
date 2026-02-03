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
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Search } = Input;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

export interface PurchaseData {
  key: string;
  date: string;
  referenceNo: string;
  location: string;
  supplier: string;
  purchaseStatus: string;
  paymentStatus: string;
  grandTotal: number;
  paymentDue: number;
  addedBy: string;
  receivedBy: string;
}

const ListPurchases: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  
  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    businessLocation: {
      label: "Business Location:",
      value: "C2Z Digital Solutions (C2Z1)",
      options: [
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
      ],
    },
    supplier: {
      label: "Supplier:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Supplier 1", value: "Supplier 1" },
        { label: "Supplier 2", value: "Supplier 2" },
      ],
    },
    purchaseStatus: {
      label: "Purchase Status:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Received", value: "received" },
        { label: "Pending", value: "pending" },
        { label: "Ordered", value: "ordered" },
        { label: "Return", value: "return" },
      ],
    },
    paymentStatus: {
      label: "Payment Status:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Paid", value: "paid" },
        { label: "Partial", value: "partial" },
        { label: "Due", value: "due" },
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
    supplier: filterConfig.supplier?.value || "all",
    purchaseStatus: filterConfig.purchaseStatus?.value || "all",
    paymentStatus: filterConfig.paymentStatus?.value || "all",
    dateRange: filterConfig.dateRange?.value || [dayjs(), dayjs()],
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    action: true,
    date: true,
    referenceNo: true,
    location: true,
    supplier: true,
    purchaseStatus: true,
    paymentStatus: true,
    grandTotal: true,
    paymentDue: true,
    addedBy: true,
    receivedBy: true,
  });

  // Mock data - replace with API call
  const defaultPurchases: PurchaseData[] = [
    {
      key: "1",
      date: "2025-01-15",
      referenceNo: "PUR-2025-001",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "ABC Trading Co.",
      purchaseStatus: "received",
      paymentStatus: "paid",
      grandTotal: 50000.00,
      paymentDue: 0.00,
      addedBy: "John Doe",
      receivedBy: "Jane Smith",
    },
    {
      key: "2",
      date: "2025-01-18",
      referenceNo: "PUR-2025-002",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "XYZ Suppliers Ltd",
      purchaseStatus: "received",
      paymentStatus: "partial",
      grandTotal: 75000.00,
      paymentDue: 25000.00,
      addedBy: "John Doe",
      receivedBy: "Bob Johnson",
    },
    {
      key: "3",
      date: "2025-01-20",
      referenceNo: "PUR-2025-003",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "Global Imports Inc",
      purchaseStatus: "pending",
      paymentStatus: "due",
      grandTotal: 120000.00,
      paymentDue: 120000.00,
      addedBy: "Jane Smith",
      receivedBy: "-",
    },
    {
      key: "4",
      date: "2025-01-22",
      referenceNo: "PUR-2025-004",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "ABC Trading Co.",
      purchaseStatus: "ordered",
      paymentStatus: "due",
      grandTotal: 35000.00,
      paymentDue: 35000.00,
      addedBy: "Bob Johnson",
      receivedBy: "-",
    },
    {
      key: "5",
      date: "2025-01-25",
      referenceNo: "PUR-2025-005",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "XYZ Suppliers Ltd",
      purchaseStatus: "received",
      paymentStatus: "paid",
      grandTotal: 45000.00,
      paymentDue: 0.00,
      addedBy: "John Doe",
      receivedBy: "Jane Smith",
    },
    {
      key: "6",
      date: "2025-01-28",
      referenceNo: "PUR-2025-006",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "Global Imports Inc",
      purchaseStatus: "return",
      paymentStatus: "partial",
      grandTotal: 60000.00,
      paymentDue: 15000.00,
      addedBy: "Jane Smith",
      receivedBy: "Bob Johnson",
    },
    {
      key: "7",
      date: "2025-02-01",
      referenceNo: "PUR-2025-007",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "ABC Trading Co.",
      purchaseStatus: "received",
      paymentStatus: "paid",
      grandTotal: 28000.00,
      paymentDue: 0.00,
      addedBy: "Bob Johnson",
      receivedBy: "John Doe",
    },
    {
      key: "8",
      date: "2025-02-05",
      referenceNo: "PUR-2025-008",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "XYZ Suppliers Ltd",
      purchaseStatus: "pending",
      paymentStatus: "due",
      grandTotal: 95000.00,
      paymentDue: 95000.00,
      addedBy: "John Doe",
      receivedBy: "-",
    },
    {
      key: "9",
      date: "2025-02-08",
      referenceNo: "PUR-2025-009",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "Global Imports Inc",
      purchaseStatus: "received",
      paymentStatus: "partial",
      grandTotal: 67000.00,
      paymentDue: 20000.00,
      addedBy: "Jane Smith",
      receivedBy: "Bob Johnson",
    },
    {
      key: "10",
      date: "2025-02-12",
      referenceNo: "PUR-2025-010",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "ABC Trading Co.",
      purchaseStatus: "ordered",
      paymentStatus: "due",
      grandTotal: 42000.00,
      paymentDue: 42000.00,
      addedBy: "Bob Johnson",
      receivedBy: "-",
    },
    {
      key: "11",
      date: "2025-02-15",
      referenceNo: "PUR-2025-011",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "XYZ Suppliers Ltd",
      purchaseStatus: "received",
      paymentStatus: "paid",
      grandTotal: 55000.00,
      paymentDue: 0.00,
      addedBy: "John Doe",
      receivedBy: "Jane Smith",
    },
    {
      key: "12",
      date: "2025-02-18",
      referenceNo: "PUR-2025-012",
      location: "C2Z Digital Solutions (C2Z1)",
      supplier: "Global Imports Inc",
      purchaseStatus: "received",
      paymentStatus: "paid",
      grandTotal: 38000.00,
      paymentDue: 0.00,
      addedBy: "Jane Smith",
      receivedBy: "Bob Johnson",
    },
  ];

  const [purchases, setPurchases] = useState<PurchaseData[]>(defaultPurchases);

  // Filter purchases based on search text and filters
  const filteredPurchases = useMemo(() => {
    let filtered = purchases;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (purchase) =>
          purchase.referenceNo.toLowerCase().includes(searchLower) ||
          purchase.supplier.toLowerCase().includes(searchLower) ||
          purchase.location.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    if (filters.businessLocation && filters.businessLocation !== "all") {
      filtered = filtered.filter((p) => p.location === filters.businessLocation);
    }
    if (filters.supplier !== "all") {
      filtered = filtered.filter((p) => p.supplier === filters.supplier);
    }
    if (filters.purchaseStatus !== "all") {
      filtered = filtered.filter((p) => p.purchaseStatus === filters.purchaseStatus);
    }
    if (filters.paymentStatus !== "all") {
      filtered = filtered.filter((p) => p.paymentStatus === filters.paymentStatus);
    }

    return filtered;
  }, [purchases, searchText, filters]);

  // Calculate summary totals
  const summaryTotals = useMemo(() => {
    const totalPaymentDue = filteredPurchases.reduce((sum, p) => sum + p.paymentDue, 0);
    const totalPurchaseDue = filteredPurchases.reduce((sum, p) => {
      if (p.paymentStatus === "partial" || p.paymentStatus === "due") {
        return sum + p.paymentDue;
      }
      return sum;
    }, 0);
    const totalPurchaseReturn = filteredPurchases.reduce((sum, p) => {
      if (p.purchaseStatus === "return") {
        return sum + p.paymentDue;
      }
      return sum;
    }, 0);

    return {
      paymentDue: totalPaymentDue,
      purchaseDue: totalPurchaseDue,
      purchaseReturn: totalPurchaseReturn,
    };
  }, [filteredPurchases]);

  const handleAddPurchase = () => {
    navigate("/purchases/add-purchase");
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh purchases
    setTimeout(() => {
      setLoading(false);
      message.success("Purchases refreshed successfully");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Reference No",
      "Location",
      "Supplier",
      "Purchase Status",
      "Payment Status",
      "Grand Total",
      "Payment due",
      "Added By",
      "Received By",
    ];
    const csvData = filteredPurchases.map((purchase) => [
      purchase.date,
      purchase.referenceNo,
      purchase.location,
      purchase.supplier,
      purchase.purchaseStatus,
      purchase.paymentStatus,
      purchase.grandTotal.toFixed(2),
      purchase.paymentDue.toFixed(2),
      purchase.addedBy,
      purchase.receivedBy,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `purchases_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Purchases exported to CSV successfully");
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
          <title>Purchases Report</title>
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
          <h1>Purchases Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference No</th>
                <th>Location</th>
                <th>Supplier</th>
                <th>Grand Total</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredPurchases
                .map(
                  (purchase) => `
                <tr>
                  <td>${purchase.date}</td>
                  <td>${purchase.referenceNo}</td>
                  <td>${purchase.location}</td>
                  <td>${purchase.supplier}</td>
                  <td>TSh ${purchase.grandTotal.toFixed(2)}</td>
                  <td>${purchase.paymentStatus}</td>
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

  const columns: ColumnsType<PurchaseData> = [
    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: "left",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedPurchase(record);
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
              setSelectedPurchase(record);
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
              setSelectedPurchase(record);
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
      title: "Purchase Status",
      dataIndex: "purchaseStatus",
      key: "purchaseStatus",
      width: 150,
      sorter: (a, b) => a.purchaseStatus.localeCompare(b.purchaseStatus),
      render: (text: string) => {
        const statusColors: Record<string, string> = {
          received: "#52c41a",
          pending: "#faad14",
          ordered: "#1890ff",
          return: "#ff4d4f",
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
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
      width: 150,
      sorter: (a, b) => a.addedBy.localeCompare(b.addedBy),
    },
    {
      title: "Received By",
      dataIndex: "receivedBy",
      key: "receivedBy",
      width: 150,
      sorter: (a, b) => a.receivedBy.localeCompare(b.receivedBy),
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
            Purchases
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
              onClick={handleAddPurchase}
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

      {/* All Purchases Section */}
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
              All Purchases
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
          .purchases-table .ant-table-thead > tr > th {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .purchases-table .ant-table-thead > tr > th:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .purchases-table .ant-table-tbody > tr {
            transition: all 0.2s ease;
          }
          .purchases-table .ant-table-tbody > tr:hover > td {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
          }
          .purchases-table .ant-table-tbody > tr:hover {
            transform: translateY(-1px);
            box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
          }
          .purchases-table .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.45)"} !important;
          }
          .purchases-table .ant-table-column-sorted .ant-table-column-sorter-up,
          .purchases-table .ant-table-column-sorted .ant-table-column-sorter-down,
          .purchases-table .ant-table-column-sorter-up.on,
          .purchases-table .ant-table-column-sorter-down.on,
          .purchases-table .ant-table-column-sorter-up.active,
          .purchases-table .ant-table-column-sorter-down.active {
            color: ${isDark ? "#fff" : "#1890ff"} !important;
            opacity: 1 !important;
          }
        `}</style>
        <Table
          className="purchases-table"
          columns={visibleColumns}
          dataSource={filteredPurchases}
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
                  <Table.Summary.Cell index={0} colSpan={7}>
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
                  <Table.Summary.Cell index={7} align="right">
                    <Text
                      style={{
                        fontSize: "13px",
                        color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                      }}
                    >
                      TSh {summaryTotals.paymentDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8} colSpan={3} align="right">
                    <Space>
                      <Text
                        style={{
                          fontSize: "13px",
                          color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                        }}
                      >
                        Purchase Due - TSh {summaryTotals.purchaseDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Text>
                      <Text
                        style={{
                          fontSize: "13px",
                          color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                        }}
                      >
                        Purchase Return - TSh {summaryTotals.purchaseReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Text>
                    </Space>
                  </Table.Summary.Cell>
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
          setSelectedPurchase(null);
        }}
        title="Purchase Details"
        data={selectedPurchase}
        fields={[
          { key: "date", label: "Date" },
          { key: "referenceNo", label: "Reference No" },
          { key: "location", label: "Location" },
          { key: "supplier", label: "Supplier" },
          { key: "purchaseStatus", label: "Purchase Status" },
          { key: "paymentStatus", label: "Payment Status" },
          { key: "grandTotal", label: "Grand Total" },
          { key: "paymentDue", label: "Payment Due" },
          { key: "addedBy", label: "Added By" },
          { key: "receivedBy", label: "Received By" },
        ]}
        width={600}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedPurchase(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update purchase
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Purchase updated successfully");
            setEditModalOpen(false);
            setSelectedPurchase(null);
          } catch (_error) {
            message.error("Failed to update purchase");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit Purchase"
        data={selectedPurchase}
        fields={[
          { name: "referenceNo", label: "Reference No", type: "text", required: true },
          { name: "supplier", label: "Supplier", type: "text", required: true },
          { name: "grandTotal", label: "Grand Total", type: "number", required: true },
        ]}
        loading={actionLoading}
        width={600}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedPurchase(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete purchase
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Purchase deleted successfully");
            setPurchases(purchases.filter((p) => p.key !== selectedPurchase?.key));
            setDeleteModalOpen(false);
            setSelectedPurchase(null);
          } catch (_error) {
            message.error("Failed to delete purchase");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete Purchase"
        itemName={selectedPurchase?.referenceNo}
        loading={actionLoading}
      />
    </div>
  );
};

export default ListPurchases;

