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
  Tabs,
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
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface SalesAddedRow {
  key: string;
  date: string;
  invoiceNo: string;
  customerName: string;
  location: string;
  paymentStatus: string;
  totalAmount: number;
  totalPaid: number;
  sellDue: number;
  sellReturnDue: number;
}

interface SalesWithCommissionRow extends SalesAddedRow {
  commission: number;
}

interface ExpenseRow {
  key: string;
  date: string;
  category: string;
  amount: number;
  note: string;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const SalesRepresentativeReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("sales-added");
  const [tableSearch, setTableSearch] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [user, setUser] = useState<string>("all");
  const [businessLocation, setBusinessLocation] = useState<string>("all");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs("2026-01-01"), dayjs("2026-12-31")]);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    date: true,
    invoiceNo: true,
    customerName: true,
    location: true,
    paymentStatus: true,
    totalAmount: true,
    totalPaid: true,
    totalRemaining: true,
  });

  const salesAddedData: SalesAddedRow[] = [
    { key: "1", date: "2026-01-08", invoiceNo: "INV-2026-001", customerName: "Acme Corp", location: "C2Z Digital Solutions", paymentStatus: "Paid", totalAmount: 1850000, totalPaid: 1850000, sellDue: 0, sellReturnDue: 0 },
    { key: "2", date: "2026-01-10", invoiceNo: "INV-2026-002", customerName: "Beta Ltd", location: "C2Z Digital Solutions", paymentStatus: "Partial", totalAmount: 675000, totalPaid: 400000, sellDue: 275000, sellReturnDue: 0 },
    { key: "3", date: "2026-01-12", invoiceNo: "INV-2026-003", customerName: "Gamma Inc", location: "Location 2", paymentStatus: "Paid", totalAmount: 1000000, totalPaid: 1000000, sellDue: 0, sellReturnDue: 0 },
    { key: "4", date: "2026-01-15", invoiceNo: "INV-2026-004", customerName: "Acme Corp", location: "C2Z Digital Solutions", paymentStatus: "Due", totalAmount: 1260000, totalPaid: 0, sellDue: 1260000, sellReturnDue: 0 },
    { key: "5", date: "2026-01-18", invoiceNo: "INV-2026-005", customerName: "Beta Ltd", location: "C2Z Digital Solutions", paymentStatus: "Paid", totalAmount: 925000, totalPaid: 925000, sellDue: 0, sellReturnDue: 50000 },
  ];

  const salesWithCommissionData: SalesWithCommissionRow[] = salesAddedData.map((r, i) => ({ ...r, key: `c-${r.key}`, commission: [92500, 33750, 50000, 63000, 46250][i] ?? 0 }));

  const expenseData: ExpenseRow[] = [
    { key: "1", date: "2026-01-05", category: "Travel", amount: 85000, note: "Client visit" },
    { key: "2", date: "2026-01-12", category: "Meals", amount: 45000, note: "Team lunch" },
    { key: "3", date: "2026-01-18", category: "Transport", amount: 32000, note: "Fuel" },
  ];

  const totalSale = useMemo(() => salesAddedData.reduce((s, r) => s + r.totalAmount, 0), []);
  const totalSalesReturn = useMemo(() => 150000, []);
  const netSale = totalSale - totalSalesReturn;
  const totalExpense = useMemo(() => expenseData.reduce((s, r) => s + r.amount, 0), []);

  const filteredSalesAdded = useMemo(() => {
    if (!tableSearch.trim()) return salesAddedData;
    const q = tableSearch.toLowerCase();
    return salesAddedData.filter(
      (r) =>
        r.invoiceNo.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
    );
  }, [tableSearch]);

  const filteredSalesWithCommission = useMemo(() => {
    if (!tableSearch.trim()) return salesWithCommissionData;
    const q = tableSearch.toLowerCase();
    return salesWithCommissionData.filter(
      (r) =>
        r.invoiceNo.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
    );
  }, [tableSearch]);

  const filteredExpenses = useMemo(() => {
    if (!tableSearch.trim()) return expenseData;
    const q = tableSearch.toLowerCase();
    return expenseData.filter((r) => r.category.toLowerCase().includes(q) || r.note.toLowerCase().includes(q));
  }, [tableSearch]);

  const salesAddedSums = useMemo(
    () => ({
      totalAmount: filteredSalesAdded.reduce((s, r) => s + r.totalAmount, 0),
      totalPaid: filteredSalesAdded.reduce((s, r) => s + r.totalPaid, 0),
      sellDue: filteredSalesAdded.reduce((s, r) => s + r.sellDue, 0),
      sellReturnDue: filteredSalesAdded.reduce((s, r) => s + r.sellReturnDue, 0),
    }),
    [filteredSalesAdded]
  );

  const handlePrint = () => {
    message.success("Print dialog opened");
    window.print();
  };

  const handleExportCSV = (headers: string[], rows: (string | number)[][]) => {
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `sales_representative_report_${dayjs().format("YYYY-MM-DD")}.csv`;
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
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Text style={labelStyle}>User:</Text>
            <Select value={user} onChange={setUser} style={inputStyle} suffixIcon={<DownOutlined />} options={[{ label: "All Users", value: "all" }, { label: "John Rep", value: "john" }, { label: "Jane Rep", value: "jane" }]} />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Text style={labelStyle}>Business Location:</Text>
            <Select value={businessLocation} onChange={setBusinessLocation} style={inputStyle} suffixIcon={<DownOutlined />} options={[{ label: "All locations", value: "all" }, { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" }, { label: "Location 2", value: "Location 2" }]} />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Text style={labelStyle}>Date Range:</Text>
            <RangePicker value={dateRange} onChange={(dates) => dates && dates[0] && dates[1] && setDateRange([dates[0], dates[1]])} format="MM/DD/YYYY" style={inputStyle} />
          </Col>
        </Row>
      ),
    },
  ];

  const columnLabels: Record<string, string> = {
    date: "Date",
    invoiceNo: "Invoice No.",
    customerName: "Customer name",
    location: "Location",
    paymentStatus: "Payment Status",
    totalAmount: "Total amount",
    totalPaid: "Total paid",
    totalRemaining: "Total remaining",
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

  const salesAddedColumns: ColumnsType<SalesAddedRow> = [
    { title: "Date", dataIndex: "date", key: "date", width: 120, sorter: (a, b) => a.date.localeCompare(b.date), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Invoice No.", dataIndex: "invoiceNo", key: "invoiceNo", width: 130, sorter: (a, b) => a.invoiceNo.localeCompare(b.invoiceNo), render: (t: string) => <Text style={{ fontSize: 13, fontFamily: "monospace" }}>{t}</Text> },
    { title: "Customer name", dataIndex: "customerName", key: "customerName", width: 160, sorter: (a, b) => a.customerName.localeCompare(b.customerName), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Location", dataIndex: "location", key: "location", width: 180, sorter: (a, b) => a.location.localeCompare(b.location), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Payment Status", dataIndex: "paymentStatus", key: "paymentStatus", width: 130, render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Total amount", dataIndex: "totalAmount", key: "totalAmount", width: 130, align: "right", sorter: (a, b) => a.totalAmount - b.totalAmount, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
    { title: "Total paid", dataIndex: "totalPaid", key: "totalPaid", width: 120, align: "right", sorter: (a, b) => a.totalPaid - b.totalPaid, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
    { title: "Total remaining", key: "totalRemaining", width: 200, render: (_, r) => <><div style={{ fontSize: 13 }}>Sell Due - {formatCurrency(r.sellDue)}</div><div style={{ fontSize: 13 }}>Sell Return Due - {formatCurrency(r.sellReturnDue)}</div></> },
  ];

  const salesWithCommissionColumns: ColumnsType<SalesWithCommissionRow> = [
    ...salesAddedColumns,
    { title: "Commission", dataIndex: "commission", key: "commission", width: 120, align: "right", sorter: (a, b) => a.commission - b.commission, render: (v: number) => <Text style={{ fontSize: 13 }}>{formatCurrency(v)}</Text> },
  ];

  const expenseColumns: ColumnsType<ExpenseRow> = [
    { title: "Date", dataIndex: "date", key: "date", width: 120, sorter: (a, b) => a.date.localeCompare(b.date), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Category", dataIndex: "category", key: "category", width: 140, sorter: (a, b) => a.category.localeCompare(b.category), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Amount", dataIndex: "amount", key: "amount", width: 130, align: "right", sorter: (a, b) => a.amount - b.amount, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
    { title: "Note", dataIndex: "note", key: "note", width: 200, render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
  ];

  const visibleSalesColumns = salesAddedColumns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  const tableToolbar = (
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
          <Button icon={<FileTextOutlined />} onClick={() => handleExportCSV(["Date", "Invoice No.", "Customer name", "Location", "Payment Status", "Total amount", "Total paid", "Sell Due", "Sell Return Due"], filteredSalesAdded.map((r) => [r.date, r.invoiceNo, r.customerName, r.location, r.paymentStatus, formatCurrency(r.totalAmount), formatCurrency(r.totalPaid), formatCurrency(r.sellDue), formatCurrency(r.sellReturnDue)]))} style={{ height: 40, borderRadius: 6 }}>Export to CSV</Button>
          <Button icon={<FileExcelOutlined />} onClick={() => handleExportCSV(["Date", "Invoice No.", "Customer name", "Location", "Payment Status", "Total amount", "Total paid", "Sell Due", "Sell Return Due"], filteredSalesAdded.map((r) => [r.date, r.invoiceNo, r.customerName, r.location, r.paymentStatus, formatCurrency(r.totalAmount), formatCurrency(r.totalPaid), formatCurrency(r.sellDue), formatCurrency(r.sellReturnDue)]))} style={{ height: 40, borderRadius: 6 }}>Export to Excel</Button>
          <Button icon={<PrinterOutlined />} onClick={handlePrint} style={{ height: 40, borderRadius: 6 }}>Print</Button>
          <Dropdown menu={columnVisibilityMenu} trigger={["click"]} placement="bottomRight">
            <Button icon={<UnorderedListOutlined />} style={{ height: 40, borderRadius: 6 }}>Column visibility</Button>
          </Dropdown>
          <Button icon={<FilePdfOutlined />} onClick={() => message.info("PDF export coming soon")} style={{ height: 40, borderRadius: 6 }}>Export to PDF</Button>
          <Input placeholder="Search..." allowClear value={tableSearch} onChange={(e) => setTableSearch(e.target.value)} style={{ width: 200 }} addonAfter={<Button type="primary" icon={<SearchOutlined />} />} />
        </Space>
      </Col>
    </Row>
  );

  const salesAddedContent = (
    <>
      {tableToolbar}
      <Table
        columns={visibleSalesColumns}
        dataSource={filteredSalesAdded}
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
              <Table.Summary.Cell index={0} colSpan={5}>
                <Text strong>Total:</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right"><Text strong>{formatCurrency(salesAddedSums.totalAmount)}</Text></Table.Summary.Cell>
              <Table.Summary.Cell index={2} align="right"><Text strong>{formatCurrency(salesAddedSums.totalPaid)}</Text></Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <div style={{ fontSize: 13 }}><Text strong>Sell Due - {formatCurrency(salesAddedSums.sellDue)}</Text></div>
                <div style={{ fontSize: 13 }}><Text strong>Sell Return Due - {formatCurrency(salesAddedSums.sellReturnDue)}</Text></div>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </>
  );

  const salesWithCommissionContent = (
    <>
      {tableToolbar}
      <Table
        columns={salesWithCommissionColumns}
        dataSource={filteredSalesWithCommission}
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize,
          showSizeChanger: false,
          showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
          style: { color: isDark ? "rgba(255,255,255,0.85)" : "#595959" },
        }}
        locale={{ emptyText: "No data available in table" }}
      />
    </>
  );

  const expensesContent = (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }} align="middle">
        <Col flex="auto">
          <Input placeholder="Search..." allowClear value={tableSearch} onChange={(e) => setTableSearch(e.target.value)} style={{ width: 200 }} addonAfter={<Button type="primary" icon={<SearchOutlined />} />} />
        </Col>
      </Row>
      <Table
        columns={expenseColumns}
        dataSource={filteredExpenses}
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
              <Table.Summary.Cell index={0} colSpan={2}><Text strong>Total:</Text></Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right"><Text strong>{formatCurrency(filteredExpenses.reduce((s, r) => s + r.amount, 0))}</Text></Table.Summary.Cell>
              <Table.Summary.Cell index={2} />
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </>
  );

  const tabItems = [
    { key: "sales-added", label: "Sales Added", children: salesAddedContent },
    { key: "sales-commission", label: "Sales With Commission", children: salesWithCommissionContent },
    { key: "expenses", label: "Expenses", children: expensesContent },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Sales Representative Report
      </Title>

      <Collapse defaultActiveKey={["1"]} items={collapseItems} style={{ marginBottom: 24, background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0", borderRadius: 8 }} expandIconPosition="start" />

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
          Summary
        </Title>
        <Space direction="vertical" size={8}>
          <Text style={{ fontSize: 14, color: isDark ? "rgba(255,255,255,0.85)" : "#262626" }}>
            Total Sale - Total Sales Return: {formatCurrency(totalSale)} - {formatCurrency(totalSalesReturn)} = {formatCurrency(netSale)}
          </Text>
          <Text style={{ fontSize: 14, color: isDark ? "rgba(255,255,255,0.85)" : "#262626" }}>
            Total Expense: {formatCurrency(totalExpense)}
          </Text>
        </Space>
      </Card>

      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
          overflow: "hidden",
        }}
        styles={{ body: { padding: "0 24px 24px" } }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems.map((tab) => ({
            key: tab.key,
            label: tab.label,
            children: tab.children,
          }))}
        />
      </Card>
    </div>
  );
};

export default SalesRepresentativeReport;
