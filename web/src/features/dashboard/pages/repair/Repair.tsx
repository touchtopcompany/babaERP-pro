import React, { useState } from "react";
import {
  Card,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Select,
  DatePicker,
  Statistic,
  Progress,
  Tag,
} from "antd";
import {
  ToolOutlined,
  PlusOutlined,
  FileTextOutlined,
  TagsOutlined,
  SettingOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import { useNavigate } from "react-router-dom";
import dayjs, { type Dayjs } from "dayjs";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface RepairStats {
  totalJobs: number;
  pendingJobs: number;
  inProgressJobs: number;
  completedJobs: number;
  totalRevenue: number;
  avgRepairTime: number;
}

const Repair: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<[Dayjs, Dayjs] | null>([
    dayjs("2025-01-01"),
    dayjs("2025-12-31"),
  ]);

  // Mock statistics data
  const stats: RepairStats = {
    totalJobs: 156,
    pendingJobs: 23,
    inProgressJobs: 45,
    completedJobs: 88,
    totalRevenue: 45600.00,
    avgRepairTime: 3.5,
  };

  // Recent job sheets data
  const recentJobs = [
    {
      id: "JS001",
      customer: "John Doe",
      device: "iPhone 14",
      status: "completed",
      cost: 150.00,
      date: "2025-01-15",
    },
    {
      id: "JS002",
      customer: "Jane Smith",
      device: "Samsung Galaxy S23",
      status: "in_progress",
      cost: 200.00,
      date: "2025-01-16",
    },
    {
      id: "JS003",
      customer: "Mike Johnson",
      device: "Dell XPS 15",
      status: "pending",
      cost: 300.00,
      date: "2025-01-17",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "in_progress":
        return "processing";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    return status.replace("_", " ").toUpperCase();
  };

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      {/* Header Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }} align="middle">
        <Col xs={24} sm={12} md={16} lg={18}>
          <Title
            level={2}
            style={{
              margin: 0,
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            Repair Management
          </Title>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Select
              placeholder="Please Select"
              style={{ width: 150 }}
            />
            <RangePicker
              value={selectedDate}
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  setSelectedDate([dates[0], dates[1]]);
                } else {
                  setSelectedDate(null);
                }
              }}
              format="MM/DD/YYYY"
              placeholder={["Start date", "End date"]}
            />
          </Space>
        </Col>
      </Row>

      {/* Navigation Links */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
        styles={{ body: { padding: "16px 24px" } }}
      >
        <Space size="large" wrap>
          <Button type="link" style={{ padding: 0, height: "auto" }}>
            <Text strong style={{ color: "#1890ff" }}>Repair</Text>
          </Button>
          <Button
            type="link"
            style={{ padding: 0, height: "auto" }}
            onClick={() => navigate("/repair/add-job-sheet")}
          >
            <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
              <PlusOutlined /> Add Job Sheet
            </Text>
          </Button>
          <Button
            type="link"
            style={{ padding: 0, height: "auto" }}
            onClick={() => navigate("/repair/job-sheets")}
          >
            <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
              <FileTextOutlined /> Job Sheets
            </Text>
          </Button>
          <Button
            type="link"
            style={{ padding: 0, height: "auto" }}
            onClick={() => navigate("/repair/brands")}
          >
            <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
              <TagsOutlined /> Brands
            </Text>
          </Button>
          <Button
            type="link"
            style={{ padding: 0, height: "auto" }}
            onClick={() => navigate("/repair/invoices")}
          >
            <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
              <FileTextOutlined /> List Invoice
            </Text>
          </Button>
          <Button
            type="link"
            style={{ padding: 0, height: "auto" }}
            onClick={() => navigate("/repair/add-invoice")}
          >
            <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
              <FileTextOutlined /> Add Invoice
            </Text>
          </Button>
          <Button
            type="link"
            style={{ padding: 0, height: "auto" }}
            onClick={() => navigate("/repair/settings")}
          >
            <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
              <SettingOutlined /> Settings
            </Text>
          </Button>
        </Space>
      </Card>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            styles={{ body: { padding: "24px" } }}
          >
            <Statistic
              title="Total Jobs"
              value={stats.totalJobs}
              prefix={<ToolOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            styles={{ body: { padding: "24px" } }}
          >
            <Statistic
              title="Pending Jobs"
              value={stats.pendingJobs}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            styles={{ body: { padding: "24px" } }}
          >
            <Statistic
              title="Completed Jobs"
              value={stats.completedJobs}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            styles={{ body: { padding: "24px" } }}
          >
            <Statistic
              title="Total Revenue"
              value={stats.totalRevenue}
              prefix="$"
              precision={2}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Progress Overview and Recent Jobs */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            title={
              <Title
                level={4}
                style={{
                  margin: 0,
                  color: isDark ? "#fff" : "#1f1f1f",
                  fontWeight: 600,
                }}
              >
                Job Status Overview
              </Title>
            }
            styles={{ body: { padding: "24px" } }}
          >
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <Text>Pending</Text>
                  <Text strong>{stats.pendingJobs}</Text>
                </div>
                <Progress
                  percent={(stats.pendingJobs / stats.totalJobs) * 100}
                  strokeColor="#faad14"
                  showInfo={false}
                />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <Text>In Progress</Text>
                  <Text strong>{stats.inProgressJobs}</Text>
                </div>
                <Progress
                  percent={(stats.inProgressJobs / stats.totalJobs) * 100}
                  strokeColor="#1890ff"
                  showInfo={false}
                />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <Text>Completed</Text>
                  <Text strong>{stats.completedJobs}</Text>
                </div>
                <Progress
                  percent={(stats.completedJobs / stats.totalJobs) * 100}
                  strokeColor="#52c41a"
                  showInfo={false}
                />
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
            }}
            title={
              <Title
                level={4}
                style={{
                  margin: 0,
                  color: isDark ? "#fff" : "#1f1f1f",
                  fontWeight: 600,
                }}
              >
                Recent Job Sheets By Service Staff
              </Title>
            }
            styles={{ body: { padding: "24px" } }}
          >
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0"}` }}>
                    <th style={{ padding: "12px 8px", textAlign: "left", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>Job ID</th>
                    <th style={{ padding: "12px 8px", textAlign: "left", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>Customer</th>
                    <th style={{ padding: "12px 8px", textAlign: "left", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>Device</th>
                    <th style={{ padding: "12px 8px", textAlign: "left", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>Status</th>
                    <th style={{ padding: "12px 8px", textAlign: "right", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>Cost</th>
                    <th style={{ padding: "12px 8px", textAlign: "left", color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentJobs.map((job) => (
                    <tr key={job.id} style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f5f5f5"}` }}>
                      <td style={{ padding: "12px 8px" }}>
                        <Text strong>{job.id}</Text>
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <Text>{job.customer}</Text>
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <Text>{job.device}</Text>
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <Tag color={getStatusColor(job.status)}>
                          {getStatusText(job.status)}
                        </Tag>
                      </td>
                      <td style={{ padding: "12px 8px", textAlign: "right" }}>
                        <Text strong>${job.cost.toFixed(2)}</Text>
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <Text>{job.date}</Text>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Repair;
