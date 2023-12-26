---
category: 文章
tags:
  - css
  - 网站搭建
---

<script setup>
import Read from "@components/Read.vue";
import Box1 from "../../postComponents/使css高度auto支持过渡动画/ExpandableBoxMaxHeight.vue";
import Box2 from "../../postComponents/使css高度auto支持过渡动画/ExpandableBoxJs.vue";
import {ref} from 'vue';

const isExpand = ref(false);
const isExpand2 = ref(false);
const isExpand3 = ref(false);
const isExpand4 = ref(false);
const isExpand5 = ref(false);
</script>
<read/>

<style>
.grid {
  margin: 0 auto;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 300px;
  width: 100px;
  transition: grid-template-columns 0.3s, grid-template-rows 0.3s;
}
.grid .item {
  border: 1px solid #000;
  border-bottom: none;
  box-sizing: border-box;
  background: skyblue;
}
.grid .item:last-child {
  border-bottom: 1px solid #000;
}
.grid-2 {
  grid-template-rows:1fr 2fr 1fr;
}
.grid-3 {
  grid-template-rows:1fr 0fr 1fr;
}
.grid-5 {
  grid-template-rows:1fr 0fr 1fr;
  height: unset;
}
.grid-6{
  height: unset;
}
.grid-6 .item{
  overflow: hidden;
}
.grid-7{
  height: 100px;
  overflow: hidden;
}
.grid-7 .item{
  height: 100px;
  overflow: hidden;
}
.grid-8{
  overflow: hidden;
  height: unset;
  justify-content: left;
  width: 300px;
}
.grid-8 .item-wrapper{
  overflow: hidden;
}
.grid-8 .text{
  width: 300px;
  overflow: hidden;
}
.grid-7 .item{
  overflow: hidden;
}
</style>
# 使css高度auto支持过渡动画

## 前言

在平时的开发中，我们经常遇见各种展开与收起的场景，例如子菜单，手风琴，提示框，下拉框的等，这种效果通常都是利用`transition`过渡宽度高度实现的，但众所周知，`height`和`width`要支持`transition`过渡动画必须设置成具体的数值，要想让宽高不定或者设置成`auto`
的元素支持过渡动画，我收集了三种实现方法：

## max-height/max-width过渡
其一是设置最大宽度或高度，将`max-height`/`max-width`
设置成一个元素高度基本不可能达到的值，然后`transition`过渡`max-height`/`max-width`;

效果如下：

<Box1/>

这样实现的过渡缺点是很明显的：由于过渡过程是按照最大宽高过渡的，假如`max-height`
为1000px，元素实际高度为300px并且过渡时长为1s时，元素在0.3s的时候就已经展开完成了，这就显得展开过程很快，而当收回的时候，点击按钮会等待0.7s元素才开始动画，有很明显的延迟。

## 配合js实现过渡

其二实现方式是配合js，在元素展开状态改变后元素还没来得及渲染时，获取元素高度，并设置给元素从而实现动画

<Box2/>

::: details 点击查看源码
<<< ../../postComponents/使css高度auto支持过渡动画/ExpandableBoxJs.vue
:::

我们通过js成功的实现了元素不定高度的过渡动画，但是可以看到，整个实现过程时是很复杂的，而且必须完全理解动画实现的每一个步骤才能实现。

## 利用grid布局中的fr单位实现过渡

那么，有没有一种不用js存粹使用css的实现方法呢？还真有，便是接下来介绍的使用gird布局中的fr实现过渡。

gird布局中有一个全新的单位`fr`，用于定义网格轨道大小的弹性系数。grid布局比较复杂，三言两语是说不清楚的，有兴趣的同学可自行查阅相关文档，但在这里我们仅仅需要知道的是gird的基础排列方式以及`fr`单位的作用。`transition`只能过渡设置具体数值的属性，而`fr`
单位也是一个具体的数值，并且它的作用最直观的体现就是能影响元素的宽高，所以在此我们可以利用`fr`来实现动画的过渡。

首先我们通过grid构建出这样一个布局：

<div class="grid">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>

主要代码如下：

:::code-group
```html
<div class="grid">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
```

```css
.grid{
  display: grid;
  height: 300px;
  grid-template-rows: 1fr 1fr 1fr;
}
```
:::

这里的`grid-template-rows`表示布局中元素行方向上排列方式，属性值`1fr 1fr 1fr`表示每一个item占有1等分剩余高度空间，也就是每个item分得100px。

