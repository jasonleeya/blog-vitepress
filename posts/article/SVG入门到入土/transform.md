## 基础变形
与 `CSS` 中的 `transform` 一样，`SVG` 中的变形也是通过 `transform` 实现的，只不过 `SVG` 中的变形不用写到 `CSS` 中，而是通过 `transform` 属性直接设置，比如下面的例子。

### 平移
```html
<rect x="10" y="10" width="20" height="20" transform="translate(60,60)"/>
```
<ClientOnly>
  <el-card class="card">
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect x="10" y="10" width="20" height="20" stroke="red" fill="none" stroke-dasharray="2,2"/>
      <rect x="10" y="10" width="20" height="20" transform="translate(60,60)" stroke="red" fill="none"/>
    </svg>
  </el-card>
</ClientOnly>

### 旋转
和CSS中的 `transform:rotate()` 不同的的是，SVG中的 `transform:rotate()` 传3个值，第一个是角度必填，第2，3个是旋转中心点坐标，默认是左上角坐标原点。

```html
<rect x="10" y="10" width="20" height="20" transform="rotate(45)"/>
```
<ClientOnly>
  <el-card class="card">
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect x="25" y="25" width="50" height="50" stroke="red" fill="none" stroke-dasharray="2,2"/>
      <rect x="25" y="25" width="50" height="50" transform="rotate(45,50,50)" stroke="red" fill="none"/>
    </svg>
  </el-card>
</ClientOnly>

### 缩放
```html
<rect x="10" y="10" width="20" height="20" transform="scale(1.5,2)"/>
```
<ClientOnly>
  <el-card class="card">
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect x="10" y="10" width="20" height="20" stroke="red" fill="none" stroke-dasharray="2,2"/>
      <rect x="10" y="10" width="20" height="20" transform="scale(1.5,2)" stroke="red" fill="none"/>
    </svg>
  </el-card>
</ClientOnly>

### 倾斜

**skewX**
```html
<rect x="20" y="0" width="50" height="50" transform="skewX(30)"/>
```
<ClientOnly>
  <el-card class="card">
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect x="20" y="0" width="50" height="50" stroke="red" fill="none" stroke-dasharray="2,2"/>
      <rect x="20" y="0" width="50" height="50" transform="skewX(30)" stroke="red" fill="none"/>
    </svg>
  </el-card>
</ClientOnly>

**skewY**
```html
<rect x="0" y="20" width="50" height="50" transform="skewY(30)"/>
```
<ClientOnly>
  <el-card class="card">
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect x="0" y="20" width="50" height="50" stroke="red" fill="none" stroke-dasharray="2,2"/>
      <rect x="0" y="20" width="50" height="50" transform="skewY(30)" stroke="red" fill="none"/>
    </svg>
  </el-card>
</ClientOnly>
