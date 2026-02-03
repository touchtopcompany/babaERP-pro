import React from "react";
import { Collapse, Select, DatePicker, TimePicker, Checkbox, Row, Col, Typography, Space } from "antd";
import type { CollapseProps } from "antd";
import { DownOutlined, FilterOutlined, ClockCircleOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import useTheme from "@/theme/useTheme";

const { RangePicker: DateRangePicker } = DatePicker;
const { Text } = Typography;

export interface FilterConfig {
  businessLocation?: {
    label: string;
    value: string;
    options: Array<{ label: string; value: string }>;
  };
  user?: {
    label: string;
    value: string;
    options: Array<{ label: string; value: string }>;
  };
  customer?: {
    label: string;
    value: string;
    options: Array<{ label: string; value: string }>;
  };
  paymentStatus?: {
    label: string;
    value: string;
    options: Array<{ label: string; value: string }>;
  };
  dateRange?: {
    label: string;
    value: [Dayjs, Dayjs] | null;
  };
  timeRange?: {
    label: string;
    value: [Dayjs, Dayjs] | null;
  };
  shippingStatus?: {
    label: string;
    value: string;
    options: Array<{ label: string; value: string }>;
  };
  subscriptions?: {
    label: string;
    value: boolean;
  };
  // Additional custom filters
  [key: string]: any;
}

export interface FilterPanelProps {
  filters: FilterConfig;
  onFilterChange: (filters: FilterConfig) => void;
  defaultExpanded?: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  defaultExpanded = true,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleFilterChange = (key: string, value: any) => {
    onFilterChange({
      ...filters,
      [key]: {
        ...filters[key],
        value,
      },
    });
  };

  const filterStyle = {
    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
    borderRadius: "8px",
    marginBottom: "24px",
  };

  const inputStyle = {
    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
    borderRadius: "6px",
    color: isDark ? "#fff" : "#1f1f1f",
    width: "100%",
  };

  const labelStyle = {
    color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
    fontSize: "13px",
    marginBottom: "8px",
    display: "block",
  };

  const collapseItems: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <Space>
          <FilterOutlined style={{ color: "#1890ff", fontSize: "14px" }} />
          <Text strong style={{ color: "#1890ff", fontSize: "14px" }}>
            Filters
          </Text>
        </Space>
      ),
      style: { background: "transparent", border: "none" },
      children: (
        <Row gutter={[16, 16]}>
          {/* First Row */}
          {filters.businessLocation && (
            <Col xs={24} sm={12} md={6}>
              <Text style={labelStyle}>{filters.businessLocation.label || "Business Location:"}</Text>
              <Select
                value={filters.businessLocation.value}
                onChange={(value) => handleFilterChange("businessLocation", value)}
                options={filters.businessLocation.options}
                suffixIcon={<DownOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                style={inputStyle}
              />
            </Col>
          )}

          {filters.user && (
            <Col xs={24} sm={12} md={6}>
              <Text style={labelStyle}>{filters.user.label || "User:"}</Text>
              <Select
                value={filters.user.value}
                onChange={(value) => handleFilterChange("user", value)}
                options={filters.user.options}
                suffixIcon={<DownOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                style={inputStyle}
              />
            </Col>
          )}

          {filters.customer && (
            <Col xs={24} sm={12} md={6}>
              <Text style={labelStyle}>{filters.customer.label || "Customer:"}</Text>
              <Select
                value={filters.customer.value}
                onChange={(value) => handleFilterChange("customer", value)}
                options={filters.customer.options}
                suffixIcon={<DownOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                style={inputStyle}
              />
            </Col>
          )}

          {filters.paymentStatus && (
            <Col xs={24} sm={12} md={6}>
              <Text style={labelStyle}>{filters.paymentStatus.label || "Payment Status:"}</Text>
              <Select
                value={filters.paymentStatus.value}
                onChange={(value) => handleFilterChange("paymentStatus", value)}
                options={filters.paymentStatus.options}
                suffixIcon={<DownOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                style={inputStyle}
              />
            </Col>
          )}

          {/* Second Row */}
          {filters.dateRange && (
            <Col xs={24} sm={12} md={6}>
              <Text style={labelStyle}>{filters.dateRange.label || "Date Range:"}</Text>
              <DateRangePicker
                value={filters.dateRange.value}
                onChange={(dates) => handleFilterChange("dateRange", dates)}
                format="MM/DD/YYYY"
                style={inputStyle}
                suffixIcon={null}
              />
            </Col>
          )}

          {filters.timeRange && (
            <Col xs={24} sm={12} md={6}>
              <Text style={labelStyle}>{filters.timeRange.label || "Time range:"}</Text>
              <Space.Compact style={{ width: "100%" }}>
                <TimePicker
                  value={filters.timeRange.value?.[0] || null}
                  onChange={(time) => {
                    if (time) {
                      handleFilterChange("timeRange", [
                        time,
                        filters.timeRange?.value?.[1] || dayjs("23:59", "HH:mm"),
                      ]);
                    }
                  }}
                  format="HH:mm"
                  style={{ ...inputStyle, width: "50%" }}
                  suffixIcon={<ClockCircleOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                />
                <TimePicker
                  value={filters.timeRange.value?.[1] || null}
                  onChange={(time) => {
                    if (time) {
                      handleFilterChange("timeRange", [
                        filters.timeRange?.value?.[0] || dayjs("00:00", "HH:mm"),
                        time,
                      ]);
                    }
                  }}
                  format="HH:mm"
                  style={{ ...inputStyle, width: "50%" }}
                  suffixIcon={<ClockCircleOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                />
              </Space.Compact>
            </Col>
          )}

          {filters.shippingStatus && (
            <Col xs={24} sm={12} md={6}>
              <Text style={labelStyle}>{filters.shippingStatus.label || "Shipping Status:"}</Text>
              <Select
                value={filters.shippingStatus.value}
                onChange={(value) => handleFilterChange("shippingStatus", value)}
                options={filters.shippingStatus.options}
                suffixIcon={<DownOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                style={inputStyle}
              />
            </Col>
          )}

          {filters.subscriptions && (
            <Col xs={24} sm={12} md={6}>
              <Checkbox
                checked={filters.subscriptions.value}
                onChange={(e) => handleFilterChange("subscriptions", e.target.checked)}
                style={{
                  color: isDark ? "#fff" : "#1f1f1f",
                  marginTop: "24px",
                }}
              >
                {filters.subscriptions.label || "Subscriptions"}
              </Checkbox>
            </Col>
          )}

          {/* Custom filters - supplier, purchaseStatus, etc */}
          {Object.keys(filters).map((key) => {
            const filter = filters[key];
            // Skip standard filters that are already rendered
            if (['businessLocation', 'user', 'customer', 'paymentStatus', 'dateRange', 'timeRange', 'shippingStatus', 'subscriptions'].includes(key)) {
              return null;
            }
            
            // Render custom select filters
            if (filter && typeof filter === 'object' && 'value' in filter && 'options' in filter && Array.isArray(filter.options)) {
              return (
                <Col xs={24} sm={12} md={6} key={key}>
                  <Text style={labelStyle}>{filter.label || `${key}:`}</Text>
                  <Select
                    value={filter.value}
                    onChange={(value) => handleFilterChange(key, value)}
                    options={filter.options}
                    suffixIcon={<DownOutlined style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c" }} />}
                    style={inputStyle}
                    allowClear={filter.allowClear}
                    placeholder={filter.placeholder}
                  />
                </Col>
              );
            }
            
            // Render custom checkbox filters
            if (filter && typeof filter === 'object' && 'value' in filter && typeof filter.value === 'boolean' && 'label' in filter) {
              return (
                <Col xs={24} sm={12} md={6} key={key}>
                  <Checkbox
                    checked={filter.value}
                    onChange={(e) => handleFilterChange(key, e.target.checked)}
                    style={{
                      color: isDark ? "#fff" : "#1f1f1f",
                      marginTop: "24px",
                    }}
                  >
                    {filter.label || key}
                  </Checkbox>
                </Col>
              );
            }
            return null;
          })}
        </Row>
      ),
    },
  ];

  return (
    <Collapse
      defaultActiveKey={defaultExpanded ? ["1"] : []}
      style={filterStyle}
      expandIcon={({ isActive }) => (
        <DownOutlined
          style={{
            color: "#1890ff",
            fontSize: "12px",
            transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      )}
      expandIconPosition="start"
      items={collapseItems}
    />
  );
};

export default FilterPanel;

