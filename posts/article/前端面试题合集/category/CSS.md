---
category: CSS
order: 3
---
<script setup>
import NavHead from "../components/NavHead.vue";
</script>
<nav-head link="/posts/article/前端面试题合集/read.html">
</nav-head>

# CSS


## CSS3有哪些新特性


1. **弹性布局**（Flexbox）与**网格布局**（Grid）；
2. **过渡动画**（`transition`/`animation`）；
3. **样式增强**：圆角（`border-radius`）、阴影（`box-shadow/text-shadow`）、渐变（`gradient`）；
4. **响应式设计**：媒体查询（`@media`）；
5. **变形与滤镜**：`transform`（旋转/缩放）、`filter`（模糊/透明度）；
6. **自定义字体**（`@font-face`）和**多列布局**（`columns`）。
7. **选择器的扩展**:属性选择器：`[attr^="val"]`（开头匹配）、`[attr$="val"]`（结尾匹配）；**结构伪类**：`:nth-child(n)`、`:nth-of-type(n)`、`:empty`（无子元素）；UI状态伪类：`:enabled`、`:disabled`、`:checked`；否定伪类：`:not(selector)` 排除元素；伪元素语法：`::before`、`::after`（推荐双冒号，区分伪类）。

## 介绍⼀下标准的CSS的盒⼦模型？

标准 CSS 盒模型由 **内容区（content）**、**内边距（padding）**、**边框（border）** 和 **外边距（margin）** 组成。

- **核心规则**：
  默认 `box-sizing: content-box`，元素的 `width/height` 仅定义内容区尺寸，总宽度为：
  **总宽度 = width + padding + border**（外边距 `margin` 影响布局但不计入元素自身尺寸）。
- **对比 IE 模型**：
  通过 `box-sizing: border-box` 切换为 IE 模型，此时 `width/height` 包含内容、内边距和边框。

## 描述块格式化上下文 (BFC) 及其工作原理

BFC（块格式化上下文）是页面渲染的一块独立区域，内部元素布局不影响外部。它通过特定条件触发（如 `overflow: hidden`、`float`、`display: flex` 等），主要解决外边距重叠、浮动元素高度塌陷，以及阻止元素被浮动覆盖。BFC内元素垂直排列，且区域边界会包裹内部浮动内容，避免布局干扰。

## 为什么要初始化CSS样式？

初始化 CSS 主要是为了**消除浏览器默认样式的差异**，统一元素基础表现。不同浏览器对标签（如 `body` 的边距、`ul` 的列表符号）的默认样式不同，直接开发会导致布局错乱或冗余覆盖。通过重置（如 `margin: 0; padding: 0`）或标准化（如 Normalize.css），确保跨浏览器一致性，减少调试成本，提升开发效率。

## 简述CSS选择器有哪些?

1. **元素选择器**：这是最基础的选择器，它根据HTML元素的类型进行选择。例如，`h1 { color: blue; }`会将所有的h1元素的文字颜色设置为蓝色。
2. **ID选择器**：通过元素的id属性进行选择，id选择器在CSS中具有很高的优先级。例如，`#myId { color: blue; }`会将id为myId的元素的文字颜色设置为蓝色。
3. **类选择器**：通过元素的class属性进行选择。例如，`.myClass { color: blue; }`会将class为myClass的所有元素的文字颜色设置为蓝色。
4. **属性选择器**：通过元素的属性进行选择。例如，`[href] { color: blue; }`会将所有含有href属性的元素的文字颜色设置为蓝色。
5. **后代选择器**：选中某元素的后代元素。例如，`div p { color: blue; }`会将所有在div元素内部的p元素的文字颜色设置为蓝色。
6. **子元素选择器**：选中某元素的直接子元素。例如，`div > p { color: blue; }`会将所有直接在div元素下一级的p元素的文字颜色设置为蓝色。
7. **相邻兄弟选择器**：选中某元素的下一个兄弟元素。例如，`h1 + p { color: blue; }`会将所有紧跟在h1元素后面的p元素的文字颜色设置为蓝色。
8. **通用选择器**：选中所有元素。例如，`* { color: blue; }`会将所有元素的文字颜色设置为蓝色。

