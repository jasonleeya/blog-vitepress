---
category: 笔记
tags:
  - CSS
  - JavaScript
description: 最近偶然发现一个令人惊艳的卡牌效果网站 Poke-Holo，其动态全息效果和3D交互令人印象深刻。出于学习目的，我决定尝试复刻这个效果，以下是实现过程的完整记录。
cover: https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2025_05/pokemon.svg
---
<script setup>
import Read from "@components/Read.vue";
import Card from './components/Card.vue';
import Step1 from './components/Step1.vue';
import Step2 from './components/Step2.vue'
</script>

<ClientOnly>
  <read></read>
</ClientOnly>

<Card/>


# 可互动宝可梦卡复刻


最近偶然发现一个令人惊艳的宝可梦卡片网站 [Poke-Holo](https://poke-holo.simey.me/)，其动态交互令人印象深刻。出于学习目的，我决定尝试用vue简单复刻这个效果(主要复刻鼠标交互效果和简单的光影效果)，以下是实现过程的完整记录。

## 一、效果解析
通过开发者工具分析及视觉观察，总结出主要复刻要点：
- 实现卡牌跟随鼠标旋转
- 实现鼠标经过处高光

## 二、基础搭建

HTML结构一共3层，`card-wrapper`主要用于设置css属性`perspective`，相当于在容器层级创建一个**3D 渲染上下文**，所有子元素的 3D 变换都共享同一个透视投影系统。
`card`是卡片本身，设置图片背景，`shine`用于设置高光。

::: code-group

```html
  <div class="card-wrapper">
    <div class="card">
      <div class="shine"></div>
    </div>
  </div>
```
```css
.card-wrapper {
  perspective: 750px;
}
.card {
  width: 367px;
  height: 512px;
  background-image: var(--img-url);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 15px;
  overflow: hidden;
}
.shine {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
```
:::

## 三、核心特效实现
### 鼠标交互效果
**1. 通过监听鼠标`mousemove`事件，计算出鼠标指针在卡片上的位置：**

首先先在`card`上绑定`mousemove`事件
::: code-group
```javascript
const handleMouseMove = (e: MouseEvent) => {
  console.log(e)
}

```
```html
  <div class="card-wrapper">
    <div class="game-card"
         @mousemove="handleMouseMove">
      <div class="shine"></div>
    </div>
  </div>
```
:::
<Step1/>

鼠标经过卡片打开控制台我们可以看到, 有3组关于鼠标位置的参数`clientX`和`clientY`,`pageX`和`pageY`,`screenX`和`screenY`,这里我们选用`pageX`和`pageY`，`screenX`和`screenY`是鼠标距离显示器边框的距离，`clientX`和`clientY`是鼠标距离显示器浏览器可视区的距离，如果用这两对属性的话浏览器出现滚动条定位会有偏差。

我们拿到的`pageX`和`pageY`是鼠标相对页面的坐标，我们要将坐标转换到卡片上，只需要`pageX`减去卡片距离页面左边的距离得到鼠标相对卡片的`X`坐标，`pageY`减去卡片距离页面上边的距离得到鼠标相对卡片的`Y`坐标，通过`ref`拿到卡片元素，再通过`getBoundingClientRect()`方法我们可以拿到卡片距离页面左边和上边的距离。
```javascript
let cardLeft = 0
let cardTop = 0

onMounted(() => {
  const bcr = cardRef.value.getBoundingClientRect()
  cardLeft = bcr.left
  cardTop = bcr.top
})

const handleMouseMove = (e: MouseEvent) => {
  pointerX.value = e.clientX - cardLeft
  pointerY.value = e.clientY - cardTop
}
```
**2. 将鼠标坐标转换为以卡片中心为原点的坐标系**

通过原网站鼠标交互我们看出卡片的旋转是围绕着卡片中心的，而此时我们的鼠标坐标是以卡片左上角为原点，卡片上边为`X`轴，卡片左边为`Y`轴的坐标系，所以还需要转换一下坐标系：
```javascript
 const posX = (event.clientX - cardLeft) - cardRef.value.offsetWidth / 2;
 const posY = (event.clientY - cardTop) - cardRef.value.offsetHeight / 2
```
我们还需要将卡片的旋转中心设置到卡片中心：
```css
.game-card{
  transform-origin: center center;
}

```
**3. 将鼠标的位移转换为卡片的旋转**

要想实现卡片旋转跟随鼠标，还需要理解卡片旋转和鼠标坐标的对应关系。想象将卡片放入在三维坐标系中，卡片纵向旋转是绕着`X`轴的，和鼠标坐标的对应关系是：鼠标`Y`轴上的绝对值越大，卡片旋转角度越大。同样的，卡片横向旋转是绕`Y`轴的，鼠标`X`轴上的绝对值越大，卡片旋转角度越大。
所以我们可以得出卡片`transfrom`的`routateX()`属性应当设置为和我们上面得出的`posX`对应，`routateX()`和`posY`对应,
而由于`rotateY()`顺时针方向旋转为负值，所以取`posX`的负值，再对旋转幅度做调整除以10，便得到了效果。
```javascript
const rotateX = ref(0)
const rotateY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  // ...
  const posX = (e.clientX - cardLeft) - cardRef.value.offsetWidth / 2;
  const posY = (e.clientY - cardTop) - cardRef.value.offsetHeight / 2
  rotateX.value = posY / 10
  rotateY.value = -posX / 10
}
```
再将属性设置到`card`内联样式中：
```html
  <div class="card-wrapper">
    <div class="game-card"
         ref="cardRef"
         :style="{transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`}"
         @mousemove="handleMouseMove">
      <div class="shine"></div>
    </div>
  </div>
```
<Step2/>

### 简单的光影效果
高光的原理是覆盖一个椭圆渐变的图层，椭圆中心跟随鼠标再卡片的坐标位置，简单的金箔图层的实现原理原理是覆盖一层金箔图层，再设置一个跟随鼠标移动的椭圆形css `mask`
主要代码如下：
```css
.game-card {
  --pointer-x: 0;
  --pointer-y: 0;
  --img-url:'';
  --foil-img-url:'';
  width: 367px;
  height: 512px;
  background-image: var(--img-url);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: rotateX(calc(var(--mouse-y) * 0.1deg)) rotateY(calc(var(--mouse-x) * -0.1deg));
  transform-origin: center center;
  border-radius: 15px;
  will-change: trasform;
  overflow: hidden;


  .shine {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background:  radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(255,255,255,0.6) 0, transparent 70%,transparent 100%);
    transition: opacity 0.2s ease-out;
    will-change: background;
  }
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: var(--foil-img-url);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    mask: radial-gradient(circle at var(--pointer-x) var(--pointer-y), #fff 0, transparent,var(--radial-size),transparent 100%);
    filter: brightness(0.55) contrast(1.5) saturate(1);
    mix-blend-mode: color-dodge;
    will-change: mask, background, filter;
  }
```
其中的`--pointer-x`和`--pointer-y`并不是前面设置的以卡片中心为坐标系的坐标，径向渐变是以卡片左上角为原点的坐标系，所以需要另设变量：
```javascript
pointerX.value = event.clientX - cardLeft
pointerY.value = event.clientY - cardTop
```
另外重要的一点是，需要设置`mix-blend-mode`属性为`color-dodge`,`mix-blend-mode`属性描述了元素的内容应该与元素的直系父元素的内容和元素的背景如何混合。

以上便是宝可梦卡片的简单实现过程，更多的代码细节可参考：[GameCard](https://gitee.com/lsj97/blog-demos/blob/master/src/views/GameCard/Card.vue)
