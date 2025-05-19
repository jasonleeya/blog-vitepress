---
category: JavaScript
order: 1
icon: 
---
<script setup>
import NavHead from "../components/NavHead.vue";
</script>
<nav-head link="/article/前端面试题合集/read.html">
</nav-head>

# JavaScript

## 说说 JavaScript 中的数据类型？

> **String**、**Number**、**Boolean**、**Undefined**、**Null**、**Object**、**Symbol**、**BigInt**

**其中Symbol、BigInt是Es6新增的数据类型：**

`Symbol` 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。

`BigInt` 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

**这些数据可以分为原始数据类型和引用数据类型：**

栈：原始数据类型（Undefined、Null、Boolean、Number、String、Symbol、BigInt）

堆：引用数据类型（对象、数组和函数）

## 什么是变量提升？

> 变量提升是JS代码执行前，把变量和函数的声明“提到”作用域顶部的过程。

- **var声明**：变量会提升，但赋值不提升。比如 `console.log(a)` 会输出 `undefined`（而不是报错），接着 `var a = 5`。
- **let/const**：不会提升，直接访问会报错（进入“暂时性死区”）。
- **函数声明**：整体提升（可提前调用），但函数表达式（如 `var foo = function(){}`）按变量提升规则处理。

## 说说你对闭包的理解？闭包使用场景

> 一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。

在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来，作为函数内部与外部连接起来的一座桥梁。

使用场景：

- 创建私有变量。闭包可以将变量封装在函数内部，避免全局污染，保护变量不被外部访问和修改。
- 延长变量的生命周期。闭包使得函数内部的变量在函数执行完后仍然存在，可以在函数外部继续使用。

