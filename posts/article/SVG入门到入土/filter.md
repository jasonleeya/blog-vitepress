## 滤镜效果
> 参考自[有意思！强大的 SVG 滤镜](https://juejin.cn/post/6943032791122575390)

SVG可以使用 `<filter>` 标签定义滤镜。对，你没有看错，SVG可以像PS处理照片那样添加滤镜效果，让SVG如虎添翼，能够实现出各种各样的效果。

### SVG滤镜的种类

在SVG中可以用的滤镜效果有很多：

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
在 `<defs>` 元素中定义的元素不会直接呈现，而实需要在别处通过 `id` 引用他们。

:::info 提示
现在，基本上现代浏览器，即使不使用 `<defs>` 包裹 `<filter>`，也能够定义一个 SVG 滤镜，但为了兼容性，我们尽量还是遵守原来的规则。
:::
