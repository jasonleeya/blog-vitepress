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

![cover](https://file.lsj97.com/imgs/2025_05/一根绳子.png)

# 一根绳子 

在网上看到一个台灯效果，效果挺好，但开关太low，我觉得应该做成拉线开关，于是想自己实现一遍。原本以为在实现拉线台灯的过程中，绳子的模拟会是最简单的步骤，毕竟在脑海中勾勒出的画面就是一根柔软、可拉动的线条。可真正动手敲代码时才发现，这看似简单的绳子，背后却藏着无数细节，成为了整个项目的 “拦路虎”。下面就来看看那些攻克这个难题的重要代码。

先看看效果：[点击查看效果](https://demos.lsj97.com/#/aRope)

## 拆解绳子

真实世界里的绳子柔软、可变形，在代码中该如何表达？经过我在网上一番查证，一般做法是把它拆解成 **点（Dot）和棍（Stick** 的组合，这里棍其实类似弹簧，因为我加了弹性效果：

- **点（Dot**）：代表绳子上的关键位置，记录每个点的坐标、运动状态（是否被固定、上一帧位置）。就像绳子上的标记点，它们的移动决定了绳子的整体形态。
- **棍（Stick）**：连接相邻的两个点，模拟绳子的张力。每根棍子都有固定长度，如果点的位置变化导致棍子长度改变，就需要通过计算拉回到原始长度，这就像给绳子施加了无形的弹力。

## 搭建基础

创建一个`Vector`类，绳子这种点和线的运动，用向量很方便计算，具体的向量知识这里就不赘述了：
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

## 搭建绳子骨架

我们先实现`Rope`类，`Rope`类就像一个绳子工厂，先根据长度和间距生成一系列点，再用棍子把它们串联起来。固定起点就像把绳子的一端钉在台灯上，为后续的动态效果打好基础。

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
    }
    for (let i = 0; i < this.segments - 1; i++) {
      this.sticks.push(new Stick(this.dots[i], this.dots[i + 1]));
    }
  }
  // 固定指定索引的点
  pin(index: number): void {
    this.dots[index].pinned = true;
  }
  // 绘制绳子的点和棍子
  draw(): void {
    this.dots.forEach((dot: Dot) => dot.draw(this.ctx));
    this.sticks.forEach((stick: Stick) => stick.draw(this.ctx));
  }

  // 开始动画循环，更新和绘制绳子
  private render(): void {
    const frame = () => {
      requestAnimationFrame(frame);
      this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
      this.update();
      this.draw();
    };
    requestAnimationFrame(frame);
  }
}

class Dot {}
class Stick {}
class RopeEnd {}
class Mouse {}
```
`Rope`类中我们定义了几个方法，`create()`方法用于生成点和棍数组，`draw()`循环点和棍数组调用它们自身的draw方法将它们绘制在canvas上，`pin()`方法用于将某个点固定，`render()`方法是canvas能产生动画的核心，在`frame()`中执行的代码相当于每一帧的画面，不断清除画布再重新根据新的状态绘制出画面。

## 实现Dot类和Stick类

```typescript
// 点类，代表绳子上的点
class Dot {
  pos: Vector;
  oldPos: Vector;
  pinned: boolean;
  color: string;
  radius: number;

  // 构造函数，初始化点的属性
  constructor(x: number, y: number, color?: string, radius?: number) {
    this.pos = new Vector(x, y);
    this.oldPos = new Vector(x, y);
    this.pinned = false;
    this.color = color || '#aaa';
    this.radius = radius || 0;
  }

  // 绘制点
  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.radius) {
      return
    }
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  // 更新点的位置，考虑重力、摩擦力和鼠标交互
  update(mouse: Mouse): void {
    if (!this.pinned) {
      //计算速度向量
      const vel: Vector = Vector.sub(this.pos, this.oldPos);
      this.oldPos.setXY(this.pos.x, this.pos.y);
      // 添加重力和摩擦力
      vel.add(gravity);
      vel.mult(friction);
      // 计算鼠标和点的距离，方向，再更具距离比例计算出力度，如果力度到达一定地步，就跟着鼠标移动（因为绳子太细，到达一定距离让点主动吸附鼠标），否则就自行运动
      // dragDot用于判断是否是当前点击的点
      const {x: dx, y: dy}: { x: number, y: number } = Vector.sub(mouse.pos, this.pos);
      const dist: number = Math.sqrt(dx * dx + dy * dy);
      const direction: Vector = new Vector(dx / dist, dy / dist);
      const force: number = Math.max((mouse.radius - dist) / mouse.radius, 0);

      if (force > 0.6 || dragDot === this) {
        this.pos.setXY(mouse.pos.x, mouse.pos.y);
      } else {
        this.pos.add(vel);
        this.pos.add(direction.mult(force));
      }
    }
  }
}