[js闭包的6种应用场景](https://zhuanlan.zhihu.com/p/686959137)

## 说说你对作用域链的理解

Javascript中的作用域说的是变量的可访问性和可见性。也就是说整个程序中哪些部分可以访问这个变量，或者说这个变量都在哪些地方可见。

作用域分为，全局作用域，函数作用域，块级作用域，ES6引入了`let`和`const`关键字，和`var`关键字不同，在大括号中使用`let`和`const`声明的变量存在于块级作用域中，在大括号之外不能访问这些变量

作用域链：作用域链是JavaScript中用于查找变量的一种机制。当在Javascript中使用一个变量的时候，首先Javascript引擎会尝试在当前作用域下去寻找该变量，如果没找到，再到它的上层作用域寻找，以此类推直到找到该变量或是已经到了全局作用域，这种一层一层的关系，就是 作用域链。

## 谈谈 this 对象的理解

> `this` 指向当前函数的执行上下文，谁“触发”函数，`this`就指向谁（动态变化）。

**常见规则：**

1. **默认绑定**：函数直接调用时，非严格模式指向 `window`，严格模式为 `undefined`。

   ```javascript
   function show() { console.log(this) }  
   show(); // 浏览器中：window（非严格模式）  
   ```

2. **隐式绑定**：通过对象调用时，指向该对象。

   ```javascript
   const obj = {  
     name: 'a',  
     log() { console.log(this.name) }  
   };  
   obj.log(); // 'a'  
   ```

3. **显式绑定**：用 `call/apply/bind` 强制指定 `this`。

   ```javascript
   function log() { console.log(this.id) }  
   log.call({ id: 3 }); // 3  
   ```

4. **new绑定**：构造函数中，`this`指向新创建的实例。

5. **箭头函数**：没有自己的 `this`，继承外层作用域的 `this`（固定不变）。

**使用场景：**

- 对象方法内操作自身属性（如 `this.name`）。
- 事件回调中指向触发事件的元素（如 `button.addEventListener('click', function() { this === button })`）。
- 箭头函数解决回调中 `this` 丢失问题（如 `setTimeout(() => { this.xx }, 100)`）。

**避坑：**

- 避免将对象方法赋值给变量后调用（如 `const fn = obj.log; fn()` 会导致 `this` 丢失）。
- 回调函数中优先用箭头函数或提前 `bind` 绑定 `this`。

## 什么是原型，原型链? 有什么特点？

**原型**

每个函数都有一个 `prototype(原型)` 属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。原型对象自身也有一个原型，层层上溯，直到达到 `null`，形成一个“原型链”。

![img](https://file.lsj97.com/imgs/2025_04/原型.jpg)

- 每一个构造函数都拥有一个 `prototype` 属性，这个属性指向一个对象，也就是原型对象
- 原型对象默认拥有一个 `constructor` 属性，指向指向它的那个构造函数
- 每个对象都拥有一个隐藏的属性 `__proto__`，指向它的原型对象

**原型链**

JavaScript 中所有的对象都是由它的原型对象继承而来。而原型对象自身也是一个对象，它也有自己的原型对象，这样层层上溯，就形成了一个类似链表的结构，这就是原型链

![img](https://file.lsj97.com/imgs/2025_04/原型链.jpg)

- 所有原型链的终点都是 `Object` 函数的 `prototype` 属性
- `Objec.prototype` 指向的原型对象同样拥有原型，不过它的原型是 `null` ，而 `null` 则没有原型

## 说说你对事件循环的理解

javascript 是一门单线程语言，意思就是同一时间段只能做一件事，所有任务都需要排队依次完成.为了解决单线程运行阻塞问题，JavaScript 用到了计算机系统的一种运行机制，这种机制就叫做事件循环(Event Loop).

在 JavaScript 中，所有的任务都可以分为

- **同步任务**：立即执行的任务，同步任务一般会直接进入到主线程中执行
- **异步任务**：异步执行的任务，比如`ajax`网络请求，`setTimeout `定时函数等

同步任务进入主线程，即主执行栈，异步任务进入任务队列，主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。上述过程的不断重复就是事件循环。

异步任务还可以细分为微任务与宏任务：

**微任务**

一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前

常见的微任务有：

- Promise.then
- MutaionObserver
- Object.observe（已废弃；Proxy 对象替代）
- process.nextTick（Node.js）

**宏任务**

宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合

常见的宏任务有：

- script (可以理解为外层同步代码)
- setTimeout/setInterval
- UI rendering/UI事件
- DOM 事件回调（如 click）等
- postMessage、MessageChannel
- setImmediate、I/O（Node.js）

它们的执行机制是：

- 执行一个宏任务，如果遇到微任务就将它放到微任务的事件队列中
- 当前宏任务执行完成后，会查看微任务的事件队列，然后将里面的所有微任务依次执行完

宏任务与微任务关系如下图：

![img](https://file.lsj97.com/imgs/2025_04/宏任务与微任务.png)

## 数组的常用方法有哪些？

**增**

- `push()` 在数组末尾添加任意多个值，返回数组的最新长度
- `unshift()` 在数组开头添加任意多个值，然后返回新的数组长度
- `splice()` 传入三个参数，分别是开始位置、0（要删除的元素数量）、插入的元素，返回空数组
- `concat()` 首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组，不会影响原始数组

**删**

- `pop()` 删除数组的最后一项，返回被删除的项
- `shift()` 删除数组的第一项，返回被删除的项
- `splice()` 传入两个参数，分别是开始位置，删除元素的数量，返回包含删除元素的数组
- `slice()` 创建一个包含原有数组中一个或多个元素的新数组，不会影响原始数组

**改**

- `splice()` 传入三个参数，分别是开始位置，要删除元素的数量，要插入的任意多个元素，返回删除元素的数组，对原数组产生影响

**查**

- `indexOf()` 返回要查找的元素在数组中的位置，如果没找到则返回`-1`
- `includes()` 返回要查找的元素在数组中的位置，找到返回`true`，否则`false`
- `find()` 返回第一个匹配的元素

**迭代**

- `forEach()` 对数组每一项都运行传入的函数，没有返回值
- `map()` 对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组
- `filter()` 对数组每一项都运行传入的函数，函数返回 `true` 的项会组成数组之后返回
- `some()` 对数组每一项都运行传入的函数，如果有一项函数返回 `true` ，则这个方法返回 `true`
- `every()` 对数组每一项都运行传入的函数，如果对每一项函数都返回 `true` ，则这个方法返回 `true`

**排序**

- `sort()` 方法接受一个比较函数，用于判断哪个值应该排在前面

**反转**

- `reverse()` 将数组元素反转

**转换**

- `join()` 方法接收一个参数，即字符串分隔符，返回包含所有项的字符串

## splice 和 slice 函数有什么区别？

`splice` 是**原地修改**数组的增删方法，返回被删除元素；`slice` 是**非破坏性**截取子数组，返回新数组。

**详细区别**：  

1. **功能与用途**：  
   - **splice**：用于在数组中**添加/删除元素**，直接修改原数组。  
   - **slice**：用于**截取数组片段**，返回新数组，原数组不变。  

2. **参数差异**：  
   - **splice(start, deleteCount, ...items)**：  
     - `start`：操作起始索引  
     - `deleteCount`：删除元素个数（0表示仅添加）  
     - `...items`：可选，要插入的新元素  
   - **slice(start, end)**：  
     - `start`：起始索引（包含）  
     - `end`：结束索引（不包含，可省略）  

3. **返回值**：  
   - `splice` 返回被删除元素组成的数组。  
   - `slice` 返回截取的新数组。  

4. **示例对比**：  
   ```javascript
   let arr = [1, 2, 3, 4];
   
   // splice 示例
   let removed = arr.splice(1, 2, 'a'); 
   // arr变为 [1, 'a', 4]，removed为 [2, 3]
   
   // slice 示例
   let subArr = arr.slice(1, 3); 
   // arr仍为 [1, 'a', 4]，subArr为 ['a', 4]
   ```

**使用场景**：  
- 需要增删元素且关注原数组变化时用 `splice`。  
- 仅需获取子数组副本时用 `slice`。

## JavaScript 由哪三大部分组成?

1. **ECMAScript（核心语法）**：定义基础语法规则（变量、函数、循环等），是 JavaScript 的标准和语言核心。
2. **DOM（文档对象模型）**：提供操作 HTML/XML 文档的接口，用于动态修改页面内容和结构。
3. **BOM（浏览器对象模型）**：提供与浏览器交互的接口（如控制窗口、历史记录、地址栏等）。

## JavaScript 中的宿主对象和原生对象的区别？

1. **原生对象**是JavaScript语言自带的，比如 `Array`、`Date`、`Promise`。不管在浏览器还是Node.js都能用。
2. **宿主对象**是运行环境提供的，比如浏览器里的 `window`、`document`，或者Node.js里的 `fs` 模块。换一个环境可能就用不了了。

## DOM怎样添加、移除、移动、复制、创建和查找节点？

1. **创建节点**： `document.createElement('div')`（元素）或 `document.createTextNode('文字')`。
2. **添加节点**： `父元素.appendChild(子元素)`（末尾）或 `父元素.insertBefore(新元素, 参考元素)`（插入到参考元素前）。
3. **移除节点**： `父元素.removeChild(子元素)` 或直接 `子元素.remove()`。
4. **移动节点**： 先获取要移动的元素，再用 `新父元素.appendChild(旧元素)`，自动从原位置移除。
5. **复制节点**： `const clone = 元素.cloneNode(true)`（`true`表示深拷贝子节点）。
6. **查找节点**：
   - `document.getElementById('id')`
   - `document.querySelector('.类名')`
   - `父元素.getElementsByTagName('div')`

## JavaScript 代码中的"use strict"是什么意思 ?

`"use strict"` 是 JavaScript 的**严格模式声明**，用于让代码在更严格的语法检查下运行，帮助开发者避免常见错误，提升代码安全性和性能。

**严格模式的核心变化**:

1. 变量必须声明
2. 禁止删除不可删除的属性
3. 禁止重复参数名
4. 限制 `this` 的值
   - **非严格模式**：全局函数中的 `this` 指向 `window`。
   - **严格模式**：未绑定的函数中 `this` 为 `undefined`。

## 字符串的常用方法有哪些？

**增**

- `concat` 用于将一个或多个字符串拼接成一个新字符串

**删**

这里的删的意思并不是说删除原字符串的内容，而是创建字符串的一个副本，再进行操作

常见的有：

- `slice()`
- `substr()`
- `substring()`

```javascript
let stringValue = "hello world";
console.log(stringValue.slice(3)); // "lo world"
console.log(stringValue.substring(3)); // "lo world"
console.log(stringValue.substr(3)); // "lo world"
console.log(stringValue.slice(3, 7)); // "lo w"
console.log(stringValue.substring(3,7)); // "lo w"
console.log(stringValue.substr(3, 7)); // "lo worl"
```

**改**

这里改的意思也不是改变原字符串，而是创建字符串的一个副本，再进行操作

常见的有：

- `trim()`、`trimLeft()`、`trimRight()` 删除前、后或前后所有空格符，再返回新的字符串
- `repeat()` 接收一个整数参数，表示要将字符串复制多少次，然后返回拼接所有副本后的结果
- `padStart()`、`padEnd()` 复制字符串，如果小于指定长度，则在相应一边填充字符，直至满足长度条件
- `toLowerCase()`、 `toUpperCase()` 大小写转化

**查**

- `chatAt()` 返回给定索引位置的字符，由传给方法的整数参数指定
- `indexOf()` 从字符串开头去搜索传入的字符串，并返回位置,如果没找到，则返回`-1`
- `startWith()` 从字符串中搜索传入的字符串，并返回一个表示是否以搜索字符串开头的布尔值
- `includes()` 从字符串中搜索传入的字符串，并返回一个表示是否包含的布尔值

**转换**

- `split` 把字符串按照指定的分割符，拆分成数组中的每一项

**模板匹配**

- `match()` 接收一个参数，可以是一个正则表达式字符串，也可以是一个`RegExp`对象，返回数组
- `search()` 接收一个参数，可以是一个正则表达式字符串，也可以是一个`RegExp`对象，找到则返回匹配索引，否则返回 `-1`
- `replace()` 接收两个参数，第一个参数为匹配的内容，第二个参数为替换的元素（可用函数）

## substring 和 substr 函数的区别是什么？

## JavaSript 中如何判断一个变量的类型

- **typeof**

对于基本数据类型判断是没有问题的，但是遇到引用数据类型(如：array object) 是不起作用 其中对 `array` `object` `null` 返回的结果都是`object`。

- **instanceof** 

可以检测array,object但是不能检测基本类型的数据也包括null也不可以 **`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

- **constructor** 

不能判断undefined和null，并且使用它是不安全的，因为contructor的指向是可以改变的

- **Object.prototype.toString.call()**

方法可以精确地判断一个变量的具体类型。它返回一个表示变量具体类型的字符串，格式为"[object Type]"。

*注意：*通过`[Symbol.toStringTag]`可以更改 "[object Type]"里面的`Type`

- **Array.isArray**判断是否是数组类型，**Number.isNaN**判断是否是`NaN`

## 如何检测一个对象是否为空对象？

**1. `Object.keys()` 判断属性数量**

```javascript
const isEmpty = Object.keys(obj).length === 0;  
```

**2. `JSON.stringify()` 序列化对比：**

```javascript
const isEmpty = JSON.stringify(obj) === '{}';  
```

**缺点**：忽略值为 `undefined` 或函数的属性，无法处理循环引用。

## typeof 于 instanceof 区别

**typeof**用于检测**基本类型**，返回类型字符串（null除外，返回‘object’）， **instanceof**用于检查**引用类型**（判断对象是否是某构造函数的实例）

## == 和 ===区别

> 相等操作符`==`会做类型转换，再进行值的比较，全等运算符`===`不会做类型转换

`==`的转换规则：

- 两个都为简单类型，字符串和布尔值都会转换成数值，再比较
- 简单类型与引用类型比较，对象转化成其原始类型的值，再比较
- 两个都为引用类型，则比较它们是否指向同一个对象
- null 和 undefined 相等
- 存在 NaN 则返回 false

## 什么是强制（显式）类型转换？什么是隐式类型转换？

区别在于是否主动写代码转换类型：

**1. 强制（显式）转换：**

- **主动调用方法或函数**，明确告诉JS转成什么类型。

- **常用方式**：

  ```javascript
  Number('123')     // 字符串→数字：123  
  String(123)       // 数字→字符串："123"  
  Boolean(0)        // → false  
  parseInt("12px")  // →12（提取数字部分）  
  obj.toString()    // 显式调用对象转字符串  
  ```

**2. 隐式转换：**

- **JS引擎自动转换**，通常发生在操作符或逻辑判断中。

- **常见场景**：

  ```javascript
  // 算术运算：非数字转成数字  
  '5' - 2    // →3（'5'隐式转5）  
  '5' + 2    // →"52"（+遇到字符串优先拼接）  
  
  // 逻辑判断：转布尔  
  if (0) { ... }      // 0 → false  
  !''                // →true（空字符串→false，取反后true）  
  
  // ==比较：类型不同时自动转换  
  '5' == 5           // →true（字符串转数字）  
  null == undefined  // →true（特殊规则）  
  ```

**避坑建议**：

- 用 `===` 代替 `==` 避免隐式转换（如 `0 === false` → false）。
- 复杂转换尽量显式写清逻辑（如 `+new Date()` 转时间戳）。

## 隐式类型转换的转换规则是怎么样的？

## 什么是 JavaScript 中的包装类型？

## null 和 undefined 的区别？

`null`和`undefined`都是js中的特殊值，表示缺失或未定义的值。

`null`表示一个空对象指针，即该变量本应该指向一个对象，但是现在没有指向任何一个对象。

`undefined`表示一个未定义的值，即该变量没有被赋值或者被赋值为undefined。

## NaN是什么？它的类型是什么？如何可靠地判断一个值是否等于NaN？

**NaN**（Not a Number）表示“不是一个有效的数字”，但它的类型是 `Number`（属于数字类型）,判断方法`Number.isNaN(NaN);`,不能直接“\==”或“\===”判断，`NaN ===NaN`结果是`false`

## isNaN 和 Number.isNaN 函数有什么区别？

isNaN会对值先转换成数字，比如：`isNaN('一')`,`一`转换成了`NaN`，返回`true`

Number.isNaN不会进行转换，不是NaN一律返回false

## typeof null 返回什么？为什么？如何检测 null？

**`typeof null` 返回 `"object"`**,**原因**：JS早期设计的遗留问题。null的二进制表示全为0，而对象类型标签也是0，导致误判。虽不合理，但为兼容性保留至今。 **检测 null 的正确方法**：用严格等于（`===`）,不要用 `typeof`（会误判为对象）或 `==`（`null == undefined` 返回true）。

## 深拷贝浅拷贝的区别？如何实现一个深拷贝？

**浅拷贝**

指的是创建新的数据，这个数据有着原始数据属性值的一份精确拷贝

如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址

即浅拷贝是拷贝一层，深层次的引用类型则共享内存地址

实现：

```javascript
function shallowClone(obj) {
    const newObj = {};
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)){
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
}
```

**深拷贝**

深拷贝开辟一个新的栈，两个对象属完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

- `JSON.stringify()`实现,只适合简单对象

```javascript
const obj2=JSON.parse(JSON.stringify(obj1));
```

- 循环递归

```javascript
// 简单版
function deepClone(obj) {
  if (typeof obj !== 'object' || target === null) {
    return obj
  }
  let newObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    newObj[key] = deepClone(obj[key])
  }
  return newObj
}

//hash
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Map){
      let map = new Map()
	  obj.forEach((v, k) => map.set(k, deepClone(v, hash)));  
      return map;
  }
  if (obj instanceof Set) {
      let set = new Set()
	  obj.forEach(v => set.add(deepClone(v, map)));  
      return map;
  }
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
```

## 说说什么是事件代理?

> 事件代理（事件委托）是把子元素的事件监听绑定到父元素上，利用**事件冒泡**统一处理。

**为什么用？**

1. **节省内存**：减少事件处理函数数量（尤其动态添加的子元素无需重复绑定）。
2. **简化逻辑**：比如动态列表，新增元素自动继承父级事件。

**关键点：**

- 通过 `e.target` 识别实际点击的子元素。
- 父元素不阻止冒泡（别用 `e.stopPropagation()`）。

**适用场景：**

- 列表、表格等重复元素的交互。
- 大量子元素需要相同事件（如按钮组）。

**对比直接绑定：**

- 直接绑每个 `li`：3次事件监听。
- 事件代理：1次监听，后续新增 `li` 自动生效。

## JavaScript 如何阻止冒泡事件和默认事件？

1. **阻止冒泡**： `event.stopPropagation()` （比如点击子元素时，阻止父元素的同类事件被触发）
2. **阻止默认事件**： `event.preventDefault()` （比如点了`<a>`链接但不想跳转，或提交表单时阻止页面刷新）

## 说说基本数据类型和引⽤类型在存储上的差别

基本类型直接存在栈内存中,引用类型数据存在堆内存中，变量保存的是堆内存的地址引用。

## 进程和线程的区别是什么？

> 进程是资源分配的最小单位，线程是程序执行的最小单位

**通俗解释：**

把电脑想象成一家餐馆：

- **进程** = **独立餐馆**：每个餐馆有自己的厨房（内存）、食材（资源）、员工。一家店着火不会影响隔壁店。
- **线程** = **同一餐馆里的多个厨师**：共享厨房和食材，协作高效，但一个厨师切到手可能整个餐馆停摆。

## JavaScript 中执行上下文和执行栈是什么？

在 JavaScript 中，**执行上下文（Execution Context）** 是代码执行时的环境，每个函数调用或全局代码运行都会创建一个。它包含三部分：

1. **变量环境**（存放变量和函数声明，即变量提升），
2. **作用域链**（决定变量访问顺序），
3. **`this` 的值**（由调用方式决定）。

**执行栈（Execution Stack）** 是管理执行上下文的调用栈，遵循后进先出（LIFO）规则。

- 当代码开始执行，全局上下文首先入栈；
- 每次调用函数，其上下文入栈并执行；
- 执行完毕则弹出栈，回到上一层上下文。

例如：

```javascript
function a() { b(); }
function b() { c(); }
function c() {}
a(); // 执行栈顺序：全局 → a → b → c，执行完依次弹出。
```

**核心作用**：执行栈确保代码按顺序运行，而执行上下文保存了代码执行所需的所有信息（变量、作用域、`this`）。它们是理解闭包、作用域链和异步编程的基础。

## 你知道哪些内置对象？

**1. 核心内置对象（ECMAScript定义）**

- **数据包装**：`String`、`Number`、`Boolean`、`Symbol`（ES6）
- **集合类**：`Array`、`Object`、`Map`（ES6）、`Set`（ES6）
- **工具类**：
  - `Math`（数学计算，如 `Math.random()`）
  - `Date`（日期处理）
  - `JSON`（数据序列化）
  - `RegExp`（正则表达式）
  - `Error`（错误类型，如 `new TypeError()`）

**2. 浏览器环境对象（BOM/DOM）**

- **BOM（浏览器对象模型）**：
  - `Window`（全局对象，如 `window.location`）
  - `Navigator`（浏览器信息，如 `navigator.userAgent`）
  - `History`（页面历史，如 `history.back()`）
- **DOM（文档对象模型）**：
  - `Document`（文档操作，如 `document.getElementById()`）
  - `Element`（节点操作，如 `element.classList`）
  - `Event`（事件对象，如 `event.preventDefault()`）

**3. ES6+新增对象**

- `Promise`（异步处理）
- `Proxy`（对象代理拦截）
- `Reflect`（对象操作工具集）
- `Intl`（国际化，如日期/货币格式化）

## 说几条写 JavaScript 的基本规范

**1. 代码风格**

- **缩进**：统一用2个空格或Tab（避免混用）。
- **命名**：变量/函数用驼峰式（如 `userName`），类名用帕斯卡（如 `class User{}`），常量全大写（如 `MAX_SIZE`）。
- **行尾分号**：统一风格（要么全加，要么全不加）。

**2. 变量与作用域**

- **声明**：优先 `const`，其次 `let`，避免 `var`（防止变量提升问题）。
- **作用域**：限制变量作用域，避免全局污染（用IIFE或模块化封装）。
- **链式赋值**：避免 `let a = b = 0`（可能意外创建全局变量）。

**3. 类型与比较**

- **类型检查**：用 `===` 而非 `==`（避免隐式转换）。
- **布尔转换**：显式判断（如 `if (arr.length > 0)` 而非 `if (arr.length)`）。
- **判空**：用 `value == null` 代替 `value === undefined || value === null`（简化代码）。

**4. 模块化与异步**

- **模块导入**：使用ES6 `import/export` 替代 `require`（静态加载）。
- **异步处理**：优先 `async/await` 替代回调地狱或链式 `.then()`。
- **错误处理**：Promise用 `.catch()`，async用 `try/catch`。

**5. 性能与安全**

- **DOM操作**：减少重绘（如批量修改后一次性插入文档）。
- **事件监听**：及时解绑（如 `removeEventListener`）。
- **避免 `eval()`**：防止XSS攻击和性能问题。

**6. 其他实用规范**

- **对象属性**：动态属性名用计算属性（如 `{ [key]: value }`）。
- **数组成员**：用 `includes()` 替代 `indexOf() !== -1`（更直观）。
- **字符串拼接**：优先模板字符串（如 `Hello ${name}`）。

## JavaScript 创建对象的方法有哪些？

JavaScript 创建对象的常用方法包括**对象字面量、构造函数、工厂模式、原型模式、组合模式、ES6类语法**等，核心围绕原型链与封装实现不同场景需求。  

**具体方法与示例**  

**1. 对象字面量（直接创建）**  

```javascript  
const obj = {  
  name: 'Jack',  
  sayHi() { console.log('Hi!'); }  
};  
```
- **特点**：简单直观，适合单例对象，无法复用。  

**2. 构造函数模式**  

```javascript  
function Person(name) {  
  this.name = name;  
  this.sayHi = function() { console.log('Hi!'); };  
}  
const person = new Person('Jack');  
```
- **特点**：通过 `new` 创建实例，每个方法需重新创建（内存浪费）。  

**3. 工厂模式**  

```javascript  
function createPerson(name) {  
  return {  
    name,  
    sayHi() { console.log('Hi!'); }  
  };  
}  
const person = createPerson('Jack');  
```
- **特点**：封装创建过程，但无法识别对象类型（`instanceof` 无效）。  

**4. 原型模式**  

```javascript  
function Person() {}  
Person.prototype.name = 'Jack';  
Person.prototype.sayHi = function() { console.log('Hi!'); };  
const person = new Person();  
```
- **特点**：方法共享，属性独立需手动添加，引用类型属性可能被误改。  

**5. 组合模式（构造函数 + 原型）**  

```javascript  
function Person(name) {  
  this.name = name;  
}  
Person.prototype.sayHi = function() { console.log('Hi!'); };  
const person = new Person('Jack');  
```
- **特点**（**最常用**）：构造函数定义属性，原型定义方法，兼顾独立性与共享性。  

**6. 动态原型模式**  

```javascript  
function Person(name) {  
  this.name = name;  
  // 仅首次调用时初始化原型  
  if (typeof this.sayHi !== 'function') {  
    Person.prototype.sayHi = function() { console.log('Hi!'); };  
  }  
}  
const person = new Person('Jack');  
```
- **特点**：延迟原型初始化，更优雅的封装。  

**7. 寄生构造函数模式**  

```javascript  
function Person(name) {  
  const obj = new Object();  
  obj.name = name;  
  obj.sayHi = function() { console.log('Hi!'); };  
  return obj; // 覆盖默认返回的实例  
}  
const person = new Person('Jack');  
```
- **特点**：类似工厂模式，但使用 `new` 操作符，适用于扩展已有对象。  

**8. Object.create()（原型式继承）**  

```javascript  
const personProto = {  
  sayHi() { console.log('Hi!'); }  
};  
const person = Object.create(personProto);  
person.name = 'Jack';  
```
- **特点**：基于现有对象创建，无需构造函数，适合简单继承场景。  

**9. ES6类语法（语法糖）**  

```javascript  
class Person {  
  constructor(name) {  
    this.name = name;  
  }  
  sayHi() { console.log('Hi!'); }  
}  
const person = new Person('Jack');  
```
- **特点**：语法更清晰，本质仍是原型继承，支持 `static`、`extends` 等特性。  

**对比与选型建议**  

| **方法**     | **优点**               | **缺点**      | **适用场景**         |
| ------------ | ---------------------- | ------------- | -------------------- |
| **字面量**   | 简单快速               | 无法复用      | 单例对象             |
| **构造函数** | 类型识别（instanceof） | 方法重复创建  | 需明确类型标识       |
| **组合模式** | 属性独立、方法共享     | 代码稍冗余    | 通用对象创建（推荐） |
| **ES6类**    | 语法简洁、易维护       | 需支持ES6环境 | 现代项目（首选）     |

**总结**：  
- **简单对象**：使用字面量或 `Object.create()`；  
- **复杂可复用对象**：组合模式或 ES6 类；  
- **特殊需求**：工厂模式、寄生构造函数。

## JavaScript 如何实现继承？

JavaScript 通过 **原型链机制** 实现继承，常见方式包括原型链继承、构造函数继承、组合继承、寄生组合继承（最优解）及 ES6 `class` 语法糖，核心在于复用父类属性和方法。  

**1. 原型链继承**  

**原理**：子类原型指向父类实例，继承父类方法。  
```javascript  
function Parent() {  
  this.name = 'Parent';  
}  
Parent.prototype.say = function() { console.log(this.name); }  

function Child() {}  
Child.prototype = new Parent(); // 继承  

const child = new Child();  
child.say(); // 'Parent'  
```
**缺点**：  
- 父类引用属性被所有子类实例共享；  
- 无法向父类构造函数传参。  

**2. 构造函数继承**  

**原理**：子类构造函数内调用父类构造函数，继承父类属性。  
```javascript  
function Parent(name) {  
  this.name = name;  
}  

function Child(name) {  
  Parent.call(this, name); // 继承属性  
}  

const child = new Child('Child');  
console.log(child.name); // 'Child'  
```
**缺点**：  
- 无法继承父类原型方法；  
- 方法需定义在构造函数中，无法复用。  

**3. 组合继承（常用）**  

**原理**：结合原型链继承方法 + 构造函数继承属性。  
```javascript  
function Parent(name) {  
  this.name = name;  
}  
Parent.prototype.say = function() { console.log(this.name); }  

function Child(name) {  
  Parent.call(this, name); // 第二次调用 Parent  
}  
Child.prototype = new Parent(); // 第一次调用 Parent  

const child = new Child('Child');  
child.say(); // 'Child'  
```
**缺点**：  
- 父类构造函数被调用两次，导致子类原型中存在冗余属性。  

**4. 寄生组合继承（最优解）**  

**原理**：通过 `Object.create()` 优化组合继承，避免重复调用父类构造函数。  
```javascript  
function Parent(name) {  
  this.name = name;  
}  
Parent.prototype.say = function() { console.log(this.name); }  

function Child(name) {  
  Parent.call(this, name);  
}  
// 关键：创建父类原型的副本，避免直接引用  
Child.prototype = Object.create(Parent.prototype);  
Child.prototype.constructor = Child; // 修复构造函数指向  

const child = new Child('Child');  
child.say(); // 'Child'  
```
**优点**：  
- 只调用一次父类构造函数；  
- 原型链保持纯净，无冗余属性。  

**5. ES6 `class` 继承**  

**原理**：语法糖，底层基于寄生组合继承实现。  
```javascript  
class Parent {  
  constructor(name) {  
    this.name = name;  
  }  
  say() { console.log(this.name); }  
}  

class Child extends Parent {  
  constructor(name) {  
    super(name); // 调用父类构造函数  
  }  
}  

const child = new Child('Child');  
child.say(); // 'Child'  
```
**优势**：  
- 语法简洁，内置 `super` 访问父类；  
- 支持 `static` 方法继承；  
- 推荐使用，需 Babel 转译兼容旧浏览器。  

**继承方案对比**  

| **方式**         | **优点**                          | **缺点**                          | **推荐指数** |  
|------------------|----------------------------------|----------------------------------|------------|  
| 原型链继承        | 简单                              | 引用属性共享、无法传参               | ★☆☆☆☆      |  
| 构造函数继承      | 独立实例属性、支持传参              | 无法继承原型方法                   | ★★☆☆☆      |  
| 组合继承          | 属性独立、方法共享                  | 父类构造函数调用两次                | ★★★☆☆      |  
| 寄生组合继承      | 最优性能、无冗余属性                | 代码稍复杂                         | ★★★★★      |  
| ES6 `class`      | 语法简洁、易维护                   | 需转译兼容旧环境                    | ★★★★★      |  

**总结**：  
- **现代项目首选**：ES6 `class`（Babel 转译 + 寄生组合继承）；  
- **兼容旧环境**：手动实现寄生组合继承；  
- **避免使用**：纯原型链/构造函数继承（存在明显缺陷）。

## 说说new操作符具体干了什么？

- 创建一个新的对象`obj`
- 将对象与构建函数通过原型链连接起来
- 将构建函数中的`this`绑定到新建的对象`obj`上
- 根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理

```javascript
function mynew(Func, ...args) {
    // 1.创建一个新对象
    const obj = {}
    // 2.新对象原型指向构造函数原型对象
    obj.__proto__ = Func.prototype
    // 3.将构建函数的this指向新对象
    let result = Func.apply(obj, args)
    // 4.根据返回值判断
    return result instanceof Object ? result : obj
}
```

## new一个函数和直接调用函数以及和 Object.create 的区别?

在 JavaScript 中，`new` 调用构造函数、直接调用函数和 `Object.create()` 三者在 **对象创建方式**、**原型链处理**、**`this` 绑定** 和 **返回值** 上存在显著差异。以下是详细对比：

**一、核心区别对比表**

| 特征             | `new Func()`                           | 直接调用 `Func()`            | `Object.create(obj)`         |
| :--------------- | :------------------------------------- | :--------------------------- | :--------------------------- |
| **对象创建**     | 创建新对象                             | 无新对象（除非显式返回）     | 创建新对象                   |
| **原型链**       | `新对象.__proto__ = Func.prototype`    | 无原型链绑定                 | `新对象.__proto__ = obj`     |
| **`this` 指向**  | 指向新对象                             | 全局/`undefined`（严格模式） | 无 `this` 绑定（不执行函数） |
| **返回值**       | 默认返回新对象（除非构造函数返回对象） | 返回 `return` 的值           | 返回新对象                   |
| **函数是否执行** | 是                                     | 是                           | 否                           |

**二、详细分步解析**

1. **`new Func()`：构造调用**

- **步骤**：

  1. **创建空对象**：隐式创建一个新对象 `{}`。
  2. **绑定原型**：新对象的原型指向 `Func.prototype`（即 `新对象.__proto__ === Func.prototype`）。
  3. **绑定 `this`**：函数内部的 `this` 指向新对象。
  4. **执行函数**：执行构造函数代码，初始化属性。
  5. **处理返回值**：
     - 若构造函数返回 **对象/函数**，则替代新对象。
     - 若返回 **原始值**（如 `number`、`string`），则忽略，仍返回新对象。

- **代码示例**：

  ```javascript
  function Person(name) {
    this.name = name;
  }
  const p = new Person("Alice");
  console.log(p.name); // "Alice"
  console.log(p instanceof Person); // true
  ```

1. **直接调用 `Func()`：普通函数调用**

- **步骤**：

  1. **无新对象**：不会隐式创建对象。
  2. **`this` 指向**：
     - 非严格模式：`this` 指向全局对象（如 `window`）。
     - 严格模式（`'use strict'`）：`this` 为 `undefined`。
  3. **执行函数**：按普通函数执行。
  4. **返回值**：由 `return` 决定，默认返回 `undefined`。

- **代码示例**：

  ```javascript
  function setName(name) {
    this.name = name; // 非严格模式下污染全局
  }
  setName("Bob");
  console.log(window.name); // "Bob"（非严格模式）
  ```

1. **`Object.create(obj)`：纯净原型继承**

- **步骤**：

  1. **创建新对象**：隐式创建一个新对象。
  2. **绑定原型**：新对象的原型指向传入的 `obj`（即 `新对象.__proto__ === obj`）。
  3. **无 `this` 绑定**：不执行任何函数，仅设置原型链。
  4. **返回值**：直接返回新对象。

- **代码示例**：

  ```javascript
  const animal = { eats: true };
  const rabbit = Object.create(animal);
  console.log(rabbit.eats); // true（通过原型链继承）
  console.log(rabbit.__proto__ === animal); // true
  ```

**三、对比场景与最佳实践**

1. **对象创建方式**

- **`new Func()`**：适合需要 **初始化属性** 的场景（如构造函数）。
- **`Object.create()`**：适合需要 **纯净原型继承** 的场景（如创建子类）。
- **直接调用**：通常用于工具函数，需避免内部使用 `this`。

1. **原型链控制**

- **`new Func()`**：自动绑定到 `Func.prototype`，适合基于类的继承。

- **`Object.create()`**：手动指定原型对象，适合原型式继承（如工厂模式）。

  ```javascript
  // 原型式继承
  const personProto = { greet() { console.log("Hi!") } };
  const john = Object.create(personProto);
  john.greet(); // "Hi!"
  ```

1. **防御性编程**

- 防止 `new` 被遗漏：

  ```javascript
  function User(name) {
    if (!(this instanceof User)) { // 或使用 new.target
      return new User(name);
    }
    this.name = name;
  }
  const u1 = User("Alice"); // 自动补 new
  const u2 = new User("Bob");
  ```

**四、常见问题与陷阱**

1. **混淆 `new` 和直接调用**

- **错误示例**：

  ```javascript
  function Car(model) { this.model = model; }
  const c = Car("Tesla"); // 未用 new，this 指向全局！
  console.log(c); // undefined（函数无返回值）
  console.log(window.model); // "Tesla"（全局污染）
  ```

1. **`Object.create(null)` 创建无原型对象**

- 生成一个完全纯净的对象（无 `__proto__`、`toString` 等方法）：

  ```javascript
  const dict = Object.create(null); // 无原型链
  dict.name = "Dictionary";
  console.log(dict.toString); // undefined（避免原型方法干扰）
  ```

1. **构造函数返回对象的影响**

- 若构造函数返回对象，`new` 会丢弃默认对象：

  ```javascript
  function Cat() { return { meow: "Meow!" }; }
  const cat = new Cat();
  console.log(cat.meow); // "Meow!"（非 Cat 实例）
  ```

  **五、总结与最佳实践**

- **使用 `new`**：需要创建实例并初始化属性时（结合 `class` 语法更安全）。

- **使用 `Object.create()`**：需要精确控制原型链时（如实现组合继承、工厂模式）。

- **直接调用函数**：无对象创建需求时，避免内部依赖 `this`，或用严格模式防止污染全局。



## 说说你对 new.target 的理解

## 说说 JavaScript 中的事件模型

**1. 原始事件模型（DOM0级）**

事件绑定监听函数比较简单, 有两种方式：

- HTML代码中直接绑定

```
<input type="button" onclick="fun()">
```



- 通过`JS`代码绑定

```
var btn = document.getElementById('.btn');
btn.onclick = fun;
```

特性：

- 绑定速度快`DOM0`级事件具有很好的跨浏览器优势，会以最快的速度绑定，但由于绑定速度太快，可能页面还未完全加载出来，以至于事件可能无法正常运行
- 只支持冒泡，不支持捕获
- 同一个类型的事件只能绑定一次

**2. 标准事件模型（DOM2级）**

在该事件模型中，一次事件共有三个过程:

- 事件捕获阶段：事件从`document`一直向下传播到目标元素, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行
- 事件处理阶段：事件到达目标元素, 触发目标元素的监听函数
- 事件冒泡阶段：事件从目标元素冒泡到`document`, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行

事件绑定监听函数的方式如下:

```
addEventListener(eventType, handler, useCapture)
```

事件移除监听函数的方式如下:

```
removeEventListener(eventType, handler, useCapture)
```

特性：

- 可以在一个`DOM`元素上绑定多个事件处理器，各自并不会冲突
- 当第三个参数(`useCapture`)设置为`true`就在捕获过程中执行，反之在冒泡过程中执行处理函数

**3. IE事件模型（基本不用）**

IE事件模型共有两个过程:

- 事件处理阶段：事件到达目标元素, 触发目标元素的监听函数。
- 事件冒泡阶段：事件从目标元素冒泡到`document`, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行

事件绑定监听函数的方式如下:

```
attachEvent(eventType, handler)
```

事件移除监听函数的方式如下:

```
detachEvent(eventType, handler)
```

## bind、call、apply 区别？分别如何实现?

`call `、`apply `、`bind `作用是改变函数执行时的上下文，简而言之就是改变函数运行时的`this`指向。

`apply`接受两个参数，第一个参数是`this`的指向，第二个参数是函数接受的参数，以数组的形式传入，改变`this`指向后原函数会立即执行，且此方法只是临时改变`this`指向一次；

`call`方法的第一个参数也是`this`的指向，后面传入的是一个参数列表，跟`apply`一样，改变`this`指向后原函数会立即执行，且此方法只是临时改变`this`指向一次；

`bind`方法和`call`很相似，第一参数也是`this`的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)

改变`this`指向后不会立即执行，而是返回一个永久改变`this`指向的函数。

```
Function.prototype.myCall = function (context, ...args){
    context = context || window
    // 这里的 this 是指向 fn 的，通过 this 就可以获取 fn，context 是我们的 obj，可以直接给 obj 添加一个函数属性
    context.fn = this
    delete context.fn(...args)
    return
}
Function.prototype.myApply = function (context, args){
    context = context || window
    context.fn = this
    delete context.fn(args)
    return
}
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  let self = this
  return function (...args) {
    context.temp = self
    context.temp(...args)
    delete context.temp
  }
}
```

## Javascript 本地存储的方式有哪些？区别及应用场景？

javaScript本地缓存的方法我们主要讲述以下四种：

- **cookie**

`Cookie`，类型为小型文本文件，一般不超过 4KB，是为了辨别用户身份而储存在用户本地终端上的数据。是为了解决 `HTTP `无状态导致的问题

但是`cookie`在每次请求中都会被发送，如果不使用 `HTTPS `并对其加密，其保存的信息很容易被窃取，导致安全风险。举个例子，在一些使用 `cookie `保持登录态的网站上，如果 `cookie `被窃取，他人很容易利用你的 `cookie `来假扮成你登录网站

- localStorage

`localStorage` 用于持久化的本地存储数据，大小一般为5M（跟浏览器厂商有关系），保存的数据没有过期时间，直到手动去删除

- sessionStorage

`sessionStorage `和 `localStorage `使用方法基本一致，唯一不同的是生命周期，一旦页面（会话）关闭，`sessionStorage` 将会删除数据

- indexedDB

`IndexedDB` 是一个内置于浏览器的大型对象存储，允许您使用键值对持久存储数据

## 什么是防抖和节流？有什么区别？如何实现？

本质上是优化高频率执行代码的一种手段

- 节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效

```
//时间戳写法
function throttled1(fn, delay = 500) {
    let oldtime = Date.now()
    return function (...args) {
        let newtime = Date.now()
        if (newtime - oldtime >= delay) {
            fn.apply(null, args)
            oldtime = Date.now()
        }
    }
}
//定时器写法
function throttled2(fn, delay = 500) {
    let timer = null
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null
            }, delay);
        }
    }
}
```

- 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时

```javascript
function debounce(func, wait) {
    let timeout;

    return function () {
        let context = this; // 保存this指向
        let args = arguments; // 拿到event对象

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}
```

## 你知道哪些数组去重方法？

**1. 使用 `Set`（ES6 最简单方式）**

**原理**：利用 `Set` 数据结构元素唯一的特性。 **代码**：

```javascript
const uniqueArray = [...new Set(array)];  
```

**优点**：代码简洁，时间复杂度 O(n)。 **缺点**：无法处理对象类型的去重（对象引用不同视为不同元素）。

**2. `filter` + `indexOf`（兼容性好）**

**原理**：过滤出第一个出现的元素。 **代码**：

```javascript
const uniqueArray = array.filter((item, index) => array.indexOf(item) === index);  
```

**优点**：兼容旧环境（ES5）。 **缺点**：时间复杂度 O(n²)，不处理 `NaN`（`indexOf` 无法识别 `NaN`）。

**3. `reduce` 累加去重**

**原理**：遍历数组，仅保留未累积过的元素。 **代码**：

```javascript
const uniqueArray = array.reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], []);  
```

**优点**：函数式编程风格。 **缺点**：时间复杂度 O(n²)，`includes` 同样无法处理 `NaN`。

**4. 排序后相邻比较（空间复杂度低）**

**原理**：排序后相同元素相邻，跳过重复项。 **代码**：

```javascript
const sortedArr = [...array].sort();  
const uniqueArray = sortedArr.filter((item, index) => index === 0 || item !== sortedArr[index-1]);  
```

**优点**：时间复杂度 O(n log n)（排序占主导）。 **缺点**：改变原数组顺序，无法处理对象。

**5. 处理 `NaN` 的增强版**

**原理**：`NaN` 是唯一不等于自身的值，需特殊判断。 **代码**：

```javascript
const uniqueArray = array.filter((item, index) =>  
  index === array.findIndex(i => i === item || (Object.is(i, NaN) && Object.is(item, NaN))  
);  
```

**适用场景**：数组中可能包含 `NaN`。

**6. 对象数组去重（特定属性去重）**

**原理**：利用哈希表记录唯一键值。 **代码**：

```
const uniqueByKey = (arr, key) => {  
  const map = new Map();  
  return arr.filter(item => !map.has(item[key]) && map.set(item[key], true));  
};  
```

**示例**：根据 `id` 去重：`uniqueByKey(users, 'id')`。

**总结**

- **推荐方法**：优先使用 `Set`（简单高效），需处理 `NaN` 或对象时选择对应方案。
- **性能考量**：数据量大时避免 O(n²) 方法（如双重循环）。
- **特殊类型**：注意区分引用类型（对象、数组）的去重逻辑

## 说说 ajax 原理?

AJAX（Asynchronous JavaScript and XML）核心是**用JavaScript异步发送HTTP请求**，无需刷新页面即可更新数据。

**原理步骤：**

1. **创建请求对象**： 用 `XMLHttpRequest`（传统）或 `fetch` API（现代）。

   ```javascript
   const xhr = new XMLHttpRequest();  
   ```

2. **配置请求**： 指定方法（GET/POST等）、URL、是否异步（默认true）。

   ```javascript
   xhr.open('GET', '/api/data', true);  
   ```

3. **设置回调**： 监听请求状态变化，处理响应。

   ```javascript
   xhr.onreadystatechange = function() {  
     if (xhr.readyState === 4 && xhr.status === 200) {  
       console.log(xhr.responseText); // 获取响应数据  
     }  
   };  
   ```

4. **发送请求**：

   ```javascript
   xhr.send(); // POST可传参数，如xhr.send(JSON.stringify({ key: 'value' }));  
   ```
   
   

## 说说你对 fetch 的理解，它有哪些优点和不足？

## 异步加载 JS 的方式有哪些?

**1. `defer` 属性**

- **用法**：`<script defer src="script.js"></script>`
- **特点**：
  - **延迟执行**：脚本在 HTML 解析完成后、`DOMContentLoaded` 事件前按顺序执行。
  - **不阻塞渲染**：异步下载，保持执行顺序（适合多个依赖脚本）。

**2. `async` 属性**

- **用法**：`<script async src="script.js"></script>`
- **特点**：
  - **异步执行**：下载完成后立即执行，可能打乱脚本顺序。
  - **不保证顺序**：适合独立无依赖的脚本（如统计代码）。

**3. 动态创建 Script 标签**

- **用法**：通过 JS 插入 `<script>` 标签，按需加载。

  ```javascript
  const script = document.createElement('script');  
  script.src = 'script.js';  
  document.body.appendChild(script);  
  ```

- **特点**：

  - **完全控制加载时机**（如点击事件触发后加载）。
  - 默认异步，可通过 `script.async = false` 改为同步（不推荐）。

**4. ES6 模块（`type="module"`）**

- **用法**：`<script type="module" src="module.js"></script>`
- **特点**：
  - 默认启用 `defer` 行为，支持 `async` 属性（如 `<script type="module" async>`）。
  - 支持 `import/export` 语法，依赖按需加载。

**5. `setTimeout` 延迟加载**

- **用法**：将脚本加载包裹在 `setTimeout` 中。

  ```javascript
  setTimeout(() => {  
    const script = document.createElement('script');  
    script.src = 'script.js';  
    document.body.appendChild(script);  
  }, 1000);  
  ```

- **适用场景**：非关键脚本延后加载（如首屏渲染后再加载广告）。

**6. 第三方库（如 RequireJS、Webpack 动态导入）**

- **RequireJS（AMD 规范）**：

  ```javascript
  require(['moduleA', 'moduleB'], function(moduleA, moduleB) {  
    // 依赖加载完成后执行  
  });  
  ```

- **Webpack 动态导入**：

  ```javascript
  import('module.js').then(module => {  
    // 按需加载模块  
  });  
  ```

- **特点**：工程化方案，支持代码分割（Code Splitting）。

## 什么是回调地狱？如何避免？

## 说说同步和异步的区别?

**同步**：任务按顺序依次执行，前一个任务未完成时，后续任务**必须等待**。

**异步**：任务触发后**不阻塞后续代码**，结果通过回调、Promise等方式延迟处理。

## Javascipt中 async await 和 promise 和 generator 有什么区别？

1. **Promise**：
   - **链式调用**（`.then().catch()`），解决回调地狱。
   - 直接表示异步操作的最终状态（成功/失败）。
2. **Generator**：
   - 用 `function*` 和 `yield` **暂停函数执行**，手动控制流程（需配合 `next()`）。
   - 本身不直接处理异步，需结合其他方案（如 `co` 库）。
3. **Async/Await**：
   - 本质是 **Promise 的语法糖**，用同步写法处理异步。
   - `async` 函数隐式返回 Promise，`await` 后接 Promise。
   - **更简洁直观**，错误处理用 `try/catch`。

## 谈谈你对 Promise 的理解

`promise`是异步编程的一种方案，解决了地狱回调的问题，是一种链式调动的方式

`Promise` 简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

**核心特性：**

1. **三种状态**
   - `Pending`（等待中）→ `Fulfilled`（成功） 或 `Rejected`（失败）
   - **状态不可逆**：一旦改变（resolve/reject），不可回退。
2. **链式调用**
   - 通过 `.then()` 串联操作，解决回调地狱。
3. **错误统一捕获**
   - 用 `.catch()` 捕获链中任意环节的异常。

**常用方法：**

1. **实例方法**
   - `then()`：处理成功结果。
   - `catch()`：处理失败。
   - `finally()`：无论成功/失败都会执行（适合清理操作）。
2. **静态方法**
   - `Promise.all([p1, p2])`：**全部成功**才返回结果数组，任一失败立即终止。
   - `Promise.race([p1, p2])`：取最先完成的结果（无论成功/失败）。
   - `Promise.allSettled([p1, p2])`：等所有 Promise 完成，返回状态和结果数组。
   - `Promise.any([p1, p2])`：取第一个成功的 Promise。

**应用场景：**

- 替代回调函数，解决嵌套问题。
- 配合 `async/await` 编写更同步风格的异步代码：

## 谈谈你对 async await 的理解

**1. 本质与作用**

- **简化异步流程**：`async/await` 是 ES2017 引入的语法糖，旨在以同步代码的书写方式处理异步操作，避免“回调地狱”（Callback Hell）和 `Promise` 链式调用的嵌套问题。
- **基于 Promise**：`async` 函数本质是返回一个 `Promise` 对象，而 `await` 后通常跟随一个 `Promise`，并等待其解决（resolve）或拒绝（reject）。

**2. 执行机制**

- **暂停与恢复**：在 `async` 函数中，遇到 `await` 会暂停当前函数的执行，交出线程控制权（非阻塞主线程），直到等待的 `Promise` 状态变更后继续执行后续代码。
- **事件循环协作**：`await` 的等待过程依赖事件循环机制。如果 `Promise` 已解决，`await` 直接返回值；若未解决，则挂起函数，将后续代码推入微任务队列。

**3. 错误处理**

- **try/catch 捕获异常**：通过 `try...catch` 可以捕获 `await` 表达式中 `Promise` 的拒绝（reject）或同步错误。
  ```javascript
  async function fetchData() {
    try {
      const res = await fetch('https://api.example.com');
      const data = await res.json();
    } catch (error) {
      console.error('请求失败:', error);
    }
  }
  ```
- **未捕获的异常**：若未使用 `try...catch`，`async` 函数返回的 `Promise` 会被标记为 `rejected`，需通过 `.catch()` 处理。

**4. 对比传统异步方案**

- **对比 Promise 链**：
  ```javascript
  // Promise 链式调用
  fetchData()
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  
  // async/await
  async function process() {
    const res = await fetchData();
    const data = await res.json();
    console.log(data);
  }
  ```
  `async/await` 更接近同步逻辑，可读性更强。

- **对比 Generator**：`async/await` 是 Generator + Promise 的语法封装，省去手动执行生成器的步骤。

**5. 注意事项**

- **并行优化**：多个独立的异步操作应并行执行，避免串行等待。
  ```javascript
  // 低效（串行）
  const a = await fetchA();
  const b = await fetchB();
  
  // 高效（并行）
  const [a, b] = await Promise.all([fetchA(), fetchB()]);
  ```
- **顶层作用域限制**：`await` 只能在 `async` 函数内使用，在全局或普通函数中需包裹 IIFE：
  ```javascript
  (async () => {
    await init();
  })();
  ```

**6. 底层原理**

- **Generator + 自动执行器**：Babel 等工具会将 `async/await` 转换为 Generator 函数 + 自动执行器（类似 `co` 库）的代码。
  ```javascript
  // 转换前
  async function example() {
    await task();
  }
  
  // 转换后（简化）
  function example() {
    return spawn(function* () {
      yield task();
    });
  }
  ```

**总结**

- **核心价值**：`async/await` 通过同步代码风格实现异步逻辑，提升代码可读性与可维护性。
- **适用场景**：适用于需要顺序执行的异步任务（如接口链式调用），或需要精细控制错误边界的情况。
- **性能**：与 `Promise` 无本质差异，但需注意避免不必要的串行等待。

## Promise.all,Promise.allSettled,Promise.race分别有哪些应用场景？

1. **Promise.all**：
   - **特点**：所有Promise成功才返回结果数组；**一败全败**。
   - **场景**：多接口数据**强依赖**，比如同时请求用户信息和配置，全部成功再渲染页面。
2. **Promise.allSettled**：
   - **特点**：无论成功失败，**全执行完**返回结果数组（带状态）。
   - **场景**：批量操作后统计结果，比如上传多个文件，需知道哪些成功/失败。
3. **Promise.race**：
   - **特点**：**竞速**，取第一个完成的（无论成功/失败）。
   - **场景**：接口超时控制（如请求与setTimeout竞速），或择优选用最快响应的CDN资源。

**举个栗子**：

- `Promise.all`：等全家人都到齐再开饭。
- `Promise.allSettled`：大家各自汇报到没到，没到也说原因。
- `Promise.race`：谁先跑到终点算谁的。

## try...catch 可以捕获到异步代码中的错误吗？

无法捕获**纯回调式异步**例如 `setTimeout`、`XMLHttpRequest` 或未返回 `Promise` 的回调函数中的错误,可捕获通过 `async/await` 将 `Promise` 转换为同步的写法

## Promise 中的值穿透是什么？

.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。

当then中传入的不是函数，则这个then返回的promise的data，将会保存上一个的promise.data。这就是发生值穿透的原因。而且每一个无效的then所返回的promise的状态都为resolved。

```javascript
复制1Promise.resolve(1)
2      .then(2) // 注意这里
3      .then(Promise.resolve(3))
4      .then(console.log) // 输出 1
```

## Javascript 中的计时是否精确？

- **硬件**：就算是原子钟都会有误差，
- **系统**：setTimeout setIntervel本质是调用系统接口，不同操作系统会有差异
- **标准**：web标准规定嵌套层次超过5层就会有超过5ms延迟
- **浏览器优化策略**：
  - 后台标签页的计时器会被**降频**（如最小间隔4ms→1秒以上）。
  - 不同浏览器对计时器的**最低延迟限制不同**（如Chrome通常为1ms，但受硬件等因素影响）。
- **事件循环机制**：
  - `setTimeout`/`setInterval` 的回调会被推入任务队列，**必须等主线程空闲**才会执行。
  - 如果主线程被同步代码（如复杂计算）阻塞，计时器即使到了时间也无法触发。

**举个栗子**： 设 `setTimeout(fn, 100)`，实际触发可能是102ms或更久，尤其在低端设备或页面卡顿时会更明显。

https://v.douyin.com/ctHRAUHlwu4/

## 那些操作会造成内存泄漏？

**1. 意外创建全局变量**：函数内未声明变量直接赋值，挂到 `window` 上无法回收。

**2. 闭包未释放**：函数内返回函数，长期持有外部变量引用。

**3. 未清理的DOM引用**：JS中保留DOM元素引用，但DOM已从页面移除。

**4. 定时器/回调未清除**：`setInterval` 或事件监听未及时销毁。

**5. 未解绑的事件监听**：元素移除后仍绑定了事件。

**6. 缓存无限增长**：缓存对象未清理，数据越积越多。

## 说说你的 ES6-ES12 的了解

ES6到ES12的主要特性我简要总结如下：

- **ES6 (2015)**： 箭头函数、类(class)、模板字符串、解构、let/const、Promise、模块化(import/export)。
- **ES7 (2016)**： `Array.prototype.includes`、指数运算符(`**`)。
- **ES8 (2017)**： `async/await`、`Object.values()`/`Object.entries()`、字符串填充(`padStart`/`padEnd`)。
- **ES9 (2018)**： 异步迭代器(`for-await-of`)、对象扩展符、`Promise.finally`、正则命名捕获组。
- **ES10 (2019)**： `Array.flat()`/`flatMap()`、`Object.fromEntries()`、`String.trimStart()`/`trimEnd()`。
- **ES11 (2020)**： 动态导入(`import()`)、`BigInt`、可选链(`?.`)、空值合并(`??`)、`globalThis`。
- **ES12 (2021)**： `String.replaceAll()`、`Promise.any`、逻辑赋值运算符(`&&=`/`||=`/`??=`)、`WeakRef`。

**最常用**：箭头函数、解构、`async/await`、可选链、空值合并。这些特性显著提升了代码简洁性与可维护性，尤其是可选链避免了深层对象判空的冗余代码。

## 如何判断一个元素是否在可视区域中？

- **offsetTop、scrollTop**

判断元素顶部是否小于屏幕高度

```javascript
function isInViewPortOfOne (el) {
    // viewPortHeight 兼容所有浏览器写法
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
    const offsetTop = el.offsetTop
    const scrollTop = document.documentElement.scrollTop
    const top = offsetTop - scrollTop
    return top <= viewPortHeight
}
```

- **getBoundingClientRect\***

`getBoundingClientRect`能够获取元素`left`, `top`, `right`, `bottom`, `x`, `y`, `width`, 和 `height`属性，如果

同时满足 `top 大于等于 0，left 大于等于 0，bottom 小于等于视窗高度，right 小于等于视窗宽度`，那么元素就在视窗之内

```javascript
function isInViewPort(element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const { top,right,bottom,left } = element.getBoundingClientRect();
  return (top >= 0 &&left >= 0 &&right <= viewWidth &&bottom <= viewHeight);
}
```

- **Intersection Observer**

`Intersection Observer` 即重叠观察者，从这个命名就可以看出它用于判断两个元素是否重叠，因为不用进行事件的监听，性能方面相比`getBoundingClientRect `会好很多

```javascript
const options = {
  // 表示重叠面积占被观察者的比例，从 0 - 1 取值，
  // 1 表示完全被包含
  threshold: 1.0, 
  root:document.querySelector('#scrollArea') // 必须是目标元素的父级元素
};

const callback = (entries, observer) => { ....}

const observer = new IntersectionObserver(callback, options);

const target = document.querySelector('.target');
observer.observe(target);
```

## 说说 var、let、const 之间的区别

**变量提升**

`var` 声明的变量存在变量提升，即变量可以在声明之前调用，值为`undefined`

`let`和`const`不存在变量提升，即它们所声明的变量一定要在声明后使用，否则报错

**暂时性死区**

`var`不存在暂时性死区

`let`和`const`存在暂时性死区，只有等到声明变量的那一行代码出现，才可以获取和使用该变量

**块级作用域**

`var`不存在块级作用域

`let`和`const`存在块级作用域 **重复声明**

`var`允许重复声明变量

`let`和`const`在同一作用域不允许重复声明变量

**修改声明的变量**

`var`和`let`可以

`const`声明一个只读的常量。一旦声明，常量的值就不能改变

## let 和 const 声明的变量是否会被挂载到全局对象上？

全局作用域下**`let/const`**声明的变量存在于全局作用域，但不会成为全局对象的属性。

## const 定义的变量可以修改吗？

对于**基本类型**不可修改，对于**引用类型**变量指向的内存地址不可变（不能换对象），但内部属性/元素可修改。

## 说说对 ES6 中 rest 参数的理解

## 怎么理解 ESM 中的 export * from "a.js" 这种写法？

## 如何理解 ES6 模块化方案的缓存机制？

## 详细讲一下 Symbol 数据类型特征与实际使用案例？

## BigInt 和 Number 类型有什么区别？

## 哪些方法可以保持前后端实时通信？

**1. 短轮询（Polling）**

- **原理**：前端定时（如每秒）发请求询问是否有新数据。

- **代码示例**：

  ```javascript
  setInterval(() => {  
    fetch('/api/check-update').then(/* 处理数据 */);  
  }, 1000);  
  ```

- **优点**：简单易实现。

- **缺点**：频繁请求浪费资源，实时性差。

- **适用场景**：低实时性需求（如每5分钟检查一次版本更新）。

**2. 长轮询（Long Polling）**

- **原理**：前端发请求后，服务器**挂起**直到有数据或超时，再响应并重新连接。
- **优点**：减少无效请求，比短轮询实时性更高。
- **缺点**：服务器需维护挂起连接，高并发时压力大。
- **适用场景**：中等实时性（如在线客服消息）。

**3. WebSocket**

- **原理**：基于TCP的全双工通信协议，建立持久连接后**双向实时传输**。

- **代码示例**：

  ```javascript
  // 前端  
  const ws = new WebSocket('wss://example.com/socket');  
  ws.onmessage = (event) => {  
    console.log('收到消息:', event.data);  
  };  
  ws.send('Hello Server!');  
  
  // 后端（Node.js示例）  
  const WebSocket = require('ws');  
  const wss = new WebSocket.Server({ port: 8080 });  
  wss.on('connection', (ws) => {  
    ws.send('Welcome!');  
  });  
  ```

- **优点**：高效低延迟，适合高频交互。

- **缺点**：需服务端支持（如 `Socket.IO`、`ws` 库），协议升级（HTTP → WS）。

- **适用场景**：即时聊天、在线游戏、协同编辑。

**4. Server-Sent Events（SSE）**

- **原理**：基于HTTP，服务器单向**主动推送**数据到客户端（如股票行情）。

- **代码示例**：

  ```javascript
  // 前端  
  const eventSource = new EventSource('/api/stream');  
  eventSource.onmessage = (event) => {  
    console.log('收到推送:', event.data);  
  };  
  
  // 后端（Node.js示例）  
  app.get('/stream', (req, res) => {  
    res.setHeader('Content-Type', 'text/event-stream');  
    setInterval(() => {  
      res.write(`data: ${new Date()}\n\n`); // 格式要求  
    }, 1000);  
  });  
  ```

- **优点**：轻量、自动重连、兼容HTTP。

- **缺点**：仅支持服务器→客户端单向通信。

- **适用场景**：实时通知、新闻推送、日志流。

**5. WebRTC（点对点通信）**

- **原理**：浏览器间直接建立连接传输数据（如视频通话），可绕过服务器中转。
- **优点**：延迟极低，节省服务器带宽。
- **缺点**：需处理NAT穿透（STUN/TURN服务器），实现复杂度高。
- **适用场景**：视频会议、文件传输、P2P应用。

**对比总结**

| **方法**  | **协议** | **方向**      | **实时性** | **复杂度** | **适用场景**           |
| :-------- | :------- | :------------ | :--------- | :--------- | :--------------------- |
| 短轮询    | HTTP     | 客户端主动    | 低         | 低         | 低频检查（如版本更新） |
| 长轮询    | HTTP     | 客户端主动    | 中         | 中         | 中等实时（如客服）     |
| WebSocket | WS/WSS   | 双向          | 高         | 高         | 即时聊天、高频交互     |
| SSE       | HTTP     | 服务器→客户端 | 高         | 低         | 单向推送（如通知）     |
| WebRTC    | P2P      | 双向          | 极高       | 高         | 视频通话、P2P传输      |

**选型建议**

- **双向高频**：WebSocket（如聊天室）。
- **单向推送**：SSE（如实时新闻）。
- **简单兼容**：长轮询（旧浏览器兼容）。
- **超低延迟**：WebRTC（视频会议）。

## 谈谈你对 webSocket 的理解

WebSocket 是一种在单个 TCP 连接上实现**全双工实时通信**的协议，专为高频、低延迟的数据交互设计。以下是其核心特性和应用解析：

**一、核心特性**

1. **全双工通信**：
   - 客户端和服务端**可同时发送数据**，无需等待请求-响应循环。
   - 对比 HTTP 的“一问一答”模式，WebSocket 更适合实时场景（如聊天、游戏）。
2. **持久化连接**：
   - 通过一次 HTTP 握手（Upgrade 头）升级为 WebSocket 协议，连接**长期保持活跃**。
   - 避免 HTTP 频繁建立/关闭连接的开销，降低延迟和带宽消耗。
3. **轻量级协议**：
   - 数据传输头部小（仅 2~10 字节），适合高频小数据包场景。
   - 支持文本（UTF-8）和二进制数据格式。

**二、工作原理**

1. **握手阶段**：

   - 客户端发起 HTTP 请求，携带 `Upgrade: websocket` 和 `Sec-WebSocket-Key`。
   - 服务端返回 `101 Switching Protocols`，响应头包含 `Sec-WebSocket-Accept`。

   **示例请求头**：

   ```bash
   GET /chat HTTP/1.1  
   Host: example.com  
   Upgrade: websocket  
   Connection: Upgrade  
   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==  
   ```

2. **数据传输**：

   - 连接升级后，双方通过**数据帧**（Frame）通信，包含操作码（文本/二进制）、掩码等元信息。
   - 客户端与服务端可随时主动发送消息。

**三、使用场景**

| **场景**         | **说明**                                  |
| :--------------- | :---------------------------------------- |
| **即时通讯**     | 聊天消息、通知实时推送（如微信、Slack）。 |
| **实时数据监控** | 股票行情、物联网设备数据实时展示。        |
| **在线协作**     | 多人文档编辑、协同白板（如腾讯文档）。    |
| **在线游戏**     | 玩家状态同步、实时对战（如网页游戏）。    |

**四、代码示例**

**前端（浏览器）**

```javascript
// 创建 WebSocket 连接  
const socket = new WebSocket('wss://example.com/ws');  

// 监听事件  
socket.onopen = () => {  
  socket.send('Hello Server!');  
};  

socket.onmessage = (event) => {  
  console.log('收到消息:', event.data);  
};  

socket.onclose = () => {  
  console.log('连接关闭');  
};  
```

**后端（Node.js + ws 库）**

```javascript
const WebSocket = require('ws');  
const wss = new WebSocket.Server({ port: 8080 });  

wss.on('connection', (ws) => {  
  ws.on('message', (data) => {  
    console.log('收到客户端消息:', data);  
    ws.send('已收到: ' + data); // 主动推送  
  });  
});  
```

**五、优缺点对比**

| **优点**               | **缺点**                                 |
| :--------------------- | :--------------------------------------- |
| 低延迟，实时性强       | 需维护长连接，高并发时服务端资源消耗大   |
| 减少冗余头部，节省带宽 | 防火墙/代理可能拦截 WebSocket 连接       |
| 支持双向通信           | 需处理连接稳定性（如断线重连、心跳检测） |

**六、关键问题与优化**

1. **连接保活**：
   - **心跳机制**：定时发送 Ping/Pong 帧检测连接存活。
   - **自动重连**：监听 `onclose` 事件，尝试重新建立连接。
2. **安全性**：
   - 使用 `wss://`（WebSocket over TLS）加密数据。
   - 验证 `Origin` 头，防止跨站劫持（CSRF）。
3. **扩展方案**：
   - **Socket.IO**：封装 WebSocket，提供降级兼容（如轮询）和房间管理等功能。
   - **负载均衡**：使用 Redis 共享连接状态，支持多节点部署。

**七、对比其他技术**

| **技术**      | **方向**              | **协议** | **实时性** | **适用场景**           |
| :------------ | :-------------------- | :------- | :--------- | :--------------------- |
| **WebSocket** | 双向                  | WS/WSS   | 高         | 即时聊天、实时协作     |
| **SSE**       | 单向（服务端→客户端） | HTTP     | 高         | 股票行情、实时通知     |
| **HTTP 轮询** | 客户端主动            | HTTP     | 低         | 低频检查（如邮件提醒） |



**总结**： WebSocket 是构建实时应用的基石，尤其适合双向高频交互场景。需权衡其资源消耗和实现复杂度，结合心跳、加密等措施确保稳定安全。对于简单需求，可优先考虑 SSE 或短轮询；复杂实时系统则首选 WebSocket。

## 解释 for...of 和 for...in 的区别

**1. 遍历目标**

- **`for...in`**：

  - **遍历对象的可枚举属性（键）**，包括原型链上的属性。
  - 适用于 **普通对象（Object）**。

  ```javascript
  const obj = { a: 1, b: 2 };  
  for (const key in obj) {  
    console.log(key); // 输出 'a', 'b'  
  }  
  ```

- **`for...of`**：

  - **遍历可迭代对象的值**（需实现 `[Symbol.iterator]` 接口）。
  - 适用于 **数组、字符串、Map、Set 等可迭代对象**。

  ```javascript
  const arr = [10, 20, 30];  
  for (const value of arr) {  
    console.log(value); // 输出 10, 20, 30  
  }  
  ```

**2. 遍历数组时的差异**

| **特性**         | **`for...in`**               | **`for...of`**                   |
| :--------------- | :--------------------------- | :------------------------------- |
| **遍历内容**     | 索引（字符串形式，如 `"0"`） | 元素值                           |
| **原型链属性**   | 会遍历继承的可枚举属性       | 仅遍历对象自身的值               |
| **稀疏数组处理** | 跳过空位（遍历存在的索引）   | 遍历所有值，空位视为 `undefined` |

**示例**：

```javascript
const arr = [1, , 3];  
arr.foo = 'bar'; // 添加自定义属性  

// for...in  
for (const key in arr) {  
  console.log(key); // 输出 '0', '2', 'foo'（遍历索引和自定义属性）  
}  

// for...of  
for (const val of arr) {  
  console.log(val); // 输出 1, undefined, 3（遍历值，空位为 undefined）  
}  
```

**3. 适用场景**

- **`for...in`**：
  - 遍历对象属性，需结合 `hasOwnProperty` 过滤原型链属性。
  - 不推荐用于数组（可能遍历到非索引属性）。
- **`for...of`**：
  - 遍历数组、字符串等可迭代结构的值。
  - 无法直接遍历普通对象（需配合 `Object.keys` 或使用 `Map`）。

**4. 特殊对象处理**

- **普通对象默认不可迭代**，需手动实现迭代器才能使用 `for...of`：

  ```javascript
  const obj = { a: 1, b: 2 };  
  // 手动添加迭代器  
  obj[Symbol.iterator] = function* () {  
    yield* Object.values(this);  
  };  
  for (const val of obj) {  
    console.log(val); // 输出 1, 2  
  }  
  ```

**总结**

- **`for...in`**：遍历对象属性（键），慎用于数组。
- **`for...of`**：遍历可迭代对象的值，简洁高效，推荐用于数组操作。
- **关键区别**：前者遍历键，后者遍历值；前者兼容性更好，后者功能更专注。

## 解释可选链操作符（?.）和空值合并运算符（??）

可选链操作符（`?.`）和空值合并运算符（`??`）是 ES6 之后新增的两个实用语法，共同目标是简化代码中对空值（`null/undefined`）的安全处理，但侧重点不同。

**一、可选链操作符（`?.`）**

**用途**：安全访问深层嵌套对象的属性或方法，避免因中间值为 `null/undefined` 而报错。 **核心行为**：

- 若左侧值为 `null/undefined`，立即短路返回 `undefined`，**不再执行右侧操作**。

**示例场景**：

```javascript
const user = { 
  profile: null 
};  

// 传统写法（逐层判断）  
const name = user && user.profile && user.profile.name;  

// 可选链写法  
const name = user?.profile?.name; // → undefined（不报错）  
```

**适用场景**：

- 不确定对象属性是否存在时（如API响应、动态配置）。

- 安全调用可能不存在的函数：

  ```javascript
  const callback = config.onSuccess;  
  callback?.(); // 存在则调用，否则忽略  
  ```

**二、空值合并运算符（`??`）**

**用途**：为可能为 `null/undefined` 的变量提供默认值。 **核心行为**：

- 仅当左侧值为 `null/undefined` 时，返回右侧默认值（其他假值如 `0`、`''`、`false` 仍保留）。

**示例场景**：

```javascript
// 传统写法（逻辑或 || 的问题）  
const price = config.price || 100;  
// 若 config.price 为 0 → 错误地取 100  

// 空值合并写法  
const price = config.price ?? 100;  
// 若 config.price 为 0 → 正确保留 0  
```

**适用场景**：

- 区分 `0`/`false`/`''` 与真正的空值（如配置项、表单数据）。
- 替代 `||` 提供更精确的默认值逻辑。

**三、关键区别对比**

| **维度**     | **可选链 `?.`**                        | **空值合并 `??`**              |
| :----------- | :------------------------------------- | :----------------------------- |
| **作用目标** | 防止访问 `null/undefined` 的属性时报错 | 为 `null/undefined` 提供默认值 |
| **返回值**   | 返回 `undefined` 或安全访问后的值      | 返回左侧非空值或右侧默认值     |
| **常见组合** | 常与 `??` 联用（如 `obj?.prop ?? 0`）  | 可单独使用或与 `?.` 配合       |

**四、联合使用示例**

**场景**：从 API 响应中安全取值并设置默认值。

```javascript
// 若 response 或 data 不存在，total 默认为 0  
const total = response?.data?.total ?? 0;  
```

**解析**：

1. `response?.data?.total`：
   - 若 `response` 或 `data` 为 `null/undefined`，返回 `undefined`。
2. `?? 0`：
   - 若上一步结果为 `undefined`，则返回 `0`。

**五、对比 `||` 与 `??`**

| **表达式** | `0 ?? 5`                | `0 || 5`                              | `'' ?? 'default'` | `'' || 'default'` |
| :--------- | :---------------------- | :------------------------------------ | :---------------- | :---------------- |
| **结果**   | `0`                     | `5`                                   | `''`              | `'default'`       |
| **逻辑**   | 仅处理 `null/undefined` | 处理所有假值（`0`、`''`、`false` 等） |                   |                   |

**总结**

- **`?.`**：用于**安全访问**属性/方法，避免代码崩溃。
- **`??`**：用于**精准设置默认值**，保留有效假值。
- **组合使用**：`obj?.prop ?? defaultValue` 是常见模式，兼顾安全访问与默认值处理。

**一句话记忆**：

- `?.` 护盾保护属性访问，`??` 精准填补空值漏洞。

## Symbol 类型主要的用途是什么？

**1. 创建唯一的对象属性键**

- **避免属性名冲突**：Symbol 值作为属性名时，即使描述符（description）相同，值也唯一，适合在扩展对象时防止键名冲突。

```javascript
const key1 = Symbol('key');  
const key2 = Symbol('key');  
const obj = {};  
obj[key1] = 'value1';  
obj[key2] = 'value2';  
console.log(obj[key1], obj[key2]); // 输出 'value1', 'value2'（不冲突）  
```

**2. 定义对象的内置行为（Well-Known Symbols）**

- **自定义对象的内置方法**：通过预定义的 Symbol 值（如 `Symbol.iterator`）改变对象默认行为。

```javascript
// 实现可迭代对象  
const myIterable = {  
  [Symbol.iterator]: function* () {  
    yield 1;  
    yield 2;  
  }  
};  
console.log([...myIterable]); // 输出 [1, 2]  
```

其他内置 Symbol：

- `Symbol.toStringTag`：自定义 `Object.prototype.toString()` 的返回值。
- `Symbol.hasInstance`：重写 `instanceof` 的行为。

**3. 模拟私有属性（非严格私有）**

- **隐藏对象属性**：Symbol 属性无法通过常规方法（如 `Object.keys()`、`for...in`）遍历，需通过 `Object.getOwnPropertySymbols()` 获取。

## 箭头函数和普通函数的区别是什么？

主要区别有几点：

1. **`this`指向**：
   - 普通函数：`this`由调用方式决定（谁调用指向谁），可动态改变（如通过`bind/call/apply`）。
   - 箭头函数：`this`继承自外层作用域（词法作用域），且无法被修改（如`setTimeout`中不用再写`const _this = this`）。
2. **`arguments`对象**：
   - 普通函数：内部可用`arguments`获取所有参数。
   - 箭头函数：没有`arguments`，需用剩余参数（`...args`）替代。
3. **构造函数能力**：
   - 普通函数：可作为构造函数，用`new`创建实例。
   - 箭头函数：不能用作构造函数，`new`调用会报错。
4. **`prototype`属性**：
   - 普通函数：有`prototype`属性，用于原型继承。
   - 箭头函数：没有`prototype`。
5. **语法简洁性**：
   - 箭头函数更简洁（如`(a, b) => a + b`），适合简单函数或回调（如`map(() => {})`）。

## 跨域的处理方案有哪些？

**1. CORS（跨域资源共享）**

- **原理**：服务端设置响应头（如`Access-Control-Allow-Origin`），明确允许跨域请求。

- **实现**：

  ```js
  // Node.js示例  
  res.setHeader('Access-Control-Allow-Origin', 'http://前端域名');  
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');  
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  
  ```

- **适用场景**：主流方案，需服务端配合，支持所有HTTP方法。

**2. JSONP（仅限GET请求）**

- **原理**：利用`<script>`标签无跨域限制的特性，通过回调函数接收数据。

- **实现**：

  ```js
  // 前端  
  function jsonpCallback(data) { console.log(data); }  
  const script = document.createElement('script');  
  script.src = 'http://后端接口?callback=jsonpCallback';  
  document.body.appendChild(script);  
  ```

- **缺点**：只支持GET，安全性低（需防范XSS）。

**3. 代理服务器**

- **原理**：前端请求同域代理服务器，代理转发请求到目标服务器，绕过浏览器限制。

- **实现**：

  - **开发环境**：Vue/React脚手架配置代理（如`vue.config.js`）：

    ```js
    devServer: {  
      proxy: {  
        '/api': {  
          target: 'http://后端地址',  
          changeOrigin: true,  
          pathRewrite: { '^/api': '' }  
        }  
      }  
    }  
    ```

  - **生产环境**：Nginx反向代理：

    ```js
    location /api {  
        proxy_pass http://后端地址;  
    }  
    ```

**4. WebSocket**

- **原理**：WebSocket协议不受同源策略限制。
- **适用场景**：实时通信（如聊天室）。

**5. postMessage（窗口间通信）**

- **原理**：通过`window.postMessage`实现跨窗口（如iframe）通信。

- **示例**：

  ```js
  // 父窗口向子iframe发送消息  
  iframe.contentWindow.postMessage('data', 'http://子窗口域名');  
  // 子窗口监听  
  window.addEventListener('message', (e) => {  
    if (e.origin !== 'http://父窗口域名') return;  
    console.log(e.data);  
  });  
  ```

**6. 修改浏览器安全策略（仅开发环境）**

- 临时关闭浏览器跨域限制（如Chrome启动参数加`--disable-web-security`），**不推荐生产使用**。

**总结**：

- **开发环境**：优先用代理（如Vue/React脚手架配置）。
- **生产环境**：服务端配置CORS或Nginx反向代理。
- **特殊场景**：JSONP（老旧项目兼容）、WebSocket（实时通信）。
- **注意安全性**：避免`Access-Control-Allow-Origin: *`，限制可信域名。

## 谈谈你对正则表达式的理解

正则表达式（Regex）在前端开发中是不可或缺的文本处理工具，通过模式匹配实现高效的数据验证、字符串操作和复杂逻辑处理。以下是其在前端的主要应用场景及示例：

1. **表单验证**:正则表达式常用于验证用户输入的数据格式，如邮箱、密码、手机号等，确保输入符合业务规则：
   - **邮箱验证**：`/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/`
   - **手机号验证**：`/^(13[0-9]|14[5-9]|15[0-3,5-9]|18[0-9])\d{8}$/`
   - **密码强度**：要求包含大小写字母和数字的组合，如 `^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$`
2. **字符串处理**:通过正则表达式实现字符串的搜索、替换、分割和格式转换：
   - **敏感词过滤**：替换敏感词汇为星号，如 `str.replace(/敏感词/g, '***')`
   - **驼峰命名转换**：将 `foo-bar` 转为 `fooBar`，使用 `/-(\w)/g` 匹配并替换首字母大写 
   - **千分位格式化**：将 `1234567` 转为 `1,234,567`，正则模式为 `/(\d)(?=(\d{3})+(?!\d))/g` 
3. **URL参数解析与操作**:提取 URL 中的参数或处理路径信息：
   - **解析查询参数**：从 `?id=123&name=alice` 提取键值对
   - **动态生成正则表达式**：结合 `RegExp` 构造函数处理动态参数名
4. **HTML/DOM 处理**:正则表达式用于处理 HTML 内容，但需谨慎避免误解析复杂标签结构：
   - **HTML 转义与反转义**：防止 XSS 攻击，如将 `<` 转为 `<` 
   - **提取标签内容**：匹配特定标签内的文本，如 `<div>(.*?)</div>` 
5. **数据格式化与校验**:处理日期、时间、金额等数据的格式转换与校验：
   - **日期格式校验**：验证 `YYYY-MM-DD` 格式，支持闰年判断 
   - **金额千分位**：如 `1234567` 转为 `1,234,567`，使用前瞻断言实现 
6. **高级应用场景**
   - **模板引擎解析**：结合正则动态替换模板变量（如 `{{name}}`）
   - **日志分析**：从日志中提取特定错误码或时间戳 

## 说说什么是精度丢失？

精度丢失（Precision Loss）是指在使用二进制浮点数（如 JavaScript 的 `Number` 类型）表示或计算时，因无法精确存储某些十进制小数或大整数而导致的误差问题。

**1. 常见场景**

- **浮点数运算**：

  ```js
  0.1 + 0.2 === 0.3; // false → 实际结果为 0.30000000000000004  
  ```

  原因：十进制小数（如 0.1）转换为二进制时是无限循环小数，存储时被截断。

- **大整数处理**：

  ```js
  const num = 9007199254740993; // 超过 Number.MAX_SAFE_INTEGER (2^53 - 1)  
  console.log(num); // 9007199254740992 → 末位被舍入  
  ```

**2. 底层原因**

- **IEEE 754 双精度浮点数标准**：
  - 使用 64 位存储（1 符号位 + 11 指数位 + 52 尾数位）。
  - 部分十进制小数无法精确转换为有限长度的二进制（如 0.1 → 0.0001100110011...）。

**3. 解决方案**

- **整数化处理**：将小数转为整数运算后再还原。

  ```js
  (0.1 * 10 + 0.2 * 10) / 10 === 0.3; // true  
  ```

- **使用高精度库**：如 `decimal.js`、`big.js`。

- **BigInt 类型**：处理大整数（后缀加 `n`）。

  ```js
  const bigNum = 9007199254740993n; // 精确存储  
  ```

- **控制显示精度**：用 `toFixed()` 四舍五入（返回字符串）。

**总结**

精度丢失源于二进制浮点数的存储限制，**关键场景需显式处理**（如金融计算用高精度库），避免因微小误差引发逻辑错误。

## 说说什么是尾递归？

尾递归（Tail Recursion）是递归的一种特殊形式，**函数在最后一步直接调用自身**，且**没有其他运算或操作**。这种结构使得编译器/解释器可以优化递归，避免栈溢出，因为它不再依赖保留外层函数的调用栈。

**核心特点**

1. **最后一步是纯函数调用**：递归调用后没有其他操作（比如`return n * func(n-1)`就不是尾递归，因为需要做乘法运算）。
2. **可被优化为循环**：尾递归的调用栈会被复用（类似迭代），空间复杂度从O(n)降为O(1)。

**示例对比:**

- **普通递归**（栈溢出风险）：

  ```javascript
  function factorial(n) {  
    if (n === 1) return 1;  
    return n * factorial(n - 1); // 递归后还需做乘法操作  
  }  
  ```

  （调用栈：`factorial(5)` → `5 * factorial(4)` → ... → 逐层返回计算）

- **尾递归**（可优化为循环）：

  ```javascript
  function factorial(n, total = 1) {  
    if (n === 1) return total;  
    return factorial(n - 1, n * total); // 最后一步直接返回自身调用  
  }  
  ```

  （调用栈：每次调用直接覆盖当前栈，无需保留外层状态）



## 解释 ES Module 和 CommonJS 的区别。

1. **语法与加载方式**
   - **ESM**：使用 `import`/`export` 语法，**静态加载**（编译时确定依赖），支持异步加载。
   - **CJS**：使用 `require()`/`module.exports`，**动态加载**（运行时解析依赖），同步执行。
2. **运行环境**
   - **ESM**：浏览器原生支持，Node.js 需配置 `type: "module"` 或 `.mjs` 后缀。
   - **CJS**：Node.js 默认模块系统，浏览器不支持原生使用。
3. **静态分析与优化**
   - **ESM**：支持 **Tree Shaking**（静态分析移除未使用代码），利于打包优化。
   - **CJS**：动态特性导致难以静态分析，Tree Shaking 支持有限。
4. **模块行为**
   - **ESM**：模块输出的是**值的引用**，动态更新会影响所有导入方。
   - **CJS**：模块输出的是**值的拷贝**，后续修改不影响已导入的值。
5. **循环依赖处理**
   - **ESM**：通过引用传递解决循环依赖，支持未完全初始化的模块。
   - **CJS**：可能因执行顺序导致部分导出值为 `undefined`。

**使用场景**

- **ESM**：现代前端项目（浏览器或构建工具链如 Vite/Webpack）。
- **CJS**：Node.js 服务端开发或旧项目迁移。



## 解释 Proxy 和 Reflect 的作用

`Proxy` 和 `Reflect` 是 ES6 中用于增强对象操作的 API，核心作用如下：

1. **Proxy（代理）**
   - **作用**：创建一个对象的代理，通过定义“拦截器”**监听并自定义对象的基本操作**（如属性读取、赋值、函数调用等）。
   - **典型场景**：数据响应式（如 Vue3 的响应式系统）、属性校验、日志记录、权限控制等。
2. **Reflect（反射）**
   - **作用**：提供一组与 `Proxy` 拦截器**一一对应的方法**，用于**直接调用对象的默认行为**（如 `Reflect.get()` 对应 `obj[key]`）。
   - **设计意义**：标准化对象操作（替代 `Object.xxx` 方法），并提供更合理的返回值（如布尔值表示操作是否成功）。

**关联性**

- `Proxy` 的拦截器方法（如 `get`、`set`）通常结合 `Reflect` 的方法实现默认行为，例如：

  ```javascript
  const proxy = new Proxy(obj, {  
    get(target, key) {  
      console.log('读取属性:', key);  
      return Reflect.get(target, key); // 调用原对象的默认行为  
    }  
  });  
  ```

**总结** `Proxy` 用于**拦截并扩展对象操作**，`Reflect` 提供**标准化且安全的默认行为**，二者配合可实现更灵活的对象控制。

## 你对 Set、Map 两种数据结构怎么理解?



## Set 和 WeakSet 与 Map 和 WeakMap 之间的区别

 **1. 键与值的特性**

- **Set**：存储唯一值的集合，**值即键**，成员可以是任意类型。
- **Map**：存储键值对，**键可以是任意类型**（对象、基本类型等）。
- **WeakSet**：成员**只能是对象**，且对对象是弱引用。
- **WeakMap**：**键只能是对象**，值无限制，键是弱引用。

 **2. 可遍历性**

- **Set/Map**：支持遍历（如 `forEach`、`for...of`），可通过 `size` 获取成员数量。
- **WeakSet/WeakMap**：**不可遍历**，无 `size` 属性，无法直接获取成员数量。

 **3. 内存管理（弱引用特性）**

- **Set/Map**：对成员的引用是**强引用**，即使对象在其他地方无引用，也不会被垃圾回收。
- **WeakSet/WeakMap**：对键的引用是**弱引用**，若对象在其他地方无强引用，会被垃圾回收，对应成员自动消失。

 **4. 方法与用途**

- **Set**：用于去重或集合运算（交集、并集），如 `new Set([1, 2, 1])` → `{1, 2}`。
- **Map**：适合键类型复杂或需保持插入顺序的场景，如缓存数据。
- **WeakSet**：临时跟踪对象存在性（如记录已处理过的 DOM 元素）。
- **WeakMap**：关联对象与元数据且避免内存泄漏（如存储对象私有数据）。

## JavaScript 中 Map 和 Object 的区别是什么？

## 谈谈你对 requestanimationframe 和 requestidlecallback 的了解

`requestAnimationFrame`（rAF）和 `requestIdleCallback`（rIC）是浏览器提供的任务调度 API，核心区别如下：

**1. 设计目的**

- **requestAnimationFrame**：
  - 专为**动画渲染优化**，在下一次浏览器重绘（通常是 60Hz 刷新率）前执行回调函数。
  - 确保动画流畅，避免掉帧或过度渲染。
- **requestIdleCallback**：
  - 在浏览器**空闲时段（主线程无其他任务）**执行低优先级任务。
  - 避免阻塞用户交互或关键渲染流程。

**2. 触发时机**

- **rAF**：
  - **与屏幕刷新率同步**（如每秒 60 次），回调函数在重绘前的布局计算阶段执行。
- **rIC**：
  - **无固定频率**，仅在浏览器空闲时触发，且每次执行时间可能被限制（通过 `timeout` 参数设置最长等待时间）。

**3. 适用场景**

- **rAF**：
  - 动画、连续 UI 更新（如元素运动、滚动效果）。
  - 需要与渲染帧同步的操作（如读取布局属性后修改样式）。
- **rIC**：
  - 非紧急任务（如日志上报、数据预加载、耗时计算）。
  - 避免在主线程繁忙时执行（如用户输入或动画期间）。

**4. 使用示例**

```javascript
// rAF：流畅动画  
function animate() {  
  element.style.left = `${pos++}px`;  
  requestAnimationFrame(animate);  
}  
animate();  

// rIC：空闲任务  
requestIdleCallback((deadline) => {  
  while (deadline.timeRemaining() > 0) {  
    processLowPriorityTask();  
  }  
}, { timeout: 2000 }); // 最长等待 2 秒  
```

**5. 注意事项**

- **rAF**：
  - 避免在回调中执行耗时操作，否则会阻塞渲染。
  - 在不可见标签页中，rAF 可能暂停执行以节省资源。
- **rIC**：
  - 任务应分割为小块（利用 `deadline.timeRemaining()` 判断剩余时间）。
  - 不保证一定会执行（如浏览器始终繁忙）。



## offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别？

**1. `offsetWidth` 和 `offsetHeight`**:元素的**总尺寸**，包括 **内容宽度/高度** + **内边距（padding）** + **边框（border）** + **垂直滚动条宽度**（如果存在）。

**2. `clientWidth` 和 `clientHeight`**:元素的**可视区域尺寸**，包括 **内容宽度/高度** + **内边距（padding）**，但 **不包含边框** 和 **滚动条**。

**3. `scrollWidth` 和 `scrollHeight`**:元素的**实际内容总尺寸**（包括溢出部分） + **内边距（padding）**，但 **不包含边框** 和 **滚动条**。

## mouseover 和 mouseenter 的区别？

- **`mouseenter`**：
  - **仅在鼠标首次进入绑定元素时触发一次**。
  - **不冒泡**（子元素不会触发父元素的 `mouseenter`）。
- **`mouseover`**：
  - **每次进入绑定元素或其子元素时都会触发**。
  - **冒泡**（子元素触发 `mouseover` 后，会向上冒泡到父元素）。

## currentTarget 与 target 的区别

- `e.target`：**触发**事件的元素
- `e.currentTarget`：**绑定**事件的元素

## 说说 Web Worker

Web Worker 是浏览器提供的**多线程机制**，允许在后台运行脚本而不阻塞主线程，核心特点如下：

**1. 核心作用**

- **独立线程**：在**主线程外创建子线程**，处理复杂计算或耗时任务（如大数据处理、加密解密）。
- **非阻塞 UI**：避免主线程卡顿，保持页面响应性。

**2. 通信机制**

- **消息传递**：通过 `postMessage` 发送数据，`onmessage` 接收数据，数据需可序列化（如 JSON、ArrayBuffer）。
- **无 DOM 访问权限**：Worker 内无法操作 DOM 或访问 `window` 对象。

**3. 类型与使用**

- **专用 Worker（Dedicated Worker）**：

  ```javascript
  // 主线程  
  const worker = new Worker('worker.js');  
  worker.postMessage({ data: '任务' });  
  worker.onmessage = (e) => console.log(e.data);  
  
  // worker.js  
  self.onmessage = (e) => self.postMessage('处理结果');  
  ```

- **共享 Worker（Shared Worker）**：可被多个页面共享，但兼容性较差。

**4. 适用场景**

- 图像/视频处理（如滤镜、压缩）。
- 实时数据分析（如日志统计、排序）。
- 高频率计算（如物理模拟、游戏逻辑）。

**5. 限制与注意事项**

- **同源策略**：Worker 脚本必须与主线程同源。
- **全局对象不同**：Worker 内使用 `self` 代替 `window`。
- **资源释放**：通过 `worker.terminate()` 手动终止 Worker，防止内存泄漏。

## 你知道哪些设计模式？

**1. 单例模式（Singleton）**

- **作用**：确保一个类只有一个实例，并提供全局访问点。

- **场景**：全局状态管理（如 Vuex/Redux 的 Store）、浏览器环境对象（如 window）。

- **示例**：

  ```javascript
  class Singleton {  
    static instance;  
    constructor() {  
      if (!Singleton.instance) Singleton.instance = this;  
      return Singleton.instance;  
    }  
  }  
  const a = new Singleton();  
  const b = new Singleton();  
  console.log(a === b); // true  
  ```

**2. 观察者模式（Observer）**

- **作用**：定义对象间的一对多依赖关系，当一个对象状态变化时，自动通知所有依赖者。

- **场景**：事件监听（如 DOM 事件）、数据响应式更新（如 Vue 的依赖收集）。

- **示例**：

  ```js
  class Subject {  
    observers = [];  
    addObserver(obs) { this.observers.push(obs); }  
    notify() { this.observers.forEach(obs => obs.update()); }  
  }  
  class Observer { update() { console.log('收到通知'); } }  
  ```

**3. 工厂模式（Factory）**

- **作用**：通过工厂方法创建对象，隐藏具体实现逻辑。

- **场景**：复杂对象的创建（如 UI 组件库）、多环境适配（如不同浏览器的 API 封装）。

- **示例**：

  ```js
  class ButtonFactory {  
    createButton(type) {  
      if (type === 'primary') return new PrimaryButton();  
      return new DefaultButton();  
    }  
  }  
  ```

**4. 装饰器模式（Decorator）**

- **作用**：动态扩展对象功能，不修改原有代码。

- **场景**：高阶组件（React HOC）、日志/权限装饰、ES7 装饰器语法。

- **示例**：

  ```js
  function withLogging(fn) {  
    return (...args) => {  
      console.log('函数被调用');  
      return fn(...args);  
    };  
  }  
  const decoratedFn = withLogging(() => { /* 业务逻辑 */ });  
  ```

**5. 代理模式（Proxy）**

- **作用**：通过代理对象控制对原对象的访问，添加额外逻辑（如缓存、校验）。

- **场景**：数据校验、缓存代理（如 HTTP 请求缓存）、ES6 的 `Proxy` 对象。

- **示例**：

  ```js
  const target = { name: 'John' };  
  const proxy = new Proxy(target, {  
    get(obj, key) {  
      console.log(`读取属性：${key}`);  
      return obj[key];  
    }  
  });  
  proxy.name; // 输出 "读取属性：name"  
  ```

**6. 策略模式（Strategy）**

- **作用**：定义一组算法并封装，使它们可以互相替换。

- **场景**：表单验证规则、动态计算逻辑（如促销折扣策略）。

- **示例**：

  ```js
  const strategies = {  
    add: (a, b) => a + b,  
    subtract: (a, b) => a - b  
  };  
  function calculate(strategy, a, b) {  
    return strategies[strategy](a, b);  
  }  
  ```

## 如何编写高性能的 JavaScript代码？

- 将js脚本放在页面底部，加快渲染页面;
- 使用非阻塞方式下载js脚本;
- 避免循环引用，防止内存泄漏：
- 尽量避免创建全局变量;
- 尽量减少使用闭包
- 尽量减少对象成员嵌套;
- 缓存DOM节点的访问;
- 通过避免使用eval和function()构造器;
- 给setTimeout()和setInterval()传递函数而不是字符作为参数;
- 尽量使用直接量创建对象和数组;
- 最小化重绘(repaint)和回流(reflow);



## 说说你对高阶函数的理解

高阶函数（Higher-Order Function）是指**接受函数作为参数或返回一个函数作为结果**的函数。它是 JavaScript 函数式编程的核心概念之一，常见的高阶函数有 `map`、`filter`、`reduce`、`forEach` 等。

**高阶函数的特点**

1. **接受函数作为参数**：高阶函数可以将其他函数作为参数传入，允许对行为进行参数化。
2. **返回一个函数作为结果**：高阶函数可以生成并返回新的函数，使得代码更加灵活和模块化。

**常见的高阶函数示例**

1. **数组的 map、filter、reduce**

   - `map`：接收一个回调函数，将回调函数应用到数组的每个元素上，返回新数组。
   - `filter`：接收一个回调函数，筛选符合条件的元素，返回新数组。
   - `reduce`：接收一个回调函数，将数组元素逐步累计到一个结果中，返回最终结果。

   ```javascript
   const numbers = [1, 2, 3, 4];
   const doubled = numbers.map(num => num * 2);    // [2, 4, 6, 8]
   const evens = numbers.filter(num => num % 2 === 0); // [2, 4]
   const sum = numbers.reduce((total, num) => total + num, 0); // 10
   ```

2. **函数柯里化（Currying）**

   - 通过返回一个新的函数，将参数拆分为多个独立调用的函数。

   ```javascript
   function add(x) {
       return function(y) {
           return x + y;
       }
   }
   const add5 = add(5);   // add5 是一个新函数
   console.log(add5(3));  // 8
   ```

3. **函数组合**

   - 组合多个函数，将一个函数的输出作为下一个函数的输入。

   ```javascript
   function compose(f, g) {
       return function(x) {
           return f(g(x));
       }
   }
   const addOne = x => x + 1;
   const square = x => x * x;
   const addOneThenSquare = compose(square, addOne);
   console.log(addOneThenSquare(2)); // 9
   ```

**高阶函数的优势**

1. **代码简洁**：通过复用高阶函数，可以减少冗余代码，提升可读性。
2. **扩展性强**：高阶函数可以轻松地扩展函数的功能，允许动态改变函数的行为。
3. **灵活性**：高阶函数可以动态生成新函数，提升函数的灵活性，适用于不同场景。

**什么是纯函数**？

纯函数（Pure Function）是指满足以下两个核心条件的函数：

**1. 核心特征**

- **确定性（相同输入 → 相同输出）**：只要输入参数相同，返回值永远一致。
- **无副作用（No Side Effects）**：不修改函数外部状态（如全局变量、DOM 操作、网络请求等）。

**2. 示例对比**

```javascript
// 纯函数  
function add(a, b) {  
  return a + b;  
}  

// 非纯函数（有副作用 + 输出不确定）  
let count = 0;  
function increment() {  
  count++;          // 修改外部变量（副作用）  
  return Math.random() + count; // 输出不确定  
}  
```

**3. 优点**

- **可维护性**：逻辑独立，易于理解和测试。
- **可缓存性**：可对输入参数做缓存（如记忆化 Memoization）。
- **并发安全**：无依赖外部状态，避免竞态条件。

**4. 前端应用场景**

- **Redux 的 Reducer**：要求必须是纯函数，根据旧状态和 Action 生成新状态。
- **React 函数组件**：推荐使用纯函数编写，依赖 Props 渲染 UI。
- **工具函数**：如数据格式化、计算逻辑等。

**总结**

纯函数通过隔离副作用和保证确定性，提升了代码的可预测性和可复用性，是函数式编程的核心概念，适用于需要高可靠性的场景。

## 什么是函数柯里化？

柯里化函数（Currying）是一种**将多参数函数转换为嵌套的单参数函数链**的技术，核心特性如下：

**1. 核心概念**

- **分步传参**：将 `fn(a, b, c)` 转换为 `fn(a)(b)(c)` 的调用形式，每次接收一个参数并返回新函数，直到参数收集完毕执行计算。
- **延迟执行**：参数未完全传递时返回中间函数，便于复用或组合。

**2. 实现原理**

- **闭包保存参数**：通过闭包逐层缓存已传入的参数。
- **参数数量判断**：当参数数量达到原函数要求时执行计算。

**3. 示例**

```js
// 普通加法函数  
function sum(a, b, c) { return a + b + c; }  

// 柯里化后  
const curriedSum = a => b => c => a + b + c;  
console.log(curriedSum(1)(2)(3)); // 6  

// 分步调用（复用中间函数）  
const add2 = curriedSum(1)(1);  
console.log(add2(3)); // 5  
```

**4. 应用场景**

- **参数复用**：提前固定部分参数（如 API 请求的基础配置）。
- **函数组合**：与高阶函数结合，创建灵活的功能模块。
- **延迟执行**：按需触发计算（如事件处理函数）。

**5. 与部分应用的区别**

- **柯里化**：严格逐参数转换（如 `fn(a)(b)(c)`）。
- **部分应用**：允许一次传递多个参数（如 `fn(a, b)` 返回接受 `c` 的函数）。

**总结**

柯里化通过分解参数提升函数的灵活性和复用性，是函数式编程的重要模式，适用于需要动态生成函数或组合逻辑的场景。

## 如何实现链式调用？

1. **返回对象自身（`return this`）**：适用于需要连续修改同一对象的场景。
2. **返回新实例**：适用于不可变数据或切换操作上下文（如 `Promise.then`）。
3. **混合模式**：结合前两者，灵活适配不同需求。

## callee 和 caller 的作用

**1. `arguments.callee`**

- **作用**：在函数内部，指向**当前正在执行的函数本身**。
- **经典场景**：匿名函数递归（现在用命名函数表达式替代更好）

**2. `function.caller`**

- **作用**：指向**调用当前函数的函数**（如果是全局调用则返回 `null`）。

## 如何实现跨标签页通信？

**1. `localStorage` 事件（同源）**

- **用法**：A页面改`localStorage` → B页面监听`storage`事件

```javascript
// A页
localStorage.setItem('msg', JSON.stringify({ data: 'hello' }));

// B页
window.addEventListener('storage', (e) => {
  if (e.key === 'msg') console.log(JSON.parse(e.newValue));
});
```

- **优点**：简单兼容性好
- **缺点**：只能传字符串，不能直接通信

**2. `BroadcastChannel` API（同源）**

```javascript
// 创建同名频道
const channel = new BroadcastChannel('chat');

// A页发消息
channel.postMessage({ text: 'Hi' });

// B页收消息
channel.onmessage = (e) => console.log(e.data);
```

- **优点**：现代API，支持复杂对象
- **缺点**：IE/老安卓不支持

**3. `SharedWorker`（同源）**

- 创建共享Worker处理消息中转
- 适合复杂场景（如多个页面共享数据）

**4. `window.postMessage`（可跨域）**

- 需先获取目标页面的`window`引用（如通过`window.open`）
- 配合`window.opener`实现父子页通信

**5. `Service Worker`（同源）**

- 利用后台线程做消息中转
- 可实现离线通信

**6. Cookie轮询（不推荐）**

- 定时读取Cookie变化
- 性能差，已过时

**总结选择**：

- 优先用`BroadcastChannel`（现代浏览器）
- 兼容场景用`localStorage`事件
- 跨域用`postMessage`（需控制目标窗口）

## 你对 token 进行身份验证了解多少？

Token 身份验证主要是用来替代传统的 Session 机制，让身份验证更灵活安全。大致流程是用户登录后，服务端生成一个 Token（比如 JWT）返回给前端，之后前端每次请求都在请求头里带上这个 Token，服务端验证通过后才响应数据。它的优势在于**无状态**（服务端不用存会话信息，适合分布式系统）、**安全性高**（Token 可以加密，配合 HTTPS 防泄露），而且**跨域和移动端支持更好**。常见的方案像 JWT 会把用户信息直接打包进 Token，而 Refresh Token 则是用长短效 Token 结合，避免频繁登录。简单来说，Token 就像一张加密的“通行证”，服务端解密验证合法后，才会允许访问资源。

## 如何安全存储 JWT？

在 Web 应用中安全存储 JWT（JSON Web Token）是身份验证的关键环节，以下是行业最佳实践和常见解决方案：

**1. 不要存储在以下位置**

- **❌ `localStorage/sessionStorage`** 易受 XSS 攻击（恶意脚本可读取）
- **❌ 普通 Cookie** 未设置 `HttpOnly` 时仍可能被 JS 读取

**2. 推荐方案：HttpOnly + Secure Cookie**

```javascript
// 服务端设置 Cookie 示例（Node.js）
res.cookie('token', jwt, {
  httpOnly: true,     // 禁止 JS 访问
  secure: true,       // 仅 HTTPS 传输
  sameSite: 'Strict', // 防御 CSRF
  maxAge: 15 * 60 * 1000 // 短期有效期（如15分钟）
});
```

**优点**：

- 防御 XSS（JS 无法读取 Cookie）
- 防御 CSRF（配合 `SameSite` 和 CSRF Token）
- 自动随请求发送（浏览器默认行为）

**缺点**：

- 需处理跨域 Cookie 配置
- 旧版浏览器可能不支持 `SameSite`

**3. 替代方案：内存存储（适合 SPA）**

- 登录后将 JWT 保存在内存变量中（例如 React 或 Vue 的全局状态、JS 变量）
- 页面刷新时通过隐藏的 iframe 静默续期（OAuth 2.0 常用方案）

```javascript
// 登录成功后存储到内存
let authToken = null;
fetch('/login').then(res => {
  authToken = res.data.token;
});
```

**优点**：

- 完全规避持久化存储风险
- 适合敏感度高的场景

**缺点**：

- 页面刷新后令牌丢失（需重新认证）
- 需配合刷新令牌机制（Refresh Token）

**4. 附加安全措施**

- **强制 HTTPS**：防止中间人窃听
- **短期有效期**：访问令牌（Access Token）有效期建议 ≤ 15 分钟
- **刷新令牌**：通过独立的 Refresh Token 续期（存储于 HttpOnly Cookie 或服务端 Session）
- **黑名单机制**：注销时使特定 JWT 失效（需服务端配合）
- **签名算法**：使用强算法（如 RS256 而非 HS256）

**不同场景推荐组合**

| 场景               | 存储方案                          |
| :----------------- | :-------------------------------- |
| 传统 Web 应用      | HttpOnly Cookie + CSRF Token      |
| SPA 单页应用       | 内存存储 + 刷新令牌机制           |
| 移动端/Native 应用 | 安全存储库（如 Android Keystore） |

**关键原则**：JWT 本身无法绝对安全，需结合传输加密（HTTPS）、短期令牌、刷新令牌等多层防御策略。



## 简述 JavaScript 的错误处理机制

JavaScript 通过 **`try/catch` 语句**、**错误类型系统**及**事件循环错误传播机制**处理运行时异常，支持主动抛出与异步错误捕获。  

**核心机制与用法**  

**1. 错误类型（内置 Error 子类）**  

- **`SyntaxError`**：语法错误（解析阶段抛出，无法捕获）；  
- **`ReferenceError`**：引用未声明变量；  
- **`TypeError`**：类型操作错误（如调用非函数）；  
- **`RangeError`**：数值越界（如数组负长度）；  
- **`URIError`** / **`EvalError`**：特定API使用错误；  
- **自定义错误**：继承 `Error` 类扩展业务错误。  

**2. 错误处理方式**  

- **`try/catch/finally`**：  
  ```javascript  
  try {  
    JSON.parse('invalid json');  
  } catch (err) {  
    console.error(err.message); // 捕获异常  
  } finally {  
    console.log('始终执行');  
  }  
  ```
- **`throw` 主动抛出**：  
  ```javascript  
  if (!data) throw new Error('数据为空');  
  ```

**3. 异步错误处理**  

- **Promise 链式捕获**：  
  ```javascript  
  fetch(url)  
    .then(res => res.json())  
    .catch(err => console.error('请求失败:', err));  
  ```
- **`async/await` + `try/catch`**：  
  ```javascript  
  async function loadData() {  
    try {  
      const res = await fetch(url);  
    } catch (err) {  
      console.error(err);  
    }  
  }  
  ```
- **全局捕获**：  
  ```javascript  
  // 未捕获的 Promise 错误  
  window.addEventListener('unhandledrejection', event => {  
    console.error('Unhandled Rejection:', event.reason);  
  });  
  
  // 全局同步错误  
  window.onerror = (msg, url, line) => {  
    console.error(`Error: ${msg} at ${url}:${line}`);  
    return true; // 阻止默认错误提示  
  };  
  ```

**错误传播规则**  

1. **同步代码**：错误逐层向上冒泡，直至被 `catch` 或全局 `onerror` 处理；  
2. **异步代码**：  
   - **宏任务（setTimeout等）**：错误无法被外部 `try/catch` 捕获；  
   - **微任务（Promise）**：通过 `.catch()` 或 `unhandledrejection` 捕获；  
3. **模块系统**：ES6 模块默认启用严格模式，未捕获错误直接终止脚本。  

**注意事项**  

- **无法捕获的异常**：  
  - 语法错误（解析阶段抛出）；  
  - 异步回调中的错误（如 `setTimeout` 内部未捕获的 `throw`）；  
- **错误对象属性**：  
  - `message`：错误描述；  
  - `stack`：调用栈信息（非标准但广泛支持）；  
- **生产环境监控**：  
  - 使用 `window.onerror` 或 `Sentry`、`Bugsnag` 等工具收集日志；  
- **性能影响**：避免在频繁执行的代码中过度使用 `try/catch`。  



**总结**：掌握错误类型、同步/异步捕获方式及全局监控，是构建健壮 JavaScript 应用的关键。优先使用 `try/catch` 处理预期内的错误，结合全局监听兜底未知异常。

## Array.prototype.reduce的高级用法有哪些？

**1. 生成哈希映射（对象）**

将数组转换为按特定属性分组的对象：

```javascript
const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Charlie', role: 'admin' }
];

const roleMap = users.reduce((acc, user) => {
  acc[user.role] = acc[user.role] || [];
  acc[user.role].push(user);
  return acc;
}, {});

// 输出：{ admin: [Alice对象, Charlie对象], user: [Bob对象] }
```

**2. 链式异步操作**

顺序执行异步任务（类似 Promise 链）：

```javascript
const asyncTasks = [fetchUser, fetchPosts, fetchComments];

asyncTasks.reduce(async (prevPromise, task) => {
  await prevPromise;
  return task();
}, Promise.resolve());
```

**3. 实现函数管道（Compose）**

组合多个函数形成处理流水线：

```javascript
const compose = (...fns) => x => fns.reduce((v, fn) => fn(v), x);

// 示例：先加10，再平方
const process = compose(x => x + 10, x => x ** 2);
console.log(process(5)); // (5+10)^2 = 225
```

**4. 生成 Map/Set 结构**

直接构造复杂数据结构：

```javascript
// 生成 Map
const map = arr.reduce(
  (m, item) => m.set(item.id, item),
  new Map()
);

// 生成去重数组（替代 new Set）
const unique = arr.reduce(
  (acc, cur) => acc.includes(cur) ? acc : [...acc, cur], 
  []
);
```

**5. 多维数据分析**

复杂统计场景（优于多次遍历）：

```javascript
const orders = [
  { product: 'A', price: 100, quantity: 2 },
  { product: 'B', price: 200, quantity: 1 }
];

const report = orders.reduce((acc, order) => ({
  total: acc.total + order.price * order.quantity,
  maxPrice: Math.max(acc.maxPrice, order.price),
  products: [...acc.products, order.product]
}), { total: 0, maxPrice: 0, products: [] });
```

**6. 状态机实现**

处理需要依赖前序状态的场景：

```javascript
const input = [1, 2, 'a', 3, 'b'];

const { numbers, strings } = input.reduce((acc, val) => {
  typeof val === 'number' 
    ? acc.numbers.push(val) 
    : acc.strings.push(val);
  return acc;
}, { numbers: [], strings: [] });
```

**7. 递归展开嵌套数组**

替代 `flat` 方法的实现：

```javascript
const deepFlatten = arr => arr.reduce(
  (acc, item) => acc.concat(
    Array.isArray(item) ? deepFlatten(item) : item
  ), 
  []
);

deepFlatten([1, [2, [3]]]); // [1, 2, 3]
```

**8. 实现中间件机制（类似 Koa/Express）**

模拟洋葱模型中间件:

```javascript
const middlewares = [logger, auth, handler];

const requestHandler = middlewares.reduce(
  (next, middleware) => req => middleware(req, next),
  req => req // 最后的默认处理
);

// 执行请求
requestHandler({ url: '/api' });
```

**9.更多**

[25个你不得不知道的数组reduce高级用法](https://segmentfault.com/a/1190000021737914)

## 谈谈你对迭代器(Iterator)的认识

迭代器（Iterator）是 JavaScript 中用于**统一遍历数据结构**的机制。以下是关键点整理：

**1. 核心概念**

- **迭代器对象**：必须实现 `next()` 方法，返回 `{ value: any, done: boolean }` 示例：

  ```javascript
  const iterator = {
    next() {
      return { value: 1, done: false };
    }
  };
  ```

- **可迭代对象**：实现 `[Symbol.iterator]()` 方法的对象，返回迭代器 示例：

  ```javascript
  const iterable = {
    [Symbol.iterator]() {
      return iterator; // 返回上述迭代器对象
    }
  };
  ```

**2. 内置可迭代对象**

- **数组**、**字符串**、**Map/Set**、**NodeList**

- **生成器对象**（Generator）：既是迭代器又是可迭代对象

  ```javascript
  function* gen() { yield 1; yield 2; }
  const g = gen();
  console.log(g[Symbol.iterator]() === g); // true（可迭代）
  ```

**3. 使用场景**

- **`for...of` 循环**：自动调用迭代器

  ```javascript
  for (const num of [1, 2, 3]) console.log(num); // 1,2,3
  ```

- **解构赋值**

  ```javascript
  const [a, b] = new Set([10, 20]); // a=10, b=20
  ```

- **扩展运算符**

  ```javascript
  const arr = [...'hello']; // ['h','e','l','l','o']
  ```

- **异步迭代**：`for await...of` 遍历异步数据源

  ```javascript
  for await (const chunk of asyncStream) {
    console.log(chunk);
  }
  ```

**4. 自定义迭代器**

**实现一个数字范围迭代器**：

```javascript
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    return {
      next: () => {
        if (current <= this.end) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

// 使用
for (const num of new Range(5, 7)) {
  console.log(num); // 5,6,7
}
```

**5. 迭代器 vs 生成器**

| 特性           | 迭代器             | 生成器                   |
| :------------- | :----------------- | :----------------------- |
| **创建方式**   | 手动实现`next()`   | `function*` 定义         |
| **状态管理**   | 需自行维护状态     | 自动暂停/恢复（`yield`） |
| **代码复杂度** | 较高（长流程处理） | 较低（类似同步写法）     |

**6. 注意事项**

- **一次性使用**：多数迭代器遍历后无法重置（需重新调用`[Symbol.iterator]()`）
- **惰性求值**：迭代器按需生成值，适合处理大数据流
- **错误处理**：可在 `next()` 中抛出异常，需用 `try...catch` 捕获



**总结**：迭代器通过统一的接口（`next()`）解耦了数据结构和遍历逻辑，使得 `for...of`、扩展运算符等语法能够跨多种数据结构工作，是 JavaScript 函数式编程和异步处理的重要基础。

## 谈谈你对生成器(Generator)的认识

生成器（Generator）是 JavaScript 中用于**控制函数执行流程**的特殊函数，能够暂停和恢复代码执行。以下是关键点总结：

**1. 核心特性**

- **定义方式**：通过 `function*` 声明生成器函数
- **执行控制**：使用 `yield` 暂停执行，`next()` 恢复执行
- **返回对象**：生成器实例（同时是**迭代器**，可直接用于 `for...of`）

```javascript
function* gen() {
  yield 1;
  yield 2;
  return 3;
}

const g = gen();
console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: true }
```

**2. 核心应用场景**

**① 惰性求值（按需生成数据）**

- 处理大数据集时逐项生成，节省内存



```JavaScript
function* generateSequence(max) {
  let n = 0;
  while (n < max) {
    yield n++;
  }
}

for (const num of generateSequence(1000000)) {
  if (num > 10) break; // 不会生成全部100万个数
}
```

**② 简化迭代器实现**

- 替代手动编写迭代器对象

```JavaScript
const obj = {
  *[Symbol.iterator]() {
    yield 'a';
    yield 'b';
  }
};

console.log([...obj]); // ['a', 'b']
```

**③ 异步流程控制（协程）**

- 配合 `yield` 实现类似 `async/await` 的效果

```JavaScript
function* fetchUser() {
  const user = yield fetch('/user'); // 等待Promise解决
  const posts = yield fetch(`/posts/${user.id}`);
  return posts;
}

// 执行器函数（类似co库）
function run(generator) {
  const g = generator();
  function handle(result) {
    if (result.done) return result.value;
    return result.value.then(data => handle(g.next(data)));
  }
  return handle(g.next());
}

run(fetchUser).then(posts => console.log(posts));
```

**3. 双向通信能力**

- **向外传值**：`yield` 右侧表达式结果作为 `next()` 返回的 `value`
- **向内传值**：`next(arg)` 的参数会成为当前 `yield` 表达式的返回值

```JavaScript
function* dialog() {
  const name = yield 'What is your name?'; // 接收next('Alice')传入的值
  yield `Hello, ${name}!`;
}

const d = dialog();
console.log(d.next().value); // "What is your name?"
console.log(d.next('Alice').value); // "Hello, Alice!"
```

**4. 错误处理**

- **外部抛出错误**：通过 `generator.throw()`
- **内部捕获错误**：使用 `try...catch` 包裹 `yield`

```JavaScript
function* errorHandling() {
  try {
    yield '正常执行';
  } catch (e) {
    yield `捕获错误：${e.message}`;
  }
}

const eh = errorHandling();
eh.next(); // { value: '正常执行', done: false }
eh.throw(new Error('出错啦!')); // { value: '捕获错误：出错啦!', done: false }
```

**5. 与异步函数的对比**

| 特性         | 生成器 (Generator)         | 异步函数 (Async/Await)      |
| :----------- | :------------------------- | :-------------------------- |
| **语法**     | `function*` + `yield`      | `async function` + `await`  |
| **返回值**   | 迭代器对象                 | Promise                     |
| **控制权**   | 更底层，可手动控制执行流程 | 自动流程控制                |
| **错误处理** | 需手动调用`throw()`        | 自动冒泡，可用`try...catch` |
| **典型应用** | 复杂流程控制、状态机       | 常规异步操作                |

**6. 实用技巧**

- **委托生成器**：使用 `yield*` 嵌套其他生成器

  ```JavaScript
  function* genA() { yield 'a'; }
  function* genB() { yield* genA(); yield 'b'; }
  console.log([...genB()]); // ['a', 'b']
  ```

- **无限数据流**：

  ```JavaScript
  function* naturalNumbers() {
    let n = 0;
    while (true) yield n++;
  }
  ```

- **状态机实现**：

  ```JavaScript
  function* trafficLight() {
    while (true) {
      yield 'red';
      yield 'yellow';
      yield 'green';
    }
  }
  ```

**7. 注意事项**

1. **一次性使用**：生成器遍历完成后无法重置（需重新调用生成器函数）
2. **性能考量**：频繁创建生成器可能带来额外开销
3. **浏览器兼容**：IE 及旧版移动端浏览器不支持（需 Babel 转译）



**总结**：生成器通过 `yield` 实现了函数执行流程的精细控制，既能简化迭代器实现，又能处理异步流程，是 JavaScript 异步编程和函数式编程的重要工具。在 Redux Saga、Koa 等库中广泛应用，适合需要手动控制执行节奏的复杂场景。

## 谈谈你对V8引擎的理解

**1. 基础定位**

**V8 是 Google 开发的 JavaScript 引擎**，负责将 JavaScript 代码转换为机器码并执行。它不仅是 Chrome 浏览器的核心组件，也支撑了 Node.js 的运行，是连接高级语言和底层硬件的桥梁。

**2. 核心特点**

- **高性能**： 通过 **即时编译（JIT）** 技术，先快速解释执行代码，再对高频执行的“热点代码”进行优化编译（比如循环或递归），平衡启动速度和执行效率。
- **内存管理**： 使用 **分代垃圾回收机制**，分为“新生代”和“老生代”，针对短期存活和长期存活的对象采用不同回收策略，减少内存占用。
- **优化机制**： 通过 **隐藏类（Hidden Class）** 等技术优化对象属性访问（类似给对象属性贴“固定标签”），避免动态类型语言频繁的类型检查开销。

**3. 实际影响（关联开发者视角）**

- **对前端开发的意义**： V8 的性能直接影响 JavaScript 的执行速度，现代框架（如 React/Vue）和复杂 Web 应用的流畅运行都依赖其优化能力。
- **对 Node.js 的意义**： V8 让 JavaScript 突破了浏览器的限制，能够处理服务器端的高并发 I/O 操作，推动了全栈开发的可能性。

**4. 如何写出对 V8 友好的代码（加分项）**

- **保持类型稳定**：避免同一变量频繁切换类型（如 `let a = 1; a = 'str'`）。
- **避免动态增删对象属性**：初始化时尽量固定对象结构，减少隐藏类的重建。
- **及时释放内存**：手动解除无用引用（如置为 `null`），减轻垃圾回收压力。

## 谈谈Javascript的垃圾回收机制

**1. 标记-清除（Mark-and-Sweep）**

- **原理**：

  - **标记阶段**：从根对象（如全局对象、当前函数调用栈、活跃的闭包等）出发，递归遍历所有可达对象，并标记为“活动”。
  - **清除阶段**：遍历堆内存，回收所有未被标记的对象，释放其内存。

- **优势**：

  - 有效处理循环引用（不可达的循环引用对象会被回收）。

- **示例**：

  ```javascript
  let obj1 = { prop: obj2 }; // obj1引用obj2
  let obj2 = { prop: obj1 }; // obj2引用obj1（循环引用）
  obj1 = null; obj2 = null;  // 切断根引用，循环引用对象将被回收
  ```

**2. 引用计数（已基本弃用）**

- **原理**：跟踪每个对象被引用的次数，当引用数为零时立即回收。

- **缺陷**：无法处理循环引用，易导致内存泄漏。

  ```javascript
  function createCycle() {
    let a = { ref: null };
    let b = { ref: null };
    a.ref = b; // a引用b
    b.ref = a; // b引用a（循环引用）
  }
  createCycle(); // 函数执行后，a和b的引用数仍为1，无法回收
  ```

## WebWorker、SharedWorker 和 ServiceWorker 有哪些区别？

`WebWorker`、`SharedWorker` 和 `ServiceWorker` 都是 Web API 提供的用于在后台线程执行 JavaScript 代码的机制，但它们有不同的用途和特性。下面是它们的主要区别：

**1. WebWorker**

- **作用**：用于在后台线程中执行 JavaScript 代码，避免阻塞主线程（UI线程）。
- **生命周期**：与页面的生命周期关联，当页面关闭时，WebWorker 也会终止。
- **通信**：通过 `postMessage` 和 `onmessage` 进行通信，只能与创建它的页面进行通信，不能与其他页面或 Worker 进行直接通信。
- **共享数据**：不能直接与其他 WebWorkers 或页面共享数据。
- **应用场景**：适用于需要在后台执行计算密集型任务的场景，如数据处理、图像处理等。

**示例**：

```javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage('Hello, worker!');
worker.onmessage = (event) => console.log(event.data);

// worker.js
self.onmessage = (event) => {
  self.postMessage(`Received: ${event.data}`);
};
```

**2. SharedWorker**

- **作用**：允许多个浏览器上下文（如不同的页面或 iframe）共享一个 Worker 实例。
- **生命周期**：与浏览器会话关联，不会随页面关闭而销毁，只要有一个页面或 iframe 仍在使用 SharedWorker，它就会保持活跃。
- **通信**：通过 `postMessage` 和 `onmessage` 进行通信，但可以在不同的页面或 iframe 之间进行通信。
- **共享数据**：可以在多个页面或 iframe 之间共享数据。
- **应用场景**：适用于需要在多个页面或 iframe 之间共享数据或状态的场景，如实时应用、共享缓存等。

**示例**：

```javascript
// main1.js
const worker = new SharedWorker('shared-worker.js');
worker.port.postMessage('Hello from page 1!');
worker.port.onmessage = (event) => console.log(event.data);

// main2.js
const worker = new SharedWorker('shared-worker.js');
worker.port.postMessage('Hello from page 2!');
worker.port.onmessage = (event) => console.log(event.data);

// shared-worker.js
self.onconnect = (event) => {
  const port = event.ports[0];
  port.onmessage = (event) => {
    port.postMessage(`Received: ${event.data}`);
  };
};
```

**3. ServiceWorker**

- **作用**：主要用于拦截和处理网络请求，缓存资源，实现离线功能和推送通知等功能。
- **生命周期**：与页面的生命周期无关，可以在后台长时间运行，不会随页面的关闭而结束。可以在浏览器关闭时继续运行，用于处理推送通知等。
- **通信**：通过 `postMessage` 和 `onmessage` 与页面进行通信，但不能直接访问 DOM。
- **共享数据**：通过缓存机制（Cache API）和 IndexedDB 进行数据存储和共享。
- **应用场景**：适用于实现离线支持、缓存优化、后台同步、推送通知等功能。

**示例**：

```javascript
// service-worker.js
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/styles/main.css',
        '/script/main.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

## fetch 与 ajax 的区别是什么？

Fetch 和 Ajax（基于 XMLHttpRequest）都是用来做异步请求的，主要区别有几点：

1. **语法差异**：Fetch 基于 Promise，写法更简洁，避免回调嵌套；Ajax 使用 XHR 对象，需要通过事件回调处理响应。
2. **错误处理**：Fetch 只有在网络故障时才会 reject，HTTP 错误（如 404）需手动判断 `response.ok`；Ajax 直接在回调里通过状态码处理。
3. **功能配置**：Fetch 默认不发送 cookie，需设置 `credentials: 'include'`；Ajax 在同源下自动携带。
4. **取消请求**：Ajax 可用 `xhr.abort()`，Fetch 需要结合 `AbortController`。
5. **兼容性**：XHR 兼容性更好，Fetch 需考虑旧浏览器支持。

## escape、encodeURI、encodeURIComponent 区别

这三个方法用于 URL 编码，但适用场景和编码规则不同：

1. **`escape`（已废弃）**

   - 对非 ASCII 字符（如中文）编码为 `%uxxxx` 格式，对部分符号（如 `@*_+-./`）不编码。
   - **不推荐使用**，无法替代 `encodeURI` 或 `encodeURIComponent`。

2. **`encodeURI`**

   - **编码整个 URL**，保留 URI 合法字符（如 `:/?#[]@` 等），只转义空格和中文等非法字符。
   - 适用场景：直接编码完整 URL，确保 URL 整体有效。

   

   ```javascript
   encodeURI("https://example.com/测试?name=张三"); 
   // 输出：https://example.com/%E6%B5%8B%E8%AF%95?name=%E5%BC%A0%E4%B8%89
   ```

3. **`encodeURIComponent`**

   - **编码 URL 的某一部分**（如参数值），转义所有非标准字符（包括 `:/?#` 等保留字符）。
   - 适用场景：单独编码查询参数、哈希值等，避免破坏 URL 结构。

   ```javascript
   encodeURIComponent("name=张三&age=20"); 
   // 输出：name%3D%E5%BC%A0%E4%B8%89%26age%3D20
   ```

**总结**：

- 处理完整 URL → `encodeURI`（保留关键符号）。
- 处理 URL 片段（如参数）→ `encodeURIComponent`（严格转义）。
- `escape` 已过时，不要用。

## 什么是伪数组？如何转换成数组？

**伪数组（类数组对象）** 是有 `length` 属性、数字索引属性，但**不具备数组方法**（如 `push`、`slice`）的对象。常见如 `arguments`、DOM 元素集合（如 `document.getElementsByTagName` 返回的结果）。

**转成真数组的常用方法**：

1. **`Array.from()`**（ES6）：

   ```javascript
   const arr = Array.from(伪数组);  
   ```

2. **`slice` + `call`**（ES5）：

   ```javascript
   const arr = [].slice.call(伪数组);  
   ```

3. **扩展运算符**（要求对象可迭代）：

   ```javascript
   const arr = [...伪数组];  // 如 arguments 或 NodeList  
   ```

## 谈谈你对 JSON 的理解

1. **是什么**： JSON（JavaScript Object Notation）是一种**轻量级的数据交换格式**，本质是字符串，但结构像JS对象（键值对）。
2. **核心特点**：
   - **易读**：`{ "name": "小明", "age": 18 }` 这种结构对人友好。
   - **通用**：几乎所有语言都支持（前端传数据给Java/Python等毫无压力）。
   - **轻量**：比XML更简洁，传输速度快。
3. **前端常用方法**：
   - `JSON.stringify(obj)`：把JS对象转成JSON字符串（比如传给后端）。
   - `JSON.parse(jsonStr)`：把JSON字符串转回JS对象（比如接后端数据）。
4. **注意事项**：
   - JSON键必须用**双引号**包裹。
   - 不支持函数、undefined等类型（会被忽略或转成null）。

## 谈谈你对 Base64 的理解

1. **是什么**： Base64 是一种**二进制转文本的编码方式**，将任意二进制数据（如图片、文件）转换为由64个字符（A-Z, a-z, 0-9, +/）组成的字符串。
2. **核心用途**：
   - **跨文本协议传输二进制**：比如在HTML/CSS中直接嵌入图片（Data URL）、API传输文件。
   - **简单混淆**：避免特殊字符引发解析问题（如JSON中传二进制）。
3. **前端常用方法**：
   - **编码**：`btoa(二进制数据)`（如 `btoa('Hello')` → "SGVsbG8="）。
   - **解码**：`atob(Base64字符串)`。
4. **注意事项**：
   - **体积增大**：编码后数据体积比原始二进制大**约1/3**。
   - **非加密**：只是编码，**明文可见**，敏感数据需额外加密。

## Object.is() 与比较操作符 “\===”、“\==” 有什么区别

1. **类型转换**
   - `==` 会做隐式类型转换（如 `'5' == 5` → `true`）。
   - `===` 和 `Object.is()` **不会转换类型**，类型不同直接返回 `false`。
2. **特殊值 `NaN` 的比较**
   - `NaN === NaN` → `false`（NaN 不等于自身）。
   - `Object.is(NaN, NaN)` → `true`（唯一能正确判断 NaN 相等的场景）。
3. **`+0` 和 `-0` 的区分**
   - `+0 === -0` → `true`。
   - `Object.is(+0, -0)` → `false`（能区分正负零）。

**总结**：

- **用 `===`**：日常大多数场景，性能更好，兼容性更广。
- **用 `Object.is()`**：需精确处理 `NaN` 或区分 `+0/-0` 的特殊情况（如框架底层逻辑）。

## 如何检测对象是否循环引用？

**1. 使用 `Set` 进行检测**

一种常见的方法是使用 `Set` 数据结构来跟踪已经访问过的对象。如果在遍历对象时发现某个对象已经在 `Set` 中存在，就可以确定存在循环引用。

**示例代码**：

```javascript
function hasCircularReference(obj) {
  const seen = new Set();

  function detect(obj) {
    if (obj && typeof obj === 'object') {
      if (seen.has(obj)) {
        return true; // 循环引用
      }
      seen.add(obj);
      for (const key of Object.keys(obj)) {
        if (detect(obj[key])) {
          return true;
        }
      }
    }
    return false;
  }

  return detect(obj);
}

// 测试循环引用
const a = {};
const b = { a };
a.b = b;

console.log(hasCircularReference(a)); // 输出：true**2. 使用 `WeakMap` 进行检测**
```

`WeakMap` 也可以用来检测循环引用，它与 `Set` 类似，但使用 `WeakMap` 可以避免内存泄漏，因为 `WeakMap` 的键是弱引用的。

**示例代码**：

```javascript
function hasCircularReference(obj) {
  const seen = new WeakMap();

  function detect(obj) {
    if (obj && typeof obj === 'object') {
      if (seen.has(obj)) {
        return true; // 循环引用
      }
      seen.set(obj, true);
      for (const key of Object.keys(obj)) {
        if (detect(obj[key])) {
          return true;
        }
      }
    }
    return false;
  }

  return detect(obj);
}

// 测试循环引用
const a = {};
const b = { a };
a.b = b;

console.log(hasCircularReference(a)); // 输出：true
```

**3. 使用 JSON 序列化**

一种简单的检测方法是尝试将对象序列化为 JSON 字符串，如果对象中存在循环引用，则会抛出错误。这种方法的缺点是会丢失对象中无法序列化的部分。

**示例代码**：

```javascript
function isCircular(obj) {
  try {
    JSON.stringify(obj);
    return false;
  } catch (e) {
    return true;
  }
}

// 测试循环引用
const a = {};
const b = { a };
a.b = b;

console.log(isCircular(a)); // 输出：true
```

## WebWorker、SharedWorker 和 ServiceWorker 有哪些区别？

**1. WebWorker**

- **作用**：用于在后台线程中执行 JavaScript 代码，避免阻塞主线程（UI线程）。
- **生命周期**：与页面的生命周期关联，当页面关闭时，WebWorker 也会终止。
- **通信**：通过 `postMessage` 和 `onmessage` 进行通信，只能与创建它的页面进行通信，不能与其他页面或 Worker 进行直接通信。
- **共享数据**：不能直接与其他 WebWorkers 或页面共享数据。
- **应用场景**：适用于需要在后台执行计算密集型任务的场景，如数据处理、图像处理等。

**示例**：

```javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage('Hello, worker!');
worker.onmessage = (event) => console.log(event.data);

// worker.js
self.onmessage = (event) => {
  self.postMessage(`Received: ${event.data}`);
};
```

**2. SharedWorker**

- **作用**：允许多个浏览器上下文（如不同的页面或 iframe）共享一个 Worker 实例。
- **生命周期**：与浏览器会话关联，不会随页面关闭而销毁，只要有一个页面或 iframe 仍在使用 SharedWorker，它就会保持活跃。
- **通信**：通过 `postMessage` 和 `onmessage` 进行通信，但可以在不同的页面或 iframe 之间进行通信。
- **共享数据**：可以在多个页面或 iframe 之间共享数据。
- **应用场景**：适用于需要在多个页面或 iframe 之间共享数据或状态的场景，如实时应用、共享缓存等。

**示例**：

```javascript
// main1.js
const worker = new SharedWorker('shared-worker.js');
worker.port.postMessage('Hello from page 1!');
worker.port.onmessage = (event) => console.log(event.data);

// main2.js
const worker = new SharedWorker('shared-worker.js');
worker.port.postMessage('Hello from page 2!');
worker.port.onmessage = (event) => console.log(event.data);

// shared-worker.js
self.onconnect = (event) => {
  const port = event.ports[0];
  port.onmessage = (event) => {
    port.postMessage(`Received: ${event.data}`);
  };
};
```

**3. ServiceWorker**

- **作用**：主要用于拦截和处理网络请求，缓存资源，实现离线功能和推送通知等功能。
- **生命周期**：与页面的生命周期无关，可以在后台长时间运行，不会随页面的关闭而结束。可以在浏览器关闭时继续运行，用于处理推送通知等。
- **通信**：通过 `postMessage` 和 `onmessage` 与页面进行通信，但不能直接访问 DOM。
- **共享数据**：通过缓存机制（Cache API）和 IndexedDB 进行数据存储和共享。
- **应用场景**：适用于实现离线支持、缓存优化、后台同步、推送通知等功能。

**示例**：

```javascript
// service-worker.js
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/styles/main.css',
        '/script/main.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

## 一直在 window 上面挂内容（数据，方法等等），是否有什么风险？

**1. 全局命名冲突**

`window` 对象是全局对象，将内容挂载到 `window` 上可能会导致命名冲突。不同的脚本或库可能会使用相同的全局变量名，导致冲突和意外的行为。

**2.性能问题**

频繁地在 `window` 对象上添加和修改属性可能会影响性能，特别是当这些操作涉及大量数据时。`window` 对象的复杂度增加可能会导致浏览器的内存使用和处理速度下降。

**3. 内存泄漏**

如果在 `window` 对象上挂载了大量数据或引用，而这些数据不再使用但没有被正确清理，会导致内存泄漏。这会导致应用的内存占用逐渐增加，最终可能导致浏览器崩溃或变得不响应。

**4. 安全性问题**

将敏感数据或功能暴露在 `window` 对象上可能会带来安全风险。如果恶意脚本能够访问或修改这些全局属性，可能会导致安全漏洞，例如数据泄露或功能被篡改。

**5. 难以维护**

全局对象上的数据和功能可能会使代码变得难以维护。全局状态的管理变得复杂，特别是在大型应用或团队开发环境中，调试和追踪全局变量的来源可能会变得困难。

## 原生 js 如何进行监听路由的变化？

在原生 JavaScript 中，可以通过监听 `hashchange` 事件和 `popstate` 事件来监听路由变化。以下是常见的方法：

1. 监听 `hashchange` 事件

`hashchange` 事件适用于基于哈希的路由（即 `#` 形式的路由，如 `example.com/#/home`）。

```javascript
window.addEventListener('hashchange', function() {
    console.log('Hash changed to:', location.hash);
});
```

- **原理**：当 URL 中的 `#` 部分发生变化时，会触发 `hashchange` 事件。
- **优点**：简单、兼容性好。
- **缺点**：只能监听 `#` 部分的变化，不适用于 `history` API 模式的路由。

1. 监听 `popstate` 事件

`popstate` 事件适用于 `history` API（例如 `pushState`、`replaceState`）实现的前端路由。

```javascript
window.addEventListener('popstate', function(event) {
    console.log('Location changed to:', location.pathname);
    console.log('State data:', event.state);
});
```

- **原理**：当 `history` 堆栈发生变化（例如使用 `back`、`forward`、`go` 等方法）时，会触发 `popstate` 事件。
- **优点**：适用于 `history` API，能更好地支持现代路由方案。
- **缺点**：不包括直接调用 `pushState` 和 `replaceState` 的情况，需要手动触发。

1. 重写 `pushState` 和 `replaceState` 以触发自定义事件

`pushState` 和 `replaceState` 本身不会触发 `popstate`，可以重写它们并手动触发事件。

```javascript
const originalPushState = history.pushState;
history.pushState = function (...args) {
    originalPushState.apply(this, args);
    window.dispatchEvent(new Event('pushstate'));
};

const originalReplaceState = history.replaceState;
history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    window.dispatchEvent(new Event('replacestate'));
};

// 监听自定义的 pushstate 和 replacestate 事件
window.addEventListener('pushstate', () => {
    console.log('URL changed (pushState):', location.pathname);
});
window.addEventListener('replacestate', () => {
    console.log('URL changed (replaceState):', location.pathname);
});
```

## MessageChannel 是什么，有什么使用场景？

MessageChannel 是浏览器提供的一种用于在不同上下文间建立直接通信通道的 API，属于 Channel Messaging API。它允许独立的代码块（如窗口、iframe、Web Workers 等）通过端口（MessagePort）进行双向数据传输。

**核心概念：**

- **组成**：每个 `MessageChannel` 实例包含两个相互关联的 `MessagePort`（`port1` 和 `port2`）。
- **通信机制**：一端通过 `port.postMessage()` 发送消息，另一端通过监听 `message` 事件接收消息。
- **所有权转移**：端口可通过 `postMessage` 的 `transfer` 参数传递给其他上下文，实现安全通信。

**主要使用场景：**

1. **跨文档通信** **示例**：主页面与 iframe 直接通信，避免通过 `window.postMessage` 广播消息。

   ```javascript
   // 主页面
   const channel = new MessageChannel();
   iframe.contentWindow.postMessage('init', '*', [channel.port2]);
   channel.port1.onmessage = (e) => console.log('Received:', e.data);
   
   // iframe 内部
   window.onmessage = (e) => {
     const port = e.ports[0];
     port.postMessage('Hello from iframe!');
   };
   ```

2. **Web Workers 高效通信** 主线程与 Worker 间建立专用通道，减少全局消息干扰。

   ```javascript
   // 主线程
   const worker = new Worker('worker.js');
   const channel = new MessageChannel();
   worker.postMessage({ port: channel.port2 }, [channel.port2]);
   channel.port1.onmessage = (e) => { /* 处理消息 */ };
   
   // Worker 内部
   onmessage = (e) => {
     const port = e.data.port;
     port.postMessage('Data from Worker');
   };
   ```

3. **Service Worker 双向交互** Service Worker 与客户端页面实时同步状态。

   ```javascript
   // 页面
   navigator.serviceWorker.controller.postMessage({ type: 'SYNC' }, [channel.port2]);
   channel.port1.onmessage = (e) => { /* 更新状态 */ };
   
   // Service Worker
   self.addEventListener('message', (event) => {
     const port = event.ports[0];
     port.postMessage({ status: 'updated' });
   });
   ```

4. **模块间解耦通信** 复杂应用中使用私有通道替代全局事件，防止命名冲突。

   ```javascript
   // 模块A
   const channel = new MessageChannel();
   moduleB.init(channel.port2);
   channel.port1.postMessage('ModuleA ready');
   
   // 模块B
   function init(port) {
     port.onmessage = (e) => { /* 处理消息 */ };
   }
   ```

5. **异步任务协调** 结合 Promise 实现等待响应模式。

   ```javascript
   function request(data, port) {
     return new Promise((resolve) => {
       port.postMessage(data);
       port.onmessage = (e) => resolve(e.data);
     });
   }
   ```

## setTimeout 延时写成0，一般可以什么场景下使用？

将`setTimeout`的延时参数设置为0通常用于创建一个宏任务，使用0延时仍然会导致一些延迟，但它比较接近于立即执行。

以下是一些通常会使用0延时的情况：

1. **延迟执行到当前代码块之后**

当需要确保某段代码在**当前同步代码执行完毕后再运行**时，可以使用 `setTimeout(fn, 0)`。 **示例**：

```javascript
console.log("Start");
setTimeout(() => console.log("Delayed"), 0);
console.log("End");
// 输出顺序：Start → End → Delayed
```

1. **解决浏览器渲染阻塞问题**

在密集的同步代码中插入 `setTimeout(fn, 0)`，可以**避免阻塞浏览器渲染**（如 DOM 更新、样式计算等），提升页面响应性。 **场景**： 批量操作 DOM 时，拆分任务避免页面卡顿：

```
function processChunk(data, index) {
  if (index >= data.length) return;
  // 处理一部分数据
  setTimeout(() => processChunk(data, index + 1), 0);
}
processChunk(largeDataArray, 0);
```

1. **确保 DOM 更新后执行代码**

在修改 DOM 后，若需立即获取更新后的布局信息（如元素尺寸、位置），需等待浏览器完成重排（Reflow）和重绘（Repaint）。 **示例**：

```
element.style.display = "none";
setTimeout(() => {
  // 此时浏览器已完成渲染，可安全操作
  element.style.display = "block";
}, 0);
```

1. **调整事件触发顺序**

在某些事件处理中，强制让代码在事件冒泡/捕获完成后执行。 **场景**： 父元素和子元素均有点击事件，若需父元素优先处理后再触发子元素逻辑：cript

```
parent.addEventListener("click", () => {
  setTimeout(() => {
    // 在父元素事件冒泡完成后执行
    console.log("父元素事件处理完成");
  }, 0);
});

child.addEventListener("click", () => {
  console.log("子元素事件触发");
});
```

1. **解决异步代码的竞态条件**

在异步操作（如 Promise）中，通过 `setTimeout(fn, 0)` 确保某些逻辑在微任务队列清空后执行。 **示例**：

```
Promise.resolve().then(() => console.log("微任务"));
setTimeout(() => console.log("宏任务"), 0);
// 输出顺序：微任务 → 宏任务
```

1. **兼容旧浏览器的 `requestAnimationFrame`**

在需要与浏览器渲染帧同步但缺乏 `requestAnimationFrame` 支持时，可用 `setTimeout(fn, 0)` 模拟（现代代码应优先使用 `requestAnimationFrame`）。


## ["1", "2", "3"].map(parseInt) 答案是多少？

**答案**：`[1, NaN, NaN]` **解析**：`map` 的回调会传递 `(value, index, array)`，而 `parseInt` 接受 `(string, radix)`。实际调用为：

```
parseInt("1", 0); // radix=0 视为十进制 → 1
parseInt("2", 1); // radix=1 非法 → NaN
parseInt("3", 2); // 二进制不允许数字 3 → NaN
```

## 如何使判断式(a\==1&&a\==2&&a\==3)成立

```
let a = {
  _a: 0,
  toString: function() {
    return ++a._a
  }
}
console.log(a == 1 && a == 2 && a == 3)
```



## 0.1 + 0.2 === 0.3 的结果是？为什么？

**答案**：`false` **解析**：浮点数精度问题。二进制无法精确表示 0.1 和 0.2，相加后会有微小误差。



## 以下代码的输出是什么？

```
let a = {};
let b = { key: "b" };
let c = { key: "c" };
a[b] = 123;
a[c] = 456;
console.log(a[b]);
```

---

**答案**：`456` **解析**：对象作为键时会被转换为字符串 `[object Object]`，两次赋值会覆盖同一个键。

## "5" + 3 和 "5" - 3 的结果是什么？

**答案**：`"53"` 和 `2` **解析**：`+` 优先字符串拼接，`-` 触发隐式转换为数字。

## 以下代码的输出是什么？

```
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

---

**答案**：`3, 3, 3` **解析**：`var` 无块级作用域，循环结束后 `i=3`，所有回调共享同一变量。

## 如何实现 add(2)(3)(4) 返回 9？

**答案**：函数柯里化：

```javascript
const add = (a) => (b) => (c) => a + b + c);
```

## 以下代码的输出是什么？

```javascript
const obj = { a: 1 };
function mutate(obj) {
  obj.a = 2;
  obj = { a: 3 };
}
mutate(obj);
console.log(obj.a);
```

---

**答案**：`2` **解析**：`obj = { a: 3 }`修改的是`mutate`形参的地址，使得形参指向另外一个对象，而obj的地址并未改变。



## {} + [] 返回 0？为什么？

**答案**：在控制台中直接输入 `{} + []`，结果为 `0`。 **解析**：`{}` 被解析为空代码块，`+[]` 将空数组转换为数字 `0`。



## 以下代码的输出顺序是什么？为什么？

```javascript
async function async1() {
  console.log(1);
  await async2();
  console.log(2);
}
async function async2() {
  console.log(3);
}
console.log(4);
setTimeout(() => console.log(5), 0);
async1();
new Promise(res => { console.log(6); res(); }).then(() => console.log(7));
console.log(8);
```

---

**答案**：`4,1,3,6,8,2,7,5` **解析**：

- 同步代码顺序执行：`4`, `1`, `3`, `6`, `8`
- 微任务队列：`await async2()` 后的 `2` 进入微任务，Promise 的 `7` 紧随其后
- 宏任务队列：`5` 最后执行

## 以下代码的输出是什么？

```javascript
function Foo() {
  getName = function() { console.log(1); };
  return this;
}
Foo.getName = function() { console.log(2); };
Foo.prototype.getName = function() { console.log(3); };
var getName = function() { console.log(4); };
function getName() { console.log(5); }

Foo.getName();       // A
getName();           // B
Foo().getName();     // C
getName();           // D
new Foo.getName();   // E
new Foo().getName(); // F
```

---

**答案**：`2,4,1,1,2,3` **解析**：

- A：调用静态方法 `Foo.getName` → 2
- B：变量 `getName` 覆盖函数声明 → 4
- C：`Foo()` 返回 `window`，全局 `getName` 被覆盖 → 1
- D：全局 `getName` 已是修改后的函数 → 1
- E：`new (Foo.getName)()` → 静态方法作为构造函数 → 2
- F：实例调用原型方法 → 3

## 以下代码的执行结果是什么，并解释原因

```
var b = a;
a.x = a = {n: 2};

console.log(a.x)    
console.log(b.x)
```

---

**答案**：`undefined` 和 `{n: 2}`

**解析**：这段代码可以分解为以下步骤：

1. 创建一个对象 `a`，属性 `n` 的值为 `1`。
2. 将变量 `b` 指向 `a`，`b` 现在也引用了这个对象。
3. 执行赋值语句 `a.x = a = {n: 2}`，其中 `a.x` 引用的是对象 `a` 的 `x` 属性，但是此时 `a` 的值被重新赋值为一个新的对象 `{n: 2}`。
4. 所以现在 `a` 引用的是 `{n: 2}`，而 `b` 仍然引用原始的对象 `{n: 1}`，且其 `x` 属性被赋值为 `{n: 2}`。
5. 所以 `console.log(a.x)` 结果为 `undefined`，因为 `a` 引用的对象没有 `x` 属性；而 `console.log(b.x)` 结果为 `{n: 2}`，因为 `b` 引用的对象的 `x` 属性被赋值为 `{n: 2}`。

## [3, 15, 8, 29, 102, 22].sort()，结果是多少，为什么？

**答案：**`[102, 15, 22, 29, 3, 8]`

**解析**：`Array.prototype.sort()` 方法默认是按字典顺序（即字符串的顺序）对数组元素进行排序的。它会将数组中的元素转换为字符串，然后按字典顺序比较这些字符串。

## [] == ![]结果是什么？

**答案：**`true`

**解析**:[]转换为数字为`0`,`![]` 首先是转换为**布尔值**，由于[]作为一个引用类型转换为布尔值为`true`, 因此`![]`为`false`，进而在转换成数字，变为`0`, `0 == 0` ， 结果为``true``



## 如何让 var [a, b] = {a: 1, b: 2} 解构赋值成功？

```javascript
const obj = {
    a: '1',
    b: '2',
    [Symbol.iterator]() {
        let index = 0
        const keys = Object.keys(this)
        return {
            next() {
                if (index < keys.length) {
                    return {
                        done: false,
                        value: obj[keys[index++]]
                    }
                }
                return {done:true,value:undefined}
            }
        }
    }
}

const [a, b] = obj
```

## 下面代码的输出结果是什么？

```javascript
const promise1 = new Promise((resolve, reject) => {
  console.log('promise1')
  resolve('resolve1')
})
const promise2 = promise1.then(res => {
  console.log(res)
})
console.log('1', promise1);
console.log('2', promise2);
```

**过程分析**

- 从上至下，先遇到new Promise，执行该构造函数中的代码promise1
- 碰到resolve函数, 将promise1的状态改变为resolved, 并将结果保存下来
- 碰到promise1.then这个微任务，将它放入微任务队列
- promise2是一个新的状态为pending的Promise
- 执行同步代码1， 同时打印出promise1的状态是resolved
- 执行同步代码2，同时打印出promise2的状态是pending
- 宏任务执行完毕，查找微任务队列，发现promise1.then这个微任务且状态为resolved，执行它。

**结果**

```
'promise1'
'1' Promise{<resolved>: 'resolve1'}
'2' Promise{<pending>}
'resolve1'
```

## 下面代码的输出结果是什么？

```javascript
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });
console.log("start");
fn().then(res => {
  console.log(res);
})
```

---

**解析**

start就在1之前打印出来了，因为fn函数是之后执行的。

注意：不要看到new Promise()，就以为执行它的第一个参数函数，我们还需要注意它是不是被包裹在函数当中，如果是的话，只有在函数调用的时候才会执行。

答案

```
"start"
1
"success"
```

## 下面代码的输出结果是什么？

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("timerStart");
    resolve("success");
    console.log("timerEnd");
  }, 0);
  console.log(2);
});
promise.then((res) => {
  console.log(res);
});
console.log(4);
```

