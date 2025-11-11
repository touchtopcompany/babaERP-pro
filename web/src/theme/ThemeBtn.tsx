import { FloatButton } from "antd";
import {
  SettingOutlined,
  MoonOutlined,
  SunOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import useTheme from "./useTheme";
import useLocalstorage from "../hooks/useLocalstorage";
import { APP_THEME_NAME } from "@/utils/constants";

const ThemeBtn = () => {
  const { setTheme, setAutoTheme }  = useTheme();
  const { setItem } = useLocalstorage();
  return (
    <FloatButton.Group
      trigger="click"
      type="primary"
      icon={<SettingOutlined />}
      tooltip={<div>Theme Settings</div>}
    >
      <FloatButton
        icon={<MoonOutlined />}
        tooltip={<div>Dark Mode</div>}
        onClick={() => {
          setItem(APP_THEME_NAME, "dark");
          setTheme("dark");
          setAutoTheme(false);

        }}
      />
      <FloatButton
        icon={<SunOutlined />}
        tooltip={<div>Light Mode</div>}
        onClick={() => {
          setItem(APP_THEME_NAME, "light");
          setTheme("light");
          setAutoTheme(false);

        }}
      />

      <FloatButton
        icon={<SyncOutlined />}
        tooltip={<div>Auto Mode</div>}
        onClick={() => {
          setAutoTheme(true);
        }}
      />
    </FloatButton.Group>
  );
};

export default ThemeBtn;
