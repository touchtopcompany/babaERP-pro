import { Result } from "antd";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <Result
        status="404"
        title="404"
        subTitle="The page you visited does not exist."
      />
    </div>
  );
};

export default NotFound;
