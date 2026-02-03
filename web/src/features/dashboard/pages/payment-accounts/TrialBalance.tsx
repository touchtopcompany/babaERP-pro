import React, { useState, useMemo } from "react";
import {
  Card,
  Table,
  Button,
  Typography,
  message,
  Row,
  Col,
} from "antd";
import {
  PrinterOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs, { type Dayjs } from "dayjs";

const { Title, Text } = Typography;

export interface TrialBalanceItem {
  key: string;
  category: string;
  debit: number;
  credit: number;
}

const TrialBalance: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Filter states
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
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
      label: "Filter by date:",
      value: [dayjs("2025-12-28"), dayjs("2025-12-28")] as [Dayjs, Dayjs],
    },
  });

  // Mock data - replace with API call
  const defaultTrialBalance: TrialBalanceItem[] = [
    {
      key: "1",
      category: "Supplier Due",
      debit: 2500000.00,
      credit: 0.00,
    },
    {
      key: "2",
      category: "Customer Due",
      debit: 0.00,
      credit: 3500000.00,
    },
    {
      key: "3",
      category: "Account Balances",
      debit: 8500000.00,
      credit: 0.00,
    },
    {
      key: "4",
      category: "Sales Revenue",
      debit: 0.00,
      credit: 12000000.00,
    },
    {
      key: "5",
      category: "Purchase Expenses",
      debit: 4500000.00,
      credit: 0.00,
    },
    {
      key: "6",
      category: "Operating Expenses",
      debit: 2800000.00,
      credit: 0.00,
    },
    {
      key: "7",
      category: "Cash Account",
      debit: 1200000.00,
      credit: 0.00,
    },
    {
      key: "8",
      category: "Bank Account",
      debit: 5000000.00,
      credit: 0.00,
    },
    {
      key: "9",
      category: "Inventory",
      debit: 12000000.00,
      credit: 0.00,
    },
    {
      key: "10",
      category: "Fixed Assets",
      debit: 15000000.00,
      credit: 0.00,
    },
    {
      key: "11",
      category: "Loan Payable",
      debit: 0.00,
      credit: 5000000.00,
    },
    {
      key: "12",
      category: "Tax Payable",
      debit: 0.00,
      credit: 850000.00,
    },
    {
      key: "13",
      category: "Accrued Expenses",
      debit: 0.00,
      credit: 450000.00,
    },
    {
      key: "14",
      category: "Capital",
      debit: 0.00,
      credit: 20000000.00,
    },
    {
      key: "15",
      category: "Retained Earnings",
      debit: 0.00,
      credit: 8500000.00,
    },
  ];

  const [trialBalanceItems] = useState<TrialBalanceItem[]>(defaultTrialBalance);

  // Calculate totals
  const totalDebit = useMemo(() => {
    return trialBalanceItems.reduce((sum, item) => sum + item.debit, 0);
  }, [trialBalanceItems]);

  const totalCredit = useMemo(() => {
    return trialBalanceItems.reduce((sum, item) => sum + item.credit, 0);
  }, [trialBalanceItems]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const tableHTML = `
      <html>
        <head>
          <title>Trial Balance</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1f1f1f; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .total-row { font-weight: bold; background-color: #f0f0f0; }
            .debit { text-align: right; }
            .credit { text-align: right; }
            .date-info { color: #8c8c8c; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>Trial Balance</h1>
          <div class="date-info">Generated on: ${new Date().toLocaleString()}</div>
          <table>
            <thead>
              <tr>
                <th>Trial Balance</th>
                <th class="debit">Debit</th>
                <th class="credit">Credit</th>
              </tr>
            </thead>
            <tbody>
              ${trialBalanceItems
                .map(
                  (item) => `
                <tr>
                  <td>${item.category}</td>
                  <td class="debit">TSh ${item.debit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td class="credit">TSh ${item.credit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              `
                )
                .join("")}
              <tr class="total-row">
                <td>Total</td>
                <td class="debit">TSh ${totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td class="credit">TSh ${totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
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

  const columns: ColumnsType<TrialBalanceItem> = [
    {
      title: "Trial Balance",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "14px",
            color: isDark ? "#fff" : "#1f1f1f",
            fontWeight: 500,
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Debit",
      dataIndex: "debit",
      key: "debit",
      align: "right",
      sorter: (a, b) => a.debit - b.debit,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "14px",
            color: value > 0 ? (isDark ? "#fff" : "#1f1f1f") : (isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c"),
            fontWeight: value > 0 ? 500 : 400,
          }}
        >
          {value > 0
            ? `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : "TSh 0.00"}
        </Text>
      ),
    },
    {
      title: "Credit",
      dataIndex: "credit",
      key: "credit",
      align: "right",
      sorter: (a, b) => a.credit - b.credit,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "14px",
            color: value > 0 ? (isDark ? "#fff" : "#1f1f1f") : (isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c"),
            fontWeight: value > 0 ? 500 : 400,
          }}
        >
          {value > 0
            ? `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : "TSh 0.00"}
        </Text>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      {/* Header Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24}>
          <Title
            level={2}
            style={{
              margin: 0,
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            Trial Balance
          </Title>
        </Col>
      </Row>

      {/* Filters Section */}
      <FilterPanel
        filters={filterConfig}
        onFilterChange={setFilterConfig}
        defaultExpanded={true}
      />

      {/* Trial Balance Table */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "24px",
        }}
        bodyStyle={{ padding: "24px", overflow: "hidden" }}
      >
        <Table
          columns={columns}
          dataSource={trialBalanceItems}
          pagination={false}
          scroll={{ x: "max-content" }}
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
                  <Table.Summary.Cell index={0}>
                    <Text
                      strong
                      style={{
                        fontSize: "16px",
                        color: isDark ? "#fff" : "#1f1f1f",
                      }}
                    >
                      Total
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} align="right">
                    <Text
                      strong
                      style={{
                        fontSize: "16px",
                        color: isDark ? "#fff" : "#1f1f1f",
                      }}
                    >
                      TSh {totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align="right">
                    <Text
                      strong
                      style={{
                        fontSize: "16px",
                        color: isDark ? "#fff" : "#1f1f1f",
                      }}
                    >
                      TSh {totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </Card>

      {/* Print Button */}
      <Row justify="end" style={{ marginTop: "24px" }}>
        <Col>
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            onClick={handlePrint}
            size="large"
            style={{
              height: "40px",
              borderRadius: "6px",
              fontWeight: 500,
              minWidth: "120px",
            }}
          >
            Print
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TrialBalance;

