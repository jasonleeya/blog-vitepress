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

<ClientOnly>
  <read></read>
</ClientOnly>

<style>
 #rect1 { fill: url(#Gradient1); }
              .stop1 { stop-color: red; }
              .stop2 { stop-color: black; stop-opacity: 0; }
              .stop3 { stop-color: blue; }
</style>

# SVG入门到入土

相信绝大多数前端同学都不愿意自己手写SVG代码吧，这种事情还是直接交给UI省事的多，但是我学习了SVG的基础用法之后，发现SVG还是可以给平时开发带来很大便利的。在此我写下这篇文章，方便日后查阅，也希望能帮助到其他前端小伙伴入门svg。

## 什么是SVG

SVG 是一种 `XML` 语言，可以用来绘制 `矢量图形`
。什么是矢量图呢？常见的图片被是由像素构成的，放大图形之后会失真，边缘出现锯齿状，这类图称之为位图，而矢量图形是通过 `XML`
语言描述的，放大后不会失真，举一个通俗点的例子，矢量图通过代码定义了一个圆，不管图形放多大，渲染器都会把它画成一个平滑的圆，位图放大之后像素也被放大了，所以边缘会出现由一个个放大的像素构成的锯齿。

我分别用canvas和SVG绘制出两个半径10px的圆形并放大5倍做对比：

:::details 点击查看源码
<<< ./CanvasSvgCompare.vue
:::

<ClientOnly>
  <CanvasSvgCompare></CanvasSvgCompare>
</ClientOnly>

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

<ClientOnly>
  <el-card class="card">
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="49" stroke="black" stroke-width="1" fill="none"/>
  </svg>
  </el-card>
</ClientOnly>

当我们将其设置为 `width="100" height="100" viewBox="0 0 50 50"`，图形则变成了：

<ClientOnly>
  <el-card class="card">
    <svg width="100" height="100" viewBox="0 0 50 50">
      <circle cx="50" cy="50" r="49" stroke="black" stroke-width="1" fill="none"/>
    </svg>
  </el-card>
</ClientOnly>

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

<ClientOnly>
  <el-card class="card">
    <svg width="200" height="100">
     <rect x="20" y="20" width="60" height="60"/>
      <rect x="120" y="20" rx="10" ry="10" width="60" height="60"/>
   </svg>
  </el-card>
</ClientOnly>

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

<ClientOnly>
  <el-card class="card">
    <svg width="100" height="100">
      <circle cx="50" cy="50" r="50"/>
    </svg>
  </el-card>
</ClientOnly>

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

<ClientOnly>
  <el-card class="card">
    <svg width="100" height="100">
      <ellipse cx="50" cy="50" rx="50" ry="30"/>
    </svg>
  </el-card>
</ClientOnly>

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

<ClientOnly>
  <el-card class="card">
    <svg width="200" height="100">
      <line x1="20" x2="180" y1="50" y2="50" stroke="black"/>
    </svg>
  </el-card>
</ClientOnly>

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

<ClientOnly>
<el-card class="card">
  <svg width="100" height="100">
    <polyline
            points="10 10, 50 50, 10 90"
            stroke="#000"
            fill="none"/>
  </svg>
</el-card>
</ClientOnly>

属性：

- `points`：点集数列。每个点必须包含 2 个数字，一个是 x 坐标，一个是 y 坐标,每个数字用空白、逗号、终止命令符或者换行符分隔开,点集`(0,0)`, `(1,1)` 和 `(2,2)` 可以写成这样：`0,0 1,1 2,2`,也可以写成这样 `0 0, 1 1, 2 2`,也可以只要空格 `0 0 1 1 2 2`。

### 多边形

多边形使用 `<polygon>` 标签，和折线一样，多边形需要一个点集，顶点的点集。

```html
<svg width="100" height="100">
  <polygon points="10 10, 50 50, 10 90"/>
</svg>
```

<ClientOnly>
  <el-card class="card">
    <svg width="100" height="100">
      <polygon points="10 10, 50 50, 10 90"/>
    </svg>
  </el-card>
</ClientOnly>

属性：

- `points` ：点集数列。多边形首尾会自动闭合，所以点集第一个和最后一个点不需要设置成同一个点。

## 路径

使用 `path` 绘制路径， `path` 是SVG中最常用的也是最强大的图形，你可以用它创建线条，曲线，弧形等，上面介绍的图形都可以用 `path` 绘制出来。所有描述轮廓的数据都放在 `d` 属性里，`d` 是 `data` 的简写。

