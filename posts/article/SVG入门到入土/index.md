---
category: 文章
tags:
  - SVG
---

<script setup>
import Read from "@components/Read.vue";
import CanvasSvgCompare from "./CanvasSvgCompare.vue";
import {ref} from 'vue';

const arcXr = ref(0);
const arcMx = ref(160);
const arcMy = ref(180);
const arcX = ref(240);
const arcY = ref(220);
const arcRx = ref(100);
const arcRy = ref(50);
const arcLaf = ref(0);
const arcSf = ref(0);
</script>

<read/>

# SVG入门到入土

相信绝大多数前端同学都不愿意自己手写SVG代码吧，这种事情还是直接交给UI省事的多，但是我学习了SVG的基础用法之后，发现SVG还是可以给平时开发带来很大便利的。在此我写下这篇文章，方便查阅，也希望能帮助到其他前端小伙伴入门svg。

## 什么是SVG

SVG 是一种 `XML` 语言，可以用来绘制 `矢量图形`
。什么是矢量图呢？常见的图片被是由像素构成的，放大图形之后会失真，边缘出现锯齿状，这类图称之为位图，而矢量图形是通过 `XML`
语言描述的，放大后不会失真，举一个通俗点的例子，矢量图通过代码定义了一个圆，不管图形放多大，渲染器都会把它画成一个平滑的圆，位图放大之后像素也被放大了，所以边缘会出现由一个个放大的像素构成的锯齿。

我分别用canvas和SVG绘制出两个半径10px的圆形并放大5倍做对比：

:::details 点击查看源码
<<< ./CanvasSvgCompare.vue
:::

<CanvasSvgCompare/>

canvas绘制出来的图形是位图，放大后可以明显的锯齿状，而SVG绘制的圆形依然圆润。

## 使用方法

常见svg使用方法有3种：

- 以 `.svg` 结尾的文件可以视作一种图片格式，所以可以用 `img` 标签的 `src` 属性直接引入
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

- 直接内嵌到 `HTML` 中，这种方式是最推荐的，如果使用了Vue，也可以将svg写成单独的组件，方便引用：

:::code-group

```html

<div class="svg-wrapper">
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="10" stroke="black" stroke-width="1" fill="none"/>
  </svg>
</div>
```

```vue
<!-- @/components/icons/IconTest.vue -->

<template>
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="10" stroke="black" stroke-width="1" fill="none"/>
  </svg>
</template>

<!-- @/views/test.vue -->

...
<span><IconTest />组件引入SVG</span>
...
```

:::

## svg标签

SVG代码都放在 `<svg>` 标签之中，`widht` 和 `height`
属性指定了svg元素占据宽高，可以直接写数字代表的是相应的像素值，也可以使用和css相同的属性值，例如：`widht="100px"`,`widht="100%"`
,如果不指定这两个属性，SVG的默认大小是300×150（像素）。

如果只展示SVG部分图像，可以使用 `viewBox` 指定可视区域，下图为一个 `widht:"100" height:"100"` 的svg图形：

<el-card class="card">
<svg width="100" height="100">
  <circle cx="50" cy="50" r="49" stroke="black" stroke-width="1" fill="none"/>
</svg>
</el-card>

当我们将其设置为 `width="100" height="100" viewBox="0 0 50 50"`，图形则变成了：

<el-card class="card">
<svg width="100" height="100" viewBox="0 0 50 50">
<circle cx="50" cy="50" r="49" stroke="black" stroke-width="1" fill="none"/>
</svg>
</el-card>

`viewBox` 的4个数字分别表示左上角的横坐标和纵坐标、视口的宽度和高度，上面图形种，SVG 图像是100像素宽 x 100像素高，`viewBox`
属性指定视口从(0, 0)这个点开始,长50像素，宽50像素的一个视口区域。所以，实际看到的是左上角的四分之一圆。

## 基本形状

这里介绍的SVG中的几个基本的形状，可以通过这些形状的命名便可知道其用途。

### 矩形

使用 `<rect>` 标签代表矩形,矩形最少需要设置4个属性来确定矩形起始位置和宽高，也可以设置圆角属性，作用和css中的 `border-radius`
一样。

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

- `x` ：左上角x轴坐标
- `y` ：左上角y轴坐标
- `width` ：矩形的宽度
- `height` ：矩形的高度
- `rx` ：圆角在x轴方位的半径
- `ry` ：圆角在y轴方位的半径

### 圆形

使用 `<circle>` 标签代表圆形,需要设置圆的半径和中心坐标。

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

属性：

- `r` ：圆的半径     
- `c1` ：圆心在x轴的坐标
- `c2` ：圆心在y轴的坐标

### 椭圆

使用 `<ellipse>` 定义椭圆,不同于数学上定义椭圆需要两个确定两个焦点，SVG只需要确定一个中心点，另外，还需要确定一个x轴半径（长轴半径）和y轴半径（短轴半径）。

```html

<svg width="100" height="100">
  <ellipse cx="50" cy="50" rx="50" ry="30"/>
</svg>
```

