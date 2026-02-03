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
  Select,
  Dropdown,
  Checkbox,
  Menu,
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
  ShoppingOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

export interface TransactionData {
  key: string;
  date: string;
  invoiceNo: string;
  customerName: string;
  contactNumber: string;
  location: string;
  paymentStatus: "paid" | "partial" | "due";
  paymentMethod: string;
  totalAmount: number;
  totalPaid: number;
  addedBy: string;
  sellNote?: string;
  staffNote?: string;
}

type TransactionType = "sell" | "sales-payments" | "purchases" | "purchase-payments" | "expenses";

const Transactions: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<TransactionType>("sell");
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);

  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    businessLocation: {
      label: "Business Location:",
      value: "C2Z Digital Solutions (C2Z1)",
      type: "select",
      options: [
        { label: "All locations", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
        { label: "Location 3", value: "Location 3" },
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2026-01-20"), dayjs("2026-01-27")],
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
    invoiceNo: true,
    customerName: true,
    contactNumber: true,
    location: true,
    paymentStatus: true,
    paymentMethod: true,
    totalAmount: true,
    totalPaid: true,
    addedBy: true,
    sellNote: true,
    staffNote: true,
  });

  // Mock data for Sell transactions
  const defaultSellTransactions: TransactionData[] = [
    {
      key: "1",
      date: "2026-01-20",
      invoiceNo: "INV-2026-001",
      customerName: "ABC Electronics Ltd",
      contactNumber: "+255 712 345 678",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 1250000.00,
      totalPaid: 1250000.00,
      addedBy: "John Doe",
      sellNote: "Customer requested invoice",
      staffNote: "Delivered same day",
    },
    {
      key: "2",
      date: "2026-01-21",
      invoiceNo: "INV-2026-002",
      customerName: "Tech Solutions Inc",
      contactNumber: "+255 713 456 789",
      location: "Location 2",
      paymentStatus: "partial",
      paymentMethod: "Bank Transfer",
      totalAmount: 2500000.00,
      totalPaid: 1500000.00,
      addedBy: "Jane Smith",
      sellNote: "Partial payment received",
      staffNote: "Follow up on remaining balance",
    },
    {
      key: "3",
      date: "2026-01-22",
      invoiceNo: "INV-2026-003",
      customerName: "Global Trading Co",
      contactNumber: "+255 714 567 890",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      paymentMethod: "Mobile Money - M-Pesa",
      totalAmount: 850000.00,
      totalPaid: 850000.00,
      addedBy: "Mike Johnson",
      sellNote: "Bulk order discount applied",
      staffNote: "Customer satisfied with service",
    },
    {
      key: "4",
      date: "2026-01-23",
      invoiceNo: "INV-2026-004",
      customerName: "Digital Innovations",
      contactNumber: "+255 715 678 901",
      location: "Location 3",
      paymentStatus: "due",
      paymentMethod: "Credit Card",
      totalAmount: 3200000.00,
      totalPaid: 0.00,
      addedBy: "Sarah Williams",
      sellNote: "Payment terms: 30 days",
      staffNote: "Send reminder after 20 days",
    },
    {
      key: "5",
      date: "2026-01-24",
      invoiceNo: "INV-2026-005",
      customerName: "Smart Systems Ltd",
      contactNumber: "+255 716 789 012",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      paymentMethod: "Bank Transfer",
      totalAmount: 1800000.00,
      totalPaid: 1800000.00,
      addedBy: "David Brown",
      sellNote: "Early payment discount",
      staffNote: "Regular customer",
    },
    {
      key: "6",
      date: "2026-01-25",
      invoiceNo: "INV-2026-006",
      customerName: "Future Tech Corp",
      contactNumber: "+255 717 890 123",
      location: "Location 2",
      paymentStatus: "partial",
      paymentMethod: "Mobile Money - Tigo Pesa",
      totalAmount: 4200000.00,
      totalPaid: 2500000.00,
      addedBy: "Emily Davis",
      sellNote: "Installment payment plan",
      staffNote: "Next payment due in 15 days",
    },
    {
      key: "7",
      date: "2026-01-26",
      invoiceNo: "INV-2026-007",
      customerName: "Innovation Hub",
      contactNumber: "+255 718 901 234",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 950000.00,
      totalPaid: 950000.00,
      addedBy: "Robert Miller",
      sellNote: "Cash discount applied",
      staffNote: "New customer",
    },
    {
      key: "8",
      date: "2026-01-27",
      invoiceNo: "INV-2026-008",
      customerName: "Tech Ventures",
      contactNumber: "+255 719 012 345",
      location: "Location 3",
      paymentStatus: "paid",
      paymentMethod: "Bank Transfer",
      totalAmount: 2750000.00,
      totalPaid: 2750000.00,
      addedBy: "Lisa Anderson",
      sellNote: "Corporate account",
      staffNote: "VIP customer",
    },
    {
      key: "9",
      date: "2026-01-20",
      invoiceNo: "INV-2026-009",
      customerName: "Digital Dynamics",
      contactNumber: "+255 720 123 456",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "due",
      paymentMethod: "Credit Card",
      totalAmount: 1650000.00,
      totalPaid: 0.00,
      addedBy: "James Wilson",
      sellNote: "Payment pending approval",
      staffNote: "Contact customer for payment",
    },
    {
      key: "10",
      date: "2026-01-21",
      invoiceNo: "INV-2026-010",
      customerName: "Advanced Systems",
      contactNumber: "+255 721 234 567",
      location: "Location 2",
      paymentStatus: "paid",
      paymentMethod: "Mobile Money - M-Pesa",
      totalAmount: 1100000.00,
      totalPaid: 1100000.00,
      addedBy: "Patricia Taylor",
      sellNote: "Quick payment",
      staffNote: "Excellent service",
    },
    {
      key: "11",
      date: "2026-01-22",
      invoiceNo: "INV-2026-011",
      customerName: "Modern Solutions",
      contactNumber: "+255 722 345 678",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "partial",
      paymentMethod: "Bank Transfer",
      totalAmount: 3800000.00,
      totalPaid: 2000000.00,
      addedBy: "Michael Martinez",
      sellNote: "Partial payment received",
      staffNote: "Balance due in 30 days",
    },
    {
      key: "12",
      date: "2026-01-23",
      invoiceNo: "INV-2026-012",
      customerName: "Tech Partners",
      contactNumber: "+255 723 456 789",
      location: "Location 3",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 750000.00,
      totalPaid: 750000.00,
      addedBy: "Jennifer Garcia",
      sellNote: "Walk-in customer",
      staffNote: "Immediate payment",
    },
    {
      key: "13",
      date: "2026-01-24",
      invoiceNo: "INV-2026-013",
      customerName: "Innovative Tech",
      contactNumber: "+255 724 567 890",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      paymentMethod: "Mobile Money - Tigo Pesa",
      totalAmount: 1950000.00,
      totalPaid: 1950000.00,
      addedBy: "William Rodriguez",
      sellNote: "Mobile payment",
      staffNote: "Fast transaction",
    },
    {
      key: "14",
      date: "2026-01-25",
      invoiceNo: "INV-2026-014",
      customerName: "Smart Business",
      contactNumber: "+255 725 678 901",
      location: "Location 2",
      paymentStatus: "due",
      paymentMethod: "Credit Card",
      totalAmount: 2200000.00,
      totalPaid: 0.00,
      addedBy: "Linda Martinez",
      sellNote: "Credit terms: 45 days",
      staffNote: "Follow up required",
    },
    {
      key: "15",
      date: "2026-01-26",
      invoiceNo: "INV-2026-015",
      customerName: "Digital Express",
      contactNumber: "+255 726 789 012",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      paymentMethod: "Bank Transfer",
      totalAmount: 1450000.00,
      totalPaid: 1450000.00,
      addedBy: "Richard Lee",
      sellNote: "Bank transfer received",
      staffNote: "Payment confirmed",
    },
    {
      key: "16",
      date: "2026-01-27",
      invoiceNo: "INV-2026-016",
      customerName: "Tech World",
      contactNumber: "+255 727 890 123",
      location: "Location 3",
      paymentStatus: "partial",
      paymentMethod: "Mobile Money - M-Pesa",
      totalAmount: 3300000.00,
      totalPaid: 1800000.00,
      addedBy: "Nancy White",
      sellNote: "Installment plan",
      staffNote: "Next payment scheduled",
    },
    {
      key: "17",
      date: "2026-01-20",
      invoiceNo: "INV-2026-017",
      customerName: "Future Systems",
      contactNumber: "+255 728 901 234",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 880000.00,
      totalPaid: 880000.00,
      addedBy: "Thomas Harris",
      sellNote: "Cash payment",
      staffNote: "Immediate settlement",
    },
    {
      key: "18",
      date: "2026-01-21",
      invoiceNo: "INV-2026-018",
      customerName: "Advanced Tech",
      contactNumber: "+255 729 012 345",
      location: "Location 2",
      paymentStatus: "paid",
      paymentMethod: "Bank Transfer",
      totalAmount: 2100000.00,
      totalPaid: 2100000.00,
      addedBy: "Barbara Clark",
      sellNote: "Corporate payment",
      staffNote: "Regular client",
    },
    {
      key: "19",
      date: "2026-01-22",
      invoiceNo: "INV-2026-019",
      customerName: "Smart Innovations",
      contactNumber: "+255 730 123 456",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "due",
      paymentMethod: "Credit Card",
      totalAmount: 1750000.00,
      totalPaid: 0.00,
      addedBy: "Christopher Lewis",
      sellNote: "Payment pending",
      staffNote: "Send invoice reminder",
    },
    {
      key: "20",
      date: "2026-01-23",
      invoiceNo: "INV-2026-020",
      customerName: "Digital Partners",
      contactNumber: "+255 731 234 567",
      location: "Location 3",
      paymentStatus: "paid",
      paymentMethod: "Mobile Money - Tigo Pesa",
      totalAmount: 1200000.00,
      totalPaid: 1200000.00,
      addedBy: "Jessica Walker",
      sellNote: "Mobile payment received",
      staffNote: "Quick transaction",
    },
    {
      key: "21",
      date: "2026-01-24",
      invoiceNo: "INV-2026-021",
      customerName: "Tech Solutions Pro",
      contactNumber: "+255 732 345 678",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "partial",
      paymentMethod: "Bank Transfer",
      totalAmount: 4500000.00,
      totalPaid: 2500000.00,
      addedBy: "Daniel Hall",
      sellNote: "Large order - partial payment",
      staffNote: "Balance due in 30 days",
    },
    {
      key: "22",
      date: "2026-01-25",
      invoiceNo: "INV-2026-022",
      customerName: "Innovation Labs",
      contactNumber: "+255 733 456 789",
      location: "Location 2",
      paymentStatus: "paid",
      paymentMethod: "Cash",
      totalAmount: 980000.00,
      totalPaid: 980000.00,
      addedBy: "Amanda Allen",
      sellNote: "Cash payment",
      staffNote: "Walk-in sale",
    },
    {
      key: "23",
      date: "2026-01-26",
      invoiceNo: "INV-2026-023",
      customerName: "Modern Tech Co",
      contactNumber: "+255 734 567 890",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      paymentMethod: "Mobile Money - M-Pesa",
      totalAmount: 1650000.00,
      totalPaid: 1650000.00,
      addedBy: "Matthew Young",
      sellNote: "Mobile payment",
      staffNote: "Fast payment",
    },
    {
      key: "24",
      date: "2026-01-27",
      invoiceNo: "INV-2026-024",
      customerName: "Tech Enterprise",
      contactNumber: "+255 735 678 901",
      location: "Location 3",
      paymentStatus: "due",
      paymentMethod: "Credit Card",
      totalAmount: 2800000.00,
      totalPaid: 0.00,
      addedBy: "Michelle King",
      sellNote: "Credit terms: 60 days",
      staffNote: "Long-term customer",
    },
    {
      key: "25",
      date: "2026-01-20",
      invoiceNo: "INV-2026-025",
      customerName: "Digital Solutions Plus",
      contactNumber: "+255 736 789 012",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      paymentMethod: "Bank Transfer",
      totalAmount: 1350000.00,
      totalPaid: 1350000.00,
      addedBy: "Robert Taylor",
      sellNote: "Bank transfer",
      staffNote: "Payment confirmed",
    },
  ];

  const [transactions, setTransactions] = useState<TransactionData[]>(defaultSellTransactions);

  // Sidebar menu items
  const sidebarMenuItems: MenuProps["items"] = [
    {
      key: "sell",
      icon: <ShoppingOutlined />,
      label: "Sell",
    },
    {
      key: "sales-payments",
      icon: <DollarOutlined />,
      label: "Sales Payments",
    },
    {
      key: "purchases",
      icon: <ShoppingCartOutlined />,
      label: "Purchases",
    },
    {
      key: "purchase-payments",
      icon: <CreditCardOutlined />,
      label: "Purchase Payments",
    },
    {
      key: "expenses",
      icon: <MinusCircleOutlined />,
      label: "Expenses",
    },
  ];

  // Filter transactions based on search text and filters
  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (transaction) =>
          transaction.invoiceNo.toLowerCase().includes(searchLower) ||
          transaction.customerName.toLowerCase().includes(searchLower) ||
          transaction.contactNumber.toLowerCase().includes(searchLower) ||
          transaction.location.toLowerCase().includes(searchLower) ||
          transaction.addedBy.toLowerCase().includes(searchLower) ||
          transaction.sellNote?.toLowerCase().includes(searchLower) ||
          transaction.staffNote?.toLowerCase().includes(searchLower)
      );
    }

    // Apply business location filter
    if (filters.businessLocation !== "all") {
      filtered = filtered.filter((t) => t.location === filters.businessLocation);
    }

    // Apply date range filter
    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = dayjs(transaction.date);
        return (
          transactionDate.isAfter(filters.dateRange[0].subtract(1, "day")) &&
          transactionDate.isBefore(filters.dateRange[1].add(1, "day"))
        );
      });
    }

    return filtered;
  }, [transactions, searchText, filters]);

  const handleAddTransaction = () => {
    message.info("Add Transaction functionality coming soon");
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Transactions refreshed successfully");
    }, 1000);
  };

  const handleView = (record: TransactionData) => {
    setSelectedTransaction(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: TransactionData) => {
    setSelectedTransaction(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: TransactionData) => {
    setSelectedTransaction(record);
    setDeleteModalOpen(true);
  };

  const handleSidebarClick = ({ key }: { key: string }) => {
    setActiveTab(key as TransactionType);
    // TODO: Load different transaction data based on tab
    message.info(`Switched to ${key} transactions`);
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Invoice No.",
      "Customer name",
      "Contact Number",
      "Location",
      "Payment Status",
      "Payment Method",
      "Total amount",
      "Total paid",
      "Added By",
      "Sell note",
      "Staff note",
    ];
    const csvData = filteredTransactions.map((transaction) => [
      transaction.date,
      transaction.invoiceNo,
      transaction.customerName,
      transaction.contactNumber,
      transaction.location,
      transaction.paymentStatus,
      transaction.paymentMethod,
      transaction.totalAmount,
      transaction.totalPaid,
      transaction.addedBy,
      transaction.sellNote || "",
      transaction.staffNote || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `transactions_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Transactions exported to CSV successfully");
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
          <title>Transactions Report</title>
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
          <h1>Transactions Report - ${activeTab}</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Invoice No.</th>
                <th>Customer name</th>
                <th>Contact Number</th>
                <th>Location</th>
                <th>Payment Status</th>
                <th>Payment Method</th>
                <th>Total amount</th>
                <th>Total paid</th>
                <th>Added By</th>
              </tr>
            </thead>
            <tbody>
              ${filteredTransactions
                .map(
                  (transaction) => `
                <tr>
                  <td>${transaction.date}</td>
                  <td>${transaction.invoiceNo}</td>
                  <td>${transaction.customerName}</td>
                  <td>${transaction.contactNumber}</td>
                  <td>${transaction.location}</td>
                  <td>${transaction.paymentStatus}</td>
                  <td>${transaction.paymentMethod}</td>
                  <td>TSh ${transaction.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td>TSh ${transaction.totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td>${transaction.addedBy}</td>
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

  const columns: ColumnsType<TransactionData> = [
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
      width: 200,
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
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
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: 150,
      sorter: (a, b) => a.contactNumber.localeCompare(b.contactNumber),
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
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 150,
      sorter: (a, b) => a.paymentStatus.localeCompare(b.paymentStatus),
      render: (status: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          paid: { color: "success", text: "Paid" },
          partial: { color: "warning", text: "Partial" },
          due: { color: "error", text: "Due" },
        };
        const config = statusConfig[status] || { color: "default", text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 180,
      sorter: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod),
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
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
      width: 150,
      sorter: (a, b) => a.addedBy.localeCompare(b.addedBy),
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
      title: "Sell note",
      dataIndex: "sellNote",
      key: "sellNote",
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
      title: "Staff note",
      dataIndex: "staffNote",
      key: "staffNote",
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
            Transactions
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
              onClick={handleAddTransaction}
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

      <Row gutter={[16, 16]}>
        {/* Left Sidebar */}
        <Col xs={24} sm={24} md={6} lg={4}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            bodyStyle={{ padding: "8px" }}
          >
            <Menu
              mode="vertical"
              selectedKeys={[activeTab]}
              items={sidebarMenuItems}
              onClick={handleSidebarClick}
              style={{
                background: "transparent",
                border: "none",
              }}
            />
          </Card>
        </Col>

        {/* Main Content */}
        <Col xs={24} sm={24} md={18} lg={20}>
          {/* Filters Section */}
          <FilterPanel
            filters={filterConfig}
            onFilterChange={setFilterConfig}
            defaultExpanded={true}
          />

          {/* Transactions Table Section */}
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
                  All Transactions
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
              dataSource={filteredTransactions}
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
            />
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      {selectedTransaction && (
        <>
          <ViewModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Transaction Details"
            data={selectedTransaction}
          />
          <EditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit Transaction"
            data={selectedTransaction}
            onSave={async (_values) => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to update transaction
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Transaction updated successfully");
                setEditModalOpen(false);
              } catch (_error) {
                message.error("Failed to update transaction");
              } finally {
                setActionLoading(false);
              }
            }}
          />
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Transaction"
            message={`Are you sure you want to delete transaction "${selectedTransaction.invoiceNo}"?`}
            onConfirm={async () => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to delete transaction
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setTransactions(transactions.filter((t) => t.key !== selectedTransaction.key));
                message.success("Transaction deleted successfully");
                setDeleteModalOpen(false);
              } catch (_error) {
                message.error("Failed to delete transaction");
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

export default Transactions;
