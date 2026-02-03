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
  Checkbox,
  Select,
  Collapse,
  Divider,
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

const { Title, Text } = Typography;
const { Search } = Input;

export interface CustomerData {
  key: string;
  contactId: string;
  businessName: string;
  name: string;
  email: string;
  taxNumber: string;
  creditLimit: string;
  payTerm: string;
  openingBalance: number;
  advanceBalance: number;
  addedOn: string;
  customerGroup: string;
  address: string;
  mobile: string;
  totalSaleDue: number;
  totalSellReturnDue: number;
  customField1?: string;
  customField2?: string;
  customField3?: string;
  customField4?: string;
  customField5?: string;
  customField6?: string;
  customField7?: string;
  customField8?: string;
  customField9?: string;
  customField10?: string;
  assignedTo?: string;
  status?: string;
  hasNoSellFrom?: string;
}

const Customers: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  
  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    sellDue: {
      label: "Sell Due",
      value: false,
    },
    sellReturn: {
      label: "Sell Return",
      value: false,
    },
    advanceBalance: {
      label: "Advance Balance",
      value: false,
    },
    openingBalance: {
      label: "Opening Balance",
      value: false,
    },
    hasNoSellFrom: {
      label: "Has no sell from:",
      value: undefined,
      options: [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ],
      allowClear: true,
      placeholder: "Please Select",
    },
    customerGroup: {
      label: "Customer Group:",
      value: undefined,
      options: [
        { label: "Group 1", value: "group1" },
        { label: "Group 2", value: "group2" },
      ],
      allowClear: true,
      placeholder: "None",
    },
    assignedTo: {
      label: "Assigned to:",
      value: undefined,
      options: [
        { label: "User 1", value: "User 1" },
        { label: "User 2", value: "User 2" },
      ],
      allowClear: true,
      placeholder: "None",
    },
    status: {
      label: "Status:",
      value: undefined,
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
      allowClear: true,
      placeholder: "None",
    },
  });

  // Convert FilterConfig to filters object for filtering logic
  const filters = {
    sellDue: filterConfig.sellDue?.value || false,
    sellReturn: filterConfig.sellReturn?.value || false,
    advanceBalance: filterConfig.advanceBalance?.value || false,
    openingBalance: filterConfig.openingBalance?.value || false,
    hasNoSellFrom: filterConfig.hasNoSellFrom?.value,
    customerGroup: filterConfig.customerGroup?.value,
    assignedTo: filterConfig.assignedTo?.value,
    status: filterConfig.status?.value,
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    action: true,
    contactId: true,
    businessName: true,
    name: true,
    email: true,
    taxNumber: true,
    creditLimit: true,
    payTerm: true,
    openingBalance: true,
    advanceBalance: true,
    addedOn: true,
    customerGroup: true,
    address: true,
    mobile: true,
    totalSaleDue: true,
    totalSellReturnDue: true,
    customField1: false,
    customField2: false,
    customField3: false,
    customField4: false,
    customField5: false,
    customField6: false,
    customField7: false,
    customField8: false,
    customField9: false,
    customField10: false,
  });

  // Mock data - replace with API call
  const defaultCustomers: CustomerData[] = [
    {
      key: "1",
      contactId: "CO0001",
      businessName: "",
      name: "Kamgisha customer",
      email: "",
      taxNumber: "",
      creditLimit: "No Limit",
      payTerm: "",
      openingBalance: 0.00,
      advanceBalance: 0.00,
      addedOn: "10/14/2025",
      customerGroup: "",
      address: "",
      mobile: "0765917527",
      totalSaleDue: 180000.00,
      totalSellReturnDue: 0.00,
      assignedTo: "User 1",
      status: "Active",
    },
    {
      key: "2",
      contactId: "CO0002",
      businessName: "",
      name: "Customers",
      email: "",
      taxNumber: "",
      creditLimit: "No Limit",
      payTerm: "",
      openingBalance: 0.00,
      advanceBalance: 0.00,
      addedOn: "10/14/2025",
      customerGroup: "",
      address: "",
      mobile: "",
      totalSaleDue: 0.00,
      totalSellReturnDue: 0.00,
      assignedTo: "User 2",
      status: "Active",
    },
  ];

  const [customers, setCustomers] = useState<CustomerData[]>(defaultCustomers);

  // Filter customers based on search text and filters
  const filteredCustomers = useMemo(() => {
    let filtered = customers;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (customer) =>
          customer.contactId.toLowerCase().includes(searchLower) ||
          customer.businessName.toLowerCase().includes(searchLower) ||
          customer.name.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower) ||
          customer.mobile.toLowerCase().includes(searchLower)
      );
    }

    // Apply checkbox filters
    if (filters.sellDue) {
      filtered = filtered.filter((c) => c.totalSaleDue > 0);
    }
    if (filters.sellReturn) {
      filtered = filtered.filter((c) => c.totalSellReturnDue > 0);
    }
    if (filters.advanceBalance) {
      filtered = filtered.filter((c) => c.advanceBalance > 0);
    }
    if (filters.openingBalance) {
      filtered = filtered.filter((c) => c.openingBalance > 0);
    }

    // Apply dropdown filters
    if (filters.hasNoSellFrom) {
      filtered = filtered.filter((c) => c.hasNoSellFrom === filters.hasNoSellFrom);
    }
    if (filters.customerGroup) {
      filtered = filtered.filter((c) => c.customerGroup === filters.customerGroup);
    }
    if (filters.assignedTo) {
      filtered = filtered.filter((c) => c.assignedTo === filters.assignedTo);
    }
    if (filters.status) {
      filtered = filtered.filter((c) => c.status === filters.status);
    }

    return filtered;
  }, [customers, searchText, filters]);

  // Calculate totals
  const totals = useMemo(() => {
    return {
      totalSaleDue: filteredCustomers.reduce((sum, c) => sum + c.totalSaleDue, 0),
      totalSellReturnDue: filteredCustomers.reduce((sum, c) => sum + c.totalSellReturnDue, 0),
    };
  }, [filteredCustomers]);

  const handleAddCustomer = () => {
    // TODO: Navigate to add customer page or open add customer modal
    message.info("Add customer functionality coming soon");
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh customers
    setTimeout(() => {
      setLoading(false);
      message.success("Customers refreshed successfully");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = [
      "Contact ID",
      "Business Name",
      "Name",
      "Email",
      "Tax Number",
      "Credit Limit",
      "Pay Term",
      "Opening Balance",
      "Advance Balance",
      "Added On",
      "Customer Group",
      "Address",
      "Mobile",
      "Total Sale Due",
      "Total Sell Return Due",
    ];
    const csvData = filteredCustomers.map((customer) => [
      customer.contactId,
      customer.businessName,
      customer.name,
      customer.email,
      customer.taxNumber,
      customer.creditLimit,
      customer.payTerm,
      customer.openingBalance.toFixed(2),
      customer.advanceBalance.toFixed(2),
      customer.addedOn,
      customer.customerGroup,
      customer.address,
      customer.mobile,
      customer.totalSaleDue.toFixed(2),
      customer.totalSellReturnDue.toFixed(2),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `customers_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Customers exported to CSV successfully");
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
          <title>Customers Report</title>
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
          <h1>Customers Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Contact ID</th>
                <th>Business Name</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Total Sale Due</th>
                <th>Total Sell Return Due</th>
              </tr>
            </thead>
            <tbody>
              ${filteredCustomers
                .map(
                  (customer) => `
                <tr>
                  <td>${customer.contactId}</td>
                  <td>${customer.businessName}</td>
                  <td>${customer.name}</td>
                  <td>${customer.email}</td>
                  <td>${customer.mobile}</td>
                  <td>${customer.totalSaleDue.toFixed(2)}</td>
                  <td>${customer.totalSellReturnDue.toFixed(2)}</td>
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
        <Checkbox
          checked={columnVisibility[key]}
          onChange={(e) => handleColumnVisibilityChange(key, e.target.checked)}
        >
          {key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .trim()}
        </Checkbox>
      ),
    })),
  };

  const columns: ColumnsType<CustomerData> = [
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
              setSelectedCustomer(record);
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
              setSelectedCustomer(record);
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
              setSelectedCustomer(record);
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
      title: "Contact ID",
      dataIndex: "contactId",
      key: "contactId",
      width: 120,
      sorter: (a, b) => a.contactId.localeCompare(b.contactId),
    },
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
      width: 200,
      sorter: (a, b) => a.businessName.localeCompare(b.businessName),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Tax number",
      dataIndex: "taxNumber",
      key: "taxNumber",
      width: 150,
    },
    {
      title: "Credit Limit",
      dataIndex: "creditLimit",
      key: "creditLimit",
      width: 150,
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text || "No Limit"}
        </Text>
      ),
    },
    {
      title: "Pay term",
      dataIndex: "payTerm",
      key: "payTerm",
      width: 120,
    },
    {
      title: "Opening Balance",
      dataIndex: "openingBalance",
      key: "openingBalance",
      width: 150,
      align: "right",
      sorter: (a, b) => a.openingBalance - b.openingBalance,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Advance Balance",
      dataIndex: "advanceBalance",
      key: "advanceBalance",
      width: 150,
      align: "right",
      sorter: (a, b) => a.advanceBalance - b.advanceBalance,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Added On",
      dataIndex: "addedOn",
      key: "addedOn",
      width: 120,
      sorter: (a, b) => new Date(a.addedOn).getTime() - new Date(b.addedOn).getTime(),
    },
    {
      title: "Customer Group",
      dataIndex: "customerGroup",
      key: "customerGroup",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      width: 150,
    },
    {
      title: "Total Sale Due",
      dataIndex: "totalSaleDue",
      key: "totalSaleDue",
      width: 180,
      align: "right",
      sorter: (a, b) => a.totalSaleDue - b.totalSaleDue,
      render: (value: number) => (
        <Text
          strong
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Total Sell Return Due",
      dataIndex: "totalSellReturnDue",
      key: "totalSellReturnDue",
      width: 220,
      align: "right",
      sorter: (a, b) => a.totalSellReturnDue - b.totalSellReturnDue,
      render: (value: number) => (
        <Text
          strong
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Custom Field 1",
      dataIndex: "customField1",
      key: "customField1",
      width: 150,
    },
    {
      title: "Custom Field 2",
      dataIndex: "customField2",
      key: "customField2",
      width: 150,
    },
    {
      title: "Custom Field 3",
      dataIndex: "customField3",
      key: "customField3",
      width: 150,
    },
    {
      title: "Custom Field 4",
      dataIndex: "customField4",
      key: "customField4",
      width: 150,
    },
    {
      title: "Custom Field 5",
      dataIndex: "customField5",
      key: "customField5",
      width: 150,
    },
    {
      title: "Custom Field 6",
      dataIndex: "customField6",
      key: "customField6",
      width: 150,
    },
    {
      title: "Custom Field 7",
      dataIndex: "customField7",
      key: "customField7",
      width: 150,
    },
    {
      title: "Custom Field 8",
      dataIndex: "customField8",
      key: "customField8",
      width: 150,
    },
    {
      title: "Custom Field 9",
      dataIndex: "customField9",
      key: "customField9",
      width: 150,
    },
    {
      title: "Custom Field 10",
      dataIndex: "customField10",
      key: "customField10",
      width: 150,
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
            Customers
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Manage your Customers
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
              onClick={handleAddCustomer}
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

      <Divider style={{ margin: "24px 0" }} />

      {/* All your Customers Section */}
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
              All your Customers
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
          .customers-table .ant-table-thead > tr > th {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .customers-table .ant-table-thead > tr > th:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .customers-table .ant-table-thead > tr > th:first-child {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "#1890ff"} !important;
            color: ${isDark ? "rgba(255,255,255,0.85)" : "#fff"} !important;
          }
          .customers-table .ant-table-thead > tr > th:first-child:hover {
            background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
          }
          .customers-table .ant-table-tbody > tr {
            transition: all 0.2s ease;
          }
          .customers-table .ant-table-tbody > tr:hover > td {
            background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
          }
          .customers-table .ant-table-tbody > tr:hover {
            transform: translateY(-1px);
            box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
          }
          .customers-table .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.85)"} !important;
          }
          .customers-table .ant-table-column-sorted .ant-table-column-sorter-up,
          .customers-table .ant-table-column-sorted .ant-table-column-sorter-down,
          .customers-table .ant-table-column-sorter-up.on,
          .customers-table .ant-table-column-sorter-down.on,
          .customers-table .ant-table-column-sorter-up.active,
          .customers-table .ant-table-column-sorter-down.active {
            color: ${isDark ? "#fff" : "#fff"} !important;
            opacity: 1 !important;
          }
          .customers-table .ant-table-thead > tr > th:first-child .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.85)"} !important;
          }
          .customers-table .ant-table-thead > tr > th:nth-child(2) .ant-table-column-sorter {
            color: ${isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)"} !important;
          }
          .customers-table .ant-table-thead > tr > th:nth-child(2).ant-table-column-sorted .ant-table-column-sorter-up,
          .customers-table .ant-table-thead > tr > th:nth-child(2).ant-table-column-sorted .ant-table-column-sorter-down,
          .customers-table .ant-table-thead > tr > th:nth-child(2) .ant-table-column-sorter-up.on,
          .customers-table .ant-table-thead > tr > th:nth-child(2) .ant-table-column-sorter-down.on,
          .customers-table .ant-table-thead > tr > th:nth-child(2) .ant-table-column-sorter-up.active,
          .customers-table .ant-table-thead > tr > th:nth-child(2) .ant-table-column-sorter-down.active {
            color: ${isDark ? "rgba(255,255,255,0.85)" : "#1890ff"} !important;
            opacity: 1 !important;
          }
        `}</style>
        <Table
          className="customers-table"
          columns={visibleColumns}
          dataSource={filteredCustomers}
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
          scroll={{ x: "max-content" }}
          style={{
            background: isDark ? "transparent" : "#fafafa",
          }}
          summary={(_pageData) => {
            // Find indices of Total Sale Due and Total Sell Return Due columns
            const saleDueIndex = visibleColumns.findIndex((col) => col.key === "totalSaleDue");
            const sellReturnIndex = visibleColumns.findIndex((col) => col.key === "totalSellReturnDue");
            
            if (saleDueIndex === -1 || sellReturnIndex === -1) {
              return null;
            }

            // Calculate colspan for cells before the totals
            const colSpanBefore = saleDueIndex;
            const colSpanBetween = sellReturnIndex - saleDueIndex - 1;
            const colSpanAfter = visibleColumns.length - sellReturnIndex - 1;

            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={colSpanBefore}>
                    <Text strong>Total:</Text>
                  </Table.Summary.Cell>
                  {colSpanBetween > 0 && (
                    <Table.Summary.Cell index={saleDueIndex} colSpan={colSpanBetween} />
                  )}
                  <Table.Summary.Cell index={saleDueIndex} align="right">
                    <Text strong>TSh {totals.totalSaleDue.toFixed(2)}</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={sellReturnIndex} align="right">
                    <Text strong>TSh {totals.totalSellReturnDue.toFixed(2)}</Text>
                  </Table.Summary.Cell>
                  {colSpanAfter > 0 && (
                    <Table.Summary.Cell index={sellReturnIndex + 1} colSpan={colSpanAfter} />
                  )}
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
          setSelectedCustomer(null);
        }}
        title="Customer Details"
        data={selectedCustomer}
        fields={[
          { key: "contactId", label: "Contact ID" },
          { key: "businessName", label: "Business Name" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "taxNumber", label: "Tax Number" },
          { key: "creditLimit", label: "Credit Limit" },
          { key: "payTerm", label: "Pay Term" },
          { key: "openingBalance", label: "Opening Balance" },
          { key: "advanceBalance", label: "Advance Balance" },
          { key: "addedOn", label: "Added On" },
          { key: "customerGroup", label: "Customer Group" },
          { key: "address", label: "Address" },
          { key: "mobile", label: "Mobile" },
          { key: "totalSaleDue", label: "Total Sale Due" },
          { key: "totalSellReturnDue", label: "Total Sell Return Due" },
        ]}
        width={600}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedCustomer(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update customer
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Customer updated successfully");
            setEditModalOpen(false);
            setSelectedCustomer(null);
          } catch (_error) {
            message.error("Failed to update customer");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit Customer"
        data={selectedCustomer}
        fields={[
          { name: "businessName", label: "Business Name", type: "text" },
          { name: "name", label: "Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email" },
          { name: "taxNumber", label: "Tax Number", type: "text" },
          { name: "creditLimit", label: "Credit Limit", type: "text" },
          { name: "payTerm", label: "Pay Term", type: "text" },
          { name: "mobile", label: "Mobile", type: "text" },
          { name: "address", label: "Address", type: "text" },
        ]}
        loading={actionLoading}
        width={600}
      />

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedCustomer(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete customer
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Customer deleted successfully");
            setCustomers(customers.filter((c) => c.key !== selectedCustomer?.key));
            setDeleteModalOpen(false);
            setSelectedCustomer(null);
          } catch (_error) {
            message.error("Failed to delete customer");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete Customer"
        itemName={selectedCustomer?.name}
        loading={actionLoading}
      />
    </div>
  );
};

export default Customers;

