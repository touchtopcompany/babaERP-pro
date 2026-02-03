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
  Checkbox,
  TimePicker,
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
  FilterOutlined,
  BarChartOutlined,
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

export interface SaleData {
  key: string;
  date: string;
  invoiceNo: string;
  customerName: string;
  contactNumber: string;
  location: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: number;
  totalPaid: number;
  sellDue: number;
  sellReturnDue: number;
  shippingStatus: string;
  totalItems: number;
  addedBy: string;
  sellNote: string;
  staffNote: string;
  shippingDetails: string;
}

const AllSales: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<SaleData | null>(null);
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
    user: {
      label: "User:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Jane Smith", value: "Jane Smith" },
        { label: "Bob Johnson", value: "Bob Johnson" },
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
      value: [dayjs("2025-12-25"), dayjs("2025-12-26")],
    },
    timeRange: {
      label: "Time range:",
      value: [dayjs("00:00", "HH:mm"), dayjs("23:59", "HH:mm")],
    },
    shippingStatus: {
      label: "Shipping Status:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "Shipped", value: "shipped" },
        { label: "Delivered", value: "delivered" },
      ],
    },
    subscriptions: {
      label: "Subscriptions",
      value: false,
    },
  });

  // Convert FilterConfig to filters object for filtering logic
  const filters = {
    businessLocation: filterConfig.businessLocation?.value || "all",
    user: filterConfig.user?.value || "all",
    customer: filterConfig.customer?.value || "all",
    paymentStatus: filterConfig.paymentStatus?.value || "all",
    dateRange: filterConfig.dateRange?.value || [dayjs(), dayjs()],
    timeRange: filterConfig.timeRange?.value || [dayjs("00:00", "HH:mm"), dayjs("23:59", "HH:mm")],
    shippingStatus: filterConfig.shippingStatus?.value || "all",
    subscriptions: filterConfig.subscriptions?.value || false,
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    action: true,
    date: true,
    invoiceNo: true,
    customerName: true,
    contactNumber: true,
    location: true,
    paymentStatus: true,
    paymentMethod: true,
    totalAmount: true,
    totalPaid: true,
    sellDue: true,
    sellReturnDue: true,
    shippingStatus: true,
    totalItems: true,
    addedBy: true,
    sellNote: true,
    staffNote: true,
    shippingDetails: true,
  });

  // Mock data - replace with API call
  const defaultSales: SaleData[] = [
    {
      key: "1",
      date: "2025-12-25",
      invoiceNo: "INV-2025-001",
      customerName: "John Doe",
      contactNumber: "+255 712 345 678",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 150000.00,
      totalPaid: 150000.00,
      sellDue: 0.00,
      sellReturnDue: 0.00,
      shippingStatus: "delivered",
      totalItems: 5,
      addedBy: "Jane Smith",
      sellNote: "Customer requested express delivery",
      staffNote: "Payment received in full",
      shippingDetails: "123 Main St, Dar es Salaam",
    },
    {
      key: "2",
      date: "2025-12-25",
      invoiceNo: "INV-2025-002",
      customerName: "Mary Johnson",
      contactNumber: "+255 713 456 789",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "partial",
      paymentMethod: "Bank Transfer",
      totalAmount: 250000.00,
      totalPaid: 150000.00,
      sellDue: 100000.00,
      sellReturnDue: 0.00,
      shippingStatus: "pending",
      totalItems: 8,
      addedBy: "Bob Johnson",
      sellNote: "Partial payment received",
      staffNote: "Balance due in 30 days",
      shippingDetails: "456 Market Ave, Arusha",
    },
    {
      key: "3",
      date: "2025-12-26",
      invoiceNo: "INV-2025-003",
      customerName: "Peter Wilson",
      contactNumber: "+255 714 567 890",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "due",
      paymentMethod: "Credit",
      totalAmount: 180000.00,
      totalPaid: 0.00,
      sellDue: 180000.00,
      sellReturnDue: 0.00,
      shippingStatus: "shipped",
      totalItems: 3,
      addedBy: "Jane Smith",
      sellNote: "Credit terms: 60 days",
      staffNote: "Follow up required",
      shippingDetails: "789 Business Rd, Mwanza",
    },
    {
      key: "4",
      date: "2025-12-26",
      invoiceNo: "INV-2025-004",
      customerName: "Sarah Brown",
      contactNumber: "+255 715 678 901",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      paymentMethod: "Mobile Money",
      totalAmount: 95000.00,
      totalPaid: 95000.00,
      sellDue: 0.00,
      sellReturnDue: 5000.00,
      shippingStatus: "delivered",
      totalItems: 2,
      addedBy: "Bob Johnson",
      sellNote: "Customer satisfied with purchase",
      staffNote: "Return processed",
      shippingDetails: "321 Commerce St, Dodoma",
    },
    {
      key: "5",
      date: "2025-12-26",
      invoiceNo: "INV-2025-005",
      customerName: "David Lee",
      contactNumber: "+255 716 789 012",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 320000.00,
      totalPaid: 320000.00,
      sellDue: 0.00,
      sellReturnDue: 0.00,
      shippingStatus: "delivered",
      totalItems: 12,
      addedBy: "Jane Smith",
      sellNote: "Bulk order discount applied",
      staffNote: "All items in stock",
      shippingDetails: "654 Trade Blvd, Zanzibar",
    },
  ];

  const [sales, setSales] = useState<SaleData[]>(defaultSales);

  // Filter sales based on search text and filters
  const filteredSales = useMemo(() => {
    let filtered = sales;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (sale) =>
          sale.invoiceNo.toLowerCase().includes(searchLower) ||
          sale.customerName.toLowerCase().includes(searchLower) ||
          sale.location.toLowerCase().includes(searchLower) ||
          sale.contactNumber.includes(searchLower)
      );
    }

    // Apply filters
    if (filters.businessLocation && filters.businessLocation !== "all") {
      filtered = filtered.filter((s) => s.location === filters.businessLocation);
    }
    if (filters.user !== "all") {
      filtered = filtered.filter((s) => s.addedBy === filters.user);
    }
    if (filters.customer !== "all") {
      filtered = filtered.filter((s) => s.customerName === filters.customer);
    }
    if (filters.paymentStatus !== "all") {
      filtered = filtered.filter((s) => s.paymentStatus === filters.paymentStatus);
    }
    if (filters.shippingStatus !== "all") {
      filtered = filtered.filter((s) => s.shippingStatus === filters.shippingStatus);
    }

    return filtered;
  }, [sales, searchText, filters]);

  // Calculate summary totals
  const summaryTotals = useMemo(() => {
    const totalPaid = filteredSales.reduce((sum, s) => sum + s.totalPaid, 0);
    const totalSellDue = filteredSales.reduce((sum, s) => sum + s.sellDue, 0);
    const totalSellReturnDue = filteredSales.reduce((sum, s) => sum + s.sellReturnDue, 0);
    const totalItems = filteredSales.reduce((sum, s) => sum + s.totalItems, 0);

    return {
      totalPaid,
      sellDue: totalSellDue,
      sellReturnDue: totalSellReturnDue,
      totalItems,
    };
  }, [filteredSales]);

  const handleAddSale = () => {
    navigate("/sell/add-sale");
  };

  const handleSellsReport = () => {
    message.info("Sells Report functionality coming soon");
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh sales
    setTimeout(() => {
      setLoading(false);
      message.success("Sales refreshed successfully");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Invoice No.",
      "Customer Name",
      "Contact Number",
      "Location",
      "Payment Status",
      "Payment Method",
      "Total Amount",
      "Total Paid",
      "Sell Due",
      "Sell Return Due",
      "Shipping Status",
      "Total Items",
      "Added By",
      "Sell Note",
      "Staff Note",
      "Shipping Details",
    ];
    const csvData = filteredSales.map((sale) => [
      sale.date,
      sale.invoiceNo,
      sale.customerName,
      sale.contactNumber,
      sale.location,
      sale.paymentStatus,
      sale.paymentMethod,
      sale.totalAmount.toFixed(2),
      sale.totalPaid.toFixed(2),
      sale.sellDue.toFixed(2),
      sale.sellReturnDue.toFixed(2),
      sale.shippingStatus,
      sale.totalItems,
      sale.addedBy,
      sale.sellNote,
      sale.staffNote,
      sale.shippingDetails,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `sales_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Sales exported to CSV successfully");
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
          <title>Sales Report</title>
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
          <h1>Sales Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Invoice No</th>
                <th>Customer Name</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredSales
                .map(
                  (sale) => `
                <tr>
                  <td>${sale.date}</td>
                  <td>${sale.invoiceNo}</td>
                  <td>${sale.customerName}</td>
                  <td>TSh ${sale.totalAmount.toFixed(2)}</td>
                  <td>${sale.paymentStatus}</td>
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

  const columns: ColumnsType<SaleData> = [
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
              setSelectedSale(record);
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
              setSelectedSale(record);
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
              setSelectedSale(record);
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
      title: "Customer name",
      dataIndex: "customerName",
      key: "customerName",
      width: 180,
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: 150,
      sorter: (a, b) => a.contactNumber.localeCompare(b.contactNumber),
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
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 150,
      sorter: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod),
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
      title: "Total paid",
      dataIndex: "totalPaid",
      key: "totalPaid",
      width: 150,
      align: "right",
      sorter: (a, b) => a.totalPaid - b.totalPaid,
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
      title: "Sell Due",
      dataIndex: "sellDue",
      key: "sellDue",
      width: 150,
      align: "right",
      sorter: (a, b) => a.sellDue - b.sellDue,
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
      title: "Sell Return Due",
      dataIndex: "sellReturnDue",
      key: "sellReturnDue",
      width: 150,
      align: "right",
      sorter: (a, b) => a.sellReturnDue - b.sellReturnDue,
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
      title: "Shipping Status",
      dataIndex: "shippingStatus",
      key: "shippingStatus",
      width: 150,
      sorter: (a, b) => a.shippingStatus.localeCompare(b.shippingStatus),
      render: (text: string) => {
        const statusColors: Record<string, string> = {
          delivered: "#52c41a",
          shipped: "#1890ff",
          pending: "#faad14",
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
      title: "Total Items",
      dataIndex: "totalItems",
      key: "totalItems",
      width: 120,
      align: "right",
      sorter: (a, b) => a.totalItems - b.totalItems,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {value}
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
      title: "Sell note",
      dataIndex: "sellNote",
      key: "sellNote",
      width: 200,
      render: (text: string) => (
        <Tooltip title={text}>
          <Text
            ellipsis
            style={{
              fontSize: "13px",
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            }}
          >
            {text}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Staff note",
      dataIndex: "staffNote",
      key: "staffNote",
      width: 200,
      render: (text: string) => (
        <Tooltip title={text}>
          <Text
            ellipsis
            style={{
              fontSize: "13px",
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            }}
          >
            {text}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Shipping Details",
      dataIndex: "shippingDetails",
      key: "shippingDetails",
      width: 250,
      render: (text: string) => (
        <Tooltip title={text}>
          <Text
            ellipsis
            style={{
              fontSize: "13px",
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            }}
          >
            {text}
          </Text>
        </Tooltip>
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
            Sales
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
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddSale}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Add
            </Button>
            <Button
              type="primary"
              icon={<BarChartOutlined />}
              onClick={handleSellsReport}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
                background: "#52c41a",
                borderColor: "#52c41a",
              }}
            >
              Sells Report
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

      {/* All Sales Section */}
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
              All sales
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
          .sales-table .ant-table-thead > tr > th {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .sales-table .ant-table-thead > tr > th:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .sales-table .ant-table-tbody > tr {
            transition: all 0.2s ease;
          }
          .sales-table .ant-table-tbody > tr:hover > td {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
          }
          .sales-table .ant-table-tbody > tr:hover {
            transform: translateY(-1px);
            box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
          }
          .sales-table .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.45)"} !important;
          }
          .sales-table .ant-table-column-sorted .ant-table-column-sorter-up,
          .sales-table .ant-table-column-sorted .ant-table-column-sorter-down,
          .sales-table .ant-table-column-sorter-up.on,
          .sales-table .ant-table-column-sorter-down.on,
          .sales-table .ant-table-column-sorter-up.active,
          .sales-table .ant-table-column-sorter-down.active {
            color: ${isDark ? "#fff" : "#1890ff"} !important;
            opacity: 1 !important;
          }
        `}</style>
        <Table
          className="sales-table"
          columns={visibleColumns}
          dataSource={filteredSales}
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
                  <Table.Summary.Cell index={0} colSpan={9}>
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
                  <Table.Summary.Cell index={9} align="right">
                    <Text
                      style={{
                        fontSize: "13px",
                        color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                      }}
                    >
                      TSh {summaryTotals.totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={10} align="right">
                    <Text
                      style={{
                        fontSize: "13px",
                        color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                      }}
                    >
                      TSh {summaryTotals.sellDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={11} align="right">
                    <Text
                      style={{
                        fontSize: "13px",
                        color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                      }}
                    >
                      TSh {summaryTotals.sellReturnDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={12} colSpan={1} />
                  <Table.Summary.Cell index={13} align="right">
                    <Text
                      style={{
                        fontSize: "13px",
                        color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                      }}
                    >
                      {summaryTotals.totalItems}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={14} colSpan={4} />
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
          setSelectedSale(null);
        }}
        title="Sale Details"
        data={selectedSale}
        fields={[
          { key: "date", label: "Date" },
          { key: "invoiceNo", label: "Invoice No." },
          { key: "customerName", label: "Customer Name" },
          { key: "contactNumber", label: "Contact Number" },
          { key: "location", label: "Location" },
          { key: "paymentStatus", label: "Payment Status" },
          { key: "paymentMethod", label: "Payment Method" },
          { key: "totalAmount", label: "Total Amount" },
          { key: "totalPaid", label: "Total Paid" },
          { key: "sellDue", label: "Sell Due" },
          { key: "sellReturnDue", label: "Sell Return Due" },
          { key: "shippingStatus", label: "Shipping Status" },
          { key: "totalItems", label: "Total Items" },
          { key: "addedBy", label: "Added By" },
          { key: "sellNote", label: "Sell Note" },
          { key: "staffNote", label: "Staff Note" },
          { key: "shippingDetails", label: "Shipping Details" },
        ]}
        width={600}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedSale(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update sale
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Sale updated successfully");
            setEditModalOpen(false);
            setSelectedSale(null);
          } catch (_error) {
            message.error("Failed to update sale");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit Sale"
        data={selectedSale}
        fields={[
          { name: "invoiceNo", label: "Invoice No.", type: "text", required: true },
          { name: "customerName", label: "Customer Name", type: "text", required: true },
          { name: "totalAmount", label: "Total Amount", type: "number", required: true },
        ]}
        loading={actionLoading}
        width={600}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedSale(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete sale
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Sale deleted successfully");
            setSales(sales.filter((s) => s.key !== selectedSale?.key));
            setDeleteModalOpen(false);
            setSelectedSale(null);
          } catch (_error) {
            message.error("Failed to delete sale");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete Sale"
        itemName={selectedSale?.invoiceNo}
        loading={actionLoading}
      />
    </div>
  );
};

export default AllSales;

