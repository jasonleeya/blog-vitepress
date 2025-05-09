---
category: Vue
order: 4

---

<script setup>
import NavHead from "../components/NavHead.vue";
</script>

<nav-head link="/posts/article/前端面试题合集/read.html">
</nav-head>

# Vue


## 说说你对 Vue 的理解?

Vue 是一个**渐进式前端框架**，核心在于 **数据驱动** 和 **组件化**，通过响应式系统自动更新视图，减少 DOM 操作。其特点包括：

1. **响应式数据**：Vue 2 用 `Object.defineProperty`，Vue 3 升级为 `Proxy`，实现数据变动自动渲染。
2. **组件化开发**：单文件组件（.vue）整合模板、逻辑与样式，支持组合式 API（Vue 3）提升逻辑复用性。
3. **虚拟 DOM**：高效 Diff 算法优化渲染性能，平衡速度与内存消耗。
4. **指令系统**：`v-model` 等模板语法简化双向绑定，`v-if`/`v-for` 等指令声明式操作 DOM。
5. **渐进式生态**：可逐步集成路由（Vue Router）、状态管理（Pinia）、SSR（Nuxt.js）等，适配不同项目规模。
6. **开发体验**：文档友好、学习曲线平缓，搭配 Vite 工具链实现快速热更新。

## 什么是 mvvm？

MVVM 是 **Model-View-ViewModel** 的架构模式，核心是通过 **数据绑定** 实现视图与数据的自动同步。

**核心分层**：

1. **Model**：数据层（如接口返回的原始数据）；
2. **View**：UI 界面（DOM 结构）；
3. **ViewModel**：连接层，监听 Model 变化并更新 View，处理 View 的交互更新 Model（如 Vue 的响应式系统）。

**优势**：

- **双向绑定**：数据变动自动更新视图（如 Vue 的 `v-model`）；
- **解耦**：业务逻辑集中在 ViewModel，View 更纯粹；
- **开发效率**：减少手动操作 DOM 的代码。

**对比 MVC**：

- MVC 需手动更新视图（如操作 DOM），MVVM 通过数据驱动自动更新。

## 说说你对双向绑定的理解?

Vue的双向绑定核心是通过数据劫持（比如`Object.defineProperty`或Vue3的`Proxy`）结合发布-订阅模式实现的。简单说，数据变化时自动更新视图（数据驱动），视图变化（比如输入框输入）时通过事件监听同步更新数据。`v-model`就是语法糖，内部自动处理了`value`属性和`input`事件的绑定。底层还依赖依赖收集和虚拟DOM的比对更新。

## 谈谈你对 Vue 数据响应式的理解 

Vue的数据响应式核心是让数据变动自动触发视图更新。实现原理主要是通过：

1. **数据劫持**：Vue2用`Object.defineProperty`拦截对象属性的读写，Vue3改用`Proxy`直接代理整个对象，能监听新增属性和数组变化。
2. **依赖收集**：每个组件实例对应一个`Watcher`，在渲染过程中访问数据时触发`getter`，把当前`Watcher`收集为依赖。
3. **派发更新**：数据变化时触发`setter`或`Proxy`的拦截，通知所有关联的`Watcher`重新渲染组件。
   需要注意，直接通过索引改数组或给对象新增属性无法触发响应（Vue2中需用`Vue.set`或数组变异方法），而Vue3的`Proxy`天然支持这些操作。

## Vue 实例挂载的过程中发生了什么??

1. **合并配置**：把用户传的`options`（比如data、methods）和全局配置（如Vue.mixin的内容）合并。
2. **初始化生命周期/事件/渲染函数**：创建组件实例关联的`$parent`、`$children`，初始化事件监听等。
3. **处理响应式数据**：把`data`、`props`等用`Object.defineProperty`（Vue2）或`Proxy`（Vue3）转成响应式，建立依赖关系。
4. **解析模板/生成渲染函数**：如果是选项式写法，会把`template`编译成`render`函数（运行时编译需要带编译器版本的Vue）。
5. **挂载DOM**：执行`render`生成虚拟DOM，通过`patch`方法转成真实DOM插入页面，同时触发`mounted`钩子。
   整个过程穿插调用`beforeCreate`、`created`、`beforeMount`等生命周期钩子。

## computed 和 watch 的区别及使用场景

**选择原则**：

- 需要**动态计算新值**且依赖其他数据 → `computed`；
- 需要**监听变化执行副作用**（如异步操作） → `watch`。

**区别**：

1. **核心用途**
   - **`computed`**：**基于依赖计算新值**（如合并 `firstName` 和 `lastName` 为全名），适合需要**动态计算且依赖其他数据**的场景。
   - **`watch`**：**监听数据变化并执行回调**（如接口请求、DOM 操作），适合需要**响应变化执行异步或复杂逻辑**的场景。
2. **缓存机制**
   - **`computed`**：**有缓存**，依赖值未变化时直接返回缓存结果，避免重复计算。
   - **`watch`**：**无缓存**，每次监听的值变化都会触发回调。
3. **返回值**
   - **`computed`**：必须返回一个值（通过 `getter`），可被模板直接使用。
   - **`watch`**：无需返回值，通常在回调中执行操作（如请求接口）。
4. **异步支持**
   - **`computed`**：**不支持异步**，必须是同步计算。
   - **`watch`**：**支持异步**（如 `setTimeout`、接口调用）。
5. **配置选项**
   - **`watch`**：可配置 `deep`（深度监听对象属性）、`immediate`（立即执行回调）等选项。
   - **`computed`**：无法配置这些选项。

**使用场景**

- **用 `computed`**：
  需要基于依赖数据**动态计算新值**，且希望利用缓存优化性能时（如模板中频繁使用的计算值）。
- **用 `watch`**：
  需要**响应数据变化执行副作用**（如异步请求、操作 DOM、调用方法），或需要监听非响应式数据（如路由参数）。

## Vue 中的 v-show 和 v-if 怎么理解？

- **v-if** 是“条件渲染”，根据表达式真假决定是否渲染元素到DOM。为`false`时元素直接不存在于DOM中，切换时会触发组件的销毁/重建，适合条件变动少的场景。
- **v-show** 是“显示切换”，无论条件如何，元素始终被渲染到DOM，只是通过`display: none`控制显隐。切换开销小，适合频繁切换的场景。
  简单说：`v-if`操作DOM增删，`v-show`只改CSS显隐。

## 说说你对 Vue 生命周期的理解?

 Vue生命周期是组件从创建到销毁的各个阶段，每个阶段会触发对应的钩子函数，方便我们在特定时机执行逻辑。主要分这几个阶段：

1. **创建阶段**：
   - `beforeCreate`：实例刚创建，数据、方法还未初始化。
   - `created`：数据、计算属性、方法已初始化，但DOM未生成（适合发起异步请求）。
2. **挂载阶段**：
   - `beforeMount`：模板编译完成，但尚未挂载到DOM。
   - `mounted`：DOM已挂载，可操作DOM或访问`$refs`（但子组件不一定全部挂载）。
3. **更新阶段**：
   - `beforeUpdate`：数据变化后，DOM更新前。
   - `updated`：DOM更新完成（避免在此处直接改数据，可能导致循环更新）。
4. **销毁阶段**：
   - `beforeDestroy`/`beforeUnmount`（Vue3）：实例销毁前，清理定时器、解绑事件。
   - `destroyed`/`unmounted`（Vue3）：实例已销毁，所有绑定和监听被移除。

**注意**：Vue3用`setup`替代了部分选项式API的钩子，但逻辑类似（如`onMounted`替代`mounted`）。父子组件的生命周期顺序也要注意（父beforeCreate→子created→子mounted→父mounted）。

## created 和 mounted 有什么区别？

在Vue中，`created`和`mounted`是两个常用的生命周期钩子函数，它们在组件的生命周期中扮演着不同的角色：

**created**：

- `created`是组件生命周期中的一个钩子函数，在Vue实例被创建后立即调用。
- 在`created`钩子函数中，Vue实例已经完成了数据观测（data observation），但尚未渲染真实DOM。这意味着你可以访问实例中的数据、方法、计算属性等，但不能保证实例已经被插入到DOM中。
- `created`常用于一些初始化操作，例如数据请求、事件监听或其他非DOM相关的任务。因为此时，组件的模板还未被编译成真实DOM。

**mounted**：

- `mounted`是组件生命周期中的一个钩子函数，在Vue实例挂载到DOM后调用。
- 在`mounted`钩子函数中，Vue实例已经完成了模板编译，并且已经将生成的虚拟DOM渲染到真实DOM中。
- `mounted`常用于需要对DOM进行操作的任务，例如初始化第三方库、绑定事件监听器、执行动画等。因为此时，组件已经被插入到DOM中，可以安全地访问和操作DOM元素。

区别总结：

- `created`在实例创建后被调用，适合处理数据初始化和非DOM相关的任务。
- `mounted`在实例挂载到DOM后被调用，适合进行DOM操作、初始化第三方库和绑定事件监听。

## 为什么 Vue 中的 v-if 和 v-for 不建议一起用?

1. **优先级问题**：
   - **Vue2**中`v-for`优先级高于`v-if`，会导致先循环所有数据再逐个判断条件，即使大部分数据无需渲染，造成性能浪费。
   - **Vue3**中`v-if`优先级更高，但此时`v-if`无法访问到`v-for`的循环变量，可能导致逻辑错误。
2. **性能损耗**：
   两者一起使用时，每次渲染都会先执行循环再过滤（或条件无法正确过滤），导致不必要的计算和DOM操作。

**正确做法**：将`v-if`移到外层容器（如用`<template>`包裹），或通过**计算属性**提前过滤数据，再用`v-for`遍历。

## 为什么 data 属性是一个函数而不是一个对象？

Vue的`data`必须是一个函数，主要目的是**保证组件复用时数据的独立性**。

- **对象的问题**：如果直接传对象，所有组件实例会共享同一个数据引用。修改其中一个实例的数据，会影响其他实例，导致状态污染。
- **函数的作用**：函数每次返回一个全新的数据对象，确保每个实例维护自己的独立状态（类似工厂模式）。

## Vue2 动态给 data 添加一个新的属性时会发生什么



## 父子组件的生命周期执行顺序是什么？

## Vue 中，推荐在哪个生命周期发起请求？

推荐在 `mounted` 生命周期钩子中发起请求。这样做有几个重要的理由：

1. **确保 DOM 已经被渲染**：
   - `mounted` 钩子在组件的 DOM 已经被插入文档之后调用。这意味着你可以确保所有的 DOM 元素都已经存在，如果你的请求结果需要直接操作或依赖这些 DOM 元素，那么在 `mounted` 中发起请求是安全的。
2. **避免不必要的请求**：
   - 在 `created` 钩子中发起请求有时会导致在组件还没有挂载时请求数据。如果组件在请求完成之前被销毁，可能会引发内存泄漏或不必要的资源浪费。因此，等待组件挂载完成再发起请求可以减少这些潜在问题。
3. **处理组件状态**：
   - 在 `mounted` 钩子中发起请求，能够确保你有机会在请求开始前处理组件的状态（例如设置加载状态），并且在请求完成后更新组件的状态（例如显示数据或处理错误）。

尽管 `mounted` 是推荐的生命周期钩子，但也有一些特定场景可能需要在 `created` 钩子中发起请求，例如：

- **SSR（服务器端渲染）**：在服务器端渲染中，Vue 实例的 `mounted` 钩子不会被调用，因为 DOM 并不会被真正挂载。在这种情况下，你可能需要在 `created` 钩子中发起请求。
- **依赖数据初始化**：如果组件在挂载之前就需要某些数据来初始化，可以在 `created` 钩子中发起请求，以确保数据在组件挂载时已经可用。

**代码示例**

```javascript
export default {
  data() {
    return {
      items: [],
      loading: false,
      error: null
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const response = await axios.get('/api/items');
        this.items = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
};
```



## Vue2 与 Vue3 有些什么区别？

1. **响应式系统**
   - **Vue 2**：基于 `Object.defineProperty`，无法监听对象新增属性或数组索引变化（需 `Vue.set`）。
   - **Vue 3**：改用 `Proxy`，支持动态属性/数组索引监听，性能更高，覆盖更全。
2. **API 设计**
   - **Vue 2**：`Options API`（按 `data`、`methods` 等选项组织代码），逻辑分散。
   - **Vue 3**：引入 `Composition API`（`setup` + `ref`/`reactive`），逻辑复用更灵活（类似 React Hooks）。
3. **性能优化**
   - **编译优化**：Vue 3 支持静态提升、Patch Flag 标记动态节点，虚拟 DOM Diff 效率更高。
   - **Tree-Shaking**：模块化架构，未使用代码不打包，体积更小（核心库约 10KB）。
4. **新特性**
   - **Fragment**：支持多根节点模板。
   - **Teleport**：跨 DOM 层级渲染组件（如全局弹窗）。
   - **Suspense**：异步组件加载状态管理。
5. **TypeScript 支持**
   - **Vue 2**：需通过装饰器或插件支持 TS，类型推断较弱。
   - **Vue 3**：源码用 TS 重写，提供完整类型定义。
6. **生命周期与 API 变更**
   - 钩子更名：如 `beforeDestroy` → `beforeUnmount`。
   - 移除过滤器（`filter`），推荐计算属性或方法替代。

## 谈谈 Object.defineProperty 与 Proxy 的区别

Object.defineProperty 和 Proxy 是 JavaScript 中用于对象操作的两种不同机制，它们在功能和使用场景上有显著差异。以下是两者的对比，以及 Vue 3 选择 Proxy 的原因：

**1. 核心区别**

| **特性**     | **Object.defineProperty**          | **Proxy**                                                    |
| :----------- | :--------------------------------- | :----------------------------------------------------------- |
| **拦截能力** | 仅能拦截属性的 `get` 和 `set`      | 支持 13 种拦截操作（如 `has`, `deleteProperty`, `ownKeys` 等） |
| **操作范围** | 需针对对象的每个属性单独定义       | 代理整个对象，自动处理所有属性                               |
| **数组处理** | 需重写数组方法（如 `push`, `pop`） | 直接监听索引变化和方法调用                                   |
| **动态属性** | 新增属性需手动调用 `Vue.set`       | 自动捕获属性添加/删除                                        |
| **嵌套对象** | 需递归初始化所有属性               | 按需代理（惰性初始化）                                       |
| **兼容性**   | 支持 IE9+                          | 不支持 IE，需现代浏览器                                      |

**2. 实现响应式的差异**

**Vue 2（Object.defineProperty）**

```javascript
// 对每个属性递归设置 getter/setter
function defineReactive(obj, key) {
  let value = obj[key];
  Object.defineProperty(obj, key, {
    get() {
      track(key); // 依赖收集
      return value;
    },
    set(newVal) {
      value = newVal;
      trigger(key); // 触发更新
    }
  });
}
```

- **缺点**：
  1. 初始化时需深度遍历对象，性能消耗大
  2. 无法检测通过索引修改数组（`arr[0] = 1`）或修改数组长度
  3. 新增属性需手动处理响应式**Vue 3（Proxy）**

```javascript
const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    track(key); // 依赖收集
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    Reflect.set(target, key, value, receiver);
    trigger(key); // 触发更新
    return true;
  },
  deleteProperty(target, key) {
    trigger(key); // 支持删除操作
    return Reflect.deleteProperty(target, key);
  }
});
```

- **优势**：
  1. 代理整个对象，无需初始化递归
  2. 自动捕获动态属性变化
  3. 直接支持数组索引操作

**3. Vue 3 使用 Proxy 的核心原因**