`d` 属性包含了众多命令，以字母开头，后面跟的数字是参数，比如字母 `M 10 10`，`M` 表示 `Move to`的意思，两个数字表示移动至 `(10,10)` 点。每一个命令有两种表示方式，一种是大写字母，表示采用绝对定位，另一种是用小写字母，表示采用相对定位（例如：从上一个点开始，向上移动 10px，向左移动 10px）。

### 直线命令

`path` 有5种画直线的命令：

#### `M`

起始点坐标，`Move to` 的意思。每个路径都必须以 `M` 开始。`M` 传入 `x` 和 `y` 坐标，用逗号或者空格隔开。下面是 `M` 的一个例子，但是单独一个 `M` 指令不会绘制任何图形，但是我将移动到的点标注出来了。

<ClientOnly>
  <el-card class="card">
    <svg width="100" height="100">
      <circle cx="10" cy="10" r="1" stroke="red"></circle>
    </svg>
  </el-card>
</ClientOnly>

<br>

#### `L` 
`Line to`的意思。`L` 需要两个参数，分别是一个点的 `x` 轴和 `y` 轴坐标，`L` 命令将会在当前位置和新位置（`L` 前面画笔所在的点）之间画一条线段。

<ClientOnly>
  <el-card class="card">
    <svg width="100" height="100">
     <path d="M0 0,L50 30" stroke="red"></path>
    </svg>
  </el-card>
</ClientOnly>

<br>
#### `H`
`Horizontal line to`的意思，由于是水平移动那目标位置，所以只需要一个参数，即目标点y轴。

<ClientOnly>
  <el-card class="card">
    <svg width="100" height="100">
     <path d="M0 0,L50 30 H90" stroke="red" fill="none"></path>
    </svg>
  </el-card>
</ClientOnly>
<br>

#### `V`
`Vertical line to`的意思，也是只需要一个参数，目标点x轴。

<ClientOnly>
  <el-card class="card">
    <svg width="100" height="100">
     <path d="M0 0,L50 30 H90 V80" stroke="red" fill="none"></path>
    </svg>
  </el-card>
</ClientOnly>
<br>

#### `Z`
关闭当前路径，`closepath` 的意思。它会绘制一条直线回到当前子路径的起点，不用区分大小写。

<ClientOnly>
  <el-card class="card">
    <svg width="100" height="100">
     <path d="M0 0,L50 30 H90 V80Z " stroke="red" fill="none"></path>
    </svg>
  </el-card>
</ClientOnly>

代码如下：

```html
<svg width="100" height="100">
  <path d="M0 0,L50 30 H90 V80Z " stroke="red" fill="none"></path>
</svg>
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

<ClientOnly>
  <el-card class="card" style="width: 100%;overflow: auto">
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
</ClientOnly>

上面列子是固定旋转角度 `xr` 属性的，如果在加上旋转角度，则可以绘制出固定两点与椭圆半径的无数个弧线：

<ClientOnly>
  <el-card class="card" style="width: 100%;overflow: auto">
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
</ClientOnly>

滑动改变 `xr`值:

<ClientOnly>
  <el-slider v-model="arcXr" :min="-180" :max="180" style="width:200px"></el-slider>
</ClientOnly>

我们不妨大胆点，再将其他元素值动态化：

<div style="display: flex;gap:10px">
起始点坐标：
x ：<ClientOnly><el-slider v-model="arcMx" :min="0" :max="400" style="width:200px"></el-slider></ClientOnly>
y ：<ClientOnly><el-slider v-model="arcMy" :min="0" :max="400" style="width:200px"></el-slider></ClientOnly>
</div>

<div style="display: flex;gap:10px">
终点坐标：
x ：<ClientOnly><el-slider v-model="arcX" :min="0" :max="400" style="width:200px"></el-slider></ClientOnly>
y ：<ClientOnly><el-slider v-model="arcY" :min="0" :max="400" style="width:200px"></el-slider></ClientOnly>
</div>

<div style="display: flex;gap:10px">
椭圆半径：
x ：<ClientOnly><el-slider v-model="arcRx" :min="0" :max="400" style="width:200px"></el-slider></ClientOnly>
y ：<ClientOnly><el-slider v-model="arcRy" :min="0" :max="400" style="width:200px"></el-slider></ClientOnly>
</div>

:::warning 提示
后面内容属于进阶部分，大部分内容引用自[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths#%E6%9B%B2%E7%BA%BF%E5%91%BD%E4%BB%A4)，不过MDN中文文档属于机翻，我增加修改了一些内容，更加通俗易懂。
:::

#### C

`C` 指令可以用于绘制三次贝塞尔曲线，需要定义两个控制点和一个终点的坐标参数：

```html
C x1 y1, x2 y2, x y
```

<ClientOnly>
  <el-card class="card">
    <svg width="100" height="100">
     <path d="M0 60 C40 20, 60 20, 100 60" fill="none" stroke="red"></path>
    </svg>
  </el-card>
</ClientOnly>

```html
<svg width="100" height="100">
  <path d="M0 60 C40 20, 60 20, 100 60" fill="none" stroke="red"></path>
