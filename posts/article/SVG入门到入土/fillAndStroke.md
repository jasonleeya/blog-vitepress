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
