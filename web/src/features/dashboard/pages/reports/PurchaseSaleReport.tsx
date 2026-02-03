import React, { useState } from "react";
import {
  Card,
  Button,
  Typography,
  message,
  Row,
  Col,
  Tooltip,
} from "antd";
import { PrinterOutlined, InfoCircleOutlined } from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import { FilterPanel } from "../../components/filters";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const formatCurrency = (value: number) =>
  `TSh ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const PurchaseSaleReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    businessLocation: {
      label: "Location:",
      value: "all",
      type: "select",
      options: [
        { label: "All locations", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
        { label: "Location 3", value: "Location 3" },
      ],
    },
    dateRange: {
      label: "Filter by date:",
      value: [dayjs().startOf("month"), dayjs().endOf("month")],
    },
  });

  // Mock data - replace with API
  const purchaseData = {
    totalPurchase: 12500000.00,
    purchaseIncludingTax: 14250000.00,
    totalPurchaseReturnIncludingTax: 850000.00,
    purchaseDue: 2100000.00,
  };

  const saleData = {
    totalSale: 28500000.00,
    saleIncludingTax: 32490000.00,
    totalSellReturnIncludingTax: 1200000.00,
    saleDue: 3500000.00,
  };

  // Overall: (Sale - Sell Return) - (Purchase - Purchase Return)
  const saleMinusSellReturn = saleData.totalSale - saleData.totalSellReturnIncludingTax;
  const purchaseMinusPurchaseReturn = purchaseData.totalPurchase - purchaseData.totalPurchaseReturnIncludingTax;
  const saleMinusPurchase = saleMinusSellReturn - purchaseMinusPurchaseReturn;
  const dueAmount = saleData.saleDue - purchaseData.purchaseDue;

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html><head><title>Purchase & Sale Report</title>
      <style>body{font-family:Arial;padding:20px;} h1{} h2{font-size:16px;} .section{margin-bottom:24px;} .row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;} .label{} .value{text-align:right;font-weight:500;}
      </style></head><body>
      <h1>Purchase & Sale Report</h1>
      <p style="color:#8c8c8c;">Purchase & sale details for the selected date range</p>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <div class="section"><h2>Purchases</h2>
      <div class="row"><span class="label">Total Purchase:</span><span class="value">${formatCurrency(purchaseData.totalPurchase)}</span></div>
      <div class="row"><span class="label">Purchase Including tax:</span><span class="value">${formatCurrency(purchaseData.purchaseIncludingTax)}</span></div>
      <div class="row"><span class="label">Total Purchase Return Including Tax:</span><span class="value">${formatCurrency(purchaseData.totalPurchaseReturnIncludingTax)}</span></div>
      <div class="row"><span class="label">Purchase Due:</span><span class="value">${formatCurrency(purchaseData.purchaseDue)}</span></div>
      </div>
      <div class="section"><h2>Sales</h2>
      <div class="row"><span class="label">Total Sale:</span><span class="value">${formatCurrency(saleData.totalSale)}</span></div>
      <div class="row"><span class="label">Sale Including tax:</span><span class="value">${formatCurrency(saleData.saleIncludingTax)}</span></div>
      <div class="row"><span class="label">Total Sell Return Including Tax:</span><span class="value">${formatCurrency(saleData.totalSellReturnIncludingTax)}</span></div>
      <div class="row"><span class="label">Sale Due:</span><span class="value">${formatCurrency(saleData.saleDue)}</span></div>
      </div>
      <div class="section"><h2>Overall ((Sale - Sell Return) - (Purchase - Purchase Return))</h2>
      <div class="row"><span class="label">Sale - Purchase:</span><span class="value">${formatCurrency(saleMinusPurchase)}</span></div>
      <div class="row"><span class="label">Due amount:</span><span class="value">${formatCurrency(dueAmount)}</span></div>
      </div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const summaryRowStyle = {
    padding: "10px 12px",
    background: isDark ? "rgba(255,255,255,0.06)" : "#fafafa",
    borderRadius: "6px",
    textAlign: "right" as const,
    minWidth: 140,
    fontSize: "13px",
    color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
    fontWeight: 500,
  };

  const InfoIcon = () => (
    <Tooltip title="Outstanding amount to be received (Sale Due) or paid (Purchase Due)">
      <InfoCircleOutlined style={{ color: "#1890ff", marginLeft: 6, fontSize: 14 }} />
    </Tooltip>
  );

  const OverallInfoIcon = () => (
    <Tooltip title="Net position: (Total Sale - Sell Return) minus (Total Purchase - Purchase Return). Due amount = Sale Due minus Purchase Due.">
      <InfoCircleOutlined style={{ color: "#1890ff", marginLeft: 6, fontSize: 14 }} />
    </Tooltip>
  );

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      {/* Header: Title + Subtitle + Filters + Print */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }} justify="space-between" align="middle">
        <Col>
          <Title level={2} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
            Purchase & Sale Report
          </Title>
          <Text style={{ fontSize: 14, color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c", display: "block", marginTop: 4 }}>
            Purchase & sale details for the selected date range
          </Text>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            onClick={handlePrint}
            style={{ height: 40, borderRadius: 6, fontWeight: 500 }}
          >
            Print
          </Button>
        </Col>
      </Row>

      {/* Filters */}
      <FilterPanel filters={filterConfig} onFilterChange={setFilterConfig} defaultExpanded={true} />

      {/* Two columns: Purchases | Sales */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: 8,
            }}
            styles={{ body: { padding: "20px 24px" } }}
          >
            <Title level={5} style={{ margin: "0 0 16px 0", color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
              Purchases
            </Title>
            <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
              <Col>
                <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                  Total Purchase:
                </Text>
              </Col>
              <Col>
                <div style={summaryRowStyle}>{formatCurrency(purchaseData.totalPurchase)}</div>
              </Col>
            </Row>
            <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
              <Col>
                <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                  Purchase Including tax:
                </Text>
              </Col>
              <Col>
                <div style={summaryRowStyle}>{formatCurrency(purchaseData.purchaseIncludingTax)}</div>
              </Col>
            </Row>
            <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
              <Col>
                <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                  Total Purchase Return Including Tax:
                </Text>
              </Col>
              <Col>
                <div style={summaryRowStyle}>{formatCurrency(purchaseData.totalPurchaseReturnIncludingTax)}</div>
              </Col>
            </Row>
            <Row justify="space-between" align="middle">
              <Col>
                <span>
                  <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                    Purchase Due:
                  </Text>
                  <InfoIcon />
                </span>
              </Col>
              <Col>
                <div style={summaryRowStyle}>{formatCurrency(purchaseData.purchaseDue)}</div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: 8,
            }}
            styles={{ body: { padding: "20px 24px" } }}
          >
            <Title level={5} style={{ margin: "0 0 16px 0", color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
              Sales
            </Title>
            <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
              <Col>
                <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                  Total Sale:
                </Text>
              </Col>
              <Col>
                <div style={summaryRowStyle}>{formatCurrency(saleData.totalSale)}</div>
              </Col>
            </Row>
            <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
              <Col>
                <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                  Sale Including tax:
                </Text>
              </Col>
              <Col>
                <div style={summaryRowStyle}>{formatCurrency(saleData.saleIncludingTax)}</div>
              </Col>
            </Row>
            <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
              <Col>
                <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                  Total Sell Return Including Tax:
                </Text>
              </Col>
              <Col>
                <div style={summaryRowStyle}>{formatCurrency(saleData.totalSellReturnIncludingTax)}</div>
              </Col>
            </Row>
            <Row justify="space-between" align="middle">
              <Col>
                <span>
                  <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                    Sale Due:
                  </Text>
                  <InfoIcon />
                </span>
              </Col>
              <Col>
                <div style={summaryRowStyle}>{formatCurrency(saleData.saleDue)}</div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Overall summary */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
        }}
        styles={{ body: { padding: "20px 24px" } }}
      >
        <Title level={5} style={{ margin: "0 0 16px 0", color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
          <span>
            Overall ((Sale - Sell Return) - (Purchase - Purchase Return))
            <OverallInfoIcon />
          </span>
        </Title>
        <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
          <Col>
            <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
              Sale - Purchase:
            </Text>
          </Col>
          <Col>
            <div style={summaryRowStyle}>{formatCurrency(saleMinusPurchase)}</div>
          </Col>
        </Row>
        <Row justify="space-between" align="middle">
          <Col>
            <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
              Due amount:
            </Text>
          </Col>
          <Col>
            <div style={summaryRowStyle}>{formatCurrency(dueAmount)}</div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PurchaseSaleReport;
