import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Typography,
  Row,
  Col,
  Upload,
  message,
  Table,
  Space,
  Tooltip,
} from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  CheckOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;

interface InstructionRow {
  key: string;
  columnNumber: number;
  columnName: string;
  instruction: string;
}

const ImportOpeningStock: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [importFileList, setImportFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (importFileList.length === 0) {
      message.warning("Please select a file to import");
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement API call to import opening stock
      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.success("Opening stock imported successfully");
      setImportFileList([]);
    } catch (error) {
      message.error("Failed to import opening stock");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    // Create CSV template with all column headers
    const headers = [
      "SKU",
      "Location",
      "Quantity",
      "Unit Cost (Before Tax)",
      "Lot Number",
      "Expiry Date",
    ];
    
    const csvContent = headers.join(",") + "\n";
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "opening_stock_import_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Template downloaded successfully");
  };

  const instructionColumns: ColumnsType<InstructionRow> = [
    {
      title: "Column Number",
      dataIndex: "columnNumber",
      key: "columnNumber",
      width: 120,
      align: "center",
      render: (value: number) => (
        <Text
          strong
          style={{
            fontSize: "14px",
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          {value}
        </Text>
      ),
    },
    {
      title: "Column Name",
      dataIndex: "columnName",
      key: "columnName",
      width: 300,
      render: (text: string, record) => (
        <div>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "#fff" : "#1f1f1f",
            }}
          >
            {text}
          </Text>
          {record.columnNumber === 2 && (
            <Text
              type="secondary"
              style={{
                display: "block",
                fontSize: "12px",
                marginTop: "4px",
                color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              }}
            >
              If blank first business location will be used
            </Text>
          )}
        </div>
      ),
    },
    {
      title: "Instruction",
      dataIndex: "instruction",
      key: "instruction",
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text || ""}
        </Text>
      ),
    },
  ];

  const instructions: InstructionRow[] = [
    {
      key: "1",
      columnNumber: 1,
      columnName: "SKU (Required)",
      instruction: "",
    },
    {
      key: "2",
      columnNumber: 2,
      columnName: "Location (Optional)",
      instruction: "Name of the business location.",
    },
    {
      key: "3",
      columnNumber: 3,
      columnName: "Quantity (Required)",
      instruction: "",
    },
    {
      key: "4",
      columnNumber: 4,
      columnName: "Unit Cost (Before Tax) (Required)",
      instruction: "",
    },
    {
      key: "5",
      columnNumber: 5,
      columnName: "Lot Number (Optional)",
      instruction: "",
    },
    {
      key: "6",
      columnNumber: 6,
      columnName: "Expiry Date (Optional)",
      instruction: "Stock expiry date in Business date format mm/dd/yyyy, Type: text, Example: 12/26/2025",
    },
  ];

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
            Import Opening Stock
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Import opening stock from CSV or Excel files
          </Text>
        </Col>
      </Row>

      {/* File Import Section */}
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
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={24} md={12} lg={8}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Space>
                <Text
                  strong
                  style={{
                    fontSize: "14px",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  File To Import:
                </Text>
                <Tooltip title="Upload a CSV or Excel file with opening stock data">
                  <InfoCircleOutlined
                    style={{
                      color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                      fontSize: "14px",
                      cursor: "help",
                    }}
                  />
                </Tooltip>
              </Space>
              <Upload
                fileList={importFileList}
                onChange={({ fileList }) => setImportFileList(fileList)}
                beforeUpload={() => false}
                accept=".csv,.xlsx,.xls"
                maxCount={1}
              >
                <Button
                  icon={<UploadOutlined />}
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                    fontWeight: 500,
                    width: "100%",
                  }}
                >
                  Choose File
                </Button>
              </Upload>
              {importFileList.length === 0 && (
                <Text
                  type="secondary"
                  style={{
                    display: "block",
                    marginTop: "8px",
                    fontSize: "12px",
                  }}
                >
                  no file selected
                </Text>
              )}
            </Space>
          </Col>
          <Col xs={24} sm={24} md={12} lg={4}>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleSubmit}
              loading={loading}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
                width: "100%",
              }}
            >
              Submit
            </Button>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownloadTemplate}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
                background: "#52c41a",
                borderColor: "#52c41a",
                width: "100%",
              }}
            >
              Download template file
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Instructions Section */}
      <Card
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
        }}
        bodyStyle={{ padding: "24px", overflow: "hidden" }}
      >
        <Title
          level={4}
          style={{
            marginBottom: "16px",
            color: isDark ? "#fff" : "#1f1f1f",
            fontWeight: 600,
          }}
        >
          Instructions
        </Title>
        <Text
          style={{
            fontSize: "14px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            display: "block",
            marginBottom: "24px",
          }}
        >
          Follow the instructions carefully before importing the file. The columns of the file should be in the following order.
        </Text>

        <Table
          columns={instructionColumns}
          dataSource={instructions}
          pagination={false}
          scroll={{ x: "max-content" }}
          style={{
            background: isDark ? "transparent" : "#fafafa",
          }}
        />
      </Card>
    </div>
  );
};

export default ImportOpeningStock;

