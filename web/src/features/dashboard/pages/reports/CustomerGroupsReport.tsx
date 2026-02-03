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
  PrinterOutlined,
  SearchOutlined,
  FileTextOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  UnorderedListOutlined,
  DownOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Search } = Input;

interface GroupReportRow {
  key: string;
  customerGroup: string;
  totalSale: number;
}

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CustomerGroupsReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    customerGroup: true,
    totalSale: true,
  });

  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    customerGroup: {
      label: "Customer Group Name:",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Retail", value: "retail" },
        { label: "Wholesale", value: "wholesale" },
        { label: "Corporate", value: "corporate" },
        { label: "VIP", value: "vip" },
        { label: "Standard", value: "standard" },
      ],
    },
    businessLocation: {
      label: "Business Location:",
      value: "all",
      options: [
        { label: "All locations", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
        { label: "Location 3", value: "Location 3" },
      ],
    },
    dateRange: {
      label: "Date Range:",
      value: [dayjs("2026-01-01"), dayjs("2026-12-31")],
    },
  });

  // Mock data - replace with API
  const mockData: GroupReportRow[] = [
    { key: "1", customerGroup: "Retail", totalSale: 12500000 },
    { key: "2", customerGroup: "Wholesale", totalSale: 28500000 },
    { key: "3", customerGroup: "Corporate", totalSale: 42000000 },
    { key: "4", customerGroup: "VIP", totalSale: 18500000 },
    { key: "5", customerGroup: "Standard", totalSale: 9600000 },
    { key: "6", customerGroup: "Government", totalSale: 32000000 },
    { key: "7", customerGroup: "Reseller", totalSale: 15800000 },
    { key: "8", customerGroup: "Walk-in", totalSale: 4200000 },
    { key: "9", customerGroup: "Online", totalSale: 11200000 },
    { key: "10", customerGroup: "Enterprise", totalSale: 27500000 },
  ];

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return mockData;
    const q = searchText.toLowerCase();
    return mockData.filter((r) => r.customerGroup.toLowerCase().includes(q));
  }, [searchText]);

  const totalSaleSum = useMemo(
    () => filteredData.reduce((s, r) => s + r.totalSale, 0),
    [filteredData]
  );

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Customer Groups Report</title>
      <style>body{font-family:Arial;padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;} th{background:#f2f2f2;}
      </style></head><body>
      <h1>Customer Groups Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <table>
      <tr><th>Customer Group</th><th>Total Sale</th></tr>
      ${filteredData.map((r) => `<tr><td>${r.customerGroup}</td><td>${formatCurrency(r.totalSale)}</td></tr>`).join("")}
      <tr><td><strong>Total Sale</strong></td><td><strong>${formatCurrency(totalSaleSum)}</strong></td></tr>
      </table></body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleExportCSV = () => {
    const headers = ["Customer Group", "Total Sale"];
    const rows = filteredData.map((r) => [r.customerGroup, r.totalSale]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `customer_groups_report_${dayjs().format("YYYY-MM-DD")}.csv`;
    a.click();
    message.success("Exported to CSV");
  };

  const columnVisibilityMenu: MenuProps = {
    items: Object.keys(columnVisibility).map((key) => ({
      key,
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={columnVisibility[key]}
            onChange={(e) => setColumnVisibility((p) => ({ ...p, [key]: e.target.checked }))}
            style={{ marginRight: 8 }}
          />
          {key === "customerGroup" ? "Customer Group" : "Total Sale"}
        </div>
      ),
    })),
  };

  const columns: ColumnsType<GroupReportRow> = [
    { title: "Customer Group", dataIndex: "customerGroup", key: "customerGroup", width: 200, sorter: (a, b) => a.customerGroup.localeCompare(b.customerGroup), render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: "Total Sale", dataIndex: "totalSale", key: "totalSale", width: 160, align: "right", sorter: (a, b) => a.totalSale - b.totalSale, render: (v: number) => <Text style={{ fontSize: 13, fontWeight: 500 }}>{formatCurrency(v)}</Text> },
  ];

  const visibleColumns = columns.filter((col) => col.key && columnVisibility[col.key as string] !== false);

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Customer Groups Report
      </Title>

      <FilterPanel filters={filterConfig} onFilterChange={setFilterConfig} defaultExpanded={true} />

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
            <Select
              value={pageSize}
              onChange={setPageSize}
              options={[
                { value: 10, label: "Show 10 entries" },
                { value: 25, label: "Show 25 entries" },
                { value: 50, label: "Show 50 entries" },
                { value: 100, label: "Show 100 entries" },
              ]}
              style={{ width: 160 }}
              suffixIcon={<DownOutlined />}
            />
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
              <Search
                placeholder="Search..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 200 }}
                addonAfter={<Button type="primary" icon={<SearchOutlined />} />}
              />
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
                  <Text strong>Total Sale</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">
                  <Text strong>{formatCurrency(totalSaleSum)}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>
    </div>
  );
};

export default CustomerGroupsReport;
