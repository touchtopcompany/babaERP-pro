import React, { useState } from "react";
import {
  Card,
  Button,
  Upload,
  Space,
  Typography,
  message,
  Row,
  Col,
  Select,
  Steps,
  Table,
  Tag,
  Alert,
  Divider,
} from "antd";
import {
  UploadOutlined,
  FileTextOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;

interface ImportPreviewData {
  key: string;
  name: string;
  email: string;
  phone: string;
  type: "customer" | "supplier";
  status: "success" | "error";
  error?: string;
}

const ImportContacts: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [currentStep, setCurrentStep] = useState(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [contactType, setContactType] = useState<"customer" | "supplier" | "both">("both");
  const [importing, setImporting] = useState(false);
  const [previewData, setPreviewData] = useState<ImportPreviewData[]>([]);
  const [importResult, setImportResult] = useState<{
    total: number;
    success: number;
    failed: number;
  } | null>(null);

  // Mock preview data - replace with actual file parsing
  const mockPreviewData: ImportPreviewData[] = [
    {
      key: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+255 123 456 789",
      type: "customer",
      status: "success",
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+255 987 654 321",
      type: "supplier",
      status: "success",
    },
    {
      key: "3",
      name: "Invalid Contact",
      email: "invalid-email",
      phone: "",
      type: "customer",
      status: "error",
      error: "Invalid email format",
    },
  ];

  const handleFileChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];

    // Limit to 1 file
    newFileList = newFileList.slice(-1);

    setFileList(newFileList);
  };

  const handleDownloadTemplate = () => {
    // Create CSV template
    const headers = ["Name", "Email", "Phone", "Type", "Business Name", "Address", "Tax Number"];
    const csvContent = headers.join(",") + "\n";
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "contacts_import_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Template downloaded successfully");
  };

  const handlePreview = () => {
    if (fileList.length === 0) {
      message.warning("Please upload a file first");
      return;
    }
    // TODO: Parse and preview actual file data
    setPreviewData(mockPreviewData);
    setCurrentStep(1);
  };

  const handleImport = async () => {
    if (previewData.length === 0) {
      message.warning("No data to import");
      return;
    }

    setImporting(true);
    try {
      // TODO: Implement actual import API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const successCount = previewData.filter((item) => item.status === "success").length;
      const failedCount = previewData.filter((item) => item.status === "error").length;

      setImportResult({
        total: previewData.length,
        success: successCount,
        failed: failedCount,
      });

      setCurrentStep(2);
      message.success(`Successfully imported ${successCount} contacts`);
    } catch (error) {
      message.error("Failed to import contacts");
    } finally {
      setImporting(false);
    }
  };

  const handleReset = () => {
    setFileList([]);
    setPreviewData([]);
    setImportResult(null);
    setCurrentStep(0);
    setContactType("both");
  };

  const previewColumns: ColumnsType<ImportPreviewData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type: string) => (
        <Tag color={type === "customer" ? "blue" : "green"}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string, record) => (
        <Space>
          {status === "success" ? (
            <Tag color="success" icon={<CheckCircleOutlined />}>
              Valid
            </Tag>
          ) : (
            <Tag color="error" icon={<CloseCircleOutlined />}>
              Error
            </Tag>
          )}
          {record.error && (
            <Text type="danger" style={{ fontSize: "12px" }}>
              {record.error}
            </Text>
          )}
        </Space>
      ),
    },
  ];

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
      const isExcel =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.name.endsWith(".xlsx") ||
        file.name.endsWith(".xls");

      if (!isCSV && !isExcel) {
        message.error("You can only upload CSV or Excel files!");
        return Upload.LIST_IGNORE;
      }

      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("File must be smaller than 10MB!");
        return Upload.LIST_IGNORE;
      }

      return false; // Prevent auto upload
    },
    fileList,
    onChange: handleFileChange,
    accept: ".csv,.xlsx,.xls",
  };

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
            Import Contacts
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Import customers and suppliers from CSV or Excel files
          </Text>
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
              icon={<DownloadOutlined />}
              onClick={handleDownloadTemplate}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Download Template
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleReset}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Reset
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Steps */}
      <Card
        style={{
          marginBottom: "24px",
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
        }}
        bodyStyle={{ padding: "24px", overflow: "hidden" }}
      >
        <Steps
          current={currentStep}
          items={[
            {
              title: "Upload File",
              description: "Select CSV or Excel file",
            },
            {
              title: "Preview & Validate",
              description: "Review imported data",
            },
            {
              title: "Import Complete",
              description: "Contacts imported",
            },
          ]}
        />
      </Card>

      {/* Step 0: Upload File */}
      {currentStep === 0 && (
        <Card
          style={{
            marginBottom: "24px",
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
          }}
          bodyStyle={{ padding: "24px", overflow: "hidden" }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Text
                strong
                style={{
                  fontSize: "16px",
                  color: isDark ? "#fff" : "#1f1f1f",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Select Contact Type
              </Text>
              <Select
                value={contactType}
                onChange={setContactType}
                style={{ width: "100%", maxWidth: "300px" }}
                size="large"
              >
                <Select.Option value="both">Both Customers & Suppliers</Select.Option>
                <Select.Option value="customer">Customers Only</Select.Option>
                <Select.Option value="supplier">Suppliers Only</Select.Option>
              </Select>
            </div>

            <Divider />

            <div>
              <Text
                strong
                style={{
                  fontSize: "16px",
                  color: isDark ? "#fff" : "#1f1f1f",
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                Upload File
              </Text>
              <Upload {...uploadProps}>
                <Button
                  icon={<UploadOutlined />}
                  size="large"
                  style={{
                    height: "50px",
                    borderRadius: "6px",
                    fontWeight: 500,
                  }}
                >
                  Click to Upload CSV or Excel File
                </Button>
              </Upload>
              <Text
                type="secondary"
                style={{
                  display: "block",
                  marginTop: "8px",
                  fontSize: "13px",
                }}
              >
                Supported formats: CSV, XLSX, XLS (Max file size: 10MB)
              </Text>
              {fileList.length > 0 && (
                <div style={{ marginTop: "16px" }}>
                  <Space>
                    <Text
                      style={{
                        fontSize: "14px",
                        color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                      }}
                    >
                      File selected: {fileList[0].name}
                    </Text>
                    <Button
                      type="primary"
                      icon={<FileTextOutlined />}
                      onClick={handlePreview}
                      size="large"
                      style={{
                        height: "40px",
                        borderRadius: "6px",
                        fontWeight: 500,
                      }}
                    >
                      Preview & Continue
                    </Button>
                  </Space>
                </div>
              )}
            </div>

            <Alert
              message="Import Instructions"
              description={
                <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                  <li>Download the template file to see the required format</li>
                  <li>Fill in your contact data following the template structure</li>
                  <li>Upload the completed file to import contacts</li>
                  <li>Review and validate the data before final import</li>
                </ul>
              }
              type="info"
              showIcon
              style={{
                background: isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)",
                border: isDark ? "1px solid rgba(24, 144, 255, 0.3)" : "1px solid rgba(24, 144, 255, 0.2)",
              }}
            />
          </Space>
        </Card>
      )}

      {/* Step 1: Preview & Validate */}
      {currentStep === 1 && (
        <Card
          style={{
            marginBottom: "24px",
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
          }}
          bodyStyle={{ padding: "24px", overflow: "hidden" }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Title
                level={4}
                style={{
                  margin: 0,
                  color: isDark ? "#fff" : "#1f1f1f",
                  fontWeight: 600,
                }}
              >
                Preview Import Data
              </Title>
              <Text
                style={{
                  fontSize: "14px",
                  color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                  display: "block",
                  marginTop: "4px",
                }}
              >
                Review the data before importing. Fix any errors before proceeding.
              </Text>
            </div>

            <Table
              columns={previewColumns}
              dataSource={previewData}
              pagination={{ pageSize: 10 }}
              scroll={{ x: "max-content" }}
              style={{
                background: isDark ? "transparent" : "#fafafa",
              }}
            />

            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button
                onClick={() => setCurrentStep(0)}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                Back
              </Button>
              <Button
                type="primary"
                onClick={handleImport}
                loading={importing}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                Import Contacts
              </Button>
            </Space>
          </Space>
        </Card>
      )}

      {/* Step 2: Import Complete */}
      {currentStep === 2 && importResult && (
        <Card
          style={{
            marginBottom: "24px",
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
          }}
          bodyStyle={{ padding: "24px", overflow: "hidden" }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Alert
              message="Import Completed"
              description={
                <div>
                  <Text>
                    Total: {importResult.total} contacts | Success:{" "}
                    <Text strong style={{ color: "#52c41a" }}>
                      {importResult.success}
                    </Text>{" "}
                    | Failed:{" "}
                    <Text strong style={{ color: "#ff4d4f" }}>
                      {importResult.failed}
                    </Text>
                  </Text>
                </div>
              }
              type={importResult.failed === 0 ? "success" : "warning"}
              showIcon
              style={{
                marginBottom: "16px",
              }}
            />

            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button
                onClick={handleReset}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                Import Another File
              </Button>
            </Space>
          </Space>
        </Card>
      )}
    </div>
  );
};

export default ImportContacts;

