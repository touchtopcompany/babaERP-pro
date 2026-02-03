import { Card, Typography, Progress, Row, Col } from "antd";
import useTheme from "@/theme/useTheme";

interface PaymentSummaryCardProps {
  label: string;
  value: string;
  progress: number;
  color: string;
}

const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({
  label,
  value,
  progress,
  color,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card
      style={{
        borderRadius: "8px",
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #f0f0f0",
        background: isDark ? "rgba(255,255,255,0.05)" : "#ffffff",
        height: "100%",
      }}
      styles={{ 
        body: { padding: "16px" },
      }}
    >
      <div>
        <Typography.Text
          type="secondary"
          style={{
            fontSize: "12px",
            color: isDark ? "rgba(255,255,255,0.65)" : "#8c8c8c",
            display: "block",
            marginBottom: "8px",
          }}
        >
          {label}
        </Typography.Text>
        <Typography.Text
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: isDark ? "#fff" : "#1f1f1f",
            display: "block",
            marginBottom: "12px",
          }}
        >
          {value}
        </Typography.Text>
        <Progress
          percent={progress}
          strokeColor={color}
          showInfo={false}
          style={{ marginBottom: 0 }}
        />
      </div>
    </Card>
  );
};

export default PaymentSummaryCard;

