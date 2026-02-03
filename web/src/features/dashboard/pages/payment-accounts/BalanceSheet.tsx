import React, { useState, useMemo } from "react";
import {
  Card,
  Button,
  Typography,
  message,
  Row,
  Col,
  Divider,
} from "antd";
import {
  PrinterOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs, { type Dayjs } from "dayjs";

const { Title, Text } = Typography;

export interface LiabilityItem {
  key: string;
  label: string;
  amount: number;
}

export interface AssetItem {
  key: string;
  label: string;
  amount: number;
}

const BalanceSheet: React.FC = () => {
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
  const defaultLiabilities: LiabilityItem[] = [
    {
      key: "1",
      label: "Supplier Due",
      amount: 2500000.00,
    },
    {
      key: "2",
      label: "Loan Payable",
      amount: 5000000.00,
    },
    {
      key: "3",
      label: "Tax Payable",
      amount: 850000.00,
    },
    {
      key: "4",
      label: "Accrued Expenses",
      amount: 450000.00,
    },
    {
      key: "5",
      label: "Other Payables",
      amount: 320000.00,
    },
  ];

  const defaultAssets: AssetItem[] = [
    {
      key: "1",
      label: "Customer Due",
      amount: 3500000.00,
    },
    {
      key: "2",
      label: "Closing stock",
      amount: 12000000.00,
    },
    {
      key: "3",
      label: "Account Balances",
      amount: 8500000.00,
    },
    {
      key: "4",
      label: "Cash in Hand",
      amount: 1200000.00,
    },
    {
      key: "5",
      label: "Fixed Assets",
      amount: 15000000.00,
    },
    {
      key: "6",
      label: "Prepaid Expenses",
      amount: 650000.00,
    },
  ];

  const [liabilities] = useState<LiabilityItem[]>(defaultLiabilities);
  const [assets] = useState<AssetItem[]>(defaultAssets);

  // Calculate totals
  const totalLiability = useMemo(() => {
    return liabilities.reduce((sum, item) => sum + item.amount, 0);
  }, [liabilities]);

  const totalAssets = useMemo(() => {
    return assets.reduce((sum, item) => sum + item.amount, 0);
  }, [assets]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const tableHTML = `
      <html>
        <head>
          <title>Balance Sheet</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1f1f1f; margin-bottom: 20px; }
            .balance-sheet-container { display: flex; gap: 20px; margin-top: 20px; }
            .section { flex: 1; }
            .section-title { font-weight: bold; font-size: 16px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #ddd; }
            .item-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .item-label { color: #595959; }
            .item-amount { font-weight: 500; text-align: right; }
            .total-row { display: flex; justify-content: space-between; padding: 12px 0; margin-top: 10px; border-top: 2px solid #ddd; font-weight: bold; }
            .date-info { color: #8c8c8c; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h1>Balance Sheet</h1>
          <div class="date-info">Generated on: ${new Date().toLocaleString()}</div>
          <div class="balance-sheet-container">
            <div class="section">
              <div class="section-title">Liability</div>
              ${liabilities
                .map(
                  (item) => `
                <div class="item-row">
                  <span class="item-label">${item.label}:</span>
                  <span class="item-amount">TSh ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              `
                )
                .join("")}
              <div class="total-row">
                <span>Total Liability:</span>
                <span>TSh ${totalLiability.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Assets</div>
              ${assets
                .map(
                  (item) => `
                <div class="item-row">
                  <span class="item-label">${item.label}:</span>
                  <span class="item-amount">TSh ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              `
                )
                .join("")}
              <div class="total-row">
                <span>Total Assets:</span>
                <span>TSh ${totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(tableHTML);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

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
            Balance Sheet
          </Title>
        </Col>
      </Row>

      {/* Filters Section */}
      <FilterPanel
        filters={filterConfig}
        onFilterChange={setFilterConfig}
        defaultExpanded={true}
      />

      {/* Balance Sheet Content */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "24px",
        }}
        bodyStyle={{ padding: "24px" }}
      >
        <Row gutter={[24, 24]}>
          {/* Liability Section */}
          <Col xs={24} md={12}>
            <div>
              <Title
                level={4}
                style={{
                  margin: 0,
                  marginBottom: "16px",
                  color: isDark ? "#fff" : "#1f1f1f",
                  fontWeight: 600,
                  paddingBottom: "12px",
                  borderBottom: isDark ? "2px solid rgba(255,255,255,0.1)" : "2px solid #f0f0f0",
                }}
              >
                Liability
              </Title>
              {liabilities.map((item) => (
                <Row
                  key={item.key}
                  justify="space-between"
                  align="middle"
                  style={{
                    padding: "12px 0",
                    borderBottom: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #f0f0f0",
                  }}
                >
                  <Col>
                    <Text
                      style={{
                        fontSize: "14px",
                        color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                      }}
                    >
                      {item.label}:
                    </Text>
                  </Col>
                  <Col>
                    <Text
                      style={{
                        fontSize: "14px",
                        color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                        fontWeight: 500,
                      }}
                    >
                      TSh {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Col>
                </Row>
              ))}
              <Divider style={{ margin: "16px 0" }} />
              <Row
                justify="space-between"
                align="middle"
                style={{
                  padding: "12px 0",
                  marginTop: "8px",
                  borderTop: isDark ? "2px solid rgba(255,255,255,0.1)" : "2px solid #f0f0f0",
                }}
              >
                <Col>
                  <Text
                    strong
                    style={{
                      fontSize: "16px",
                      color: isDark ? "#fff" : "#1f1f1f",
                    }}
                  >
                    Total Liability:
                  </Text>
                </Col>
                <Col>
                  <Text
                    strong
                    style={{
                      fontSize: "16px",
                      color: isDark ? "#fff" : "#1f1f1f",
                    }}
                  >
                    TSh {totalLiability.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Text>
                </Col>
              </Row>
            </div>
          </Col>

          {/* Assets Section */}
          <Col xs={24} md={12}>
            <div>
              <Title
                level={4}
                style={{
                  margin: 0,
                  marginBottom: "16px",
                  color: isDark ? "#fff" : "#1f1f1f",
                  fontWeight: 600,
                  paddingBottom: "12px",
                  borderBottom: isDark ? "2px solid rgba(255,255,255,0.1)" : "2px solid #f0f0f0",
                }}
              >
                Assets
              </Title>
              {assets.map((item) => (
                <Row
                  key={item.key}
                  justify="space-between"
                  align="middle"
                  style={{
                    padding: "12px 0",
                    borderBottom: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #f0f0f0",
                  }}
                >
                  <Col>
                    <Text
                      style={{
                        fontSize: "14px",
                        color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                      }}
                    >
                      {item.label}:
                    </Text>
                  </Col>
                  <Col>
                    <Text
                      style={{
                        fontSize: "14px",
                        color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                        fontWeight: 500,
                      }}
                    >
                      TSh {item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </Col>
                </Row>
              ))}
              <Divider style={{ margin: "16px 0" }} />
              <Row
                justify="space-between"
                align="middle"
                style={{
                  padding: "12px 0",
                  marginTop: "8px",
                  borderTop: isDark ? "2px solid rgba(255,255,255,0.1)" : "2px solid #f0f0f0",
                }}
              >
                <Col>
                  <Text
                    strong
                    style={{
                      fontSize: "16px",
                      color: isDark ? "#fff" : "#1f1f1f",
                    }}
                  >
                    Total Assets:
                  </Text>
                </Col>
                <Col>
                  <Text
                    strong
                    style={{
                      fontSize: "16px",
                      color: isDark ? "#fff" : "#1f1f1f",
                    }}
                  >
                    TSh {totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Text>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
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

export default BalanceSheet;