---

**解析**

- 从上至下，先遇到new Promise，执行该构造函数中的代码1
- 然后碰到了定时器，将这个定时器中的函数放到下一个宏任务的延迟队列中等待执行
- 执行同步代码2
- 跳出promise函数，遇到promise.then，但其状态还是为pending，这里理解为先不执行
- 执行同步代码4
- 一轮循环过后，进入第二次宏任务，发现延迟队列中有setTimeout定时器，执行它
- 首先执行timerStart，然后遇到了resolve，将promise的状态改为resolved且保存结果并将之前的promise.then推入微任务队列
- 继续执行同步代码timerEnd
- 宏任务全部执行完毕，查找微任务队列，发现promise.then这个微任务，执行它。

**结果**

```
1
2
4
"timerStart"
"timerEnd"
"success"
```
## 下面代码的输出结果是什么？

```javascript
Promise.resolve()
  .then(function success (res) {
    throw new Error('error!!!')
  }, function fail1 (err) {
    console.log('fail1', err)
  }).catch(function fail2 (err) {
    console.log('fail2', err)
  })
```

---

**解析**
由于Promise调用的是resolve()，因此.then()执行的应该是success()函数，可是success()函数抛出的是一个错误，它会被后面的catch()给捕获到，而不是被fail1函数捕获。

