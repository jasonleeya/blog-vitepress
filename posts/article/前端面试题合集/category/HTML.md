---
category: HTML
order: 2
---
<script setup>
import NavHead from "../components/NavHead.vue";
</script>
<nav-head link="/posts/article/前端面试题合集/read.html">
</nav-head>

# HTML

## \<!DOCTYPE html> 标签有什么用？

DOCTYPE是HTML5中一种标准通用标记语言的文档类型声明，它的目的是告诉浏览器（解析器）应该以什么样（html或xhtml）的文档类型定义来解析文档，不同的渲染模式会影响浏览器对 CSS 代码甚⾄ JavaScript 脚本的解析。

## HTML5 有哪些新特性？

1. **语义化标签**：
   - `<header>`, `<footer>`, `<nav>`, `<article>` 等，替代无意义的 `<div>`，提升代码可读性和 SEO。
2. **多媒体支持**：
   - 原生嵌入音视频：`<video>` 和 `<audio>` 标签，告别 Flash。
3. **表单增强**：
   - 新输入类型：`email`、`date`、`number`、`range` 等；
   - 属性：`placeholder`（占位符）、`required`（必填）、`autofocus`（自动聚焦）。
4. **本地存储**：
   - `localStorage` 和 `sessionStorage`，存储容量更大（约5MB），无需依赖 Cookie。
5. **图形与动画**：
   - `<canvas>` 标签：配合 JavaScript 绘制 2D/3D 图形（如图表、游戏）。
6. **通信与性能**：
   - **WebSocket**：实现客户端与服务器实时双向通信（如聊天室）；
   - **Web Workers**：后台运行脚本，避免主线程卡顿。
7. **设备交互**：
   - **Geolocation API**：获取用户地理位置；
   - **拖放 API**：支持元素拖拽操作（如上传文件）。
8. **离线应用**：
   - 通过 `manifest` 文件缓存资源，支持离线访问网页。

## HTML 语义化的理解

HTML语义化是指使用恰当的标签来准确描述内容的结构和含义，而不仅仅依赖div和span。比如用`<header>`、`<nav>`、`<article>`等标签，能让代码更易读，提升SEO效果，同时增强无障碍访问性，让屏幕阅读器等辅助技术更好地解析页面内容。语义化标签也让代码维护更高效，团队协作更顺畅。

## 块元素和行内元素有什么区别？

块元素（如`div`、`p`）独占一行，默认宽度撑满父容器，可设宽高和边距；

行内元素（如`span`、`a`）不换行，宽度由内容撑开，设置宽高无效，边距仅水平生效。行内块（如`img`、`button`）则兼具特性，可设宽高且同行排列。



## HTML 中的 meta 标签有哪些常见用途？

Meta 标签用于定义页面的**元信息**，控制SEO、视口适配、缓存策略等，是HTML文档的关键配置项。  

1. **编码声明**：`<meta charset="UTF-8">` 定义文档字符集；  
2. **视口适配**：`<meta name="viewport" content="width=device-width, initial-scale=1.0">` 移动端自适应；  
3. **SEO优化**：  
   - `description`：页面描述，影响搜索结果摘要；  
   - `keywords`：关键词（已弱化，部分搜索引擎忽略）；  
4. **HTTP控制**：  
   - `refresh`：自动刷新/跳转（如 `<meta http-equiv="refresh" content="5;url=新地址">`）；  
   - `X-UA-Compatible`：指定IE渲染模式（如强制使用最新内核）；  
5. **社交媒体预览**：`og:title`、`og:image` 等定义链接分享时的标题、图片；  
6. **禁止行为**：  
   - `robots`：控制搜索引擎爬取（如 `noindex` 禁止收录）；  
   - `referrer`：管理请求来源策略；  
7. **移动端扩展**：如 `apple-mobile-web-app-capable` 禁用iOS默认工具栏。

## meta viewport 是做什么用的，怎么写？

`meta viewport` 用于控制移动端视口的尺寸和缩放行为，确保页面适配不同设备。常用写法：

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

通过 `width=device-width` 让页面宽度等于设备宽度，`user-scalable=no,`不允许用户进行缩放`initial-scale=1.0` 设置初始缩放比例为1，防止自动缩放，` maximum-scale=1.0, minimum-scale=1.0"`允许用户的最大/小缩放值

## src 和 href 的区别是什么？

