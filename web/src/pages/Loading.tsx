import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-aliceblue dark:bg-slate-900/60!">
      <div
        className="
          p-8 w-40 h-40
          backdrop-blur-xl flex items-center justify-center
        "
      >
        <div className="flex flex-col items-center gap-3">
          <Spin size="large" className="text-green-600" />
          <span className="text-white">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
