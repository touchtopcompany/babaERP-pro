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
  Upload,
  Table,
  InputNumber,
  message,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  UploadOutlined,
  ReloadOutlined,
  UserOutlined,
  PrinterOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";
import AddProductModal from "@/components/modals/AddProductModal";
import AddCustomerModal from "@/components/modals/AddCustomerModal";

const { Title, Text } = Typography;
const { TextArea } = Input;

export interface QuotationProductRow {
  key: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  subtotal: number;
}

const AddQuotation: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<QuotationProductRow[]>([]);
  const [discountType, setDiscountType] = useState<string>("percentage");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [orderTax, setOrderTax] = useState<string>("none");
  const [shippingCharges, setShippingCharges] = useState<number>(0);
  const [showAdditionalExpenses, setShowAdditionalExpenses] = useState(false);
  const [additionalExpenses, setAdditionalExpenses] = useState<Array<{ key: string; name: string; amount: number }>>([]);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [addCustomerModalOpen, setAddCustomerModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");

  // Calculate totals
  const totals = useMemo(() => {
    const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);
    const netTotalAmount = products.reduce((sum, p) => sum + p.subtotal, 0);
    
    let discountValue = 0;
    if (discountType === "percentage") {
      discountValue = (netTotalAmount * discountAmount) / 100;
    } else if (discountType === "fixed") {
      discountValue = discountAmount;
    }
    
    const taxValue = orderTax !== "none" ? (netTotalAmount - discountValue) * 0.18 : 0; // Assuming 18% tax
    
    const additionalExpensesTotal = additionalExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalPayable = netTotalAmount - discountValue + taxValue + shippingCharges + additionalExpensesTotal;
    
    return {
      totalItems,
      netTotalAmount,
      discountValue,
      taxValue,
      shippingCharges,
      additionalExpensesTotal,
      totalPayable,
    };
  }, [products, discountType, discountAmount, orderTax, shippingCharges, additionalExpenses]);

  const handleDeleteProduct = (key: string) => {
    setProducts(products.filter((p) => p.key !== key));
  };

  const handleClearProducts = () => {
    setProducts([]);
    setProductSearch("");
  };

  const handleProductChange = (key: string, field: keyof QuotationProductRow, value: any) => {
    setProducts(
      products.map((p) => {
        if (p.key === key) {
          const updated = { ...p, [field]: value };
          
          // Calculate subtotal
          if (field === "quantity" || field === "unitPrice" || field === "discount") {
            const quantity = field === "quantity" ? value : p.quantity;
            const unitPrice = field === "unitPrice" ? value : p.unitPrice;
            const discount = field === "discount" ? value : p.discount;
            updated.subtotal = quantity * unitPrice * (1 - discount / 100);
          }
          
          return updated;
        }
        return p;
      })
    );
  };

  const handleAddProduct = () => {
    if (productSearch.trim()) {
      const newProduct: QuotationProductRow = {
        key: Date.now().toString(),
        productName: productSearch,
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        subtotal: 0,
      };
      setProducts([...products, newProduct]);
      setProductSearch("");
    }
  };

  const handleAddNewProduct = () => {
    setAddProductModalOpen(true);
  };

  const handleAddNewCustomer = () => {
    setAddCustomerModalOpen(true);
  };

  const handleAddAdditionalExpenses = () => {
    setShowAdditionalExpenses(!showAdditionalExpenses);
    if (!showAdditionalExpenses && additionalExpenses.length === 0) {
      setAdditionalExpenses([
        { key: "1", name: "", amount: 0 },
        { key: "2", name: "", amount: 0 },
        { key: "3", name: "", amount: 0 },
        { key: "4", name: "", amount: 0 },
      ]);
    }
  };

  const handleExpenseChange = (key: string, field: "name" | "amount", value: string | number) => {
    setAdditionalExpenses(
      additionalExpenses.map((expense) =>
        expense.key === key ? { ...expense, [field]: value } : expense
      )
    );
  };

  const handleAddExpenseRow = () => {
    setAdditionalExpenses([
      ...additionalExpenses,
      { key: Date.now().toString(), name: "", amount: 0 },
    ]);
  };

  const handleRemoveExpenseRow = (key: string) => {
    setAdditionalExpenses(additionalExpenses.filter((e) => e.key !== key));
  };

  const handleSave = async (_values: any) => {
    setLoading(true);
    try {
      // TODO: Implement API call to save quotation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Quotation saved successfully");
      form.resetFields();
      setProducts([]);
      setAdditionalExpenses([]);
      setShowAdditionalExpenses(false);
    } catch (_error) {
      message.error("Failed to save quotation");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndPrint = async () => {
    await handleSave(null);
    // TODO: Implement print functionality
    message.info("Print functionality coming soon");
  };

  const productColumns: ColumnsType<QuotationProductRow> = [
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
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: 120,
      render: (value: number, record) => (
        <InputNumber
          value={value}
          onChange={(val) => handleProductChange(record.key, "discount", val || 0)}
          min={0}
          max={100}
          style={{ width: "100%" }}
          suffix="%"
        />
      ),
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      width: 150,
      render: (value: number) => (
        <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f" }}>
          TSh {value.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_text, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteProduct(record.key)}
        />
      ),
    },
  ];

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          businessLocation: "C2Z Digital Solutions (C2Z1)",
          saleDate: dayjs(),
          discountType: "percentage",
          discountAmount: 0,
          orderTax: "none",
          shippingCharges: 0,
          invoiceScheme: "C2Z Digital Solutions",
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
              Add Quotation
            </Title>
          </Col>
        </Row>

        {/* Business Location */}
        <Card
          style={{
            marginBottom: "24px",
            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
            borderRadius: "8px",
            overflow: "hidden",
            maxWidth: "100%",
          }}
          bodyStyle={{ padding: "16px 24px" }}
        >
          <Form.Item name="businessLocation">
            <Space>
              <Select
                style={{ width: 300 }}
                suffixIcon={
                  <Space>
                    <ReloadOutlined
                      style={{
                        color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        fontSize: "14px",
                      }}
                    />
                    <InfoCircleOutlined
                      style={{
                        color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        fontSize: "14px",
                      }}
                    />
                  </Space>
                }
              >
                <Select.Option value="C2Z Digital Solutions (C2Z1)">
                  C2Z Digital Solutions (C2Z1)
                </Select.Option>
              </Select>
            </Space>
          </Form.Item>
        </Card>

        {/* Customer Details and Payment Details Section */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          {/* Customer Details (Left) */}
          <Col xs={24} lg={12}>
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
              <Form.Item
                label={
                  <Space>
                    <Text>Customer:</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="customer"
                rules={[{ required: true, message: "Please select customer" }]}
              >
                <Input
                  placeholder="Enter Customer name / phone"
                  prefix={<SearchOutlined />}
                  suffix={
                    <PlusOutlined
                      style={{
                        color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        cursor: "pointer",
                      }}
                      onClick={handleAddNewCustomer}
                    />
                  }
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
              <Form.Item label="Billing Address:" name="billingAddress">
                <TextArea
                  rows={3}
                  placeholder="Enter billing address"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
              <Form.Item label="Shipping Address:" name="shippingAddress">
                <TextArea
                  rows={3}
                  placeholder="Enter shipping address"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Card>
          </Col>

          {/* Payment and Invoice Details (Right) */}
          <Col xs={24} lg={12}>
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
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Form.Item
                    label={
                      <Space>
                        <Text>Pay term:</Text>
                        <Tooltip title="Payment terms">
                          <InfoCircleOutlined
                            style={{
                              color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                              fontSize: "12px",
                            }}
                          />
                        </Tooltip>
                      </Space>
                    }
                    name="payTerm"
                  >
                    <Select placeholder="Please Select" style={{ width: "100%" }}>
                      <Select.Option value="net15">Net 15</Select.Option>
                      <Select.Option value="net30">Net 30</Select.Option>
                      <Select.Option value="net45">Net 45</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Invoice scheme:" name="invoiceScheme">
                    <Select style={{ width: "100%" }}>
                      <Select.Option value="C2Z Digital Solutions">
                        C2Z Digital Solutions
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Attach Document:" name="document">
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Space>
                        <Upload
                          beforeUpload={() => false}
                          maxCount={1}
                          accept=".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png"
                        >
                          <Button icon={<UploadOutlined />}>Browse..</Button>
                        </Upload>
                      </Space>
                      <Text
                        type="secondary"
                        style={{
                          fontSize: "12px",
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        }}
                      >
                        Max File size: 5MB | Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                      </Text>
                    </Space>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label={
                      <Space>
                        <Text>Sale Date:</Text>
                        <Text type="danger">*</Text>
                      </Space>
                    }
                    name="saleDate"
                    rules={[{ required: true, message: "Please select sale date" }]}
                  >
                    <DatePicker
                      showTime
                      format="MM/DD/YYYY HH:mm"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Invoice No.:" name="invoiceNo">
                    <Input
                      placeholder="Invoice No."
                      style={{
                        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                      }}
                    />
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "12px",
                        color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        display: "block",
                        marginTop: "4px",
                      }}
                    >
                      Keep blank to auto generate
                    </Text>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Product Search and Table Section */}
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
          <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
            <Col xs={24} sm={20}>
              <Input
                placeholder="Enter Product name / SKU / Scan bar code"
                prefix={<SearchOutlined />}
                suffix={
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      if (productSearch.trim()) {
                        handleAddProduct();
                      } else {
                        handleAddNewProduct();
                      }
                    }}
                    style={{ padding: 0 }}
                  />
                }
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                onPressEnter={handleAddProduct}
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                }}
              />
            </Col>
            <Col xs={24} sm={4}>
              <Button
                type="text"
                danger
                icon={<CloseOutlined />}
                onClick={handleClearProducts}
                style={{ width: "100%" }}
              >
                Clear
              </Button>
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
              <Space direction="vertical" align="end">
                <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                  Items: {totals.totalItems.toFixed(2)} Total: {totals.netTotalAmount.toFixed(2)}
                </Text>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Discount, Tax, and Notes Section */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24} lg={12}>
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
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Form.Item
                    label={
                      <Space>
                        <Text>Discount Type:</Text>
                        <Text type="danger">*</Text>
                        <Tooltip title="Discount type">
                          <InfoCircleOutlined
                            style={{
                              color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                              fontSize: "12px",
                            }}
                          />
                        </Tooltip>
                      </Space>
                    }
                    name="discountType"
                  >
                    <Select
                      value={discountType}
                      onChange={setDiscountType}
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="none">None</Select.Option>
                      <Select.Option value="percentage">Percentage</Select.Option>
                      <Select.Option value="fixed">Fixed Amount</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label={
                      <Space>
                        <Text>Order Tax:</Text>
                        <Text type="danger">*</Text>
                        <Tooltip title="Order tax">
                          <InfoCircleOutlined
                            style={{
                              color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                              fontSize: "12px",
                            }}
                          />
                        </Tooltip>
                      </Space>
                    }
                    name="orderTax"
                  >
                    <Select
                      value={orderTax}
                      onChange={setOrderTax}
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="none">None</Select.Option>
                      <Select.Option value="vat18">VAT 18%</Select.Option>
                      <Select.Option value="vat20">VAT 20%</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Sell note" name="sellNote">
                    <TextArea
                      rows={4}
                      placeholder="Enter sell note"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
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
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Form.Item
                    label={
                      <Space>
                        <Text>Discount Amount:</Text>
                        <Text type="danger">*</Text>
                        <Tooltip title="Discount amount">
                          <InfoCircleOutlined
                            style={{
                              color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                              fontSize: "12px",
                            }}
                          />
                        </Tooltip>
                      </Space>
                    }
                    name="discountAmount"
                  >
                    <InputNumber
                      value={discountAmount}
                      onChange={(val) => setDiscountAmount(val || 0)}
                      min={0}
                      precision={2}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                    Discount Amount:(-) {totals.discountValue.toFixed(2)}
                  </Text>
                </Col>
                <Col xs={24}>
                  <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                    Order Tax:(+) {totals.taxValue.toFixed(2)}
                  </Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Shipping Details Section */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24} lg={12}>
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
              <Row gutter={[16, 16]}>
                <Col xs={24}>
                  <Form.Item label="Shipping Details" name="shippingDetails">
                    <TextArea
                      rows={3}
                      placeholder="Shipping Details"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Shipping Address" name="shippingAddressCard">
                    <TextArea
                      rows={3}
                      placeholder="Shipping Address"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label={
                      <Space>
                        <Text>Shipping Charges</Text>
                        <Tooltip title="Shipping charges">
                          <InfoCircleOutlined
                            style={{
                              color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                              fontSize: "12px",
                            }}
                          />
                        </Tooltip>
                      </Space>
                    }
                    name="shippingCharges"
                  >
                    <InputNumber
                      value={shippingCharges}
                      onChange={(val) => setShippingCharges(val || 0)}
                      min={0}
                      precision={2}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Shipping Status" name="shippingStatus">
                    <Select placeholder="Please Select" style={{ width: "100%" }}>
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="shipped">Shipped</Select.Option>
                      <Select.Option value="delivered">Delivered</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Delivered To:" name="deliveredTo">
                    <TextArea
                      rows={3}
                      placeholder="Delivered To"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Delivery Person:" name="deliveryPerson">
                    <Select placeholder="Please Select" style={{ width: "100%" }}>
                      <Select.Option value="person1">Person 1</Select.Option>
                      <Select.Option value="person2">Person 2</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Shipping Documents:" name="shippingDocuments">
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Space>
                        <Upload
                          beforeUpload={() => false}
                          maxCount={1}
                          accept=".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png"
                        >
                          <Button icon={<UploadOutlined />}>Browse..</Button>
                        </Upload>
                      </Space>
                      <Text
                        type="secondary"
                        style={{
                          fontSize: "12px",
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        }}
                      >
                        Max File size: 5MB | Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                      </Text>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Additional Expenses */}
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
            <Col xs={24}>
              <Button
                type="primary"
                onClick={handleAddAdditionalExpenses}
                style={{ width: "100%" }}
              >
                Add additional expenses
              </Button>
            </Col>
          </Row>

          {showAdditionalExpenses && (
            <div style={{ marginTop: "24px" }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Text strong style={{ fontSize: "14px", color: isDark ? "#fff" : "#1f1f1f" }}>
                    Additional expense name
                  </Text>
                </Col>
                <Col xs={24} sm={12}>
                  <Text strong style={{ fontSize: "14px", color: isDark ? "#fff" : "#1f1f1f" }}>
                    Amount
                  </Text>
                </Col>
              </Row>
              {additionalExpenses.map((expense) => (
                <Row gutter={[16, 16]} key={expense.key} style={{ marginTop: "12px" }}>
                  <Col xs={24} sm={12}>
                    <Input
                      value={expense.name}
                      onChange={(e) => handleExpenseChange(expense.key, "name", e.target.value)}
                      placeholder="Enter expense name"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={10}>
                    <InputNumber
                      value={expense.amount}
                      onChange={(val) => handleExpenseChange(expense.key, "amount", val || 0)}
                      min={0}
                      precision={2}
                      style={{ width: "100%" }}
                      prefix="TSh"
                    />
                  </Col>
                  <Col xs={24} sm={2}>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveExpenseRow(expense.key)}
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
              ))}
              <Row style={{ marginTop: "12px" }}>
                <Col xs={24}>
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={handleAddExpenseRow}
                    style={{ width: "100%" }}
                  >
                    Add Row
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          <Row justify="end" style={{ marginTop: "24px" }}>
            <Col>
              <Text
                strong
                style={{
                  fontSize: "16px",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Total Payable: {totals.totalPayable.toFixed(2)}
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
                onClick={() => form.submit()}
              >
                Save
              </Button>
              <Button
                type="primary"
                icon={<PrinterOutlined />}
                loading={loading}
                onClick={handleSaveAndPrint}
                style={{ background: "#52c41a", borderColor: "#52c41a" }}
              >
                Save and print
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>

      {/* Add Product Modal */}
      <AddProductModal
        open={addProductModalOpen}
        onClose={() => setAddProductModalOpen(false)}
        onSave={(productData) => {
          // TODO: Handle product data from modal
          message.success("Product added successfully");
          setAddProductModalOpen(false);
        }}
      />

      {/* Add Customer Modal */}
      <AddCustomerModal
        open={addCustomerModalOpen}
        onClose={() => setAddCustomerModalOpen(false)}
        onSave={(customerData) => {
          // TODO: Handle customer data from modal
          // Update the customer field in the form
          form.setFieldsValue({ customer: customerData.mobile || customerData.firstName || "New Customer" });
          message.success("Customer added successfully");
          setAddCustomerModalOpen(false);
        }}
      />
    </div>
  );
};

export default AddQuotation;

