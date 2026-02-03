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
import { useNavigate } from "react-router-dom";
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

export interface ExpenseData {
  key: string;
  date: string;
  referenceNo: string;
  recurringDetails?: string;
  expenseCategory: string;
  subCategory?: string;
  location: string;
  paymentStatus: "paid" | "partial" | "due";
  tax: number;
  totalAmount: number;
  paymentDue: number;
  expenseFor?: string;
  contact?: string;
  expenseNote?: string;
  addedBy: string;
}

const ListExpenses: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);

  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    businessLocation: {
      label: "Business Location:",
      value: "C2Z Digital Solutions (C2Z1)",
      options: [
        { label: "All", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
      ],
    },
    expenseFor: {
      label: "Expense for:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Business", value: "business" },
        { label: "Personal", value: "personal" },
      ],
    },
    contact: {
      label: "Contact:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Supplier A", value: "supplier_a" },
        { label: "Supplier B", value: "supplier_b" },
      ],
    },
    expenseCategory: {
      label: "Expense Category:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Office Supplies", value: "office_supplies" },
        { label: "Utilities", value: "utilities" },
        { label: "Travel", value: "travel" },
        { label: "Marketing", value: "marketing" },
      ],
    },
    subCategory: {
      label: "Sub category:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Sub Category 1", value: "sub_category_1" },
        { label: "Sub Category 2", value: "sub_category_2" },
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2025-01-01"), dayjs("2025-12-31")],
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
  });

  // Convert FilterConfig to filters object for filtering logic
  const filters = {
    businessLocation: filterConfig.businessLocation?.value || "all",
    expenseFor: filterConfig.expenseFor?.value || "all",
    contact: filterConfig.contact?.value || "all",
    expenseCategory: filterConfig.expenseCategory?.value || "all",
    subCategory: filterConfig.subCategory?.value || "all",
    dateRange: filterConfig.dateRange?.value || [dayjs(), dayjs()],
    paymentStatus: filterConfig.paymentStatus?.value || "all",
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    action: true,
    date: true,
    referenceNo: true,
    recurringDetails: true,
    expenseCategory: true,
    subCategory: true,
    location: true,
    paymentStatus: true,
    tax: true,
    totalAmount: true,
    paymentDue: true,
    expenseFor: true,
    contact: true,
    expenseNote: true,
    addedBy: true,
  });

  // Mock data - replace with API call
  const defaultExpenses: ExpenseData[] = [
    {
      key: "1",
      date: "2025-01-15",
      referenceNo: "EXP-2025-001",
      recurringDetails: "Monthly",
      expenseCategory: "Office Supplies",
      subCategory: "Stationery",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      tax: 18000.00,
      totalAmount: 118000.00,
      paymentDue: 0.00,
      expenseFor: "Business",
      contact: "Supplier A",
      expenseNote: "Office stationery purchase",
      addedBy: "John Doe",
    },
    {
      key: "2",
      date: "2025-01-16",
      referenceNo: "EXP-2025-002",
      recurringDetails: "",
      expenseCategory: "Utilities",
      subCategory: "Electricity",
      location: "Location 2",
      paymentStatus: "partial",
      tax: 36000.00,
      totalAmount: 236000.00,
      paymentDue: 100000.00,
      expenseFor: "Business",
      contact: "Utility Company",
      expenseNote: "Monthly electricity bill",
      addedBy: "Jane Smith",
    },
    {
      key: "3",
      date: "2025-01-17",
      referenceNo: "EXP-2025-003",
      recurringDetails: "Weekly",
      expenseCategory: "Travel",
      subCategory: "Transport",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      tax: 9000.00,
      totalAmount: 59000.00,
      paymentDue: 0.00,
      expenseFor: "Business",
      contact: "Taxi Service",
      expenseNote: "Client visit transportation",
      addedBy: "Mike Johnson",
    },
    {
      key: "4",
      date: "2025-01-18",
      referenceNo: "EXP-2025-004",
      recurringDetails: "",
      expenseCategory: "Marketing",
      subCategory: "Advertising",
      location: "Location 2",
      paymentStatus: "due",
      tax: 45000.00,
      totalAmount: 295000.00,
      paymentDue: 295000.00,
      expenseFor: "Business",
      contact: "Marketing Agency",
      expenseNote: "Social media advertising campaign",
      addedBy: "Sarah Williams",
    },
    {
      key: "5",
      date: "2025-01-19",
      referenceNo: "EXP-2025-005",
      recurringDetails: "Monthly",
      expenseCategory: "Utilities",
      subCategory: "Internet",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      tax: 18000.00,
      totalAmount: 118000.00,
      paymentDue: 0.00,
      expenseFor: "Business",
      contact: "ISP Provider",
      expenseNote: "Monthly internet subscription",
      addedBy: "David Brown",
    },
    {
      key: "6",
      date: "2025-01-20",
      referenceNo: "EXP-2025-006",
      recurringDetails: "",
      expenseCategory: "Office Supplies",
      subCategory: "Equipment",
      location: "Location 2",
      paymentStatus: "partial",
      tax: 54000.00,
      totalAmount: 354000.00,
      paymentDue: 150000.00,
      expenseFor: "Business",
      contact: "Supplier B",
      expenseNote: "Office equipment purchase",
      addedBy: "Emily Davis",
    },
    {
      key: "7",
      date: "2025-01-21",
      referenceNo: "EXP-2025-007",
      recurringDetails: "Quarterly",
      expenseCategory: "Marketing",
      subCategory: "Events",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      tax: 90000.00,
      totalAmount: 590000.00,
      paymentDue: 0.00,
      expenseFor: "Business",
      contact: "Event Organizer",
      expenseNote: "Product launch event",
      addedBy: "Robert Miller",
    },
    {
      key: "8",
      date: "2025-01-22",
      referenceNo: "EXP-2025-008",
      recurringDetails: "",
      expenseCategory: "Travel",
      subCategory: "Accommodation",
      location: "Location 2",
      paymentStatus: "due",
      tax: 45000.00,
      totalAmount: 295000.00,
      paymentDue: 295000.00,
      expenseFor: "Business",
      contact: "Hotel",
      expenseNote: "Business trip accommodation",
      addedBy: "Lisa Anderson",
    },
    {
      key: "9",
      date: "2025-01-23",
      referenceNo: "EXP-2025-009",
      recurringDetails: "Monthly",
      expenseCategory: "Utilities",
      subCategory: "Water",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      tax: 9000.00,
      totalAmount: 59000.00,
      paymentDue: 0.00,
      expenseFor: "Business",
      contact: "Water Company",
      expenseNote: "Monthly water bill",
      addedBy: "James Wilson",
    },
    {
      key: "10",
      date: "2025-01-24",
      referenceNo: "EXP-2025-010",
      recurringDetails: "",
      expenseCategory: "Office Supplies",
      subCategory: "Cleaning",
      location: "Location 2",
      paymentStatus: "paid",
      tax: 4500.00,
      totalAmount: 29500.00,
      paymentDue: 0.00,
      expenseFor: "Business",
      contact: "Cleaning Service",
      expenseNote: "Office cleaning service",
      addedBy: "Patricia Taylor",
    },
    {
      key: "11",
      date: "2025-01-25",
      referenceNo: "EXP-2025-011",
      recurringDetails: "Monthly",
      expenseCategory: "Marketing",
      subCategory: "Digital Marketing",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "partial",
      tax: 27000.00,
      totalAmount: 177000.00,
      paymentDue: 80000.00,
      expenseFor: "Business",
      contact: "Digital Agency",
      expenseNote: "SEO and content marketing",
      addedBy: "Michael Martinez",
    },
    {
      key: "12",
      date: "2025-01-26",
      referenceNo: "EXP-2025-012",
      recurringDetails: "",
      expenseCategory: "Travel",
      subCategory: "Meals",
      location: "Location 2",
      paymentStatus: "paid",
      tax: 9000.00,
      totalAmount: 59000.00,
      paymentDue: 0.00,
      expenseFor: "Business",
      contact: "Restaurant",
      expenseNote: "Client meeting lunch",
      addedBy: "Jennifer Garcia",
    },
    {
      key: "13",
      date: "2025-01-27",
      referenceNo: "EXP-2025-013",
      recurringDetails: "Monthly",
      expenseCategory: "Utilities",
      subCategory: "Phone",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      tax: 18000.00,
      totalAmount: 118000.00,
      paymentDue: 0.00,
      expenseFor: "Business",
      contact: "Telecom Provider",
      expenseNote: "Monthly phone bill",
      addedBy: "William Rodriguez",
    },
    {
      key: "14",
      date: "2025-01-28",
      referenceNo: "EXP-2025-014",
      recurringDetails: "",
      expenseCategory: "Office Supplies",
      subCategory: "Furniture",
      location: "Location 2",
      paymentStatus: "due",
      tax: 90000.00,
      totalAmount: 590000.00,
      paymentDue: 590000.00,
      expenseFor: "Business",
      contact: "Furniture Store",
      expenseNote: "Office furniture purchase",
      addedBy: "Linda Martinez",
    },
    {
      key: "15",
      date: "2025-01-29",
      referenceNo: "EXP-2025-015",
      recurringDetails: "Weekly",
      expenseCategory: "Travel",
      subCategory: "Transport",
      location: "C2Z Digital Solutions (C2Z1)",
      paymentStatus: "paid",
      tax: 4500.00,
      totalAmount: 29500.00,
      paymentDue: 0.00,
      expenseFor: "Business",
      contact: "Delivery Service",
      expenseNote: "Package delivery",
      addedBy: "Richard Lee",
    },
  ];

  const [expenses, setExpenses] = useState<ExpenseData[]>(defaultExpenses);

  // Filter expenses based on search text and filters
  const filteredExpenses = useMemo(() => {
    let filtered = expenses;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (expense) =>
          expense.referenceNo.toLowerCase().includes(searchLower) ||
          expense.expenseCategory.toLowerCase().includes(searchLower) ||
          expense.location.toLowerCase().includes(searchLower) ||
          expense.expenseNote?.toLowerCase().includes(searchLower) ||
          expense.addedBy.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    if (filters.businessLocation !== "all") {
      filtered = filtered.filter((e) => e.location === filters.businessLocation);
    }
    if (filters.expenseFor !== "all") {
      filtered = filtered.filter((e) => e.expenseFor === filters.expenseFor);
    }
    if (filters.contact !== "all") {
      filtered = filtered.filter((e) => e.contact === filters.contact);
    }
    if (filters.expenseCategory !== "all") {
      filtered = filtered.filter((e) => e.expenseCategory === filters.expenseCategory);
    }
    if (filters.subCategory !== "all") {
      filtered = filtered.filter((e) => e.subCategory === filters.subCategory);
    }
    if (filters.paymentStatus !== "all") {
      filtered = filtered.filter((e) => e.paymentStatus === filters.paymentStatus);
    }

    return filtered;
  }, [expenses, searchText, filters]);

  // Calculate summary totals
  const summaryTotals = useMemo(() => {
    const totalAmount = filteredExpenses.reduce((sum, e) => sum + e.totalAmount, 0);
    const totalPaymentDue = filteredExpenses.reduce((sum, e) => sum + e.paymentDue, 0);
    return {
      totalAmount,
      totalPaymentDue,
    };
  }, [filteredExpenses]);

  const handleAddExpense = () => {
    navigate("/expenses/add-expense");
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Expenses refreshed successfully");
    }, 1000);
  };

  const handleView = (record: ExpenseData) => {
    setSelectedExpense(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: ExpenseData) => {
    setSelectedExpense(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: ExpenseData) => {
    setSelectedExpense(record);
    setDeleteModalOpen(true);
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Reference No",
      "Recurring details",
      "Expense Category",
      "Sub category",
      "Location",
      "Payment Status",
      "Tax",
      "Total amount",
      "Payment due",
      "Expense for",
      "Contact",
      "Expense note",
      "Added By",
    ];
    const csvData = filteredExpenses.map((expense) => [
      expense.date,
      expense.referenceNo,
      expense.recurringDetails || "",
      expense.expenseCategory,
      expense.subCategory || "",
      expense.location,
      expense.paymentStatus,
      expense.tax,
      expense.totalAmount,
      expense.paymentDue,
      expense.expenseFor || "",
      expense.contact || "",
      expense.expenseNote || "",
      expense.addedBy,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `expenses_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Expenses exported to CSV successfully");
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
          <title>Expenses Report</title>
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
          <h1>Expenses Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference No</th>
                <th>Expense Category</th>
                <th>Location</th>
                <th>Payment Status</th>
                <th>Total Amount</th>
                <th>Payment Due</th>
              </tr>
            </thead>
            <tbody>
              ${filteredExpenses
                .map(
                  (expense) => `
                <tr>
                  <td>${expense.date}</td>
                  <td>${expense.referenceNo}</td>
                  <td>${expense.expenseCategory}</td>
                  <td>${expense.location}</td>
                  <td>${expense.paymentStatus}</td>
                  <td>TSh ${expense.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td>TSh ${expense.paymentDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
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

  const columns: ColumnsType<ExpenseData> = [
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
      title: "Recurring details",
      dataIndex: "recurringDetails",
      key: "recurringDetails",
      width: 150,
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
      title: "Expense Category",
      dataIndex: "expenseCategory",
      key: "expenseCategory",
      width: 150,
      sorter: (a, b) => a.expenseCategory.localeCompare(b.expenseCategory),
    },
    {
      title: "Sub category",
      dataIndex: "subCategory",
      key: "subCategory",
      width: 150,
      render: (text: string | undefined) => (
        <Text
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
        const config = statusConfig[text] || { color: "default", text: text };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
      width: 120,
      align: "right",
      sorter: (a, b) => a.tax - b.tax,
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
      title: "Payment due",
      dataIndex: "paymentDue",
      key: "paymentDue",
      width: 150,
      align: "right",
      sorter: (a, b) => a.paymentDue - b.paymentDue,
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
      title: "Expense for",
      dataIndex: "expenseFor",
      key: "expenseFor",
      width: 150,
      render: (text: string | undefined) => (
        <Text
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
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      width: 150,
      render: (text: string | undefined) => (
        <Text
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
      title: "Expense note",
      dataIndex: "expenseNote",
      key: "expenseNote",
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
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
      width: 150,
      sorter: (a, b) => a.addedBy.localeCompare(b.addedBy),
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
            Expenses
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
              onClick={handleAddExpense}
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

      {/* All Expenses Section */}
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
              All expenses
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
          dataSource={filteredExpenses}
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
                  <Table.Summary.Cell index={0} colSpan={9}>
                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f" }}>
                      Total:
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={9} align="right">
                    <div style={{ textAlign: "right" }}>
                      <Text
                        strong
                        style={{
                          fontSize: "13px",
                          color: isDark ? "#fff" : "#1f1f1f",
                        }}
                      >
                        TSh {summaryTotals.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Text>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={10} align="right">
                    <div style={{ textAlign: "right" }}>
                      <Text
                        strong
                        style={{
                          fontSize: "13px",
                          color: isDark ? "#fff" : "#1f1f1f",
                        }}
                      >
                        TSh {summaryTotals.totalPaymentDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Text>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={11} colSpan={4} />
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </Card>

      {/* Modals */}
      {selectedExpense && (
        <>
          <ViewModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Expense Details"
            data={selectedExpense}
          />
          <EditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit Expense"
            data={selectedExpense}
            onSave={async (_values) => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to update expense
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Expense updated successfully");
                setEditModalOpen(false);
              } catch (_error) {
                message.error("Failed to update expense");
              } finally {
                setActionLoading(false);
              }
            }}
          />
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Expense"
            message={`Are you sure you want to delete expense "${selectedExpense.referenceNo}"?`}
            onConfirm={async () => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to delete expense
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setExpenses(expenses.filter((e) => e.key !== selectedExpense.key));
                message.success("Expense deleted successfully");
                setDeleteModalOpen(false);
              } catch (_error) {
                message.error("Failed to delete expense");
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

export default ListExpenses;