**(1) 更全面的拦截能力**

- **支持更多操作类型**：如 `in` 操作符、`Object.keys()`、`delete` 等，覆盖所有可能的对象操作。

- **示例**：直接监听属性删除：

  ```javascript
  const obj = { a: 1 };
  const proxy = new Proxy(obj, {
    deleteProperty(target, key) {
      console.log(`属性 ${key} 被删除`);
      return Reflect.deleteProperty(target, key);
    }
  });
  delete proxy.a; // 输出 "属性 a 被删除"
  ```

**(2) 更高效的数组处理**

- **直接监听数组索引变化**：无需重写数组方法，天然支持以下操作：

  ```javascript
  const arr = [1, 2];
  const proxyArr = reactive(arr);
  proxyArr[0] = 3;       // 触发更新
  proxyArr.length = 1;   // 触发更新**(3) 惰性初始化提升性能**
  ```

- **按需代理嵌套对象**：仅在访问子属性时触发代理，减少初始化开销：

  ```javascript
  const data = { nested: { a: 1 } };
  const proxy = reactive(data); // 初始仅代理 data，不处理 nested
  console.log(proxy.nested.a);  // 访问时才对 nested 生成代理**(4) 更好的动态属性支持**
  ```

- **自动响应新增属性**：无需手动调用 `Vue.set`：

  ```javascript
  const obj = reactive({});
  obj.newKey = 123; // 自动触发响应式更新
  ```

**4. 性能对比**

| **场景**             | **Object.defineProperty**  | **Proxy**            |
| :------------------- | :------------------------- | :------------------- |
| 初始化 1000 属性对象 | 约 15ms（递归遍历）        | 约 1ms（直接代理）   |
| 动态添加 100 属性    | 需手动触发响应式（性能差） | 自动处理（性能优）   |
| 大型数组操作         | 需重写方法（性能损耗）     | 原生拦截（性能更优） |

**5. 兼容性与取舍**

- **Proxy 的兼容性限制**：不支持 IE11 及以下浏览器，但 Vue 3 放弃对旧浏览器的支持，专注现代浏览器生态。
- **Polyfill 不可行**：Proxy 无法被完全模拟，Vue 3 的响应式系统完全依赖 Proxy。

**总结**

Vue 3 选择 Proxy 的核心动机在于其**更强大的拦截能力**、**更高效的初始化性能**和**更自然的动态属性支持**，这些改进使得响应式系统更加灵活和高效，同时减少了开发者的心智负担。尽管 Proxy 在兼容性上存在限制，但现代前端工程化的趋势（如自动降级和浏览器淘汰策略）使其成为更合理的选择。

## Vue3 composition api相比于option api有哪些优势?

Vue 3 引入 Composition API 的原因主要是为了更好地解决以下几个问题：

1. **更好的代码组织和重用**

在 Vue 2 中，使用选项式 API（Options API）来定义组件的逻辑，通常将数据、方法、计算属性和生命周期钩子分开写在不同的配置对象中。当组件变得复杂时，不同功能的代码可能会散落在各个部分，难以维护和重用。

示例：

```javascript
// Vue 2 中使用 Options API
export default {
  data() {
    return {
      count: 0,
      message: 'Hello World'
    };
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    }
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  created() {
    console.log(this.message);
  }
};
```

通过 Composition API，可以将相关功能的逻辑组织在一起，从而提高代码的可读性和可维护性。

**示例**：

```javascript
// Vue 3 中使用 Composition API
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const message = ref('Hello World');
    
    const doubleCount = computed(() => count.value * 2);
    
    const increment = () => {
      count.value++;
    };
    
    onMounted(() => {
      console.log(message.value);
    });
    
    return {
      count,
      doubleCount,
      increment,
      message
    };
  }
};
```

2. **更好的逻辑复用**

在 Vue 2 中，逻辑复用主要通过 mixins 和 scoped slots 实现，但它们都有一些缺点，比如命名冲突和代码可读性差。

Composition API 通过组合函数（composable functions）来实现逻辑复用，这些函数可以在多个组件之间共享和复用逻辑，避免了 mixins 的缺点。

示例：

```javascript
// 一个组合函数，可以在多个组件中复用
import { ref, onMounted } from 'vue';

export function useMessage() {
  const message = ref('Hello World');
  
  onMounted(() => {
    console.log(message.value);
  });
  
  return {
    message
  };
}
```

**在组件中使用：**

```javascript
import { ref } from 'vue';
import { useMessage } from './useMessage';

export default {
  setup() {
    const count = ref(0);
    const { message } = useMessage();
    
    const increment = () => {
      count.value++;
    };
    
    return {
      count,
      message,
      increment
    };
  }
};
```

3. **更好的 TypeScript 支持**

Composition API 天然地支持 TypeScript，使得类型推断和类型检查更为自然和方便。相比于 Options API，通过 Composition API 定义的逻辑更容易进行类型声明和类型推断，提升了开发体验。

示例：

```javascript
import { ref, computed } from 'vue';

export default {
  setup() {
    const count = ref<number>(0);
    const doubleCount = computed<number>(() => count.value * 2);
    
    const increment = (): void => {
      count.value++;
    };
    
    return {
      count,
      doubleCount,
      increment
    };
  }
};
```

4. **适应函数式编程趋势**

Composition API 借鉴了函数式编程的思想，将逻辑封装成函数，使得代码更加简洁、模块化、可测试，同时也更符合现代 JavaScript 开发趋势。

**总结**

Vue 3 引入 Composition API 主要是为了提升代码组织和复用性、提供更好的 TypeScript 支持、适应函数式编程趋势，并且解决 Vue 2 中存在的一些问题。通过 Composition API，可以让组件逻辑更加清晰、灵活和易于维护。

## Vue 组件间通信方式都有哪些?

1. **Props / $emit**
   - **父子通信**：父组件通过 `props` 传数据给子组件，子组件通过 `$emit` 触发事件通知父组件。
2. **自定义事件（Event Bus）**
   - **跨组件通信**：通过空的 Vue 实例（`const bus = new Vue()`）作为事件中心，用 `$on` 监听、`$emit` 触发（Vue 3 推荐使用第三方库如 `mitt`）。
3. **v-model / .sync（双向绑定）**
   - **父子双向同步**：Vue 2 用 `.sync`，Vue 3 支持多个 `v-model`，简化父子数据双向绑定。
4. **refs / \$parent / $children**
   - **直接访问组件实例**：通过 `this.$refs.xxx` 获取子组件实例，直接调用其方法或修改数据（不推荐，破坏封装性）。
5. **provide / inject**
   - **跨层级传递数据**：祖先组件通过 `provide` 提供数据，后代组件通过 `inject` 注入（适用于深层嵌套组件）。
6. **Vuex / Pinia（状态管理库）**
   - **全局状态共享**：集中式存储管理数据，通过 `state`、`actions`、`mutations`（Vuex）或 `store`（Pinia）实现跨组件通信。
7. **LocalStorage / SessionStorage**
   - **浏览器存储通信**：通过本地存储共享数据，需手动监听 `storage` 事件实现响应式（非 Vue 原生方案，慎用）。

**总结**：

- 父子组件优先用 **Props + $emit**；
- 跨层级用 **provide/inject** 或 **Vuex/Pinia**；
- 简单场景可用 **Event Bus**，复杂场景推荐状态管理库。

## 谈谈什么是单向数据流？

单向数据流指数据在应用中**单向传递**的设计模式，核心规则为：

1. **自上而下流动**：父组件通过 props 向子组件传递数据；
2. **禁止逆向修改**：子组件不能直接修改 props，子组件通过**自定义事件**（`$emit`）通知父组件修改数据。

## v-model 的原理是什么样的？

`v-model`是Vue.js框架中的一个指令，用于在表单元素和组件之间实现双向数据绑定。它提供了一种简洁的方式来将表单输入的值与Vue实例的属性进行关联。

当使用`v-model`指令时，Vue会根据表单元素的类型（如`input`、`select`、`textarea`等）自动为其添加相应的事件监听器，并在用户输入时更新绑定的数据。

具体地讲，`v-model`的原理如下：

1. 在模板中，我们可以使用`v-model`指令来绑定一个变量到表单元素（或组件）上，例如：`<input v-model="message">`。
2. Vue解析模板时，会将`v-model`指令转换成合适的属性和事件绑定。对于大多数表单元素，它会将`value`属性与输入框的当前值进行绑定，并监听`input`事件来实时更新绑定的数据。
3. 当用户在输入框中键入或选择内容时，触发`input`事件。Vue会捕获该事件并更新绑定的数据，以及根据数据的变化重新渲染视图。
4. 同样地，如果在表单元素上使用`v-model`的`lazy`修饰符，Vue会监听`change`事件而不是`input`事件。这样，只有当用户完成输入并触发`change`事件时，才会更新绑定的数据。

`v-model`指令实现双向绑定的原理是通过监听表单元素的输入事件（如`input`或`change`），将用户的输入同步到Vue实例中的属性，并在属性值变化时重新渲染视图。这使得我们可以轻松地将表单数据与Vue实例的状态保持同步，消除了手动监听和更新的冗余代码。

## Vue 中的双向绑定和单向数据流原则是否冲突？

在 Vue 中，双向绑定和单向数据流原则并不冲突，而是可以协同工作的。

**双向绑定（Two-Way Data Binding）**

- **定义**：允许视图（UI）和模型（数据）之间的双向同步。即，当数据变化时，视图自动更新；当视图中的数据（如用户输入）变化时，模型也会相应更新。
- **实现**：Vue 使用 `v-model` 指令实现双向绑定，适用于表单输入元素，使得数据和视图之间能够同步更新。

**单向数据流（One-Way Data Flow）**

- **定义**：数据从父组件流向子组件，数据流动方向是单向的。子组件不能直接修改父组件的数据，而是通过事件将数据变化通知给父组件，父组件再根据需要更新数据。
- **实现**：Vue 组件的设计遵循单向数据流，数据通过 props 从父组件传递到子组件，子组件通过事件向父组件发送通知。

**如何协调两者**

1. **双向绑定** 在表单控件中的使用（如 `v-model`）实际是 Vue 对单向数据流的封装。尽管 `v-model` 使得视图和数据双向绑定，但其本质上仍然遵循单向数据流原则：
   - **数据流动**：数据流动从父组件传递到子组件，`v-model` 只是将数据和视图的同步简化。
   - **更新机制**：当用户输入变化时，视图更新数据，数据的变化再传递回父组件，确保数据的统一管理和维护。
2. **实现细节**：
   - **内部实现**：`v-model` 在内部使用了事件监听（如 `input` 事件）和数据绑定（如 `value` 属性）来实现双向同步，但在组件设计层面，数据流动仍然是单向的。

## 说说你对 nexttick 的理解?

Vue 的 `nextTick` 用于在 **下次 DOM 更新周期后执行回调**，**解决数据变化后 DOM 未及时更新的问题**，确保代码逻辑在正确时机执行。核心作用与原理如下：

**1. 核心作用**

- **确保操作基于最新 DOM**：在数据变化后，若需立即访问更新后的 DOM（如获取元素尺寸、焦点等），需将逻辑放入 `nextTick` 回调。
- **解决异步更新导致的视图不一致**：Vue 的响应式更新是异步的，连续修改数据时，`nextTick` 可保证逻辑在 DOM 渲染完成后执行。

**2. 使用场景**

- **数据变化后操作 DOM**：

  ```javascript
  this.showModal = true;  
  this.$nextTick(() => {  
    this.$refs.modal.focus(); // DOM 已渲染  
  });  
  ```

- **生命周期钩子中的 DOM 操作**：如 `created` 钩子中访问 DOM。

**3. 实现原理**

- **异步队列**：Vue 将数据变更后的 DOM 更新任务推入队列，同一事件循环内的多次更新合并为一次。
- **优先级策略**：
  - 优先使用 `Promise.then`（微任务）。
  - 不支持则降级到 `MutationObserver` → `setImmediate` → `setTimeout`（宏任务）。

## 说说你对 Vue 的 mixin 的理解，有什么应用场景？

Vue 的 `mixin` 是一种 **逻辑复用机制**，允许将组件的选项（如 `data`、`methods`、生命周期钩子）抽离为独立模块，供多个组件混入使用。

**核心特点**

1. **选项合并**：
   - `data`、`methods` 等同名属性以组件优先。
   - 生命周期钩子会合并成数组，混入的钩子先于组件自身执行。
2. **应用场景**：
   - **复用公共逻辑**：如日志埋点、权限校验、表单验证方法。
   - **统一生命周期处理**：如多个组件需要在 `created` 时初始化数据。
   - **跨组件共享工具方法**：如格式化时间、请求封装。

**局限性**

- **命名冲突**：混入越多，属性和方法命名越易冲突。
- **数据来源不透明**：混入逻辑分散，维护时难以追踪来源。

**替代方案**

- Vue 3 的 **Composition API**（`setup` + 自定义 Hook）更灵活，规避了 mixin 的缺点。

**总结**：mixin 适合简单逻辑复用，但复杂场景推荐 Composition API。

## 说说你对 slot 的理解？slot 使用场景有哪些？

Vue 的 `slot`（插槽）是 **组件内容分发的核心机制**，允许父组件向子组件传递模板片段，实现动态内容定制。以下是核心理解与使用场景：

**一、核心理解**

1. **基本插槽**：
   - 子组件内定义 `<slot>` 占位符，父组件传递的内容将替换该位置。
   - 默认内容：`<slot>默认内容</slot>` 可设置后备值。
2. **具名插槽**：
   - 子组件定义多个 `<slot name="xxx">`，父组件通过 `<template v-slot:xxx>` 指定内容。
   - 简写：`v-slot:header` → `#header`（Vue 2.6+）。
3. **作用域插槽**：
   - 子组件通过 `<slot :data="data">` 向父组件传递数据。
   - 父组件通过 `<template #default="scope">` 接收并使用子组件数据。

**二、使用场景**

1. **动态内容容器**
   - 如模态框（Modal）、卡片（Card）等组件，允许父组件自定义内部内容。
2. **布局组件**
   - 定义可复用的布局框架（如页头、页脚、侧边栏），通过具名插槽填充各区域。
3. **数据驱动型组件**
   - 表格（Table）、列表（List）等组件，通过作用域插槽暴露行数据，父组件自定义渲染逻辑。
4. **高阶组件（HOC）**
   - 封装通用逻辑（如加载状态、错误处理），通过插槽插入业务相关 UI。

## Vue 的 key 值的作用是？

1. **精准追踪节点身份**
   - 在列表渲染（`v-for`）或动态组件中，通过唯一 `key` 标识元素，帮助 Vue 区分新旧节点，避免**就地复用**导致的渲染错误（如表单元素状态错乱）。
2. **优化 Diff 性能**
   - **有 `key`**：基于 `key` 建立映射关系，高效复用或移动节点，减少不必要的 DOM 销毁与重建。
   - **无 `key`**：按顺序对比节点，可能导致大量 DOM 操作（如列表中间插入元素时后续节点全部重建）。
3. **强制更新组件/元素**
   - 改变 `key` 会触发组件销毁与重新渲染，常用于强制重置组件状态（如切换路由时刷新组件）。

**总结**：`key` 是 Vue 高效更新视图的关键，通过标识节点身份优化渲染性能，避免状态错乱。

## vue 的 key 在列表渲染中，使用 index 作为值有什么隐患？

列表**增删/排序**时，`index` 会动态变化，Vue 可能**错误复用 DOM 节点**，导致表单项、组件状态与数据不匹配。