**结果**

```
fail2 Error: error!!!
    at success
```

## 下面代码的输出结果是什么？

```javascript
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resovle1');
  resolve('resolve2');
}).then(res => {
  console.log(res)
  setTimeout(() => {
    console.log(p1)
  }, 1000)
}).finally(res => {
  console.log('finally', res)
})

```

---

**解析**

- Promise的状态一旦改变就无法改变
- finally不管Promise的状态是`resolved`还是`rejected`都会执行，且它的回调函数是接收不到Promise的结果的，所以finally()中的res是一个迷惑项。
- 最后一个定时器打印出的p1其实是`.finally`的返回值，我们知道`.finally`的返回值如果在没有抛出错误的情况下默认会是上一个Promise的返回值，而这道题中`.finally`上一个Promise是`.then()`，但是这个`.then()`并没有返回值，所以p1打印出来的Promise的值会是`undefined`，如果你在定时器的下面加上一个`return 1`，则值就会变成1。

**结果**

```
'resolve1'
'finally' undefined
'timer1'
Promise{<resolved>: undefined}
```

## 下面代码的输出结果是什么？

```javascript
const async1 = async () => {
  console.log('async1');
  setTimeout(() => {
    console.log('timer1')
  }, 2000)
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 end')
  return 'async1 success'
} 
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res))
setTimeout(() => {
  console.log('timer2')
}, 1000)


```

