const script = () => {
  const project = document.getElementById("project");
  if (!project) return; // 添加空值检查
  const projectContent = (project as HTMLIFrameElement).contentWindow?.document; // 类型断言为 iframe 元素
  if (!projectContent) return; // 添加空值检查
  // 定义目标按钮的类名（注意转义特殊字符）
  const TARGET_CLASS = "main-module_fullscreen-button_9f565";

  // 先立即尝试获取已有元素（防止按钮已存在）
  const initialButton = document.querySelector(`.${TARGET_CLASS}`);
  if (initialButton) {
    bindClickListener(initialButton as HTMLElement);
  }

  // 创建观察器监听后续动态添加
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        // 检查新增节点本身是否是按钮
        if (
          node instanceof HTMLElement &&
          node.classList.contains(TARGET_CLASS)
        ) {
          bindClickListener(node);
          observer.disconnect(); // 找到后停止观察
          return;
        }

        // 检查新增节点的子元素中是否存在按钮
        const targetElement = (node as HTMLElement).querySelector?.(
          `.${TARGET_CLASS}`
        );
        if (targetElement) {
          const btn = projectContent.getElementsByClassName(
            "main-module_fullscreen-button_9f565"
          )[0];

          // 添加全屏状态变化监听
          const fullscreenHandler = () => {
            if (projectContent.fullscreenElement) {
              // 检测到进入全屏后执行
              projectContent.exitFullscreen();
              // 移除监听避免重复执行
              projectContent.removeEventListener(
                "fullscreenchange",
                fullscreenHandler
              );
            }
          };

          projectContent.addEventListener(
            "fullscreenchange",
            fullscreenHandler
          );

          // 使用 HTMLElement 类型断言来解决 click 方法不存在的问题
          (btn as HTMLElement).click(); // 在监听器绑定后再执行点击操作
          observer.disconnect(); // 找到后停止观察
          return;
        }
      }
    }
  });

  // 开始观察文档变化
  observer.observe(document.body, {
    childList: true, // 观察直接子节点
    subtree: true, // 观察所有后代节点
  });

  // 事件绑定函数（使用类型断言）
  function bindClickListener(element: HTMLElement) {
    element.addEventListener("click", handleButtonClick);
  }

  // 点击事件处理函数（示例）
  function handleButtonClick(event: Event) {
    console.log("全屏按钮被点击", event.target);
    // 这里添加你的点击处理逻辑
    {
      (">");
    }
  }
};
// 这个函数用于，将输入的url的内容爬虫下来，并生成html
const packager = async (url: string) => {
  let _oid = new URL(url);
  let oid = _oid.toString().split("detail/")[1]; // 修正这里，获取正确的 oid
  let realURL = `https://www.ccw.site/player/${oid}`;
  let html = `
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Gandi 工程</title>
        <script>${script()}</script>
      </head>
      <body>
        <iframe
          src="${realURL}"
          sandbox="allow-scripts allow-same-origin"
          className="skydog-packager project"
          id="project"
          width="100%"
          height="100%"
        ></iframe>
      </body>
    </html>
  `;
  return html;
};

export default packager;