## 怎么缓存当前的组件？缓存后怎么更新？说说你对 keep-alive 的理解是什么？

**1. 如何缓存组件？**

通过 `<keep-alive>` 包裹动态组件或路由组件，缓存其状态避免重复渲染：

**2. 缓存后如何更新？**

- **生命周期钩子**：
  被缓存的组件触发 `activated`（激活时）和 `deactivated`（离开时）钩子，而非 `created`/`mounted`。
- **强制更新策略**：
  1. **动态 `key`**：改变组件的唯一标识（如路由参数），触发重新渲染。
  2. **`include/exclude` 控制**：动态调整缓存组件范围。

**3. 对 `keep-alive` 的核心理解**

- **作用**：
  - 缓存组件实例，避免重复销毁与重建，**提升性能**。
  - 保留组件状态（如表单输入、滚动位置）。
- **适用场景**：
  - 频繁切换的 Tab 页、路由页面。
  - 需保留状态的复杂表单组件。

## Vue 中异步组件和动态组件的区别是什么？

异步组件与动态组件的核心区别在于**加载机制**和**使用场景**：

1. **异步组件**：

   - **用途**：延迟加载组件代码，优化首屏性能（如路由懒加载）。

   - **实现**：通过 `defineAsyncComponent` 或返回 Promise 的工厂函数定义，按需加载资源。

   - **示例**：

     ```javascript
     const AsyncComp = defineAsyncComponent(() => import('./Component.vue'));  
     ```

2. **动态组件**：

   - **用途**：运行时动态切换同一挂载点的不同组件（如 Tab 切换）。

   - **实现**：通过 `<component :is="currentComponent">` 绑定组件名或组件对象。

   - **示例**：

     ```vue
     <component :is="isAdmin ? AdminPanel : UserPanel" />  
     ```

**关键区别**：

- 异步组件解决**加载时机**问题（性能优化），动态组件解决**渲染目标**问题（逻辑交互）。
- 异步组件本质是**代码分割**，动态组件是**条件渲染**。

## Vue 中组件和插件有什么区别？

组件（Component）和插件（Plugin）在 Vue 中的核心区别如下：

1. **功能定位**：
   - **组件**：封装可复用的 UI 单元（如按钮、弹窗），关注视图与交互逻辑。
   - **插件**：增强 Vue 的全局能力（如路由、状态管理、自定义指令），关注功能扩展。
2. **作用范围**：
   - **组件**：局部注册（单文件）或全局注册，需在模板中显式调用（如 `<MyComponent>`）。
   - **插件**：通过 `Vue.use()` 全局安装，自动注入功能（如 Vue Router 添加 `$router` 属性）。
3. **实现方式**：
   - **组件**：通过 `export default` 定义选项或 Composition API。
   - **插件**：需暴露 `install` 方法，接收 `Vue` 构造函数进行扩展。

**示例**：

- 组件：封装一个 `<DatePicker>` 选择器；
- 插件：开发一个全局错误监控工具（如 `Vue.use(ErrorTracker)`）。

## Vue中的$nextTick有什么作用？



## Vue 常用的修饰符有哪些？有什么应用场景？

**一、事件修饰符**

1. **`.stop`**
   - **作用**：阻止事件冒泡。
   - **场景**：点击子元素时不触发父元素的点击事件。
2. **`.prevent`**
   - **作用**：阻止默认行为。
   - **场景**：表单提交时禁止页面刷新。
3. **`.capture`**
   - **作用**：事件捕获模式（由外到内触发）。
   - **场景**：父容器优先处理事件。
4. **`.self`**
   - **作用**：仅当事件从元素本身触发时执行（忽略子元素冒泡）。
   - **场景**：父容器仅响应自身点击，不被子元素冒泡影响。
5. **`.once`**
   - **作用**：事件只触发一次。
   - **场景**：按钮提交后禁用重复点击。
6. **`.passive`**
   - **作用**：优化滚动性能（不阻塞主线程）。
   - **场景**：移动端滚动监听（如 `@scroll.passive`）。

**二、表单输入修饰符**

1. **`.lazy`**
   - **作用**：输入框内容在 `change` 事件（非 `input`）时同步数据。
   - **场景**：减少实时同步频率（如搜索框输入完成后触发搜索）。
2. **`.number`**
   - **作用**：将输入值转为数值类型。
   - **场景**：表单输入数字（如年龄、价格）。
3. **`.trim`**
   - **作用**：去除输入内容首尾空格。
   - **场景**：用户名、邮箱输入自动清理空格。

**三、键盘事件修饰符**

1. **按键修饰符**（如 `.enter`、`.esc`、`.tab`）
   - **作用**：监听特定按键事件。
   - **场景**：回车提交表单、ESC 关闭弹窗。 
2. **系统修饰符**（如 `.ctrl`、`.alt`、`.shift`）
   - **作用**：组合键触发事件。
   - **场景**：快捷键操作（如 `Ctrl + S` 保存）。

**四、鼠标修饰符**

- **`.left`、`.right`、`.middle`**
  - **作用**：监听特定鼠标按键事件。
  - **场景**：右键菜单、中键操作。

**五、其他修饰符**

1. **`.sync`（Vue 2）**
   - **作用**：实现父子组件双向绑定（Vue 3 已弃用，改用 `v-model` 参数）。
   - **场景**：简化父子组件数据同步。
2. **`.native`（Vue 2）**
   - **作用**：监听组件根元素的原生事件（Vue 3 已移除，需通过 `emits` 声明）。
   - **场景**：在组件上直接绑定原生事件。



## 你有写过自定义指令吗？自定义指令的应用场景有哪些？

**实现过程：**

1. **注册指令**：
   - **全局注册**：`Vue.directive('指令名', { 钩子函数 })`。
   - **局部注册**：在组件选项中定义 `directives: { 指令名: { 钩子函数 } }`。
2. **定义钩子函数**：
   - **`bind`**：指令首次绑定到元素时调用（初始化设置）。
   - **`inserted`**：元素插入父节点时调用（可访问 DOM）。
   - **`update`**：组件更新时调用（值变化但子元素未更新）。
   - **`componentUpdated`**：组件及子元素更新后调用。
   - **`unbind`**：指令与元素解绑时调用（清理副作用）。

**应用场景：**

1. **DOM 操作增强**

   - **自动聚焦**：表单输入框初始化时自动聚焦。
   - **图片懒加载**：当图片进入可视区域时加载资源（结合 `IntersectionObserver`）。

2. **交互优化**

   - **防抖/节流**：控制事件触发频率（如 `v-debounce` 优化搜索框输入）。

   ```javascript
   Vue.directive('debounce', {  
     inserted(el, binding) {  
       let timer;  
       el.addEventListener('input', () => {  
         clearTimeout(timer);  
         timer = setTimeout(() => binding.value(), 500);  
       });  
     }  
   });  
   ```

3. **权限控制**

   - **按钮权限**：根据用户角色隐藏/禁用按钮。

   ```javascript
   Vue.directive('permission', {  
     inserted(el, binding) {  
       if (!checkPermission(binding.value)) {  
         el.parentNode.removeChild(el);  
       }  
     }  
   });  
   
   // 使用  
   <button v-permission="'admin'">仅管理员可见</button>  
   ```

4. **样式/动画控制**

   - **高亮元素**：特定条件下动态添加样式（如输入验证错误）。
   - **拖拽指令**：封装拖拽逻辑，复用至可拖拽组件。

## template 标签为什么不可以使用 v-show？

`<template>` 标签在 Vue 中是一个 **占位符元素**，它本身在渲染时不会生成任何实际的 DOM 元素，只是为了包裹一些结构或逻辑，帮助开发者更好地组织模板内容。因此，`<template>` 标签没有实际的渲染结果，它的存在只在编译和渲染过程中起到作用。

**为什么 `v-show` 不能直接用于 `<template>`？**

1. **`v-show` 是基于 `display` 样式控制元素的显示和隐藏的**：
   - 当使用 `v-show` 时，Vue 会动态控制绑定元素的 `display` 样式。如果元素被隐藏，`display: none` 会被应用到该元素，反之则会恢复为正常的显示状态。
   - 然而，`<template>` 本身并不会渲染任何真实的 DOM 元素。它的作用仅限于包裹其他元素，并不生成实际的 HTML 元素。因此，`v-show` 并不适用于 `<template>` 标签。
2. **`<template>` 没有实际的 DOM 元素**：
   - `v-show` 操作的是 DOM 元素的样式，而 `<template>` 本身并不渲染为一个真实的 DOM 元素，因此 `v-show` 无法对 `<template>` 标签本身进行样式控制。

**示例：**

如果你在 Vue 中使用 `v-show` 绑定到 `<template>` 上，会得到一个警告，并且不会起作用：

```html
<template v-show="isVisible">
  <div>内容</div>
</template>
```

这种情况下，Vue 会提示 `v-show` 不能直接应用在 `<template>` 标签上，因为 `<template>` 并不渲染任何实际的 DOM 元素。

**正确的使用方式：**

如果你想根据条件控制 `<template>` 中的内容的显示与隐藏，可以将 `v-show` 或 `v-if` 应用到 `<template>` 内部的实际渲染元素上：

```html
<template>
  <div v-show="isVisible">
    内容
  </div>
</template>
```

或者使用 `v-if` 来实现条件渲染：

```html
<template>
  <div v-if="isVisible">
    内容
  </div>
</template>
```

## Vue3 中 Teleport 组件的作用是什么？

Vue Teleport 用于将组件模板内的内容**渲染到 DOM 中的指定位置**(如body)，解决父组件样式或结构限制（如 `overflow:hidden`、层级问题）。

## 解释 Vue3 中 defineExpose 的作用

- 默认情况下，`<script setup>` 的组件是**封闭的**，父组件无法直接访问子组件的内部状态或方法,`defineExpose` 可**显式暴露子组件的属性或方法**，允许父组件通过 `ref` 访问这些内容

## Vuex 是什么？有哪几种属性？

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式，包含5个属性，分别是：

- **State**：存储响应式数据；
- **Getters**：计算属性（类似 `computed`）；
- **Mutations**：**同步**修改 `state`（通过 `commit` 触发）；
- **Actions**：**异步**操作（通过 `dispatch` 触发，内部可调用 `commit`）；
- **Modules**：模块化拆分复杂 Store。

##  Vuex 中 Action 和 Mutation 的区别？

- **Mutation**：同步修改 `state`，通过 `commit` 调用；
- **Action**：处理异步（如接口请求），通过 `dispatch` 调用，内部可提交多个 Mutation。

## 页面刷新 Vuex 数据刷新丢失怎么办？

```javascript
// 页面加载时读取 localStorage  
if (localStorage.getItem('store')) {  
  store.replaceState(JSON.parse(localStorage.getItem('store')));  
}  
// 监听 Vuex 变化，保存到 localStorage  
store.subscribe((mutation, state) => {  
  localStorage.setItem('store', JSON.stringify(state));  
});  
```

## Pinia 和 Vuex 的核心区别及优势？

**一、核心区别**

| **特性**            | **Pinia**                                                    | **Vuex**                                                     |
| :------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **API 设计**        | 基于 Composition API，简化概念（无 mutations），更贴近 Vue 3 的语法 | 基于 Flux 架构，需定义 `state`、`mutations`、`actions`、`getters` |
| **模块化**          | 扁平化多 Store，每个 Store 独立定义，无需嵌套模块            | 通过 `modules` 组织嵌套模块，需命名空间管理                  |
| **状态修改方式**    | 在 `actions` 中直接修改 `state`（支持同步/异步）             | 必须通过 `mutations` 同步修改 `state`，`actions` 处理异步后提交 `commit` |
| **TypeScript 支持** | 原生完全支持，类型推断更友好                                 | Vuex 4 对 TS 支持较弱，需额外配置                            |
| **体积**            | 约 1KB，轻量级                                               | 较大（约 10KB）                                              |
| **调试工具**        | 不支持时间旅行（Time Travel）                                | 支持时间旅行和状态快照调试                                   |

**二、Pinia 的优势** 

1. **简洁直观的 API**
   - 移除 `mutations`，状态修改直接在 `actions` 中完成，减少代码冗余。
   - 与 Vue 3 的组合式 API 风格无缝集成，例如通过 `defineStore` 定义 Store，代码更易读。
2. **灵活的模块化**
   - 支持多 Store 独立管理，每个 Store 通过 `defineStore` 生成，无需手动注册模块或处理命名空间冲突。
3. **TypeScript 友好**
   - 源码完全由 TS 编写，提供完整的类型推断，减少类型声明的工作量。
4. **性能优化**
   - 基于 Vue 3 的响应式系统（Proxy），性能更高效。
   - 轻量级体积（约 1KB），减少打包负担。
5. **开发体验提升**
   - 直接通过函数调用触发 `actions`（如 `store.increment()`），无需 `dispatch` 或 `commit`。

**三、Vuex 的优势** 

1. **成熟的调试功能**
   - 支持时间旅行和状态快照，适合复杂场景的调试需求。
2. **严格的架构规范**
   - 通过 `mutations` 强制同步修改状态，保证状态变更的可追踪性和可预测性，适合大型项目维护。
3. **丰富的生态系统**
   - 社区资源丰富，插件生态完善（如持久化存储、日志插件）。
4. **集中式状态管理**
   - 单一 Store 结构适合需要全局统一管理的复杂应用场景。

**四、使用场景建议** 

- **选择 Pinia**：
  - Vue 3 项目，尤其是中小型应用或需要快速开发的场景。
  - 需要灵活的状态管理、TypeScript 深度集成或代码简洁性优先的项目。
- **选择 Vuex**：
  - Vue 2 项目或需要严格状态管理流程的大型应用。
  - 依赖时间旅行调试功能或已有 Vuex 生态集成的遗留项目。

## Pinia 有哪些使用场景？

Pinia 是 Vue.js 官方推荐的状态管理工具，它的设计简单、轻量，适合多种场景使用，特别是在 Vue 3 的项目中。

以下是 Pinia 的主要使用场景及具体说明：

**1. 全局状态管理**

Pinia 的核心功能是管理全局状态，适用于以下场景：

- **跨组件共享数据**：当多个组件需要共享同一份状态时（如用户信息、权限等）。
- **全局状态存储**：如用户登录态、应用设置（语言、主题）、权限配置等。

**示例**：

```javascript
// store/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    username: '',
  }),
  actions: {
    login(username) {
      this.isLoggedIn = true;
      this.username = username;
    },
    logout() {
      this.isLoggedIn = false;
      this.username = '';
    },
  },
});
```

**2. 持久化数据存储**

在需要跨页面或跨会话保留某些数据时，Pinia 可以与持久化插件结合（如 `pinia-plugin-persistedstate`）实现状态持久化。

**适用场景**：

- 保留登录信息、用户配置、购物车数据等。
- 恢复应用的上一次操作状态。

**示例**：

```javascript
import { defineStore } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    theme: 'light',
  }),
  persist: true, // 开启持久化
});
```

**3. 模块化管理复杂项目**

在大型项目中，Pinia 通过独立 Store 文件管理不同模块的数据和逻辑，避免代码耦合，使代码更清晰。

**适用场景**：

- 项目中存在多个功能模块（如用户、权限、订单、商品管理等），需要对状态进行模块化划分。
- 不同模块间需要数据共享或依赖。

**示例**：

```javascript
// stores/user.js
export const useUserStore = defineStore('user', { /* 用户模块 */ });
// stores/product.js
export const useProductStore = defineStore('product', { /* 商品模块 */ });
```

**4. 异步数据管理**

