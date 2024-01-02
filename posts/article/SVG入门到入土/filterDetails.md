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
| hueRotate        | 	转换图像色相      | 0 - 360                                                |
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

当 `<feColorMatrix>` 的 type 为 `matrix`时，它的 values 需要传入一个 4x5 的矩阵，例如：

```html
<filter id="colorMatrix">
  <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0"/>
</filter>
```
要理解如何运用这些填写矩阵，就不得不直面另外一个问题 -- 图像的表示。

数字图像的本质是一个多维矩阵。在图像显示时，我们把图像的 `R` 分量放进红色通道里，`B` 分量放进蓝色通道里，`G` 分量放进绿色通道里。经过一系列处理，显示在屏幕上的就是我们所看到的彩色图像了。

而 `feColorMatrix` 中的 `matrix` 矩阵，就是用来表示不同通道的值每一个分量的值，最终通过计算得到我们熟知的 `rgba()` 值。
计算逻辑为：

```text
/* R G B A 1 */ 
1 0 0 0 0 // R = 1*R + 0*G + 0*B + 0*A + 0 
0 1 0 0 0 // G = 0*R + 1*G + 0*B + 0*A + 0 
0 0 1 0 0 // B = 0*R + 0*G + 1*B + 0*A + 0 
0 0 0 1 0 // A = 0*R + 0*G + 0*B + 1*A + 0
```

