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
<ClientOnly>
  <el-card class="card">
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="20">
      <text x="10" y="15" fill="red" text-decoration="underline">SVG从入门到入土</text>
    </svg>
  </el-card>
</ClientOnly>

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

<ClientOnly>
  <el-card class="card">
    <svg xmlns="http://www.w3.org/2000/svg" width="180" height="80">
      <text x="10" y="30" fill="red">
        <tspan>SVG从入门到入土</tspan>
        <tspan font-size="12" baseline-shift="super">2</tspan>
        <tspan x="10" y="50" rotate="30">SVG从入门到入土</tspan>
      </text>
    </svg>
  </el-card>
</ClientOnly>

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
<ClientOnly>
  <el-card class="card">
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="150">
      <defs>
        <path id="path" d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"></path>
      </defs>
      <text>
        <textPath fill="red" xlink:href="#path" startOffset="50%" text-anchor="middle">
          SVG从入门到入土SVG从入门到入土SVG从入门到入土SVG从入门到入土SVG从入门到入土
        </textPath>
      </text>
    </svg>
  </el-card>
</ClientOnly>