此外，CSS3还引入了一些新的选择器，如：

- **结构伪类选择器**：例如`:first-child`、`:last-child`、`:nth-child()`等，用来选择特定位置的元素。
- **否定伪类选择器**：例如`:not()`，用来选择除某些元素以外的元素。
- **伪元素选择器**：例如`::before`、`::after`，用来选择元素的一部分，或者在元素前后插入内容。

## CSS样式的优先级（选择器的权重）是如何的?

1. **!important** > **内联样式** > **ID 选择器** > **类/伪类/属性** > **元素/伪元素** > **通配符/继承**；

## 什么是CSS文档流？

CSS 文档流是元素默认的布局方式：**块级元素**从上到下垂直排列，**行内元素**从左到右水平排列，占据内容自然空间。脱离文档流的方式包括 `float`、`position: absolute/fixed`，此时元素不再影响其他元素布局（如浮动覆盖常规内容）。

## 脱离文档流有哪些方法？

## Padding和Margin有什么区别？

- **Padding（内边距）**：Padding 是元素的内边距，它位于元素的边框和内容之间,Padding 是元素的内部空间，它会影响元素的尺寸。
- **Margin（外边距）**：Margin 是元素的外边距，它位于元素的边框和其他元素之间，Margin 是元素的外部空间，它不影响元素的尺寸，只影响元素与其他元素的距离，并且不显示元素的背景。

## CSS引入的方式有哪些? link和@import的区别是?

CSS 引入方式：

1. **内联样式**（`<div style="">`）；
2. **内部样式表**（`<style>` 标签）；
3. **外部链接**（`<link href="">`）；
4. **@import**（CSS 内引入其他文件）。

**区别**：

- **加载方式**：`<link>` 是 HTML 标签，**并行加载**；`@import` 是 CSS 语法，需等 HTML 解析完再加载，**可能阻塞渲染**；
- **兼容性**：`@import` 不支持 IE5 以下，`<link>` 无兼容问题；
- **DOM 控制**：`<link>` 可通过 JS 操作（如动态插入），`@import` 不可；
- **使用场景**：`<link>` 推荐主样式，`@import` 适合模块化按需加载（但慎用，性能较差）。

## CSS 中 position属性有哪些，大概讲一下？

CSS 的 `position` 属性控制元素的定位方式：

1. **static**：默认值，元素在文档流中正常排列；
2. **relative**：相对定位，基于自身原位置偏移（不影响其他元素）；
3. **absolute**：绝对定位，相对于**最近的非 static 祖先元素**定位；
4. **fixed**：固定定位，相对于**视口**（滚动不移动）；
5. **sticky**：粘性定位，滚动到阈值时变为固定（如吸顶效果）。

**注意**：`absolute/fixed` 会脱离文档流，需通过 `top/left` 等调整位置。display: block;和display: inline;的区别?

## CSS隐藏元素的方法有哪些?

CSS 隐藏元素的常见方法及区别：

1. **`display: none`**：元素不渲染，**不占空间**，无法交互，触发重排；
2. **`visibility: hidden`**：元素不可见，**保留空间**，无法交互，仅重绘；
3. **`opacity: 0`**：完全透明，**保留空间**，**可交互**（如点击）；
4. **`position + 偏移`**：如 `absolute; left: -9999px`，移出视口但占位；
5. **`clip-path: inset(100%)`**：裁剪隐藏，保留布局，兼容性较差；
6. **`width/height: 0` + `overflow: hidden`**：需清除内边距/边框。

## 你知道哪些垂直居中的方法？

1. **Flex 布局**：

   ```css
   .parent {  
     display: flex;  
     justify-content: center;  
     align-items: center;  
   }  
   ```

2. **Grid 布局**：

   ```css
   .parent {  
     display: grid;  
     place-items: center;  
   }  
   ```

3. **绝对定位 + Transform**（未知宽高）：

   ```css
   .child {  
     position: absolute;  
     left: 50%;  
     top: 50%;  
     transform: translate(-50%, -50%);  
   }  
   ```