<el-card class="card">
  <svg width="100" height="100">
    <ellipse cx="50" cy="50" rx="50" ry="30"/>
  </svg>
</el-card>

属性：

- `cx` ：圆心在x轴的坐标
- `cy` ：圆心在y轴的坐标
- `rx` ：x轴的半径   
- `ry` ：y轴的半径   

### 直线

使用 `<line>` 定义直线,直线就和数学上的线段一样了，需要确定起点和终点坐标。

```html

<svg width="100" height="100">
  <line x1="10" x2="50" y1="110" y2="150" stroke="black"/>
</svg>
```

<el-card class="card">
  <svg width="200" height="100">
    <line x1="20" x2="180" y1="50" y2="50" stroke="black"/>
  </svg>
</el-card>

属性：

 - `x1` ：起始点x坐标 
 - `y1` ：起始点y坐标 
 - `x2` ：结束点x坐标 
 - `y2` ：结束点y坐标 

### 折线

使用 `<polyline>` 绘制折线,折线就不止要定义两个点了，要定义一个点的集合。
```html
<svg width="100" height="100">
  <polyline
      points="10 10, 50 50, 10 90"/>
</svg>
```

<el-card class="card">
  <svg width="100" height="100">
    <polyline
            points="10 10, 50 50, 10 90"
            stroke="#000"
            fill="none"/>
  </svg>
</el-card>

属性：

- `points`：点集数列。每个点必须包含 2 个数字，一个是 x 坐标，一个是 y 坐标,每个数字用空白、逗号、终止命令符或者换行符分隔开,点集`(0,0)`, `(1,1)` 和 `(2,2)` 可以写成这样：`0,0 1,1 2,2`,也可以写成这样 `0 0, 1 1, 2 2`,也可以只要空格 `0 0 1 1 2 2`。

### 多边形

多边形使用 `<polygon>` 标签，和折线一样，多边形需要一个点集，顶点的点集。
```html
<svg width="100" height="100">
  <polygon points="10 10, 50 50, 10 90"/>
</svg>
```

<el-card class="card">
  <svg width="100" height="100">
    <polygon points="10 10, 50 50, 10 90"/>
  </svg>
</el-card>

属性：

- `points` ：点集数列。多边形首尾会自动闭合，所以点集第一个和最后一个点不需要设置成同一个点。

## 路径
使用 `path` 绘制路径， `path` 是SVG中最常用的也是最强大的图形，你可以用它创建线条，曲线，弧形等，上面介绍的图形都可以用 `path` 绘制出来。所有描述轮廓的数据都放在 `d` 属性里，`d` 是 `data` 的简写。

`d` 属性包含了众多命令，以字母开头，后面跟的数字是参数，比如字母 `M 10 10`，`M` 表示 `Move to`的意思，两个数字表示移动至 `(10,10)` 点。每一个命令有两种表示方式，一种是大写字母，表示采用绝对定位，另一种是用小写字母，表示采用相对定位（例如：从上一个点开始，向上移动 10px，向左移动 10px）。

### 直线命令

`path` 有5种画直线的命令：

#### `M`

起始点坐标，`Move to` 的意思。每个路径都必须以 `M` 开始。`M` 传入 `x` 和 `y` 坐标，用逗号或者空格隔开。下面是 `M` 的一个例子，但是单独一个 `M` 指令不会绘制任何图形，但是我将移动到的点标注出来了。

<el-card class="card">
<svg width="100" height="100">
  <circle cx="10" cy="10" r="1" stroke="red"></circle>
</svg>
</el-card>
<br>

#### `L` 
`Line to`的意思。`L` 需要两个参数，分别是一个点的 `x` 轴和 `y` 轴坐标，`L` 命令将会在当前位置和新位置（`L` 前面画笔所在的点）之间画一条线段。

<el-card class="card">
  <svg width="100" height="100">
   <path d="M0 0,L50 30" stroke="red"></path>
  </svg>
</el-card>
<br>

#### `H`
`Horizontal line to`的意思，由于是水平移动那目标位置，所以只需要一个参数，即目标点y轴。

<el-card class="card">
  <svg width="100" height="100">
   <path d="M0 0,L50 30 H90" stroke="red" fill="none"></path>
  </svg>
</el-card>
<br>

#### `V`
`Vertical line to`的意思，也是只需要一个参数，目标点x轴。

<el-card class="card">
  <svg width="100" height="100">
   <path d="M0 0,L50 30 H90 V80" stroke="red" fill="none"></path>
  </svg>
</el-card>
<br>

#### `Z`
关闭当前路径，`closepath` 的意思。它会绘制一条直线回到当前子路径的起点，不用区分大小写。

<el-card class="card">
  <svg width="100" height="100">
   <path d="M0 0,L50 30 H90 V80Z " stroke="red" fill="none"></path>
  </svg>
</el-card>

代码如下：

```html
<el-card class="card">
  <svg width="100" height="100">
   <path d="M0 0,L50 30 H90 V80Z " stroke="red" fill="none"></path>
  </svg>
</el-card>
```

### 曲线命令

