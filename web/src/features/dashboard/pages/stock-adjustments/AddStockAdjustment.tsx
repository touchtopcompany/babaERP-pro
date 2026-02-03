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

export interface StockAdjustmentProductRow {
  key: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

const AddStockAdjustment: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const defaultProducts: StockAdjustmentProductRow[] = [
    {
      key: "1",
      productName: "Motor Stator",
      quantity: 12,
      unitPrice: 28000,
      subtotal: 336000
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
      productName: "Monitor 27 inch",
      quantity: 3,
      unitPrice: 850000,
      subtotal: 2550000,
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
      productName: "Sterling",
      quantity: 10,
      unitPrice: 24000,
      subtotal: 240000,
    }
  ];

  const [products, setProducts] = useState<StockAdjustmentProductRow[]>(defaultProducts);
  const [productSearch, setProductSearch] = useState("");
  const [totalAmountRecovered, setTotalAmountRecovered] = useState<number>(0);

  // Calculate totals
  const totals = useMemo(() => {
    const productTotal = products.reduce((sum, p) => sum + p.subtotal, 0);
    return {
      productTotal,
      totalAmountRecovered,
    };
  }, [products, totalAmountRecovered]);

  const handleAddProduct = () => {
    if (!productSearch.trim()) {
      message.warning("Please enter a product name");
      return;
    }

    const newProduct: StockAdjustmentProductRow = {
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

  const handleProductChange = (key: string, field: keyof StockAdjustmentProductRow, value: any) => {
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
      // TODO: Implement API call to save stock adjustment
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Stock adjustment created successfully");
      form.resetFields();
      setProducts([]);
      setTotalAmountRecovered(0);
      setProductSearch("");
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const productColumns: ColumnsType<StockAdjustmentProductRow> = [
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
          date: dayjs("2025-12-28 01:35", "YYYY-MM-DD HH:mm"),
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
              Add Stock Adjustment
            </Title>
          </Col>
        </Row>

        {/* Stock Adjustment Details Section */}
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
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label={
                  <Space>
                    <Text>Business Location:</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="businessLocation"
                rules={[{ required: true, message: "Please select business location" }]}
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
            <Col xs={24} sm={12} md={6}>
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
            <Col xs={24} sm={12} md={6}>
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
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label={
                  <Space>
                    <Text>Adjustment type:</Text>
                    <Text type="danger">*</Text>
                    <Tooltip title="Adjustment type">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          fontSize: "12px",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                name="adjustmentType"
                rules={[{ required: true, message: "Please select adjustment type" }]}
              >
                <Select
                  placeholder="Please Select"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  }}
                >
                  <Select.Option value="increase">Increase</Select.Option>
                  <Select.Option value="decrease">Decrease</Select.Option>
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
                Total Amount: {totals.productTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </Col>
          </Row>
        </Card>

        {/* Reason and Action Section */}
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
              <Form.Item
                label={
                  <Space>
                    <Text>Total amount recovered:</Text>
                    <Tooltip title="Total amount recovered">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          fontSize: "12px",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                name="totalAmountRecovered"
              >
                <InputNumber
                  value={totalAmountRecovered}
                  onChange={(val) => setTotalAmountRecovered(val || 0)}
                  min={0}
                  precision={2}
                  style={{ width: "100%" }}
                  prefix="TSh"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Reason:" name="reason">
                <TextArea
                  rows={4}
                  placeholder="Reason"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Save Button */}

        <Row justify={"end"} gutter={[16, 16]} style={{marginBottom:"24px"}}>
          <Col>
            <Space>
              <Button onClick={() => form.resetFields()}>
                Cancel
              </Button>
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

export default AddStockAdjustment;

