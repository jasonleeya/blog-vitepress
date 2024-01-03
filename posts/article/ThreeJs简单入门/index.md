---
category: 文章
tags:
  - JavaScript
  - Three.js
---
<script setup>import Read from "@components/Read.vue";</script>

<read/>

# Three.js简单入门

随着前端技术的不断更迭，人们已经不在满足页面只有2D的内容，所以将前端带入了3D世界，而前端在3D世界占主导地位的技术便是今天的主角：`Three.js`。今天我们将简单介绍一下`Three.js`的基本用法，希望能帮助您对它有个初步的了解。

## 什么是Three.js
`Three.js` 是一款基于 `WebGL` 进行二次开发封装的2D、3D渲染引擎，`WebGL`是一种基于 `OpenGL` 的开发的适用于浏览器环境的渲染引擎，,而要想掌握它，需要我们有图形学，物理学，几何学，数学等相关知识，但是对于初探3D领域的前端程序员来说，我们不用掌握太多的图形学技术，只需要通过 `Three.js` 便可入门前端3D开发。

## Three.js的下载
因为我们现在不是开发环境，而是学习使用three.js，没必要专门搭建一个webpack或者vite环境，我们可以直接下载[three.js文件包](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmrdoob%2Fthree.js%2Freleases),它里面包含文档以及很多示例便于我们学习。如果是开发环境使用，那便直接使用下面的命令安装即可：
```shell
npm install --save three
```
## Three.js文件资源目录介绍

```text
three.js-文件包

├─build——three.js相关库，可以引入你的.html文件中。
├─docs——Three.js API文档文件
    ├─index.html——打开该文件，本地离线方式预览threejs文档
├─examples——大量的3D案例，是你平时开发参考学习的最佳资源
    ├─jsm——threejs各种功能扩展库
├─src——Three.js引擎的源码，有兴趣可以阅读。
├─editor——Three.js的可视化编辑器，可以编辑3D场景
    ├─index.html——打开应用程序  

```
在学习three.js的过程中，我们接触的最多的是文档docs和案例examples两个文件夹，平时查看文档，可以打开文档docs里面html文件，案例examples里面提供了海量three.js功能案例。

## 引入Three.js

开发环境中：
```shell
import * as THREE from 'three';
```
除了three.js核心库以外，在three.js文件包中 `examples/jsm` 目录下，还有很多扩展库，在我们使用的地方直接引入即可，例如：

```shell
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
```
在学习环境中，我们直接在下载的文件包中创建HTML文件，并使用 `<script>` 标签引入即可：
```html
<script src="./build/three.js"></script>
```

## 创建一个3D场景

我们首先要弄明白的是three.js的三要素：**场景**，**摄像机**和**渲染器**。

