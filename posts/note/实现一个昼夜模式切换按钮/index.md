---
category: 笔记
tags:
  - Vue
  - SVG
  - 网站搭建
---

<script setup>
import Read from "@components/Read.vue";
import DayNightSwitch from "@components/vp-theme/SwitchAppearance.vue";

</script>

<ClientOnly>
  <read></read>
</ClientOnly>

![cover](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2023_12/20231224150408.png)

# 实现一个昼夜模式切换按钮

偶然间在短视频平台刷到一个ui设计师设计了一个昼夜模式切换的按钮，效果挺炫酷，评论区前端各个评论实现不了，作为一名多年经验的前端，看到这种效果就下意识的分析能不能实现，应该用什么方法实现，我简单的分析了一下，这个按钮看上去挺复杂，实现起来也一点不简单~
，但经过一晚上的折腾，我还是将其实现出来了，先将实现过程简单记录如下：

:::info 点击查看效果

<ClientOnly>
  <DayNightSwitch></DayNightSwitch>
</ClientOnly>

:::

:::info 查看放大效果
[https://demos.lsj97.com/#/dayNightSwitch](https://demos.lsj97.com/#/dayNightSwitch)
:::

## 分析结构

结构分为第一层包裹层`.day-night-switch`，第二层滑块`.slider`,云层`.cloud`和星星层`stars`,滑块层中因为overflow:
hidden会将光晕层裁剪掉，所以将太阳月亮和光晕层分开，太阳月亮层`.sun-moon`中包含了太阳`.sun`和月亮`.moon`
月亮中包含了陨石坑层`.crater`

::: details 点击查看代码

```html

<div class="day-night-switch">
  <div class="slider">
    <div class="sun-moon">
      <div class="sun"></div>
      <div class="moon">
        <div class="crater"></div>
      </div>
    </div>
    <div class="light"></div>
  </div>
  <div class="cloud"></div>
  <div class="stars"></div>
</div>
```

:::

## 背景的实现

![背景的实现](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2023_12/20231224161610.png)

编写一个长100px高40px圆角20px的盒子，由于内阴影会被子元素遮挡，所以盒子只设置外阴影，将内阴影设置在`:after`伪元素上。

::: details 点击查看代码

```css
.day-night-switch {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  position: relative;
  background: #3679AE;
  cursor: pointer;
  transition: background-color 0.3s;
  overflow: hidden;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 0 -1px 1px rgba(1, 13, 61, 0.42), 0 1px 1px #d2d2d2;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 20px;
    box-shadow: inset 0 1px 1px #010d3d, inset 0 -1px 1px rgba(0, 0, 0, 0.3);
  }
}
```

:::

## 太阳月亮效果的实现

![太阳月亮效果的实现](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2023_12/20231224161749.png)

将`.sun-moon`,`.sun`,`.moon`都设置成同样大小的圆形，`.sun-moon`设置`overflow:hidden`，`.moon`设置`position:absolute`
覆盖在太阳上，再设置`transform: translateX(30px)`将月亮移动至`.sun-moon`右侧隐藏起来，
使用绝对定位画出一个月亮陨石坑，并用`:before` `:after`
伪元素设置另外两个，画一个比太阳月亮大20px的圆当作光晕,并用绝对定位将光晕定位到`.slider`中心，用`box-shadow`画出另外两层光晕。
::: details 点击查看代码

```css
  .slider {
  width: 30px;
  height: 30px;
  position: absolute;
  transform: translateX(0);
  transition: transform 0.3s;
  z-index: 2;

  .sun-moon, .sun, .moon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .sun-moon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    box-shadow: inset 1px 1px 1px #fff, inset -1px -1px 1px #848688, 1px 1px 1px #535456;
    overflow: hidden;

    .sun {
      background: #F0C529;
      box-shadow: inset 1px 1px 1px #fff, inset -1px -1px 1px #848688, 1px 1px 1px #535456;
    }

    .moon {
      background: #C2CBD2;
      box-shadow: inset 1px 1px 1px #fff, inset -1px -1px 1px #9a9a9a;
      position: absolute;
      top: 0;
      transform: translateX(30px);
      transition: transform 0.2s;

      .crater {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background: #939EB0;
        position: absolute;
        left: 5px;
        box-shadow: inset 0 0 1px #59606b;
        top: 12px;

        &:before {
          content: '';
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 2.5px;
          background: #939EB0;
          position: absolute;
          left: 8px;
          box-shadow: inset 0 0 1px #59606b;
          top: -6px;
        }

        &:after {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background: #939EB0;
          position: absolute;
          left: 12px;
          box-shadow: inset 0 0 1px #59606b;
          top: 6px;
        }
      }
    }
  }

  .light {
    background: rgba(255, 255, 255, 0.3);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.1), 0 0 0 20px rgba(255, 255, 255, 0.1);
  }
}
```

:::

## 绘制云

实现思路时是绘制一个圆(图中红色的圆)，定位到容器右下角隐藏起来，使用`box-shadow`偏移，叠加出多个阴影(图中暗红色部分)。
![绘制云](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2023_12/20231224162849.png)

::: details 点击查看代码

```css
 .cloud {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  right: 0;
  bottom: -30px;
  transition: bottom 0.3s;
  box-shadow: 17px -38px 0 0 #fff,
  8px -24px 0 0 #fff,
  -5px -17px 0 0 #fff,
  -22px -9px 0 0 #fff,
  -37px -10px 0 0 #fff,
  -60px -8px 0 5px #fff,
  11px -44px 0 -3px #abc1d9,
  6px -33px 0 0 #abc1d9,
  -5px -29px 0 0 #abc1d9,
  -23px -19px 0 0 #abc1d9,
  -43px -19px 0 3px #abc1d9;
}
```

:::

## 绘制星星

使用svg的path绘制出一个星星的形状(SVG相关知识可参考[SVG入门到入土](/posts/article/SVG入门到入土/))

```html

<svg class="stars" xmlns="http://www.w3.org/2000/svg" width="100px" height="40px">
  <path id="stars" d="M0 10 Q10,10 10,0 Q10,10 20,10 Q10,10 10,20 Q10,10 0,10"/>
</svg>
```

![绘制星星](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2023_12/20231224164315.png)
再将`path`移至`defs`标签中，并用`use`元素复制出多个星星，设置`transform`变换星星大小和位置,最终得到一片星云。

::: details 点击查看代码

```html

<svg class="stars" xmlns="http://www.w3.org/2000/svg" width="100px" height="40px">
  <defs>
    <path id="stars" d="M0 10 Q10,10 10,0 Q10,10 20,10 Q10,10 10,20 Q10,10 0,10"/>
  </defs>
  <g class="stars" fill="#fff">
    <use xlink:href="#stars" style="transform:translateX(47px) translateY(15px) scale(0.3);"/>
    <use xlink:href="#stars" style="transform:translateX(15px) translateY(5px) scale(0.3);"/>
    <use xlink:href="#stars" style="transform:translateX(38px) translateY(25px) scale(0.2);"/>
    <use xlink:href="#stars" style="transform:translateX(21px) translateY(19px) scale(0.2);"/>
    <use xlink:href="#stars" style="transform:translateX(10px) translateY(24px) scale(0.2);"/>
    <use xlink:href="#stars" style="transform:translateX(8px) translateY(13px) scale(0.1);"/>
    <use xlink:href="#stars" style="transform:translateX(43px) translateY(32px) scale(0.1);"/>
    <use xlink:href="#stars" style="transform:translateX(29px) translateY(14px) scale(0.1);"/>
    <use xlink:href="#stars" style="transform:translateX(33px) translateY(6px) scale(0.1);"/>
    <use xlink:href="#stars" style="transform:translateX(41px) translateY(9px) scale(0.1);"/>
    <use xlink:href="#stars" style="transform:translateX(15px) translateY(32px) scale(0.1);"/>
    <use xlink:href="#stars" style="transform:translateX(28px) translateY(31px) scale(0.1);"/>
  </g>
</svg>
```

:::

## 总结

以上就是昼夜模式切换按钮整体实现过程，在其中使用到了很多技巧，例如阴影的偏移实现云层，还有一些SVG相关知识。项目完整代码:

:::details 点击查看代码
<<< ../../../.vitepress/theme/components/DayNightSwitch.vue
:::
