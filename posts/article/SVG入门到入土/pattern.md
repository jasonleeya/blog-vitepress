## Pattern
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