4. **绝对定位 + Margin**（已知宽高）：

   ```css
   .child {  
     position: absolute;  
     left: 0; right: 0;  
     top: 0; bottom: 0;  
     margin: auto;  
   }  
   ```

5. **行内内容居中**：

   ```css
   .parent {  
     text-align: center;  /* 水平 */  
     line-height: 高度值;  /* 垂直（单行） */  
   }  
   ```

## CSS哪些属性可以继承？

1. **字体相关**：`font-family`、`font-size`、`font-weight`、`color`；
2. **文本相关**：`line-height`、`text-align`、`text-indent`、`letter-spacing`；
3. **其他**：`visibility`（隐藏继承）、`cursor`（光标样式）、`list-style`（列表符号）。

## 清除浮动的方法有哪些？

1. **空元素法**：在浮动元素后添加 `<div style="clear:both"></div>`；

2. **伪元素法**（推荐）：

   ```css
   .clearfix::after {  
     content: "";  
     display: block;  
     clear: both;  
   }  
   ```

3. **触发BFC**：父元素设置 `overflow: hidden` 或 `display: flow-root`；

4. **父元素定高**：直接设置高度（不灵活，慎用）。

**核心原理**：通过清除操作使父容器包裹浮动元素，避免高度塌陷。

## 如何解决父容器高度塌陷问题？

解决父容器高度塌陷的常见方法：

1. **清除浮动**：

   ```css
   .parent::after {  
     content: "";  
     display: block;  
     clear: both;  
   }  
   ```

2. **触发 BFC**：

   ```css
   .parent {  
     overflow: hidden; /* 或 display: flow-root（无副作用） */  
   }  
   ```

3. **现代布局替代**：

   ```css
   .parent {  
     display: flex; /* 或 grid */  
   }  
   ```

**原理**：强制父容器重新计算高度，包含浮动子元素。推荐伪元素法或 `flow-root`，避免 `overflow` 可能的内容裁剪问题。

## 说说⼏种常⻅的CSS布局

1. **传统浮动布局**：
   - 圣杯/双飞翼布局（三栏，两侧固定，中间自适应），需清除浮动。
2. **Flex 弹性布局**：
   - 一维布局（如导航栏、垂直居中），通过 `display: flex` 实现灵活对齐与分布。
3. **Grid 网格布局**：
   - 二维布局（如复杂网格、卡片排列），`display: grid` 支持行列定义，简化结构。
4. **定位布局**：
   - 结合 `position: absolute/fixed` 实现固定侧边栏、弹窗等脱离文档流的元素。
5. **响应式布局**：
   - 媒体查询（`@media`）适配不同屏幕尺寸，结合 Flex/Grid 动态调整布局。

**特点**：Flex/Grid 更现代高效，传统浮动兼容性更好，响应式适配多端。

## Flex 布局了解多少？

Flex 布局（弹性盒子）用于**一维排列**元素，核心概念：

1. **容器属性**：
   - `display: flex`（定义容器）；
   - `flex-direction`（主轴方向：行/列）；
   - `justify-content`（主轴对齐）；
   - `align-items`（交叉轴对齐）；
   - `flex-wrap`（是否换行）。
2. **子项属性**：
   - `flex: 1`（简写 `flex-grow/shrink/basis` 控制伸缩比例）；
   - `order`（排序）；
   - `align-self`（单独对齐）。

**应用场景**：水平/垂直居中、等分空间、自适应布局。
**优势**：代码简洁、响应式适配性强，替代传统浮动布局。