这里不作过多的讲解，有兴趣的同学可以参考一下文章：
- [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix)
- [详解feColorMatrix](https://www.w3cplus.com/svg/finessing-fecolormatrix.html)

#### feComponentTransfer

`<feComponentTransfer>`滤镜表示元素分别在每个颜色通道上实现颜色操作，此元素的四个颜色通道是 `<feFuncR>`，`<feFuncG>`，`<feFuncB>`和`<feFuncA>`，在执行颜色操作时，该元素应仅包含每种类型的一个子元素。

可参考文章：

- [SVG滤镜：feComponentTransfer](https://blog.csdn.net/yhdsbyhdsb/article/details/45919877)
- [SVG \<feComponentTransfer\>用法及代码示例](https://vimsky.com/examples/usage/svg-fecomponenttransfer-element.html)

#### feComposite
`<feComposite>` SVG 滤波器基元使用 `Porter-Duff` 合成操作之一在图像空间中按像素执行两个输入图像的组合： `over` 、 `in` 、 `atop` 、 `out` 、 `xor` 、 `lighter` 或 `arithmetic` 。

<ClientOnly>
  <el-card class="card" >
  <svg width="330" height="195" viewBox="0 0 1100 650" version="1.1"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Example feComposite - Examples of feComposite operations</title>
  <desc>Four rows of six pairs of overlapping triangles depicting
        the six different feComposite operators under different
        opacity values and different clearing of the background.</desc>
	<defs>
    <desc>Define two sets of six filters for each of the six compositing operators.
          The first set wipes out the background image by flooding with opaque white.
          The second set does not wipe out the background, with the result
          that the background sometimes shines through and is other cases
          is blended into itself (i.e., "double-counting").</desc>
    <filter id="overFlood" filterUnits="objectBoundingBox" x="-5%" y="-5%" width="110%" height="110%">
      <feFlood flood-color="#ffffff" flood-opacity="1" result="flood"/>
      <feComposite in="SourceGraphic" in2="BackgroundImage" operator="over" result="comp"/>
      <feMerge> <feMergeNode in="flood"/> <feMergeNode in="comp"/> </feMerge>
    </filter>
    <filter id="inFlood" filterUnits="objectBoundingBox" x="-5%" y="-5%" width="110%" height="110%">
      <feFlood flood-color="#ffffff" flood-opacity="1" result="flood"/>
      <feComposite in="SourceGraphic" in2="BackgroundImage" operator="in" result="comp"/>
      <feMerge> <feMergeNode in="flood"/> <feMergeNode in="comp"/> </feMerge>
    </filter>
    <filter id="outFlood" filterUnits="objectBoundingBox" x="-5%" y="-5%" width="110%" height="110%">
      <feFlood flood-color="#ffffff" flood-opacity="1" result="flood"/>
      <feComposite in="SourceGraphic" in2="BackgroundImage" operator="out" result="comp"/>
      <feMerge> <feMergeNode in="flood"/> <feMergeNode in="comp"/> </feMerge>
    </filter>
    <filter id="atopFlood" filterUnits="objectBoundingBox" x="-5%" y="-5%" width="110%" height="110%">
      <feFlood flood-color="#ffffff" flood-opacity="1" result="flood"/>
      <feComposite in="SourceGraphic" in2="BackgroundImage" operator="atop" result="comp"/>
      <feMerge> <feMergeNode in="flood"/> <feMergeNode in="comp"/> </feMerge>
    </filter>
    <filter id="xorFlood" filterUnits="objectBoundingBox" x="-5%" y="-5%" width="110%" height="110%">
      <feFlood flood-color="#ffffff" flood-opacity="1" result="flood"/>
      <feComposite in="SourceGraphic" in2="BackgroundImage" operator="xor" result="comp"/>
      <feMerge> <feMergeNode in="flood"/> <feMergeNode in="comp"/> </feMerge>
    </filter>
    <filter id="arithmeticFlood" filterUnits="objectBoundingBox" 
            x="-5%" y="-5%" width="110%" height="110%">
      <feFlood flood-color="#ffffff" flood-opacity="1" result="flood"/>
      <feComposite in="SourceGraphic" in2="BackgroundImage" result="comp"
                   operator="arithmetic" k1=".5" k2=".5" k3=".5" k4=".5"/>
      <feMerge> <feMergeNode in="flood"/> <feMergeNode in="comp"/> </feMerge>
    </filter>
    <filter id="overNoFlood" filterUnits="objectBoundingBox" x="-5%" y="-5%" width="110%" height="110%">
      <feComposite in="SourceGraphic" in2="BackgroundImage" operator="over" result="comp"/>
    </filter>
    <filter id="inNoFlood" filterUnits="objectBoundingBox" x="-5%" y="-5%" width="110%" height="110%">
      <feComposite in="SourceGraphic" in2="BackgroundImage" operator="in" result="comp"/>
    </filter>
    <filter id="outNoFlood" filterUnits="objectBoundingBox" x="-5%" y="-5%" width="110%" height="110%">
      <feComposite in="SourceGraphic" in2="BackgroundImage" operator="out" result="comp"/>
    </filter>
    <filter id="atopNoFlood" filterUnits="objectBoundingBox" x="-5%" y="-5%" width="110%" height="110%">
      <feComposite in="SourceGraphic" in2="BackgroundImage" operator="atop" result="comp"/>
    </filter>
    <filter id="xorNoFlood" filterUnits="objectBoundingBox" x="-5%" y="-5%" width="110%" height="110%">
      <feComposite in="SourceGraphic" in2="BackgroundImage" operator="xor" result="comp"/>
    </filter>
    <filter id="arithmeticNoFlood" filterUnits="objectBoundingBox" 
            x="-5%" y="-5%" width="110%" height="110%">
      <feComposite in="SourceGraphic" in2="BackgroundImage" result="comp"
                   operator="arithmetic" k1=".5" k2=".5" k3=".5" k4=".5"/>
    </filter>
    <path id="Blue100" d="M 0 0 L 100 0 L 100 100 z" fill="#00ffff" />
    <path id="Red100" d="M 0 0 L 0 100 L 100 0 z" fill="#ff00ff" />
    <path id="Blue50" d="M 0 125 L 100 125 L 100 225 z" fill="#00ffff" fill-opacity=".5" />
    <path id="Red50" d="M 0 125 L 0 225 L 100 125 z" fill="#ff00ff" fill-opacity=".5" />
    <g id="TwoBlueTriangles">
      <use xlink:href="#Blue100"/>
      <use xlink:href="#Blue50"/>
    </g>
    <g id="BlueTriangles">
      <use transform="translate(275,25)" xlink:href="#TwoBlueTriangles"/>
      <use transform="translate(400,25)" xlink:href="#TwoBlueTriangles"/>
      <use transform="translate(525,25)" xlink:href="#TwoBlueTriangles"/>
      <use transform="translate(650,25)" xlink:href="#TwoBlueTriangles"/>
      <use transform="translate(775,25)" xlink:href="#TwoBlueTriangles"/>
      <use transform="translate(900,25)" xlink:href="#TwoBlueTriangles"/>
    </g>
  </defs>

  <rect fill="none" stroke="blue" x="1" y="1" width="1098" height="648"/>
  <g font-family="Verdana" font-size="40" shape-rendering="crispEdges">
    <desc>Render the examples using the filters that draw on top of
          an opaque white surface, thus obliterating the background.</desc>
    <g enable-background="new">
      <text x="15" y="75">opacity 1.0</text>
      <text x="15" y="115" font-size="27">(with feFlood)</text>
      <text x="15" y="200">opacity 0.5</text>
      <text x="15" y="240" font-size="27">(with feFlood)</text>
      <use xlink:href="#BlueTriangles"/>
      <g transform="translate(275,25)">
        <use xlink:href="#Red100" filter="url(#overFlood)" />
        <use xlink:href="#Red50" filter="url(#overFlood)" />
        <text x="5" y="275">over</text>
      </g>
      <g transform="translate(400,25)">
        <use xlink:href="#Red100" filter="url(#inFlood)" />
        <use xlink:href="#Red50" filter="url(#inFlood)" />
        <text x="35" y="275">in</text>
      </g>
      <g transform="translate(525,25)">
        <use xlink:href="#Red100" filter="url(#outFlood)" />
        <use xlink:href="#Red50" filter="url(#outFlood)" />
        <text x="15" y="275">out</text>
      </g>
      <g transform="translate(650,25)">
        <use xlink:href="#Red100" filter="url(#atopFlood)" />
        <use xlink:href="#Red50" filter="url(#atopFlood)" />
        <text x="10" y="275">atop</text>
      </g>
      <g transform="translate(775,25)">
        <use xlink:href="#Red100" filter="url(#xorFlood)" />
        <use xlink:href="#Red50" filter="url(#xorFlood)" />
        <text x="15" y="275">xor</text>
      </g>
      <g transform="translate(900,25)">
        <use xlink:href="#Red100" filter="url(#arithmeticFlood)" />
        <use xlink:href="#Red50" filter="url(#arithmeticFlood)" />
        <text x="-25" y="275">arithmetic</text>
      </g>
    </g>
    <g transform="translate(0,325)" enable-background="new">
    <desc>Render the examples using the filters that do not obliterate
          the background, thus sometimes causing the background to continue
          to appear in some cases, and in other cases the background
          image blends into itself ("double-counting").</desc>
      <text x="15" y="75">opacity 1.0</text>
      <text x="15" y="115" font-size="27">(without feFlood)</text>
      <text x="15" y="200">opacity 0.5</text>
      <text x="15" y="240" font-size="27">(without feFlood)</text>
      <use xlink:href="#BlueTriangles"/>
      <g transform="translate(275,25)">
        <use xlink:href="#Red100" filter="url(#overNoFlood)" />
        <use xlink:href="#Red50" filter="url(#overNoFlood)" />
        <text x="5" y="275">over</text>
      </g>
      <g transform="translate(400,25)">
        <use xlink:href="#Red100" filter="url(#inNoFlood)" />
        <use xlink:href="#Red50" filter="url(#inNoFlood)" />
        <text x="35" y="275">in</text>
      </g>
      <g transform="translate(525,25)">
        <use xlink:href="#Red100" filter="url(#outNoFlood)" />
        <use xlink:href="#Red50" filter="url(#outNoFlood)" />
        <text x="15" y="275">out</text>
      </g>
      <g transform="translate(650,25)">
        <use xlink:href="#Red100" filter="url(#atopNoFlood)" />
        <use xlink:href="#Red50" filter="url(#atopNoFlood)" />
        <text x="10" y="275">atop</text>
      </g>
      <g transform="translate(775,25)">
        <use xlink:href="#Red100" filter="url(#xorNoFlood)" />
        <use xlink:href="#Red50" filter="url(#xorNoFlood)" />
        <text x="15" y="275">xor</text>
      </g>
      <g transform="translate(900,25)">
        <use xlink:href="#Red100" filter="url(#arithmeticNoFlood)" />
        <use xlink:href="#Red50" filter="url(#arithmeticNoFlood)" />
        <text x="-25" y="275">arithmetic</text>
      </g>
    </g>
  </g>
</svg>
  </el-card>
</ClientOnly>

可参考文章：

- [runebook](https://runebook.dev/zh/docs/svg/element/fecomposite)

#### feConvolveMatrix
`<feConvolveMatrix>` SVG过滤器原语将输入图像中的像素与相邻像素一起更改以生成结果图像。

可参考文章：

- [SVG\<feConvolveMatrix\>用法及代码示例](https://vimsky.com/examples/usage/svg-feconvolvematrix-element.html)
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feConvolveMatrix)
- [SVG 研究之路 (30) - filter - feConvolveMatrix](https://www.oxxostudio.tw/articles/201410/svg-30-filter-feConvolveMatrix.html)

#### 光照滤镜
> 参考自：[svg 光照滤镜浅析](https://zhuanlan.zhihu.com/p/27675600)

光照滤镜有几种：
按照明光线反射方式:
- `<feDiffuseLighting>` 漫反射滤镜
- `<feSpecularLighting>` 镜面反射滤镜

按光线效果:

- `<fePointLight>` 光点源效果滤镜
- `<feSpotLight>` 聚光灯效果滤镜
- `<feDistantLight>` 远光源效果滤镜

:::details 点击查看源代码
```html
<h2>feDiffuseLighting</h2>
<svg width="440" height="140" xmlns="http://www.w3.org/2000/svg">
    <!-- the light source is a fePointLight element -->
    <text text-anchor="middle" x="70" y="18">fePointLight</text>
    <filter id="lightMe1">
        <feDiffuseLighting in="SourceGraphic" result="light"
                           lighting-color="red">
            <fePointLight x="50" y="60" z="20" />
        </feDiffuseLighting>
    </filter>
    <circle cx="70" cy="80" r="50" fill="green"
            filter="url(#lightMe1)" />
    <!-- the light source is a feDistantLight element -->
    <text text-anchor="middle" x="180" y="18">feDistantLight</text>
    <filter id="lightMe2">
        <feDiffuseLighting in="SourceGraphic" result="light"
                           lighting-color="red">
            <feDistantLight azimuth="140" elevation="20"/>
        </feDiffuseLighting>
    </filter>
    <circle cx="180" cy="80" r="50" fill="green"
            filter="url(#lightMe2)" />
    <!-- the light source is a feSpotLight source -->
    <text text-anchor="middle" x="290" y="18">feSpotLight</text>
    <filter id="lightMe3">
        <feDiffuseLighting in="SourceGraphic" result="light"
                           lighting-color="red">
            <feSpotLight x="260" y="5" z="30" limitingConeAngle="20"
                         pointsAtX="290" pointsAtY="80" pointsAtZ="0"/>
        </feDiffuseLighting>
    </filter>
    <circle cx="290" cy="80" r="50" fill="green"
            filter="url(#lightMe3)" />
</svg>
<h2>feSpecularLighting</h2>
<svg width="440" height="140" xmlns="http://www.w3.org/2000/svg">
    <!-- the light source is a fePointLight element -->
    <text text-anchor="middle" x="70" y="18">fePointLight</text>
    <filter id="lightMe21">
        <feSpecularLighting in="SourceGraphic" result="light"
                           lighting-color="red">
            <fePointLight x="50" y="60" z="20" />
        </feSpecularLighting>
    </filter>
    <circle cx="70" cy="80" r="50" fill="green"
            filter="url(#lightMe21)" />
    <!-- the light source is a feDistantLight element -->
    <text text-anchor="middle" x="180" y="18">feDistantLight</text>
    <filter id="lightMe22">
        <feSpecularLighting in="SourceGraphic" result="light"
                           lighting-color="red">
            <feDistantLight azimuth="140" elevation="20"/>
        </feSpecularLighting>
    </filter>
    <circle cx="180" cy="80" r="50" fill="green"
            filter="url(#lightMe22)" />
    <!-- the light source is a feSpotLight source -->
    <text text-anchor="middle" x="290" y="18">feSpotLight</text>
    <filter id="lightMe23">
        <feSpecularLighting in="SourceGraphic" result="light"
                           lighting-color="red">
            <feSpotLight x="260" y="5" z="30" limitingConeAngle="20"
                         pointsAtX="290" pointsAtY="80" pointsAtZ="0"/>
        </feSpecularLighting>
    </filter>
    <circle cx="290" cy="80" r="50" fill="green"
            filter="url(#lightMe23)" />
</svg>
```
:::

<ClientOnly>
    <el-card class="card">
      <svg height="130" width="120">
        <defs>
          <radialGradient id="gradient">
            <stop offset="0" stop-color="red" stop-opacity="0"/>
            <stop offset=".5" stop-color="red" stop-opacity="1"/>
            <stop offset="1" stop-color="red" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="70" cy="50" fill="url(#gradient)" r="50"/>
        <text font-size="12" x="50" y="115">无光照</text>
      </svg>
      <svg height="340" width="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gradient">
            <stop offset="0" stop-color="red" stop-opacity="0"/>
            <stop offset=".5" stop-color="red" stop-opacity="1"/>
            <stop offset="1" stop-color="red" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <filter id="lightMe1">
          <feDiffuseLighting :diffuseConstant="diffuseAndSpecularConstant" :surfaceScale="surfaceScale"
                             in="SourceGraphic" lighting-color="red" result="light">
            <fePointLight :x="x" :y="y" :z="z"/>
          </feDiffuseLighting>
        </filter>
        <filter id="lightMe2">
          <feDiffuseLighting :diffuseConstant="diffuseAndSpecularConstant" :surfaceScale="surfaceScale"
                             in="SourceGraphic" lighting-color="red" result="light">
            <feDistantLight :azimuth="azimuth" :elevation="elevation"/>
          </feDiffuseLighting>
        </filter>
        <filter id="lightMe3">
          <feDiffuseLighting :diffuseConstant="diffuseAndSpecularConstant" :surfaceScale="surfaceScale"
                             in="SourceGraphic" lighting-color="red" result="light">
            <feSpotLight :pointsAtX="pointsAtX" :pointsAtY="pointsAtY" :pointsAtZ="pointsAtZ" :x="x"
                         :y="y" :z="z" limitingConeAngle="20" :limiting-cone-angle="limitingConeAngle"/>
          </feDiffuseLighting>
        </filter>
        <filter id="lightMe21">
          <feSpecularLighting :specularConstant="diffuseAndSpecularConstant" :specularExponent="specularExponent"
                              :surfaceScale="surfaceScale" in="SourceGraphic"
                              lighting-color="red" result="light">
            <fePointLight :x="x" :y="y" :z="z"/>
          </feSpecularLighting>
        </filter>
        <filter id="lightMe22">
          <feSpecularLighting :specularConstant="diffuseAndSpecularConstant" :specularExponent="specularExponent"
                              :surfaceScale="surfaceScale" in="SourceGraphic"
                              lighting-color="red" result="light">
            <feDistantLight :azimuth="azimuth" :elevation="elevation"/>
          </feSpecularLighting>
        </filter>
        <filter id="lightMe23">
          <feSpecularLighting :specularConstant="diffuseAndSpecularConstant" :specularExponent="specularExponent"
                              :surfaceScale="surfaceScale" in="SourceGraphic"
                              lighting-color="red" result="light">
            <feSpotLight :pointsAtX="pointsAtX" :pointsAtY="pointsAtY" :pointsAtZ="pointsAtZ" :x="x"
                         :y="y" :z="z" limitingConeAngle="20" :limiting-cone-angle="limitingConeAngle"/>
          </feSpecularLighting>
        </filter>
        <text font-weight="900" x="10" y="15">feDiffuseLighting 漫反射</text>
        <circle cx="70" cy="80" fill="url(#gradient)" filter="url(#lightMe1)"
                r="50"/>
        <text font-size="12" x="10" y="155">fePointLight 点光源</text>
        <circle cx="200" cy="80" fill="url(#gradient)" filter="url(#lightMe2)"
                r="50"/>
        <text font-size="12" x="140" y="155">feDistantLight 远光源</text>
        <circle cx="330" cy="80" fill="url(#gradient)" filter="url(#lightMe3)"
                r="50"/>
        <text font-size="12" x="270" y="155">feSpotLight 聚光灯</text>
        <text font-weight="900" x="10" y="180">feSpecularLighting 镜面反射</text>
        <circle cx="70" cy="250" fill="url(#gradient)" filter="url(#lightMe21)"
                r="50"/>
        <text font-size="12" x="10" y="325">fePointLight 点光源</text>
        <circle cx="200" cy="250" fill="url(#gradient)" filter="url(#lightMe22)"
                r="50"/>
        <text font-size="12" x="140" y="325">feDistantLight 远光源</text>
        <circle cx="330" cy="250" fill="url(#gradient)" filter="url(#lightMe23)"
                r="50"/>
        <text font-size="12" x="270" y="325">feSpotLight 聚光灯</text>
      </svg>
      <div style="display:flex;flex-wrap: wrap;gap:20px;width: 500px">
        <div>
          <p>surfaceScale</p>
          <el-slider v-model="surfaceScale" :max="100" :min="0" style="width: 200px"/>
        </div>
        <div>
          <p>diffuseConstant/specularConstant</p>
          <el-slider v-model="diffuseAndSpecularConstant" :max="2" :min="0" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>feSpecularLighting的specularExponent</p>
          <el-slider v-model="specularExponent" :max="10" :min="0" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>feDistantLight的azimuth</p>
          <el-slider v-model="azimuth" :max="180" :min="0" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>feDistantLight的elevation</p>
          <el-slider v-model="elevation" :max="180" :min="0" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>fePointLight和feSpotLight的x</p>
          <el-slider v-model="x" :max="200" :min="-200" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>fePointLight和feSpotLight的y</p>
          <el-slider v-model="y" :max="200" :min="-200" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>fePointLight和feSpotLight的z</p>
          <el-slider v-model="z" :max="200" :min="-200" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>feSpotLight的pointsAtX</p>
          <el-slider v-model="pointsAtX" :max="300" :min="-300" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>feSpotLight的pointsAtY</p>
          <el-slider v-model="pointsAtY" :max="300" :min="-300" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>feSpotLight的pointsAtZ</p>
          <el-slider v-model="pointsAtZ" :max="300" :min="-300" :step="0.01" style="width: 200px"/>
        </div>
        <div>
          <p>feSpotLight的limitingConeAngle</p>
          <el-slider v-model="limitingConeAngle" :max="90" :min="0" :step="0.01" style="width: 200px"/>
        </div>
      </div>
    </el-card>
  </ClientOnly>

属性：

***feDiffuseLighting与feSpecularLighting的属性***

- `surfaceScale` 是指的引用滤镜的元素(即示例中的circle元素)中透明度为1的几何位置的高度(即向屏幕方向突出的高度),因此下面的示例借助了渐变色。
- `diffuseConstant` 是指的是漫反射的强度，值越大，光线越亮，值越小，光线越暗
- `specularConstant` 是指的是镜面反射的强度，值越大，光线越暗，值越小，光线越亮
- `specularExponent` 是指的是镜面的光洁程度，镜面越光洁那么光线的漫反射就越小

***feDistantLight的属性***

- `azimuth` 指的是光源在xy平面上面上面的位置,这是一个角度值，指的是当前用户坐标系统下面相对于x轴顺时针方向的角度即为光源位置。
- `elevation` 指的是光源与xy平面之间的角度

***fePointLight***

- `x` 指的是在光源中心在当前用户坐标系统中的位置
- `y` 指的是在光源中心在当前用户坐标系统中的位置
- `z` 指的是光源距离xy平面的距离(显然距离越远光点看起来越大,可以回家用手电筒照照墙面试试)

***feSpotLight***

- `x,y,z` 和上面的 `fePointLight` 的对应属性意义是相同的，都表示光源的坐标位置
- `pointsAtX`, `pointsAtY`, `pointsAtZ` 指的是光源中心照向界面的坐标位置
- `limitingConeAngle` 指的是从光源发射的光线与光照指向的目标点连线之间角度小于该属性指定的值的光线才会存在,超出这个角度的光线会被忽略掉.


#### feDisplacementMap
`<feDisplacementMap>` 一个位置替换滤镜，就是改变元素和图形的像素位置的。map含义和ES5中数组的map方法是一样的，遍历原图形的所有像素点，使用feDisplacementMap重新映射替换一个新的位置，形成一个新的图形，公式如下：

```html
P'(x,y) ← P( x + scale * (XC(x,y) - 0.5), y + scale * (YC(x,y) - 0.5))
```
解释如下：

- P'(x,y)指的是转换之后的x, y坐标。
- x + scale * (XC(x,y) - 0.5), y + scale * (YC(x,y) - 0.5)指的是具体的转换规则。
- XC(x,y)表示当前x,y坐标像素点其X轴方向上设置的对应通道的计算值，范围是0~1。
- YC(x,y)表示当前x,y坐标像素点其Y轴方向上设置的对应通道的计算值，范围是0~1。
- -0.5是偏移值，因此XC(x,y) - 0.5范围是-0.5~0.5，YC(x,y) - 0.5范围也是-0.5~0.5
- scale表示计算后的偏移值相乘的比例，scale越大，则偏移越大。

一句话解释就是，根据设定的通道颜色对原图的x, y坐标进行偏移。

`<feDisplacementMap>` 的属性如下：

- `xChannelSelector` 对应XC(x,y)，表示X轴坐标使用的是哪个颜色通道进行位置偏移,可以是R、G、B、A中的任意一个。
- `yChannelSelector` 对应YC(x,y)，表示Y轴坐标使用的是哪个颜色通道进行位置偏移
- `scale` 对应公式里面的缩放比例scale，表示偏移的比例。
- `color-interpolation-filters` 表示滤镜对颜色进行计算时候采用的颜色模式类型。分为linearRGB（默认值）和sRGB。
- `in` 表示输入的原始图形
- `in2` 表示用来映射的图形

可参考文章：
- [深入理解SVG feDisplacementMap滤镜及实际应用](https://www.zhangxinxu.com/wordpress/2017/12/understand-svg-fedisplacementmap-filter/)
- [svg滤镜详解之feDisplacementMap滤镜](https://juejin.cn/post/7174024478081417229)

#### feFlood
该滤镜用`flood-color`元素定义的颜色和`flood-opacity`元素定义的不透明度填充了滤镜子区域。
可参考文章：
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feFlood)

#### feGaussianBlur
该滤镜用于定义模糊效果,前面文章已经使用过：[#滤镜的混合使用](#滤镜的混合使用)这里不做过多介绍

#### felmage
`<feImage>` 滤镜从外部来源取得图像数据，并提供像素数据作为输出（意味着如果外部来源是一个 SVG 图像，这个图像将被栅格化。）,通过 `xlink:href` 属性引用外部图像,例如：
```html
<feImage xlink:href="./test.svg" />
```

#### feMerge
`<feMerge>` 滤镜允许同时应用滤镜效果而不是按顺序应用滤镜效果。利用result存储别的滤镜的输出可以实现这一点，然后在一个 `<feMergeNode>` 子元素中访问它，前面文章已经使用过：[#滤镜的混合使用](#滤镜的混合使用)这里不做过多介绍。

#### feMorphology
`feMorphology` 为形态滤镜，它的输入源通常是图形的 `alpha` 通道，用来它的两个操作可以使源图形腐蚀（变薄）或扩张（加粗）。

使用属性 `operator` 确定是要腐蚀效果还是扩张效果。使用属性 `radius` 表示效果的程度，可以理解为笔触的大小。

- `operator` ：erode 腐蚀模式，dilate 为扩张模式，默认为 erode
- `radius` ：笔触的大小，接受一个数字，表示该模式下的效果程度，默认为 0

示例如下：
```html
<svg width="0" height="0">
  <filter id="dilate">
    <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="3"></feMorphology>
  </filter>
  <filter id="erode">
    <feMorphology in="SourceAlpha" result="ERODE" operator="erode" radius="1"></feMorphology>
  </filter>
</svg>
<div>
  <p style="font-size: 64px;margin-bottom: 1em">feMorphology</p>
  <p class="dilate" style="filter:url(#dilate);font-size: 64px;margin-bottom: 1em">feMorphology</p>
  <p class="erode" style="filter: url(#erode);font-size: 64px;margin-bottom: 1em">feMorphology</p>
</div>
```
<ClientOnly>
  <el-card class="card">
    <svg width="0" height="0">
        <filter id="dilate">
            <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="3"></feMorphology>
        </filter>
        <filter id="erode">
            <feMorphology in="SourceAlpha" result="ERODE" operator="erode" radius="1"></feMorphology>
        </filter>
    </svg>
    <div>
      <p style="font-size: 64px;margin-bottom: 1em">feMorphology</p>
      <p class="dilate" style="filter:url(#dilate);font-size: 64px;margin-bottom: 1em">feMorphology</p>
      <p class="erode" style="filter: url(#erode);font-size: 64px;margin-bottom: 1em">feMorphology</p>
    </div>
  </el-card>
</ClientOnly>

<br>

#### feOffset
该滤镜允许偏移输入图像，输入图像作为一个整体偏移 `dx` 和 `dy` 属性中指定的值。前面文章已经使用过：[#滤镜的混合使用](#滤镜的混合使用)这里不做过多介绍。

#### feTile
该滤镜允许使用输入图像的重复平铺图案填充目标矩形。效果类似于 `<pattern>` 的效果。

可参考文章：
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feTile)

#### feTurbulence
该滤镜利用 `Perlin` 噪声函数创建了一个图像。它实现了人造纹理比如说云纹、大理石纹的合成。

`<feTurbulence>`有三个属性：

- `type`： 实现的滤镜的类型，可选 `fractalNoise` 分形噪声，或者是 `turbulence` 湍流噪声。
  - `fractalNoise`：分形噪声更加的平滑，它产生的噪声质感更接近云雾
  - `turbulence`：湍流噪声
- `baseFrequency`： 表示噪声函数的基本频率的参数，频率越小，产生的图形越大，频率越大，产生的噪声越复杂其图形也越小越精细，通常的取值范围在 0.02 ~ 0.2
- `numOctaves`：表示噪声函数的精细度，数值越高，产生的噪声更详细。 默认值为1
- `seed`：表示feTurbulence滤镜效果中伪随机数生成的起始值
- `stitchTiles`：定义了Perlin噪声在边框处的行为表现。

<ClientOnly>
  <el-card class="card">
    <svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise" x="0" y="0" width="100%" height="100%">
        <feTurbulence id="feTurbulence" :baseFrequency="feTurbulenceBaseFrequency" :numOctaves="feTurbulenceNumOctaves" :seed="feTurbulenceSeed" :type="feTurbulenceType" :stitchTiles="feTurbulenceStitchTiles"/>
      </filter>
      <rect x="0" y="0" width="300" height="200" style="filter: url(#noise);" />
    </svg>
    <div> 
      <p>baseFrequency</p>
      <el-slider v-model="feTurbulenceBaseFrequency" :max="2" :min="0.01" :step="0.001" style="width: 200px"/>
     </div>
    <div> 
      <p>numOctaves</p>
      <el-slider v-model="feTurbulenceNumOctaves" :max="5" :min="1" :step="1" style="width: 200px"/>
     </div>
    <div> 
      <p>seed</p>
      <el-slider v-model="feTurbulenceSeed" :max="200" :min="0" :step="1" style="width: 200px"/>
     </div>
    <div> 
      <p>type</p>
      <el-select v-model="feTurbulenceType" size="small" style="width: 150px">
       <el-option label="turbulence" value="turbulence"/>
       <el-option label="fractalNoise" value="fractalNoise"/>
      </el-select>
     </div>
    <div> 
      <p>type</p>
      <el-select v-model="feTurbulenceStitchTiles" size="small" style="width: 150px">
       <el-option label="noStitch" value="noStitch"/>
       <el-option label="stitch" value="stitch"/>
      </el-select>
     </div>
  </el-card>
</ClientOnly>
