import React, { useState, useMemo } from "react";
import {
  Card,
  Button,
  Input,
  Space,
  Typography,
  Row,
  Col,
  Tree,
  Table,
  Tag,
} from "antd";
import type { DataNode } from "antd/es/tree";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  TableOutlined,
  FolderOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import { AddChartOfAccountModal, ViewModal, EditModal, DeleteModal } from "@/components/modals";
import type { ChartOfAccountFormData } from "@/components/modals";
import { message } from "antd";

const { Title, Text } = Typography;
const { Search } = Input;

interface AccountNode extends DataNode {
  title: string;
  key: string;
  balance?: number;
  children?: AccountNode[];
}

export interface ChartOfAccountTableData {
  key: string;
  name: string;
  glCode: string;
  parentAccount: string;
  accountType: string;
  accountSubType: string;
  detailType: string;
  primaryBalance: number | null;
  status: "Active" | "Inactive";
}

const ChartOfAccounts: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [viewMode, setViewMode] = useState<"tree" | "tabular">("tree");
  const [searchText, setSearchText] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [pageSize, setPageSize] = useState(25);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<ChartOfAccountTableData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Filter states for tabular view
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    accountType: {
      label: "Account Type:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Asset", value: "Asset" },
        { label: "Liability", value: "Liability" },
        { label: "Expenses", value: "Expenses" },
        { label: "Income", value: "Income" },
        { label: "Equity", value: "Equity" },
      ],
    },
    status: {
      label: "Status:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
  });

  // Tabular view data
  const defaultTableData: ChartOfAccountTableData[] = [
    {
      key: "1",
      name: "Accounts Payable (A/P)",
      glCode: "",
      parentAccount: "",
      accountType: "Liability",
      accountSubType: "Accounts Payable (A/P)",
      detailType: "",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "2",
      name: "Credit Card",
      glCode: "",
      parentAccount: "",
      accountType: "Liability",
      accountSubType: "Credit Card",
      detailType: "",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "3",
      name: "Short-term debit",
      glCode: "",
      parentAccount: "",
      accountType: "Liability",
      accountSubType: "Current liabilities",
      detailType: "",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "4",
      name: "Wage expenses",
      glCode: "",
      parentAccount: "",
      accountType: "Expenses",
      accountSubType: "Cost of sales",
      detailType: "Payroll Expenses",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "5",
      name: "Utilities",
      glCode: "",
      parentAccount: "",
      accountType: "Expenses",
      accountSubType: "Expenses",
      detailType: "Office/General Administrative Expenses",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "6",
      name: "Travel expenses",
      glCode: "",
      parentAccount: "",
      accountType: "Expenses",
      accountSubType: "Expenses",
      detailType: "Office/General Administrative Expenses",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "7",
      name: "Supplies",
      glCode: "",
      parentAccount: "",
      accountType: "Expenses",
      accountSubType: "Expenses",
      detailType: "Office/General Administrative Expenses",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "8",
      name: "Subcontractors",
      glCode: "",
      parentAccount: "",
      accountType: "Expenses",
      accountSubType: "Cost of sales",
      detailType: "",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "9",
      name: "Stationery and printing",
      glCode: "",
      parentAccount: "",
      accountType: "Expenses",
      accountSubType: "Expenses",
      detailType: "Office/General Administrative Expenses",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "10",
      name: "Shipping and delivery expense",
      glCode: "",
      parentAccount: "",
      accountType: "Expenses",
      accountSubType: "Expenses",
      detailType: "",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "11",
      name: "Uncategorised Expense",
      glCode: "",
      parentAccount: "",
      accountType: "Expenses",
      accountSubType: "Other Expense",
      detailType: "",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "12",
      name: "Unrealised loss on securities, net of tax",
      glCode: "",
      parentAccount: "",
      accountType: "Income",
      accountSubType: "Other income",
      detailType: "Unrealised loss on securities, net of tax",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "13",
      name: "Uncategorised Income",
      glCode: "",
      parentAccount: "",
      accountType: "Income",
      accountSubType: "Other income",
      detailType: "",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "14",
      name: "Unapplied Cash Payment Income",
      glCode: "",
      parentAccount: "",
      accountType: "Income",
      accountSubType: "Other income",
      detailType: "",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "15",
      name: "Sales of Product Income",
      glCode: "",
      parentAccount: "",
      accountType: "Income",
      accountSubType: "Income",
      detailType: "Sales of Product Income",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "16",
      name: "Sales - wholesale",
      glCode: "",
      parentAccount: "",
      accountType: "Income",
      accountSubType: "Income",
      detailType: "Sales of Product Income",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "17",
      name: "Sales - retail",
      glCode: "",
      parentAccount: "",
      accountType: "Income",
      accountSubType: "Income",
      detailType: "Sales of Product Income",
      primaryBalance: 4023000.00,
      status: "Active",
    },
    {
      key: "18",
      name: "Sales",
      glCode: "",
      parentAccount: "",
      accountType: "Income",
      accountSubType: "Income",
      detailType: "Sales of Product Income",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "19",
      name: "Revenue - General",
      glCode: "",
      parentAccount: "",
      accountType: "Income",
      accountSubType: "Income",
      detailType: "Sales of Product Income",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "20",
      name: "Undeposited Funds",
      glCode: "",
      parentAccount: "",
      accountType: "Asset",
      accountSubType: "Current assets",
      detailType: "",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "21",
      name: "Uncategorised Asset",
      glCode: "",
      parentAccount: "",
      accountType: "Asset",
      accountSubType: "Current assets",
      detailType: "",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "22",
      name: "Share capital",
      glCode: "",
      parentAccount: "",
      accountType: "Equity",
      accountSubType: "Owner's Equity",
      detailType: "",
      primaryBalance: null,
      status: "Active",
    },
    {
      key: "23",
      name: "Taxes Paid",
      glCode: "",
      parentAccount: "",
      accountType: "Expenses",
      accountSubType: "Expenses",
      detailType: "Taxes Paid",
      primaryBalance: null,
      status: "Active",
    },
  ];

  const [tableData, setTableData] = useState<ChartOfAccountTableData[]>(defaultTableData);

  // Tree data structure
  const treeData: AccountNode[] = [
    {
      title: "Asset",
      key: "asset",
      icon: <FolderOutlined />,
      children: [
        {
          title: "Accounts Receivable (A/R)",
          key: "asset-ar",
          icon: <FolderOutlined />,
          children: [
            {
              title: "Accounts Receivable (A/R) - TSh 180,000.00",
              key: "asset-ar-1",
              balance: 180000.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
          ],
        },
        {
          title: "Current assets",
          key: "asset-current",
          icon: <FolderOutlined />,
          children: [
            {
              title: "Cash and cash equivalents",
              key: "asset-current-cash",
              icon: <FolderOutlined />,
              children: [
                {
                  title: "Cash Account - TSh 1,200,000.00",
                  key: "asset-current-cash-1",
                  balance: 1200000.00,
                  icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
                },
                {
                  title: "Bank Account - TSh 5,500,000.00",
                  key: "asset-current-cash-2",
                  balance: 5500000.00,
                  icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
                },
              ],
            },
            {
              title: "Inventory - TSh 18,000,000.00",
              key: "asset-current-inventory",
              balance: 18000000.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
          ],
        },
        {
          title: "Fixed assets",
          key: "asset-fixed",
          icon: <FolderOutlined />,
          children: [
            {
              title: "Equipment - TSh 2,500,000.00",
              key: "asset-fixed-equipment",
              balance: 2500000.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
            {
              title: "Vehicles - TSh 3,200,000.00",
              key: "asset-fixed-vehicles",
              balance: 3200000.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
          ],
        },
        {
          title: "Non-current assets",
          key: "asset-noncurrent",
          icon: <FolderOutlined />,
          children: [
            {
              title: "Long-term Investments - TSh 1,500,000.00",
              key: "asset-noncurrent-investments",
              balance: 1500000.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
          ],
        },
      ],
    },
    {
      title: "Expenses",
      key: "expenses",
      icon: <FolderOutlined />,
      children: [
        {
          title: "Cost of sales",
          key: "expenses-cos",
          icon: <FolderOutlined />,
          children: [
            {
              title: "Cost of Goods Sold - TSh 0.00",
              key: "expenses-cos-1",
              balance: 0.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
          ],
        },
        {
          title: "Expenses",
          key: "expenses-main",
          icon: <FolderOutlined />,
          children: [
            {
              title: "Office Expenses - TSh 0.00",
              key: "expenses-main-office",
              balance: 0.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
            {
              title: "Utilities - TSh 0.00",
              key: "expenses-main-utilities",
              balance: 0.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
          ],
        },
        {
          title: "Other Expense",
          key: "expenses-other",
          icon: <FolderOutlined />,
          children: [
            {
              title: "Miscellaneous - TSh 0.00",
              key: "expenses-other-misc",
              balance: 0.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
          ],
        },
      ],
    },
    {
      title: "Income",
      key: "income",
      icon: <FolderOutlined />,
      children: [
        {
          title: "Income",
          key: "income-main",
          icon: <FolderOutlined />,
          children: [
            {
              title: "Sales Revenue - TSh 3,800,000.00",
              key: "income-main-sales",
              balance: 3800000.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
          ],
        },
        {
          title: "Other income",
          key: "income-other",
          icon: <FolderOutlined />,
          children: [
            {
              title: "Interest Income - TSh 223,000.00",
              key: "income-other-interest",
              balance: 223000.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
          ],
        },
      ],
    },
    {
      title: "Equity",
      key: "equity",
      icon: <FolderOutlined />,
      children: [
        {
          title: "Owner's Equity - TSh 26,783,400.00",
          key: "equity-owner",
          balance: 26783400.00,
          icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        },
      ],
    },
    {
      title: "Liability",
      key: "liability",
      icon: <FolderOutlined />,
      children: [
        {
          title: "Accounts Payable (A/P)",
          key: "liability-ap",
          icon: <FolderOutlined />,
          children: [
            {
              title: "Accounts Payable - TSh 0.00",
              key: "liability-ap-1",
              balance: 0.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
          ],
        },
        {
          title: "Credit Card",
          key: "liability-credit",
          icon: <FolderOutlined />,
          children: [
            {
              title: "Credit Card Account - TSh 0.00",
              key: "liability-credit-1",
              balance: 0.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
          ],
        },
        {
          title: "Current liabilities",
          key: "liability-current",
          icon: <FolderOutlined />,
          children: [
            {
              title: "Short-term Loans - TSh 0.00",
              key: "liability-current-loans",
              balance: 0.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
          ],
        },
        {
          title: "Non-current liabilities",
          key: "liability-noncurrent",
          icon: <FolderOutlined />,
          children: [
            {
              title: "Long-term Loans - TSh 0.00",
              key: "liability-noncurrent-loans",
              balance: 0.00,
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            },
          ],
        },
      ],
    },
  ];

  // Flatten tree to get all keys
  const getAllKeys = (nodes: AccountNode[]): React.Key[] => {
    let keys: React.Key[] = [];
    nodes.forEach((node) => {
      keys.push(node.key);
      if (node.children) {
        keys = keys.concat(getAllKeys(node.children));
      }
    });
    return keys;
  };

  const handleExpandAll = () => {
    const allKeys = getAllKeys(treeData);
    setExpandedKeys(allKeys);
    setAutoExpandParent(true);
  };

  const handleCollapseAll = () => {
    setExpandedKeys([]);
    setAutoExpandParent(false);
  };

  // Filter tree data based on search
  const filterTreeData = (nodes: AccountNode[], searchValue: string): AccountNode[] => {
    if (!searchValue) return nodes;

    const filtered: AccountNode[] = [];
    nodes.forEach((node) => {
      const matchesSearch = node.title.toLowerCase().includes(searchValue.toLowerCase());
      const filteredChildren = node.children ? filterTreeData(node.children, searchValue) : undefined;
      const hasMatchingChildren = filteredChildren && filteredChildren.length > 0;

      if (matchesSearch || hasMatchingChildren) {
        filtered.push({
          ...node,
          children: filteredChildren,
        });
      }
    });
    return filtered;
  };

  const filteredTreeData = useMemo(() => {
    return filterTreeData(treeData, searchText);
  }, [searchText]);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  // Filter table data
  const filteredTableData = useMemo(() => {
    let filtered = tableData;

    // Apply account type filter
    if (filterConfig.accountType?.value && filterConfig.accountType.value !== "all") {
      filtered = filtered.filter((item) => item.accountType === filterConfig.accountType?.value);
    }

    // Apply status filter
    if (filterConfig.status?.value && filterConfig.status.value !== "all") {
      filtered = filtered.filter((item) => item.status === filterConfig.status?.value);
    }

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.accountType.toLowerCase().includes(searchLower) ||
          item.accountSubType.toLowerCase().includes(searchLower) ||
          item.detailType.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [tableData, searchText, filterConfig]);

  const handleView = (record: ChartOfAccountTableData) => {
    setSelectedAccount(record);
    setViewModalOpen(true);
  };

  const handleEdit = (record: ChartOfAccountTableData) => {
    setSelectedAccount(record);
    setEditModalOpen(true);
  };

  const handleDelete = (record: ChartOfAccountTableData) => {
    setSelectedAccount(record);
    setDeleteModalOpen(true);
  };

  // Table columns
  const columns: ColumnsType<ChartOfAccountTableData> = [
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
      title: "General Ledger (GL) Code",
      dataIndex: "glCode",
      key: "glCode",
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
          }}
        >
          {text || "-"}
        </Text>
      ),
    },
    {
      title: "Parent Account",
      dataIndex: "parentAccount",
      key: "parentAccount",
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
          }}
        >
          {text || "-"}
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
      title: "Detail Type",
      dataIndex: "detailType",
      key: "detailType",
      sorter: (a, b) => (a.detailType || "").localeCompare(b.detailType || ""),
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
      title: "Primary Balance",
      dataIndex: "primaryBalance",
      key: "primaryBalance",
      align: "right",
      sorter: (a, b) => (a.primaryBalance || 0) - (b.primaryBalance || 0),
      render: (value: number | null) => (
        <Text
          style={{
            fontSize: "13px",
            color: value !== null ? (isDark ? "#fff" : "#1f1f1f") : (isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c"),
            fontWeight: value !== null ? 500 : 400,
          }}
        >
          {value !== null
            ? `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : "-"}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status: string) => (
        <Tag color="green">{status}</Tag>
      ),
    },
  ];

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
            Chart of accounts
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
              onClick={() => setAddModalOpen(true)}
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

      {/* View Mode Toggle */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
        bodyStyle={{ padding: "16px 24px" }}
      >
        <Space>
          <Button
            type={viewMode === "tree" ? "primary" : "default"}
            icon={<UnorderedListOutlined />}
            onClick={() => setViewMode("tree")}
          >
            Tree view
          </Button>
          <Button
            type={viewMode === "tabular" ? "primary" : "default"}
            icon={<TableOutlined />}
            onClick={() => setViewMode("tabular")}
          >
            Tabular view
          </Button>
        </Space>
      </Card>

      {/* Search and Action Bar - Tree View */}
      {viewMode === "tree" && (
        <Card
          style={{
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
          bodyStyle={{ padding: "16px 24px" }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={16} lg={18}>
              <Search
                placeholder="Search accounts..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={(value) => setSearchText(value)}
                style={{ width: "100%" }}
              />
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button onClick={handleExpandAll}>Expand all</Button>
                <Button onClick={handleCollapseAll}>Collapse all</Button>
              </Space>
            </Col>
          </Row>
        </Card>
      )}

      {/* Filters - Tabular View */}
      {viewMode === "tabular" && (
        <>
          <FilterPanel
            filters={filterConfig}
            onFilterChange={setFilterConfig}
            defaultExpanded={true}
          />
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
              marginBottom: "24px",
            }}
            bodyStyle={{ padding: "16px 24px" }}
          >
            <Search
              placeholder="Search accounts..."
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
              style={{ width: "100%" }}
            />
          </Card>
        </>
      )}

      {/* Tree View */}
      {viewMode === "tree" && (
        <Card
          style={{
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
          }}
          bodyStyle={{ padding: "24px" }}
        >
          <Tree
            showIcon
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onExpand={onExpand}
            treeData={filteredTreeData}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            }}
          />
        </Card>
      )}

      {/* Tabular View */}
      {viewMode === "tabular" && (
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
          <Table
            columns={columns}
            dataSource={filteredTableData}
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
      )}

      {/* Add Chart of Account Modal */}
      <AddChartOfAccountModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={async (values: ChartOfAccountFormData) => {
          setActionLoading(true);
          try {
            // Here you would typically make an API call to save the account
            // For now, we'll just add it to the table data
            const newAccount: ChartOfAccountTableData = {
              key: `new-${Date.now()}`,
              name: values.name,
              glCode: values.glCode || "",
              parentAccount: values.parentAccount || "",
              accountType: values.accountType,
              accountSubType: values.accountSubType,
              detailType: values.detailType,
              primaryBalance: values.balance || null,
              status: "Active",
            };
            setTableData([...tableData, newAccount]);
            message.success("Account added successfully");
            setAddModalOpen(false);
          } catch (error) {
            message.error("Failed to add account");
            console.error("Error adding account:", error);
          } finally {
            setActionLoading(false);
          }
        }}
        loading={actionLoading}
        parentAccounts={tableData.map((account) => ({
          label: account.name,
          value: account.name,
        }))}
      />

      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Account Details"
        data={selectedAccount}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Account"
        data={selectedAccount}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // Here you would typically make an API call to update the account
            message.success("Account updated successfully");
            setEditModalOpen(false);
          } catch (_error) {
            message.error("Failed to update account");
          } finally {
            setActionLoading(false);
          }
        }}
        loading={actionLoading}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Account"
        message={`Are you sure you want to delete account "${selectedAccount?.name}"?`}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // Here you would typically make an API call to delete the account
            if (selectedAccount) {
              setTableData(tableData.filter((item) => item.key !== selectedAccount.key));
            }
            message.success("Account deleted successfully");
            setDeleteModalOpen(false);
          } catch (_error) {
            message.error("Failed to delete account");
          } finally {
            setActionLoading(false);
          }
        }}
        loading={actionLoading}
      />
    </div>
  );
};

export default ChartOfAccounts;

