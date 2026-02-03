import { Card, Typography, Table, Tag, Space, Skeleton } from "antd";
import { AlertOutlined } from "@ant-design/icons";
import useTheme from "@/theme/useTheme";
import type { ColumnsType } from "antd/es/table";

interface ProductStockAlertData {
  key: string;
  product: string;
  location: string;
  currentStock: number;
}

interface ProductStockAlertCardProps {
  data?: ProductStockAlertData[];
  totalItems?: number;
  loading?: boolean;
}

const ProductStockAlertCard: React.FC<ProductStockAlertCardProps> = ({
  data = [],
  totalItems = 0,
  loading = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const defaultData: ProductStockAlertData[] = data.length > 0 ? data : [
    {
      key: "1",
      product: "Product A",
      location: "Warehouse 1",
      currentStock: 5,
    },
    {
      key: "2",
      product: "Product B",
      location: "Warehouse 2",
      currentStock: 12,
    },
    {
      key: "3",
      product: "Product C",
      location: "Warehouse 1",
      currentStock: 18,
    },
    {
      key: "4",
      product: "Product D",
      location: "Warehouse 3",
      currentStock: 8,
    },
  ];

  const columns: ColumnsType<ProductStockAlertData> = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text: string) => (
        <Typography.Text
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: isDark ? "#fff" : "#1f1f1f",
          }}
        >
          {text}
        </Typography.Text>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text: string) => (
        <Typography.Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {text}
        </Typography.Text>
      ),
    },
    {
      title: "Current stock",
      dataIndex: "currentStock",
      key: "currentStock",
      render: (value: number) => (
        <Typography.Text
          style={{
            fontSize: "13px",
            color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
          }}
        >
          {value}
        </Typography.Text>
      ),
    },
  ];

  return (
    <Card
      hoverable
      style={{
        borderRadius: "8px",
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        boxShadow: isDark 
          ? "0 2px 8px rgba(0,0,0,0.3)" 
          : "0 2px 8px rgba(0,0,0,0.06)",
        height: "100%",
        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
        transition: "all 0.3s ease",
      }}
      styles={{ 
        body: { padding: "24px" },
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 4px 16px rgba(0,0,0,0.4)"
          : "0 4px 16px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 2px 8px rgba(0,0,0,0.3)"
          : "0 2px 8px rgba(0,0,0,0.06)";
      }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #ff4d4f20 0%, #ff4d4f10 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ff4d4f",
                  fontSize: "24px",
                  border: "1px solid #ff4d4f30",
                }}
              >
                <AlertOutlined />
              </div>
              <div>
                <Typography.Text
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Product Stock Alert
                </Typography.Text>
                <Typography.Text
                  strong
                  style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: isDark ? "#fff" : "#1f1f1f",
                    display: "block",
                    marginTop: "4px",
                  }}
                >
                  {totalItems || defaultData.length} items
                </Typography.Text>
              </div>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={defaultData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
              pageSizeOptions: ["10", "25", "50", "100"],
            }}
            size="small"
            style={{
              background: isDark ? "transparent" : "#fafafa",
              borderRadius: "6px",
            }}
          />
        </Space>
      )}
    </Card>
  );
};

export default ProductStockAlertCard;

