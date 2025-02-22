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
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["packager"]}
        items={items1}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

export default HeaderComponent;
