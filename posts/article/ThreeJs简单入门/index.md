---
category: 文章
tags:
  - JavaScript
  - Three.js
---

<script setup>
import Read from "@components/Read.vue";
import LazyLoader from "@components/LazyLoader.vue";

</script>

<ClientOnly>
  <read/>
</ClientOnly>

![cover](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2024_01/threejs.png?sign=0edef579d07efe758efbc8b5cabd031a&t=1704267419)

# ThreeJs简单入门

随着前端技术的不断更迭，人们已经不在满足页面只有2D的内容，所以将前端带入了3D世界，而前端在3D世界占主导地位的技术便是今天的主角：`Three.js`
。今天我们将简单介绍一下`Three.js`的基本用法，希望能帮助您对它有个初步了解。

## 什么是Three.js

`Three.js` 是一款基于 `WebGL` 进行二次开发封装的2D、3D渲染引擎，`WebGL`是一种基于 `OpenGL`
的开发的适用于浏览器环境的渲染引擎，而要想掌握它，需要我们有图形学，物理学，几何学，数学等相关知识，但是对于初探3D领域的前端程序员来说，我们不用掌握太多的图形学技术，只需要通过 `Three.js`
便可入门前端3D开发。

## Three.js的下载

因为我们现在不是开发环境，而是学习使用three.js，没必要专门搭建一个webpack或者vite环境，我们可以直接下载[three.js文件包](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmrdoob%2Fthree.js%2Freleases)
,它里面包含文档以及很多示例便于我们学习。如果是开发环境使用，那便直接使用下面的命令安装即可：

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

```javascript
import * as THREE from 'three';
```

除了three.js核心库以外，在three.js文件包中 `examples/jsm` 目录下，还有很多扩展库，在我们使用的地方直接引入即可，例如：

```javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
```

在学习环境中，我们直接在下载的文件包中创建HTML文件，并使用 `<script>` 标签引入即可：

```html

<script src="./build/three.js"></script>
```

## Three.js的三要素

在正式开始three.js的学习之前，我们首先要弄明白的是three.js的三要素：**场景**，**摄像机**和**渲染器**。

### 什么是场景？

在 three.js 中，场景是一个非常重要的概念，它类似于一个容器或者说世界，可以包含各种对象、模型、粒子和灯光等。场景是 Three.js
中的一个核心组件，它是构建一个 3D 场景所必需的，通过将不同的对象添加到场景中，我们可以创建一个复杂的 3D 环境。

### 什么是摄像机？

这里的摄像机和我们生活中所说的摄像机有所不同，它不是用来记录影像的，而是用来记录 3D 世界中的位置和方向，它用来观察 3D
世界中的物体，因此它是一个非常重要的组件。在我看来，摄像机更像我们的眼睛。

在 Three.js 中，相机本身是不可见的，它仅用于计算和确定场景中物体的位置和角度。因此，我们只能看到相机所观察到的内容，而不能看到相机本身。这意味着，我们需要在场景中加入其他可见的对象，例如物体、灯光等等，才能看到场景。

### 什么是渲染器？

渲染器是一个非常重要的组件，它的工作是将我们编写的3D场景通过栅格化渲染到屏幕中。在three.js中，我们通常使用 `WebGLRenderer`
类来进行渲染。

## 创建一个场景

接下来我们可以创建一个最简单场景：

```javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

现在我们已经创建了一个场景，它包含了一个相机，一个渲染器和一个场景。 先别着急查看效果，现在页面上还没是一片黑，我们先介绍下上面的代码。

- 首先，我们实例化了一个 `scene` 场景，它是一个空的场景。

- 紧接着我们实例化了一个 `camera` 相机，它是一个**PerspectiveCamera（透视摄像机）**，它的参数包括：视野角度，宽高比，近截面距离，远截面距离，这里设置为 75，宽高比为窗口宽高比，近截面距离为 0.1，远截面距离为 1000。另外，除了透视摄像机之外，还有 **OrthographicCamera（正交摄像机）**，它和透视摄像机的区别是它的投影方式是正交投影，下面是两种相机的视野区别：

![PerspectiveCamera（透视摄像机）](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2024_01/perspectiveCamera_view.webp)
***PerspectiveCamera（透视摄像机）***

![PerspectiveCamera（透视摄像机）](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2024_01/orthographicCamera_view.webp)
***OrthographicCamera（正交摄像机）***

正投照相机所呈现的图形，远近大小都一样，而透视照相机，远小近大，更接近于人眼观察物体的感觉。

- 最后我们实例化了一个 `renderer` 渲染器，将渲染器的dom元素`renderer.domElement`添加到我们的 HTML 文档中，这里的 `renderer.domElement` 就是渲染器用来显示场景给我们看的 `<canvas>` 元素。

## 添加物体

现在，场景中除了摄像机没有任何物体，接下来我们添加一个正方体到场景中。

```javascript
const geometry = new THREE.BoxGeometry( 10, 10, 10 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.x = 30;
camera.position.y = 30;
camera.position.z = 30;
camera.lookAt(0, 0, 0)
```
上面的代码中，我们使用了 `THREE.BoxGeometry` 实例化了一个10×10×10的立方体的几何体形状，然后使用 `THREE.MeshBasicMaterial` 材质实例化了一个纯色的材质，接着我们实例化了一个 `THREE.Mesh` 网格，网格传入了几何体和材质并将它添加到场景中。默认情况下，当我们调用 `scene.add()` 的时候，物体将会被添加到 (0,0,0) 坐标。但将使得摄像机和立方体彼此在一起。为了防止这种情况的发生，我们只需要调整一下摄像机的位置，将摄像机的 `x,y,z`设置到30的位置，并使用 `camera.lookAt(0, 0, 0)` 方法将摄像机看向原点。

## 渲染场景
如果此时再次查看页面，页面上还是一片黑，这是因为我们还没有对它进行真正的渲染。为此，我们需要使用一个被叫做 **“渲染循环”（render loop）** 或者 **“动画循环”（animate loop）** 的东西。

```js
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
```
在这里我们利用 `requestAnimationFrame` 方法来实现动画循环，每一帧都会调用一次 `animate` 方法，这里不推荐使用 `setInterval` ，因为它在执行大量代码时会导致浏览器卡顿，而且使用 `requestAnimationFrame` 当用户切换到其它的标签页时，它会暂停，因此不会浪费用户内存资源。此时我们可以看到页面上已经有了一个绿色的正方体：

<LazyLoader> 
   <ClientOnly>
    <iframe src="https://demos.lsj97.com/#/learnThreeJsDemos?step=1" style="width:100%;height:500px"></iframe>
   </ClientOnly>
</LazyLoader>

## 使立方体动起来
现在看到的只是一个静态的六边形，接下来我们让“六边形”动起来，让它变成立方体。

我们只需要添加这两行代码：

```js
function animate() {
    cube.rotation.x += 0.01; // [!code ++]
    cube.rotation.y += 0.01; // [!code ++]
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
```
<LazyLoader>
  <ClientOnly>
    <iframe src="https://demos.lsj97.com/#/learnThreeJsDemos?step=2" style="width:100%;height:500px"></iframe>
  </ClientOnly>
</LazyLoader>

这两行代码会在每次屏幕刷新时将立方体的 `x`,`y`旋转 0.01 弧度，旋转速度取决于你的屏幕刷新率。

到此，你便成功完成了你的第一个 `three.js` 应用程序。虽然它很简单，但现在你已经有了一个入门的起点。


