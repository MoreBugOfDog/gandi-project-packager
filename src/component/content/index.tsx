import React from "react";
import { Breadcrumb, Layout, theme, Alert } from "antd";
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
        <Alert
          message={
            <>
              <a href="https://www.ccw.site/student/6200811f05660557606c8b15">
                {"作者：多bug的啸天犬 @ CCW   "}
              </a>
              <>欢迎联系 反馈bug 提出需求 或者点点关注~</>
            </>
          }
          type="info"
          showIcon
          closable
        />

        <Alert
          message="打包出来的HTML/EXE使用需要联网！支持和 CCW 线上发布版实时热更新保持一致！"
          type="warning"
          showIcon
          closable
          style={{ marginTop: 10 }}
        />
        <br />
        <InputComponent />
      </Content>
    </section>
  );
};

export default Contents;
