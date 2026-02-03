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
  Table,
  Divider,
  Input,
  Checkbox,
} from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;

interface InstructionRow {
  key: string;
  columnNumber: string;
  columnName: string;
  instruction: string;
}

const StockTaking: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [businessLocation, setBusinessLocation] = useState<string>("C2Z Digital Solutions (C2Z1)");
  const [stockStatus, setStockStatus] = useState<string>("all");
  const [category, setCategory] = useState<string>("");
  const [exportStockReport, setExportStockReport] = useState<boolean>(false);

  const handleFileChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];

    // Limit to 1 file
    newFileList = newFileList.slice(-1);

    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].name) {
      setSelectedFile(newFileList[0].name);
    } else {
      setSelectedFile("");
    }
  };

  const handleImport = () => {
    if (fileList.length === 0) {
      message.warning("Please select a file to import");
      return;
    }
    setUploading(true);
    // TODO: Implement file import logic
    setTimeout(() => {
      setUploading(false);
      message.success("Stock data imported successfully");
      setFileList([]);
      setSelectedFile("");
    }, 2000);
  };

  const handleDownloadTemplate = () => {
    // Create CSV template headers based on the instructions
    const headers = [
      "Product SKU",
      "Product Name",
      "Category",
      "Product Unit",
      "Current Stock",
      "Unit Price",
      "Actual Count",
      "Location",
    ];
    const csvContent = headers.join(",") + "\n";
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "product_stock_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Template file downloaded successfully");
  };

  const instructionColumns: ColumnsType<InstructionRow> = [
    {
      title: "Column Number",
      dataIndex: "columnNumber",
      key: "columnNumber",
      width: 150,
      align: "center",
    },
    {
      title: "Column Name",
      dataIndex: "columnName",
      key: "columnName",
      width: 250,
    },
    {
      title: "Instruction",
      dataIndex: "instruction",
      key: "instruction",
    },
  ];

  const instructionData: InstructionRow[] = [
    {
      key: "1",
      columnNumber: "1",
      columnName: "Product SKU (Required)",
      instruction: "Product SKU must be valid",
    },
    {
      key: "2",
      columnNumber: "2",
      columnName: "Product Name (Optional)",
      instruction: "",
    },
    {
      key: "3",
      columnNumber: "3",
      columnName: "Category (Optional)",
      instruction: "",
    },
    {
      key: "4",
      columnNumber: "4",
      columnName: "Product Unit (Optional)",
      instruction: "",
    },
    {
      key: "5",
      columnNumber: "5",
      columnName: "Current Stock (Required)",
      instruction: "",
    },
    {
      key: "6",
      columnNumber: "6",
      columnName: "Unit Price (Required)",
      instruction: "",
    },
    {
      key: "7",
      columnNumber: "7",
      columnName: "Actual Count (Required)",
      instruction: "Total Number of products counted physically",
    },
    {
      key: "8",
      columnNumber: "8",
      columnName: "Location (Required)",
      instruction: "",
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
            Stock Taking
          </Title>
        </Col>
      </Row>

      {/* Download Product Stock Template Section */}
      <Card
        style={{
          marginBottom: "24px",
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
        }}
        bodyStyle={{ padding: "24px" }}
      >
        <Title
          level={4}
          style={{
            marginBottom: "16px",
            color: isDark ? "#fff" : "#1f1f1f",
            fontWeight: 600,
          }}
        >
          Download Product Stock Template
        </Title>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Text
              style={{
                fontSize: "14px",
                color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Business Location:
            </Text>
            <Select
              value={businessLocation}
              onChange={setBusinessLocation}
              style={{ width: "100%" }}
            >
              <Select.Option value="C2Z Digital Solutions (C2Z1)">
                C2Z Digital Solutions (C2Z1)
              </Select.Option>
              <Select.Option value="Location 2">Location 2</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text
              style={{
                fontSize: "14px",
                color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Stock Status:
            </Text>
            <Select
              value={stockStatus}
              onChange={setStockStatus}
              style={{ width: "100%" }}
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="in_stock">In Stock</Select.Option>
              <Select.Option value="out_of_stock">Out of Stock</Select.Option>
              <Select.Option value="low_stock">Low Stock</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text
              style={{
                fontSize: "14px",
                color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Category:
            </Text>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              style={{
                background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
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
                color: "#fff",
                marginTop: "28px",
                width: "100%",
              }}
            >
              Download
            </Button>
          </Col>
        </Row>
      </Card>

      <Divider />

      {/* Import Product Stock Section */}
      <Card
        style={{
          marginBottom: "24px",
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
        }}
        bodyStyle={{ padding: "24px" }}
      >
        <Title
          level={4}
          style={{
            marginBottom: "16px",
            color: isDark ? "#fff" : "#1f1f1f",
            fontWeight: 600,
          }}
        >
          Import Product Stock
        </Title>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                value={selectedFile || "no file selected"}
                placeholder="no file selected"
                readOnly
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid #d9d9d9",
                  color: isDark
                    ? selectedFile
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(255,255,255,0.45)"
                    : selectedFile
                    ? "#1f1f1f"
                    : "#8c8c8c",
                }}
              />
              <Upload
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={() => false}
                accept=".xlsx,.xls,.csv"
                maxCount={1}
              >
                <Button
                  icon={<UploadOutlined />}
                  style={{
                    height: "32px",
                    borderRadius: "0 6px 6px 0",
                  }}
                >
                  Choose File
                </Button>
              </Upload>
            </Space.Compact>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Checkbox
              checked={exportStockReport}
              onChange={(e) => setExportStockReport(e.target.checked)}
              style={{
                color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
              }}
            >
              Export Stock Report
            </Checkbox>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={handleImport}
              loading={uploading}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
                width: "100%",
              }}
            >
              Import
            </Button>
          </Col>
        </Row>
      </Card>

      <Divider />

      {/* Instructions Section */}
      <Card
        style={{
          marginBottom: "24px",
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
        }}
        bodyStyle={{ padding: "24px" }}
      >
        <Title
          level={4}
          style={{
            marginBottom: "8px",
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
            marginBottom: "16px",
          }}
        >
          Follow the instructions carefully before importing the file. The columns of the file should be in the following order.
        </Text>
        <Table
          columns={instructionColumns}
          dataSource={instructionData}
          pagination={false}
          style={{
            marginTop: "16px",
          }}
        />
      </Card>
    </div>
  );
};

export default StockTaking;