// 棍子类，连接两个点
class Stick {
  startPoint: Dot;
  endPoint: Dot;
  length: number;
  // 原始长度
  thickness: number;
  // 粗细
  color: string;
  tension: number;

  // 构造函数，初始化棍子的属性
  constructor(startPoint: Dot, endPoint: Dot, thickness?: number, color?: string, tension?: number) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.thickness = thickness || 1;
    this.color = color || '#999';
    this.tension = tension || 0.5;
    this.length = this.startPoint.pos.dist(this.endPoint.pos);
  }

  // 绘制棍子
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.lineWidth = this.thickness;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y);
    ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y);
    ctx.stroke();
    ctx.closePath();
  }

  // 更新棍子的状态，调整点的位置以保持固定长度
  update(): void {
    // 算出棍子长度和原始长度的差距diff,再更加diff计算出棍子两个端点需要移动的偏移量
    const dx: number = this.endPoint.pos.x - this.startPoint.pos.x;
    const dy: number = this.endPoint.pos.y - this.startPoint.pos.y;
    const dist: number = Math.sqrt(dx * dx + dy * dy);
    const diff: number = (dist - this.length) / dist;
    const offsetX: number = diff * dx * this.tension;
    const offsetY: number = diff * dy * this.tension;

    // 如果一个端点被固定，另一个断电就要移动全部偏移量，否则只需移动一半
    if (this.startPoint.pinned) {
      this.endPoint.pos.x -= offsetX;
      this.endPoint.pos.y -= offsetY;
    } else {
      if (!this.startPoint.pinned) {
        this.startPoint.pos.x += offsetX * 0.5;
        this.startPoint.pos.y += offsetY * 0.5;
      }
      if (!this.endPoint.pinned) {
        this.endPoint.pos.x -= offsetX * 0.5;
        this.endPoint.pos.y -= offsetY * 0.5;
      }
    }
  }
}
```

`Dot`类和`Stick`类有些相似，都只包含`draw()`和`update()`两个方法，`draw()`方法用于绘制当前类，`update()`用于更新各自的状态，物理性质也在这个方法里实现。

## 实现Mouse类

```typescript
// 存储被拖动的点
let dragDot: Dot | null;
// 第一段Stick
let firstStick: Stick | null
class Mouse {
  pos: Vector;
  radius: number;

  // 构造函数，初始化鼠标位置和影响半径，并绑定鼠标和触摸事件
  constructor(canvas: HTMLCanvasElement, dots: Dot[]) {
    this.pos = new Vector(0, 0);
    this.radius = 10;

    const mouseDown = (e: MouseEvent | TouchEvent) => {
      const event = e instanceof MouseEvent ? e : e.touches[0]
      const vec = new Vector(event.clientX, event.clientY);

      //手机端第一次点乱晃bug
      if (e instanceof TouchEvent&&!dragDot) {
        this.pos = vec
      }

      dragDot = dots.reduce((pre: Dot, cur: Dot) => {
        const dist = vec.dist(cur.pos);
        if (dist < this.radius && dist < pre.pos.dist(cur.pos)) {
          return cur
        }
        return pre
      }, new Dot(0, 0))
    }
    const mouseMove = (e: MouseEvent | TouchEvent) => {
      const event = e instanceof MouseEvent ? e : e.touches[0]
      this.pos.setXY(event.clientX, event.clientY)
      if (dragDot) {
        const curFirstStickLength = firstStick?.startPoint.pos.dist(firstStick.endPoint.pos) || 0
        if (curFirstStickLength / (firstStick?.length || 0) > 3) {
          dragDot = null
        }
      }
    }
    const mouseUp = () => {
      dragDot = null
    }


    // 鼠标按下事件，检查是否点击到点
    canvas.onmousedown = mouseDown
    // 鼠标移动事件，更新鼠标位置
    canvas.onmousemove = mouseMove
    // 鼠标释放事件，取消拖动
    canvas.onmouseup = mouseUp


    // 触摸移动事件，更新鼠标位置
    canvas.ontouchstart = mouseDown
    // 触摸移动事件，更新鼠标位置
    canvas.ontouchmove = mouseMove
    // 触摸取消事件，重置鼠标位置
    canvas.ontouchcancel = mouseUp
    // 触摸结束事件，重置鼠标位置
    canvas.ontouchend = mouseUp


  }
}
```

`Mouse` 类实现了鼠标和绳子的交互，定义了两个全局变量`dragDot`和`firstStick`，`dragDot`存储的是点击选中的点，也就是跟随鼠标移动的点，`firstStick`储存第一段`Stick`,如果它的伸缩超过一定倍率，绳子就会松开，也就是将`dragDot`清空。

## 实现绳头（RopeEnd类）
上面的代码我们已经得到了一根鼠标可以交互的绳子了，但是，一根台灯的拉绳一般会有一个绳头，所以我们也要实现绳头效果。

```typescript
// 绳头
class RopeEnd {
  color: string

  constructor(color?: string) {
    this.color = color || '#fff'
  }

