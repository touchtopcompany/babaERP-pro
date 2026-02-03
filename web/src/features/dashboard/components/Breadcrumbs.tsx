import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import useTheme from "@/theme/useTheme";

interface BreadcrumbsProps {
  items: Array<{ title: string; path?: string }>;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const breadcrumbItems = [
    {
      title: (
        <span>
          <HomeOutlined style={{ marginRight: 4 }} />
          <span>Dashboard</span>
        </span>
      ),
      path: "/dashboard",
    },
    ...items.map((item) => ({
      title: item.title,
      path: item.path,
    })),
  ];

  return (
    <Breadcrumb
      items={breadcrumbItems}
      style={{
        marginBottom: "24px",
        color: isDark ? "rgba(255,255,255,0.85)" : "#595959",
      }}
    />
  );
};

export default Breadcrumbs;

