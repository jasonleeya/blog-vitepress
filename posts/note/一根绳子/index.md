---
category: 笔记
tags:
  - Canvas
---
<script setup>
import Read from "@components/Read.vue";
</script>

<ClientOnly>
  <read></read>
</ClientOnly>

![cover](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2025_05/一根绳子..png)

# 一根绳子 

在网上看到一个台灯效果，效果挺好，但开关太low，我觉得应该做成拉线开关，于是想自己实现一遍。原本以为在实现拉线台灯的过程中，绳子的模拟会是最简单的步骤，毕竟在脑海中勾勒出的画面就是一根柔软、可拉动的线条。可真正动手敲代码时才发现，这看似简单的绳子，背后却藏着无数细节，成为了整个项目的 “拦路虎”。下面就来看看那些攻克这个难题的重要代码。

先看看效果：[点击查看效果](https://demos.lsj97.com/#/一根绳子)

## 拆解绳子

真实世界里的绳子柔软、可变形，在代码中该如何表达？经过我在网上一番查证，一般做法是把它拆解成 **点（Dot）和棍（Stick** 的组合：

- **点（Dot**）：代表绳子上的关键位置，记录每个点的坐标、运动状态（是否被固定、上一帧位置）。就像绳子上的标记点，它们的移动决定了绳子的整体形态。
- **棍（Stick）**：连接相邻的两个点，模拟绳子的张力。每根棍子都有固定长度，如果点的位置变化导致棍子长度改变，就需要通过计算拉回到原始长度，这就像给绳子施加了无形的弹力。

## 搭建基础

首先搭建一个`Vector`类，绳子这种点和线的运动，用向量很方便计算：
```typescript
class Vector {
  x: number;
  y: number;

  // 构造函数，初始化向量的 x 和 y 坐标，默认值为 0
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  // 静态方法，返回两个向量相加的结果
  static add(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }

  // 静态方法，返回两个向量相减的结果
  static sub(v1: Vector, v2: Vector): Vector {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  // 实例方法，将当前向量与另一个向量或坐标相加
  add(x: Vector | number, y?: number): Vector {
    if (x instanceof Vector) {
      this.x += x.x;
      this.y += x.y;
    } else if (typeof y === 'number') {
      this.x += x;
      this.y += y;
    }
    return this;
  }

  // 实例方法，将当前向量与另一个向量或坐标相减
  sub(x: Vector | number, y?: number): Vector {
    if (x instanceof Vector) {
      this.x -= x.x;
      this.y -= x.y;
    } else if (typeof y === 'number') {
      this.x -= x;
      this.y -= y;
    }
    return this;
  }

  // 实例方法，将当前向量与一个数或另一个向量相乘
  mult(v: number | Vector): Vector {
    if (typeof v === 'number') {
      this.x *= v;
      this.y *= v;
    } else {
      this.x *= v.x;
      this.y *= v.y;
    }
    return this;
  }

  // 实例方法，设置向量的 x 和 y 坐标
  setXY(x: number, y: number): Vector {
    this.x = x;
    this.y = y;
    return this;
  }

  // 实例方法，将向量归一化
  normalize(): Vector {
    const length = Math.sqrt(this.x * this.x + this.y * this.y);
    if (length > 0) {
      this.x /= length;
      this.y /= length;
    }
    return this;
  }

  // 实例方法，计算当前向量与另一个向量之间的距离
  dist(v: Vector): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
```

## 搭建绳子骨架（Rope 类）

创建`Rope`类，`Rope`类就像一个绳子工厂，先根据长度和间距生成一系列点，再用棍子把它们串联起来。固定起点就像把绳子的一端钉在台灯上，为后续的动态效果打好基础。
```typescript
export class Rope {
  // 绳子固定的点
  x: number; 
  y: number;
  // 绳子分成多少段
  segments: number;
  // 绳子每段长度
  gap: number = 5;
  color: string;
  // 迭代次数，多次迭代，物理效果更逼真
  iterations: number = 20;
  // 保存canvas上下文和实例
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  // 点的集合
  dots: Dot[] = [];
  // 棍的集合
  sticks: Stick[] = [];
  // 绳头
  ropeEnd: RopeEnd = new RopeEnd()

  // 构造函数，初始化绳子的属性，创建绳子并开始渲染
  constructor(config: Config) {
    this.x = config.x;
    this.y = config.y;
    this.segments = Math.floor(config.length / this.gap);
    this.color = config.color || 'gray';
    this.ctx = config.ctx;
    this.canvas = config.canvas;
    this.mouse = new Mouse(this.canvas, this.dots);

    this.create();
    this.render();
  }
  // 创建绳子的点和棍子
  private create(): void {
    for (let i = 0; i < this.segments; i++) {
      this.dots.push(new Dot(this.x, this.y + i * this.gap));
      this.pin(0);
    }
    for (let i = 0; i < this.segments - 1; i++) {
      this.sticks.push(new Stick(this.dots[i], this.dots[i + 1]));
    }
    firstStick = this.sticks[0]
  }
  // 绘制绳子的点和棍子
  draw(): void {
    this.dots.forEach((dot: Dot) => dot.draw(this.ctx));
    this.sticks.forEach((stick: Stick) => stick.draw(this.ctx));
  }
}
```
`Rope`类中我们定义了
