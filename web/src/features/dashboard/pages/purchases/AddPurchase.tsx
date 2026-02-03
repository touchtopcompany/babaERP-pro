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
  ImportOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";
import AddProductModal from "@/components/modals/AddProductModal";

const { Title, Text } = Typography;
const { TextArea } = Input;

export interface ProductRow {
  key: string;
  productName: string;
  purchaseQuantity: number;
  unitCostBeforeDiscount: number;
  discountPercent: number;
  unitCostBeforeTax: number;
  lineTotal: number;
  profitMargin: number;
  unitSellingPrice: number;
}

// Initialize with sample product data
const initialProducts: ProductRow[] = [
    {
      key: "1",
      productName: "Laptop Computer",
      purchaseQuantity: 5,
      unitCostBeforeDiscount: 50000,
      discountPercent: 5,
      unitCostBeforeTax: 47500,
      lineTotal: 237500,
      profitMargin: 20,
      unitSellingPrice: 67230,
    },
    {
      key: "2",
      productName: "Wireless Mouse",
      purchaseQuantity: 10,
      unitCostBeforeDiscount: 5000,
      discountPercent: 0,
      unitCostBeforeTax: 5000,
      lineTotal: 50000,
      profitMargin: 15,
      unitSellingPrice: 6785,
    },
    {
      key: "3",
      productName: "USB Keyboard",
      purchaseQuantity: 8,
      unitCostBeforeDiscount: 8000,
      discountPercent: 10,
      unitCostBeforeTax: 7200,
      lineTotal: 57600,
      profitMargin: 25,
      unitSellingPrice: 10620,
    },
];