`src`（源）用于**嵌入资源**到当前文档（如`<img>`、`<script>`），加载时会阻塞页面解析；`href`（超链接）用于**关联资源**（如`<a>`、`<link>`），建立文档与资源的引用关系，通常异步加载，不影响页面渲染流程。例如：`<img src="image.jpg">`直接嵌入图片，而`<a href="page.html">`仅指向目标链接。

## HTML 中 data- 属性是做什么的？ 

`data-` 属性用于在 HTML 元素中存储自定义数据，供 JavaScript 或 CSS 访问。例如 `data-id="123"`，可通过 `element.dataset.id` 读取，实现数据与结构的解耦，增强可维护性，同时避免滥用非标准属性。

## 简述 label 标签的作用

Label 标签用于**关联表单控件与其描述文本**，提升用户体验与可访问性，支持点击触发控件焦点。  

1. **语义关联**：  
   - 通过 `for` 属性绑定表单元素的 `id`，明确描述与控件的对应关系。  
   ```html  
   <label for="username">用户名</label>  
   <input type="text" id="username">  
   ```

2. **扩大交互区域**：  
   - 点击 Label 文本即可触发关联控件（如单选/复选框、输入框聚焦），提升操作便捷性。  

3. **提升可访问性**：  
   - 辅助工具（如屏幕阅读器）通过 Label 文本解释控件用途，确保视障用户理解表单。  

4. **隐式包裹**（无需 `for`）：  
   ```html  
   <label>  
     用户名：  
     <input type="text">  
   </label>  
   ```

**注意事项**：  
- **唯一性**：一个 Label 只对应一个控件，避免歧义；  
- **兼容性**：所有主流浏览器均支持，是 W3C 标准的无障碍实践。  

**示例场景**：  
- 表单字段说明（输入框、选择框）；  
- 单选/复选框的点击区域扩展。

## 如何在 HTML 中添加音频和视频？

通过 `<audio>` 和 `<video>` 标签嵌入音视频，结合多格式源文件和属性控制播放行为，确保跨浏览器兼容性。

**音频嵌入（`<audio>`）**

```html
<audio controls src="audio.mp3">  
  您的浏览器不支持音频播放，请升级或更换浏览器。  
  <!-- 备选格式 -->  
  <source src="audio.ogg" type="audio/ogg">  
</audio>  **视频嵌入（`<video>`）**
```

```html
<video  
  controls  
  width="600"  
  poster="thumbnail.jpg"  
  src="video.mp4"  
>  
  <!-- 多格式兼容 -->  
  <source src="video.webm" type="video/webm">  
  <track src="subtitles.vtt" kind="subtitles" label="中文字幕" srclang="zh">  
  您的浏览器不支持视频播放。  
</video>  
```



## HTML5 的离线存储怎么使用，工作原理能不能解释一下？

HTML5 离线存储通过 **`manifest` 文件**（已废弃）或 **Service Worker** 实现资源缓存，使页面离线可用。

1. **传统方式（Application Cache）**：

   ```html
   <html manifest="app.manifest">
   ```

   `app.manifest` 列出需缓存的资源，浏览器下载后离线加载。

2. **现代方案（Service Worker）**：
   通过 JavaScript 注册 Service Worker，拦截请求并缓存资源到 `Cache API`，实现精细控制。

**原理**：首次访问缓存资源，后续优先从本地加载，同时检测更新。Service Worker 支持动态缓存和离线请求处理，更灵活可靠。

[通过 Service workers 让 PWA 离线工作](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers)

##  iframe 有那些优缺点

**优点**：

- 隔离性：内容/样式/脚本独立（如嵌入第三方页面、微前端）。
- 异步加载：提升页面性能（延迟加载非关键内容）。

**缺点**：

- **SEO差**：内容不易被搜索引擎抓取；
- **性能开销**：每个 iframe 是独立文档，增加内存消耗；
- **跨域限制**：父子页面通信需 `postMessage`，操作受限；
- **适配问题**：移动端滚动/布局易出 Bug（如高度自适应）。

## FOUC（无样式内容闪烁）？你如何来避免 FOUC？

FOUC 是页面加载时短暂出现无样式内容的现象，因 CSS 延迟加载导致。**避免方法**：

1. 将 CSS 通过 `<link>` 放在 `<head>` 中优先加载；
2. 内联关键 CSS（如首屏样式）；
3. 避免使用 `@import` 引入 CSS；
4. 非关键 CSS 异步加载（如 `media="print"` 或 `preload` 预加载）。

