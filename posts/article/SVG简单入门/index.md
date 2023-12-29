---
category: 文章
tags:
  - SVG
---

<script setup>
import Read from "@components/Read.vue";
import CanvasSvgCompare from "./CanvasSvgCompare.vue";

</script>

<style>
.card{
  width: fit-content;
}
</style>

<read/>

# SVG简单入门

第一次接触到svg，感到惊讶又惧怕，惊讶于svg可以直接通过熟悉的xml代码编写出各种图形，惧怕于查看了文档之后发现要掌握它是要花很多学习成本的。对于多数人来说，svg这种东西都是略过原理直接交给UI的吧，但是这东西已经吸引了我的注意，正如我热爱前端的一点：可以通过代码实现各种直观的效果，svg亦是如此。战胜恐惧的办法就是面对恐惧，我从刚开始的照着文档编写，经过长时间的慢慢熟悉，已经能够较为熟练的手搓出各种图案了，在此我写下这篇文章，方便查阅，也希望能帮助到其他前端小伙伴入门svg。

## 什么是SVG

SVG 是一种`XML`语言，可以用来绘制`矢量图形`
。什么是矢量图形呢？常见的图片被是由像素构成的，放大图形之后会失真，边缘出现锯齿状，这种图称之为位图，而矢量图放大后不会失真，它的图形是通过`XML`
语言描述的，通俗点讲就是，矢量图通过代码定义一个圆，不管图形放多大，渲染器都会把它画成圆，位图放大之后像素也被放大了，所以边缘会出现由一个个放大的像素构成的锯齿。

我分别用canvas和SVG绘制出两个半径10px的圆形并放大5倍做对比：

:::details 点击查看源码
<<< ./CanvasSvgCompare.vue
:::

<CanvasSvgCompare/>

canvas绘制出来的图形是位图，放大后可以明显的锯齿状，而SVG绘制的圆形依然圆润。

## 使用方法

常见svg使用方法有3种：

- 以`.svg`结尾的文件可以视作一种图片格式，所以可以用`img`标签的`src`属性直接引入
  例如：

```html
<img src="./test.svg" alt="svg">
```

- 作为一种图片格式，自然也可以通过css`background`属性引入：

```css
.svg-bg {
  background: url('./test.svg') no-repeat;
}
```

- 直接内嵌到`HTML`中，这种方式是最推荐的，如果使用了Vue，也可以将svg写成单独的组件，方便引用：

:::code-group

```html
<div class="svg-wrapper">
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="10" stroke="black" stroke-width="1" fill="none"/>
  </svg>
</div>
```
```vue
<!-- /components/icons/IconTest.vue -->

<template>
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="10" stroke="black" stroke-width="1" fill="none"/>
  </svg>
</template>

<!-- /test.vue -->

<span><IconTest />组件引入SVG</span>
```
:::

## svg标签

SVG代码都放在`<svg>`标签之中，`widht`和`height`属性指定了svg元素占据宽高，可以直接写数字代表的是相应的像素值，也可以使用和css相同的属性值，例如：`widht="100px"`,`widht="100%"`,如果不指定这两个属性，SVG的默认大小是300×150（像素）。

如果只展示SVG部分图像，可以使用`viewBox`指定可视区域，下图为一个`widht:"100" height:"100"`的svg图形：

<el-card class="card">
<svg width="100" height="100">
  <circle cx="50" cy="50" r="49" stroke="black" stroke-width="1" fill="none"/>
</svg>
</el-card>

当我们将其设置为`width="100" height="100" viewBox="0 0 50 50"`，图形则变成了：

<el-card class="card">
<svg width="100" height="100" viewBox="0 0 50 50">
<circle cx="50" cy="50" r="49" stroke="black" stroke-width="1" fill="none"/>
</svg>
</el-card>

`viewBox`的4个数字分别表示左上角的横坐标和纵坐标、视口的宽度和高度，上面图形种，SVG 图像是100像素宽 x 100像素高，`viewBox`属性指定视口从(0, 0)这个点开始,长50像素，宽50像素的一个视口区域。所以，实际看到的是左上角的四分之一圆。

## 基本形状
这里介绍的SVG中的几个基本的形状，可以通过这些形状的命名便可知道其用途。

### 矩形
使用`<rect>`标签代表矩形，矩形最少需要设置4个属性来确定矩形起始位置和宽高，也可以设置圆角属性，作用和css中的`border-radius`一样。

```html
<svg width="200" height="100">
  <rect x="20" y="20" width="60" height="60"/>
  <rect x="120" y="20" rx="10" ry="10" width="60" height="60"/>
</svg>
```

<el-card class="card">
  <svg width="200" height="100">
    <rect x="20" y="20" width="60" height="60"/>
    <rect x="120" y="20" rx="10" ry="10" width="60" height="60"/>
  </svg>
</el-card>

属性：

| 属性名    | 含义         |
|--------|------------|
| x      | 左上角x轴坐标    |
| y      | 左上角y轴坐标    |
| width  | 矩形的宽度      |
| height | 矩形的高度      |
| rx     | 圆角在x轴方位的半径 |
| ry     | 圆角在y轴方位的半径 |

### 圆形
使用`<circle>`标签代表圆形，需要设置圆的半径和中心坐标。

```html
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="50"/>
  </svg>
```

<el-card class="card">
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="50"/>
  </svg>
</el-card>

| 属性名 | 含义       |
|-----|----------|
| r   | 圆的半径     |
| c1  | 圆心在x轴的坐标 |
| c2  | 圆心在y轴的坐标 |
