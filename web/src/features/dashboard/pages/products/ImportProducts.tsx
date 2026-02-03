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
} from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  CheckOutlined,
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

const ImportProducts: React.FC = () => {
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
      // TODO: Implement API call to import products
      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.success("Products imported successfully");
      setImportFileList([]);
    } catch (error) {
      message.error("Failed to import products");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    // Create CSV template with all column headers
    const headers = [
      "Product Name",
      "Brand",
      "Unit",
      "Category",
      "Sub category",
      "SKU",
      "Barcode Type",
      "Manage Stock?",
      "Alert quantity",
      "Expires in",
      "Expiry Period Unit",
      "Applicable Tax",
      "Selling Price Tax Type",
      "Product Type",
      "Variation Name",
      "Variation Values",
      "Variation SKUs",
      "Purchase Price (Including Tax)",
      "Purchase Price (Excluding Tax)",
      "Profit Margin %",
      "Selling Price",
      "Opening Stock",
      "Opening stock location",
      "Expiry Date",
      "Enable Product description, IMEI or Serial Number",
      "Weight",
      "Rack",
      "Row",
      "Position",
      "Image",
      "Product Description",
      "Custom Field1",
      "Custom Field2",
      "Custom Field3",
      "Custom Field4",
      "Not for selling",
      "Product locations",
    ];
    
    const csvContent = headers.join(",") + "\n";
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "products_import_template.csv");
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
      render: (text: string) => (
        <Text
          style={{
            fontSize: "14px",
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          {text}
        </Text>
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
          {text}
        </Text>
      ),
    },
  ];

  const instructions: InstructionRow[] = [
    {
      key: "1",
      columnNumber: 1,
      columnName: "Product Name (Required)",
      instruction: "Name of the product.",
    },
    {
      key: "2",
      columnNumber: 2,
      columnName: "Brand (Optional)",
      instruction: "Name of the brand (If not found new brand with the given name will be created).",
    },
    {
      key: "3",
      columnNumber: 3,
      columnName: "Unit (Required)",
      instruction: "Name of the unit.",
    },
    {
      key: "4",
      columnNumber: 4,
      columnName: "Category (Optional)",
      instruction: "Name of the Category (If not found new category with the given name will be created).",
    },
    {
      key: "5",
      columnNumber: 5,
      columnName: "Sub category (Optional)",
      instruction: "Name of the Sub-Category (If not found new sub-category with the given name under the parent Category will be created).",
    },
    {
      key: "6",
      columnNumber: 6,
      columnName: "SKU (Optional)",
      instruction: "Product SKU. If blank an SKU will be automatically generated.",
    },
    {
      key: "7",
      columnNumber: 7,
      columnName: "Barcode Type (Optional, Default: C128)",
      instruction: "Barcode Type for the product. Currently supported: C128, C39, EAN-13, EAN-8, UPC-A, UPC-E, ITF-14.",
    },
    {
      key: "8",
      columnNumber: 8,
      columnName: "Manage Stock? (Required)",
      instruction: "Enable or disable stock managemant. 1 = Yes, 0 = No.",
    },
    {
      key: "9",
      columnNumber: 9,
      columnName: "Alert quantity (Optional)",
      instruction: "Alert quantity.",
    },
    {
      key: "10",
      columnNumber: 10,
      columnName: "Expires in (Optional)",
      instruction: "Product expiry period (Only in numbers).",
    },
    {
      key: "11",
      columnNumber: 11,
      columnName: "Expiry Period Unit (Optional)",
      instruction: "Unit for the expiry period. Available Options: days, months.",
    },
    {
      key: "12",
      columnNumber: 12,
      columnName: "Applicable Tax (Optional)",
      instruction: "Name of the Tax Rate. If purchase Price (Excluding Tax) is not same as Purchase Price (Including Tax) then you must supply the tax rate name.",
    },
    {
      key: "13",
      columnNumber: 13,
      columnName: "Selling Price Tax Type (Required)",
      instruction: "Selling Price Tax Type. Available Options: inclusive, exclusive.",
    },
    {
      key: "14",
      columnNumber: 14,
      columnName: "Product Type (Required)",
      instruction: "Product Type. Available Options: single, variable.",
    },
    {
      key: "15",
      columnNumber: 15,
      columnName: "Variation Name (Required if product type is variable)",
      instruction: "Name of the variation (Ex: Size, Color etc).",
    },
    {
      key: "16",
      columnNumber: 16,
      columnName: "Variation Values (Required if product type is variable)",
      instruction: "Values for the variation separated with '|' (Ex: Red|Blue|Green).",
    },
    {
      key: "17",
      columnNumber: 17,
      columnName: "Variation SKUs (Optional)",
      instruction: 'SKUs of each variations separated by "|" if product type is variable.',
    },
    {
      key: "18",
      columnNumber: 18,
      columnName: "Purchase Price (Including Tax) (Required if Purchase Price Excluding Tax is not given)",
      instruction: "Purchase Price (Including Tax) (Only in numbers). For variable products '|' separated values with the same order as Variation Values (Ex: 84|85|88).",
    },
    {
      key: "19",
      columnNumber: 19,
      columnName: "Purchase Price (Excluding Tax) (Required if Purchase Price Including Tax is not given)",
      instruction: "Purchase Price (Excluding Tax) (Only in numbers). For variable products '|' separated values with the same order as Variation Values (Ex: 84|85|88).",
    },
    {
      key: "20",
      columnNumber: 20,
      columnName: "Profit Margin % (Optional)",
      instruction: "Profit Margin (Only in numbers). If blank default profit margin for the business will be used.",
    },
    {
      key: "21",
      columnNumber: 21,
      columnName: "Selling Price (Optional)",
      instruction: "Selling Price (Only in numbers). If blank selling price will be calculated with the given Purchase Price and Applicable Tax.",
    },
    {
      key: "22",
      columnNumber: 22,
      columnName: "Opening Stock (Optional)",
      instruction: "Opening Stock (Only in numbers). For variable products separate stock quantities with '|' (Ex: 100|150|200).",
    },
    {
      key: "23",
      columnNumber: 23,
      columnName: "Opening stock location (Optional)",
      instruction: "Name of the business location. If blank first business location will be used.",
    },
    {
      key: "24",
      columnNumber: 24,
      columnName: "Expiry Date (Optional)",
      instruction: "Stock Expiry Date. Format: dd-mm-yyyy; Ex: 25-11-2018",
    },
    {
      key: "25",
      columnNumber: 25,
      columnName: "Enable Product description, IMEI or Serial Number (Optional, Default: 0)",
      instruction: "1 = Yes, 0 = No",
    },
    {
      key: "26",
      columnNumber: 26,
      columnName: "Weight (Optional)",
      instruction: "Weight of the product.",
    },
    {
      key: "27",
      columnNumber: 27,
      columnName: "Rack (Optional)",
      instruction: "Rack details separated by '|' for different business locations serially. (Ex: R1|R5|R12)",
    },
    {
      key: "28",
      columnNumber: 28,
      columnName: "Row (Optional)",
      instruction: "Row details separated by '|' for different business locations serially. (Ex: ROW1|ROW2|ROW3)",
    },
    {
      key: "29",
      columnNumber: 29,
      columnName: "Position (Optional)",
      instruction: "Position details separated by '|' for different business locations serially. (Ex: POS1|POS2|POS3)",
    },
    {
      key: "30",
      columnNumber: 30,
      columnName: "Image (Optional)",
      instruction: "Image name with extension. (Image name must be uploaded to the server public/uploads/img) Or URL of the image.",
    },
    {
      key: "31",
      columnNumber: 31,
      columnName: "Product Description (Optional)",
      instruction: "Product description text.",
    },
    {
      key: "32",
      columnNumber: 32,
      columnName: "Custom Field1 (Optional)",
      instruction: "Custom field 1 value.",
    },
    {
      key: "33",
      columnNumber: 33,
      columnName: "Custom Field2 (Optional)",
      instruction: "Custom field 2 value.",
    },
    {
      key: "34",
      columnNumber: 34,
      columnName: "Custom Field3 (Optional)",
      instruction: "Custom field 3 value.",
    },
    {
      key: "35",
      columnNumber: 35,
      columnName: "Custom Field4 (Optional)",
      instruction: "Custom field 4 value.",
    },
    {
      key: "36",
      columnNumber: 36,
      columnName: "Not for selling (Optional)",
      instruction: "1 = Yes, 0 = No",
    },
    {
      key: "37",
      columnNumber: 37,
      columnName: "Product locations (Optional)",
      instruction: "Comma separated string of business location names where product will be available.",
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
            Import Products
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Import products from CSV or Excel files
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
              <Text
                strong
                style={{
                  fontSize: "14px",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                File To Import:
              </Text>
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

export default ImportProducts;