## img 的 srcset 属性的作⽤

`srcset` 用于根据设备像素比或视口宽度提供不同分辨率的图片，让浏览器自动选择最合适的加载。例如：

```html
<img src="default.jpg"  
     srcset="small.jpg 320w, medium.jpg 640w, large.jpg 1024w"  
     sizes="(max-width: 600px) 100vw, 50vw">  
```

通过 `w`（宽度描述符）和 `x`（像素密度描述符），结合 `sizes` 定义的布局尺寸，优化加载性能与显示效果。

## HTML Web Components 是什么？它们包括哪些技术？

Web Components 是一组 Web 平台 API，允许开发者创建封装性强、可重用的组件，这些组件可以在任何 Web 应用程序中使用。Web Components 主要包括以下四个核心技术：

**1. 自定义元素（Custom Elements）**

允许开发者定义新的 HTML 元素及其行为。这些自定义元素可以像内置元素一样被使用，并且支持生命周期回调函数。

**2. 模板（Templates）**

`<template>` 元素用于定义可以重复使用的 HTML 结构。模板中的内容在被使用时才会被实例化和插入到 DOM 中，从而提高性能和重用性。

**3. Shadow DOM**

允许将组件的内部结构和样式封装在一个独立的 DOM 子树中，这样可以避免样式和脚本的冲突。Shadow DOM 使组件可以有自己的封闭样式和结构。

**4. HTML Imports（已废弃）**

HTML Imports 曾用于引入和使用 HTML 文档的片段，但该技术已被废弃，现代 Web 组件技术通常通过模块化 JavaScript 或 ES6 模块来替代。

**Web Components 的优势**

- **封装性**：通过 Shadow DOM 隔离组件的样式和结构，避免全局样式和脚本的干扰。
- **重用性**：自定义元素可以被多次重用，促进代码的模块化和组织。
- **标准化**：作为 Web 标准的一部分，Web Components 与各种 JavaScript 框架和库兼容，能够在不同的环境中使用。

**使用示例**

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Web Components Example</title>
    <script>
        class MyElement extends HTMLElement {
            constructor() {
                super();
                const shadow = this.attachShadow({ mode: 'open' });
                shadow.innerHTML = `<style>p { color: red; }</style><p>Hello, Web Components!</p>`;
            }
        }
        customElements.define('my-element', MyElement);
    </script>
</head>
<body>
    <my-element></my-element>