Pinia 支持直接在 Store 中使用异步操作，可以在 actions 中执行 API 请求，并更新状态。

**适用场景**：

- 处理异步请求（如从后端获取数据并更新全局状态）。
- 在状态管理中封装业务逻辑，避免将复杂逻辑直接写在组件中。

**示例**：

```javascript
import axios from 'axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      const response = await axios.get('/api/products');
      this.products = response.data;
    },
  },
});
```

**5. 组件解耦与状态分离**

Pinia 提供响应式的状态管理，能够让组件逻辑与数据状态分离，适用于以下场景：

- 当组件的数据和逻辑复杂，需要抽离到 Store 中管理。
- 多个组件依赖同一逻辑和数据时，通过 Store 提供统一的接口。

**示例**：

```javascript
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});

// 在多个组件中使用：
const counterStore = useCounterStore();
counterStore.increment();
```

**6. 替代 Vuex 进行状态管理**

Pinia 是 Vuex 的现代化替代品，在以下场景中可以选择 Pinia：

- **新项目**：在 Vue 3 项目中推荐直接使用 Pinia。
- **迁移项目**：将旧 Vuex 项目迁移至 Vue 3 时，使用 Pinia 替代 Vuex。

**示例**：

```javascript
// 使用 Pinia 替代 Vuex 语法更简洁
const useStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

**7. 适配 TypeScript 项目**

Pinia 对 TypeScript 支持友好，适合以下场景：

- 项目使用 TypeScript，状态和逻辑需要严格的类型约束。
- 需要提升开发效率，通过类型推导减少错误。

**示例**：

```javascript
import { defineStore } from 'pinia';

interface State {
  count: number;
}