---

**解析**

需要注意的点：

- async函数中await的`new Promise`要是没有返回值的话则不执行后面的内容
- .then函数中的参数期待的是函数，如果不是函数的话会发生透传
- 注意定时器的延迟时间

**结果**

```
'script start'
'async1'
'promise1'
'script end'
1
'timer2'
'timer1'
```

## 下面代码的输出结果是什么？

```javascript
const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
            console.log(p)
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });
}));
first().then((arg) => {
    console.log(arg);
});
console.log(4);
```

---

**解析**

需要注意的点：

- 第一段代码定义的是一个函数，所以我们得看看它是在哪执行的，发现它在4之前，所以可以来看看first函数里面的内容了。
- 函数first返回的是一个`new Promise()`，因此先执行里面的同步代码3
- 接着又遇到了一个`new Promise()`，直接执行里面的同步代码7
- 执行完7之后，在p中，遇到了一个定时器，先将它放到下一个宏任务队列里不管它，接着向下走
- 碰到了`resolve(1)`，这里就把p的状态改为了resolved，且返回值为1，不过这里也先不执行
- 跳出p，碰到了`resolve(2)`，这里的`resolve(2)`，表示的是把first函数返回的那个Promise的状态改了，也先不管它。
- 然后碰到了`p.then`，将它加入本次循环的微任务列表，等待执行
- 跳出first函数，遇到了`first().then()`，将它加入本次循环的微任务列表(p.then的后面执行)
- 然后执行同步代码4
- 本轮的同步代码全部执行完毕，查找微任务列表，发现`p.then`和`first().then()`，依次执行，打印出1和2
- 本轮任务执行完毕了，发现还有一个定时器没有跑完，接着执行这个定时器里的内容，执行同步代码5
- 然后又遇到了一个resolve(6)，它是放在p里的，但是p的状态在之前已经发生过改变了，因此这里就不会再改变，也就是说resolve(6)相当于没任何用处，因此打印出来的p为`Promise{<resolved>: 1}`。

