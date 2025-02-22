const script = `
  const project = document.getElementById("project");
  if (!project) return; // 添加空值检查
  const projectContent = (project as HTMLIFrameElement).contentWindow?.document; // 类型断言为 iframe 元素
  if (!projectContent) return; // 添加空值检查

  const TARGET_CLASS = "main-module_fullscreen-button_9f565";

  // 先立即尝试获取已有元素（防止按钮已存在）
  const initialButton = document.querySelector(TARGET_CLASS);
  if (initialButton) {
    bindClickListener(initialButton as HTMLElement);
  }

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
          TARGET_CLASS
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


  function handleButtonClick(event: Event) {
    console.log("chick full screen button", event.target);
    
    {
      (">");
    }
  }
`;
const packager = async (url: string) => {
  const _oid = new URL(url);
  const oid = _oid.toString().split("detail/")[1]; // 修正这里，获取正确的 oid
  const realURL = `https://www.ccw.site/player/${oid}`;
  const html = `
    <html>
      <head>
        <meta charSet="utf-8"></meta>
        <title>Gandi 工程</title>
        <script>${script}</script>
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
