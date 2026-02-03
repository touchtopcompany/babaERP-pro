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
  Alert,
  Tabs,
  Modal,
  Form,
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
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";
import AddAccountModal from "@/components/modals/AddAccountModal";
import type { AccountFormData } from "@/components/modals/AddAccountModal";

const { Title, Text } = Typography;
const { Search } = Input;

export interface AccountData {
  key: string;
  name: string;
  accountType: string;
  accountSubType: string;
  accountNumber: string;
  note?: string;
  balance: number;
  accountDetails?: string;
  addedBy: string;
}

export interface AccountTypeData {
  key: string;
  accountType: string;
  accountTypeCode: string;
}

const ListAccounts: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [accountTypeSearchText, setAccountTypeSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("accounts");
  const [statusFilter, setStatusFilter] = useState("active");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addAccountTypeModalOpen, setAddAccountTypeModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [accountTypePageSize, setAccountTypePageSize] = useState(25);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    name: true,
    accountType: true,
    accountSubType: true,
    accountNumber: true,
    note: true,
    balance: true,
    accountDetails: true,
    addedBy: true,
    action: true,
  });

  // Mock data - replace with API call
  const defaultAccounts: AccountData[] = [
    {
      key: "1",
      name: "Main Business Account",
      accountType: "Bank Account",
      accountSubType: "Current Account",
      accountNumber: "ACC-001",
      note: "Primary business account",
      balance: 2500000.00,
      accountDetails: "Bank: NMB, Branch: Dar es Salaam",
      addedBy: "Admin User",
    },
    {
      key: "2",
      name: "Savings Account",
      accountType: "Bank Account",
      accountSubType: "Savings Account",
      accountNumber: "ACC-002",
      note: "Emergency fund account",
      balance: 1500000.00,
      accountDetails: "Bank: CRDB, Branch: Arusha",
      addedBy: "John Doe",
    },
    {
      key: "3",
      name: "Cash Account",
      accountType: "Cash",
      accountSubType: "Petty Cash",
      accountNumber: "ACC-003",
      note: "Daily cash transactions",
      balance: 500000.00,
      accountDetails: "Location: Main Office",
      addedBy: "Jane Smith",
    },
    {
      key: "4",
      name: "Mobile Money - M-Pesa",
      accountType: "Mobile Money",
      accountSubType: "M-Pesa",
      accountNumber: "ACC-004",
      note: "Mobile payment account",
      balance: 750000.00,
      accountDetails: "Phone: +255 123 456 789",
      addedBy: "Mike Johnson",
    },
    {
      key: "5",
      name: "Mobile Money - Tigo Pesa",
      accountType: "Mobile Money",
      accountSubType: "Tigo Pesa",
      accountNumber: "ACC-005",
      note: "Alternative mobile payment",
      balance: 300000.00,
      accountDetails: "Phone: +255 987 654 321",
      addedBy: "Sarah Williams",
    },
    {
      key: "6",
      name: "Credit Card Account",
      accountType: "Credit Card",
      accountSubType: "Business Credit Card",
      accountNumber: "ACC-006",
      note: "Business credit card",
      balance: -250000.00,
      accountDetails: "Card: **** 1234, Bank: NMB",
      addedBy: "David Brown",
    },
    {
      key: "7",
      name: "Investment Account",
      accountType: "Bank Account",
      accountSubType: "Fixed Deposit",
      accountNumber: "ACC-007",
      note: "Long-term investment",
      balance: 5000000.00,
      accountDetails: "Bank: Equity Bank, Maturity: 12 months",
      addedBy: "Emily Davis",
    },
    {
      key: "8",
      name: "PayPal Account",
      accountType: "Online Payment",
      accountSubType: "PayPal",
      accountNumber: "ACC-008",
      note: "International payments",
      balance: 1200000.00,
      accountDetails: "Email: payments@company.com",
      addedBy: "Robert Miller",
    },
    {
      key: "9",
      name: "Visa Card Account",
      accountType: "Credit Card",
      accountSubType: "Visa Business",
      accountNumber: "ACC-009",
      note: "International transactions",
      balance: -150000.00,
      accountDetails: "Card: **** 5678, Bank: CRDB",
      addedBy: "Lisa Anderson",
    },
    {
      key: "10",
      name: "Loan Account",
      accountType: "Loan",
      accountSubType: "Business Loan",
      accountNumber: "ACC-010",
      note: "Business expansion loan",
      balance: -5000000.00,
      accountDetails: "Bank: NMB, Interest: 12% p.a.",
      addedBy: "James Wilson",
    },
    {
      key: "11",
      name: "Airtel Money",
      accountType: "Mobile Money",
      accountSubType: "Airtel Money",
      accountNumber: "ACC-011",
      note: "Mobile payment option",
      balance: 200000.00,
      accountDetails: "Phone: +255 111 222 333",
      addedBy: "Patricia Taylor",
    },
    {
      key: "12",
      name: "Payoneer Account",
      accountType: "Online Payment",
      accountSubType: "Payoneer",
      accountNumber: "ACC-012",
      note: "Freelance payments",
      balance: 800000.00,
      accountDetails: "Email: freelance@company.com",
      addedBy: "Michael Brown",
    },
    {
      key: "13",
      name: "Wise Account",
      accountType: "Online Payment",
      accountSubType: "Wise",
      accountNumber: "ACC-013",
      note: "International transfers",
      balance: 950000.00,
      accountDetails: "Email: transfers@company.com",
      addedBy: "Jennifer Lee",
    },
    {
      key: "14",
      name: "Stripe Account",
      accountType: "Online Payment",
      accountSubType: "Stripe",
      accountNumber: "ACC-014",
      note: "Online payment processing",
      balance: 650000.00,
      accountDetails: "Account ID: acct_123456",
      addedBy: "Christopher Green",
    },
    {
      key: "15",
      name: "Mastercard Account",
      accountType: "Credit Card",
      accountSubType: "Mastercard Business",
      accountNumber: "ACC-015",
      note: "Business expenses card",
      balance: -80000.00,
      accountDetails: "Card: **** 9012, Bank: Equity",
      addedBy: "Amanda White",
    },
  ];

  const [accounts, setAccounts] = useState<AccountData[]>(defaultAccounts);

  // Account Types data
  const defaultAccountTypes: AccountTypeData[] = [
    {
      key: "1",
      accountType: "Bank Account",
      accountTypeCode: "BANK-001",
    },
    {
      key: "2",
      accountType: "Cash",
      accountTypeCode: "CASH-001",
    },
    {
      key: "3",
      accountType: "Mobile Money",
      accountTypeCode: "MOBILE-001",
    },
    {
      key: "4",
      accountType: "Credit Card",
      accountTypeCode: "CC-001",
    },
    {
      key: "5",
      accountType: "Online Payment",
      accountTypeCode: "ONLINE-001",
    },
    {
      key: "6",
      accountType: "Loan",
      accountTypeCode: "LOAN-001",
    },
    {
      key: "7",
      accountType: "Investment",
      accountTypeCode: "INV-001",
    },
    {
      key: "8",
      accountType: "Savings",
      accountTypeCode: "SAV-001",
    },
  ];

  const [accountTypes, setAccountTypes] = useState<AccountTypeData[]>(defaultAccountTypes);

  // Filter account types based on search text
  const filteredAccountTypes = useMemo(() => {
    let filtered = accountTypes;

    if (accountTypeSearchText) {
      const searchLower = accountTypeSearchText.toLowerCase();
      filtered = filtered.filter(
        (type) =>
          type.accountType.toLowerCase().includes(searchLower) ||
          type.accountTypeCode.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [accountTypes, accountTypeSearchText]);

  // Filter accounts based on search text and status
  const filteredAccounts = useMemo(() => {
    let filtered = accounts;

    // Apply status filter
    if (statusFilter === "active") {
      // For now, all accounts are considered active
      // You can add an 'active' field to AccountData if needed
    }

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (account) =>
          account.name.toLowerCase().includes(searchLower) ||
          account.accountType.toLowerCase().includes(searchLower) ||
          account.accountSubType.toLowerCase().includes(searchLower) ||
          account.accountNumber.toLowerCase().includes(searchLower) ||
          (account.note && account.note.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [accounts, searchText, statusFilter]);

  // Calculate total balance
  const totalBalance = useMemo(() => {
    return filteredAccounts.reduce((sum, account) => sum + account.balance, 0);
  }, [filteredAccounts]);

  const handleAddAccount = () => {
    setAddModalOpen(true);
  };

  const handleSaveAccount = async (values: AccountFormData) => {
    setActionLoading(true);
    try {
      // TODO: Implement API call to create account
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Generate account details string from the array
      const accountDetailsStr = values.accountDetails
        .map((detail) => `${detail.label}: ${detail.value}`)
        .join(", ");

      // Generate a new key for the account
      const newKey = String(accounts.length + 1);
      const newAccount: AccountData = {
        key: newKey,
        name: values.name,
        accountType: values.accountType || "Bank Account",
        accountSubType: values.accountType || "Current Account",
        accountNumber: values.accountNumber,
        note: values.note,
        balance: values.openingBalance,
        accountDetails: accountDetailsStr || undefined,
        addedBy: "Current User", // TODO: Get from auth context
      };
      
      setAccounts([...accounts, newAccount]);
      message.success("Account added successfully");
      setAddModalOpen(false);
    } catch (_error) {
      message.error("Failed to add account");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddAccountType = () => {
    setAddAccountTypeModalOpen(true);
  };

  const handleSaveAccountType = async (values: { accountType: string; accountTypeCode?: string }) => {
    setActionLoading(true);
    try {
      // TODO: Implement API call to create account type
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newKey = String(accountTypes.length + 1);
      const newAccountType: AccountTypeData = {
        key: newKey,
        accountType: values.accountType,
        accountTypeCode: values.accountTypeCode || `TYPE-${String(accountTypes.length + 1).padStart(3, "0")}`,
      };
      
      setAccountTypes([...accountTypes, newAccountType]);
      message.success("Account type added successfully");
      setAddAccountTypeModalOpen(false);
    } catch (_error) {
      message.error("Failed to add account type");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Accounts refreshed successfully");
    }, 1000);
  };

  const handleViewDetails = () => {
    navigate("/payment-accounts/payment-account-report");
  };

  const handleView = (record: AccountData) => {
    setSelectedAccount(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: AccountData) => {
    setSelectedAccount(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: AccountData) => {
    setSelectedAccount(record);
    setDeleteModalOpen(true);
  };

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Account Type",
      "Account Sub Type",
      "Account Number",
      "Note",
      "Balance",
      "Account details",
      "Added By",
    ];
    const csvData = filteredAccounts.map((account) => [
      account.name,
      account.accountType,
      account.accountSubType,
      account.accountNumber,
      account.note || "",
      account.balance,
      account.accountDetails || "",
      account.addedBy,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `accounts_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Accounts exported to CSV successfully");
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
          <title>Accounts Report</title>
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
          <h1>Accounts Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Account Type</th>
                <th>Account Sub Type</th>
                <th>Account Number</th>
                <th>Balance</th>
                <th>Added By</th>
              </tr>
            </thead>
            <tbody>
              ${filteredAccounts
                .map(
                  (account) => `
                <tr>
                  <td>${account.name}</td>
                  <td>${account.accountType}</td>
                  <td>${account.accountSubType}</td>
                  <td>${account.accountNumber}</td>
                  <td>TSh ${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td>${account.addedBy}</td>
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

  const columns: ColumnsType<AccountData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "#fff" : "#1f1f1f",
            fontWeight: 500,
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      key: "accountType",
      sorter: (a, b) => a.accountType.localeCompare(b.accountType),
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
      title: "Account Sub Type",
      dataIndex: "accountSubType",
      key: "accountSubType",
      sorter: (a, b) => a.accountSubType.localeCompare(b.accountSubType),
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
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      sorter: (a, b) => a.accountNumber.localeCompare(b.accountNumber),
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
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (text: string) => (
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
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      align: "right",
      sorter: (a, b) => a.balance - b.balance,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: value < 0 ? "#ff4d4f" : isDark ? "rgba(255,255,255,0.85)" : "#595959",
            fontWeight: value < 0 ? 500 : 400,
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "Account details",
      dataIndex: "accountDetails",
      key: "accountDetails",
      render: (text: string) => (
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
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
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
            Payment Accounts
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Manage your account
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
              onClick={handleAddAccount}
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

      {/* Warning Banner */}
      <Alert
        message={
          <Space>
            <ExclamationCircleOutlined />
            <span>Total 8 payments not linked with any account.</span>
            <Button
              type="link"
              onClick={handleViewDetails}
              style={{
                padding: 0,
                height: "auto",
                fontSize: "14px",
              }}
            >
              View Details
            </Button>
          </Space>
        }
        type="warning"
        showIcon
        closable
        style={{
          marginBottom: "24px",
          borderRadius: "6px",
        }}
      />

      {/* Tabs */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "24px",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{
            padding: "0 24px",
          }}
          items={[
            {
              key: "accounts",
              label: "Accounts",
            },
            {
              key: "account-types",
              label: "Account Types",
            },
          ]}
        />
      </Card>

      {/* Filter and Table Section */}
      {activeTab === "accounts" && (
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
          {/* Filter and Controls */}
          <Row gutter={[16, 16]} style={{ marginBottom: "16px" }} align="middle">
            <Col xs={24} sm={24} md={6} lg={4}>
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: "100%" }}
                suffixIcon={<DownOutlined />}
              >
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
                <Select.Option value="all">All</Select.Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={18} lg={20}>
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
            dataSource={filteredAccounts}
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
                    <Table.Summary.Cell index={0} colSpan={visibleColumns.length - 1}>
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
                    <Table.Summary.Cell index={1} align="right">
                      <Text
                        strong
                        style={{
                          fontSize: "14px",
                          color: totalBalance < 0 ? "#ff4d4f" : isDark ? "#fff" : "#1f1f1f",
                        }}
                      >
                        TSh {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              );
            }}
          />
        </Card>
      )}

      {/* Account Types Tab Content */}
      {activeTab === "account-types" && (
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
            <Col xs={24} sm={24} md={12} lg={12}>
              <Title
                level={4}
                style={{
                  margin: 0,
                  color: isDark ? "#fff" : "#1f1f1f",
                  fontWeight: 600,
                }}
              >
                All your account types
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
                <Select
                  value={accountTypePageSize}
                  onChange={setAccountTypePageSize}
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
                  onClick={() => {
                    const headers = ["Account Type", "Account Type Code"];
                    const csvData = filteredAccountTypes.map((type) => [
                      type.accountType,
                      type.accountTypeCode,
                    ]);
                    const csvContent = [
                      headers.join(","),
                      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
                    ].join("\n");
                    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                    const link = document.createElement("a");
                    const url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", `account_types_${new Date().toISOString().split("T")[0]}.csv`);
                    link.style.visibility = "hidden";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    message.success("Account types exported to CSV successfully");
                  }}
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
                  onClick={() => {
                    message.info("Excel export will be available soon. Exporting as CSV for now.");
                  }}
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
                  onClick={() => {
                    message.info("Print functionality coming soon");
                  }}
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
                <Button
                  icon={<FilePdfOutlined />}
                  onClick={() => {
                    message.info("PDF export functionality coming soon");
                  }}
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
                  value={accountTypeSearchText}
                  onChange={(e) => setAccountTypeSearchText(e.target.value)}
                  onSearch={(value) => setAccountTypeSearchText(value)}
                  style={{
                    width: 200,
                  }}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddAccountType}
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

          <Table
            columns={[
              {
                title: "Account Type",
                dataIndex: "accountType",
                key: "accountType",
                sorter: (a, b) => a.accountType.localeCompare(b.accountType),
                render: (text: string) => (
                  <Text
                    style={{
                      fontSize: "13px",
                      color: isDark ? "#fff" : "#1f1f1f",
                      fontWeight: 500,
                    }}
                  >
                    {text}
                  </Text>
                ),
              },
              {
                title: "Account Type Code",
                dataIndex: "accountTypeCode",
                key: "accountTypeCode",
                sorter: (a, b) => a.accountTypeCode.localeCompare(b.accountTypeCode),
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
                        message.info("View functionality coming soon");
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
                        message.info("Edit functionality coming soon");
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
                        setAccountTypes((prev) => prev.filter((t) => t.key !== record.key));
                        message.success("Account type deleted successfully");
                      }}
                      danger
                      style={{
                        color: isDark ? "rgba(255,255,255,0.85)" : "#ff4d4f",
                      }}
                    />
                  </Space>
                ),
              },
            ]}
            dataSource={filteredAccountTypes}
            loading={loading}
            scroll={{ x: "max-content" }}
            pagination={{
              pageSize: accountTypePageSize,
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
      )}

      {/* Add Account Modal */}
      <AddAccountModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSaveAccount}
        loading={actionLoading}
      />

      {/* Add Account Type Modal - Using AddModal pattern */}
      {addAccountTypeModalOpen && (
        <Modal
          open={addAccountTypeModalOpen}
          onCancel={() => setAddAccountTypeModalOpen(false)}
          footer={null}
          title="Add Account Type"
          width={600}
        >
          <Form
            onFinish={async (values) => {
              await handleSaveAccountType(values);
            }}
            layout="vertical"
          >
            <Form.Item
              label="Account Type:"
              name="accountType"
              rules={[{ required: true, message: "Please enter account type" }]}
            >
              <Input placeholder="Account Type" />
            </Form.Item>
            <Form.Item label="Account Type Code:" name="accountTypeCode">
              <Input placeholder="Account Type Code" />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button onClick={() => setAddAccountTypeModalOpen(false)}>Close</Button>
                <Button type="primary" htmlType="submit" loading={actionLoading}>
                  Save
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {/* Modals */}
      {selectedAccount && (
        <>
          <ViewModal
            open={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            title="Account Details"
            data={selectedAccount}
          />
          <EditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            title="Edit Account"
            data={selectedAccount}
            onSave={async (_values) => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to update account
                await new Promise((resolve) => setTimeout(resolve, 1000));
                message.success("Account updated successfully");
                setEditModalOpen(false);
              } catch (_error) {
                message.error("Failed to update account");
              } finally {
                setActionLoading(false);
              }
            }}
          />
          <DeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Account"
            message={`Are you sure you want to delete account "${selectedAccount.name}"?`}
            onConfirm={async () => {
              setActionLoading(true);
              try {
                // TODO: Implement API call to delete account
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setAccounts(accounts.filter((a) => a.key !== selectedAccount.key));
                message.success("Account deleted successfully");
                setDeleteModalOpen(false);
              } catch (_error) {
                message.error("Failed to delete account");
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

export default ListAccounts;

