import React from "react";
import { Menu, Layout } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Header } = Layout;

const items1: MenuProps["items"] = [
  {
    key: "packager",
    label: "CCW/Cocrea 项目打包器",
  },
];

const HeaderComponent: React.FC = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src="https://static.bcmcdn.com/coco/player/unstable/SkREMDP9yx.image/png?hash=Fs1wBpTGhaqMu-5EmeXcHnfH2g2B"
        alt="logo"
        style={{
          position: "absolute",
          top: "-23px",
          left: "26px",
          // 设置缩放
          transform: "scale(0.3)",
          // 贴在页面最左侧
          transformOrigin: "left",
          flex: 1,
        }}
      />
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["packager"]}
          items={items1}
          style={{ flex: 2, minWidth: 0 }}
        />
      </Header>
    </div>
  );
};

export default HeaderComponent;
