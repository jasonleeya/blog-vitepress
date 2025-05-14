---
category: 笔记
tags:
  - CSS
  - JavaScript
cover: https://file.lsj97.com/imgs/2025_05/text_shadow.png
---
<script setup>
import {onMounted} from "vue";
import Read from "@components/Read.vue";
import TextShadow from "./TextShadow.vue";

onMounted(()=>{
  document.querySelector('h1').style.display = 'none'
})
</script>
<ClientOnly>
  <read></read>
  <TextShadow/>
</ClientOnly>


# 可交互文字阴影

可以看到上面的示例，当鼠标移动时，文字阴影会实时响应光源位置，这是怎么实现的呢？其实非常简单，只需要一点点 CSS 与 加上 JavaScript 监听鼠标位置并计算阴影的改变，下面直接给出实现代码，我再对重要步骤做出解释。

## 实现代码

```vue
<template>
  <div class="container"
       @mousemove="handleMouseMove"
       :style="{
         '--skew': `${skew}deg`,
         '--scaleY': scaleY
       }">
    <span class="text" data-text="TEXT SHADOW">
      TEXT SHADOW
    </span>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

console.log(window.innerHeight / 3)
const windowWidth = window.innerWidth
const windowHeight = window.innerHeight
let mouseX = 0
let mouseY = 0
const skew = ref(0)
const scaleY = ref(0.5)

const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  skew.value = 180 * (mouseX - windowWidth / 2) / windowWidth

  if (mouseY > windowHeight / 2) {
    scaleY.value = (mouseY - windowHeight / 2) / (windowHeight / 2) + 0.5
  } else {
    scaleY.value = 0.5 - 0.5 * (1 - mouseY / (windowHeight / 2)) * 0.8
  }
}

</script>

<style scoped lang="scss">
.container {
  --skew: 0deg;
  --scaleY: 0.5;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #CBD2D5;
  font-weight: bold;
  overflow: hidden;

  .text {
    font-size: 100px;
    color: #fff;
    position: relative;
    z-index: 1;
    line-height: 0.76;
    font-family: Arial, sans-serif;

    &:after {
      content: attr(data-text);
      color: #000;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      bottom: 0;
      z-index: -1;
      //transform: translate(-2px, -2px) scaleY(var(--scaleY)) skew(var(--skew));
      transform-origin: 0 100%;
      //mask: linear-gradient(rgba(0, 0, 0, 0.2) 0%, #000 100%);
      filter: blur(5px);
    }
  }
}
</style>

```

## 分析

### HTML
`HTML`就两个元素，一个容器组件`.container`包含文字元素`.span`。

### CSS
`CSS`重要代码在`.text`元素的`::after`伪元素上，在`.text`将文字内容设置到属性`data-text`上，这样伪元素就可以通过`attr(data-text)`将文字内容设置到`content`上，接下来，设置位置和`.text`重合，设置元素的`z-index`调整层级，再设置`transform-origin: 0 100%;`，将`transform`中心设置到文字底部，`transform`主要改变`skew`和`scaleY`两个属性，由于要用根据鼠标位置动态改变这两个属性，我们将它们设置成属性变量设置到`.container`上，最后，设置` filter: blur(5px)`产生阴影效果。

## JavaScript
`JavaScript`部分逻辑在于监听`mousemove`获取鼠标`clientX`和`clientY`,在计算出`skew`和`scaleY`。
以文字中心为坐标，通过分析可以得出，鼠标`X`在屏幕两侧时，`skew`的旋转角度的绝对值为最大的180°，所以可以的出`skew`的计算公式:

```javascript
  skew.value = 180 * (mouseX - windowWidth / 2) / windowWidth
```
再分析鼠标在`Y`轴上的影响，在文字下方，也就是`mouseY > windowHeight / 2`时，鼠标离文字越远阴影`scaleY`值越大，将鼠标在`windowsHeight / 2`到`windowsHeight`的变化映射到`scalecY` `0 - 1`的变化可以的出这个式子：`(mouseY - windowHeight / 2) / (windowHeight / 2)`,但我们要的效果不是 `0 - 1`的变化，在鼠标重合文字的时候影子为0了看上去不符合常理，而鼠标离得很远的时候影子可能比实物要长，所以我们适当加上0.5，也就得到鼠标在`mouseY > windowHeight / 2`时的计算方法：
```javascript
scaleY.value = (mouseY - windowHeight / 2) / (windowHeight / 2) + 0.5
```
当鼠标在文字上方也就是 `mouseY < windowHeight / 2`时`scaleY`的变化范围也不是`1 - 0`，因为在上面的计算中，鼠标在和文字重合就已经是`0.5`了，所以变化范围是`0.5 - 0`,由此可以得出计算方法：
```javascript
0.5 - 0.5 * (1 - mouseY / (windowHeight / 2))
```

## 总结
经过上面简单的步骤我们便轻松实现了文字阴影跟随鼠标变化的效果。虽然这个效果在项目中不大可能用得上，但是却完整的体现了我突发奇想，思考实现方式以及得出成果的过程，相信能对大家平时的开发产生一些启发。
