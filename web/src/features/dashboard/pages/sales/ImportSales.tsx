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
} from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  EyeOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;

export interface ImportSalesData {
  key: string;
  importBatch: string;
  importTime: string;
  createdBy: string;
  invoices: number;
}

const ImportSales: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>("");

  // Mock data for imports table
  const defaultImports: ImportSalesData[] = [];

  const [imports, setImports] = useState<ImportSalesData[]>(defaultImports);

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

  const handleUploadAndReview = () => {
    if (fileList.length === 0) {
      message.warning("Please select a file to upload");
      return;
    }
    setUploading(true);
    // TODO: Implement file upload and review logic
    setTimeout(() => {
      setUploading(false);
      message.success("File uploaded successfully. Reviewing data...");
    }, 2000);
  };

  const handleDownloadTemplate = () => {
    // Create Excel template headers
    const headers = [
      "Invoice No.",
      "Customer name",
      "Customer Phone number",
      "Customer Email",
      "Sale Date",
      "Product Name",
      "Product SKU",
      "Quantity",
      "Product Unit",
      "Unit Price",
      "Item Tax",
      "Item Discount",
      "Item Description",
      "Order Total",
    ];
    const csvContent = headers.join(",") + "\n";
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "sales_import_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Template file downloaded successfully");
  };

  const handleView = (record: ImportSalesData) => {
    message.info(`Viewing import batch: ${record.importBatch}`);
    // TODO: Implement view import details
  };

  const handleDelete = (record: ImportSalesData) => {
    setImports(imports.filter((imp) => imp.key !== record.key));
    message.success("Import batch deleted successfully");
  };

  const importableFields = [
    {
      field: "Invoice No.",
      instruction: "",
    },
    {
      field: "Customer name",
      instruction: "",
    },
    {
      field: "Customer Phone number",
      instruction: "Either customer email id or phone number required",
    },
    {
      field: "Customer Email",
      instruction: "Either customer email id or phone number required",
    },
    {
      field: "Sale Date",
      instruction: "Sale date time format should be 'Y-m-d H:i:s' (2020-07-15 17:45:32)",
    },
    {
      field: "Product Name",
      instruction: "Either product name (for single and combo only) or product sku required",
    },
    {
      field: "Product SKU",
      instruction: "Either product name (for single and combo only) or product sku required",
    },
    {
      field: "Quantity",
      instruction: "Required",
    },
    {
      field: "Product Unit",
      instruction: "",
    },
    {
      field: "Unit Price",
      instruction: "",
    },
    {
      field: "Item Tax",
      instruction: "",
    },
    {
      field: "Item Discount",
      instruction: "",
    },
    {
      field: "Item Description",
      instruction: "",
    },
    {
      field: "Order Total",
      instruction: "",
    },
  ];

  const importColumns: ColumnsType<ImportSalesData> = [
    {
      title: "Import batch",
      dataIndex: "importBatch",
      key: "importBatch",
      width: 200,
      sorter: (a, b) => a.importBatch.localeCompare(b.importBatch),
    },
    {
      title: "Import time",
      dataIndex: "importTime",
      key: "importTime",
      width: 180,
      sorter: (a, b) => a.importTime.localeCompare(b.importTime),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 150,
      sorter: (a, b) => a.createdBy.localeCompare(b.createdBy),
    },
    {
      title: "Invoices",
      dataIndex: "invoices",
      key: "invoices",
      width: 120,
      align: "right",
      sorter: (a, b) => a.invoices - b.invoices,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {value}
        </Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#1890ff",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#ff4d4f",
            }}
          />
        </Space>
      ),
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
            Import Sales
          </Title>
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
              icon={<ReloadOutlined />}
              onClick={() => {
                setFileList([]);
                setSelectedFile("");
                message.success("Page refreshed");
              }}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Refresh
            </Button>
          </Space>
        </Col>
      </Row>

      {/* File Import Section */}
      <Card
        style={{
          marginBottom: "24px",
          background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          borderRadius: "8px",
        }}
        bodyStyle={{ padding: "24px" }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={24} md={6} lg={4}>
            <Text
              strong
              style={{
                fontSize: "14px",
                color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
              }}
            >
              File To Import:
            </Text>
          </Col>
          <Col xs={24} sm={24} md={12} lg={10}>
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
          <Col xs={24} sm={24} md={6} lg={10}>
            <Space>
              <Button
                type="primary"
                icon={<UploadOutlined />}
                onClick={handleUploadAndReview}
                loading={uploading}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                Upload and review
              </Button>
              <Button
                icon={<DownloadOutlined />}
                onClick={handleDownloadTemplate}
                style={{
                  height: "40px",
                  borderRadius: "6px",
                  fontWeight: 500,
                  background: "#52c41a",
                  borderColor: "#52c41a",
                  color: "#fff",
                }}
              >
                Download template file
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

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
            marginBottom: "16px",
            color: isDark ? "#fff" : "#1f1f1f",
            fontWeight: 600,
          }}
        >
          Instructions
        </Title>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <ol
            style={{
              paddingLeft: "20px",
              margin: 0,
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            }}
          >
            <li style={{ marginBottom: "8px" }}>
              <Text
                style={{
                  color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                }}
              >
                Upload sales data in excel format
              </Text>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <Text
                style={{
                  color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                }}
              >
                Choose business location and column by which sell lines will be grouped
              </Text>
            </li>
            <li style={{ marginBottom: "8px" }}>
              <Text
                style={{
                  color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
                }}
              >
                Choose respective sales fields for each column
              </Text>
            </li>
          </ol>
          <Divider style={{ margin: "16px 0" }} />
          <Table
            dataSource={importableFields}
            pagination={false}
            showHeader={true}
            columns={[
              {
                title: "Importable fields",
                dataIndex: "field",
                key: "field",
                width: "40%",
                render: (text: string) => (
                  <Text
                    strong
                    style={{
                      fontSize: "13px",
                      color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
                    }}
                  >
                    {text}
                  </Text>
                ),
              },
              {
                title: "Instructions",
                dataIndex: "instruction",
                key: "instruction",
                width: "60%",
                render: (text: string) => (
                  <Text
                    style={{
                      fontSize: "13px",
                      color: text
                        ? isDark
                          ? "rgba(255,255,255,0.65)"
                          : "#8c8c8c"
                        : isDark
                        ? "rgba(255,255,255,0.25)"
                        : "#d9d9d9",
                      fontStyle: text ? "normal" : "italic",
                    }}
                  >
                    {text || "No specific instructions"}
                  </Text>
                ),
              },
            ]}
            rowKey="field"
            style={{
              marginTop: "16px",
            }}
          />
        </Space>
      </Card>

      {/* Imports Table Section */}
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
          Imports
        </Title>
        <Table
          columns={importColumns}
          dataSource={imports}
          pagination={{
            pageSize: 25,
            showSizeChanger: false,
            showTotal: (total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
            style: {
              marginTop: "16px",
              color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            },
          }}
          scroll={{ x: "max-content" }}
          locale={{
            emptyText: "No import batches available",
          }}
        />
      </Card>
    </div>
  );
};

export default ImportSales;