  draw(ctx: CanvasRenderingContext2D, pos: Vector): void {
    let shape = [
      new Vector(0, 0).add(pos.x - 2, pos.y),
      new Vector(0, 0).add(pos.x - 4, pos.y + 10),
      new Vector(0, 0).add(pos.x + 4, pos.y + 10),
      new Vector(0, 0).add(pos.x + 2, pos.y)
    ]

    ctx.fillStyle = this.color
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(shape[0].x, shape[0].y)
    ctx.lineTo(shape[1].x, shape[1].y)
    ctx.lineTo(shape[2].x, shape[2].y)
    ctx.lineTo(shape[3].x, shape[3].y)
    ctx.fill()
  }
}
```
`RopeEnd`类很简单，只有一个`draw()`方法，根据传入的初始`pos`绘制出一个梯形。

这就完了吗？绘制出来的结果梯形像个秤砣一样永远是立正的，我们要的是它能随着绳子摆动，就这个效果花费了我不少时间。

首先我们分析一下，绳头的摆动幅度是根据绳子末端的方向摆动的，所以我们再`Rope`类的`update()`方法中要计算出每帧绳子末尾的方向向量：
```typescript
class Rope{
  //...
  // 更新绳子的状态，包括点和棍子
  update(): void {
    this.dots.forEach((dot: Dot) => dot.update(this.mouse));
    for (let i = 0; i < this.iterations; i++) {
      this.sticks.forEach((stick: Stick) => stick.update());
    }
    const lastDot = this.dots[this.dots.length - 1].pos;
    const lastDot2 = this.dots[this.dots.length - (this.dots.length > 5 ? 5 : 2)].pos;
    // 绘制绳子的结尾
    const direction = new Vector(lastDot.x - lastDot2.x, lastDot.y - lastDot2.y).normalize()
    this.ropeEnd.draw(this.ctx, this.dots[this.dots.length - 1].pos, direction)
  }
  //...
}
```
这里取最后一个和倒数第5个点算方向向量，在这之前，在`Vector`类中添加了`normalize()`方法，用于将向量归一化

得到方向了方向，所以在`RopeEnd`的`draw()`方法多传了个`direction`参数，我们拿到了方向要做的就是旋转图像了：

```typescript
// 绳头
class Vector{
  //...
  // 实例方法，获取向量的角度
  getAngle(): number {
    return Math.atan2(this.y, this.x);
  }
  // 实例方法，旋转向量
  rotate(angle: number): Vector {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const newX = this.x * cos - this.y * sin;
    const newY = this.x * sin + this.y * cos;
    this.x = newX;
    this.y = newY;
    return this;
  }
}

class RopeEnd {
  color: string

  constructor(color?: string) {
    this.color = color || '#fff'
  }

  draw(ctx: CanvasRenderingContext2D, pos: Vector, direction: Vector): void {
    let shape = [
      new Vector(0, 0).add(pos.x - 2, pos.y),
      new Vector(0, 0).add(pos.x - 4, pos.y + 10),
      new Vector(0, 0).add(pos.x + 4, pos.y + 10),
      new Vector(0, 0).add(pos.x + 2, pos.y)
    ]
    shape = this.rotateShape(shape, direction, pos)

    ctx.fillStyle = this.color
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(shape[0].x, shape[0].y)
    ctx.lineTo(shape[1].x, shape[1].y)
    ctx.lineTo(shape[2].x, shape[2].y)
    ctx.lineTo(shape[3].x, shape[3].y)
    ctx.fill()

  }

  // 围绕目标点旋转图形的函数
  rotateShape(shape: Vector[], targetDirection: Vector, targetPoint: Vector): Vector[] {
    const defaultAngle = new Vector(0, 1).getAngle();
    const targetAngle = targetDirection.getAngle();
    const rotationAngle = targetAngle - defaultAngle;

    // 平移图形，使目标点移到原点
    const translatedShape = shape.map(point => Vector.sub(point, targetPoint));
    // 旋转图形
    const rotatedShape = translatedShape.map(point => point.rotate(rotationAngle));
    // 平移图形，使目标点回到原来的位置
    return rotatedShape.map(point => Vector.add(point, targetPoint));
  }
}

```
在`Vector`中添加了一个`getAngle()`和`rotate()`方法,这两个方法是辅助计算的，在`RopeEnd`类中添加了一个`rotateShape()`方法，
可以根据传入的shape(`Vector`数组)，方向向量，以及中心点，生成一个围绕中心点朝着方向向量旋转了的shape，看看现在的绳头，就很自然很符合物理效果了。

## 结尾
这个看似简单的绳子模拟，让我深刻体会到：技术的魅力往往藏在细节里。从拆解问题到实现逻辑，每一行代码都是对现实世界的抽象与重构。如今，当屏幕上的绳子随着鼠标拖拽自然摆动时，我知道，这不仅是一段代码的胜利，更是理性与创意结合的美妙成果。