**结果**

```
3
7
4
1
2
5
Promise{<resolved>: 1}
```



## 下面代码的输出结果是什么？

```javascript
async function async1 () {
  try {
    await Promise.reject('error!!!')
  } catch(e) {
    console.log(e)
  }
  console.log('async1');
  return Promise.resolve('async1 success')
}
async1().then(res => console.log(res))
console.log('script start')
```

---


```
'script start'
'error!!!'
'async1'
'async1 success'

```



## 下面代码的输出结果是什么？

```javascript
async function async1 () {
  await async2();
  console.log('async1');
  return 'async1 success'
}
async function async2 () {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1().then(res => console.log(res))
```

---


```
'async2'
Uncaught (in promise) error

```

## 下面代码的输出结果是什么？

```javascript
async function testSometing() {
  console.log("执行testSometing");
  return "testSometing";
}

async function testAsync() {
  console.log("执行testAsync");
  return Promise.resolve("hello async");
}

async function test() {
  console.log("test start...");
  const v1 = await testSometing();
  console.log(v1);
  const v2 = await testAsync();
  console.log(v2);
  console.log(v1, v2);
}

test();

var promise = new Promise(resolve => {
  console.log("promise start...");
  resolve("promise");
});
promise.then(val => console.log(val));

console.log("test end...");
```