export const useCounterStore = defineStore<'counter', State>('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

**8. 动态创建 Store**

Pinia 支持动态创建 Store，可以根据实际需求动态生成状态管理实例。适用于以下场景：

- 动态模块加载或组件实例化时创建独立的状态实例。

**示例**：

```javascript
import { defineStore } from 'pinia';

export const createDynamicStore = (id) => {
  return defineStore(id, {
    state: () => ({
      data: null,
    }),
  });
};

const storeA = createDynamicStore('moduleA');
const storeB = createDynamicStore('moduleB');
```

## vue-router 中\$route和\$router的区别？

1. **`$router`**：
   - 是 **路由实例**（如 `VueRouter` 的实例），用来**控制路由跳转**。
   - **核心方法**：`push()`（跳转）、`replace()`（替换当前路由）、`go()`（前进/后退）。
2. **`$route`**：
   - 是 **当前路由信息对象**，用来**获取当前页面的路由参数、路径等**。
   - **核心属性**：`path`（路径）、`params`（动态参数）、`query`（URL 参数）、`meta`（路由元信息）。

## 说说vue-router两种路由模式

1. **Hash模式**
   - **URL格式**：带有 `#`，如 `http://example.com/#/home`。
   - **原理**：通过监听 `hashchange` 事件实现路由切换，变化不会触发服务器请求。
   - **优点**：兼容性好（支持旧浏览器），无需服务器配置。
   - **缺点**：URL 不够美观，对 SEO 不友好（# 后内容不参与服务端路由）。
2. **History模式**
   - **URL格式**：无 `#`，如 `http://example.com/home`。
   - **原理**：基于 HTML5 History API（`pushState`/`replaceState`）管理路由。
   - **优点**：URL 简洁，SEO 友好。
   - **缺点**：需服务器支持（所有路径返回入口文件，如 `index.html`），否则直接访问子路由会 404。

**选择建议**：

- 若无需考虑 SEO 或需兼容旧浏览器，可用 Hash 模式。
- 若追求美观和 SEO，且能配置服务器（如 Nginx/Apache 重定向），则选 History 模式。



## vue-router有哪几种导航钩子?

1. **全局导航钩子**

**作用范围**：所有路由切换都会触发。

- **`beforeEach`**：路由跳转前触发（常用作**登录验证**、权限拦截）。
- **`beforeResolve`**：导航被确认前触发（适合处理异步数据）。
- **`afterEach`**：导航完成后触发（无 `next` 参数，常用于日志统计、页面标题设置）。

2. **路由独享钩子**

**作用范围**：仅在特定路由配置中生效。

- **`beforeEnter`**：进入该路由前触发（类似全局 `beforeEach`，但只针对当前路由）。

3. **组件内钩子**

**作用范围**：在组件内定义，只影响当前组件相关的路由。

- **`beforeRouteEnter`**：进入组件前触发（此时组件实例未创建，无法访问 `this`）。
- **`beforeRouteUpdate`**：当前路由改变但组件被复用时触发（如动态参数 `/user/:id` 变化）。
- **`beforeRouteLeave`**：离开组件前触发（常用于**阻止未保存数据离开**）。

## vue-router 如何实现路由拦截？

Vue Router 通过**导航守卫**实现路由拦截，常用方式：

1. **全局前置守卫**（`router.beforeEach`）：

   ```javascript
   router.beforeEach((to, from, next) => {  
     if (to.meta.requiresAuth && !isAuthenticated) {  
       next('/login'); // 拦截未登录用户  
     } else {  
       next(); // 放行  
     }  
   });  
   ```

2. **路由独享守卫**（`beforeEnter`）：

   ```javascript
   const routes = [  
     {  
       path: '/admin',  
       component: AdminPage,  
       beforeEnter: (to, from, next) => {  
         checkAdminPermission() ? next() : next('/403');  
       }  
     }  
   ];  
   ```

3. **组件内守卫**（如 `beforeRouteEnter`）：

   ```javascript
   export default {  
     beforeRouteEnter(to, from, next) {  
       // 无法访问 this，需通过回调  
       next(vm => {  
         vm.checkData(); // 进入组件后执行  
       });  
     },  
     beforeRouteLeave(to, from, next) {  
       // 离开前确认  
       confirm('确认离开？') ? next() : next(false);  
     }  
   };  
   ```

**核心要点**：

- 通过 `next()` 控制流程，未调用则阻塞导航；
- 结合路由元信息（`meta`）传递权限等参数；
- 异步操作需返回 Promise 或调用 `next`。

## vue-router 实现路由懒加载

**步骤 1：使用动态导入语法定义路由组件**

将路由配置中的静态导入 (`import Component from './Component.vue'`) 改为动态导入 (`() => import('./Component.vue')`)。

**步骤 2：使用 Webpack 魔法注释（可选）**

通过注释 `/* webpackChunkName: "chunk-name" */` 指定生成的代码块名称，便于调试和优化。

```javascript
const routes = [
  { path: '/user', component: () => import(/* webpackChunkName: "user" */ './views/User.vue') },
  { path: '/admin', component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue') }
];
```

## vue-router 有哪些传参方法？

Vue Router 传参方式主要有三种：

1. **动态路由参数（Params）**：

   ```javascript
   // 路由配置  
   { path: '/user/:id', component: User }  
   // 跳转传参  
   router.push('/user/123')  
   // 组件内获取  
   $route.params.id // "123"  
   ```

2. **查询参数（Query）**：

   ```javascript
   // 跳转传参  
   router.push({ path: '/user', query: { name: 'John' } })  
   // URL 效果：/user?name=John  
   // 组件内获取  
   $route.query.name // "John"  
   ```

3. **Props 解耦传参**：

   ```javascript
   // 路由配置  
   { path: '/user/:id', component: User, props: true }  
   // 组件接收  
   export default {  
     props: ['id'] // 直接通过 props 使用  
   }  
   ```

**其他方式**：

- **命名路由 + Params**（需 `name` 配合，`path` 跳转时 Params 失效）；
- **路由元信息（Meta）**：通过 `$route.meta` 传递静态数据。

**区别**：

- Params 需提前声明路径占位符，Query 无需声明；
- Props 方式解耦组件与路由，提升复用性。

## vue-router 如何实现嵌套路由？

Vue Router 通过路由配置中的 `children` 属性然后再父组件模板中放置**`<router-view>`**来实现嵌套路由

## Vue 中的过滤器了解吗？过滤器的应用场景有哪些？

**一、过滤器核心概念**

1. **定义**：86

   - 过滤器（Filter）用于 **格式化文本数据**，在模板中通过 `|` 管道符调用，支持链式处理和多参数传递。

2. **注册方式**：

   - **全局注册**：`Vue.filter('filterName', function(value, ...args) { ... })`
   - **局部注册**：在组件选项中定义 `filters: { filterName(value) { ... } }`

3. **基本用法**：

   ```javascript
   <!-- 单参数 -->  
   <div>{{ message | capitalize }}</div>  
   
   <!-- 多参数 -->  
   <div>{{ price | currency('￥', 2) }}</div>  
   ```

**二、应用场景**

1. **文本格式化**
   - **日期格式化**：时间戳转 `YYYY-MM-DD` 格式。
   - **货币格式化**：数字转带符号的金额（如 `1000 → ¥1,000.00`）。
   - **大小写转换**：如全大写 `text → TEXT`。
2. **数据展示优化**
   - **文本截断**：长文本显示为 `...`（如 `"这是一段很长的文本" → "这是一段..."`）。
   - **敏感信息脱敏**：手机号显示为 `138****5678`。
3. **状态映射**
   - **枚举值转文本**：如 `status: 1 → "已支付"`。
   - **布尔值转语义**：如 `isActive: true → "启用"`。



**注意事项**

Vue 3 移除过滤器，推荐使用 **计算属性** 或 **方法** 替代。



## 了解过 Vue 中的 diff 算法吗？说说看

Vue的diff算法用于高效更新虚拟DOM，减少真实DOM操作，提升性能。其核心思路如下：

**1. 同级比较，不跨层级**

- **只对比同一层节点**，若节点类型不同（如`div`变`p`），直接替换整个节点及子节点，不再深入比较。

**2. 双端对比策略（处理子节点列表）**

- **四指针法**：新旧子节点数组各设两个指针（旧头、旧尾、新头、新尾）。
- **步骤**：
  1. **头头对比**：若相同，节点复用，指针后移。
  2. **尾尾对比**：若相同，节点复用，指针前移。
  3. **旧头 vs 新尾**：若相同，移动旧头节点到末尾，指针后移（旧头）、前移（新尾）。
  4. **旧尾 vs 新头**：若相同，移动旧尾节点到头部，指针前移（旧尾）、后移（新头）。
  5. **均不匹配**：通过`key`查找可复用节点，若找到则移动，否则新建节点。
- **示例**：
  旧列表`[A, B, C, D]` → 新列表`[C, B, A, E]`
  - 通过双端对比，快速定位移动节点，减少DOM操作。

**3. Key的核心作用**

- **唯一标识节点**：帮助Vue精准识别节点是否可复用，避免顺序错误。
- **无Key的隐患**：列表变动时（如插入元素），可能导致错误复用（如输入框内容错位）。

**4. 就地复用原则**

- **相同节点复用DOM**：若新旧节点相同（标签名和key一致），仅更新属性和子节点，避免重建。

**Vue3的优化**

- **静态节点提升**：将不变节点提取为常量，跳过Diff。
- **Block Tree**：将动态节点按结构分组，减少遍历范围。
- **Patch Flag**：标记动态属性（如`class`或`text`），仅对比变化部分。

## Vue 模板是如何被编译成渲染函数的？AST 的作用是什么？

Vue 模板的编译流程分为三步：

1. **解析模板生成 AST（抽象语法树）**：
   - 将 HTML 模板解析为树状结构的 AST，每个节点描述元素、指令、属性等信息（如 `v-if`、`{{}}`）。
2. **优化 AST**：
   - **静态标记**：标记静态节点（无动态绑定），后续更新跳过其 Diff 比对，提升性能。
3. **生成渲染函数**：
   - 遍历 AST，递归生成 `_createElement` 等函数的嵌套调用，最终输出可执行 `render` 函数，用于创建虚拟 DOM。

**AST 的作用**：

- 作为**中间表示层**，将模板结构化，便于优化（如静态标记）和代码生成；
- 解耦解析逻辑与生成逻辑，提高编译器的扩展性和维护性。

**示例**：

```vue
<!-- 模板 -->  
<div v-if="show">{{ msg }}</div>  
```

转换为 AST 后：

```javascript
{  
  type: 1, // 元素节点  
  tag: 'div',  
  attrs: [{ name: 'v-if', value: 'show' }],  
  children: [{ type: 2, expression: '_s(msg)', text: '{{ msg }}' }]  
}  
```

最终生成渲染函数：

```javascript
function render() {  
  return (show) ? _c('div', [_v(_s(msg))]) : _e()  
}  
```

## 说下你的 Vue 项目的目录结构，如果是大型项目你该怎么划分结构和划分组件呢？

**一、基础目录结构（中小型项目）**

```
src/
├── assets/            # 静态资源（图片、字体、样式）
├── components/       # 公共组件（全局复用）
├── views/            # 页面级组件（路由对应页面）
├── router/           # 路由配置（模块化拆分）
├── store/            # 状态管理（Vuex/Pinia，按模块划分）
├── api/              # 接口层（按业务模块拆分接口）
├── utils/            # 工具函数（请求封装、日期处理等）
├── plugins/          # 插件（第三方库集成）
└── App.vue           # 根组件
```

**二、大型项目优化结构**

**1. 模块化拆分（按业务功能）**

```
src/
├── modules/          # 业务模块
│   ├── user/        # 用户模块
│   │   ├── api/     # 用户相关接口
│   │   ├── store/   # 用户状态管理
│   │   ├── components/ # 模块内复用组件
│   │   └── views/   # 用户相关页面
│   ├── product/     # 商品模块（同上）
│   └── order/       # 订单模块
```

**2. 组件分层设计**

| **层级**     | **描述**                           | **示例**                  |
| :----------- | :--------------------------------- | :------------------------ |
| **基础组件** | 与业务无关的原子组件，全局注册     | `Button`、`Input`         |
| **业务组件** | 复用性高的业务模块组件，按模块存放 | `UserCard`、`ProductList` |
| **页面组件** | 路由对应的顶层页面，组合业务组件   | `UserProfile.vue`         |
| **高阶组件** | 逻辑复用组件（如HOC、自定义指令）  | `withLoading`             |

**3. 其他关键优化**

- **路由分层**：动态导入页面组件（懒加载），按模块拆分路由配置。
- **状态管理**：Pinia/Vuex 按模块拆分，避免全局Store臃肿。
- **静态资源**：图片按模块分类（如 `assets/images/user/`），样式按模块拆分（SCSS混入）。
- **代码规范**：ESLint + Prettier 统一风格，Git提交规范（如Commitizen）。

**三、组件划分原则**

1. **单一职责**：每个组件只关注一个功能（如 `SearchBar` 仅处理搜索逻辑）。
2. **合理拆解**：避免“上帝组件”，通过组合拆分（如列表页拆为 `Filter` + `Table` + `Pagination`）。
3. **复用性评估**：
   - **高频复用** → 提升为全局组件（如 `BaseDialog`）。
   - **低频复用** → 保留在模块内（如 `OrderStatusTag`）。
4. **命名规范**：
   - 基础组件加前缀（如 `BaseButton`）。
   - 业务组件体现功能（如 `UserAvatarUploader`）。

## Vue 要做权限管理该怎么做？控制到按钮级别的权限怎么做？

**1. 获取并存储权限数据**

- **用户登录后**，后端返回权限标识列表（如 `['add_user', 'edit_user']`）。
- **存储权限**：将权限列表存入全局状态管理（如 Vuex 或 Pinia），确保响应式更新。

```javascript
// 示例：Vuex Store
state: {
  permissions: []
},
mutations: {
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions;
  }
}
```

**2. 实现权限校验逻辑**

**方案一：自定义指令（推荐）**

- **创建指令 `v-permission`**：自动隐藏无权限的按钮。

```javascript
// 全局指令（Vue 3）
app.directive('permission', {
  mounted(el, binding) {
    const { value: requiredPermission } = binding;
    const hasPermission = store.getters.permissions.includes(requiredPermission);
    if (!hasPermission) el.parentNode?.removeChild(el); // 或 el.style.display = 'none'
  }
});

// 使用
<button v-permission="'delete_user'">删除用户</button>
```

**方案二：封装权限组件**

- **创建组件 `<AuthButton>`**：根据权限控制按钮显示。

```vue
<!-- AuthButton.vue -->
<template>
  <button v-if="hasPermission">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['permission'],
  computed: {
    hasPermission() {
      return this.$store.getters.permissions.includes(this.permission);
    }
  }
};
</script>

// 使用
<AuthButton permission="edit_user">编辑用户</AuthButton>
```

**方案三：条件渲染 + 工具函数**

- **全局方法 `$hasPermission`**：快速校验权限。

```javascript
// 注入全局方法（Vue 3）
app.config.globalProperties.$hasPermission = function (permission) {
  return this.$store.getters.permissions.includes(permission);
};

// 使用
<button v-if="$hasPermission('view_logs')">查看日志</button>
```

**3. 动态响应权限变化**

- **监听权限变更**：当用户切换角色或权限更新时，确保按钮状态同步。

```javascript
// 示例：用户切换角色后更新权限
await store.dispatch('user/refreshPermissions');
```

**4. 高级场景：组合权限与权限组**

- **支持多权限校验**：如“需同时满足A和B权限”或“满足任一即可”。

```vue
// 工具函数扩展
export const hasAllPermissions = (permissions) => 
  permissions.every(p => store.getters.permissions.includes(p));

export const hasAnyPermission = (permissions) => 
  permissions.some(p => store.getters.permissions.includes(p));

// 使用
<button v-if="hasAllPermissions(['add_user', 'edit_user'])">高级操作</button>
```

**总结**

- **核心流程**：登录获取权限 → 存储至全局状态 → 校验权限 → 控制UI渲染。
- **推荐方案**：
  - **简单场景**：使用 `v-if + 全局方法` 快速实现。
  - **复杂场景**：通过**自定义指令**或**权限组件**封装，提升代码复用性。
- **注意事项**：
  - 权限标识需与后端约定一致（如字符串格式）。
  - 避免在前端硬编码权限逻辑，确保灵活性。
  - 权限变更时及时更新状态，保持UI同步。

通过上述方案，可高效实现按钮级权限控制，兼顾代码维护性和用户体验。



## 如何解决 Vue 项目部署后页面出现白屏的问题？

1. **检查静态资源路径**

   - 确认 `vue.config.js` 中的 `publicPath` 是否与服务器部署路径匹配（如子目录部署需设置为 `'/子目录/'`）。

2. **路由模式配置**

   - **History模式**：确保服务器（如Nginx/Apache）配置了重定向规则，所有非静态资源请求返回 `index.html`。

     ```nginx
     # Nginx配置示例
     location / {
       try_files $uri $uri/ /index.html;
     }
     ```

   - **Hash模式**：改用 `hash` 模式（无需服务端配置），避免路由刷新404。

3. **排查资源加载失败**

   - 打开浏览器控制台（F12），查看 `Network` 面板中 JS/CSS 文件是否加载成功（404/403错误）。
   - 若路径错误，调整构建配置或服务器静态资源目录映射。

4. **处理代码执行错误**

   - 检查控制台是否有报错（如未捕获的Promise异常、依赖缺失）。

   - 开启生产环境 Source Map（临时调试）：

     ```javascript
     // vue.config.js
     module.exports = {
       productionSourceMap: true // 构建后生成Source Map
     };
     ```

   - 修复代码逻辑后，关闭 Source Map 并重新构建。

5. **优化首屏加载速度**

   - **代码分割**：使用动态导入（`() => import()`）实现路由懒加载。
   - **预加载关键资源**：通过 `<link rel="preload">` 提前加载核心文件。
   - **启用Gzip/Brotli压缩**：减少资源体积（需服务器支持）。

6. **浏览器兼容性处理**

   - 在 `babel.config.js` 中配置 `@babel/preset-env`，添加 `core-js` polyfill：

     ```javascript
     presets: [
       ['@vue/cli-plugin-babel/preset', { 
         useBuiltIns: 'usage', 
         corejs: 3 
       }]
     ]
     ```

7. **服务器配置优化**

   - **缓存策略**：为静态资源设置长期缓存（`Cache-Control: max-age=31536000`）。
   - **MIME类型检查**：确保服务器正确返回 `.js`、`.css` 文件的MIME类型。

8. **容错处理**

   - 全局错误捕获：在 `main.js` 中监听 Vue 全局错误。

     ```javascript
     Vue.config.errorHandler = (err) => {
       // 上报错误至监控系统
       console.error('全局错误:', err);
     };
     ```

**示例解决方案（Nginx + History模式）：**

1. 构建时设置 `publicPath` 为 `/`：

   ```javascript
   // vue.config.js
   module.exports = {
     publicPath: '/'
   };
   ```

2. 配置Nginx重定向规则：

   ```nginx
   server {
     location / {
       root   /usr/share/nginx/html;
       index  index.html;
       try_files $uri $uri/ /index.html; # 关键配置
     }
   }
   ```

3. 检查控制台错误并修复代码逻辑，确保无执行异常。

## Vue 中的 h 函数有什么用？

**1. `h` 函数概述**

在 Vue 中，`h` 函数是一个用于创建虚拟 DOM 节点的工厂函数。它的全称是 `createElement`，在 Vue 3 中，它通常被直接引用为 `h`。

**2. 基本用法**

`h` 函数的基本语法如下：

```javascript
1h(tag, props, children)
```

- **tag**: 字符串或组件对象，表示要创建的 HTML 标签或组件。
- **props**: 可选的属性对象，包含要传递给组件或元素的属性。
- **children**: 可选的子节点，可以是字符串、虚拟 DOM 节点数组或嵌套的 `h` 函数调用。

**3. 创建虚拟 DOM 示例**

下面是一个简单的使用 `h` 函数创建虚拟 DOM 的示例：

```javascript
import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'MyComponent',
  render() {
    return h('div', { class: 'my-class' }, [
      h('h1', 'Hello World'),
      h('p', 'This is a paragraph.'),
    ]);
  },
});
```

在这个例子中，`h` 函数用于创建一个 `div` 元素，包含一个 `h1` 和一个 `p` 标签。返回的结果是一个虚拟 DOM 树。

**4. 动态组件示例**

使用 `h` 函数可以方便地创建动态组件。例如：

```javascript
import { defineComponent, h, ref } from 'vue';

const MyButton = { template: '<button>Button</button>' };
const MyLink = { template: '<a href="#">Link</a>' };

export default defineComponent({
  name: 'DynamicComponent',
  setup() {
    const isButton = ref(true);
    
    return { isButton };
  },
  render() {
    const component = this.isButton ? MyButton : MyLink;
    return h(component);
  },
});
```

在这个例子中，根据 `isButton` 的值动态决定渲染哪个组件。

**5. 与 JSX 结合**

在 Vue 3 中，可以使用 JSX 来书写组件，`h` 函数在这里起到关键作用。示例如下：

```javascript
/** @jsx h */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyComponent',
  render() {
    return (
      <div class="my-class">
        <h1>Hello World</h1>
        <p>This is a paragraph.</p>
      </div>
    );
  },
});
```

在 JSX 中，每个标签会被转换为 `h` 函数的调用。

**6. 性能优化**

`h` 函数通过创建虚拟 DOM，Vue 可以在数据变化时比较新旧虚拟 DOM，计算出最小的 DOM 更新，优化性能。这种方式避免了频繁的实际 DOM 操作，从而提升了应用的性能。

## Vue3 性能提升体现在哪些方面？

**1. 响应式系统优化（Proxy 替代 defineProperty）**

- **更高效**：Proxy 直接代理对象，无需递归遍历属性，初始化速度和内存占用更优。
- **动态监听**：支持监听对象新增/删除属性、数组索引修改等，无需 `Vue.set`/`Vue.delete`。
- **惰性监听**：嵌套对象按需代理，减少不必要的深层响应式转换。

**2. 编译阶段优化**

- **静态提升（Static Hoisting）**：
  将模板中**静态节点**（无动态绑定的元素）提取为常量，避免重复创建虚拟 DOM。
- **Patch Flag 标记动态内容**：
  虚拟 DOM 节点添加标记（如 `1` 表示文本动态），Diff 时仅比对标记部分，跳过静态内容。
- **Block Tree 优化**：
  将动态节点按结构分组为“块”，减少递归遍历层级，提升 Diff 效率。

**3. Tree-Shaking 支持**

- **按需编译**：通过模块化设计（如 `createApp` 替代 `new Vue`），未使用的 API（如 `v-model` 修饰符）不会打包进生产环境。
- **体积减少**：核心库体积从 Vue 2 的 ~20KB 压缩后降至 ~10KB，加载更快。

**4. 虚拟 DOM 与 Diff 算法优化**

- **更精准的 Diff**：结合 Patch Flag 和 Block Tree，减少无效比对，如静态节点直接跳过。
- **事件侦听缓存**：同一元素的动态事件（如 `@click`）仅绑定一次，避免重复创建。

**5. 组合式 API（Composition API）的间接优化**

- **逻辑复用**：通过自定义 Hook 减少重复代码，避免 Options API 的碎片化，间接提升代码执行效率。
- **更细粒度控制**：手动管理响应式依赖（如 `ref`/`reactive`），减少不必要的依赖追踪。

**6. 服务端渲染（SSR）优化**

- **静态内容直出**：静态节点在服务端直接渲染为字符串，客户端跳过 Hydration 过程。
- **流式渲染**：支持分块传输 HTML，提升首屏加载速度。

**7. 其他细节优化**

- **Fragment 支持**：组件支持多根节点，减少无意义包裹元素（如 `<div>`）。
- **Teleport 组件**：跨 DOM 层级渲染（如弹窗），避免冗余的父级样式影响。

## Vue3 里为什么要用 Proxy API 替代 defineProperty API ？

1. **更全面的数据劫持能力**
   - **Object.defineProperty**：
     - 只能劫持对象的**已有属性**，需遍历每个属性递归设置。
     - 无法检测**新增/删除属性**（需借助 `Vue.set`/`Vue.delete`）。
     - 对**数组索引修改**（如 `arr[0] = 1`）和**长度变化**（如 `arr.length = 0`）无法监听，需重写数组方法（如 `push`、`pop`）。
   - **Proxy**：
     - 直接代理**整个对象**，自动拦截所有属性的增删改查（包括动态新增属性）。
     - 天然支持**数组索引修改**和**原生数组方法**，无需额外处理。
2. **性能优化**
   - **初始化性能**：Proxy 无需递归遍历对象属性，直接代理整个对象，初始化速度更快（尤其对复杂对象）。
   - **惰性代理**：Proxy 仅在访问嵌套对象时进行代理，减少不必要的响应式转换开销。
3. **功能扩展性**
   - **支持更多操作**：Proxy 可拦截 `has`（`in` 操作符）、`deleteProperty`（删除属性）、`ownKeys`（遍历属性）等操作，覆盖更全面的响应式场景。
   - **兼容新数据结构**：如 `Map`、`Set`、`WeakMap` 等集合类型，Proxy 可代理其原生方法（如 `map.set()`），而 `defineProperty` 无法实现。
4. **代码简化与维护性**
   - **统一拦截逻辑**：Proxy 通过 `get`/`set` 等统一拦截器处理所有操作，代码更简洁。
   - **避免 Vue 2 的补丁式实现**：如数组方法重写、`$set`/`$delete` 等 API 的冗余逻辑。
5. **浏览器兼容性取舍**
   - Proxy 是 ES6 特性，不支持 IE11 等旧浏览器，但 Vue 3 明确放弃对 IE 的支持，得以拥抱更现代化的特性。

## Vue3 所采用的 Composition Api 与 Vue2 使用的 Options Api 有什么不同？

1. **代码组织方式**
   - **Options API**：按功能类型划分代码（如 `data`、`methods`、`computed`），逻辑分散在不同选项中，复杂组件中代码阅读困难。
   - **Composition API**：按逻辑功能组织代码（如用户管理、数据请求），通过 `setup` 函数聚合相关逻辑，提升内聚性。
2. **逻辑复用能力**
   - **Options API**：通过 Mixins 复用逻辑，但易引发命名冲突、数据来源不透明。
   - **Composition API**：通过自定义 Hook（如 `useFetch`）复用逻辑，基于函数组合，依赖清晰且无副作用冲突。
3. **类型系统支持**
   - **Options API**：`this` 上下文导致 TypeScript 类型推断困难（如访问 `methods` 中的函数）。
   - **Composition API**：基于函数和变量，天然支持 TypeScript 类型推导，代码更健壮。
4. **响应式管理**
   - **Options API**：依赖 `data` 和 `computed` 选项隐式管理响应式，灵活性较低。
   - **Composition API**：显式使用 `ref`/`reactive` 创建响应式数据，结合 `watch`/`computed` 动态控制，逻辑更透明。
5. **生命周期控制**
   - **Options API**：生命周期钩子（如 `mounted`）分散在代码中。
   - **Composition API**：通过 `onMounted` 等函数式钩子集中管理，支持逻辑内聚。

## 说说 Vue3 中 Treeshaking 特性？

Vue3 的 Tree-shaking 通过模块化设计，将功能拆分为独立函数或组件。打包时，**没用到的代码（如未引入的API、组件）会被自动移除**，减小体积。比如没用到 `Transition` 组件，最终打包就不会包含它。

Vue3 通过以下设计实现高效的 Tree Shaking，显著减少打包体积：

1. **模块化 API 设计**
   - **按需导出**：Vue 3 将核心功能拆分为独立的 ES 模块（如 `ref`、`reactive`、`watch`），开发者通过具名导入（`import { ref } from 'vue'`）仅引入所需功能。
   - **全局 API 改造**：移除 Vue 2 的全局实例方法（如 `Vue.nextTick`），改为模块导出（`import { nextTick } from 'vue'`），未使用的 API 自动被剔除。
2. **功能解耦**
   - **内置组件/指令按需加载**：如 `<Transition>`、`v-model` 等仅在引入时包含在构建产物中。
   - **可选功能分离**：如响应式系统、编译器、服务端渲染等拆分为独立模块，未启用的功能（如未使用服务端渲染）不参与打包。
3. **ES 模块构建**
   - **ESM 格式支持**：Vue 3 源码默认以 ES 模块发布，构建工具（如 Webpack、Rollup）能静态分析依赖关系，精准删除未引用代码。
   - **副作用标记优化**：通过 `package.json` 的 `sideEffects` 字段标记无副作用的文件，避免误删必要代码。

**效果**：

- **体积优化**：Vue 3 核心库体积从 Vue 2 的 ~20KB 压缩后降至 ~10KB。
- **灵活适配场景**：开发者根据项目需求精准引入功能，避免冗余代码（如移动端项目移除服务端渲染相关代码）。

## 怎么理解 Vue3 提供的 markRaw ？

在 Vue 3 中，`markRaw` 是一个用于标记对象的 API，主要用于优化性能和防止 Vue 的响应式系统对某些对象的处理。以下是对 `markRaw` 的详细理解：

**1. 功能**

- **标记为非响应式**：`markRaw` 可以将一个对象标记为非响应式对象。使用该 API 后，Vue 不会将这个对象转换为响应式对象，任何对其属性的修改都不会触发 Vue 的响应式系统。

**2. 用法场景**

- **性能优化**：在某些情况下，某些对象（如大型库的实例、第三方插件等）不需要响应式特性，因为它们的属性变化不需要 Vue 进行监测。这时可以使用 `markRaw` 来优化性能。
- **避免不必要的代理**：使用 `markRaw` 可以避免 Vue 对某些对象的代理开销，尤其是当这些对象不会被 Vue 观察或更新时。

**3. 例子**

```javascript
import { markRaw } from 'vue';

// 一个非响应式的对象
const nonReactiveObj = markRaw({ someProperty: 'value' });

// 使用这个对象
console.log(nonReactiveObj.someProperty); // 'value'

// 修改属性不会触发 Vue 的响应式系统
nonReactiveObj.someProperty = 'new value';
```

**4. 结合其他 API 使用**

- `markRaw` 通常与 Vue 的响应式 API（如 `reactive`、`ref`）结合使用，用于明确哪些对象需要被监测，哪些对象不需要。

## Vue3 中 ref 和 reactive 的区别及使用场景？

| **选择依据**   | **`ref`**                          | **`reactive`**       |
| :------------- | :--------------------------------- | :------------------- |
| **数据类型**   | 基本类型、需要整体替换的对象       | 复杂对象、嵌套数据   |
| **开发习惯**   | 偏好显式 `.value` 操作             | 偏好直接属性访问     |
| **灵活性**     | 更高（支持替换对象、兼容基本类型） | 稍低（依赖对象结构） |
| **TypeScript** | 类型推断更简单                     | 需明确接口类型       |

**推荐原则**：

- 优先用 `ref` 处理基本类型和需要灵活替换的场景；
- 用 `reactive` 管理复杂对象，尤其是需要直接操作属性的场景；
- 组合式函数优先返回 `ref`，方便调用方解构使用。

## Vue 中如何使用动态组件？

在Vue中可以通过`<component :is="组件变量">`实现动态组件。比如用`v-bind:is`绑定一个组件名或导入的组件对象变量，Vue会根据变量值动态渲染对应组件。配合`keep-alive`包裹可以缓存组件状态，避免频繁销毁创建。

## 谈谈你对 Vue 中 transition 的理解？

Vue 的 `<transition>` 组件用于**元素/组件的过渡动画**，核心机制：

1. **触发条件**：
   - 元素通过 `v-if`、`v-show` 或动态组件切换显示状态时触发。
2. **实现方式**：
   - **CSS 过渡**：自动应用 `v-enter`（进入开始）、`v-enter-active`（进入过程）、`v-leave-to`（离开结束）等类名，通过 CSS 定义动画（如 `transition` 属性）。
   - **JS 钩子**：通过事件（如 `@before-enter`、`@enter`）结合第三方库（如 GSAP）实现复杂动画。
3. **过渡模式**：
   - `mode="out-in"`：先执行离开动画，再执行进入动画，避免布局冲突。
4. **列表过渡**：
   - 使用 `<transition-group>` 实现动态列表项（如 `v-for`）的排序动画，需为每项设置唯一 `key`。

**示例**：

```vue
<transition name="fade" mode="out-in">  
  <div v-if="show" key="content">内容</div>  
</transition>  

<style>  
.fade-enter-active, .fade-leave-active {  
  transition: opacity 0.5s;  
}  
.fade-enter, .fade-leave-to {  
  opacity: 0;  
}  vue
</style>  
```

**优势**：简化动画逻辑，提升交互体验，支持 CSS/JS 灵活控制。

## assets 和 static 的区别？

`assets` 目录，在编译过程中会被 webpack 处理，当做模块依赖，只支持相对路径的形式。一般放置可能会变动的文件。

`static` 目录，一般存放第三方文件，不会被 webpack 解析，会直接被复制到最终的打包目录（默认是 `dist/static` ）下，必须使用绝对路径引用，这些文件是不会变动的。

## Vue 初始化页面闪动问题

使用vue开发时，在vue初始化之前，由于 `div` 是不归 `vue` 管的，所以我们写的代码在还没有解析的情况下会容易出现花屏现象，看到类似于 `{{message}}` 的字样，虽然一般情况下这个时间很短暂，但是我们还是有必要让解决这个问题的。首先：在css里加上 `[v-cloak] { display: none; }` 。如果没有彻底解决问题，则在根元素加上 style="display: none;" :style="{display:  block }"

## Vue3 中的 watch 和 watchEffect 有什么区别？

**1. 依赖收集方式**

- **`watch`**：需**显式声明**监听的数据源（如 `() => state.count`），仅响应这些源的变化。
- **`watchEffect`**：**自动收集**回调中**所有响应式依赖**，无需手动指定。

**2. 执行时机**

- **`watch`**：默认**惰性执行**（依赖变化时才触发），可配置 `immediate: true` 立即执行。
- **`watchEffect`**：**立即执行一次**（初始化时自动运行），随后依赖变化时触发。

**3. 旧值获取**

- **`watch`**：可获取旧值和新值（`(newVal, oldVal) => {}`）。
- **`watchEffect`**：**无法直接获取旧值**（仅能访问当前值）。

**4. 监听多源**

- **`watch`**：支持同时监听多个数据源（数组形式）：

  ```javascript
  watch([source1, source2], ([new1, new2]) => {})  
  ```

- **`watchEffect`**：隐式依赖，无法显式声明多源。

**5. 配置选项**

- **`watch`**：可配置 `deep`（深度监听）、`flush`（触发时机）等选项。
- **`watchEffect`**：无 `deep` 配置（自动跟踪嵌套属性），但可设置 `flush`。

**使用场景对比**

| **场景**         | **推荐 API**  | **示例**                       |
| :--------------- | :------------ | :----------------------------- |
| 需要旧值对比     | `watch`       | 记录表单字段变化前后的值       |
| 监听特定数据源   | `watch`       | 路由参数变化时加载数据         |
| 自动追踪多个依赖 | `watchEffect` | 根据筛选条件自动查询数据       |
| 立即执行副作用   | `watchEffect` | 初始化时加载数据并监听依赖变化 |

**总结**

- **`watch`**：精准控制监听目标，适合需要旧值或条件触发的场景。
- **`watchEffect`**：简化依赖管理，适合自动追踪和立即执行的副作用。

## Vue 函数式组件的特点是什么？与普通组件的区别？

Vue 函数式组件是**无状态、无实例**的组件，特点及区别如下：

1. **特点**：
   - **性能高**：无响应式数据与实例化开销，仅依赖 `props` 渲染；
   - **纯渲染**：通过 `render` 函数或模板返回 VNode，无生命周期钩子；
   - **访问方式**：通过 `context` 参数获取 `props`、`slots` 等数据。
2. **与普通组件区别**：
   - **状态管理**：普通组件可维护自身状态（`data`），函数式组件无状态；
   - **实例化**：普通组件有 `this` 实例，函数式组件无实例，无法访问 `ref`；
   - **使用场景**：函数式组件适合纯展示型内容（如静态列表项），普通组件适合交互复杂、需状态管理的场景。

**示例（Vue 3）**：

```vue
const FunctionalComp = (props, context) => {  
  return h('div', context.attrs, props.text);  
};  
```

**总结**：函数式组件轻量高效，但功能受限，需权衡场景使用。

## 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？

在 Vue 的 `v-for` 中，默认情况下为每个元素单独绑定事件（如 `@click`）会创建多个监听器，对长列表可能有性能开销。是否使用事件代理需权衡场景：

1. **直接绑定（无需代理）**：
   - **优点**：逻辑直观，可通过参数直接传递作用域数据（如 `@click="handleClick(item)"`）。
   - **缺点**：列表项多时内存占用高（每个元素独立监听），动态增删项可能导致监听器冗余。
2. **事件代理（推荐长列表）**：
   - **实现方式**：在父元素绑定一个监听器，通过事件对象 `event.target` 定位触发元素，结合 `data-*` 属性传递标识。
   - **优点**：内存优化（单监听器），适合动态列表（避免频繁绑定/解绑）。
   - **缺点**：需手动处理事件目标过滤，无法直接利用 Vue 的响应式数据。

**示例**

```vue
<template>  
  <ul @click="handleProxyClick">  
    <li v-for="item in list" :key="item.id" :data-id="item.id">{{ item.name }}</li>  
  </ul>  
</template>  

<script>  
export default {  
  methods: {  
    handleProxyClick(event) {  
      const id = event.target.dataset.id;  
      if (id) {  
        const item = this.list.find(item => item.id === id);  
        // 处理逻辑  
      }  
    }  
  }  
};  
</script>  
```

## 为什么需要 toRef 和 toRefs？在解构 reactive 对象时它们的作用是什么？

`oRef` 和 `toRefs` 用于在解构 Vue 3 的 `reactive` 对象时**保持响应式**。

- **直接解构的问题**：
  若直接解构 `reactive` 对象，得到的属性是**普通值**，失去响应性。
- **`toRef` 的作用**：
  将 `reactive` 对象的**单个属性**转为 `ref`，保持与源属性的响应式连接。
- **`toRefs` 的作用**：
  将整个 `reactive` 对象的所有属性转为 `ref` 的普通对象，便于解构后仍保留响应性。

## 如何编写一个自定义 Hook ？需要注意哪些问题？

**如何编写**

1. **命名规范**：以 `use` 开头（如 `useFetch`），遵循 React Hooks 规则；
2. **提取逻辑**：将组件中的状态、副作用等封装为函数，返回需暴露的数据/方法；
3. **组合原生 Hooks**：灵活使用 `useState`、`useEffect` 等构建功能；
4. **参数与返回值**：通过入参定制逻辑，返回结构化的数据供组件使用。

**示例**：

```javascript
// 自定义 Hook：获取鼠标位置  
function useMousePosition() {  
  const [position, setPosition] = useState({ x: 0, y: 0 });  
  useEffect(() => {  
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });  
    window.addEventListener('mousemove', handleMove);  
    return () => window.removeEventListener('mousemove', handleMove);  
  }, []);  
  return position; // 返回坐标数据  
}  

// 组件中使用  
function App() {  
  const { x, y } = useMousePosition();  
  return <div>鼠标位置：{x}, {y}</div>;  
}  
```

**注意事项**

- **响应式数据**：返回 `ref`/`reactive`，确保组件中响应性生效；
- **副作用清理**：在 `onUnmounted` 中移除事件监听、定时器等，避免内存泄漏；
- **参数设计**：支持灵活配置（如 `useFetch(url, options)`），通过参数控制逻辑；
- **单一职责**：一个 Hook 解决一个问题（如 `useLocalStorage` 只处理本地存储）；
- **依赖管理**：若依赖其他 Hook 或上下文，显式声明而非隐式耦合。

## render 函数了解吗？

Vue 的 `render` 函数通过 **JavaScript 编程式生成虚拟 DOM**，替代模板语法，适用于复杂动态渲染场景。

**核心要点**：

1. **基本用法**：

   ```javascript
   render(h) {  
     return h('div', { class: 'title' }, this.message);  
   }  
   // 或组合式 API 中使用  
   import { h } from 'vue';  
   setup() {  
     return () => h('div', 'Hello');  
   }  
   ```

2. **优势**：

   - **灵活控制**：可结合 JS 逻辑动态生成节点（如递归、复杂条件分支）；
   - **性能优化**：手动控制渲染逻辑，避免冗余渲染；
   - **JSX 支持**：通过插件编译为 `h` 函数调用，提升可读性。

3. **适用场景**：

   - 高阶组件（HOC）封装；
   - 动态组件（如根据配置渲染不同类型组件）；
   - 需深度操作 VNode 的场景（如自定义渲染器）。

**与模板对比**：

- 模板更直观，适合简单/静态结构；
- Render 函数适合逻辑复杂或需编程式生成的场景。

## 请叙述 Vue 中使用了哪些设计模式？

Vue 中主要应用了以下设计模式：

1. **观察者模式（Observer Pattern）**：
   - **响应式系统**：通过 `Object.defineProperty`（Vue 2）或 `Proxy`（Vue 3）劫持数据变化，通知依赖（Watcher）更新视图。
2. **发布-订阅模式（Pub-Sub Pattern）**：
   - **事件机制**：父子组件通过 `$emit` 和 `$on` 通信，解耦事件触发与监听逻辑。
3. **组合模式（Composite Pattern）**：
   - **组件树结构**：组件可嵌套组合成树形结构，统一管理父子组件的行为（如插槽、作用域插槽）。
4. **代理模式（Proxy Pattern）**：
   - **数据劫持**：Vue 3 使用 `Proxy` 代理对象，拦截数据操作以实现响应式更新。
5. **单例模式（Singleton Pattern）**：
   - **Vuex Store**：全局唯一状态管理实例，确保数据源统一。
6. **工厂模式（Factory Pattern）**：
   - **组件动态创建**：如异步组件通过工厂函数延迟加载，`<component :is="type">` 动态渲染组件。
7. **策略模式（Strategy Pattern）**：
   - **指令系统**：不同指令（如 `v-if`、`v-for`）对应不同的 DOM 操作策略，动态选择处理逻辑。

**其他模式**：

- **装饰器模式**（通过 `@Component` 装饰类组件）；
- **模板方法模式**（生命周期钩子定义通用流程，用户覆盖具体步骤）。

## Vue 项目开发中有些什么性能优化手段?

1. **代码层面**：
   - **懒加载路由**：`component: () => import('...')` 分割代码；
   - **图片/资源优化**：压缩图片、使用 WebP 格式、CDN 加速；
   - **避免 `v-if` 与 `v-for` 混用**：优先用 `computed` 过滤数据后渲染；
   - **合理使用 `key`**：列表渲染时唯一 `key` 提升 Diff 效率；
   - **冻结大对象**：`Object.freeze()` 避免非必要响应式转换。
2. **组件优化**：
   - **函数式组件**：无状态组件用 `functional: true` 减少开销；
   - **异步组件**：动态加载非首屏组件（`defineAsyncComponent`）；
   - **按需引入**：如 ECharts/Element 组件库避免全量导入。
3. **运行时优化**：
   - **防抖/节流**：高频事件（`resize`、`input`）限制触发频率；
   - **虚拟滚动**：长列表用 `vue-virtual-scroller` 减少 DOM 节点；
   - **`v-memo`**（Vue 3.2+）：缓存静态子树，跳过重复渲染。
4. **构建优化**：
   - **压缩混淆**：Webpack/Vite 开启 `Terser` 压缩代码；
   - **Tree-shaking**：移除未使用代码；
   - **预渲染/SSG**：静态页面生成（如 VitePress、Nuxt）。

## Vue 中的 v-cloak 有什么作用？

`v-cloak` 用于**解决 Vue 实例初始化前模板表达式（如 `{{ data }}`）短暂暴露的问题**。

```vue
<div id="app" v-cloak>  
  {{ message }}  
</div>  
```



## 你知道 Vue SSR 吗？

Vue SSR（服务端渲染）指在**服务端生成完整 HTML** 返回给客户端，解决 SPA 首屏白屏、SEO 差等问题。

**核心作用**：

- **首屏直出**：加速首屏加载，提升用户体验；
- **SEO 友好**：爬虫直接抓取服务端渲染的完整内容；
- **同构开发**：同一套代码在服务端和客户端执行（如 Nuxt.js 框架）。

**实现原理**：

- 服务端通过 `vue-server-renderer` 将 Vue 实例渲染为 HTML 字符串；
- 客户端激活（Hydration）使静态 HTML 变为可交互的 SPA。

**适用场景**：

- 需 SEO 的页面（如官网、博客）；
- 弱网络环境下需快速呈现内容。

**权衡点**：

- **优点**：优化首屏性能、支持 SEO；
- **缺点**：增加服务器负载、开发复杂度较高。

## 你认为组件封装的一些基本准则是什么？

组件封装的一些基本准则包括：

1. **单一职责原则**：一个组件应该具有单一的功能，并且只负责完成该功能，避免组件过于庞大和复杂。
2. **高内聚低耦**合：组件内部的各个部分之间应该紧密相关，组件与其他组件之间应该尽量解耦，减少对外部的依赖。
3. **易用性**：组件应该易于使用，提供清晰的接口和文档，使用户能够方便地使用组件。
4. **可扩展性**：组件应该具有良好的扩展性，能够方便地添加新的功能或进行修改，同时不影响已有的功能。
5. **可重用性**：组件应该是可重用的，能够在多个项目中使用，减少重复开发的工作量。
6. **高效性**：组件应该具有高性能和低资源消耗的特点，不会成为整个系统的性能瓶颈。
7. **安全性**：组件应该具有安全性，能够防止恶意使用或攻击。
8. **可测试性**：组件应该容易进行单元测试和集成测试，以保证组件的质量和稳定性。

## Vue 的响应式数据流驱动页面和传统的事件绑定命令式驱动页面，分别有什么优缺点？

**1. Vue 响应式数据流驱动页面**

#**优点**

1. **声明式编程**：
   - **自动更新**：数据变化自动驱动视图更新，无需手动操作 DOM。
   - **简化代码**：减少了手动操作 DOM 的代码量，代码更简洁和易读。
2. **数据驱动**：
   - **一致性**：数据和视图的一致性更高，减少了因数据和视图不同步而导致的错误。
   - **调试方便**：可以通过 Vue 的开发者工具轻松查看组件的状态和数据流动。
3. **可维护性**：
   - **高效开发**：组件化的设计和响应式的数据流使得代码的维护和扩展变得更容易。
   - **更少的副作用**：减少了手动操作 DOM 带来的副作用问题。
4. **响应式**：
   - **自动化**：视图的更新是自动的，减少了程序员的手动干预。
   - **高效性能**：Vue 使用虚拟 DOM 和高效的 diff 算法来最小化实际 DOM 操作，提高性能。

#**缺点**

1. **学习曲线**：
   - **新概念**：需要学习和理解 Vue 的响应式系统和组件化编程。
   - **复杂性**：在复杂的应用中，响应式数据流可能需要更复杂的状态管理方案，如 Vuex。
2. **性能开销**：
   - **响应式系统**：虽然 Vue 对性能进行了优化，但响应式系统的性能开销仍然存在，尤其是在处理大量数据时。

**2. 传统的事件绑定命令式驱动页面**

#**优点**

1. **直接控制**：
   - **手动操作**：程序员可以直接操作 DOM，获得对页面的精细控制。
   - **灵活性**：可以根据需要编写复杂的交互逻辑和事件处理代码。
2. **熟悉性**：
   - **传统方法**：许多开发者对传统的事件绑定和 DOM 操作方法比较熟悉，学习曲线相对较低。
3. **性能优化**：
   - **细粒度控制**：能够对每个 DOM 操作进行手动优化，可能在某些情况下能获得更好的性能。

#**缺点**

1. **代码复杂性**：
   - **重复代码**：需要手动管理 DOM 和事件，导致代码重复和复杂。
   - **难以维护**：随着应用的复杂性增加，代码维护变得更加困难。
2. **数据和视图不同步**：
   - **手动更新**：需要手动更新视图和数据，容易出现数据和视图不一致的问题。
   - **副作用**：手动操作 DOM 可能引入副作用和意外的行为。
3. **错误处理**：
   - **调试困难**：调试数据和视图的不一致性问题可能更加困难。



## vue3 的响应式库是独立出来的，如果单独使用是什么样的效果？

在 Vue 3 中，响应式系统被抽离到一个独立的库中，名为 `@vue/reactivity`。这个库可以单独使用来管理响应式状态，类似于 Vue 的响应式系统，但不依赖于 Vue 组件或 Vue 实例。

**独立使用效果**

1. **创建响应式对象**：

   使用 `reactivity` 库可以创建响应式对象，类似于 Vue 的 `ref` 和 `reactive`。

   ```javascript
   import { reactive, effect } from '@vue/reactivity';
   
   const state = reactive({
     count: 0
   });
   
   effect(() => {
     console.log(`Count is: ${state.count}`);
   });
   
   state.count++;
   // 输出: Count is: 1
   ```

2. **使用 `ref`**：

   对于基本类型的数据，可以使用 `ref` 来创建响应式数据。

   ```javascript
   import { ref } from '@vue/reactivity';
   
   const count = ref(0);
   
   effect(() => {
     console.log(`Count is: ${count.value}`);
   });
   
   count.value++;
   // 输出: Count is: 1
   ```

3. **依赖追踪和计算属性**：

   使用 `effect` 可以创建响应式的副作用，类似于 Vue 组件中的计算属性。

   ```javascript
   import { reactive, effect, computed } from '@vue/reactivity';
   
   const state = reactive({
     count: 0
   });
   
   const doubled = computed(() => state.count * 2);
   
   effect(() => {
     console.log(`Doubled count is: ${doubled.value}`);
   });
   
   state.count++;
   // 输出: Doubled count is: 2
   ```

## Vue 是如何识别和解析指令的？

Vue 在处理模板中的指令（如 `v-if`、`v-for`、`v-bind` 等）时，主要依赖于编译阶段和虚拟 DOM 机制来识别和解析指令。以下是 Vue 识别和解析指令的主要步骤：

**1. 编译阶段**

在 Vue 中，模板会被编译成 JavaScript 渲染函数。编译过程包括以下几个步骤：

**1.1 模板解析**

Vue 使用 `compiler`（编译器）将模板字符串转换成抽象语法树（AST）。在这个阶段，模板中的所有指令、元素、插值等都会被解析成 AST 节点。

```javascript
const ast = parse(template); // 将模板转换为 AST
```

**1.2 指令处理**

在解析过程中，Vue 会检查 AST 节点的属性，识别指令并将它们转换成指令对象。每个指令对象都包含处理该指令的逻辑，比如 `v-if` 指令会被处理成一个条件判断节点。

```javascript
const directives = {
  'v-if': processIf,
  'v-for': processFor,
  'v-bind': processBind,
  'v-model': processModel,
  // 其他指令
};

function processIf(node, dir) {
  // 处理 v-if 指令的逻辑
}

function processFor(node, dir) {
  // 处理 v-for 指令的逻辑
}
```

**1.3 生成渲染函数**

经过处理的 AST 会被转换成渲染函数，这个函数用于创建虚拟 DOM。渲染函数中会包含指令的逻辑，例如，`v-if` 的条件判断逻辑会被编译到渲染函数中。

```javascript
const renderFunction = generateRenderFunction(ast); // 生成渲染函数
```

**2. 运行时阶段**

在运行时，Vue 使用渲染函数来生成虚拟 DOM。每当数据发生变化时，Vue 会重新渲染组件，并根据指令的逻辑来更新视图。

**2.1 指令更新**

Vue 在虚拟 DOM 的 `patch` 阶段，会根据指令的逻辑来更新实际的 DOM。例如，对于 `v-if` 指令，Vue 会根据条件判断是否在 DOM 中插入或删除节点。

```javascript
function patch(oldVNode, newVNode) {
  // 更新虚拟 DOM
  // 根据指令逻辑更新实际 DOM
}
```

**2.2 生命周期钩子**

某些指令可能需要在组件的生命周期钩子中进行处理。例如，`v-show` 指令会根据绑定的条件来控制元素的 `display` 属性，这会在组件的生命周期中进行设置。

```javascript
复制function updateDisplay(el, value) {
  el.style.display = value ? '' : 'none';
}
```

## Vue3 相比较于 Vue2，在编译阶段有哪些改进？

以下是一些主要的改进：

1. **虚拟 DOM 的优化**

   - **Proxy 代理**：Vue 3 使用 `Proxy` 对象来实现响应式系统，而 Vue 2 使用 `Object.defineProperty`。`Proxy` 提供了更灵活和高效的方式来追踪对象的变化。

   - **静态节点提升**：Vue 3 在编译阶段对静态节点进行了优化，将其提升到静态节点，以减少重复渲染。


2. **编译器的改进**

   - **更小的编译器体积**：Vue 3 的编译器经过了重构，减少了体积，并且更快。

   - **更高效的编译策略**：使用了更高效的编译策略和优化手段，生成的渲染函数代码更简洁。


3. **模板编译**

   - **新的编译器**：Vue 3 引入了新的模板编译器，与 Vue 2 相比，编译后的代码更加高效，生成的虚拟 DOM 更简洁。

   - **编译时优化**：Vue 3 的编译器能够识别和优化模板中的常见模式，比如静态节点提升，减少不必要的重新渲染。


4. **响应式系统的改进**

   - **基于 Proxy 的响应式系统**：Vue 3 的响应式系统基于 `Proxy` 实现，比 Vue 2 使用的 `Object.defineProperty` 更高效，支持更广泛的对象操作，并且不需要 `Object.defineProperty` 的限制。

   - **更快的依赖追踪**：`Proxy` 能够更高效地追踪依赖关系，减少了性能开销。


5. **编译时类型检查**
   - **TypeScript 支持**：Vue 3 从设计之初就考虑了对 TypeScript 的支持，编译器和核心库的类型定义更加完善，提升了开发时的类型检查和 IDE 支持。


6. **组件的改进**

   - **更强大的组件编译**：Vue 3 对组件的编译做了大量的优化，使得组件在运行时更高效。

   - **编译时的插件支持**：Vue 3 支持更多的编译时插件，能够在构建过程中处理组件的特定需求。


7. **编译时常量折叠**
   - **常量折叠**：编译器会对模板中的常量进行折叠优化，减少运行时的计算开销。


8. **更简洁的代码生成**
   - **优化的代码生成**：Vue 3 编译器生成的代码比 Vue 2 更简洁，减少了冗余的代码，提高了执行效率。



## vue-cli 有哪些功能？

Vue CLI 是 Vue.js 官方提供的一个工具，用于快速构建和管理 Vue.js 项目。它提供了一系列功能，使得开发者能够高效地创建、配置和管理 Vue 应用。

以下是 Vue CLI 的主要功能和所做的事情：

**1. 项目初始化**

- **快速创建项目**：使用命令行工具快速生成新的 Vue 项目结构，包括基础的配置文件和示例代码。

  ```shell
  vue create my-project
  ```

- **选择预设**：在创建项目时，可以选择预定义的配置预设，或者根据项目需求自定义选择功能（如 Vue Router、Vuex、TypeScript 等）。

**2. 配置管理**

- **Webpack 配置**：Vue CLI 内置了对 Webpack 的配置，开发者可以在不深入理解 Webpack 的情况下，使用预配置的功能。
- **可扩展性**：通过 `vue.config.js` 文件，允许开发者自定义和扩展默认配置。

**3. 开发环境**

- **开发服务器**：提供内置的开发服务器，支持热重载（Hot Module Replacement），使得开发过程更加高效和流畅。

  ```shell
  npm run serve
  ```

**4. 构建和打包**

- **生产构建**：支持一键构建项目并输出到 `dist` 文件夹，适合部署到生产环境。

  ```shell
  npm run build
  ```

- **优化功能**：内置了多种优化功能，如代码压缩、Tree Shaking、懒加载等，提高最终构建产物的性能。

**5. 插件系统**

- **插件生态**：支持官方和社区开发的插件，可以在项目中方便地安装和使用，如 Vue Router、Vuex、PWA 支持等。

  ```shell
  vue add router
  ```

- **自定义插件**：开发者可以创建自定义插件，扩展 Vue CLI 的功能。

**6. 脚手架功能**

- **生成组件**：提供命令生成 Vue 组件、页面、路由等代码片段，减少重复工作。

  ```shell
  vue generate component MyComponent
  ```

**7. 统一的工具链**

- **支持多种语言和工具**：支持 TypeScript、Sass、Less、Pug 等多种语言和工具，简化开发流程。

**8. 代码质量管理**

- **Linting**：集成 ESLint，可以在开发过程中实时检查代码质量。
- **测试框架**：支持集成测试框架，如 Jest 和 Mocha，以提高代码的可靠性。

**9. 文档生成**

- **自动生成文档**：支持生成 API 文档和组件文档，便于开发和维护。

**10. Vue UI**

- **图形化界面**：提供 Vue UI 工具，允许开发者通过图形界面管理项目配置、插件、依赖等，无需手动编辑配置文件。

  ```shell
  vue ui
  ```

## Vue3 为什么不需要时间分片？

Vue 3 不需要时间分片（time slicing）主要是因为它的核心渲染机制和性能优化策略已经足够高效，能够在大多数情况下提供流畅的用户体验。以下是详细的原因：

1. **编译器优化**

Vue 3 引入了一个全新的编译器，能够生成更高效的渲染函数。这个编译器在编译过程中进行了一系列优化，例如：

- **静态提升**：将不变的节点提升为常量，只在初次渲染时计算一次。
- **预字符串化**：将静态内容直接转化为字符串，减少了运行时的开销。
- **缓存事件处理程序**：避免了不必要的重新绑定。

这些优化措施大大减少了 Vue 3 在更新 DOM 时的计算量，使得渲染过程更加高效。

2. **响应式系统的改进**

Vue 3 使用了基于代理的响应式系统，替代了 Vue 2 中基于 `Object.defineProperty` 的实现。新的响应式系统更加高效，具备以下优点：

- **精细的依赖追踪**：只追踪实际使用的属性，避免了不必要的依赖收集。
- **懒惰计算**：仅在需要时才计算依赖，减少了计算量。

这些改进使得 Vue 3 能够更快速地响应数据变化，从而减少了渲染开销。

3. **虚拟 DOM 和 Diff 算法的优化**

Vue 3 对虚拟 DOM 及其 diff 算法进行了优化，使得差异计算更加高效：

- **静态标记**：编译期间标记静态节点，跳过不变的部分。
- **块级优化**：将动态节点分块，只对发生变化的块进行更新。

这些优化措施减少了 DOM 更新的频率和范围，提高了整体渲染性能。

4. **单次异步队列**

Vue 3 的更新机制基于单次异步队列（single asynchronous queue），它确保在同一事件循环中只进行一次批量更新。这种方式减少了不必要的重复计算和 DOM 操作，使得更新过程更加高效。

5. **自动批处理**

Vue 3 实现了自动批处理机制，在同一个事件循环中对多次数据更新进行合并，从而减少了渲染次数。这种机制在避免频繁重绘的同时，保证了界面的流畅性。

6. **现代浏览器的性能**

现代浏览器的性能已经得到了极大的提升，尤其是在处理 JavaScript 和 DOM 操作方面。Vue 3 的优化能够充分利用这些性能改进，从而在绝大多数情况下不需要时间分片。

总结

Vue 3 通过编译器优化、响应式系统改进、虚拟 DOM 和 Diff 算法优化、单次异步队列、自动批处理等技术手段，大幅提升了渲染效率和性能。再加上现代浏览器的性能提升，使得 Vue 3 能够在大多数情况下提供流畅的用户体验，而无需借助时间分片等复杂的技术。

## 怎么在 Vue 中定义全局方法？

在 Vue.js 中定义全局方法，可以通过多种方式实现，包括直接在 Vue 的原型对象上添加方法、使用 Vue 3 的全局 API (`app.config.globalProperties`)、以及通过混入 (mixin) 等方法。

以下是几种常见的方法：

**方法一：在 Vue 2 中通过 Vue.prototype 定义全局方法**

```javascript
// main.js
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// 定义全局方法
Vue.prototype.$myGlobalMethod = function () {
  console.log('这是一个全局方法');
};

new Vue({
  render: h => h(App),
}).$mount('#app');
```

**在组件中使用**

```vue
<template>
  <div>
    <button @click="useGlobalMethod">调用全局方法</button>
  </div>
</template>

<script>
export default {
  methods: {
    useGlobalMethod() {
      this.$myGlobalMethod();
    }
  }
}
</script>
```

**方法二：在 Vue 3 中通过 `app.config.globalProperties` 定义全局方法**

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 定义全局方法
app.config.globalProperties.$myGlobalMethod = function () {
  console.log('这是一个全局方法');
};

app.mount('#app');
```

**在组件中使用**

```vue
<template>
  <div>
    <button @click="useGlobalMethod">调用全局方法</button>
  </div>
</template>

<script>
export default {
  methods: {
    useGlobalMethod() {
      this.$myGlobalMethod();
    }
  }
}
</script>
```

**方法三：使用混入（Mixin）**

你可以创建一个混入对象并将其全局注册，从而在所有组件中使用这个混入对象定义的方法。

```javascript
// globalMixin.js
export const globalMixin = {
  methods: {
    $myGlobalMethod() {
      console.log('这是一个全局方法');
    }
  }
};
// main.js
import Vue from 'vue';
import App from './App.vue';
import { globalMixin } from './globalMixin';

Vue.config.productionTip = false;

// 全局混入
Vue.mixin(globalMixin);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

**在组件中使用**

```vue
<template>
  <div>
    <button @click="useGlobalMethod">调用全局方法</button>
  </div>
</template>

<script>
export default {
  methods: {
    useGlobalMethod() {
      this.$myGlobalMethod();
    }
  }
}
</script>
```

**方法四：创建插件**

你可以创建一个 Vue 插件来封装全局方法，并在 `main.js` 中安装插件。

```javascript
// myPlugin.js
export default {
  install(Vue) {
    Vue.prototype.$myGlobalMethod = function () {
      console.log('这是一个全局方法');
    }
  }
};
// main.js
import Vue from 'vue';
import App from './App.vue';
import myPlugin from './myPlugin';

Vue.config.productionTip = false;

// 安装插件
Vue.use(myPlugin);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

**在组件中使用**

```vue
<template>
  <div>
    <button @click="useGlobalMethod">调用全局方法</button>
  </div>
</template>

<script>
export default {
  methods: {
    useGlobalMethod() {
      this.$myGlobalMethod();
    }
  }
}
</script>
```

## Vue 中父组件怎么监听到子组件的生命周期？

在 Vue.js 中，父组件不能直接监听子组件的生命周期钩子。然而，有几种方法可以实现父组件对子组件生命周期的间接监听或执行特定操作。

**方法一：通过事件通信**

子组件在生命周期钩子中触发自定义事件，父组件监听这些事件。

1. **子组件**

```vue
<template>
  <div>子组件</div>
</template>

<script>
export default {
  name: 'ChildComponent',
  mounted() {
    this.$emit('childMounted');
  }
}
</script>
```

2. **父组件**

```vue
<template>
  <div>
    <ChildComponent @childMounted="handleChildMounted" />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  methods: {
    handleChildMounted() {
      console.log('子组件已挂载');
    }
  }
}
</script>
```

**方法二：使用 `ref`**

父组件通过 `ref` 直接访问子组件实例，并在父组件的生命周期钩子中调用子组件的方法。

1. **子组件**

```vue
<template>
  <div>子组件</div>
