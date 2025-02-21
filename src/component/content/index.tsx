import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import InputComponent from "./input";
const { Content } = Layout;

const Contents: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <section style={{ padding: "0 24px 24px" }}>
      <Breadcrumb
        items={[{ title: "打包为HTML" }]}
        style={{ margin: "16px 0" }}
      />
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          minWidth: "calc(100vw - 128px)",
        }}
      >
        <InputComponent />
      </Content>
    </section>
  );
};

export default Contents;
