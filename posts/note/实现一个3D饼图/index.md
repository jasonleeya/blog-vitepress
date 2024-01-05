---
category: 笔记
tags:
  - JavaScript
  - Three.js
cover: https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2024_01/pie_chart_3d.png
---
<script setup>import Read from "@components/Read.vue";</script>

<read/>

<iframe src="https://demos.lsj97.com/#/pieChart3d" style="width:100%;height:400px"></iframe>

<br>

# 实现一个3D饼图

当拿到UI给的上面3D饼图 **(实际效果，可鼠标交互)** 的设计图时，相信大多数小伙伴都会撂下一句：“实现不了，改设计”，我的第一反应是：“Echarts这么强大，应该有现成吧？做出来没有问题”，但是我翻遍 Echarts 官方示例和自定义示例，我发现我高估 Echarts 了，Echarts 没有现成的 3D饼图。

网上能查找到的一个近似的是实现是[ECharts 3D 饼图近似实现](https://zhuanlan.zhihu.com/p/162792579)，网上其他所有的实现都是基于这篇文章改编的。我心想：这种方式实现的效果虽然不怎么理想，但是我可以读懂它的代码后给他自定义美化呀，于是乎我便研究了它的源码，但是看了它的源码，我始终无法理解它是如何实现扇形的,作者duang的一下甩出下面一段"曲面参数方程"，令我百思不得其解：

:::details 点击查看源码
```javascript
function getParametricEquation(startRatio, endRatio, isSelected, isHovered) {

  // ......
  
  // 返回曲面参数方程
  return {
    u: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 100
    },
    v: {
      min: 0,
      max: Math.PI,
      step: Math.PI / 50
    },
    x: function(u, v) {
      if (midRatio - 0.5 < 0) {
        if (u < startRadian || u > midRadian + Math.PI) {
          tmp = u - Math.PI - midRadian < 0 ? u + Math.PI - midRadian : u - Math.PI - midRadian;
          return offsetX + Math.sin(startRadian) * tmp / (Math.PI - midRadian + startRadian) * hoverRate;
        }
        if (u > endRadian && u < midRadian + Math.PI) {
          tmp = midRadian + Math.PI - u;
          return offsetX + Math.sin(endRadian) * tmp / (Math.PI - midRadian + startRadian) * hoverRate;
        }
      } else {
        if (u < startRadian && u > midRadian - Math.PI) {
          tmp = u + Math.PI - midRadian;
          return offsetX + Math.sin(startRadian) * tmp / (Math.PI - midRadian + startRadian) * hoverRate;
        }
        if (u > endRadian || u < midRadian - Math.PI) {
          tmp = midRadian - Math.PI - u < 0 ? midRadian + Math.PI - u : midRadian - Math.PI - u;
          return offsetX + Math.sin(endRadian) * tmp / (Math.PI - midRadian + startRadian) * hoverRate;
        }
      }
      return offsetX + Math.sin(v) * Math.sin(u) * hoverRate;
    },
    y: function(u, v) {
      if (midRatio - 0.5 < 0) {
        if (u < startRadian || u > midRadian + Math.PI) {
          tmp = u - Math.PI - midRadian < 0 ? u + Math.PI - midRadian : u - Math.PI - midRadian;
          return offsetY + Math.cos(startRadian) * tmp / (Math.PI - midRadian + startRadian) * hoverRate;
        }
        if (u > endRadian && u < midRadian + Math.PI) {
          tmp = midRadian + Math.PI - u;
          return offsetY + Math.cos(endRadian) * tmp / (Math.PI - midRadian + startRadian) * hoverRate;
        }
      } else {
        if (u < startRadian && u > midRadian - Math.PI) {
          tmp = u + Math.PI - midRadian;
          return offsetY + Math.cos(startRadian) * tmp / (Math.PI - midRadian + startRadian) * hoverRate;
        }
        if (u > endRadian || u < midRadian - Math.PI) {
          tmp = midRadian - Math.PI - u < 0 ? midRadian + Math.PI - u : midRadian - Math.PI - u;
          return offsetY + Math.cos(endRadian) * tmp / (Math.PI - midRadian + startRadian) * hoverRate;
        }
      }
      return offsetY + Math.sin(v) * Math.cos(u) * hoverRate;
    },
    z: function(u, v) {
      return Math.cos(v) > 0 ? 0.1 : -0.1;
    }
  };
}
```
:::

作者并没有对此段代码做出任何解释，代码经过复杂的函数计算最终得出一个扇形，看到这里，我失去了对它研究的兴趣，打算放弃。等等，我是不是找错了方向？需求是实现一个3D饼状图，我为什么不用web 3D区的扛把子——Three.js来实现呢？有了正确思路，说干就干。如果你对 Three.js 还不了解，可以先阅读 [ThreeJs简单入门](/posts/article/ThreeJs简单入门/)。