[Flex 布局教程：语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## Grid 布局了解多少？

Grid 布局用于**二维网格结构**，核心概念：

1. **容器属性**：
   - `display: grid`；
   - `grid-template-columns/rows` 定义行列尺寸（如 `1fr`、`repeat()`）；
   - `gap` 控制行列间距；
   - `align/justify-items` 对齐单元格内容。
2. **子项属性**：
   - `grid-column/row` 指定子项位置；
   - `grid-area` 配合命名区域布局；
   - `justify/align-self` 单独对齐。

**应用场景**：复杂网格（如仪表盘）、响应式布局、行列严格对齐。
**优势**：代码简洁直观，支持灵活布局，与 Flex 互补（二维 vs 一维）。

[CSS Grid 网格布局教程](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

##  什么是外边距重叠？重叠的结果是什么？

外边距重叠（Margin Collapse）指相邻块级元素的垂直外边距合并为一个，规则如下：

1. **兄弟元素**：上下外边距取较大值（如 `margin-bottom: 20px` 和 `margin-top: 30px` → 间距 30px）；
2. **父子元素**：首个/末个子元素的边距与父元素合并（父无 `border/padding` 时触发）；
3. **正负值**：相加（如 `20px` 和 `-15px` → `5px`）；同为负时取更小值（绝对值更大）。

**结果**：实际间距小于预期，需通过触发 BFC（如父元素加 `overflow: hidden`）或添加 `padding/border` 避免。

## px，em和rem的区别

- **px**：绝对单位，固定像素值，不随页面缩放改变；
- **em**：相对单位，基于**父元素字体大小**（如父 `font-size: 16px` → `1em = 16px`），多层嵌套会累积计算；
- **rem**：相对单位，基于**根元素（html）字体大小**，始终全局统一，避免层级影响。

## 简述伪类和伪元素

伪类（如 `:hover`）用于选择元素的**特定状态**（如悬停），而伪元素（如 `::before`）用于创建**虚拟元素**（如插入内容）。
**区别**：

1. **语法**：伪类单冒号（`:active`），伪元素双冒号（`::before`，兼容写法可单冒号）；
2. **作用**：伪类描述状态，伪元素生成新内容；
3. **数量**：一个选择器可含多个伪类，但只能有一个伪元素。

## 用纯 CSS 创建一个三角形

通过设置元素的宽高为 `0`，利用 **边框透明** 特性生成三角形。

```css
.triangle {  
  width: 0;  
  height: 0;  
  border: 50px solid transparent;  
  border-top-color: red; /* 方向：向下 */  
} 
```

## CSS3中Filter可以做什么？

CSS3 的 `filter` 属性可为元素添加**视觉效果滤镜**，常用函数包括：

- **模糊**：`blur(5px)`；
- **亮度/对比度**：`brightness(1.2)`、`contrast(200%)`；
- **阴影**：`drop-shadow(2px 2px 5px black)`（比 `box-shadow` 更自然）；
- **颜色处理**：`grayscale(100%)`（灰度）、`hue-rotate(90deg)`（色相旋转）、`sepia(50%)`（复古色）；
- **透明度**：`opacity(0.5)`；
- **反色**：`invert(100%)`。

## CSS实现自适应正方形、等宽高比矩形？

实现自适应正方形或等宽高比矩形：

1. **正方形**：

   ```css
   .square {  
     width: 50%;  
     padding-bottom: 50%; /* 高度 = 宽度 */  
     position: relative;  
   }  
   .content {  
     position: absolute; /* 内容需绝对定位 */  
     width: 100%;  
     height: 100%;  
   }  
   ```

2. **等宽高比矩形（如16:9）**：

   ```css
   .rectangle {  
     width: 100%;  
     padding-bottom: 56.25%; /* 9/16=56.25% */  
   }  
   ```

3. **现代方案**：

   ```css
   .box {  
     aspect-ratio: 1/1; /* 正方形 */  
     /* 或 aspect-ratio: 16/9; */  
   }  
   ```

**原理**：利用 `padding` 百分比基于宽度的特性，或直接使用 `aspect-ratio`（兼容性需注意）。

## CSS 如何实现文本溢出？

- 单行

 ```css
 .ellipsis {
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
 }
 ```

- 多行

```css
.ellipsis-multiline {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 设置显示的行数 */
  overflow: hidden;
  text-overflow: ellipsis;
}
```

## 谈谈你对媒体查询的认识？

媒体查询（`@media`）用于根据设备特性（如屏幕宽度、分辨率）应用不同CSS样式，实现响应式设计。

**常见用法**：

1. **视口适配**：

   ```css
   @media (max-width: 768px) {  
     /* 移动端样式 */  
   }  
   ```

2. **设备类型**：

   ```css
   @media print { ... }  /* 打印样式 */  
   ```

3. **组合条件**：

   ```css
   @media (min-width: 992px) and (orientation: landscape) { ... }  
   ```

**核心作用**：通过断点（Breakpoint）动态调整布局、字体大小或隐藏元素，提升多端适配体验。

## css中三栏布局的实现方案有哪些？

三栏布局（两侧固定，中间自适应）常见实现方案：

1. **浮动布局**：

   - 左右浮动定宽，中间通过 `margin` 留出空间，需清除浮动。

2. **Flex 布局**：

   ```css
   .container {  
     display: flex;  
   }  
   .left, .right { width: 200px; }  
   .middle { flex: 1; }  
   ```

3. **Grid 布局**：

   ```css
   .container {  
     display: grid;  
     grid-template-columns: 200px 1fr 200px;  
   }  
   ```

4. **绝对定位**：左右绝对定位，中间用 `margin` 占位。

5. **圣杯/双飞翼布局**：

   - 中间优先渲染，利用浮动、负边距和相对定位实现（经典但复杂）。

**特点**：Flex/Grid 简洁高效，浮动兼容性好，传统方案适合深入理解布局原理。

## 简述CSS3实现动画的方式？

CSS3 实现动画的两种主要方式：

1. **过渡动画（Transition）**：

   - 通过 `transition` 属性平滑改变元素状态（如悬停）。

   - 示例：

     ```css
     .box {  
       transition: all 0.3s ease-in;  
     }  
     .box:hover { width: 200px; }  
     ```

2. **关键帧动画（Animation）**：

   - 使用 `@keyframes` 定义动画序列，通过 `animation` 属性应用。

   - 示例：

     ```css
     @keyframes slide {  
       0% { transform: translateX(0); }  
       100% { transform: translateX(100px); }  
     }  
     .box {  
       animation: slide 2s infinite;  
     }  
     ```

**区别**：

- **Transition**：需触发（如hover），单次状态变化；
- **Animation**：自动执行，支持多阶段、循环等复杂控制。

## 如何开启GPU加速？

```css	
.element {  
  transform: translateZ(0);  
  /* 或 */  
  will-change: transform;  
}  
```



## 简述深入理解设备像素、CSS像素、设备独立像素、 DPR、PPI之间的区别与适配⽅案 ？

这些概念关联**屏幕适配与显示精度**，核心区别与适配方案如下：

1. **设备像素（物理像素）**：屏幕实际发光点，不可变（如 iPhone 13 的 1170×2532）。
2. **CSS像素（逻辑像素）**：代码中使用的抽象单位（如 `width: 100px`），通过 `viewport` 缩放与设备像素映射。
3. **设备独立像素（DP/DIP）**：与屏幕密度无关的虚拟单位（如 1DP ≈ 1/160英寸），系统级适配基准。
4. **DPR（设备像素比）**：`设备像素 / 设备独立像素`（如 DPR=2 时，1CSS 像素用 4 设备像素渲染）。
5. **PPI（像素密度）**：每英寸物理像素数，值越高越清晰（如 PPI=326 为 Retina 屏）。

**适配方案**：

- **Viewport 设置**：`<meta name="viewport" content="width=device-width">` 使 CSS 像素与设备独立像素对齐；
- **响应式单位**：用 `rem`、`vw` 替代 `px`，结合媒体查询适配不同尺寸；
- **高倍图适配**：根据 DPR 切换 2x/3x 图片（如 `srcset` 属性）；
- **缩放处理**：Canvas 等需根据 DPR 缩放避免模糊（如 `ctx.scale(DPR, DPR)`）。

## 如何实现⼩于12px的字体效果？

实现小于 `12px` 的字体效果可通过以下方法：

1. **缩放法**（推荐）：

   ```css
   .small-text {  
     font-size: 12px;  
     transform: scale(0.8);  /* 实际显示 9.6px */  
     display: inline-block;    /* 避免缩放影响布局 */  
   }  
   ```

2. **禁用浏览器限制**（部分生效）：

   ```css
   body {  
     -webkit-text-size-adjust: none; /* Chrome/Safari */  
   }  
   ```

3. **SVG 文本**（绕过限制）：

   ```html
   <svg viewBox="0 0 100 20">  
     <text x="0" y="15" font-size="10">10px文本</text>  
   </svg>  
   ```

**注意事项**：

- **兼容性**：`transform` 兼容主流浏览器，`text-size-adjust` 需前缀；
- **副作用**：缩放可能导致字体模糊，需微调位置；
- **可访问性**：过小字体影响阅读，需权衡设计需求。

## 说说计算属性calc的作用

`calc()` 用于动态计算 CSS 属性值，支持**混合单位**（如 `%`、`px`、`vw`），常用于响应式布局。

**示例**：

```css
.box {  
  width: calc(100% - 80px); /* 宽度自适应，固定间距 */  
  height: calc(100vh - 20px - 5rem); /* 视口高度减多单位值 */  
}  
```

**优势**：

- 实现复杂尺寸计算（如等分剩余空间、动态调整）；
- 替代传统 JS 计算，提升代码可维护性；
- 支持加减乘除（注意运算符间需加空格）。

## 如何避免全局样式污染？

避免全局样式污染的核心方法是**样式隔离**，常用方案：

1. **CSS Modules**：

   - 通过编译工具（如Webpack）将类名哈希化（`.button_1x2y3z`），确保唯一性。

2. **Scoped CSS**（Vue/框架特性）：

   ```vue
   <style scoped>  
     .title { ... } /* 自动添加 data-v-xxx 属性选择器 */  
   </style>  
   ```

3. **BEM 命名规范**：

   - 通过 `.block__element--modifier` 命名规则约束作用域，减少冲突。

4. **CSS-in-JS**（如 styled-components）：

   - 将样式与组件绑定，生成唯一类名，运行时动态注入。

5. **Shadow DOM**（Web Components）：

   - 彻底隔离组件内外的样式（如 `<custom-element>` 内部样式不影响外部）。

## 简述Sass和Less

**Sass 和 Less 是两种主流的 CSS 预处理器**，通过扩展 CSS 功能提升开发效率，以下是它们的核心对比：

**1. 核心功能**

- **共同点**：
  - **变量**：定义可复用的值（如颜色、尺寸）。
  - **嵌套语法**：层级化组织 CSS 规则。
  - **混合宏（Mixins）**：封装重复代码块。
  - **函数与运算**：支持数学计算和逻辑操作。
  - **模块化**：通过 `@import` 拆分代码文件。
- **差异**：
  - **条件与循环**：
    - Sass 支持 `@if`、`@for`、`@each`、`@while` 等复杂逻辑。
    - Less 仅通过混合宏和函数模拟条件判断，功能较简单。
  - **作用域**：
    - Sass 变量具有局部作用域，层级更清晰。
    - Less 变量默认全局作用域，可能引发冲突。

**2. 语法风格**

- **Sass**：

  - **两种语法**：

    - **SCSS**（主流）：兼容 CSS 语法，使用 `{}` 和 `;`。
    - **缩进语法**（Sass）：省略 `{}` 和 `;`，依赖缩进。

  - **示例（SCSS）**：

    ```scss
    $primary-color: #333;
    @mixin center-block {
      margin: 0 auto;
    }
    .container {
      @include center-block;
      .item { color: $primary-color; }
    }
    ```

- **Less**：

  - **类似 CSS**：语法与原生 CSS 几乎一致。

  - **示例**：

    ```less
    @primary-color: #333;
    .center-block() { margin: 0 auto; }
    .container {
      .center-block();
      .item { color: @primary-color; }
    }
    ```

**3. 编译与生态**

- **编译方式**：
  - **Sass**：需通过 `Dart Sass`（主流）或 `Node Sass` 工具编译为 CSS。
  - **Less**：通过 `Less.js`（浏览器或 Node.js）编译。
- **生态工具**：
  - Sass 集成于 Webpack、Gulp 等构建工具，主流框架（如 React、Vue）广泛支持。
  - Less 因 Bootstrap 早期使用而流行，但近年 Sass 生态更活跃。

**4. 适用场景**

- **选择 Sass**：
  - 需要复杂逻辑控制（如循环、条件分支）。
  - 项目规模较大，需严格的代码组织和模块化。
  - 偏好现代工具链（如 Dart Sass 的高性能编译）。
- **选择 Less**：
  - 快速上手，语法接近原生 CSS。
  - 维护旧项目（如早期 Bootstrap 项目）。
  - 轻量级需求，无需复杂功能。

**总结**

- **Sass** 功能更强大，适合复杂项目，**Less** 更轻量易用。
- **Sass 是当前主流选择**，尤其在新项目中更受推荐；Less 适合特定场景或历史项目兼容。

## postcss是做什么的？

PostCSS 是一个基于 JavaScript 的 CSS 处理工具，其核心功能是通过插件系统对 CSS 代码进行解析、转换和优化。它通过解析 CSS 生成**抽象语法树（AST）**，允许开发者利用插件对 AST 进行修改，最终生成兼容性更强、更高效的 CSS 代码。

常见插件：

- **Autoprefixer**：自动添加浏览器厂商前缀，确保跨浏览器兼容性14。
- **cssnano**：压缩 CSS 代码，去除冗余内容，减小文件体积49。
- **postcss-preset-env**：支持未来的 CSS 语法（如变量、嵌套），将其转换为当前浏览器兼容的代码59。
- **Stylelint**：检查 CSS 代码规范，提示潜在错误510。

## CSS优化、提高性能的方法有哪些？

**CSS 性能优化常用方法：**

1. **减少重绘与回流**
   - 使用 `transform` 和 `opacity` 替代直接修改 `top/left`，触发 GPU 加速
   - 避免频繁操作 DOM 样式，合并多次修改
2. **选择器优化**
   - 避免过度嵌套（如 `.nav ul li a`）
   - 减少通配符 `*` 和属性选择器的使用
3. **文件体积压缩**
   - 删除无用代码（如 PurgeCSS）
   - 压缩 CSS（工具：cssnano、Webpack 的 `css-minimizer-webpack-plugin`）
4. **加载策略优化**
   - 关键 CSS 内联，非关键 CSS 异步加载（`<link rel="preload">`）
   - 使用 `media="print"` 或 `media="(max-width: 600px)"` 分割代码
5. **布局性能**
   - 优先使用 Flexbox/Grid 布局（性能优于传统浮动布局）
   - 避免过度使用 `margin/padding` 导致布局抖动
6. **工具与规范**
   - 使用 CSS 变量（减少重复值）
   - 开启 CSS 硬件加速（如 `will-change: transform;`）

## 浏览器是怎样解析CSS选择器的？

浏览器解析 CSS 选择器的过程是**从右向左匹配**的，目的是快速过滤无效路径，提升解析效率。例如对 `.nav a` 的解析顺序为：

1. 先找到页面所有 `<a>` 标签；
2. 再向上检查父级是否包含 `.nav` 类。

**关键点：**

- **解析步骤**：
  - 生成选择器的抽象语法树（AST）；
  - 遍历 DOM 树，匹配符合最右端条件的元素；
  - 自底向上验证父级选择器，最终确定匹配结果。
- **性能影响**：
  - 越右侧的选择器越需**精准**（如类名、ID），减少回溯成本；
  - 避免使用 `*`、层级过深（如 `div ul li a span`），降低匹配复杂度。

**优化建议：**

- 尽量用类选择器替代标签选择器；
- 避免使用通用选择器或属性选择器（如 `[type="text"]`）；
- 优先使用 BEM 等命名规范简化选择器层级。

## 为什么移动端设计稿都是750？

移动端设计稿常用750px宽度，主要基于以下几点原因：

1. **设备适配基准**：早期iPhone6/7/8等主流设备物理分辨率为750×1334（设备像素比DPR=2），设计稿按750px制作可直接除以2转为逻辑像素（375px），简化开发换算。
2. **高效适配方案**：使用Rem或VW单位时，750作为基准尺寸（如1rem=75px），方便快速计算响应式布局。
3. **行业统一规范**：国内团队普遍采用750标准，配合工具（如PostCSS插件）自动适配多端，降低协作成本。
4. **高倍图支持**：750设计稿直接输出@2x切图，适配DPR≥2的高清屏，避免图片模糊。

## position: fixed 一定是相对于浏览器窗口进行定位吗？

不一定。

`position:fixed;`的元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置，元素的位置在屏幕滚动时不会改变。`fixed` 属性会创建新的层叠上下文。

当元素祖先的 `transform`, `perspective` 或 `filter` 属性`非 none` 时，容器由视口改为该祖先。

## object-fit的作用?

## 单行文本怎么实现两端对齐？





## z-index属性在什么情况下会失效？

z-index 是 CSS 中控制元素堆置顺序的重要属性，它确定了元素在 Z 轴（线性上下）方向的显示顺序。然而，在一些特殊情况下，你会发现 z-index 属性似乎失效。本文将详细讨论这些情况及其原因，并提供解决方案。
**一、z-index 什么情况下会失效？**

下面是一些常见的情况，在这些情况中，z-index 可能会被应用不尽：

1. **没有定义位置属性**

  z-index 只在元素有定义位置时生效。如果一个元素的 `position` 属性为 `static`，则该元素不会应用 z-index。

  **解决方案**

  确保定义了 `position` 属性：

  ```css
  .box {
    position: relative; /* or absolute, fixed, sticky */
    z-index: 10;
  }
  ```

  

2. **不同堆置上下文**

   z-index 的比较只对于同一堆置上下文的元素有效。如果两个元素不在同一堆置上下文，则会根据他们所属堆置上下文本身的 z-index 进行比较。

   **解决方案**

   确保需要比较的元素在同一堆置上下文中，可通过设置他们所属的子元素。

3. 窗口元素优先级问题

   窗口元素（如 `alert` 窗口）和一些构成性元素（如 `<iframe>`）会应用高优先级，并且通常会覆盖高值 z-index 的元素。

   **解决方案**使用 

   CSS 属性：

   - 通过 `position: fixed` 和更高值 z-index。
   - 重构元素，确保元素显示于高优先级之上。

4. **非区块化内容**

   如果元素是内联元素（如 `<span>`），而没有被进行区块化，则属性可能无效。

   **解决方案**

   确保元素是区块化元素：

   ```css
   .inline-block {
       display: inline-block;
       z-index: 10;
     }
   ```

   

**二、z-index 失效情况总结**

| 失效原因           | 解决方案                                 |
| ------------------ | ---------------------------------------- |
| 未定义位置属性     | 设置 `position: relative/absolute/fixed` |
| 不同堆置上下文     | 确保同一堆置上下文                       |
| 窗口元素优先级问题 | 使用更高值 z-index                       |
| 非区块化内容       | 设置 `display: inline-block`             |

**三、实际示例**

  如下面是一个简单示例：

  ```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>z-index Example</title>
  <style>
    .container {
      position: relative;
      width: 200px;
      height: 200px;
    }
    .box1 {
      position: absolute;
      z-index: 10;
      width: 100px;
      height: 100px;
      background-color: red;
    }
    .box2 {
      position: absolute;
      z-index: 5;
      width: 100px;
      height: 100px;
      background-color: blue;
      top: 50px;
      left: 50px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box1"></div>
    <div class="box2"></div>
  </div>
</body>
</html>
  ```

## 怎么让CSS flex布局最后一行列表左对齐？

- 利用伪元素自动填充剩余空间

```css
.flex-container::after {
  content: "";
   flex: auto;
}
```

- js计算元素个数补齐占位元素(vue中%计算)
- 改用 CSS Grid 布局

## Atom CSS 是什么？

## 什么是响应式设计？响应式设计的基本原理是什么？如何进行实现？
