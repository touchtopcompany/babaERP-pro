import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Row,
  Col,
  Upload,
  message,
  List,
} from "antd";
import {
  ExportOutlined,
  ImportOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd";
import useTheme from "@/theme/useTheme";

const { Title, Text } = Typography;

const UpdatePrice: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [exportLoading, setExportLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [importFileList, setImportFileList] = useState<UploadFile[]>([]);

  const handleExport = async (values: any) => {
    setExportLoading(true);
    try {
      // TODO: Implement API call to export price group prices
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Generate CSV file
      const headers = ["Product SKU", "Product Name", "Price Group", "Price"];
      const csvContent = [
        headers.join(","),
        // Mock data rows
        "SKU001,Product 1,Price Group 1,10000",
        "SKU002,Product 2,Price Group 1,15000",
        "SKU003,Product 3,Price Group 1,20000",
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `price_group_${values.priceGroup || "export"}_${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      message.success("Price group prices exported successfully");
    } catch (error) {
      message.error("Failed to export price group prices");
    } finally {
      setExportLoading(false);
    }
  };

  const handleImport = async () => {
    if (importFileList.length === 0) {
      message.warning("Please select a file to import");
      return;
    }

    setImportLoading(true);
    try {
      // TODO: Implement API call to import price group prices
      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.success("Price group prices imported successfully");
      setImportFileList([]);
    } catch (error) {
      message.error("Failed to import price group prices");
    } finally {
      setImportLoading(false);
    }
  };

  const instructions = [
    "Export Price group prices.",
    "Update the exported file and import the same file.",
    "Only price group prices of the product will be updated. Any blank price will be skipped.",
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
            Update Price
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Export and import price group prices to update product prices
          </Text>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Export Price Group Prices Section */}
        <Col xs={24} lg={12}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
              borderTop: "4px solid #1890ff",
            }}
            bodyStyle={{ padding: "24px", overflow: "hidden" }}
          >
            <Title
              level={4}
              style={{
                marginBottom: "24px",
                color: isDark ? "#fff" : "#1f1f1f",
                fontWeight: 600,
              }}
            >
              Export Price Group Prices
            </Title>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleExport}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    name="priceGroup"
                    label="Price Group:"
                  >
                    <Select
                      placeholder="Please Select"
                      style={{
                        height: "40px",
                        borderRadius: "6px",
                      }}
                    >
                      <Select.Option value="priceGroup1">Price Group 1</Select.Option>
                      <Select.Option value="priceGroup2">Price Group 2</Select.Option>
                      <Select.Option value="priceGroup3">Price Group 3</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    name="category"
                    label="Category:"
                  >
                    <Input
                      placeholder="Category"
                      style={{
                        height: "40px",
                        borderRadius: "6px",
                        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                        color: isDark ? "#fff" : "#1f1f1f",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item style={{ marginBottom: "24px" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<ExportOutlined />}
                  loading={exportLoading}
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                    fontWeight: 500,
                  }}
                >
                  Export
                </Button>
              </Form.Item>
            </Form>

            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                background: isDark ? "rgba(255,255,255,0.03)" : "#f5f5f5",
                borderRadius: "6px",
              }}
            >
              <Text
                strong
                style={{
                  fontSize: "14px",
                  color: isDark ? "#fff" : "#1f1f1f",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                Instructions:
              </Text>
              <List
                size="small"
                dataSource={instructions}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      padding: "4px 0",
                      border: "none",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "13px",
                        color: isDark ? "rgba(255,255,255,0.65)" : "#595959",
                      }}
                    >
                      • {item}
                    </Text>
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>

        {/* Import Price Group Prices Section */}
        <Col xs={24} lg={12}>
          <Card
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
              borderRadius: "8px",
          overflow: "hidden",
          maxWidth: "100%",
              borderTop: "4px solid #1890ff",
            }}
            bodyStyle={{ padding: "24px", overflow: "hidden" }}
          >
            <Title
              level={4}
              style={{
                marginBottom: "24px",
                color: isDark ? "#fff" : "#1f1f1f",
                fontWeight: 600,
              }}
            >
              Import Price Group Prices
            </Title>

            <Form layout="vertical">
              <Form.Item
                label="Choose File"
                style={{ marginBottom: "24px" }}
              >
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
                    {importFileList.length > 0
                      ? importFileList[0].name
                      : "Choose File"}
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
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  icon={<ImportOutlined />}
                  onClick={handleImport}
                  loading={importLoading}
                  style={{
                    height: "40px",
                    borderRadius: "6px",
                    fontWeight: 500,
                  }}
                >
                  Import
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UpdatePrice;

