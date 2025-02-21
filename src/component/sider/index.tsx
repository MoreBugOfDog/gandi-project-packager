import React from "react";
import { Menu, Layout } from "antd";
import type { MenuProps } from "antd";
import { theme } from "antd";
import { Html5Outlined } from "@ant-design/icons";
const { Sider } = Layout;

const items2: MenuProps["items"] = [
  {
    key: "sub1",
    icon: <Html5Outlined />,
    label: "subnav 1",
    children: [{ key: "html", label: "打包为HTML" }],
  },
];

const Siders: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      style={{
        background: colorBgContainer,
        minHeight: "calc(100vh - 64px)",
        maxWidth: "64px",
      }}
      defaultCollapsed
      collapsed
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["packager"]}
        defaultOpenKeys={["packager"]}
        style={{ height: "100%", borderRight: 0 }}
        items={items2}
      />
    </Sider>
  );
};

export default Siders;