在 `SVG` 中绘制平滑曲线的命令有3个，其中一个可以绘制圆弧，另外两个用来绘制贝塞尔曲线。

#### A
`A` 为绘制圆弧的命令。 弧形可以视为圆形或椭圆形的一部分，假设，已知椭圆形的长轴半径和短轴半径，并且已知两个点（在椭圆上），根据半径和两点，可以画出两个椭圆，在每个椭圆上根据两点都可以画出两种弧形。所以，仅仅根据半径和两点，可以画出四种弧形。为了保证创建的弧形唯一，A 命令需要用到比较多的参数：
```html
A(rx, ry, xr, laf, sf, x, y)
```
- `rx` ：椭圆X轴半径
- `ry` ：椭圆Y轴半径
- `xr` ：椭圆旋转角度
- `laf` ：是否选择弧长较长的那一段。0: 短边（小于180度）; 1: 长边（大于等于180度）
- `sf` ：是否顺时针绘制。0: 逆时针; 1: 顺时针
- `x` ：终点X轴坐标
- `y` ：终点Y轴坐标

上面的公式中并没有起点，起点其实是由 `M` 或者上一次绘制的终点决定的，我们通过两个点和椭圆的半径，可以绘制出两个椭圆,椭圆可以被切割出4个圆弧：

```html
  <svg width="400" height="200">
    <line x1="2" y1="1" x2="400" y2="200" stroke="#999"></line>
    <!--红--><!-- [!code focus:8]-->
    <path d="M160 80 A100 50 0 1 1 240 120" stroke="red" fill="none"></path>
    <!--蓝-->
    <path d="M160 80 A100 50 0 0 0 240 120" stroke="blue" fill="none"></path>
    <!--绿-->
    <path d="M160 80 A100 50 0 1 0 240 120" stroke="green" fill="none"></path>
    <!--黄-->
    <path d="M160 80 A100 50 0 0 1 240 120" stroke="#efef00" fill="none"></path>
    <circle cx="160" cy="80" r="3" fill="black"/>
    <circle cx="240" cy="120" r="3" fill="black"/>
  </svg>
```

<el-card class="card">
  <svg width="400" height="200">
    <line x1="2" y1="1" x2="400" y2="200" stroke="#999"></line>
    <path d="M160 80 A100 50 0 1 1 240 120" stroke="red" fill="none"></path>
    <path d="M160 80 A100 50 0 0 0 240 120" stroke="blue" fill="none"></path>
    <path d="M160 80 A100 50 0 1 0 240 120" stroke="green" fill="none"></path>
    <path d="M160 80 A100 50 0 0 1 240 120" stroke="#efef00" fill="none"></path>
    <circle cx="160" cy="80" r="3" fill="black"/>
    <circle cx="240" cy="120" r="3" fill="black"/>
  </svg>
</el-card>

上面列子是固定旋转角度 `xr` 属性的，如果在加上旋转角度，则可以绘制出固定两点与椭圆半径的无数个弧线：

<el-card class="card">
  <svg width="400" height="400">
    <text y="16">xr:{{arcXr}}</text>
    <line :x1="arcMx" :y1="arcMy" :x2="arcX" :y2="arcY" stroke="#999"></line>
    <path :d="`M${arcMx} ${arcMy} A${arcRx} ${arcRy} ${arcXr} 1 1 ${arcX} ${arcY}`" stroke="red" fill="none"></path>
    <path :d="`M${arcMx} ${arcMy} A${arcRx} ${arcRy} ${arcXr} 0 0 ${arcX} ${arcY}`" stroke="blue" fill="none"></path>
    <path :d="`M${arcMx} ${arcMy} A${arcRx} ${arcRy} ${arcXr} 1 0 ${arcX} ${arcY}`" stroke="green" fill="none"></path>
    <path :d="`M${arcMx} ${arcMy} A${arcRx} ${arcRy} ${arcXr} 0 1 ${arcX} ${arcY}`" stroke="#efef00" fill="none"></path>
    <circle :cx="arcMx" :cy="arcMy" r="3" fill="black"/>
    <circle :cx="arcX" :cy="arcY" r="3" fill="black"/>
  </svg>
</el-card>

滑动改变 `xr`值:

<el-slider v-model="arcXr" :min="-180" :max="180" style="width:200px"/>

我们不妨大胆点，再将其他元素值动态化：

<div style="display: flex;gap:10px">
起始点坐标：
x ：<el-slider v-model="arcMx" :min="0" :max="400" style="width:200px"/>
y ：<el-slider v-model="arcMy" :min="0" :max="400" style="width:200px"/>
</div>

<div style="display: flex;gap:10px">
终点坐标：
x ：<el-slider v-model="arcX" :min="0" :max="400" style="width:200px"/>
y ：<el-slider v-model="arcY" :min="0" :max="400" style="width:200px"/>
</div>

<div style="display: flex;gap:10px">
椭圆半径：
x ：<el-slider v-model="arcRx" :min="0" :max="400" style="width:200px"/>
y ：<el-slider v-model="arcRy" :min="0" :max="400" style="width:200px"/>
</div>

#### C
