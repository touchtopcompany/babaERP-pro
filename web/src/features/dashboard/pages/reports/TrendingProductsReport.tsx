import React, { useState, useMemo } from "react";
import {
  Card,
  Button,
  Input,
  Space,
  Typography,
  message,
  Row,
  Col,
  Select,
  DatePicker,
  Tooltip,
} from "antd";
import { FilterOutlined, PrinterOutlined, InfoCircleOutlined, MenuOutlined } from "@ant-design/icons";
import { Column } from "@ant-design/charts";
import useTheme from "@/theme/useTheme";
import type { FilterConfig } from "../../components/filters";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface TrendingProductItem {
  product: string;
  value: number;
}

const TrendingProductsReport: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [numberOfProducts, setNumberOfProducts] = useState(5);
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    businessLocation: {
      label: "Business Location",
      value: "all",
      options: [
        { label: "All locations", value: "all" },
        { label: "C2Z Digital Solutions (C2Z1)", value: "C2Z Digital Solutions (C2Z1)" },
        { label: "Location 2", value: "Location 2" },
        { label: "Location 3", value: "Location 3" },
      ],
    },
    category: {
      label: "Category",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Electronics", value: "electronics" },
        { label: "Accessories", value: "accessories" },
      ],
    },
    subCategory: {
      label: "Sub category",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Chargers", value: "chargers" },
        { label: "Cables", value: "cables" },
      ],
    },
    brand: {
      label: "Brand",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Brand A", value: "brand_a" },
        { label: "Brand B", value: "brand_b" },
      ],
    },
    unit: {
      label: "Unit",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Pcs", value: "pcs" },
        { label: "Sets", value: "sets" },
        { label: "Pr", value: "pr" },
      ],
    },
    dateRange: {
      label: "Date Range",
      value: [dayjs().subtract(1, "month"), dayjs()],
    },
    productType: {
      label: "Product Type",
      value: "all",
      options: [
        { label: "All", value: "all" },
        { label: "Single", value: "single" },
        { label: "Variable", value: "variable" },
      ],
    },
  });

  // Mock top trending products - replace with API
  const allTrendingData: TrendingProductItem[] = [
    { product: "Drum Stick A5 - 0037 (Pr)", value: 2 },
    { product: "Drum Skin - 0038 (Sets)", value: 1 },
    { product: "Kodo complete - 0024 (Pcs)", value: 1 },
    { product: "Lenyes Air 202 - 6971192057582 (Pcs)", value: 1 },
    { product: "Keyboard (Jedel) G 17 - 6974316460756 (Pcs)", value: 1 },
    { product: "Laptop Pro 15 - LAP-PRO-15 (Pcs)", value: 0.8 },
    { product: "Wireless Mouse - ACC-WM-01 (Pcs)", value: 0.6 },
    { product: "USB-C Hub - ACC-USB-HUB (Pcs)", value: 0.5 },
  ];

  const chartData = useMemo(
    () => allTrendingData.slice(0, Math.max(1, Math.min(20, numberOfProducts))),
    [numberOfProducts]
  );

  const handleApplyFilters = () => {
    message.success("Filters applied");
  };

  const handlePrintPdf = () => {
    message.info("Print Report (PDF) – open print dialog and choose Save as PDF");
    window.print();
  };

  const handleFilterChange = (key: string, value: unknown) => {
    setFilterConfig((prev) => ({
      ...prev,
      [key]: { ...(prev as Record<string, unknown>)[key], value },
    }));
  };

  const columnConfig = useMemo(
    () => ({
      data: chartData,
      xField: "product",
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

  const labelStyle = {
    color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
    fontSize: "13px",
    marginBottom: "8px",
    display: "block" as const,
  };

  const inputStyle = {
    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
    borderRadius: 6,
    color: isDark ? "#fff" : "#1f1f1f",
    width: "100%",
  };

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Title level={2} style={{ marginBottom: 24, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
        Trending Products
      </Title>

      {/* Filters card */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
          marginBottom: 24,
          boxShadow: isDark ? "none" : "0 1px 2px rgba(0,0,0,0.03)",
        }}
        styles={{ body: { padding: "24px" } }}
      >
        <Space style={{ marginBottom: 20 }}>
          <FilterOutlined style={{ color: "#1890ff", fontSize: 14 }} />
          <Text strong style={{ color: "#1890ff", fontSize: 14 }}>
            Filters
          </Text>
        </Space>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>{filterConfig.businessLocation?.label}</Text>
            <Select
              value={filterConfig.businessLocation?.value}
              onChange={(v) => handleFilterChange("businessLocation", v)}
              options={filterConfig.businessLocation?.options}
              style={{ ...inputStyle, width: "100%" }}
              suffixIcon={null}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>{filterConfig.category?.label}</Text>
            <Select
              value={filterConfig.category?.value}
              onChange={(v) => handleFilterChange("category", v)}
              options={filterConfig.category?.options}
              style={{ ...inputStyle, width: "100%" }}
              suffixIcon={null}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>{filterConfig.subCategory?.label}</Text>
            <Select
              value={filterConfig.subCategory?.value}
              onChange={(v) => handleFilterChange("subCategory", v)}
              options={filterConfig.subCategory?.options}
              style={{ ...inputStyle, width: "100%" }}
              suffixIcon={null}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>{filterConfig.brand?.label}</Text>
            <Select
              value={filterConfig.brand?.value}
              onChange={(v) => handleFilterChange("brand", v)}
              options={filterConfig.brand?.options}
              style={{ ...inputStyle, width: "100%" }}
              suffixIcon={null}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>{filterConfig.unit?.label}</Text>
            <Select
              value={filterConfig.unit?.value}
              onChange={(v) => handleFilterChange("unit", v)}
              options={filterConfig.unit?.options}
              style={{ ...inputStyle, width: "100%" }}
              suffixIcon={null}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>{filterConfig.dateRange?.label}</Text>
            <RangePicker
              value={filterConfig.dateRange?.value ?? null}
              onChange={(dates) => handleFilterChange("dateRange", dates)}
              format="MM/DD/YYYY"
              placeholder={["Start date", "End date"]}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>
              Number of products
              <Tooltip title="Number of top trending products to display in the chart">
                <InfoCircleOutlined style={{ marginLeft: 6, color: "#1890ff", fontSize: 12 }} />
              </Tooltip>
            </Text>
            <Input
              type="number"
              min={1}
              max={20}
              value={numberOfProducts}
              onChange={(e) => setNumberOfProducts(Number(e.target.value) || 5)}
              style={inputStyle}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Text style={labelStyle}>{filterConfig.productType?.label}</Text>
            <Select
              value={filterConfig.productType?.value}
              onChange={(v) => handleFilterChange("productType", v)}
              options={filterConfig.productType?.options}
              style={{ ...inputStyle, width: "100%" }}
              suffixIcon={null}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }} justify="space-between">
          <Col>
            <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrintPdf} style={{ borderRadius: 6 }}>
              Print Report (PDF)
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={handleApplyFilters} style={{ borderRadius: 6 }}>
              Apply Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Top Trending Products chart */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: 8,
          boxShadow: isDark ? "none" : "0 1px 2px rgba(0,0,0,0.03)",
        }}
        styles={{ body: { padding: "24px" } }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <Space>
            <Title level={5} style={{ margin: 0, color: isDark ? "#fff" : "#1f1f1f", fontWeight: 600 }}>
              Top Trending Products
            </Title>
            <Tooltip title="Total units sold for the selected period">
              <InfoCircleOutlined style={{ color: "#1890ff", fontSize: 14 }} />
            </Tooltip>
          </Space>
          <Button type="text" icon={<MenuOutlined />} style={{ color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }} />
        </div>
        <div style={{ height: 320 }}>
          <Column {...columnConfig} />
        </div>
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: "#1890ff", display: "inline-block" }} />
          <Text style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.65)" : "#595959" }}>Total unit sold</Text>
        </div>
      </Card>
    </div>
  );
};

export default TrendingProductsReport;
