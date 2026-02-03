import React, { useState, useMemo } from "react";
import {
  Modal,
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
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  UserOutlined,
  UploadOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export interface ProductReturnRow {
  key: string;
  product: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface AddPurchaseReturnModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
}

const AddPurchaseReturnModal: React.FC<AddPurchaseReturnModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductReturnRow[]>([]);
  const [purchaseTax, setPurchaseTax] = useState<string>("none");
  const [searchText, setSearchText] = useState("");

  // Calculate total amount
  const totalAmount = useMemo(() => {
    const subtotal = products.reduce((sum, p) => sum + p.subtotal, 0);
    const taxValue = purchaseTax !== "none" ? subtotal * 0.18 : 0; // Assuming 18% tax
    return subtotal + taxValue;
  }, [products, purchaseTax]);

  const handleAddProduct = (productName: string, unitPrice: number) => {
    const existingProduct = products.find((p) => p.product === productName);
    if (existingProduct) {
      // Update quantity if product already exists
      handleProductChange(existingProduct.key, "quantity", existingProduct.quantity + 1);
    } else {
      const newProduct: ProductReturnRow = {
        key: Date.now().toString(),
        product: productName,
        quantity: 1,
        unitPrice: unitPrice,
        subtotal: unitPrice,
      };
      setProducts([...products, newProduct]);
    }
    setSearchText("");
  };

  const handleDeleteProduct = (key: string) => {
    setProducts(products.filter((p) => p.key !== key));
  };

  const handleProductChange = (key: string, field: keyof ProductReturnRow, value: any) => {
    setProducts(
      products.map((p) => {
        if (p.key === key) {
          const updated = { ...p, [field]: value };
          // Recalculate subtotal if quantity or unitPrice changes
          if (field === "quantity" || field === "unitPrice") {
            const quantity = field === "quantity" ? value : updated.quantity;
            const unitPrice = field === "unitPrice" ? value : updated.unitPrice;
            updated.subtotal = quantity * unitPrice;
          }
          return updated;
        }
        return p;
      })
    );
  };

  const handleSearch = () => {
    if (!searchText.trim()) {
      message.warning("Please enter a product name");
      return;
    }
    // Mock product data - in real app, this would search from API
    const mockProducts: { name: string; price: number }[] = [
      { name: "Laptop Computer", price: 50000 },
      { name: "Wireless Mouse", price: 5000 },
      { name: "USB Keyboard", price: 8000 },
      { name: "Monitor", price: 30000 },
      { name: "Webcam", price: 15000 },
    ];

    const foundProduct = mockProducts.find(
      (p) => p.name.toLowerCase() === searchText.toLowerCase()
    );

    if (foundProduct) {
      handleAddProduct(foundProduct.name, foundProduct.price);
    } else {
      // If not found, add with default price
      handleAddProduct(searchText, 0);
    }
  };

  const handleSubmit = async (values: any) => {
    if (products.length === 0) {
      message.warning("Please add at least one product");
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement API call to save purchase return
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Purchase return saved successfully");
      form.resetFields();
      setProducts([]);
      setSearchText("");
      setPurchaseTax("none");
      onSave?.();
      onClose();
    } catch (_error) {
      message.error("Failed to save purchase return");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setProducts([]);
    setSearchText("");
    setPurchaseTax("none");
    onClose();
  };

  const productColumns: ColumnsType<ProductReturnRow> = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      width: 300,
      render: (text: string, record) => (
        <Input
          value={text}
          onChange={(e) => handleProductChange(record.key, "product", e.target.value)}
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
      width: 150,
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
      render: (value: number) => (
        <Text
          strong
          style={{
            fontSize: "14px",
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={1200}
      closeIcon={
        <CloseOutlined
          style={{
            color: isDark ? "rgba(255,255,255,0.85)" : "#1f1f1f",
            fontSize: "18px",
          }}
        />
      }
      styles={{
        content: {
          background: isDark ? "rgba(30,30,30,0.95)" : "#ffffff",
          padding: 0,
        },
        header: {
          background: isDark ? "rgba(255,255,255,0.05)" : "#fafafa",
          borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          padding: "20px 24px",
          borderRadius: "8px 8px 0 0",
        },
        body: {
          padding: "24px",
          maxHeight: "80vh",
          overflowY: "auto",
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          businessLocation: "C2Z Digital Solutions (C2Z1)",
          date: dayjs(),
          purchaseTax: "none",
        }}
      >
        {/* Header */}
        <Title
          level={3}
          style={{
            margin: 0,
            marginBottom: "24px",
            color: isDark ? "#fff" : "#1f1f1f",
            fontWeight: 600,
          }}
        >
          Add Purchase Return
        </Title>

        {/* Purchase Return Details Section */}
        <div
          style={{
            marginBottom: "24px",
            padding: "24px",
            background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
            borderRadius: "8px",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          }}
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
                  style={{ width: "100%" }}
                >
                  <Select.Option value="supplier1">ABC Trading Co.</Select.Option>
                  <Select.Option value="supplier2">XYZ Suppliers Ltd</Select.Option>
                  <Select.Option value="supplier3">Global Imports Inc</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label={
                  <Space>
                    <Text>Business Location</Text>
                    <Text type="danger">*</Text>
                  </Space>
                }
                name="businessLocation"
                rules={[{ required: true, message: "Please select business location" }]}
              >
                <Select placeholder="Please Select" style={{ width: "100%" }}>
                  <Select.Option value="C2Z Digital Solutions (C2Z1)">
                    C2Z Digital Solutions (C2Z1)
                  </Select.Option>
                  <Select.Option value="Location 2">Location 2</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item label="Reference No:" name="referenceNo">
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
                    <Text>Date</Text>
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
            <Col xs={24}>
              <Form.Item label="Attach Document:" name="document">
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
                  <div>
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "12px",
                        color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        display: "block",
                      }}
                    >
                      Max File size: 5MB
                    </Text>
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "12px",
                        color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
                        display: "block",
                      }}
                    >
                      Allowed File: .pdf, .csv, .zip, .doc, .docx, .jpeg, .jpg, .png
                    </Text>
                  </div>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Search Products Section */}
        <div
          style={{
            marginBottom: "24px",
            padding: "24px",
            background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
            borderRadius: "8px",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          }}
        >
          <Title
            level={4}
            style={{
              marginBottom: "16px",
              color: isDark ? "#fff" : "#1f1f1f",
            }}
          >
            Search Products
          </Title>

          <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
            <Col xs={24} sm={18}>
              <Input
                placeholder="Search Products"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={handleSearch}
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                }}
              />
            </Col>
            <Col xs={24} sm={6}>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                style={{ width: "100%" }}
              >
                Search
              </Button>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={18}>
              <Table
                columns={productColumns}
                dataSource={products}
                pagination={false}
                style={{
                  marginBottom: "16px",
                }}
                locale={{
                  emptyText: "No products added. Search and add products to the return list.",
                }}
              />
            </Col>
            <Col xs={24} lg={6}>
              <div
                style={{
                  padding: "16px",
                  background: isDark ? "rgba(255,255,255,0.05)" : "#f5f5f5",
                  borderRadius: "6px",
                  textAlign: "right",
                }}
              >
                <Text
                  strong
                  style={{
                    fontSize: "16px",
                    color: isDark ? "#fff" : "#1f1f1f",
                  }}
                >
                  Total Amount: TSh {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
              </div>
            </Col>
          </Row>
        </div>

        {/* Purchase Tax Section */}
        <div
          style={{
            marginBottom: "24px",
            padding: "24px",
            background: isDark ? "rgba(255,255,255,0.02)" : "#fafafa",
            borderRadius: "8px",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
          }}
        >
          <Row gutter={[16, 16]}>
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
          </Row>
        </div>

        {/* Footer with Submit Button */}
        <Row justify="end" style={{ marginTop: "24px", paddingTop: "16px", borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0" }}>
          <Col>
            <Space>
              <Button
                onClick={handleCancel}
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
                Submit
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddPurchaseReturnModal;

