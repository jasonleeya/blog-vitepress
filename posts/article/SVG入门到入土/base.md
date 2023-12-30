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