</template>

<script>
export default {
  name: 'ChildComponent',
  mounted() {
    console.log('子组件已挂载');
  }
}
</script>
```

2. **父组件**

```vue
<template>
  <div>
    <ChildComponent ref="child" />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  mounted() {
    this.$refs.child.$on('hook:mounted', this.handleChildMounted);
  },
  methods: {
    handleChildMounted() {
      console.log('通过 ref 获取子组件的挂载');
    }
  }
}
</script>
```

**方法三：使用 `provide` 和 `inject`**

通过 `provide` 和 `inject` 实现跨层级组件通信。

1. **子组件**

```vue
<template>
  <div>子组件</div>
</template>

<script>
export default {
  name: 'ChildComponent',
  inject: ['notifyParent'],
  mounted() {
    this.notifyParent('mounted');
  }
}
</script>
```

2. **父组件**

```vue
<template>
  <div>
    <ChildComponent />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  provide() {
    return {
      notifyParent: this.handleNotification
    }
  },
  methods: {
    handleNotification(hook) {
      if (hook === 'mounted') {
        console.log('子组件已挂载');
      }
    }
  }
}
</script>
```



## Vue 组件里写的原生 addEventListeners 监听事件，要手动去销毁吗？为什么？

在 Vue 组件中，如果你使用 `addEventListener` 添加了原生的 DOM 事件监听器，通常需要在组件销毁时手动移除这些监听器。

原因如下：

1. **内存泄漏**： 如果不手动移除事件监听器，监听器会继续存在于内存中，即使对应的 DOM 元素已经被移除。这会导致内存泄漏，因为监听器持有对 DOM 元素的引用，导致垃圾回收机制无法回收这些元素。
2. **意外行为**： 如果监听器没有被移除，在组件销毁后这些监听器可能会继续响应事件，这可能导致应用程序的意外行为或错误。
3. **性能问题**： 随着时间的推移，未移除的事件监听器会堆积，导致性能下降，尤其是在频繁创建和销毁组件的情况下。

在 Vue 组件中，可以利用生命周期钩子来添加和移除事件监听器：

```
<template>
  <div ref="myElement">点击我</div>