---

**分析**

1. **同步代码执行阶段**：
   - 调用`test()`函数，首先输出`test start...`
   - 执行`await testSometing()`，立即调用`testSometing`函数，输出`执行testSometing`
   - `testSometing`返回 resolved Promise，但`await`会将后续代码放入微任务队列
   - 继续执行同步代码，创建`promise`对象，输出`promise start...`
   - 将`promise.then`回调加入微任务队列
   - 输出`test end...`
2. **微任务队列处理顺序**：
   - **第一个微任务**（来自第一个`await`）：
     - 输出`testSometing`
     - 执行`await testAsync()`，立即调用`testAsync`函数，输出`执行testAsync`
     - 将后续代码放入微任务队列
   - **第二个微任务**（来自`promise.then`）：
     - 输出`promise`
   - **第三个微任务**（来自第二个`await`）：
     - 输出`hello async`
     - 最后输出`testSometing hello async`

```
'test start...'
'执行testSometing'
'promise start...'
'test end...'
'testSometing'
'执行testAsync'
'promise'
'hello async'
'testSometing' 'hello async'

```

## 下面代码的输出结果是什么？

```javascript
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```

---

**解析**

.then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传。

第一个then和第二个then中传入的都不是函数，一个是数字类型，一个是对象类型，因此发生了透传，将resolve(1) 的值直接传到最后一个then里。