</svg>
```

这里的最后一个坐标 (x,y) 表示的是曲线的终点，另外两个坐标是控制点，(x1,y1) 是起点的控制点，(x2,y2) 是终点的控制点。控制点描述的是曲线起始点的斜率，曲线上各个点的斜率，是从起点斜率到终点斜率的渐变过程，下面是斜率的变化过程：

![bezier](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths/cubic_b%C3%A9zier_curves_with_grid.png)

图例上的曲线从左往右看，控制点在水平方向上逐渐分开，图例上的曲线从上往下看，控制点和曲线坐标之间离得越来越远。这里要注意观察，曲线沿着起点到第一控制点的方向伸出，逐渐弯曲，然后沿着第二控制点到终点的方向结束。

你可以将若干个贝塞尔曲线连起来，从而创建出一条很长的平滑曲线。通常情况下，一个点某一侧的控制点是它另一侧的控制点的对称（以保持斜率不变）。这样，你可以使用一个简写的贝塞尔曲线命令 `S` :

```html
S x2 y2, x y
```

#### S
`S` 命令可以用来创建与前面一样的贝塞尔曲线，但是，如果 `S` 命令跟在一个 `C` 或 `S` 命令后面，则它的第一个控制点会被假设成前一个命令曲线的第二个控制点的中心对称点。如果 `S` 命令单独使用，前面没有 `C` 或 `S` 命令，那当前点将作为第一个控制点。下面是 `S` 命令的语法示例，图中左侧红色标记的点对应的控制点即为蓝色标记点。

![S](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths/shortcut_cubic_b%C3%A9zier_with_grid.png)

```html
<svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
  <path d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent"/>
</svg>
```

#### Q
另一种可用的贝塞尔曲线是二次贝塞尔曲线 `Q`，它比三次贝塞尔曲线简单，只需要一个控制点，用来确定起点和终点的曲线斜率。因此它需要两组参数，控制点和终点坐标。

```html
Q x1 y1, x y
```
![Q](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths/quadratic_b%C3%A9zier_with_grid.png)

```html
<svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
  <path d="M 10 80 Q 95 10 180 80" stroke="black" fill="transparent"/>
</svg>
```

#### T
就像三次贝塞尔曲线有一个 `S` 命令，二次贝塞尔曲线有一个差不多的 `T` 命令，可以通过更简短的参数，延长二次贝塞尔曲线。

```html
T x y
```
和之前一样，快捷命令 `T` 会通过前一个控制点，推断出一个新的控制点。这意味着，在你的第一个控制点后面，可以只定义终点，就创建出一个相当复杂的曲线。需要注意的是，`T` 命令前面必须是一个 `Q` 命令，或者是另一个 `T` 命令，才能达到这种效果。如果 `T` 单独使用，那么控制点就会被认为和终点是同一个点，所以画出来的将是一条直线。

![Q](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths/shortcut_quadratic_b%C3%A9zier_with_grid.png)

```html
<svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
  <path d="M 10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent"/>
</svg>
```

虽然三次贝塞尔曲线拥有更大的自由度，但是两种曲线能达到的效果总是差不多的。具体使用哪种曲线，通常取决于需求，以及对曲线对称性的依赖程度。

## 填充和边框

### 上色
大多数基本的涂色可以通过在元素上设置两个属性来搞定：`fill` 属性和 `stroke` 属性。`fill` 属性设置对象内部的颜色，`stroke` 属性设置绘制对象的线条的颜色。你可以使用在 HTML 中的 CSS 颜色命名方案定义它们的颜色，比如说颜色名（像red这种）、rgb 值（像 rgb(255,0,0) 这种）、十六进制值、rgba 值，等等。

```html
<svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="100" height="100" stroke="red" fill="black"
        fill-opacity="0.5" stroke-opacity="0.8"/>
</svg>
```
此外，在SVG中你可以分别定义填充色和边框色的不透明度，属性 `fill-opacity` 控制填充色的不透明度，属性 `stroke-opacity` 控制描边的不透明度。

### 描边
除了颜色属性，还有其他一些属性用来控制绘制描边的方式。

<ClientOnly>
  <el-card class="card">
    <svg width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <line x1="40" x2="120" y1="20" y2="20" stroke="black" stroke-width="20" stroke-linecap="butt"/>
      <line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="20" stroke-linecap="square"/>
      <line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="20" stroke-linecap="round"/>
    </svg>
  </el-card>
</ClientOnly>

```html
<svg width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <line x1="40" x2="120" y1="20" y2="20" stroke="black" stroke-width="20" stroke-linecap="butt"/>
  <line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="20" stroke-linecap="square"/>
  <line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="20" stroke-linecap="round"/>
