import React, { useState, useMemo } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Table,
  InputNumber,
  message,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { TextArea } = Input;

export interface StockTransferProductRow {
  key: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

const AddStockTransfer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  // Sample products data
  const defaultProducts: StockTransferProductRow[] = [
    {
      key: "1",
      productName: "Laptop Dell XPS 15",
      quantity: 5,
      unitPrice: 2500000,
      subtotal: 12500000,
    },
    {
      key: "2",
      productName: "Wireless Mouse Logitech",
      quantity: 10,
      unitPrice: 45000,
      subtotal: 450000,
    },
    {
      key: "3",
      productName: "USB-C Cable",
      quantity: 20,
      unitPrice: 15000,
      subtotal: 300000,
    },
    {
      key: "4",
      productName: "Keyboard Mechanical",
      quantity: 8,
      unitPrice: 120000,
      subtotal: 960000,
    },
    {
      key: "5",
      productName: "Monitor 27 inch",
      quantity: 3,
      unitPrice: 850000,
      subtotal: 2550000,
    },
  ];

  const [products, setProducts] = useState<StockTransferProductRow[]>(defaultProducts);
  const [productSearch, setProductSearch] = useState("");
  const [shippingCharges, setShippingCharges] = useState<number>(0);

  // Calculate totals
  const totals = useMemo(() => {
    const productTotal = products.reduce((sum, p) => sum + p.subtotal, 0);
    const totalAmount = productTotal + shippingCharges;
    return {
      productTotal,
      shippingCharges,
      totalAmount,
    };
  }, [products, shippingCharges]);

  const handleAddProduct = () => {
    if (!productSearch.trim()) {
      message.warning("Please enter a product name");
      return;
    }

    const newProduct: StockTransferProductRow = {
      key: Date.now().toString(),
      productName: productSearch.trim(),
      quantity: 1,
      unitPrice: 0,
      subtotal: 0,
    };

    setProducts([...products, newProduct]);
    setProductSearch("");
  };

  const handleDeleteProduct = (key: string) => {
    setProducts(products.filter((p) => p.key !== key));
  };

  const handleProductChange = (key: string, field: keyof StockTransferProductRow, value: any) => {
    setProducts(
      products.map((p) => {
        if (p.key === key) {
          const updated = { ...p, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            updated.subtotal = updated.quantity * updated.unitPrice;
          }
          return updated;
        }
        return p;
      })
    );
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (products.length === 0) {
        message.warning("Please add at least one product");
        return;
      }

      setLoading(true);
      // TODO: Implement API call to save stock transfer
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Stock transfer created successfully");
      form.resetFields();
      setProducts([]);
      setShippingCharges(0);
      setProductSearch("");
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const productColumns: ColumnsType<StockTransferProductRow> = [
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
      width: 300,
      render: (text: string, record) => (
        <Input
          value={text}
          onChange={(e) => handleProductChange(record.key, "productName", e.target.value)}
          placeholder="Enter product name"
          style={{
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
          }}
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
      render: (value: number, record) => (
        <InputNumber
          value={value}
          onChange={(val) => handleProductChange(record.key, "quantity", val || 0)}
          min={0}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      width: 150,
      render: (value: number, record) => (
        <InputNumber
          value={value}
          onChange={(val) => handleProductChange(record.key, "unitPrice", val || 0)}
          min={0}
          precision={2}
          style={{ width: "100%" }}
          prefix="TSh"
        />
      ),
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      width: 150,
      align: "right",
      render: (value: number) => (
        <Text
          strong
          style={{
            fontSize: "13px",
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "",
      key: "action",
      width: 50,
      render: (_text, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteProduct(record.key)}
          style={{
            color: isDark ? "rgba(255,255,255,0.85)" : "#ff4d4f",
          }}
        />
      ),
    },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          date: dayjs("2025-12-28 01:12", "YYYY-MM-DD HH:mm"),
        }}
      >
        {/* Header */}
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
              Add Stock Transfer
            </Title>
          </Col>
        </Row>

        {/* Transfer Details Section */}
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
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={5}>
              <Form.Item
                label={
                  <Space>
                    <Text>Date:</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="date"
                rules={[{ required: true, message: "Please select date" }]}
              >
                <DatePicker
                  showTime
                  format="MM/DD/YYYY HH:mm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={5}>
              <Form.Item label="Reference No:" name="referenceNo">
                <Input
                  placeholder="Reference No"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={5}>
              <Form.Item
                label={
                  <Space>
                    <Text>Status:</Text>
                    <Text type="danger">*</Text>
                    <Tooltip title="Transfer status">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          fontSize: "12px",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                name="status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select
                  placeholder="Please Select"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  }}
                >
                  <Select.Option value="pending">Pending</Select.Option>
                  <Select.Option value="in_transit">In Transit</Select.Option>
                  <Select.Option value="completed">Completed</Select.Option>
                  <Select.Option value="cancelled">Cancelled</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Form.Item
                label={
                  <Space>
                    <Text>Location (From):</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="locationFrom"
                rules={[{ required: true, message: "Please select location (from)" }]}
              >
                <Select
                  placeholder="Please Select"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  }}
                >
                  <Select.Option value="C2Z Digital Solutions (C2Z1)">
                    C2Z Digital Solutions (C2Z1)
                  </Select.Option>
                  <Select.Option value="Location 2">Location 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={5}>
              <Form.Item
                label={
                  <Space>
                    <Text>Location (To):</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="locationTo"
                rules={[{ required: true, message: "Please select location (to)" }]}
              >
                <Select
                  placeholder="Please Select"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  }}
                >
                  <Select.Option value="C2Z Digital Solutions (C2Z1)">
                    C2Z Digital Solutions (C2Z1)
                  </Select.Option>
                  <Select.Option value="Location 2">Location 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Search Products Section */}
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
          <Title
            level={4}
            style={{
              marginBottom: "16px",
              color: isDark ? "#fff" : "#1f1f1f",
              fontWeight: 600,
            }}
          >
            Search Products
          </Title>
          <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
            <Col xs={24}>
              <Input
                placeholder="Search products for stock adjustment"
                prefix={<SearchOutlined />}
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                onPressEnter={handleAddProduct}
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                }}
              />
            </Col>
          </Row>

          <Table
            columns={productColumns}
            dataSource={products}
            pagination={false}
            style={{
              marginBottom: "16px",
            }}
            locale={{
              emptyText: "No products added. Search and add products to continue.",
            }}
            scroll={{ x: "max-content" }}
          />

          <Row justify="end" style={{ marginTop: "16px" }}>
            <Col>
              <Text
                strong
                style={{
                  fontSize: "14px",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Total: {totals.productTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </Col>
          </Row>
        </Card>

        {/* Additional Information Section */}
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
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Shipping Charges:" name="shippingCharges">
                <InputNumber
                  value={shippingCharges}
                  onChange={(val) => setShippingCharges(val || 0)}
                  min={0}
                  precision={2}
                  style={{ width: "100%" }}
                  prefix="TSh"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Additional Notes" name="additionalNotes">
                <TextArea
                  rows={4}
                  placeholder="Enter additional notes"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Total Amount */}
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
          <Row justify="end">
            <Col>
              <Text
                strong
                style={{
                  fontSize: "16px",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Total Amount: {totals.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </Col>
          </Row>
        </Card>

        {/* Action Buttons */}
        <Row justify="end" gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col>
            <Space>
              <Button onClick={() => form.resetFields()}>Cancel</Button>
              <Button
                type="primary"
                loading={loading}
                onClick={handleSave}
              >
                Save
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddStockTransfer;