当我们将中间item设置为`2fr`,即`grid-template-rows: 1fr 2fr 1fr`，效果如下：

<div class="grid grid-2">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>

我们再将中间item设置为`0fr`,即`grid-template-rows: 1fr 0fr 1fr`，效果如下：

<div class="grid grid-3">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>

我们可以看到，当我们将中间的item设置为`2fr`时，元素的高度为150px，也就是父元素`.grid`高度的一半，这也就表示该元素分得的剩余高度为2/(1+2+1),当设置为`0fr`的时候，元素高度变成了0，分得的剩余空间0/(1+0+1)也等于0。

此时，我们将`grid-template-rows`设置上过渡,并加上展开与收起状态控制：
```css
.grid{
  transition: grid-template-rows 0.3s;
}
```
<el-button type="primary" class="button" @click="isExpand = !isExpand">点击{{isExpand?'收起':'展开'}}</el-button>

<div class="grid grid-4" :style="{gridTemplateRows: isExpand ? '1fr 1fr 1fr' : '1fr 0fr 1fr'}">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>

可以看到，中间的item像一张大口张开闭合，元素从`1fr`到`0fr`实现了过渡。

我们再将上下两个item去掉，将代码改为`grid-template-rows: 1fr`,就实现了元素的展开与收起

<el-button type="primary" class="button" @click="isExpand2 = !isExpand2">点击{{isExpand2?'收起':'展开'}}</el-button>
<div class="grid grid-5" :style="{gridTemplateRows: isExpand2 ? '1fr' : '0fr'}">
  <div class="item">使css高度auto支持过渡动画</div>
</div>

为什么不起作用呢？其实这是由grid的最小尺寸规则决定的，此时的最小高度是`min-content`，也就是由内部文本决定的，而父元素能撑开的高度也是文本高度，所以就没有出现收缩效果，这时我们可以将item的`overflow`设置为`hidden`,超出部分隐藏，使得最小高度为0，保险起见，父元素`overflow`也设置为`hidden`，这样就能使父元素收回到0。

<el-button type="primary" class="button" @click="isExpand3 = !isExpand3">点击{{isExpand3?'收起':'展开'}}</el-button>
<div class="grid grid-6" :style="{gridTemplateRows: isExpand3 ? '1fr' : '0fr'}">
  <div class="item">使css高度auto支持过渡动画</div>
</div>

`gird`还有`grid-template-columns`,表示设置列方向上子元素剩余空间，按照上面的方法，我们可以实现宽度的收缩与展开：


<el-button type="primary" class="button" @click="isExpand4 = !isExpand4">点击{{isExpand4?'收起':'展开'}}</el-button>
<div class="grid grid-7" :style="{gridTemplateColumns: isExpand4 ? '1fr' : '0fr'}">
  <div class="item">使css高度auto支持过渡动画</div>
</div>

看到这里，细心的同学可能会发现，上面的例子还是有些不足的：`border`在收起后并没有被收进去，宽度的过渡会使文字在过渡过程中不断重新换行，我的解决方案是，再将item包裹一层元素，`border`设置到item元素上，不设置到这层元素，文字层再包裹进一层文字层，文字层设置固定宽度(好像这又回到最初的亚子，其实也可以宽度直接固定数值过渡，我在这里为方便便顺便实现了)。

<el-button type="primary" class="button" @click="isExpand5 = !isExpand5">点击{{isExpand5?'收起':'展开'}}</el-button>
<div class="grid grid-8" :style="{gridTemplateColumns: isExpand5 ? '1fr' : '0fr',gridTemplateRows:isExpand5 ? '1fr' : '0fr'}">
  <div class="item-wrapper">
<div class="item">
<div class="text" v-for="item in 5">使css高度auto支持过渡动画</div>
</div></div>
</div>

### 总结

到此，我便介绍完了三种使css高度auto支持过渡动画的方法，三种方法各有优劣，`max-height`/`max-widht`,简单实用但效果不佳，js配合实现可靠兼容性好但过程难懂，代码复杂`grid`的`fr`只用css实现但`grid`属性兼容性没那么好，如果不考虑兼容性问题的话，我推荐使用第三种方法，再vue中，也可以封装成一个组件，方便调用，这里可以参考我自己封装的一个组件：

::: details 点击查看源码
<<< ../../.vitepress/theme/components/CollapsibleBox.vue
:::

