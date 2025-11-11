import { useEffect, type FC } from "react";
import { Result } from "antd";
import { LockOutlined } from "@ant-design/icons";

const Unauthorized: FC = () => {

  useEffect(() => {

    const unsubscribe = setTimeout(() => {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      window.location.replace("/signin")

    }, 500);

    return () => clearTimeout(unsubscribe);

  }, []);

  return (
    <Result
      status="403"
      title="403"
      className="text-white dark:text-black"
      subTitle="Sorry, you are not authorized to access this page. you will be redirected soon"
      icon={<LockOutlined style={{ fontSize: 64, color: "#ff4d4f" }} />}
    />
  );
};

export default Unauthorized;
