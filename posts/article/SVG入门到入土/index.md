---
category: 文章
tags:
  - SVG
---

<script setup>
import Read from "@components/Read.vue";
import CanvasSvgCompare from "./CanvasSvgCompare.vue";
import SvgWave from "./SvgWave.vue";
import {ref} from 'vue';
import {withBase} from 'vitepress';

const arcXr = ref(0);
const arcMx = ref(160);
const arcMy = ref(180);
const arcX = ref(240);
const arcY = ref(220);
const arcRx = ref(100);
const arcRy = ref(50);
const arcLaf = ref(0);
const arcSf = ref(0);
const blendModeList = ['normal','multiply','screen','overlay','darken','lighten'];
const currentBlendMode = ref(blendModeList[0]);
const feColorMatrixTypeList = ['saturate','hueRotate','luminanceToAlpha'];
const currentFeColorMatrixType = ref('saturate');
const feColorMatrixValue = ref(1);

const surfaceScale = ref(10);
const diffuseAndSpecularConstant = ref(1);
const specularExponent = ref(0);
const azimuth = ref(140);
const elevation = ref(20);
const x = ref(260);
const y = ref(2);
const z = ref(30);
const pointsAtX = ref(290);
const pointsAtY = ref(80);
const pointsAtZ = ref(0);
const limitingConeAngle = ref(0);
const feTurbulenceBaseFrequency = ref(0);
const feTurbulenceNumOctaves = ref(1);
const feTurbulenceSeed = ref(0);
const feTurbulenceType = ref('turbulence');
const feTurbulenceStitchTiles = ref('noStitch');
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

![cover](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2023_12/svg.svg)

# SVG入门到入土

相信绝大多数前端同学都不愿意自己手写SVG代码吧，图片上的事情都是直接交给UI省事的多，但是我学习了SVG的基础用法之后，发现SVG还是可以给平时开发带来很大便利的，至少可以简单的修改SVG属性以及使用SVG做出简单的效果。此篇文章是我学习SVG的全过程，我将查阅到的资料综合起来并加入一些我的个人见解和实现的例子，记录下来，方便日后查阅，得益于VitePress提供markdown拓展能力，可以在markdown中直接编写Vue代码,文章中所有例子我都没有使用效果截图，而实直接展示代码效果。文中部分内容参考自他人的文章，我已注明出处。我也希望此篇文章能帮助到其他前端小伙伴入门SVG，一起享受SVG带来的便利。


<!--@include: ./base.md-->
<!--@include: ./path.md-->
<!--@include: ./fillAndStroke.md-->
<!--@include: ./gradient.md-->
<!--@include: ./pattern.md-->
<!--@include: ./text.md-->

## 图片
SVG使用 `<image>` 标签引入图片，其有5个属性，分别是：`src`、`x`、`y`、`width`、`height`。
```html
<svg>
  <image src="/logo.svg" x="0" y="0" width="100" height="100"></image>
</svg>
```

<!--@include: ./transform.md-->
<!--@include: ./filter.md-->

## 参考
### 元素
[MDN/SVG/参考/元素](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/a)

### 属性
[MDN/SVG/参考/属性](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/accent-height)