</template>

<script>
export default {
  mounted() {
    // 在组件挂载时添加事件监听器
    this.$refs.myElement.addEventListener('click', this.handleClick);
  },
  beforeDestroy() {
    // 在组件销毁前移除事件监听器
    this.$refs.myElement.removeEventListener('click', this.handleClick);
  },
  methods: {
    handleClick(event) {
      console.log('元素被点击了');
    }
  }
};
</script>
```

## Vue中，created 和 mounted 两个钩子之间调用时间差值受什么影响？

`created` 和 `mounted` 这两个生命周期钩子，分别在实例创建和挂载的不同阶段被调用。

它们之间的时间差值主要受以下几个因素的影响：

1. **模板编译时间**：
   - 当实例被创建时，Vue 会编译模板（或将模板转换为渲染函数），这个过程在 `created` 钩子之前完成。如果模板非常复杂或包含大量指令、组件，这个过程会更耗时，从而延长 `created` 和 `mounted` 之间的时间差。
2. **虚拟 DOM 渲染时间**：
   - 在 `mounted` 钩子调用之前，Vue 会将虚拟 DOM 渲染为实际的 DOM 元素。渲染复杂的组件树或处理大量数据绑定会增加这段时间。
3. **异步操作**：
   - 如果在 `created` 钩子中发起了异步操作（如 API 请求），这些操作本身不会直接影响 `created` 和 `mounted` 的时间差，但如果这些操作涉及数据更新，可能会间接增加挂载时间。
4. **浏览器性能**：
   - 浏览器的性能和设备的硬件配置也会影响模板编译和 DOM 渲染的速度，从而影响这两个钩子之间的时间差。
5. **其他钩子执行时间**：
   - 在 `beforeCreate`、`created`、`beforeMount` 等钩子中执行的代码也会影响到 `mounted` 钩子的触发时间。如果这些钩子中有大量计算或耗时操作，也会增加时间差。

总结起来，`created` 和 `mounted` 之间的时间差主要受到模板编译、虚拟 DOM 渲染的复杂性、异步操作、浏览器性能及其他生命周期钩子中执行代码的影响。在编写 Vue 应用时，优化这些方面可以减少 `created` 和 `mounted` 之间的时间差，提高应用性能。

## 为什么 React 需要 fiber 架构，而 Vue 却不需要？

React引入Fiber架构的主要原因是为了实现更好的异步渲染和更高效的任务调度。Fiber架构使得React能够更细粒度地控制和中断渲染过程，以便更好地响应用户交互、实现懒加载等功能。Vue在设计上采用了不同的策略，因此并不需要类似于Fiber的架构。

以下是一些原因解释为什么React选择了Fiber架构，而Vue没有类似的架构：

1. **异步渲染和任务优先级：** React的Fiber架构使得实现异步渲染和任务优先级变得更加容易。这对于复杂的用户界面和大规模应用中的性能优化非常重要。React可以通过中断和恢复渲染过程，根据任务的优先级调度渲染工作，从而更好地响应用户输入和满足实时性要求。
2. **更好的中断和恢复机制：** Fiber架构提供了一种更灵活的中断和恢复机制，允许React在渲染过程中暂停、中断，然后根据优先级恢复。这使得React能够更好地处理复杂的渲染逻辑，并在需要时放弃低优先级的工作。
3. **增量更新：** Fiber允许React实现增量更新，即只更新变化的部分而不必重新渲染整个组件树。这对于提高渲染性能和减少不必要的工作非常有帮助。

Vue在设计上采用了一种不同的响应式系统和渲染机制，不需要像React那样进行复杂的中断和任务调度。Vue的设计目标可能更注重简洁性和开发体验，而React的目标之一是提供更灵活和强大的性能优化工具。每个框架在设计上都有权衡和取舍，选择适合其目标和使用场景的策略。



## 说说你对渐进式框架的理解

渐进式的含义：没有多做职责之外的事，只做了自己该做的事，没有做不该做的事，仅此而已。

更直白一点就是，用你想用或者能用的功能特性，你不想用的部分功能可以先不用。VUE不强求你一次性接受并使用它的全部功能特性。

比如以下两种场景，Vue 发挥了很大的优点：

- 场景一：公司刚开始一个项目，技术人员对Vue的掌握也不足够。那么我们就不能使用VUE了么？当然不是，如果你只是使用VUE做些基础操作，如：页面渲染、表单处理提交功能，那还是非常简单的，成熟技术人员上手也就一两天。完全可以用它去代替jquery。并不需要你去引入其他复杂特性功能。
- 场景二：我们的项目规模逐渐的变大了，我们可能会逐渐用到前端路由、状态集中管理、并最终实现一个高度工程化的前端项目。这些功能特性我们可以逐步引入，当然不用也可以。

Vue 的适用面很广，你可以用它代替老项目中的JQuery。也可以在新项目启动初期，有限的使用VUE的功能特性，从而降低上手的成本。



## Vue 的祖孙组件的通信方案有哪些？

在 Vue 中，祖孙组件之间的通信可以通过以下几种方式来实现：

1. **Props / $emit**:
   - 祖组件通过 `props` 将数据传递给子组件，并且子组件通过 `$emit` 触发事件将数据传递回祖组件。
   - 这是一种常见的父子组件通信方式，通过属性(props)和自定义事件($emit)进行数据交流。
2. **Provide / Inject**:
   - 使用 `provide` 在祖组件中提供数据，然后使用 `inject` 在孙组件中注入这些数据。
   - 这种方式允许祖组件向下级组件共享数据，无需显式地将数据逐层传递。但要注意潜在的耦合性。
3. **Event Bus**:
   - 创建一个全局的事件总线(Event Bus)，用于在祖孙组件之间发送和接收事件。
   - 通过在事件总线上注册事件监听器和触发器，组件可以相互通信，传递数据和触发特定操作。
4. **Vuex**:
   - 使用 Vuex 进行状态管理，可以在祖孙组件之间共享和更新数据。
   - Vuex 是 Vue 的官方状态管理库，提供了集中式存储管理和响应式更新，使得不同组件之间的通信更加简单和可预测。

这些通信方式各有特点，可以根据具体情况选择合适的方式来实现祖孙组件之间的通信。对于简单的父子组件通信，Props / $emit 是常用的方式；而对于更复杂的应用程序状态管理和跨层级通信，使用 Vuex 或 Event Bus 可能更适合。

## 如何打破 scope 对样式隔离的限制？

在 Vue 中，作用域样式（Scoped Styles）的目的是将样式限制在单个组件的作用域中，以确保样式不会被其他组件影响。然而，有时候你可能需要打破作用域限制，让样式能够在组件外部生效。以下是几种打破作用域限制的方式：

1. **使用 /deep/ 或 ::v-deep**：
   - 在样式中使用 `/deep/` 或 `::v-deep`（Vue 2.x 中的别名）选择器可以覆盖作用域限制。
   - 这样可以使得样式选择器的范围扩大到所有子组件，甚至是整个应用程序的 DOM 树。
   - 例如，使用 `.container /deep/ .child` 可以选择 `.child` 类名的元素，即使 `.child` 是在另一个组件中定义的。
2. **使用全局样式**：
   - 如果你希望一些样式在多个组件之间共享，并且不受作用域限制，可以使用全局样式。
   - 在 Vue 单文件组件中，可以在 `<style>` 标签外部或使用 `@import` 引入全局样式文件，这样样式将不受作用域限制。
3. **使用类名继承**：
   - 如果你希望某些样式继承自父组件或特定组件的样式，可以使用类名继承。
   - 在子组件的 `<style>` 标签中使用 `@extend` 来继承父组件或其他组件的样式，这样可以打破作用域限制。

需要注意的是，打破作用域限制可能会导致样式冲突和不可预测的结果。建议尽量遵循作用域限制，仅在必要时才使用上述方法来打破限制。同时，合理地组织组件结构和样式层级，可以更好地管理样式和避免冲突。



## Scoped Styles 为什么可以实现样式隔离？

在 Vue 中，作用域样式（Scoped Styles）是通过以下原理实现的：

1. **唯一选择器**：
   - 当 Vue 编译单文件组件时，在样式中使用 `scoped` 特性或 `module` 特性时，Vue 会为每个样式选择器生成一个唯一的属性选择器。
   - 这里的唯一选择器是类似于 `[data-v-xxxxxxx]` 的属性选择器，其中 `xxxxxxx` 是一个唯一的标识符。
2. **编译时转换**：
   - Vue 在编译过程中会解析单文件组件的模板，并对样式进行处理。
   - 对于具有 `scoped` 特性的样式，Vue 会将选择器转换为带有唯一属性选择器的形式，例如 `.class` 会被转换为 `.class[data-v-xxxxxxx]`。
   - 对于具有 `module` 特性的样式，Vue 会为每个选择器生成一个唯一的类名，并将类名与元素关联起来。
3. **渲染时应用**：
   - 在组件渲染过程中，Vue 会为组件的根元素添加一个属性值为唯一标识符的属性，例如 `data-v-xxxxxxx`。
   - 当组件渲染完成后，样式选择器中的唯一属性选择器或唯一类名将与组件根元素的属性匹配，从而实现样式的隔离。
   - 这样，只有具有相同属性值的元素才会应用相应的样式，避免了样式冲突和泄漏。

通过以上原理，Vue 实现了作用域样式的隔离。每个组件的样式都被限制在自己的作用域内，不会影响其他组件或全局样式。这种方式实现了组件级别的样式隔离，使得组件可以更好地封装和重用，同时减少了样式冲突的可能性。

## 说说 Vue 页面渲染流程



## computed 怎么实现的缓存

## vue-loader 做了哪些事情？

## vuex 中的辅助函数怎么使用？
