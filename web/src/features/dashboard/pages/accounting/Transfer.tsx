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

export interface TransferData {
  key: string;
  date: string;
  referenceNo: string;
  from: string;
  to: string;
  amount: number;
  addedBy: string;
  additionalNotes: string;
}

const Transfer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<TransferData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);

  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    transferFrom: {
      label: "Transfer from:",
      value: "all",
      type: "select",
      options: [
        { label: "All", value: "all" },
        { label: "Main Business Account", value: "Main Business Account" },
        { label: "Savings Account", value: "Savings Account" },
        { label: "Cash Account", value: "Cash Account" },
        { label: "Mobile Money - M-Pesa", value: "Mobile Money - M-Pesa" },
        { label: "Mobile Money - Tigo Pesa", value: "Mobile Money - Tigo Pesa" },
        { label: "Credit Card Account", value: "Credit Card Account" },
        { label: "PayPal Account", value: "PayPal Account" },
      ],
    },
    transferTo: {
      label: "Transfer To:",
      value: "all",
      type: "select",
      options: [
        { label: "All", value: "all" },
        { label: "Main Business Account", value: "Main Business Account" },
        { label: "Savings Account", value: "Savings Account" },
        { label: "Cash Account", value: "Cash Account" },
        { label: "Mobile Money - M-Pesa", value: "Mobile Money - M-Pesa" },
        { label: "Mobile Money - Tigo Pesa", value: "Mobile Money - Tigo Pesa" },
        { label: "Credit Card Account", value: "Credit Card Account" },
        { label: "PayPal Account", value: "PayPal Account" },
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2025-01-01"), dayjs("2026-12-31")],
    },
  });

  // Convert FilterConfig to filters object for filtering logic
  const filters = {
    transferFrom: filterConfig.transferFrom?.value || "all",
    transferTo: filterConfig.transferTo?.value || "all",
    dateRange: filterConfig.dateRange?.value || [dayjs(), dayjs()],
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    action: true,
    date: true,
    referenceNo: true,
    from: true,
    to: true,
    amount: true,
    addedBy: true,
    additionalNotes: true,
  });

  // Mock data - replace with API call
  const defaultTransfers: TransferData[] = [
    {
      key: "1",
      date: "2025-01-05",
      referenceNo: "TRF-2025-001",
      from: "Main Business Account",
      to: "Savings Account",
      amount: 500000.00,
      addedBy: "Mr C2Z Electronics",
      additionalNotes: "Monthly savings transfer",
    },
    {
      key: "2",
      date: "2025-01-10",
      referenceNo: "TRF-2025-002",
      from: "Cash Account",
      to: "Mobile Money - M-Pesa",
      amount: 150000.00,
      addedBy: "John Doe",
      additionalNotes: "Emergency fund transfer",
    },
    {
      key: "3",
      date: "2025-01-15",
      referenceNo: "TRF-2025-003",
      from: "Savings Account",
      to: "Main Business Account",
      amount: 300000.00,
      addedBy: "Jane Smith",
      additionalNotes: "Business operation funding",
    },
    {
      key: "4",
      date: "2025-01-20",
      referenceNo: "TRF-2025-004",
      from: "Main Business Account",
      to: "Mobile Money - Tigo Pesa",
      amount: 75000.00,
      addedBy: "Mike Johnson",
      additionalNotes: "Supplier payment transfer",
    },
    {
      key: "5",
      date: "2025-01-25",
      referenceNo: "TRF-2025-005",
      from: "Mobile Money - M-Pesa",
      to: "Main Business Account",
      amount: 250000.00,
      addedBy: "Sarah Williams",
      additionalNotes: "Customer payment received",
    },
    {
      key: "6",
      date: "2025-02-01",
      referenceNo: "TRF-2025-006",
      from: "Main Business Account",
      to: "Cash Account",
      amount: 200000.00,
      addedBy: "David Brown",
      additionalNotes: "Cash withdrawal for office expenses",
    },
    {
      key: "7",
      date: "2025-02-05",
      referenceNo: "TRF-2025-007",
      from: "Credit Card Account",
      to: "Main Business Account",
      amount: 450000.00,
      addedBy: "Emily Davis",
      additionalNotes: "Credit card payment settlement",
    },
    {
      key: "8",
      date: "2025-02-10",
      referenceNo: "TRF-2025-008",
      from: "Main Business Account",
      to: "PayPal Account",
      amount: 100000.00,
      addedBy: "Robert Miller",
      additionalNotes: "International payment transfer",
    },
    {
      key: "9",
      date: "2025-02-15",
      referenceNo: "TRF-2025-009",
      from: "Savings Account",
      to: "Mobile Money - M-Pesa",
      amount: 125000.00,
      addedBy: "Lisa Anderson",
      additionalNotes: "Mobile money top-up",
    },
    {
      key: "10",
      date: "2025-02-20",
      referenceNo: "TRF-2025-010",
      from: "Mobile Money - Tigo Pesa",
      to: "Main Business Account",
      amount: 180000.00,
      addedBy: "James Wilson",
      additionalNotes: "Sales collection transfer",
    },
    {
      key: "11",
      date: "2025-03-01",
      referenceNo: "TRF-2025-011",
      from: "Main Business Account",
      to: "Savings Account",
      amount: 600000.00,
      addedBy: "Patricia Taylor",
      additionalNotes: "Quarterly savings deposit",
    },
    {
      key: "12",
      date: "2025-03-05",
      referenceNo: "TRF-2025-012",
      from: "Cash Account",
      to: "Main Business Account",
      amount: 350000.00,
      addedBy: "Michael Martinez",
      additionalNotes: "Cash deposit to business account",
    },
    {
      key: "13",
      date: "2025-03-10",
      referenceNo: "TRF-2025-013",
      from: "Main Business Account",
      to: "Credit Card Account",
      amount: 275000.00,
      addedBy: "Jennifer Garcia",
      additionalNotes: "Credit card bill payment",
    },
    {
      key: "14",
      date: "2025-03-15",
      referenceNo: "TRF-2025-014",
      from: "PayPal Account",
      to: "Main Business Account",
      amount: 85000.00,
      addedBy: "William Rodriguez",
      additionalNotes: "PayPal withdrawal",
    },
    {
      key: "15",
      date: "2025-03-20",
      referenceNo: "TRF-2025-015",
      from: "Main Business Account",
      to: "Mobile Money - M-Pesa",
      amount: 95000.00,
      addedBy: "Linda Martinez",
      additionalNotes: "Mobile payment for utilities",
    },
    {
      key: "16",
      date: "2025-04-01",
      referenceNo: "TRF-2025-016",
      from: "Savings Account",
      to: "Main Business Account",
      amount: 400000.00,
      addedBy: "Richard Lee",
      additionalNotes: "Business expansion funding",
    },
    {
      key: "17",
      date: "2025-04-05",
      referenceNo: "TRF-2025-017",
      from: "Main Business Account",
      to: "Cash Account",
      amount: 175000.00,
      addedBy: "Nancy White",
      additionalNotes: "Petty cash replenishment",
    },
    {
      key: "18",
      date: "2025-04-10",
      referenceNo: "TRF-2025-018",
      from: "Mobile Money - M-Pesa",
      to: "Savings Account",
      amount: 220000.00,
      addedBy: "Thomas Harris",
      additionalNotes: "Mobile money to savings",
    },
    {
      key: "19",
      date: "2025-04-15",
      referenceNo: "TRF-2025-019",
      from: "Main Business Account",
      to: "Mobile Money - Tigo Pesa",
      amount: 110000.00,
      addedBy: "Barbara Clark",
      additionalNotes: "Vendor payment via mobile money",
    },
    {
      key: "20",
      date: "2025-04-20",
      referenceNo: "TRF-2025-020",
      from: "Credit Card Account",
      to: "Main Business Account",
      amount: 320000.00,
      addedBy: "Christopher Lewis",
      additionalNotes: "Credit card refund transfer",
    },
    {
      key: "21",
      date: "2025-05-01",
      referenceNo: "TRF-2025-021",
      from: "Main Business Account",
      to: "PayPal Account",
      amount: 150000.00,
      addedBy: "Jessica Walker",
      additionalNotes: "International supplier payment",
    },
    {
      key: "22",
      date: "2025-05-05",
      referenceNo: "TRF-2025-022",
      from: "Savings Account",
      to: "Main Business Account",
      amount: 280000.00,
      addedBy: "Daniel Hall",
      additionalNotes: "Emergency business funding",
    },
    {
      key: "23",
      date: "2025-05-10",
      referenceNo: "TRF-2025-023",
      from: "Main Business Account",
      to: "Cash Account",
      amount: 140000.00,
      addedBy: "Amanda Allen",
      additionalNotes: "Office cash withdrawal",
    },
    {
      key: "24",
      date: "2025-05-15",
      referenceNo: "TRF-2025-024",
      from: "Mobile Money - Tigo Pesa",
      to: "Main Business Account",
      amount: 195000.00,
      addedBy: "Matthew Young",
      additionalNotes: "Mobile money collection",
    },
    {
      key: "25",
      date: "2025-05-20",
      referenceNo: "TRF-2025-025",
      from: "Main Business Account",
      to: "Savings Account",
      amount: 550000.00,
      addedBy: "Michelle King",
      additionalNotes: "Monthly savings contribution",
    },
  ];

  const [transfers, setTransfers] = useState<TransferData[]>(defaultTransfers);

  // Filter transfers based on search text and filters
  const filteredTransfers = useMemo(() => {
    let filtered = transfers;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (transfer) =>
          transfer.referenceNo.toLowerCase().includes(searchLower) ||
          transfer.from.toLowerCase().includes(searchLower) ||
          transfer.to.toLowerCase().includes(searchLower) ||
          transfer.additionalNotes.toLowerCase().includes(searchLower) ||
          transfer.addedBy.toLowerCase().includes(searchLower)
      );
    }

    // Apply transfer from filter
    if (filters.transferFrom !== "all") {
      filtered = filtered.filter((t) => t.from === filters.transferFrom);
    }

    // Apply transfer to filter
    if (filters.transferTo !== "all") {
      filtered = filtered.filter((t) => t.to === filters.transferTo);
    }

    // Apply date range filter
    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      filtered = filtered.filter((transfer) => {
        const transferDate = dayjs(transfer.date);
        return (
          transferDate.isAfter(filters.dateRange[0].subtract(1, "day")) &&
          transferDate.isBefore(filters.dateRange[1].add(1, "day"))
        );
      });
    }

    return filtered;
  }, [transfers, searchText, filters]);

  const handleAddTransfer = () => {
    message.info("Add Transfer functionality coming soon");
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Transfers refreshed successfully");
    }, 1000);
  };

  const handleView = (record: TransferData) => {
    setSelectedTransfer(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: TransferData) => {
    setSelectedTransfer(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: TransferData) => {
    setSelectedTransfer(record);
    setDeleteModalOpen(true);
  };

  const handleExportCSV = () => {
    const headers = ["Date", "Reference No", "From", "To", "Amount", "Added By", "Additional notes"];
    const csvData = filteredTransfers.map((transfer) => [
      transfer.date,
      transfer.referenceNo,
      transfer.from,
      transfer.to,
      transfer.amount,
      transfer.addedBy,
      transfer.additionalNotes,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `transfers_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Transfers exported to CSV successfully");
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
          <title>Transfers Report</title>
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
          <h1>Transfers Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference No</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Added By</th>
                <th>Additional notes</th>
              </tr>
            </thead>
            <tbody>
              ${filteredTransfers
                .map(
                  (transfer) => `
                <tr>
                  <td>${transfer.date}</td>
                  <td>${transfer.referenceNo}</td>
                  <td>${transfer.from}</td>
                  <td>${transfer.to}</td>
                  <td>TSh ${transfer.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td>${transfer.addedBy}</td>
                  <td>${transfer.additionalNotes}</td>
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

  const columns: ColumnsType<TransferData> = [
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
      title: "From",
      dataIndex: "from",
      key: "from",
      width: 200,
      sorter: (a, b) => a.from.localeCompare(b.from),
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
      title: "To",
      dataIndex: "to",
      key: "to",
      width: 200,
      sorter: (a, b) => a.to.localeCompare(b.to),
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 150,
      align: "right",
      sorter: (a, b) => a.amount - b.amount,
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
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
      width: 180,
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
      title: "Additional notes",
      dataIndex: "additionalNotes",
      key: "additionalNotes",
      width: 250,
      render: (text: string) => (
        <Text
          ellipsis
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text}
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
            Transfer
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

      {/* Transfers Table Section */}
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
              All Transfers
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
        />
      </Card>

      {/* Modals */}
      {selectedTransfer && (
        <>
          <ViewModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Transfer Details"
            data={selectedTransfer}
          />
          <EditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit Transfer"
            data={selectedTransfer}
            onSave={async (_values) => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to update transfer
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Transfer updated successfully");
                setEditModalOpen(false);
              } catch (_error) {
                message.error("Failed to update transfer");
              } finally {
                setActionLoading(false);
              }
            }}
          />
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Transfer"
            message={`Are you sure you want to delete transfer "${selectedTransfer.referenceNo}"?`}
            onConfirm={async () => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to delete transfer
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setTransfers(transfers.filter((t) => t.key !== selectedTransfer.key));
                message.success("Transfer deleted successfully");
                setDeleteModalOpen(false);
              } catch (_error) {
                message.error("Failed to delete transfer");
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

export default Transfer;
