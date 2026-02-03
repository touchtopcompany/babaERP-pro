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
  Collapse,
  DatePicker,
} from "antd";
import type { MenuProps } from "antd";
import type { CollapseProps } from "antd";
import {
  PrinterOutlined,
  SearchOutlined,
  FileTextOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  UnorderedListOutlined,
  DownOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Column } from "@ant-design/charts";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface ExpenseRow {
  key: string;
  expenseCategory: string;
  totalExpense: number;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ExpenseReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [tableSearch, setTableSearch] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [businessLocation, setBusinessLocation] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    expenseCategory: true,
    totalExpense: true,
  });

  const mockData: ExpenseRow[] = [
    { key: "1", expenseCategory: "Rent", totalExpense: 850000 },
    { key: "2", expenseCategory: "Utilities", totalExpense: 245000 },
    { key: "3", expenseCategory: "Office Supplies", totalExpense: 120000 },
    { key: "4", expenseCategory: "Travel", totalExpense: 380000 },
    { key: "5", expenseCategory: "Marketing", totalExpense: 420000 },
    { key: "6", expenseCategory: "Salaries", totalExpense: 2100000 },
    { key: "7", expenseCategory: "Maintenance", totalExpense: 95000 },
    { key: "8", expenseCategory: "Insurance", totalExpense: 180000 },
  ];

  const filteredData = useMemo(() => {
    let data = [...mockData];
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase();
      data = data.filter((r) => r.expenseCategory.toLowerCase().includes(q));
    }
    return data;
  }, [tableSearch]);

  const totalExpenseSum = useMemo(() => filteredData.reduce((s, r) => s + r.totalExpense, 0), [filteredData]);

  const chartData = useMemo(
    () => filteredData.map((r) => ({ category: r.expenseCategory, value: r.totalExpense })),
    [filteredData]
  );

  const handleApplyFilters = () => {
    message.success("Filters applied");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Expense Report</title>
      <style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Expense Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table>
      <tr><th>Expense Categories</th><th>Total Expense</th></tr>
      ${filteredData.map((r) => `<tr><td>${r.expenseCategory}</td><td>${formatCurrency(r.totalExpense)}</td></tr>`).join("")}
      <tr><td><strong>Total</strong></td><td><strong>${formatCurrency(totalExpenseSum)}</strong></td></tr>
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleExportCSV = () => {
    const headers = ["Expense Categories", "Total Expense"];
    const rows = filteredData.map((r) => [r.expenseCategory, formatCurrency(r.totalExpense)]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `expense_report_${dayjs().format("YYYY-MM-DD")}.csv`;
    a.click();
    message.success("Exported to CSV");
  };

  const labelStyle = { color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", fontSize: 13, marginBottom: 8, display: "block" as const };
  const inputStyle = { background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9", borderRadius: 6, color: isDark ? "#fff" : "#1f1f1f", width: "100%" };

  const collapseItems: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <Space>
          <FilterOutlined style={{ color: "#1890ff", fontSize: 14 }} />
          <Text strong style={{ color: "#1890ff", fontSize: 14 }}>Filters</Text>
        </Space>
      ),
      style: { background: "transparent", border: "none" },
      children: (
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Business Location:</Text>
            <Select
              value={businessLocation}
              onChange={setBusinessLocation}
              style={inputStyle}
              suffixIcon={<DownOutlined />}
              options={[
                { label: "All locations", value: "all" },
                { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
                { label: "Location 2", value: "Location 2" },
                { label: "Location 3", value: "Location 3" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Category:</Text>
            <Select
              value={category}
              onChange={setCategory}
              style={inputStyle}
              suffixIcon={<DownOutlined />}
              options={[
                { label: "All", value: "all" },
                { label: "Rent", value: "rent" },
                { label: "Utilities", value: "utilities" },
                { label: "Office Supplies", value: "office_supplies" },
                { label: "Travel", value: "travel" },
                { label: "Marketing", value: "marketing" },
                { label: "Salaries", value: "salaries" },
                { label: "Maintenance", value: "maintenance" },
                { label: "Insurance", value: "insurance" },
              ]}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>Date Range:</Text>
            <RangePicker
              value={dateRange}
              onChange={(dates) => setDateRange(dates && dates[0] && dates[1] ? [dates[0], dates[1]] : null)}
              format="MM/DD/YYYY"
              placeholder={["Select a date range", "Select a date range"]}
              style={inputStyle}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Button type="primary" onClick={handleApplyFilters} style={{ marginTop: 24, borderRadius: 6 }}>
              Apply Filters
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  const columnConfig = useMemo(
    () => ({
      data: chartData,
      xField: "category",
      yField: "value",
      color: "#1890ff",
      columnStyle: {
        radius: [4, 4, 0, 0],
      },
      xAxis: {
        label: {
          autoRotate: true,
          autoHide: false,
          style: {
            fill: isDark ? "rgba(255,255,255,0.65)" : "#595959",
          },
        },
      },
      yAxis: {
        title: {
          text: "Values",
          style: {
            fill: isDark ? "rgba(255,255,255,0.65)" : "#595959",
          },
        },
        label: {
          style: {
            fill: isDark ? "rgba(255,255,255,0.65)" : "#595959",
          },
        },
      },
    }),
    [chartData, isDark]
  );

  const columnLabels: Record<string, string> = {
    expenseCategory: "Expense Categories",
    totalExpense: "Total Expense",
  };

  const columnVisibilityMenu: MenuProps = {
    items: Object.keys(columnVisibility).map((key) => ({
      key,
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox checked={columnVisibility[key]} onChange={(e) => setColumnVisibility((p) => ({ ...p, [key]: e.target.checked }))} style={{ marginRight: 8 }} />
          {columnLabels[key] ?? key}
        </div>
      ),
    })),
  };

  const columns: ColumnsType<ExpenseRow> = [
    { title: "Expense Categories", dataIndex: "expenseCategory", key: "expenseCategory", width: 280, sorter: (a, b) => a.expenseCategory.localeCompare(b.expenseCategory), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Total Expense", dataIndex: "totalExpense", key: "totalExpense", width: 200, align: "right", sorter: (a, b) => a.totalExpense - b.totalExpense, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Expense Report
      </Title>

      <Collapse defaultActiveKey={["1"]} items={collapseItems} style={{ marginBottom: 24, background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0", borderRadius: 8 }} expandIconPosition="start" />

      {/* Chart / Total Expense section */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
          marginBottom: 24,
          overflow: "hidden",
        }}
        styles={{ body: { padding: "24px" } }}
      >
        <Title level={5} style={{ marginBottom: 16, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
          Expense Report
        </Title>
        <div style={{ height: 320, marginBottom: 16 }}>
          <Column {...columnConfig} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: "#1890ff", display: "inline-block" }} />
          <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.65)" : "#595959" }}>Total Expense</Text>
        </div>
      </Card>

      {/* Table section */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
          overflow: "hidden",
        }}
        styles={{ body: { padding: "24px" } }}
      >
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }} align="middle">
          <Col flex="none">
            <Space>
              <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959", fontSize: 13 }}>Show</Text>
              <Select value={pageSize} onChange={setPageSize} options={[{ value: 10, label: "10" }, { value: 25, label: "25" }, { value: 50, label: "50" }, { value: 100, label: "100" }]} style={{ width: 80 }} suffixIcon={<DownOutlined />} />
              <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959", fontSize: 13 }}>entries</Text>
            </Space>
          </Col>
          <Col flex="auto">
            <Space wrap>
              <Button icon={<FileTextOutlined />} onClick={handleExportCSV} style={{ height: 40, borderRadius: 6 }}>Export to CSV</Button>
              <Button icon={<FileExcelOutlined />} onClick={handleExportCSV} style={{ height: 40, borderRadius: 6 }}>Export to Excel</Button>
              <Button icon={<PrinterOutlined />} onClick={handlePrint} style={{ height: 40, borderRadius: 6 }}>Print</Button>
              <Dropdown menu={columnVisibilityMenu} trigger={["click"]} placement="bottomRight">
                <Button icon={<UnorderedListOutlined />} style={{ height: 40, borderRadius: 6 }}>Column visibility</Button>
              </Dropdown>
              <Button icon={<FilePdfOutlined />} onClick={() => message.info("PDF export coming soon")} style={{ height: 40, borderRadius: 6 }}>Export to PDF</Button>
              <Input placeholder="Search..." allowClear value={tableSearch} onChange={(e) => setTableSearch(e.target.value)} style={{ width: 200 }} addonAfter={<Button type="primary" icon={<SearchOutlined />} />} />
            </Space>
          </Col>
        </Row>
        <Table
          columns={visibleColumns}
          dataSource={filteredData}
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize,
            showSizeChanger: false,
            showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            style: { color: isDark ? "rgba(255,255,255,0.85)" : "#595959" },
          }}
          locale={{ emptyText: "No data available in table" }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <Text strong>Total</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">
                  <Text strong>{formatCurrency(totalExpenseSum)}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    </div>
  );
};

export default ExpenseReport;
