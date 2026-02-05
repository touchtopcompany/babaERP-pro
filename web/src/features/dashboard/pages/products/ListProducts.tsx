import React, { useState, useMemo } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Typography,
  message,
  Row,
  Col,
  Dropdown,
  Checkbox,
  Select,
  Collapse,
  Divider,
  Tabs,
  Modal,
} from "antd";
import type { MenuProps } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  DownOutlined,
  BarChartOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import useTheme from "@/theme/useTheme";
import { ViewModal, EditModal, DeleteModal } from "@/components/modals";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Search } = Input;
const { Panel } = Collapse;

export interface ProductData {
  key: string;
  product: string;
  businessLocation: string;
  defaultPurchasingPrice: number;
  unitPurchasePrice: number;
  sellingPrice: number;
  currentStock: number;
  stockUnit: string;
  productType: string;
  category: string;
  brand: string;
  tax: string;
  sku: string;
  image?: string;
  notForSelling?: boolean;
}

const ListProducts: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Filter states
  const [filters, setFilters] = useState({
    businessLocation: "all",
    stockStatus: "all",
    brand: "all",
    productType: "all",
    unit: "all",
    category: "all",
    tax: "all",
    notForSelling: false,
  });

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
    product: true,
    businessLocation: true,
    defaultPurchasingPrice: true,
    unitPurchasePrice: true,
    sellingPrice: true,
    currentStock: true,
    productType: true,
    category: true,
    brand: true,
    tax: true,
    sku: true,
    action: true,
  });

  // Mock data - replace with API call
  const defaultProducts: ProductData[] = [
    {
      key: "1",
      product: "100W Supper charge",
      businessLocation: "C2Z Digital Solutions",
      defaultPurchasingPrice: 37500.00,
      unitPurchasePrice: 37500.00,
      sellingPrice: 45000.00,
      currentStock: 25.00,
      stockUnit: "pieces",
      productType: "Single",
      category: "",
      brand: "",
      tax: "",
      sku: "6933138600757",
    },
    {
      key: "2",
      product: "25 W Charge (changeable plug - PD+QC3.0)",
      businessLocation: "C2Z Digital Solutions",
      defaultPurchasingPrice: 24000.00,
      unitPurchasePrice: 24000.00,
      sellingPrice: 30000.00,
      currentStock: 3.00,
      stockUnit: "pieces",
      productType: "Single",
      category: "",
      brand: "",
      tax: "",
      sku: "6933138691861",
    },
    {
      key: "3",
      product: "3 IN 1 LIGHTING/TYPE-C/MICRO",
      businessLocation: "C2Z Digital Solutions",
      defaultPurchasingPrice: 8300.00,
      unitPurchasePrice: 8300.00,
      sellingPrice: 10000.00,
      currentStock: 11.00,
      stockUnit: "pieces",
      productType: "Single",
      category: "",
      brand: "",
      tax: "",
      sku: "6933138640937",
    },
    {
      key: "4",
      product: "Amplify CA 18",
      businessLocation: "C2Z Digital Solutions",
      defaultPurchasingPrice: 680000.00,
      unitPurchasePrice: 680000.00,
      sellingPrice: 850000.00,
      currentStock: 0.00,
      stockUnit: "pieces",
      productType: "Single",
      category: "",
      brand: "",
      tax: "",
      sku: "0033",
    },
    {
      key: "5",
      product: "Chakacha",
      businessLocation: "C2Z Digital Solutions",
      defaultPurchasingPrice: 40000.00,
      unitPurchasePrice: 40000.00,
      sellingPrice: 50000.00,
      currentStock: 4.00,
      stockUnit: "pieces",
      productType: "Single",
      category: "",
      brand: "",
      tax: "",
      sku: "0020",
    },
    {
      key: "6",
      product: "Data Cable TPE Fast charge",
      businessLocation: "C2Z Digital Solutions",
      defaultPurchasingPrice: 8300.00,
      unitPurchasePrice: 8300.00,
      sellingPrice: 10000.00,
      currentStock: 46.00,
      stockUnit: "pieces",
      productType: "Single",
      category: "",
      brand: "",
      tax: "",
      sku: "6933138601419",
    },
    {
      key: "7",
      product: "Dell 3.5 HDD Enterprise plus",
      businessLocation: "C2Z Digital Solutions",
      defaultPurchasingPrice: 640000.00,
      unitPurchasePrice: 640000.00,
      sellingPrice: 800000.00,
      currentStock: 2.00,
      stockUnit: "pieces",
      productType: "Single",
      category: "",
      brand: "",
      tax: "",
      sku: "0028",
    },
    {
      key: "8",
      product: "Drum Skin",
      businessLocation: "C2Z Digital Solutions",
      defaultPurchasingPrice: 160000.00,
      unitPurchasePrice: 160000.00,
      sellingPrice: 200000.00,
      currentStock: 9.00,
      stockUnit: "Sets",
      productType: "Single",
      category: "",
      brand: "",
      tax: "",
      sku: "0038",
    },
    {
      key: "9",
      product: "Drum Stick A5",
      businessLocation: "C2Z Digital Solutions",
      defaultPurchasingPrice: 12000.00,
      unitPurchasePrice: 12000.00,
      sellingPrice: 15000.00,
      currentStock: 22.00,
      stockUnit: "Pairs",
      productType: "Single",
      category: "",
      brand: "",
      tax: "",
      sku: "0037",
    },
    {
      key: "10",
      product: "Drums Set",
      businessLocation: "C2Z Digital Solutions",
      defaultPurchasingPrice: 1600000.00,
      unitPurchasePrice: 1600000.00,
      sellingPrice: 2000000.00,
      currentStock: 3.00,
      stockUnit: "Sets",
      productType: "Single",
      category: "",
      brand: "",
      tax: "",
      sku: "0018",
    },
  ];

  const [products, setProducts] = useState<ProductData[]>(defaultProducts);
  const [stockEvaluationModalOpen, setStockEvaluationModalOpen] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);

  // Filter products based on search text and filters
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.product.toLowerCase().includes(searchLower) ||
          product.sku.toLowerCase().includes(searchLower) ||
          product.businessLocation.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    if (filters.businessLocation !== "all") {
      filtered = filtered.filter((p) => p.businessLocation === filters.businessLocation);
    }
    if (filters.stockStatus === "in_stock") {
      filtered = filtered.filter((p) => p.currentStock > 0);
    } else if (filters.stockStatus === "out_of_stock") {
      filtered = filtered.filter((p) => p.currentStock === 0);
    }
    if (filters.brand !== "all") {
      filtered = filtered.filter((p) => p.brand === filters.brand);
    }
    if (filters.productType !== "all") {
      filtered = filtered.filter((p) => p.productType === filters.productType);
    }
    if (filters.unit !== "all") {
      filtered = filtered.filter((p) => p.stockUnit === filters.unit);
    }
    if (filters.category !== "all") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.tax !== "all") {
      filtered = filtered.filter((p) => p.tax === filters.tax);
    }
    if (filters.notForSelling) {
      filtered = filtered.filter((p) => p.notForSelling === true);
    }

    return filtered;
  }, [products, searchText, filters]);

  const handleAddProduct = () => {
    navigate("/products/add-product");
  };

  const handleStockEvaluationReport = () => {
    setStockEvaluationModalOpen(true);
  };

  const handlePrintStockEvaluation = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      window.print();
      setIsPrintMode(false);
    }, 100);
  };

  const handleDownloadExcel = () => {
    message.info("Excel download functionality coming soon");
  };

  const handleRefresh = () => {
    setLoading(true);
    // TODO: Implement API call to refresh products
    setTimeout(() => {
      setLoading(false);
      message.success("Products refreshed successfully");
    }, 1000);
  };

  // Calculate stock evaluation data for the selected business location
  const getStockEvaluationData = () => {
    const locationProducts = filters.businessLocation === "all"
      ? filteredProducts
      : filteredProducts.filter(p => p.businessLocation === filters.businessLocation);

    // Calculate department-wise data
    const departments = [
      { name: "D1", description: "" },
      { name: "D2", description: "Back Cover" },
      { name: "D3", description: "Battery" },
      { name: "D4", description: "Benzine" },
      { name: "D5", description: "Complete" }
    ];

    return departments.map(dept => {
      // For demo purposes, distribute products across departments
      const deptIndex = departments.indexOf(dept);
      const deptProducts = locationProducts.slice(
        deptIndex * Math.ceil(locationProducts.length / departments.length),
        (deptIndex + 1) * Math.ceil(locationProducts.length / departments.length)
      );

      const costPrice = deptProducts.reduce((sum, p) => sum + (p.unitPurchasePrice * p.currentStock), 0);
      const sellingPrice = deptProducts.reduce((sum, p) => sum + (p.sellingPrice * p.currentStock), 0);

      return {
        department: dept.description ? `${dept.name} (${dept.description})` : dept.name,
        costPrice,
        sellingPrice
      };
    });
  };

  const handleExportCSV = () => {
    const headers = [
      "Product",
      "Business Location",
      "Default Purchasing Price",
      "Unit Purchase Price",
      "Selling Price",
      "Current Stock",
      "Product Type",
      "Category",
      "Brand",
      "Tax",
      "SKU",
    ];
    const csvData = filteredProducts.map((product) => [
      product.product,
      product.businessLocation,
      product.defaultPurchasingPrice.toFixed(2),
      product.unitPurchasePrice.toFixed(2),
      product.sellingPrice.toFixed(2),
      `${product.currentStock} ${product.stockUnit}`,
      product.productType,
      product.category || "",
      product.brand || "",
      product.tax || "",
      product.sku,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `products_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("Products exported to CSV successfully");
  };

  const handleExportExcel = () => {
    message.info("Excel export will be available soon. Exporting as CSV for now.");
    handleExportCSV();
  };

  const handleExportPDF = () => {
    message.info("PDF export functionality coming soon");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const tableHTML = `
      <html>
        <head>
          <title>Products Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1f1f1f; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Products Management Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Business Location</th>
                <th>Selling Price</th>
                <th>Current Stock</th>
                <th>SKU</th>
              </tr>
            </thead>
            <tbody>
              ${filteredProducts
        .map(
          (product) => `
                <tr>
                  <td>${product.product}</td>
                  <td>${product.businessLocation}</td>
                  <td>TSh ${product.sellingPrice.toFixed(2)}</td>
                  <td>${product.currentStock} ${product.stockUnit}</td>
                  <td>${product.sku}</td>
                </tr>
              `
        )
        .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(tableHTML);
    printWindow.document.close();
    printWindow.print();
    message.success("Print dialog opened");
  };

  const handleColumnVisibilityChange = (key: string, visible: boolean) => {
    setColumnVisibility((prev) => ({ ...prev, [key]: visible }));
  };

  const columnVisibilityMenu: MenuProps = {
    items: Object.keys(columnVisibility).map((key) => ({
      key,
      label: (
        <Checkbox
          checked={columnVisibility[key]}
          onChange={(e) => handleColumnVisibilityChange(key, e.target.checked)}
        >
          {key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .trim()}
        </Checkbox>
      ),
    })),
  };


  const handleBulkDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select products to delete");
      return;
    }
    // TODO: Implement bulk delete
    message.info(`Delete ${selectedRowKeys.length} products functionality coming soon`);
  };

  const handleBulkEdit = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select products to edit");
      return;
    }
    // TODO: Implement bulk edit
    message.info(`Bulk edit ${selectedRowKeys.length} products functionality coming soon`);
  };

  const handleAddToLocation = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select products");
      return;
    }
    // TODO: Implement add to location
    message.info(`Add ${selectedRowKeys.length} products to location functionality coming soon`);
  };

  const handleRemoveFromLocation = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select products");
      return;
    }
    // TODO: Implement remove from location
    message.info(`Remove ${selectedRowKeys.length} products from location functionality coming soon`);
  };

  const handleDeactivateSelected = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select products to deactivate");
      return;
    }
    // TODO: Implement deactivate
    message.info(`Deactivate ${selectedRowKeys.length} products functionality coming soon`);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const columns: ColumnsType<ProductData> = [
    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: "left",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedProduct(record);
              setViewModalOpen(true);
            }}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#1890ff",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedProduct(record);
              setEditModalOpen(true);
            }}
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#52c41a",
            }}
          />
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedProduct(record);
              setDeleteModalOpen(true);
            }}
            danger
            style={{
              color: isDark ? "rgba(255,255,255,0.85)" : "#ff4d4f",
            }}
          />
        </Space>
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      width: 250,
      sorter: (a, b) => a.product.localeCompare(b.product),
      render: (text: string) => (
        <Space>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "6px",
              background: isDark ? "rgba(255,255,255,0.1)" : "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              color: isDark ? "rgba(255,255,255,0.45)" : "#8c8c8c",
              fontSize: "20px",
            }}
          >
            📷
          </div>
          <Text
            strong
            style={{
              fontSize: "14px",
              color: isDark ? "#fff" : "#1f1f1f",
            }}
          >
            {text}
          </Text>
        </Space>
      ),
    },
    {
      title: "Business Location",
      dataIndex: "businessLocation",
      key: "businessLocation",
      width: 200,
      sorter: (a, b) => a.businessLocation.localeCompare(b.businessLocation),
    },
    {
      title: "Default Purchasing Price",
      dataIndex: "defaultPurchasingPrice",
      key: "defaultPurchasingPrice",
      width: 200,
      align: "right",
      sorter: (a, b) => a.defaultPurchasingPrice - b.defaultPurchasingPrice,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "Unit Purchase Price",
      dataIndex: "unitPurchasePrice",
      key: "unitPurchasePrice",
      width: 180,
      align: "right",
      sorter: (a, b) => a.unitPurchasePrice - b.unitPurchasePrice,
      render: (value: number) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          TSh {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      ),
    },
    {
      title: "Selling Price",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
      width: 150,
      align: "right",
      sorter: (a, b) => a.sellingPrice - b.sellingPrice,
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
      title: "Current stock",
      key: "currentStock",
      width: 150,
      align: "right",
      sorter: (a, b) => a.currentStock - b.currentStock,
      render: (_, record) => (
        <Text
          style={{
            fontSize: "13px",
            color: record.currentStock === 0 ? "#ff4d4f" : isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {record.currentStock.toFixed(2)} {record.stockUnit}
        </Text>
      ),
    },
    {
      title: "Product Type",
      dataIndex: "productType",
      key: "productType",
      width: 120,
      sorter: (a, b) => a.productType.localeCompare(b.productType),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 150,
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
      width: 120,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      width: 150,
      sorter: (a, b) => a.sku.localeCompare(b.sku),
      render: (text: string) => (
        <Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
            fontFamily: "monospace",
          }}
        >
          {text}
        </Text>
      ),
    },
  ];

  // Filter columns based on visibility
  const visibleColumns = columns.filter((col) => {
    if (!col.key) return true;
    return columnVisibility[col.key as string] !== false;
  });

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
            Products
          </Title>
          <Text
            style={{
              fontSize: "14px",
              color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
              display: "block",
              marginTop: "4px",
            }}
          >
            Manage your products
          </Text>
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
              onClick={handleRefresh}
              loading={loading}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddProduct}
              style={{
                height: "40px",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Add
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Filters Section */}
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
        <Collapse
          ghost
          defaultActiveKey={["filters"]}
          style={{
            background: "transparent",
          }}
        >
          <Panel
            header={
              <Text
                strong
                style={{
                  fontSize: "16px",
                  color: isDark ? "#fff" : "#1f1f1f",
                }}
              >
                Filters
              </Text>
            }
            key="filters"
            style={{
              background: "transparent",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: "13px",
                      color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                    }}
                  >
                    Business Location:
                  </Text>
                  <Select
                    value={filters.businessLocation}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, businessLocation: value }))
                    }
                    style={{ width: "100%" }}
                    suffixIcon={<DownOutlined />}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="C2Z Digital Solutions">C2Z Digital Solutions</Select.Option>
                  </Select>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: "13px",
                      color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                    }}
                  >
                    Stock Status:
                  </Text>
                  <Select
                    value={filters.stockStatus}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, stockStatus: value }))
                    }
                    style={{ width: "100%" }}
                    suffixIcon={<DownOutlined />}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="in_stock">In Stock</Select.Option>
                    <Select.Option value="out_of_stock">Out of Stock</Select.Option>
                  </Select>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: "13px",
                      color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                    }}
                  >
                    Brand:
                  </Text>
                  <Select
                    value={filters.brand}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, brand: value }))
                    }
                    style={{ width: "100%" }}
                    suffixIcon={<DownOutlined />}
                  >
                    <Select.Option value="all">All</Select.Option>
                  </Select>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: "13px",
                      color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                    }}
                  >
                    Product Type:
                  </Text>
                  <Select
                    value={filters.productType}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, productType: value }))
                    }
                    style={{ width: "100%" }}
                    suffixIcon={<DownOutlined />}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="Single">Single</Select.Option>
                  </Select>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: "13px",
                      color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                    }}
                  >
                    Unit:
                  </Text>
                  <Select
                    value={filters.unit}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, unit: value }))
                    }
                    style={{ width: "100%" }}
                    suffixIcon={<DownOutlined />}
                  >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="pieces">Pieces</Select.Option>
                    <Select.Option value="Sets">Sets</Select.Option>
                    <Select.Option value="Pairs">Pairs</Select.Option>
                  </Select>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: "13px",
                      color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                    }}
                  >
                    Category:
                  </Text>
                  <Select
                    value={filters.category}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, category: value }))
                    }
                    style={{ width: "100%" }}
                    suffixIcon={<DownOutlined />}
                  >
                    <Select.Option value="all">All</Select.Option>
                  </Select>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: "13px",
                      color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                    }}
                  >
                    Tax:
                  </Text>
                  <Select
                    value={filters.tax}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, tax: value }))
                    }
                    style={{ width: "100%" }}
                    suffixIcon={<DownOutlined />}
                  >
                    <Select.Option value="all">All</Select.Option>
                  </Select>
                </Space>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Checkbox
                  checked={filters.notForSelling}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, notForSelling: e.target.checked }))
                  }
                >
                  Not for selling
                </Checkbox>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </Card>

      <Divider style={{ margin: "24px 0" }} />

      {/* All Products Section */}
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
        <Tabs
          defaultActiveKey="all"
          type="card"
          items={[
            {
              key: "all",
              label: "All Products",
              children: (
                <div>
                  <Row gutter={[16, 16]} style={{ marginBottom: "16px" }} align="middle">
                    <Col xs={24} sm={24} md={12} lg={8}>
                      <Title
                        level={4}
                        style={{
                          margin: 0,
                          color: isDark ? "#fff" : "#1f1f1f",
                          fontWeight: 600,
                        }}
                      >
                        All Products
                      </Title>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={16}>
                      <Space
                        style={{
                          width: "100%",
                          justifyContent: "flex-end",
                          flexWrap: "wrap",
                        }}
                      >
                        <Select
                          value={pageSize}
                          onChange={setPageSize}
                          style={{ width: 150 }}
                          suffixIcon={<DownOutlined />}
                        >
                          <Select.Option value={10}>Show 10 entries</Select.Option>
                          <Select.Option value={25}>Show 25 entries</Select.Option>
                          <Select.Option value={50}>Show 50 entries</Select.Option>
                          <Select.Option value={100}>Show 100 entries</Select.Option>
                        </Select>
                        <Button
                          icon={<FileTextOutlined />}
                          onClick={handleExportCSV}
                          style={{
                            height: "40px",
                            borderRadius: "6px",
                            fontWeight: 500,
                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                            color: isDark ? "#fff" : "#1f1f1f",
                          }}
                        >
                          Export to CSV
                        </Button>
                        <Button
                          icon={<FileExcelOutlined />}
                          onClick={handleExportExcel}
                          style={{
                            height: "40px",
                            borderRadius: "6px",
                            fontWeight: 500,
                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                            color: isDark ? "#fff" : "#1f1f1f",
                          }}
                        >
                          Export to Excel
                        </Button>
                        <Button
                          icon={<PrinterOutlined />}
                          onClick={handlePrint}
                          style={{
                            height: "40px",
                            borderRadius: "6px",
                            fontWeight: 500,
                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                            color: isDark ? "#fff" : "#1f1f1f",
                          }}
                        >
                          Print
                        </Button>
                        <Dropdown
                          menu={columnVisibilityMenu}
                          trigger={["click"]}
                          placement="bottomRight"
                        >
                          <Button
                            icon={<UnorderedListOutlined />}
                            style={{
                              height: "40px",
                              borderRadius: "6px",
                              fontWeight: 500,
                              background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                              color: isDark ? "#fff" : "#1f1f1f",
                            }}
                          >
                            Column visibility
                          </Button>
                        </Dropdown>
                        <Button
                          icon={<FilePdfOutlined />}
                          onClick={handleExportPDF}
                          style={{
                            height: "40px",
                            borderRadius: "6px",
                            fontWeight: 500,
                            background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d9d9d9",
                            color: isDark ? "#fff" : "#1f1f1f",
                          }}
                        >
                          Export to PDF
                        </Button>
                        <Button
                          type="primary"
                          icon={<BarChartOutlined />}
                          onClick={handleStockEvaluationReport}
                          style={{
                            height: "40px",
                            borderRadius: "6px",
                            fontWeight: 500,
                          }}
                        >
                          Stock Evaluation Report
                        </Button>
                        <Button
                          type="primary"
                          icon={<DownloadOutlined />}
                          onClick={handleDownloadExcel}
                          style={{
                            height: "40px",
                            borderRadius: "6px",
                            fontWeight: 500,
                            background: "#52c41a",
                            borderColor: "#52c41a",
                          }}
                        >
                          Download Excel
                        </Button>
                        <Search
                          placeholder="Search..."
                          allowClear
                          enterButton={
                            <Button
                              type="primary"
                              icon={<SearchOutlined />}
                              style={{
                                height: "40px",
                                borderRadius: "0 6px 6px 0",
                              }}
                            />
                          }
                          size="large"
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                          onSearch={(value) => setSearchText(value)}
                          style={{
                            width: 200,
                          }}
                        />
                      </Space>
                    </Col>
                  </Row>

                  <style>{`
              .products-table .ant-table-thead > tr > th {
                transition: all 0.2s ease;
                cursor: pointer;
              }
              .products-table .ant-table-thead > tr > th:hover {
                background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
              }
              .products-table .ant-table-thead > tr > th:first-child {
                background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "#1890ff"} !important;
                color: ${isDark ? "rgba(255,255,255,0.85)" : "#fff"} !important;
              }
              .products-table .ant-table-thead > tr > th:first-child:hover {
                background: ${isDark ? "rgba(24, 144, 255, 0.3)" : "rgba(24, 144, 255, 0.9)"} !important;
              }
              .products-table .ant-table-tbody > tr {
                transition: all 0.2s ease;
              }
              .products-table .ant-table-tbody > tr:hover > td {
                background: ${isDark ? "rgba(24, 144, 255, 0.1)" : "rgba(24, 144, 255, 0.05)"} !important;
              }
              .products-table .ant-table-tbody > tr:hover {
                transform: translateY(-1px);
                box-shadow: ${isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 2px 8px rgba(0,0,0,0.08)"};
              }
              .products-table .ant-table-column-sorter {
                color: ${isDark ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.85)"} !important;
              }
              .products-table .ant-table-column-sorted .ant-table-column-sorter-up,
              .products-table .ant-table-column-sorted .ant-table-column-sorter-down,
              .products-table .ant-table-column-sorter-up.on,
              .products-table .ant-table-column-sorter-down.on,
              .products-table .ant-table-column-sorter-up.active,
              .products-table .ant-table-column-sorter-down.active {
                color: ${isDark ? "#fff" : "#fff"} !important;
                opacity: 1 !important;
              }
            `}</style>
                  <Table
                    className="products-table"
                    rowSelection={rowSelection}
                    columns={visibleColumns}
                    dataSource={filteredProducts}
                    loading={loading}
                    pagination={{
                      pageSize: pageSize,
                      showSizeChanger: false,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      style: {
                        marginTop: "16px",
                      },
                    }}
                    scroll={{ x: "max-content" }}
                    style={{
                      background: isDark ? "transparent" : "#fafafa",
                    }}
                  />

                  {/* Bulk Actions */}
                  {selectedRowKeys.length > 0 && (
                    <Card
                      style={{
                        marginTop: "24px",
                        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
                        borderRadius: "8px",
                        overflow: "hidden",
                        maxWidth: "100%",
                      }}
                      bodyStyle={{ padding: "16px 24px" }}
                    >
                      <Space wrap>
                        <Text
                          strong
                          style={{
                            fontSize: "14px",
                            color: isDark ? "#fff" : "#1f1f1f",
                          }}
                        >
                          {selectedRowKeys.length} product(s) selected
                        </Text>
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={handleBulkDelete}
                          style={{
                            height: "36px",
                            borderRadius: "6px",
                            fontWeight: 500,
                          }}
                        >
                          Delete Selected
                        </Button>
                        <Button
                          type="primary"
                          icon={<EditOutlined />}
                          onClick={handleBulkEdit}
                          style={{
                            height: "36px",
                            borderRadius: "6px",
                            fontWeight: 500,
                          }}
                        >
                          Bulk Edit
                        </Button>
                        <Button
                          style={{
                            height: "36px",
                            borderRadius: "6px",
                            fontWeight: 500,
                            background: "#52c41a",
                            borderColor: "#52c41a",
                            color: "#fff",
                          }}
                          onClick={handleAddToLocation}
                        >
                          Add to location
                        </Button>
                        <Button
                          style={{
                            height: "36px",
                            borderRadius: "6px",
                            fontWeight: 500,
                            background: "#fa8c16",
                            borderColor: "#fa8c16",
                            color: "#fff",
                          }}
                          onClick={handleRemoveFromLocation}
                        >
                          Remove from location
                        </Button>
                        <Button
                          style={{
                            height: "36px",
                            borderRadius: "6px",
                            fontWeight: 500,
                            background: "#faad14",
                            borderColor: "#faad14",
                            color: "#fff",
                          }}
                          onClick={handleDeactivateSelected}
                        >
                          Deactivate Selected
                        </Button>
                      </Space>
                    </Card>
                  )}
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* View Modal */}
      <ViewModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedProduct(null);
        }}
        title="Product Details"
        data={selectedProduct}
        fields={[
          { key: "product", label: "Product Name" },
          { key: "businessLocation", label: "Business Location" },
          { key: "defaultPurchasingPrice", label: "Default Purchasing Price" },
          { key: "unitPurchasePrice", label: "Unit Purchase Price" },
          { key: "sellingPrice", label: "Selling Price" },
          { key: "currentStock", label: "Current Stock" },
          { key: "productType", label: "Product Type" },
          { key: "category", label: "Category" },
          { key: "brand", label: "Brand" },
          { key: "tax", label: "Tax" },
          { key: "sku", label: "SKU" },
        ]}
        width={600}
      />

      {/* Edit Modal */}
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={async (_values) => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to update product
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Product updated successfully");
            setEditModalOpen(false);
            setSelectedProduct(null);
          } catch (_error) {
            message.error("Failed to update product");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Edit Product"
        data={selectedProduct}
        fields={[
          { name: "product", label: "Product Name", type: "text", required: true },
          { name: "sellingPrice", label: "Selling Price", type: "number", required: true },
          { name: "defaultPurchasingPrice", label: "Default Purchasing Price", type: "number" },
          { name: "unitPurchasePrice", label: "Unit Purchase Price", type: "number" },
          { name: "sku", label: "SKU", type: "text" },
        ]}
        loading={actionLoading}
        width={600}
      />

      {/* Stock Evaluation Report Modal */}
      <Modal
        title={
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Title level={2} style={{ margin: 0, color: '#1890ff', fontSize: '24px', fontWeight: 'bold' }}>
              {filters.businessLocation === "all" ? "ALL LOCATIONS" : filters.businessLocation.toUpperCase()}
            </Title>
            <Text style={{ fontSize: '16px', color: '#666' }}>
              {filters.businessLocation === "all" ? "All Locations - Stock Evaluation Department Analysis" : `${filters.businessLocation} - Stock Evaluation Department Analysis`}
            </Text>
          </div>
        }
        open={stockEvaluationModalOpen}
        onCancel={() => setStockEvaluationModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setStockEvaluationModalOpen(false)}>
            Close
          </Button>,
          <Button key="print" type="primary" icon={<PrinterOutlined />} onClick={handlePrintStockEvaluation}>
            Print
          </Button>
        ]}
        width={1200}
        style={{ top: 20 }}
      >
        <div style={{
          padding: isPrintMode ? '20px' : '30px',
          backgroundColor: '#fff',
          fontFamily: 'Courier New, monospace',
          position: 'relative'
        }}>
          {/* Print-specific styles */}
          {isPrintMode && (
            <style>{`
              @media print {
                body * {
                  visibility: hidden;
                }
                .print-content, .print-content * {
                  visibility: visible;
                }
                .print-content {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                }
                .no-print {
                  display: none !important;
                }
                @page {
                  margin: 20mm;
                  size: A4;
                }
              }
            `}</style>
          )}

          <div className={isPrintMode ? "print-content" : ""} style={{
            border: '3px double #000',
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: '#f9f9f9'
          }}>
            {/* Print Header */}
            {isPrintMode && (
              <div style={{
                textAlign: 'center',
                marginBottom: '30px',
                borderBottom: '3px double #000',
                paddingBottom: '20px'
              }}>
                <h1 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1890ff',
                  margin: '0 0 10px 0',
                  letterSpacing: '2px'
                }}>
                  {filters.businessLocation === "all" ? "ALL LOCATIONS" : filters.businessLocation.toUpperCase()}
                </h1>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  margin: '0'
                }}>
                  {filters.businessLocation === "all" ? "All Locations - Stock Evaluation Department Analysis" : `${filters.businessLocation} - Stock Evaluation Department Analysis`}
                </p>
              </div>
            )}

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: '3px double #000',
                fontSize: '16px',
                backgroundColor: '#ffffff'
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#e0e0e0', borderBottom: '3px double #000' }}>
                  <th
                    style={{
                      border: '2px solid #000',
                      padding: '15px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      backgroundColor: '#d4e4f7',
                      fontSize: '18px',
                      letterSpacing: '1px'
                    }}
                  >
                    DEPARTMENT
                  </th>
                  <th
                    style={{
                      border: '2px solid #000',
                      padding: '15px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      backgroundColor: '#d4e4f7',
                      fontSize: '18px',
                      letterSpacing: '1px'
                    }}
                  >
                    VALUE @ C.P
                  </th>
                  <th
                    style={{
                      border: '2px solid #000',
                      padding: '15px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      backgroundColor: '#d4e4f7',
                      fontSize: '18px',
                      letterSpacing: '1px'
                    }}
                  >
                    VALUE @ S.P
                  </th>
                </tr>
              </thead>
              <tbody>
                {getStockEvaluationData().map((row, index) => (
                  <tr key={index} style={{
                    borderBottom: '1px solid #000',
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f5f5f5'
                  }}>
                    <td style={{
                      border: '2px solid #000',
                      padding: '12px 15px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      {row.department}
                    </td>
                    <td style={{
                      border: '2px solid #000',
                      padding: '12px 15px',
                      textAlign: 'right',
                      fontSize: '16px',
                      fontFamily: 'Courier New, monospace'
                    }}>
                      {row.costPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style={{
                      border: '2px solid #000',
                      padding: '12px 15px',
                      textAlign: 'right',
                      fontSize: '16px',
                      fontFamily: 'Courier New, monospace'
                    }}>
                      {row.sellingPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
                <tr style={{
                  backgroundColor: '#e8e8e8',
                  fontWeight: 'bold',
                  borderTop: '3px double #000'
                }}>
                  <td style={{
                    border: '2px solid #000',
                    padding: '15px',
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    letterSpacing: '2px'
                  }}>
                    TOTAL
                  </td>
                  <td style={{
                    border: '2px solid #000',
                    padding: '15px',
                    textAlign: 'right',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    fontFamily: 'Courier New, monospace',
                    backgroundColor: '#fff2cc'
                  }}>
                    {getStockEvaluationData().reduce((sum, row) => sum + row.costPrice, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td style={{
                    border: '2px solid #000',
                    padding: '15px',
                    textAlign: 'right',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    fontFamily: 'Courier New, monospace',
                    backgroundColor: '#fff2cc'
                  }}>
                    {getStockEvaluationData().reduce((sum, row) => sum + row.sellingPrice, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{
            textAlign: 'center',
            color: '#333',
            fontSize: '14px',
            borderTop: '2px solid #000',
            paddingTop: '15px',
            fontFamily: 'Arial, sans-serif'
          }}>
            <Text strong>Report Generated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</Text>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={async () => {
          setActionLoading(true);
          try {
            // TODO: Implement API call to delete product
            await new Promise((resolve) => setTimeout(resolve, 1000));
            message.success("Product deleted successfully");
            setProducts(products.filter((p) => p.key !== selectedProduct?.key));
            setDeleteModalOpen(false);
            setSelectedProduct(null);
          } catch (_error) {
            message.error("Failed to delete product");
          } finally {
            setActionLoading(false);
          }
        }}
        title="Delete Product"
        itemName={selectedProduct?.product}
        loading={actionLoading}
      />
    </div>
  );
};

export default ListProducts;