</svg>
```

`stroke-width` 属性定义了描边的宽度, `stroke-linecap` 属性控制边框终点的形状。

`stroke-linecap` 属性的值有三种可能值：

- `butt` 用直边结束线段，它是常规做法，线段边界 90 度垂直于描边的方向、贯穿它的终点。
- `square` 的效果差不多，但是会稍微超出实际路径的范围，超出的大小由 `stroke-width` 控制。
- `round` 表示边框的终点是圆角，圆角的半径也是由 `stroke-width` 控制的。

还有一个`stroke-linejoin`属性，用来控制两条描边线段之间，用什么方式连接。

<ClientOnly>
  <el-card class="card">
    <svg width="160" height="280" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <polyline points="40 60 80 20 120 60" stroke="black" stroke-width="20"
      stroke-linecap="butt" fill="none" stroke-linejoin="miter"/>
      <polyline points="40 140 80 100 120 140" stroke="black" stroke-width="20"
      stroke-linecap="round" fill="none" stroke-linejoin="round"/>
      <polyline points="40 220 80 180 120 220" stroke="black" stroke-width="20"
      stroke-linecap="square" fill="none" stroke-linejoin="bevel"/>
    </svg>
  </el-card>
</ClientOnly>

```html
<svg width="160" height="280" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <polyline points="40 60 80 20 120 60" stroke="black" stroke-width="20" stroke-linecap="butt" fill="none" stroke-linejoin="miter"/>
  
  <polyline points="40 140 80 100 120 140" stroke="black" stroke-width="20" stroke-linecap="round" fill="none" stroke-linejoin="round"/>
  
  <polyline points="40 220 80 180 120 220" stroke="black" stroke-width="20" stroke-linecap="square" fill="none" stroke-linejoin="bevel"/>
</svg>
```

每条折线都是由两个线段连接起来的，连接处的样式由 `stroke-linejoin` 属性控制，它有三个可用的值，`miter` 是默认值，表示用方形画笔在连接处形成尖角，`round` 表示用圆角连接，实现平滑效果。最后还有一个值 `bevel`，连接处会形成一个斜接。

最后，你可以通过指定`stroke-dasharray`属性，将虚线类型应用在描边上。

<ClientOnly>
  <el-card class="card">
    <svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <path d="M 10 75 Q 50 10 100 75 T 190 75" stroke="black"
        stroke-linecap="round" stroke-dasharray="5,10,5" fill="none"/>
      <path d="M 10 75 L 190 75" stroke="red"
        stroke-linecap="round" stroke-width="1" stroke-dasharray="5,5" fill="none"/>
    </svg>
  </el-card>
</ClientOnly>

```html
<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <path d="M 10 75 Q 50 10 100 75 T 190 75" stroke="black"
    stroke-linecap="round" stroke-dasharray="5,10,5" fill="none"/>
  <path d="M 10 75 L 190 75" stroke="red"
    stroke-linecap="round" stroke-width="1" stroke-dasharray="5,5" fill="none"/>
