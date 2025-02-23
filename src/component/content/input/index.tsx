import React, { useState } from "react";
import { Input, Space, Button, notification } from "antd";
import packager from "../../../packager";
const InputComponent: React.FC = () => {
  const [inputStatus, setInputStatus] = useState<undefined | "error">(
    undefined
  );
  const [api, contextHolder] = notification.useNotification();
  const [inputValue, setInputValue] = useState(
    "https://www.ccw.site/detail/64bbb6bd81ac7071c2a54be8"
  );
  const [loading, setLoading] = useState(false);
  return (
    <>
      {contextHolder}
      <Space direction="vertical">
        <div style={{ fontSize: "16px" }}>CCW 作品网址：</div>
        <Input
          addonBefore="https://www.ccw.site/detail/"
          defaultValue="64bbb6bd81ac7071c2a54be8"
          onChange={(e) => {
            if (inputStatus === "error" && e.target.value.length > 0) {
              setInputStatus(undefined);
            }
            setInputValue(e.target.value);
          }}
          style={{ width: "100vh" }}
          status={inputStatus}
          allowClear
        />
      </Space>
      <br />
      <br />
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        onClick={async () => {
          try {
            if (inputValue.length === 0) {
              setInputStatus("error");
              api.error({
                message: "错误",
                description: "请输入作品ID或URL",
              });
              return;
            }

            setLoading(true);
            const html = await packager(inputValue);

            const blob = new Blob([html], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "index.html";
            a.click();
            URL.revokeObjectURL(url);

            api.success({
              message: "成功",
              description: "打包成功！",
            });
          } catch (error) {
            api.error({
              message: "错误",
              description: error instanceof Error ? error.message : "打包失败",
            });
          } finally {
            setLoading(false);
          }
        }}
      >
        打包
      </Button>
    </>
  );
};

export default InputComponent;
