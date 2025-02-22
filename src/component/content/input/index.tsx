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
          if (inputValue.length === 0) {
            setInputStatus("error");
          }
          setLoading(true);
          const html = await packager(inputValue);
          console.log("Packager output:", html); // 检查输出

          // 确保 html 是字符串
          const htmlString = html; // 由于 packager 现在返回字符串，这里不需要再转换

          const blob = new Blob([htmlString], { type: "text/html" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "index.html";
          a.click();
          URL.revokeObjectURL(url);
          setLoading(false);
        }}
      >
        打包
      </Button>
    </>
  );
};

export default InputComponent;