</svg>
```
`stroke-dasharray` 属性的参数，是一组用逗号分割的数字组成的数列。注意，和path不一样，这里的数字必须用逗号分割（空格会被忽略）。每一组数字，第一个用来表示填色区域的长度，第二个用来表示非填色区域的长度。所以在上面的例子里，第二个路径会先做 5 个像素单位的填色，紧接着是 5 个空白单位，然后又是 5 个单位的填色。如果你想要更复杂的虚线模式，你可以定义更多的数字。第一个例子指定了 3 个数字，这种情况下，数字会循环两次，形成一个偶数的虚线模式（奇数个循环两次变偶数个）。所以该路径首先渲染 5 个填色单位，10 个空白单位，5 个填色单位，然后回头以这 3 个数字做一次循环，但是这次是创建 5 个空白单位，10 个填色单位，5 个空白单位。通过这两次循环得到偶数模式，并将这个偶数模式不断重复。

另外还有一些关于填充和边框的属性，包括 `fill-rule`，用于定义如何给图形重叠的区域上色；`stroke-miterlimit`，定义什么情况下绘制或不绘制边框连接的 `miter` 效果；还有 `stroke-dashoffset`，定义虚线开始的位置。

:::tip 小技巧
使用 `stroke-dasharray` 和 `stroke-dashoffset` 可以实现非常炫酷的描边动画。
[使用stroke-dashoffset 快速实现SVG描边动画](https://juejin.cn/post/6920608051057655821)
:::

### 使用CSS

除了定义对象的属性外，你也可以通过 `CSS` 来样式化填充和描边。语法和在 `HTML` 里使用 `CSS` 一样，只不过你要把`background-color`、`border` 改成 `fill`  `stroke`。注意，不是所有的属性都能用 `CSS` 来设置。上色和填充的部分一般是可以用 `CSS` 来设置的，比如`fill`，`stroke`，`stroke-dasharray`等，但是不包括下面会提到的渐变和图案等功能。另外，`width`、`height`，以及路径的命令等等，都不能用 `CSS` 设置。判断它们能不能用 CSS 设置还是比较容易的。

:::info 备注
[SVG 规范将](https://www.w3.org/TR/SVG/propidx.html) 属性区分成 properties 和其他 attributes，前者是可以用 CSS 设置的，后者不能。
:::

`CSS` 可以使用行内样式插入到 `SVG` 元素：

```html
 <rect x="10" height="180" y="10" width="180" style="stroke: black; fill: red;"/>
```

或者将 `CSS` 写入 `<style>`标签中，只不过我们需要将 `<style>` 标签写入 `<defs>` 标签中而不是 `<head>`中：

```xml
<?xml version="1.0" standalone="no"?>
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <style><![CDATA[
       #MyRect {
         stroke: black;
         fill: red;
       }
    ]]></style>
  </defs>
  <rect x="10" height="180" y="10" width="180" id="MyRect"/>
</svg>
```
如上把样式放到一块你可以更轻松地调整一大组元素的样式，同样你也可以使用hover这样的伪类来创建翻转之类的效果：

```css
#MyRect:hover {
  stroke: black;
  fill: blue;
}
```

一些可以在 `HTML` 里使用的CSS，在 `SVG` 里可能无法正常工作，比如 `before` 和 `after` 伪类。所以这里需要一点经验。

你也可以额外引入外部 `CSS` 样式文件：
```xml
<?xml-stylesheet type="text/css" href="style.css"?>
<svg>...</svg>
```

:::tip 小技巧
据我实战经验，如果是内联 `SVG`，是可以直接在外部声明样式的,例如在 `Vue`中，你可以直接在 `<style>`标签内定义 `SVG` 样式
:::

## 渐变
要在 `SVG` 中实现渐变，可就不像在 `SVG` 中定义 `SVG` 样式可以直接写 `CSS` 了，你必须在 `<defs>` 中定义渐变节点，再使用 `id` 引入它。

### 线性渐变

线性渐变需要在 `<defs>` 元素内部创建一个 `<linearGradient>` 节点。

:::details 点击查看源代码
```xml
<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="Gradient1">
      <stop class="stop1" offset="0%" />
      <stop class="stop2" offset="50%" />
      <stop class="stop3" offset="100%" />
    </linearGradient>
    <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="red" />
      <stop offset="50%" stop-color="black" stop-opacity="0" />
      <stop offset="100%" stop-color="blue" />
    </linearGradient>
    <style type="text/css">
      <![CDATA[
              #rect1 { fill: url(#Gradient1); }
              .stop1 { stop-color: red; }
              .stop2 { stop-color: black; stop-opacity: 0; }
              .stop3 { stop-color: blue; }
            ]]>
    </style>
  </defs>

  <rect id="rect1" x="10" y="10" rx="15" ry="15" width="100" height="100" />
  <rect
    x="10"
    y="120"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#Gradient2)" />
