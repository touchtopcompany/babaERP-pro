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
} from "antd";
import type { MenuProps } from "antd";
import {
  SearchOutlined,
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
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

export interface SalesVoidData {
  key: string;
  date: string;
  location: string;
  removedBy: string;
  productName: string;
  totalItems: number;
  totalAmount: number;
}

const SalesVoid: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
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
    user: {
      label: "User:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Mr C2Z Electronics", value: "Mr C2Z Electronics" },
        { label: "Jane Smith", value: "Jane Smith" },
        { label: "Bob Johnson", value: "Bob Johnson" },
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
    user: filterConfig.user?.value || "all",
    dateRange: filterConfig.dateRange?.value || [dayjs(), dayjs()],
  };

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    date: true,
    location: true,
    removedBy: true,
    productName: true,
    totalItems: true,
    totalAmount: true,
  });

  // Mock data - replace with API call
  const defaultSalesVoid: SalesVoidData[] = [
    {
      key: "1",
      date: "2025-10-20 17:39",
      location: "C2Z Digital Solutions",
      removedBy: "Mr C2Z Electronics",
      productName: "Drum Skin",
      totalItems: 1,
      totalAmount: 200000.00,
    },
  ];

  const [salesVoid, setSalesVoid] = useState<SalesVoidData[]>(defaultSalesVoid);

  // Filter sales void based on search text and filters
  const filteredSalesVoid = useMemo(() => {
    let filtered = salesVoid;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (voidItem) =>
          voidItem.location.toLowerCase().includes(searchLower) ||
          voidItem.removedBy.toLowerCase().includes(searchLower) ||
          voidItem.productName.toLowerCase().includes(searchLower) ||
          voidItem.date.includes(searchLower)
      );
    }

    // Apply filters
    if (filters.businessLocation && filters.businessLocation !== "all") {
      filtered = filtered.filter((v) => v.location === filters.businessLocation);
    }
    if (filters.user !== "all") {
      filtered = filtered.filter((v) => v.removedBy === filters.user);
    }

    return filtered;
  }, [salesVoid, searchText, filters]);

  // Calculate summary totals
  const summaryTotals = useMemo(() => {
    const totalItems = filteredSalesVoid.reduce((sum, v) => sum + v.totalItems, 0);
    const totalAmount = filteredSalesVoid.reduce((sum, v) => sum + v.totalAmount, 0);

    return {
      totalItems,
      totalAmount,
    };
  }, [filteredSalesVoid]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Sales void refreshed successfully");
    }, 1000);
  };

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Location",
      "Removed By",
      "Product Name",
      "Total Items",
      "Total amount",
    ];
    const csvData = filteredSalesVoid.map((voidItem) => [
      voidItem.date,
      voidItem.location,
      voidItem.removedBy,
      voidItem.productName,
      voidItem.totalItems,
      voidItem.totalAmount,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `sales_void_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Sales void exported to CSV successfully");
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
          <title>Sales Void Report</title>
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
          <h1>Sales Void Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Location</th>
                <th>Removed By</th>
                <th>Product Name</th>
                <th>Total Items</th>
                <th>Total amount</th>
              </tr>
            </thead>
            <tbody>
              ${filteredSalesVoid
                .map(
                  (voidItem) => `
                <tr>
                  <td>${voidItem.date}</td>
                  <td>${voidItem.location}</td>
                  <td>${voidItem.removedBy}</td>
                  <td>${voidItem.productName}</td>
                  <td>${voidItem.totalItems}</td>
                  <td>TSh ${voidItem.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4"><strong>Total:</strong></td>
                <td><strong>Items : ${summaryTotals.totalItems}</strong></td>
                <td><strong>TSh ${summaryTotals.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></td>
              </tr>
            </tfoot>
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

  const columns: ColumnsType<SalesVoidData> = [
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
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 200,
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Removed By",
      dataIndex: "removedBy",
      key: "removedBy",
      width: 180,
      sorter: (a, b) => a.removedBy.localeCompare(b.removedBy),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      width: 200,
      sorter: (a, b) => a.productName.localeCompare(b.productName),
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
            Sales Void
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
          </Space>
        </Col>
      </Row>

      {/* Filters Section */}
      <FilterPanel
        filters={filterConfig}
        onFilterChange={setFilterConfig}
        defaultExpanded={true}
      />

      {/* Sales Void Section */}
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
              Sales Void
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
          dataSource={filteredSalesVoid}
          loading={loading}
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
          scroll={{ x: "max-content" }}
          locale={{
            emptyText: "No data available in table",
          }}
          summary={() => {
            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={4}>
                    <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f" }}>
                      Total:
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4} align="right">
                    <Text
                      strong
                      style={{
                        fontSize: "13px",
                        color: isDark ? "#fff" : "#1f1f1f",
                      }}
                    >
                      Items : {summaryTotals.totalItems}
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
                      TSh {summaryTotals.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </Card>
    </div>
  );
};

export default SalesVoid;

