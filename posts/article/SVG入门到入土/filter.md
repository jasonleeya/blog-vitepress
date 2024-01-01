## 滤镜效果

> 参考自：[有意思！强大的 SVG 滤镜](https://juejin.cn/post/6943032791122575390)

在很多情况下，基本的SVG图形并不能满足我们的需求，形状api实现出来图形看起来只是色块的生硬拼接，常见的例如阴影渐变等效果是不能实现的，所以便有了SVG滤镜。

SVG可以使用 `<filter>` 标签定义滤镜。SVG滤镜可以像PS处理照片那样为SVG添加滤镜效果，让SVG如虎添翼，能够实现出各种各样的效果。

### SVG滤镜的种类

SVG中滤镜效果种类是相当丰富的，这里简单介绍一下：

| 名称                  | 描述                                                                    | 
|---------------------|-----------------------------------------------------------------------|
| feBlend             | 把两个对象组合在一起，使它们受特定的混合模式控制                                              | 
| feColorMatrix       | 基于转换矩阵对颜色进行变换，每一像素的颜色值都经过矩阵计算出新颜色                                     |
| feComponentTransfer | 重新定义所有四个颜色通道R、G、B和A                                                   |
| feComposite         | 用于将两个图像相交，接受两个输入，in 和 in2                                             |
| feConvolveMatrix    | 应用了一个矩阵卷积滤镜效果                                                         |
| feDiffuseLighting   | SVG 滤波器原始灯使用alpha通道作为凹凸贴图的图像                                          |
| feDisplacementMap   | 是一个位置替换滤镜，用于改变元素和图形的像素位置                                              |
| feFlood             | 实用程序过滤器，用于使用颜色和不透明度基本填充过滤器子区域                                         |
| feGaussianBlur      | 显示模糊效果                                                                |
| felmage             | 从外部来源取得图像数据，并提供像素数据作为输出                                               |
| feMerge             | 允许同时应用滤镜效果而不是按顺序应用滤镜效果                                                |
| feMorphology        | 用来腐蚀或扩张输入图像                                                           |
| feOffset            | 显示阴影效果                                                                |
| feSpecularLighting  | 使用alpha通道作为凹凸贴图源图形，生成的图像是基于浅色的 RGBA图像                                 |
| feTile              | 允许以填补输入图像的重复，平铺图案的目标矩形                                                |
| feTurbulence        | 利用Perlin噪声函数创建了一个图像                                                   |
| feDistantLight      | 定义了一个距离光源，可以用在灯光滤镜`<feDiffuseLighting>`元素或`<feSpecularLighting>`元素的内部 |
| fePointLight        | 定义了一个光源，其允许创建一个点光源的效果                                                 |
| feSpotLight         | 定义了一个光源，其允许创建一个聚光灯效果                                                  |             

### SVG滤镜的语法

我们需要将 `<filter>` 标签定义在 `<defs>` 标签内。`<defs>` 是单词 "definitions" 的缩写，可以在其内定义以后需要重复使用的元素，
在 `<defs>` 元素中定义的元素不会直接呈现，而实需要在别处通过 `id` 引用他们。我们在 `<defs>` 中定义 `<filter>`
标签，并在 `<filter>` 中编写我们的滤镜。

先看一个简单的例子：

```html

<svg width="300" height="150">
  <defs>
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
    </filter>
  </defs>
  <rect x="100" y="30" width="80" height="80" fill="red" filter="url(#blur)"></rect>
</svg>
```

<ClientOnly>
  <el-card class="card">
    <svg width="300" height="150">
      <defs>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
      </defs>
      <rect x="100" y="30" width="80" height="80" fill="red" filter="url(#blur)"></rect>
    </svg>
  </el-card>
</ClientOnly>

我们定义了一个 `<feGaussianBlur>` 滤镜，它是一个简单的高斯模糊滤镜，它的 `stdDeviation` 属性定义了模糊程度。 `in`
属性定义了滤镜应用于的图像,这两个属性初学者见到这几个奇怪的单词一定是摸不着头脑，没关系，对于了解过的这些属性的我来说也是记不住，哈哈哈，所以才写下这篇文章以做记录。言归正传，
这些属性会在稍后介绍。

#### 滤镜的通用属性

每个滤镜都有一些通用属性：

| 属性     | 说明                                       | 默认值  |
|--------|------------------------------------------|------|
| x      | 滤镜应用于图像的x坐标                              | 0    |
| y      | 滤镜应用于图像的y坐标                              | 0    |
| width  | 绘制滤镜容器框的宽度                               | 100% |
| height | 绘制滤镜容器框的高度                               | 100% |
| in     | 指定滤镜效果的输入源，可以是某个滤镜导出的 result，也可以是下面 6 个值 |
| result | 用于定义一个滤镜效果的输出名字，以便将其用作另一个滤镜效果的输入         |

in的取值

| in              | 说明                                                                                                     |
|-----------------|--------------------------------------------------------------------------------------------------------|
| SourceGraphic   | 该关键词表示图形元素自身将作为 `<filter>` 原语的原始输入                                                                     |
| SourceAlpha     | 该关键词表示图形元素自身将作为 `<filter>` 原语的原始输入。`SourceAlpha` 与 `SourceGraphic` 具有相同的规则除了 `SourceAlpha` 只使用元素的非透明部分 |
| BackgroundImage | 与 `SourceGraphic` 类似，但可在背景上使用。 需要显式设置                                                                  |
| BackgroundAlpha | 与 `SourceAlpha` 类似，但可在背景上使用。 需要显式设置                                                                    |
| FillPaint       | 将其放置在无限平面上一样使用填充油漆                                                                                     |
| StrokePaint     | 	将其放在无限平面上一样使用描边绘画                                                                                     |

#### 滤镜的混合使用

SVG是可以将多个滤镜效果混合使用的，我们先来看下面这个例子：

```html

<svg width="200" height="200">
  <defs>
    <filter
        id="MyFilter"
        filterUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="200"
        height="200">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
      <feOffset in="blur" dx="5" dy="5" result="offsetBlur"/>
      <feMerge>
        <feMergeNode in="offsetBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <image filter="url(#MyFilter)" href="/logo.svg" x="20" y="20" height="150px" width="150px"/>
</svg>
```

<ClientOnly>
  <el-card class="card">
    <svg width="200" height="200">
      <defs>
        <filter 
            id="MyFilter"
            filterUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="200"
            height="200">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
          <feOffset in="blur" dx="5" dy="5" result="offsetBlur"/>
          <feMerge>
            <feMergeNode in="offsetBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <image filter="url(#MyFilter)" href="/logo.svg" x="20" y="20" height="150px" width="150px"/>
    </svg>
  </el-card>
</ClientOnly>

这便是SVG中实现阴影的步骤，过程还是有点复杂，我们分步骤来介绍：

首先，我们定义了一个id 为 `MyFilter` 的滤镜，它的 `filterUnits` 属性定义了滤镜应用于的图像，它的 `x`、`y`、`width`、`height`
属性定义了滤镜应用的区域。

接着在 `<filter>` 标签中定义了两个滤镜，`<feGaussianBlur>` 和 `<feOffset>`。`<feGaussianBlur>`的 `stdDeviation`
属性在上面已经讲过，作用为定义模糊程度,`<feOffset>` 的 `dx`,`dy` 属性定义了模糊的偏移量。

剩下两个滤镜共有属性：`in` 和 `result`，是多个滤镜能够组合的关键，`<feGaussianBlur>`中的 `in` 属性为 `SourceAlpha`
值意为接收原图像的 `alpha` 通道，然后经过滤镜处理，将产生的结果储存在名为 `blur` 的 `result` 中；在 `<feOffset>` 中，`in`
为 `blur`，意为接收上一步模糊处理的结果 `blur` ，经过偏移处理，将产生的结果储存在名为 `offsetBlur` 的 `result` 中。

可以看出，我们滤镜混合的过程就是将原始图形信息经过处理，产生结果，再将处理结果传递到下一个滤镜中，下一个滤镜将处理的结果传递到下一个滤镜中，以此类推。

上面的代码中我们还使用了 `<feMerge>` 滤镜，它可以用来对多个滤镜进行叠加。滤镜处理的结果可以用 `result`
存储输出。在 `feMergeNode` 元素中访问这些滤镜。`feMerge` 处理多个 `feMergeNode` 最后叠加输出。

<ClientOnly>
  <el-card class="card">
    <svg width="100%" height="740">
      <defs>
        <filter id="blur2">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur2"/>
        </filter>
        <filter 
            id="MyFilter"
            filterUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="200"
            height="200">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
          <feOffset in="blur" dx="5" dy="5" result="offsetBlur"/>
          <feMerge>
            <feMergeNode in="offsetBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <g id="img">
          <image href="/logo.svg" height="100px" width="100px"/>
        </g>
        <g id="arrow">
          <path d="M10 0h2v30h3l-4,7l-4,-7h3v-30h2"></path>
        </g>
        <g id="merge">
          <polyline points="0,0 0,20 150,20 150,0" stroke-width="2" fill="none" stroke="black"></polyline>
        </g>
      </defs>
      <use xlink:href="#img" x="20" y="20"/>
      <use xlink:href="#img" x="20" y="200" filter="url(#blur2)"/>
      <text x="80" y="160">feGaussianBlur 高斯模糊</text>
      <use xlink:href="#arrow" x="60" y="140"/>
      <use xlink:href="#img" x="30" y="410" filter="url(#blur2)"/>
      <text x="80" y="360">feOffset 偏移</text>
      <use xlink:href="#arrow" x="60" y="340"/>
      <use xlink:href="#img" x="180" y="410"/>
      <use xlink:href="#merge" x="80" y="530"/>
      <use xlink:href="#arrow" x="140" y="550"/>
      <text x="160" y="573">feMerge 叠加滤镜</text>
      <use xlink:href="#img" x="100" y="600" filter="url(#MyFilter)"/>
    </svg>
  </el-card>
</ClientOnly>

### 滤镜详解
<br>

#### feBlend

`<feBlend>` 为混合模式滤镜，该滤镜接受两个输入源，然后通过一定方式将两个输入源叠加到一起，将结果输出。

属性：

- `in` 输入源
- `in2` 输入源
- `mode` 混合模式

其中 `in`，`in2` 属性定义的是输入源，`mode` 属性定义了混合模式，混合模式可选值有5种：

- `normal`：正常
- `multiply`：正片叠底
- `screen`：滤色
- `darken`：变暗
- `lighten`：变亮

5种滤镜效果如下：

```html
<svg width="200" height="200">
  <defs>
    <filter id="lighten" x="0" y="0" width="200" height="200">
      <feImage width="200" height="200" xlink:href="https://q.qlogo.cn/g?b=qq&nk=1615685977&s=100" result="img1" />
      <feImage width="200" height="200" xlink:href="/logo.svg" result="img2" />
      <feBlend mode="normal" in="img1" in2="img2"/>
    </filter>
  </defs>
  <rect width="200" height="200" x="0" y="0" fill="none" filter="url(#lighten)" stroke="red"/>
</svg>
```

<ClientOnly>
  <el-card class="card" >
    <svg width="200" height="200">
        <defs>
            <filter id="lighten" x="0" y="0" width="200" height="220">
                <feImage width="200" height="200" xlink:href="https://q.qlogo.cn/g?b=qq&nk=1615685977&s=100" result="img1" />
                <feImage width="200" height="200" xlink:href="/logo.svg" result="img2" />
                <feBlend :mode="currentBlendMode" in="img1" in2="img2"/>
            </filter>
        </defs>
        <rect width="200" height="200" x="0" y="0" fill="none" filter="url(#lighten)" stroke="red"/>
    </svg>
    <template #footer>
      <el-select v-model="currentBlendMode" placeholder="请选择混合模式" size="small" style="width: 150px">
       <el-option
          v-for="item in blendModeList"
          :key="item"
          :label="item"
          :value="item"/>
      </el-select>
    </template>
  </el-card>
</ClientOnly>

<br>

#### feColorMatrix
`<feColorMatrix>` 滤镜基于转换矩阵对颜色进行变换。每一像素的颜色值 (一个表示为 [`红，绿，蓝，透明度`] 的矢量) 都经过 `矩阵乘法 (matrix multiplated)`  计算出的新颜色。

`<feColorMatrix>`有2个特有属性 `type` 和 `values`,`type` 支持 4 种不同的类型：`saturate` | `hueRotate` | `luminanceToAlpha` | `matrix`，

| `type` 类型        | 作用           | `value` 取值                                             |
|------------------|--------------|--------------------------------------------------------|
| saturate         | 转换图像饱和度      | 0.0 - 1.0                                              |
| hueRotate        | 	转换图像色相      | 0.0 - 1.0                                              |
| luminanceToAlpha | 阿尔法通道亮度      | 只有一个效果，使用亮度转 `Alpha` 效果将 `Alpha` 通道设置为图像的亮度并将颜色通道设置为 0 |
| matrix           | 使用矩阵函数进行色彩变换 | 需要应用一个 4 x 5 的矩阵                                       |

以下是前三种属性展示的效果：

```html
 <svg width="200" height="200">
      <defs>
        <filter id="saturate">
            <feColorMatrix id="saturate" type="saturate" :values="feColorMatrixValue"/>
        </filter>
        <filter id="hueRotate">
            <feColorMatrix id="hueRotate" type="hueRotate" :values="feColorMatrixValue"/>
        </filter>
        <filter id="luminanceToAlpha">
            <feColorMatrix type="luminanceToAlpha" />
        </filter>
      </defs>
        <image filter="`url(#saturate)`" href="https://q.qlogo.cn/g?b=qq&nk=1615685977&s=100" x="25" y="20" height="150px" width="150px"/>
    </svg>
```

<ClientOnly>
  <el-card class="card" >
    <svg width="200" height="200">
      <defs>
        <filter id="saturate">
            <feColorMatrix id="saturate" type="saturate" :values="feColorMatrixValue"/>
        </filter>
        <filter id="hueRotate">
            <feColorMatrix id="hueRotate" type="hueRotate" :values="feColorMatrixValue"/>
        </filter>
        <filter id="luminanceToAlpha">
            <feColorMatrix type="luminanceToAlpha" />
        </filter>
      </defs>
        <image :filter="`url(#${currentFeColorMatrixType})`" href="https://q.qlogo.cn/g?b=qq&nk=1615685977&s=100" x="25" y="20" height="150px" width="150px"/>
    </svg>
    <template #footer>
      <el-select v-model="currentFeColorMatrixType" size="small" style="width: 150px">
       <el-option
          v-for="item in feColorMatrixTypeList"
          :key="item"
          :label="item"
          :value="item"/>
      </el-select>
      <div style="display: flex;margin-top: 10px" v-if="currentFeColorMatrixType !== 'luminanceToAlpha'">
      value：<el-slider v-model="feColorMatrixValue" style="width:100px" :min="0" :max="currentFeColorMatrixType==='saturate'?1:360" :step="0.01"></el-slider></div>
    </template>
  </el-card>
</ClientOnly>

当 `<feColorMatrix>` 的 type 为 `matrix`时，它的 values 需要传入一个 4x5 的矩阵。这里不作讲解，有兴趣的同学可以参考一下文章：
- [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix)
- [详解feColorMatrix](https://www.w3cplus.com/svg/finessing-fecolormatrix.html)