</svg>
```
:::

<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="Gradient1">
      <stop class="stop1" offset="0%" />
      <stop class="stop2" offset="50%" />
      <stop class="stop3" offset="100%" />
    </linearGradient>
    <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="red" />
      <stop offset="50%" stop-color="black" stop-opacity="0" />
      <stop offset="100%" stop-color="blue" />
    </linearGradient>
  </defs>

  <rect id="rect1" x="10" y="10" rx="15" ry="15" width="100" height="100" />
  <rect
    x="10"
    y="120"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#Gradient2)" />
</svg>

  以上是一个应用了线性渐变的 `<rect>` 元素的示例。线性渐变内部有几个 `<stop>` 结点，这些结点通过指定位置的 `offset`（偏移）属性和  `stop-color`（颜色中值）属性来说明在渐变的特定位置上应该是什么颜色；可以直接指定这两个属性值，也可以通过 CSS 来指定他们的值，该例子中混合使用了这两种方法。例如：该示例中指明了渐变开始颜色为红色，到中间位置时变成半透明的黑色，最后变成蓝色。虽然你可以根据需求按照自己的喜好插入很多中间颜色，但是偏移量应该始终从 0% 开始（或者 0 也可以，百分号可以扔掉），到 100%（或 1）结束。如果stop设置的位置有重合，将使用 `XML` 树中较晚设置的值。而且，类似于填充和描边，你也可以指定属性 `stop-opacity` 来设置某个位置的半透明度（同样，对于 `FF3` 你也可以设置 `rgba` 值）。
```xml
<stop offset="100%" stop-color="yellow" stop-opacity="0.5" />
```
使用渐变时，我们需要在一个对象的属性 `fill` 或属性 `stroke` 中引用它，这跟你在 `CSS` 中使用 `url` 引用元素的方法一样。在本例中，`url` 只是一个渐变的引用，我们已经给这个渐变一个ID——“Gradient”。要想附加它，将属性 `fill` 设置为 `url(#Gradient)` 即可。现在对象就变成多色的了，也可以用同样的方式处理 `stroke`。

`<linearGradient>` 元素还需要一些其他的属性值，它们指定了渐变的大小和出现范围。渐变的方向可以通过两个点来控制，它们分别是属性 `x1`、`x2`、`y1` 和 `y2`，这些属性定义了渐变路线走向。渐变色默认是水平方向的，但是通过修改这些属性，就可以旋转该方向。在上面第二个例子中创建了一个垂直渐变。

:::info 备注
你也可以在渐变上使用 `xlink:href` 属性。如果使用了该属性时，一个渐变的属性和颜色中值（stop）可以被另一个渐变包含引用。在下例中，你就不需要在 "Grandient2" 中重新创建全部的颜色中值（stop）。
```html
<linearGradient id="Gradient1">
  <stop id="stop1" offset="0%" />
  <stop id="stop2" offset="50%" />
  <stop id="stop3" offset="100%" />
</linearGradient>
<linearGradient
        id="Gradient2"
        x1="0"
        x2="0"
        y1="0"
        y2="1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xlink:href="#Gradient1" />
```
尽管通常你可能在文档的顶部就定义了 "Gradient1"，但我在结点上直接包含了 `xlink` 的命名空间，关于这点的更多信息我们会在讨论图片的时候详解。
:::

### 径向渐变
径向渐变与线性渐变相似，只是它是从一个点开始发散绘制渐变。创建径向渐变需要在文档的 `<defs>` 中添加一个`<radialGradient>`元素。

:::details 点击查看源码
```html
<?xml version="1.0" standalone="no"?>
<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="RadialGradient1">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
    <radialGradient id="RadialGradient2" cx="0.25" cy="0.25" r="0.25">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
  </defs>

  <rect
    x="10"
    y="10"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#RadialGradient1)" />
  <rect
    x="10"
    y="120"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#RadialGradient2)" />
</svg>
```
:::

<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="RadialGradient1">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
    <radialGradient id="RadialGradient2" cx="0.25" cy="0.25" r="0.25">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
  </defs>
  <rect
      x="10"
      y="10"
      rx="15"
      ry="15"
      width="100"
      height="100"
      fill="url(#RadialGradient1)" />
  <rect
      x="10"
      y="120"
      rx="15"
      ry="15"
      width="100"
      height="100"
      fill="url(#RadialGradient2)" />
</svg>

中值（stop）的使用方法与之前一致，但是现在这个对象的颜色是中间是红色的，且向着边缘的方向渐渐的变成蓝色。跟线性渐变一样，`<radialGradient>` 节点可以有多个属性来描述其位置和方向，但是它更加复杂。径向渐变也是通过两个点来定义其边缘位置，两点中的第一个点定义了渐变结束所围绕的圆环，它需要一个中心点，由 `cx` 和 `cy` 属性及半径 `r` 来定义，通过设置这些点我们可以移动渐变范围并改变它的大小，如上例的第二个 `<rect>` 所展示的。

第二个点被称为焦点，由 `fx` 和 `fy` 属性定义。第一个点描述了渐变边缘位置，焦点则描述了渐变的中心，如下例。

**中心和焦点**
:::details 点击查看源码
```html
<?xml version="1.0" standalone="no"?>

<svg width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="Gradient" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
  </defs>

  <rect
    x="10"
    y="10"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#Gradient)"
    stroke="black"
    stroke-width="2" />

  <circle
    cx="60"
    cy="60"
    r="50"
    fill="transparent"
    stroke="white"
    stroke-width="2" />
  <circle cx="35" cy="35" r="2" fill="white" stroke="white" />
  <circle cx="60" cy="60" r="2" fill="white" stroke="white" />
  <text x="38" y="40" fill="white" font-family="sans-serif" font-size="10pt">
    (fx,fy)
  </text>
  <text x="63" y="63" fill="white" font-family="sans-serif" font-size="10pt">
    (cx,cy)
  </text>
</svg>
```
:::

<svg width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="Gradient" cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
  </defs>
    <rect
    x="10"
    y="10"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#Gradient)"
    stroke="black"
    stroke-width="2" />
    <circle
      cx="60"
      cy="60"
      r="50"
      fill="transparent"
      stroke="white"
      stroke-width="2" />
    <circle cx="35" cy="35" r="2" fill="white" stroke="white" />
    <circle cx="60" cy="60" r="2" fill="white" stroke="white" />
    <text x="38" y="40" fill="white" font-family="sans-serif" font-size="10pt">
    (fx,fy)
    </text>
    <text x="63" y="63" fill="white" font-family="sans-serif" font-size="10pt">
    (cx,cy)
    </text>
</svg>

**spreadMethod**
:::details 点击查看源码
```html
<?xml version="1.0" standalone="no"?>

<svg width="220" height="220" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient
      id="GradientPad"
      cx="0.5"
      cy="0.5"
      r="0.4"
      fx="0.75"
      fy="0.75"
      spreadMethod="pad">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
    <radialGradient
      id="GradientRepeat"
      cx="0.5"
      cy="0.5"
      r="0.4"
      fx="0.75"
      fy="0.75"
      spreadMethod="repeat">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
    <radialGradient
      id="GradientReflect"
      cx="0.5"
      cy="0.5"
      r="0.4"
      fx="0.75"
      fy="0.75"
      spreadMethod="reflect">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
  </defs>

  <rect
    x="10"
    y="10"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#GradientPad)" />
  <rect
    x="10"
    y="120"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#GradientRepeat)" />
  <rect
    x="120"
    y="120"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#GradientReflect)" />

  <text x="15" y="30" fill="white" font-family="sans-serif" font-size="12pt">
    Pad
  </text>
  <text x="15" y="140" fill="white" font-family="sans-serif" font-size="12pt">
    Repeat
  </text>
  <text x="125" y="140" fill="white" font-family="sans-serif" font-size="12pt">
    Reflect
  </text>
</svg>
```
:::

<svg width="220" height="220" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient
      id="GradientPad"
      cx="0.5"
      cy="0.5"
      r="0.4"
      fx="0.75"
      fy="0.75"
      spreadMethod="pad">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
    <radialGradient
      id="GradientRepeat"
      cx="0.5"
      cy="0.5"
      r="0.4"
      fx="0.75"
      fy="0.75"
      spreadMethod="repeat">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
    <radialGradient
      id="GradientReflect"
      cx="0.5"
      cy="0.5"
      r="0.4"
      fx="0.75"
      fy="0.75"
      spreadMethod="reflect">
      <stop offset="0%" stop-color="red" />
      <stop offset="100%" stop-color="blue" />
    </radialGradient>
  </defs>
  <rect
    x="10"
    y="10"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#GradientPad)" />
  <rect
    x="10"
    y="120"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#GradientRepeat)" />
  <rect
    x="120"
    y="120"
    rx="15"
    ry="15"
    width="100"
    height="100"
    fill="url(#GradientReflect)" />
  <text x="15" y="30" fill="white" font-family="sans-serif" font-size="12pt">
    Pad
  </text>
  <text x="15" y="140" fill="white" font-family="sans-serif" font-size="12pt">
    Repeat
  </text>
  <text x="125" y="140" fill="white" font-family="sans-serif" font-size="12pt">
    Reflect
  </text>
</svg>

两种渐变都有一个叫做 `gradientUnits`（渐变单元）的属性，它描述了用来描述渐变的大小和方向的单元系统。该属性有两个值：`userSpaceOnUse` 、`objectBoundingBox`。默认值为 `objectBoundingBox`，我们目前看到的效果都是在这种系统下的，它大体上定义了对象的渐变大小范围，所以你只要指定从 0 到 1 的坐标值，渐变就会自动的缩放到对象相同大小。`userSpaceOnUse` 使用绝对单元，所以你必须知道对象的位置，并将渐变放在同样地位置上。上例中的 `radialGradient` 需要被重写成：

```html
<radialGradient
  id="Gradient"
  cx="60"
  cy="60"
  r="50"
  fx="35"
  fy="35"
  gradientUnits="userSpaceOnUse"></radialGradient>
```
你也可以利用属性 `gradientTransform` 给渐变添加额外的变化，但是因为我们还没有介绍 `transforms`，所以我们将在后续的章节中介绍它。

如果对象边界框不是一个正方形，处理 `gradientUnits="objectBoundingBox"` 还有一些其他警告，但是这些方法特别复杂因此有待一些了解得更深的人来解释他们。

## Patterns
`<pattern>` 是 `SVG` 的一个图案填充标签，在 `pattern` 中定义好图案，通过 `id` 引用来对图形进行填充
`<pattern>` 的 `width` ,`height` 属性默认由根据所填充图形的百分比来确定。

`pattern` 标签另外的两个属性为：
- `patternUnits` ：默认值为 `objectBoundingBox`,`x`、`y`、`width` 和 `height` 的值都是占外框（包裹 `pattern` 的元素）的百分比。
- `patternContentUnits` ：默认值为 `userSpaceOnUse`
一般用来设置 pattern 内图案的单位大小，如下面实例中的 circle、polygon。

`Units` 的取值范围：

`userSpaceOnUse`：
- `x`、`y`、`width` 和 `height` 表示的值都是当前用户坐标系统的值。也就是说，这些值没有缩放，都是绝对值。

`objectBoundingBox`(默认值)：
- `x`、`y`、`width`和`height`的值都是占外框（包裹 pattern 的元素）的百分比。

例子：
```html
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    <defs>
      <pattern id="p1" x="0" y="0" width="0.2" height="0.2">
        <circle cx="10" cy="10" r="5" fill="red" />
        <polygon points="30 10 60 50 0 60" fill="green" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="300" height="200" fill="url(#p1)" stroke="blue" />
</svg>
```
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    <defs>
      <pattern id="p1" x="0" y="0" width="0.2" height="0.2">
        <circle cx="10" cy="10" r="5" fill="red" />
        <polygon points="30 10 60 50 0 60" fill="green" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="300" height="200" fill="url(#p1)" stroke="blue" />
</svg>

> 参考：[SVG pattern 使用（patternUnits、patternContentUnits）](https://juejin.cn/post/7024418455512317966)

## 文本
### text
SVG中使用 `<text>` 标签添加文本。
```xml
<text x="10" y="10">Hello World!</text>
```
`<text>` 标签使用 `x` 和 `y` 属性确定第一个字符的基线位置。常用的属性还有：
- `font-family` 字体设置
- `font-size` 字体大小
- `font-weight` 字体粗体设置
- `font-style` 字体样式
- `text-anchor` 对齐方式。start(左对齐),middle(中间对齐),end(右对齐)
- `text-decoration` 划线设置。underline(下划线),overline(上划线),line-through(删除线)

例如：
```html
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20">
  <text x="10" y="15" fill="red" text-decoration="underline">SVG从入门到入土</text>
</svg>
```
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20">
  <text x="10" y="15" fill="red" text-decoration="underline">SVG从入门到入土</text>
</svg>

### tspan
`<text>` 元素无法对文本进行换行，这时候就需要使用 `<tspan>` 元素,除了 `<text>` 元素的属性外，还有以下属性：
- `dx` x方向的偏移。
- `dy` y方向的偏移。
- `rotate` 旋转字符，可设置多值。
- `baseline-shift` 设置文本为上下标,值 `super` 上标，`sub` 下标。

例如：
```html
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80">
  <text x="10" y="30" fill="red">
    <tspan>SVG从入门到入土</tspan>
    <tspan font-size="12" baseline-shift="super">2</tspan>
    <tspan x="10" y="50" rotate="30">SVG从入门到入土</tspan>
  </text>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80">
  <text x="10" y="30" fill="red">
    <tspan>SVG从入门到入土</tspan>
    <tspan font-size="12" baseline-shift="super">2</tspan>
    <tspan x="10" y="50" rotate="30">SVG从入门到入土</tspan>
  </text>
</svg>

### textPath
`<textPath>`元素可使文本沿着某条路径排列。
```html
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="150">
  <defs>
    <path id="path" d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"></path>
  </defs>
  <text>
    <textPath fill="red" xlink:href="#path" startOffset="50%" text-anchor="middle">
      SVG从入门到入土SVG从入门到入土SVG从入门到入土SVG从入门到入土SVG从入门到入土
    </textPath>
  </text>
</svg>
```
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="150">
  <defs>
    <path id="path" d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"></path>
  </defs>
  <text>
    <textPath fill="red" xlink:href="#path" startOffset="50%" text-anchor="middle">
      SVG从入门到入土SVG从入门到入土SVG从入门到入土SVG从入门到入土SVG从入门到入土
    </textPath>
  </text>
</svg>

## 基础变形
## 滤镜效果
