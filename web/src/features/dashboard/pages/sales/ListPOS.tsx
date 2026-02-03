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
  Tag,
} from "antd";
import type { MenuProps } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  DownOutlined,
  InfoCircleOutlined,
  FilterOutlined,
  MoreOutlined,
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

export interface POSData {
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

const ListPOS: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPOS, setSelectedPOS] = useState<POSData | null>(null);
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
        { label: "Mr C2Z Electronics", value: "Mr C2Z Electronics" },
      ],
    },
    customer: {
      label: "Customer:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Customers", value: "Customers" },
        { label: "Kamgisha customer", value: "Kamgisha customer" },
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
  const defaultPOS: POSData[] = [
    {
      key: "1",
      date: "12/17/2025 23:55",
      invoiceNo: "0008",
      customerName: "Customers",
      contactNumber: "0765917527",
      location: "C2Z Digital Solutions",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 150000.00,
      totalPaid: 150000.00,
      sellDue: 0.00,
      sellReturnDue: 0.00,
      shippingStatus: "",
      totalItems: 1.00,
      addedBy: "Mr C2Z Electronics",
      sellNote: "",
      staffNote: "",
      shippingDetails: "",
    },
    {
      key: "2",
      date: "12/17/2025 23:55",
      invoiceNo: "0007",
      customerName: "Kamgisha customer",
      contactNumber: "0765917527",
      location: "C2Z Digital Solutions",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 150000.00,
      totalPaid: 150000.00,
      sellDue: 0.00,
      sellReturnDue: 0.00,
      shippingStatus: "",
      totalItems: 6.00,
      addedBy: "Mr C2Z Electronics",
      sellNote: "",
      staffNote: "",
      shippingDetails: "",
    },
    {
      key: "3",
      date: "12/17/2025 23:55",
      invoiceNo: "0003",
      customerName: "Kamgisha customer",
      contactNumber: "0765917527",
      location: "C2Z Digital Solutions",
      paymentStatus: "due",
      paymentMethod: "Cash",
      totalAmount: 180000.00,
      totalPaid: 0.00,
      sellDue: 180000.00,
      sellReturnDue: 0.00,
      shippingStatus: "",
      totalItems: 1.00,
      addedBy: "Mr C2Z Electronics",
      sellNote: "",
      staffNote: "",
      shippingDetails: "",
    },
    {
      key: "4",
      date: "12/17/2025 23:55",
      invoiceNo: "0006",
      customerName: "Kamgisha customer",
      contactNumber: "0765917527",
      location: "C2Z Digital Solutions",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 150000.00,
      totalPaid: 150000.00,
      sellDue: 0.00,
      sellReturnDue: 0.00,
      shippingStatus: "",
      totalItems: 1.00,
      addedBy: "Mr C2Z Electronics",
      sellNote: "",
      staffNote: "",
      shippingDetails: "",
    },
    {
      key: "5",
      date: "12/17/2025 23:55",
      invoiceNo: "0005",
      customerName: "Kamgisha customer",
      contactNumber: "0765917527",
      location: "C2Z Digital Solutions",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 150000.00,
      totalPaid: 150000.00,
      sellDue: 0.00,
      sellReturnDue: 0.00,
      shippingStatus: "",
      totalItems: 1.00,
      addedBy: "Mr C2Z Electronics",
      sellNote: "",
      staffNote: "",
      shippingDetails: "",
    },
    {
      key: "6",
      date: "12/17/2025 23:55",
      invoiceNo: "0004",
      customerName: "Kamgisha customer",
      contactNumber: "0765917527",
      location: "C2Z Digital Solutions",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 150000.00,
      totalPaid: 150000.00,
      sellDue: 0.00,
      sellReturnDue: 0.00,
      shippingStatus: "",
      totalItems: 1.00,
      addedBy: "Mr C2Z Electronics",
      sellNote: "",
      staffNote: "",
      shippingDetails: "",
    },
    {
      key: "7",
      date: "12/17/2025 23:55",
      invoiceNo: "0002",
      customerName: "Kamgisha customer",
      contactNumber: "0765917527",
      location: "C2Z Digital Solutions",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 150000.00,
      totalPaid: 150000.00,
      sellDue: 0.00,
      sellReturnDue: 0.00,
      shippingStatus: "",
      totalItems: 1.00,
      addedBy: "Mr C2Z Electronics",
      sellNote: "",
      staffNote: "",
      shippingDetails: "",
    },
    {
      key: "8",
      date: "12/17/2025 23:55",
      invoiceNo: "0001",
      customerName: "Kamgisha customer",
      contactNumber: "0765917527",
      location: "C2Z Digital Solutions",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 150000.00,
      totalPaid: 150000.00,
      sellDue: 0.00,
      sellReturnDue: 0.00,
      shippingStatus: "",
      totalItems: 1.00,
      addedBy: "Mr C2Z Electronics",
      sellNote: "",
      staffNote: "",
      shippingDetails: "",
    },
    {
      key: "9",
      date: "12/17/2025 23:55",
      invoiceNo: "0000",
      customerName: "Kamgisha customer",
      contactNumber: "0765917527",
      location: "C2Z Digital Solutions",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 150000.00,
      totalPaid: 150000.00,
      sellDue: 0.00,
      sellReturnDue: 0.00,
      shippingStatus: "",
      totalItems: 1.00,
      addedBy: "Mr C2Z Electronics",
      sellNote: "",
      staffNote: "",
      shippingDetails: "",
    },
  ];

  const [posTransactions, setPosTransactions] = useState<POSData[]>(defaultPOS);

  // Filter POS transactions based on search text and filters
  const filteredPOS = useMemo(() => {
    let filtered = posTransactions;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (pos) =>
          pos.invoiceNo.toLowerCase().includes(searchLower) ||
          pos.customerName.toLowerCase().includes(searchLower) ||
          pos.location.toLowerCase().includes(searchLower) ||
          pos.contactNumber.includes(searchLower)
      );
    }

    // Apply filters
    if (filters.businessLocation && filters.businessLocation !== "all") {
      filtered = filtered.filter((p) => p.location === filters.businessLocation);
    }
    if (filters.user !== "all") {
      filtered = filtered.filter((p) => p.addedBy === filters.user);
    }
    if (filters.customer !== "all") {
      filtered = filtered.filter((p) => p.customerName === filters.customer);
    }
    if (filters.paymentStatus !== "all") {
      filtered = filtered.filter((p) => p.paymentStatus === filters.paymentStatus);
    }
    if (filters.shippingStatus !== "all") {
      filtered = filtered.filter((p) => p.shippingStatus === filters.shippingStatus);
    }

    return filtered;
  }, [posTransactions, searchText, filters]);

  // Calculate summary totals and counts
  const summaryTotals = useMemo(() => {
    const totalPaid = filteredPOS.reduce((sum, p) => sum + p.totalPaid, 0);
    const totalSellDue = filteredPOS.reduce((sum, p) => sum + p.sellDue, 0);
    const totalSellReturnDue = filteredPOS.reduce((sum, p) => sum + p.sellReturnDue, 0);
    const totalAmount = filteredPOS.reduce((sum, p) => sum + p.totalAmount, 0);
    
    const paidCount = filteredPOS.filter((p) => p.paymentStatus === "paid").length;
    const dueCount = filteredPOS.filter((p) => p.paymentStatus === "due").length;
    const cashCount = filteredPOS.filter((p) => p.paymentMethod === "Cash").length;

    return {
      totalPaid,
      sellDue: totalSellDue,
      sellReturnDue: totalSellReturnDue,
      totalAmount,
      paidCount,
      dueCount,
      cashCount,
    };
  }, [filteredPOS]);

  const handleAddPOS = () => {
    navigate("/sell/pos");
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh POS transactions
    setTimeout(() => {
      setLoading(false);
      message.success("POS transactions refreshed successfully");
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
    const csvData = filteredPOS.map((pos) => [
      pos.date,
      pos.invoiceNo,
      pos.customerName,
      pos.contactNumber,
      pos.location,
      pos.paymentStatus,
      pos.paymentMethod,
      pos.totalAmount.toFixed(2),
      pos.totalPaid.toFixed(2),
      pos.sellDue.toFixed(2),
      pos.sellReturnDue.toFixed(2),
      pos.shippingStatus,
      pos.totalItems,
      pos.addedBy,
      pos.sellNote,
      pos.staffNote,
      pos.shippingDetails,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `pos_transactions_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("POS transactions exported to CSV successfully");
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
          <title>POS Transactions Report</title>
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
          <h1>POS Transactions Report</h1>
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
              ${filteredPOS
                .map(
                  (pos) => `
                <tr>
                  <td>${pos.date}</td>
                  <td>${pos.invoiceNo}</td>
                  <td>${pos.customerName}</td>
                  <td>TSh ${pos.totalAmount.toFixed(2)}</td>
                  <td>${pos.paymentStatus}</td>
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

  const actionMenu = (record: POSData): MenuProps => ({
    items: [
      {
        key: "view",
        label: "View",
        onClick: () => {
          setSelectedPOS(record);
          setViewModalOpen(true);
        },
      },
      {
        key: "edit",
        label: "Edit",
        onClick: () => {
          setSelectedPOS(record);
          setEditModalOpen(true);
        },
      },
      {
        key: "delete",
        label: "Delete",
        danger: true,
        onClick: () => {
          setSelectedPOS(record);
          setDeleteModalOpen(true);
        },
      },
    ],
  });

  const columns: ColumnsType<POSData> = [
    {
      title: "Action",
      key: "action",
      width: 120,
      fixed: "left",
      render: (_text, record) => (
        <Dropdown menu={actionMenu(record)} trigger={["click"]}>
          <Button type="primary" icon={<MoreOutlined />}>
            Actions-
          </Button>
        </Dropdown>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 180,
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
      width: 120,
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
        const statusColors: Record<string, { color: string; bg: string }> = {
          paid: { color: "#52c41a", bg: "#f6ffed" },
          due: { color: "#fa8c16", bg: "#fff7e6" },
        };
        const status = statusColors[text.toLowerCase()] || { color: isDark ? "rgba(255,255,255,0.85)" : "#595959", bg: "transparent" };
        return (
          <Tag color={status.color} style={{ background: isDark ? "transparent" : status.bg }}>
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </Tag>
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
      render: (text: string) => text || "-",
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
          {value.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
      width: 180,
      sorter: (a, b) => a.addedBy.localeCompare(b.addedBy),
    },
    {
      title: "Staff note",
      dataIndex: "staffNote",
      key: "staffNote",
      width: 200,
      render: (text: string) => text || "-",
    },
    {
      title: "Sell note",
      dataIndex: "sellNote",
      key: "sellNote",
      width: 200,
      render: (text: string) => text || "-",
    },
    {
      title: "Shipping Details",
      dataIndex: "shippingDetails",
      key: "shippingDetails",
      width: 250,
      render: (text: string) => text || "-",
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
            POS
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
              onClick={handleAddPOS}
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

      {/* List POS Section */}
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
              List POS
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
          .pos-table .ant-table-thead > tr > th {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .pos-table .ant-table-thead > tr > th:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .pos-table .ant-table-tbody > tr {
            transition: all 0.2s ease;
          }
          .pos-table .ant-table-tbody > tr:hover > td {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
          }
          .pos-table .ant-table-tbody > tr:hover {
            transform: translateY(-1px);
            box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
          }
          .pos-table .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.45)"} !important;
          }
          .pos-table .ant-table-column-sorted .ant-table-column-sorter-up,
          .pos-table .ant-table-column-sorted .ant-table-column-sorter-down,
          .pos-table .ant-table-column-sorter-up.on,
          .pos-table .ant-table-column-sorter-down.on,
          .pos-table .ant-table-column-sorter-up.active,
          .pos-table .ant-table-column-sorter-down.active {
            color: ${isDark ? "#fff" : "#1890ff"} !important;
            opacity: 1 !important;
          }
        `}</style>
        <Table
          className="pos-table"
          columns={visibleColumns}
          dataSource={filteredPOS}
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
                  <Table.Summary.Cell index={0} colSpan={8}>
                    <Text
                      strong
                      style={{
                        fontSize: "14px",
                        color: isDark ? "#fff" : "#1f1f1f",
                      }}
                    >
                      Total:
                    </Text>
                    <Space style={{ marginLeft: "16px" }}>
                      <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                        Paid: {summaryTotals.paidCount}
                      </Text>
                      <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                        Due: {summaryTotals.dueCount}
                      </Text>
                      <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                        Cash: {summaryTotals.cashCount}
                      </Text>
                    </Space>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8} align="right">
                    <Text
                      style={{
                        fontSize: "13px",
                        color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                      }}
                    >
                      TSh {summaryTotals.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                  <Table.Summary.Cell index={12} colSpan={6} />
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
          setSelectedPOS(null);
        }}
        title="POS Transaction Details"
        data={selectedPOS}
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
          setSelectedPOS(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update POS transaction
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("POS transaction updated successfully");
            setEditModalOpen(false);
            setSelectedPOS(null);
          } catch (_error) {
            message.error("Failed to update POS transaction");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit POS Transaction"
        data={selectedPOS}
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
          setSelectedPOS(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete POS transaction
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("POS transaction deleted successfully");
            setPosTransactions(posTransactions.filter((p) => p.key !== selectedPOS?.key));
            setDeleteModalOpen(false);
            setSelectedPOS(null);
          } catch (_error) {
            message.error("Failed to delete POS transaction");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete POS Transaction"
        itemName={selectedPOS?.invoiceNo}
        loading={actionLoading}
      />
    </div>
  );
};

export default ListPOS;

