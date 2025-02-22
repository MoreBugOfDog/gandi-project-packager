import React from "react";
import { Layout } from "antd";
import HeaderComponent from "./component/header";
import Siders from "./component/sider";
import Contents from "./component/content";
import clearFocus from "./utils/clearFocus/clearFocus";
const { Header, Sider, Content } = Layout;

// 加载结束时清除焦点
window.addEventListener("load", clearFocus);
const App: React.FC = () => {
  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Header>
        <HeaderComponent />
      </Header>
      <Layout>
        <Siders />

        <Contents />
      </Layout>
    </Layout>
  );
};

export default App;