**结果**

```
1
```


## 下面代码的输出结果是什么？

```javascript
const promise = new Promise((resolve, reject) => {
  resolve("success1");
  reject("error");
  resolve("success2");
});
promise
.then(res => {
    console.log("then: ", res);
  }).catch(err => {
    console.log("catch: ", err);
  })
```

---

**解析**

构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用 ，Promise的状态一经改变就不能再改变。

**结果**

```
"then: success1"
```



## 下面代码的输出结果是什么？

```javascript
const promise = new Promise((resolve, reject) => {
  reject("error");
  resolve("success2");
});
promise
.then(res => {
    console.log("then1: ", res);
  }).then(res => {
    console.log("then2: ", res);
  }).catch(err => {
    console.log("catch: ", err);
  }).then(res => {
    console.log("then3: ", res);
  })
```

---

**解析**

catch不管被连接到哪里，都能捕获上层未捕捉过的错误。

至于then3也会被执行，那是因为catch()也会返回一个Promise，且由于这个Promise没有返回值，所以打印出来的是undefined。

**结果**

```
"catch: " "error"
"then3: " undefined
```



## 下面代码的输出结果是什么？

```javascript
Promise.resolve().then(() => {
  return new Error('error!!!')
}).then(res => {
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})
```

---

**解析**

返回任意一个非 promise 的值都会被包裹成 promise 对象，因此这里的`return new Error('error!!!')`也被包裹成了`return Promise.resolve(new Error('error!!!'))`。

**结果**

```
"then: " "Error: error!!!"
```

此题中，当然如果想抛出一个错误的话，可以用下面的任意一种：

```
复制1return Promise.reject(new Error('error!!!'));
2// or
3throw new Error('error!!!')
```