</body>
</html>
```

在上面的示例中，我们定义了一个自定义元素 `<my-element>`，它具有一个 Shadow DOM 和一些样式。这个元素可以被插入到任何 HTML 文档中，并且它的样式和结构是封闭的，不会受到外部样式的影响。

[Web Components 入门实例教程](https://www.ruanyifeng.com/blog/2019/08/web_components.html)

## 如何解决浏览器乱码问题？

- 统一编码声明（HTML、服务器、文件存储均用UTF-8）；
- 检查HTTP头 `Content-Type: text/html; charset=utf-8`；
- 使用编码转换工具修正文件格式。

## 如何通过 HTML 优化页面加载速度？

1. **资源懒加载**：图片/iframe 添加 `loading="lazy"`，延迟非关键内容加载；
2. **异步脚本**：使用 `async/defer` 避免阻塞 DOM 解析；
3. **预加载关键资源**：`<link rel="preload">` 提前加载字体、CSS 等；
4. **精简 HTML**：减少 DOM 层级，压缩代码（移除空格/注释）；
5. **响应式图片**：`srcset` + `sizes` 按需适配分辨率，降低资源体积。

## 浏览器是怎么解析 HTML 文档的？

浏览器解析 HTML 文档是一个多阶段协作的过程，目的是将 HTML、CSS 和 JavaScript 转换为用户可见的页面。以下是核心步骤和关键细节：

**1. 网络请求与字节流处理**

- **输入**：浏览器从服务器获取 HTML 文件的**字节流**（Bytes）。
- **解码**：根据文件编码（如 UTF-8）将字节流转换为**字符流**（Characters）。
- **预解析优化**：通过**预加载扫描器**（Preload Scanner）提前发现关键资源（如 CSS、JS、图片），并发起并行下载，减少等待时间。

**2. 构建 DOM 树**

- **词法分析**：将字符流转换为**标签**（Tokens），如 `<div>`、`</div>`。
- **语法分析**：根据 HTML 语法规则，将标签转换为**节点**（Nodes），形成**DOM 树**。
  - **容错机制**：自动修复不规范的标签（例如未闭合的 `<p>` 标签）。
  - **阻塞问题**：遇到 `<script>` 标签（无 `async/defer`）会**暂停解析**，下载并执行脚本后再继续（因 JS 可能修改 DOM）。

**3. 构建 CSSOM 树**

- **解析 CSS**：将 `<style>` 标签和外部 CSS 文件解析为 **CSSOM 树**（层级样式结构）。
  - **阻塞渲染**：CSS 不会阻塞 DOM 构建，但会阻塞**渲染树生成**（避免未样式化的内容闪现）。
  - **层叠规则**：处理选择器优先级（如 `!important`、内联样式）。

**4. 生成渲染树（Render Tree）**

- **合并 DOM 和 CSSOM**：将可见节点（如排除 `display: none` 的元素）与样式结合，生成渲染树。
- **计算样式**：确定每个节点的最终样式（如继承的字体大小、颜色）。

**5. 布局（Layout/Reflow）**

- **计算几何信息**：根据渲染树计算每个节点的**位置和尺寸**（如 `width`、`height`、`margin`）。
  - **视口**：基于视口大小（Viewport）进行布局。
  - **回流触发**：修改几何属性（如窗口缩放、元素尺寸变化）会触发重新布局。

**6. 绘制（Painting）**

- **生成绘制指令**：将布局结果转换为屏幕上的像素（如填充颜色、绘制边框）。
  - **分层与合成**：复杂页面会分层绘制（如使用 `will-change` 的元素），通过合成器（Compositor）合并层提升性能。
  - **重绘优化**：仅修改颜色等不影响布局的属性时，跳过布局阶段，直接重绘。

**关键优化机制**

- **异步脚本**：`async`（下载后立即执行）和 `defer`（DOM 解析完成后执行）避免阻塞。
- **关键渲染路径优化**：优先加载首屏所需资源，内联关键 CSS。
- **GPU 加速**：对动画使用 `transform` 和 `opacity`，触发 GPU 合成，避免重排重绘。

**扩展：浏览器多进程架构**

以 Chrome 为例：
- **渲染进程**：负责解析 HTML/CSS、执行 JS、生成渲染树（每个标签页独立进程，避免崩溃影响全局）。
- **浏览器进程**：管理用户界面、网络请求等。
- **GPU 进程**：处理图形渲染和合成。



**总结**：浏览器通过解析、样式计算、布局和绘制，将代码转换为可视化页面。理解这一过程有助于优化性能（如减少重排、懒加载非关键资源），是前端开发的核心知识。

## 使用 input 标签上传图片时，怎样触发默认拍照功能？

要在使用 `<input>` 标签上传图片时触发设备的默认拍照功能，可以通过以下方法实现：

**核心代码**

```html
<input 
  type="file" 
  accept="image/*" 
  capture="environment"  <!-- 或 capture="user" -->
>
```

**关键属性解析**

1. **`type="file"`**  
   声明这是一个文件上传输入框。

2. **`accept="image/*"`**  
   限制用户只能选择图片类型的文件（如 `image/jpeg`、`image/png`）。

3. **`capture` 属性**  
   - **`capture="environment"`**  
     调用设备**后置摄像头**（默认行为，适合拍摄实物、扫码等场景）。  
   - **`capture="user"`**  
     调用设备**前置摄像头**（适合自拍场景）。  
   - **仅写 `capture`（不赋值）**  
     由浏览器决定默认摄像头（通常为后置）。

**兼容性与注意事项**

1. **移动端支持**  
   - 在 **iOS Safari**、**Android Chrome** 等主流移动浏览器中生效。  
   - 用户点击后会直接打开摄像头拍照，而非文件选择器。

2. **桌面端行为**  
   - 桌面浏览器会忽略 `capture` 属性，仍显示文件选择对话框。  
   - 若需强制调用桌面摄像头，需结合 **WebRTC API**（如 `getUserMedia`）。

3. **用户授权**  
   - 首次访问时会弹出摄像头权限请求，需用户手动允许。  
   - 若用户拒绝授权，需通过 JavaScript 监听错误并引导用户重新授权。

4. **安全性限制**  
   - 必须通过 **HTTPS** 协议访问页面（本地 `localhost` 除外），否则无法调用摄像头。

**完整示例（含错误处理）**

```html
<input type="file" accept="image/*" capture="environment" id="camera-input">