const AddPurchase: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductRow[]>(initialProducts);
  const [discountType, setDiscountType] = useState<string>("none");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [purchaseTax, setPurchaseTax] = useState<string>("none");
  const [additionalShippingCharges, setAdditionalShippingCharges] = useState<number>(0);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [showAdditionalExpenses, setShowAdditionalExpenses] = useState(false);
  const [additionalExpenses, setAdditionalExpenses] = useState<Array<{ key: string; name: string; amount: number }>>([]);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);

  // Calculate totals
  const totals = useMemo(() => {
    const totalItems = products.reduce((sum, p) => sum + p.purchaseQuantity, 0);
    const netTotalAmount = products.reduce((sum, p) => sum + p.lineTotal, 0);
    
    let discountValue = 0;
    if (discountType === "percentage") {
      discountValue = (netTotalAmount * discountAmount) / 100;
    } else if (discountType === "fixed") {
      discountValue = discountAmount;
    }
    
    const taxValue = purchaseTax !== "none" ? (netTotalAmount - discountValue) * 0.18 : 0; // Assuming 18% tax
    
    const purchaseTotal = netTotalAmount - discountValue + taxValue + additionalShippingCharges;
    
    return {
      totalItems,
      netTotalAmount,
      discountValue,
      taxValue,
      purchaseTotal,
    };
  }, [products, discountType, discountAmount, purchaseTax, additionalShippingCharges]);


  const handleDeleteProduct = (key: string) => {
    setProducts(products.filter((p) => p.key !== key));
  };

  const handleProductChange = (key: string, field: keyof ProductRow, value: any) => {
    setProducts(
      products.map((p) => {
        if (p.key === key) {
          const updated = { ...p, [field]: value };
          
          // Calculate unitCostBeforeTax (after discount)
          if (field === "unitCostBeforeDiscount" || field === "discountPercent") {
            const costBeforeDiscount = field === "unitCostBeforeDiscount" ? value : p.unitCostBeforeDiscount;
            const discount = field === "discountPercent" ? value : p.discountPercent;
            updated.unitCostBeforeTax = costBeforeDiscount * (1 - discount / 100);
          }
          
          // Calculate lineTotal
          if (field === "purchaseQuantity" || field === "unitCostBeforeTax") {
            const quantity = field === "purchaseQuantity" ? value : p.purchaseQuantity;
            const unitCost = field === "unitCostBeforeTax" ? value : updated.unitCostBeforeTax;
            updated.lineTotal = quantity * unitCost;
          }
          
          // Calculate unitSellingPrice based on profit margin
          if (field === "unitCostBeforeTax" || field === "profitMargin") {
            const unitCost = field === "unitCostBeforeTax" ? value : updated.unitCostBeforeTax;
            const margin = field === "profitMargin" ? value : p.profitMargin;
            updated.unitSellingPrice = unitCost * (1 + margin / 100) * 1.18; // Including tax
          }
          
          return updated;
        }
        return p;
      })
    );
  };

  const handleImportProducts = () => {
    message.info("Import products functionality coming soon");
  };

  const handleAddNewProduct = () => {
    setAddProductModalOpen(true);
  };

  const handleAddAdditionalExpenses = () => {
    setShowAdditionalExpenses(!showAdditionalExpenses);
    if (!showAdditionalExpenses && additionalExpenses.length === 0) {
      // Initialize with 4 empty rows
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
      // TODO: Implement API call to save purchase
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Purchase saved successfully");
      form.resetFields();
      setProducts([]);
    } catch (_error) {
      message.error("Failed to save purchase");
    } finally {
      setLoading(false);
    }
  };

  const productColumns: ColumnsType<ProductRow> = [
    {
      title: "#",
      key: "index",
      width: 50,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      width: 200,
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
      title: "Purchase Quantity",
      dataIndex: "purchaseQuantity",
      key: "purchaseQuantity",
      width: 150,
      render: (value: number, record) => (
        <InputNumber
          value={value}
          onChange={(val) => handleProductChange(record.key, "purchaseQuantity", val || 0)}
          min={0}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: "Unit Cost (Before Discount)",
      dataIndex: "unitCostBeforeDiscount",
      key: "unitCostBeforeDiscount",
      width: 200,
      render: (value: number, record) => (
        <InputNumber
          value={value}
          onChange={(val) => handleProductChange(record.key, "unitCostBeforeDiscount", val || 0)}
          min={0}
          precision={2}
          style={{ width: "100%" }}
          prefix="TSh"
        />
      ),
    },
    {
      title: "Discount Percent",
      dataIndex: "discountPercent",
      key: "discountPercent",
      width: 150,
      render: (value: number, record) => (
        <InputNumber
          value={value}
          onChange={(val) => handleProductChange(record.key, "discountPercent", val || 0)}
          min={0}
          max={100}
          style={{ width: "100%" }}
          suffix="%"
        />
      ),
    },
    {
      title: "Unit Cost (Before Tax)",
      dataIndex: "unitCostBeforeTax",
      key: "unitCostBeforeTax",
      width: 180,
      render: (value: number) => (
        <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
          TSh {value.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Line Total",
      dataIndex: "lineTotal",
      key: "lineTotal",
      width: 120,
      render: (value: number) => (
        <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f" }}>
          TSh {value.toFixed(2)}
        </Text>
      ),
    },
    {
      title: "Profit Margin %",
      dataIndex: "profitMargin",
      key: "profitMargin",
      width: 150,
      render: (value: number, record) => (
        <InputNumber
          value={value}
          onChange={(val) => handleProductChange(record.key, "profitMargin", val || 0)}
          min={0}
          style={{ width: "100%" }}
          suffix="%"
        />
      ),
    },
    {
      title: "Unit Selling Price (Inc. tax)",
      dataIndex: "unitSellingPrice",
      key: "unitSellingPrice",
      width: 200,
      render: (value: number) => (
        <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
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
          purchaseDate: dayjs(),
          paidOn: dayjs(),
          discountType: "none",
          discountAmount: 0,
          purchaseTax: "none",
          additionalShippingCharges: 0,
          paymentMethod: "cash",
          paymentAccount: "none",
          amount: 0,
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
              Add Purchase
            </Title>
          </Col>
        </Row>

        {/* Purchase Details Section */}
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
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Supplier</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="supplier"
                rules={[{ required: true, message: "Please select supplier" }]}
              >
                <Select
                  placeholder="Please Select"
                  suffixIcon={<PlusOutlined />}
                  style={{ width: "100%" }}
                >
                  <Select.Option value="supplier1">ABC Trading Co.</Select.Option>
                  <Select.Option value="supplier2">XYZ Suppliers Ltd</Select.Option>
                  <Select.Option value="supplier3">Global Imports Inc</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Address" name="address">
                <TextArea
                  rows={2}
                  placeholder="Enter address"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Reference No</Text>
                    <Tooltip title="Reference number for this purchase">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          fontSize: "12px",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                name="referenceNo"
              >
                <Input
                  placeholder="Enter reference number"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Business Location</Text>
                    <Text type="danger">*</Text>
                    <Tooltip title="Select business location">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          fontSize: "12px",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                name="businessLocation"
                rules={[{ required: true, message: "Please select business location" }]}
              >
                <Select style={{ width: "100%" }}>
                  <Select.Option value="C2Z Digital Solutions (C2Z1)">
                    C2Z Digital Solutions (C2Z1)
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Purchase Date</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="purchaseDate"
                rules={[{ required: true, message: "Please select purchase date" }]}
              >
                <DatePicker
                  showTime
                  format="MM/DD/YYYY HH:mm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Pay term</Text>
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
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Purchase Status</Text>
                    <Text type="danger">*</Text>
                    <Tooltip title="Purchase status">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          fontSize: "12px",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                name="purchaseStatus"
                rules={[{ required: true, message: "Please select purchase status" }]}
              >
                <Select placeholder="Please Select" style={{ width: "100%" }}>
                  <Select.Option value="received">Received</Select.Option>
                  <Select.Option value="pending">Pending</Select.Option>
                  <Select.Option value="ordered">Ordered</Select.Option>
                  <Select.Option value="return">Return</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Attach Document" name="document">
                <Space>
                  <Input
                    placeholder="No file chosen"
                    readOnly
                    style={{
                      width: "300px",
                      background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                      border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                    }}
                  />
                  <Upload
                    beforeUpload={() => false}
                    maxCount={1}
                    accept=".pdf,.csv,.zip,.doc,.docx,.jpeg,.jpg,.png"
                  >
                    <Button icon={<UploadOutlined />}>Browse..</Button>
                  </Upload>
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

        {/* Product Selection Section */}
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
            <Col xs={24} sm={8}>
              <Button
                type="primary"
                icon={<ImportOutlined />}
                onClick={handleImportProducts}
                style={{ width: "100%" }}
              >
                Import Products
              </Button>
            </Col>
            <Col xs={24} sm={12}>
              <Input
                placeholder="Enter Product name / SKU / Scan bar code"
                prefix={<SearchOutlined />}
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                }}
              />
            </Col>
            <Col xs={24} sm={4}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddNewProduct}
                style={{ width: "100%" }}
              >
                Add new product
              </Button>
            </Col>
          </Row>

          <style>{`
            .product-table .ant-table-thead > tr > th {
              background: #52c41a !important;
              color: #fff !important;
              font-weight: 600;
            }
            .product-table .ant-table-thead > tr > th:hover {
              background: #52c41a !important;
            }
          `}</style>
          <Table
            className="product-table"
            columns={productColumns}
            dataSource={products}
            pagination={false}
            style={{
              marginBottom: "16px",
            }}
            locale={{
              emptyText: "No products added. Click 'Add new product' to add items.",
            }}
          />

          <Row justify="end" style={{ marginTop: "16px" }}>
            <Col>
              <Space direction="vertical" align="end">
                <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                  Total Items: {totals.totalItems.toFixed(2)}
                </Text>
                <Text strong style={{ color: isDark ? "#fff" : "#1f1f1f" }}>
                  Net Total Amount: TSh {totals.netTotalAmount.toFixed(2)}
                </Text>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Discount, Tax, and Notes Section */}
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
              <Form.Item label="Discount Type:" name="discountType">
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
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Discount Amount:" name="discountAmount">
                <InputNumber
                  value={discountAmount}
                  onChange={(val) => setDiscountAmount(val || 0)}
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Purchase Tax:" name="purchaseTax">
                <Select
                  value={purchaseTax}
                  onChange={setPurchaseTax}
                  style={{ width: "100%" }}
                >
                  <Select.Option value="none">None</Select.Option>
                  <Select.Option value="vat18">VAT 18%</Select.Option>
                  <Select.Option value="vat20">VAT 20%</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                  Discount:(-) TSh {totals.discountValue.toFixed(2)}
                </Text>
                <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                  Purchase Tax:(+) TSh {totals.taxValue.toFixed(2)}
                </Text>
              </Space>
            </Col>
            <Col xs={24}>
              <Form.Item label="Additional Notes:" name="additionalNotes">
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

        {/* Shipping Details Section */}
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
              <Form.Item label="Shipping Details:" name="shippingDetails">
                <TextArea
                  rows={3}
                  placeholder="Enter shipping details"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="(+) Additional Shipping charges:" name="additionalShippingCharges">
                <InputNumber
                  value={additionalShippingCharges}
                  onChange={(val) => setAdditionalShippingCharges(val || 0)}
                  min={0}
                  precision={2}
                  style={{ width: "100%" }}
                  prefix="TSh"
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            <Col xs={24}>
              <Button
                type="primary"
                onClick={handleAddAdditionalExpenses}
                style={{ width: "100%" }}
              >
                + Add additional expenses
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
                Purchase Total: TSh {totals.purchaseTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </Col>
          </Row>
        </Card>

        {/* Add Payment Section */}
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
            }}
          >
            Add payment
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Text style={{ color: isDark ? "rgba(255,255,255,0.85)" : "#595959" }}>
                Advance Balance: 0
              </Text>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label={
                  <Space>
                    <Text>Amount</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="amount"
                rules={[{ required: true, message: "Please enter amount" }]}
              >
                <InputNumber
                  min={0}
                  precision={2}
                  style={{ width: "100%" }}
                  prefix="TSh"
                  onChange={(val) => setPaymentAmount(val || 0)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label={
                  <Space>
                    <Text>Paid on</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="paidOn"
                rules={[{ required: true, message: "Please select payment date" }]}
              >
                <DatePicker
                  showTime
                  format="MM/DD/YYYY HH:mm"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="Payment Account:" name="paymentAccount">
                <Select style={{ width: "100%" }}>
                  <Select.Option value="none">None</Select.Option>
                  <Select.Option value="account1">Account 1</Select.Option>
                  <Select.Option value="account2">Account 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                label={
                  <Space>
                    <Text>Payment Method</Text>
                    <Text type="danger">*</Text>
                    <Tooltip title="Payment method">
                      <InfoCircleOutlined
                        style={{
                          color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                          fontSize: "12px",
                        }}
                      />
                    </Tooltip>
                  </Space>
                }
                name="paymentMethod"
                rules={[{ required: true, message: "Please select payment method" }]}
              >
                <Select style={{ width: "100%" }}>
                  <Select.Option value="cash">Cash</Select.Option>
                  <Select.Option value="bank">Bank Transfer</Select.Option>
                  <Select.Option value="card">Card</Select.Option>
                  <Select.Option value="cheque">Cheque</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Payment note:" name="paymentNote">
                <TextArea
                  rows={3}
                  placeholder="Enter payment notes"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Text
                strong
                style={{
                  fontSize: "16px",
                  color: isDark ? "#fff" : "#1f1f1f",
                  textAlign: "right",
                  display: "block",
                }}
              >
                Payment due: TSh {(totals.purchaseTotal - paymentAmount).toFixed(2)}
              </Text>
            </Col>
          </Row>
        </Card>

        {/* Save Button */}
        <Row justify="end" style={{ marginBottom: "24px", paddingTop: "16px", borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
          <Col>
            <Space>
              <Button
                onClick={() => {
                  form.resetFields();
                  setProducts([]);
                  setAdditionalExpenses([]);
                  setShowAdditionalExpenses(false);
                }}
                style={{
                  height: "40px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  height: "40px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  borderRadius: "6px",
                  fontWeight: 500,
                }}
              >
                Save
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>

      {/* Add Product Modal */}
      <AddProductModal
        open={addProductModalOpen}
        onClose={() => setAddProductModalOpen(false)}
        onSave={() => {
          // Refresh products list or add the new product
          message.success("Product added successfully");
        }}
      />
    </div>
  );
};

export default AddPurchase;

