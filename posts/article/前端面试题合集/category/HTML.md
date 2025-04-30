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

## HTML5有哪些新特性？

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

## HTML语义化的理解

HTML语义化是指使用恰当的标签来准确描述内容的结构和含义，而不仅仅依赖div和span。比如用`<header>`、`<nav>`、`<article>`等标签，能让代码更易读，提升SEO效果，同时增强无障碍访问性，让屏幕阅读器等辅助技术更好地解析页面内容。语义化标签也让代码维护更高效，团队协作更顺畅。

## 块元素和行内元素有什么区别？

块元素（如`div`、`p`）独占一行，默认宽度撑满父容器，可设宽高和边距；

行内元素（如`span`、`a`）不换行，宽度由内容撑开，设置宽高无效，边距仅水平生效。行内块（如`img`、`button`）则兼具特性，可设宽高且同行排列。

## meta viewport 是做什么用的，怎么写？

`meta viewport` 用于控制移动端视口的尺寸和缩放行为，确保页面适配不同设备。常用写法：

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

通过 `width=device-width` 让页面宽度等于设备宽度，`user-scalable=no,`不允许用户进行缩放`initial-scale=1.0` 设置初始缩放比例为1，防止自动缩放，` maximum-scale=1.0, minimum-scale=1.0"`允许用户的最大/小缩放值

## src和href的区别是什么？

`src`（源）用于**嵌入资源**到当前文档（如`<img>`、`<script>`），加载时会阻塞页面解析；`href`（超链接）用于**关联资源**（如`<a>`、`<link>`），建立文档与资源的引用关系，通常异步加载，不影响页面渲染流程。例如：`<img src="image.jpg">`直接嵌入图片，而`<a href="page.html">`仅指向目标链接。

## HTML中 data- 属性是做什么的？ 

`data-` 属性用于在 HTML 元素中存储自定义数据，供 JavaScript 或 CSS 访问。例如 `data-id="123"`，可通过 `element.dataset.id` 读取，实现数据与结构的解耦，增强可维护性，同时避免滥用非标准属性。

## HTML5的离线存储怎么使用，工作原理能不能解释一下？

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

##  iframe有那些优缺点

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

## img的srcset属性的作⽤

`srcset` 用于根据设备像素比或视口宽度提供不同分辨率的图片，让浏览器自动选择最合适的加载。例如：

```html
<img src="default.jpg"  
     srcset="small.jpg 320w, medium.jpg 640w, large.jpg 1024w"  
     sizes="(max-width: 600px) 100vw, 50vw">  
```

通过 `w`（宽度描述符）和 `x`（像素密度描述符），结合 `sizes` 定义的布局尺寸，优化加载性能与显示效果。

## HTML Web Components是什么？它们包括哪些技术？

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

## 使用input标签上传图片时，怎样触发默认拍照功能？

## 如何禁止input展示输入的历史记录？

## canvas在标签上设置宽高，与在style中设置宽高有什么区别？

canvas标签的width和height是画布实际宽度和高度，绘制的图形都是在这个上面。

而style的width和height是canvas在浏览器中被渲染的高度和宽度。

如果canvas的width和height没指定或值不正确，就被设置成默认值。
