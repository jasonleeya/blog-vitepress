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
> 参考自[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths#%E6%9B%B2%E7%BA%BF%E5%91%BD%E4%BB%A4)

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