<script>
document.getElementById('camera-input').addEventListener('error', (e) => {
  const error = e.target.error;
  if (error.code === error.NOT_SUPPORTED_ERR) {
    alert('浏览器不支持直接拍照，请从相册选择图片。');
  } else if (error.code === error.PERMISSION_DENIED_ERR) {
    alert('请允许使用摄像头权限！');
  }
});
</script>
```

**替代方案：纯 JavaScript 调用摄像头**

如果需更复杂的控制（如实时预览），可使用 **WebRTC**：
```html
<video id="preview" width="300"></video>
<button onclick="takePhoto()">拍照</button>

<script>
let stream;

// 打开摄像头
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then(s => {
    stream = s;
    document.getElementById('preview').srcObject = s;
  })
  .catch(err => console.error('摄像头访问失败：', err));

// 拍照
function takePhoto() {
  const canvas = document.createElement('canvas');
  const video = document.getElementById('preview');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  const image = canvas.toDataURL('image/jpeg');
  // 将 image 上传到服务器
}
</script>
```

**总结**

- **优先方案**：使用 `<input>` 的 `capture` 属性，简单快捷。  
- **高级需求**：结合 WebRTC 实现实时预览和多控制。  
- **兼容性兜底**：始终提供从相册选择的备选路径。

## 如何禁止 input 展示输入的历史记录？

**回答：**

要禁止浏览器在 `<input>` 输入框中展示历史记录（如自动补全建议），可以通过以下方法实现：

**1. 使用 `autocomplete` 属性**

在 `<input>` 标签中设置 `autocomplete="off"`，这是 HTML 标准推荐的方式：
```html
<input type="text" autocomplete="off">**注意事项：**
```

- **兼容性**：现代主流浏览器（Chrome、Firefox、Edge）支持此属性，但部分场景（如密码输入）可能仍会展示保存的凭据。
- **作用范围**：
  - 若需禁用整个表单的自动填充，可在 `<form>` 标签中设置：
    ```html
    <form autocomplete="off">
      <input type="text">
      <input type="password">
    </form>
    ```
  - 针对特定字段（如密码输入），使用更明确的属性值：
    ```html
    <input type="password" autocomplete="new-password">
    ```

**2. 动态生成输入框（绕过浏览器缓存）**

通过 JavaScript 动态创建 `<input>` 元素，避免浏览器识别并关联历史记录：
```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('autocomplete', 'off');
    document.querySelector('.container').appendChild(input);
  });
</script>
<div class="container"></div>
```

**3. 修改输入框属性名称**

通过随机化 `name` 或 `id` 属性，防止浏览器匹配历史数据：
```html
<input type="text" name="random_123" autocomplete="off">
```

**4. 强制清空输入值（辅助手段）**

在页面加载时或表单提交后，通过 JavaScript 清除输入框内容：
```html
<input type="text" id="no-history-input">

<script>
  window.onload = () => {
    document.getElementById('no-history-input').value = '';
  };
</script>
```

**5. 隐藏输入框的浏览器特性**

添加 `readonly` 属性并在用户点击时移除，间接禁用自动填充：
```html
<input 
  type="text" 
  readonly 
  onfocus="this.removeAttribute('readonly')"
  autocomplete="off"
>
```

**总结**

| **方法**             | **适用场景**         | **优点**         | **缺点**                   |
| -------------------- | -------------------- | ---------------- | -------------------------- |
| `autocomplete="off"` | 通用场景             | 简单、标准化     | 部分浏览器对密码字段不生效 |
| 动态生成输入框       | 需绕过浏览器缓存     | 彻底禁用历史记录 | 代码复杂度稍高             |
| 修改属性名称         | 防止特定字段被关联   | 灵活可控         | 需维护随机命名逻辑         |
| 强制清空值           | 辅助其他方法使用     | 即时生效         | 无法完全阻止历史记录展示   |
| `readonly` 属性      | 需用户主动交互后输入 | 避免初始自动填充 | 可能影响用户体验           |

**额外建议**

- **密码字段专用**：对密码输入框使用 `autocomplete="new-password"`，明确告知浏览器不填充旧密码。
- **移动端适配**：部分移动端浏览器可能忽略 `autocomplete`，需结合动态生成输入框或原生开发控制。
- **安全协议**：确保页面通过 HTTPS 部署，避免浏览器因安全限制忽略某些属性。

通过上述方法，可有效禁止浏览器展示输入历史记录，同时兼顾兼容性和用户体验。

## canvas 在标签上设置宽高，与在 style 中设置宽高有什么区别？

canvas标签的width和height是画布实际宽度和高度，绘制的图形都是在这个上面。

而style的width和height是canvas在浏览器中被渲染的高度和宽度。

如果canvas的width和height没指定或值不正确，就被设置成默认值。

## 浏览器是怎么解析 HTML 文档的？

浏览器解析 HTML 文档的过程是一个复杂的过程，涉及多个阶段，主要分为以下几个步骤：

1. **接收 HTML 文件**

   - 浏览器通过发送 HTTP 请求获取服务器返回的 HTML 文件。该文件可能会包含外部资源（如 CSS、JavaScript、图片等），浏览器会逐步处理这些内容。

2. **构建 DOM 树**

   - **词法分析（Tokenization）**：浏览器开始解析 HTML 文档时，将 HTML 源代码拆分为一系列的“标记”或“词法单元”（tokens）。这些标记对应 HTML 标签、属性和文本。
   - **构建 DOM 树（Document Object Model）**：浏览器根据这些标记构建一个 DOM 树。DOM 树的每个节点代表 HTML 文档的一个元素（如 `<div>`、`<p>`）或文本内容，形成一个层次结构。
   - **节点顺序**：解析 HTML 文档时，浏览器会根据标签的嵌套关系将它们组织成树状结构。例如，`<html>` 元素是根节点，`<head>` 和 `<body>` 是其子节点，等等。

3. **解析 CSS（样式处理）**

   - 在构建 DOM 树的同时，浏览器会遇到 `<style>` 标签或者外部 CSS 文件的链接（如 `<link rel="stylesheet">`），浏览器会下载并解析这些 CSS 规则。
   - 浏览器将 CSS 规则应用到相应的 DOM 节点，生成 **CSSOM 树**（CSS Object Model），它表示页面上所有样式的结构。
   - 通过将 DOM 树和 CSSOM 树结合，生成 **渲染树**（Render Tree），它包含了页面中所有可见元素的样式信息。

4. **生成渲染树**

   - 渲染树由 DOM 树和 CSSOM 树组合而成，包含了页面中所有需要呈现的元素以及它们的样式信息。
   - 渲染树不包括像 `<head>` 标签或隐藏元素（例如 `display: none` 的元素），只有可见的元素和它们的样式才会被包含在内。
   - 例如，一个 `<div>` 元素的渲染树节点会包含该 `div` 的位置、大小、颜色等样式信息。

5. **布局（Layout / Reflow）**

   - **布局阶段**：浏览器通过渲染树来确定每个元素的准确位置和大小。浏览器计算每个元素的几何位置，得到每个元素在页面上的精确位置。
   - 如果布局发生了改变（例如窗口尺寸变化，或者某个元素的尺寸改变），浏览器需要重新计算布局，这个过程叫做 **重排（Reflow）**。

6. **绘制（Paint）**

   - **绘制阶段**：浏览器会将布局好的元素按照样式规则渲染到屏幕上，绘制每个元素的颜色、边框、阴影等外观。这个过程称为 **绘制（Paint）**。
   - 例如，浏览器会绘制元素的背景色、文本、边框等，生成最终的页面显示内容。

7. **合成层（Composite）**

   - 在绘制完成后，浏览器可能会将渲染的内容分为多个层。某些元素（如动画、滚动条、固定定位的元素等）可能需要单独的图层。
   - **合成阶段**：浏览器将这些层合成，最终生成显示在屏幕上的完整页面。

8. **执行 JavaScript**

   - 如果页面中有 JavaScript 代码，浏览器会在文档解析过程中执行它。JavaScript 代码通常会在 HTML 中的 `<script>` 标签内被嵌入或通过外部文件引入。
   - **影响**：JavaScript 可能会修改 DOM 或 CSSOM，导致重新计算布局（Reflow）或重新绘制（Repaint）。因此，JavaScript 执行的时机和顺序可能会影响页面的渲染性能。

9. **事件监听与交互**

   - 一旦页面的初始渲染完成，用户可以与页面进行交互。浏览器会监听用户的输入、鼠标点击、键盘事件等，并相应地触发 JavaScript 代码进行处理。

## style 标签写在 body 后与 body 前有什么区别？

## 什么是 HTML 文档的预解析？

## 渐进式 jpg 有了解过吗？

## a 标签 rel=“noopener noreferrer” 是什么意思？

