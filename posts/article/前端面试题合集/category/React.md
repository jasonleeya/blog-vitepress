---
category: React
order: 5
---
<script setup>
import NavHead from "../components/NavHead.vue";
</script>
<nav-head link="/posts/article/前端面试题合集/read.html">
</nav-head>

# React



## 什么是 React？

React是一个简单的javascript UI库，用于构建高效、快速的用户界面。

它是一个轻量级库，因此很受欢迎。它遵循组件设计模式、声明式编程范式和函数式编程概念，以使前端应用程序更高效。

它使用虚拟DOM来有效地操作DOM。

它遵循从高阶组件到低阶组件的单向数据流。

## React 和 Vue 在技术层面有哪些区别？

React 和 Vue 是当前比较流行的前端框架，它们在技术层面有以下区别：

- 组件化方式不同：React 是基于组件实现的，组件包含了状态和行为，所有组件共享一个状态树。Vue 也是基于组件实现的，但是每个组件都有自己的状态，并且可以很容易地将数据和行为绑定在一起。
- 数据驱动方式不同：React 使用单向数据流来管理数据，即从父组件到子组件的传递，所以 React 中组件之间的数据交互相对更加复杂。Vue 则使用双向数据绑定来管理数据，使得组件之间的数据交互更加简洁。
- 模板语法不同：React 使用 JSX 语法，将 HTML 和 JavaScript 结合在一起，使得编写组件更加直观和灵活。Vue 则使用模板语法，并且支持模板内的表达式和指令，使得编写组件具有更高的可读性和可维护性。
- 生命周期不同：React 组件的生命周期分为三个阶段：初始化、更新和卸载。Vue 组件的生命周期分为八个阶段：创建、挂载、更新、销毁等。
- 状态管理方式不同：React 使用 Redux 或者 MobX 来管理应用程序的状态。Vue 则提供了自己的状态管理库 Vuex，可以更方便地管理组件之间的共享状态。
- 性能优化方式不同：React 使用虚拟 DOM 技术来实现高效的渲染性能，可以减少每次渲染时需要操作真实 DOM 的次数。Vue 则使用模板编译和响应式系统来实现高效的渲染性能，并且还提供了一些优化技术，例如懒加载和缓存等。

开发人员可以根据项目需求和个人喜好选择合适的框架。

## 什么是虚拟 DOM？

虚拟DOM（VDOM）它是真实DOM的内存表示,一种编程概念，一种模式。它会和真实的DOM同步，比如通过ReactDOM这种库，这个同步的过程叫做调和(reconcilation)。

虚拟DOM更多是一种模式，不是一种特定的技术。

**react 的虚拟dom是怎么实现的？**

React 的虚拟 DOM 是一种在内存中表示 DOM 结构的机制，用于优化实际 DOM 的操作。它通过减少直接 DOM 操作的次数和复杂度，提高了性能。以下是虚拟 DOM 的实现原理和关键步骤：

**1. 虚拟 DOM 的基本概念****

- **虚拟 DOM**：是一个轻量级的 JavaScript 对象，表示实际 DOM 树的结构和内容。虚拟 DOM 的主要目的是提供一种高效的方式来更新和渲染 UI。
- **React 组件**：组件渲染时生成虚拟 DOM，React 根据这些虚拟 DOM 计算实际 DOM 的更新。

2. **虚拟 DOM 的创建**

- **组件渲染**：每当组件的状态或属性发生变化时，React 会调用组件的 render 方法，生成新的虚拟 DOM 树。

  ```javascript
  function MyComponent() {
    return <div>Hello, World!</div>;
  }
  ```

  上述代码生成的虚拟 DOM 结构可能是`{ type: 'div', props: { children: 'Hello, World!' } }`

3. **虚拟 DOM 的比较（Diffing）**

- **Diff 算法**：React 使用高效的 diff 算法来比较新旧虚拟 DOM。Diff 算法的主要目的是找出两个虚拟 DOM 树之间的差异，并生成最小的变更集，以便更新实际 DOM。
- 主要策略：
  - **分层比较**：React 先比较两个虚拟 DOM 树的根节点，然后递归比较子节点。只有发生实际变化的部分才会被更新。
  - **节点类型优化**：React 假设同一层级的节点不会改变类型，从而快速跳过不同类型节点的比较。
  - **Key 属性优化**：使用 `key` 属性来标识列表中的元素，帮助 React 识别和重用元素，提高列表渲染的效率。

4. **更新实际 DOM**

- **计算差异**：React 根据 diff 算法计算出需要对实际 DOM 进行的最小变更。例如，添加、删除或修改 DOM 元素。

- **批量更新**：React 将这些变更批量应用到实际 DOM 上，从而减少重绘和重排的次数。

  ```javascript
  // 实际 DOM 更新
  ReactDOM.render(<MyComponent />, rootElement);
  ```

5. **优化虚拟 DOM 的更新**

- **函数式更新**：使用函数式组件和 Hooks（如 `useState`, `useEffect`）可以更精确地控制组件的更新，避免不必要的虚拟 DOM 生成和比较。

- **Memoization**：使用`React.memo`和`useMemo`

  等工具来缓存组件和计算结果，减少虚拟 DOM 的不必要更新。

  ```javascript
  const MemoizedComponent = React.memo(function MyComponent(props) {
    // 组件实现
  });
  ```

6. **示例代码**

- **创建虚拟 DOM**：

  ```javascript
  const virtualDOM = {
    type: 'div',
    props: {
      children: [
        { type: 'h1', props: { children: 'Hello, World!' } }
      ]
    }
  };
  ```

- **更新实际 DOM**：

  ```javascript
  // 渲染组件，生成虚拟 DOM
  ReactDOM.render(<MyComponent />, document.getElementById('root'));
  ```

**总结**

1. **创建虚拟 DOM**：每次组件渲染时，React 生成新的虚拟 DOM 树。
2. **比较虚拟 DOM**：使用 diff 算法找出新旧虚拟 DOM 的差异。
3. **更新实际 DOM**：将计算出的差异批量应用到实际 DOM 上，提高性能。

虚拟 DOM 的实现使得 React 在更新 UI 时更加高效，通过减少直接 DOM 操作和优化更新过程，提升了应用的性能和响应速度。



## React 中的 VM 一定会提高性能吗？

不一定，因为 VM 只是通过 diff 算法避免了一些不需要变更的 DOM 操作，最终还是要操作 DOM 的，并且 diff 的过程也是有成本的。

对于某些场景，比如都是需要变更 DOM 的操作，因为 VM 还会有额外的 diff 算法的成本在里面，所以 VM 的方式并不会提高性能，甚至比原生 DOM 要慢。

但是正如尤大大说的，这是一个性能 vs 可维护性的取舍。

框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。

没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。

针对任何一个 benchmark，都可以写出比任何框架更快的手动优化，但是那有什么意义呢？在构建一个实际应用的时候，出于可维护性的考虑，不可能在每一个地方都去做手动优化。

## React 中的类组件和函数组件之间有什么区别？

**类组件（Class components）**

- 无论是使用函数或是类来声明一个组件，它决不能修改它自己的 props。
  - 所有 React 组件都必须是纯函数，并禁止修改其自身 props。
- React是单项数据流，父组件改变了属性，那么子组件视图会更新。
  - 属性 props是外界传递过来的，状态 state是组件本身的，状态可以在组件中任意修改
  - 组件的属性和状态改变都会更新视图。

```javascript
class Welcome extends React.Component {
  render() {
    return (
      <h1>Welcome { this.props.name }</h1>
    );
  }
}
ReactDOM.render(<Welcome name='react' />, document.getElementById('root'));
```

**函数组件（functional component）**

函数组件接收一个单一的 props 对象并返回了一个React元素

```javascript
function Welcome (props) {
  return <h1>Welcome {props.name}</h1>
}
ReactDOM.render(<Welcome name='react' />, document.getElementById('root'));
```

**区别**

- 语法上

两者最明显的不同就是在语法上，函数组件是一个纯函数，它接收一个props对象返回一个react元素。而类组件需要去继承React.Component并且创建render函数返回react元素，这将会要更多的代码，虽然它们实现的效果相同。

- 状态管理

因为函数组件是一个纯函数，你不能在组件中使用setState()，这也是为什么把函数组件称作为无状态组件。

如果你需要在你的组件中使用state，你可以选择创建一个类组件或者将state提升到你的父组件中，然后通过props对象传递到子组件。

- 生命周期钩子

你不能在函数组件中使用生命周期钩子，原因和不能使用state一样，所有的生命周期钩子都来自于继承的React.Component中。

因此，如果你想使用生命周期钩子，那么需要使用类组件。

**注意**：在react16.8版本中添加了hooks，使得我们可以在函数组件中使用useState钩子去管理state，使用useEffect钩子去使用生命周期函数。因此，2、3两点就不是它们的区别点。从这个改版中我们可以看出作者更加看重函数组件，而且react团队曾提及到在react之后的版本将会对函数组件的性能方面进行提升。

- 调用方式

如果SayHi是一个函数，React需要调用它：

```javascript
// 你的代码 
function SayHi() { 
    return <p>Hello, React</p> 
} 
// React内部 
const result = SayHi(props) // » <p>Hello, React</p>
```

如果SayHi是一个类，React需要先用new操作符将其实例化，然后调用刚才生成实例的render方法：

```javascript
// 你的代码 
class SayHi extends React.Component { 
    render() { 
        return <p>Hello, React</p> 
    } 
} 
// React内部 
const instance = new SayHi(props) // » SayHi {} 
const result = instance.render() // » <p>Hello, React</p>
```

可想而知，函数组件重新渲染将重新调用组件方法返回新的react元素，类组件重新渲染将new一个新的组件实例，然后调用render类方法返回react元素，这也说明为什么类组件中this是可变的。

## state 和 props有什么区别？

**一、state**

一个组件的显示形态可以由数据状态和外部参数所决定，而数据状态就是`state`，一般在 `constructor` 中初始化

当需要修改里面的值的状态需要通过调用`setState`来改变，从而达到更新组件内部数据的作用，并且重新调用组件`render`方法，如下面的例子：

```javascript
class Button extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
        };
    }

    updateCount() {
        this.setState((prevState, props) => {
            return { count: prevState.count + 1 }
        });
    }

    render() {
        return (<button
                    onClick={() => this.updateCount()}
                    >
                Clicked {this.state.count} times
            </button>);
    }
}
```

`setState`还可以接受第二个参数，它是一个函数，会在`setState`调用完成并且组件开始重新渲染时被调用，可以用来监听渲染是否完成

```javascript
this.setState({
  name:'JS每日一题'
},()=>console.log('setState finished'))
```

**二、props**

`React`的核心思想就是组件化思想，页面会被切分成一些独立的、可复用的组件

组件从概念上看就是一个函数，可以接受一个参数作为输入值，这个参数就是`props`，所以可以把`props`理解为从外部传入组件内部的数据

`react`具有单向数据流的特性，所以他的主要作用是从父组件向子组件中传递数据

`props`除了可以传字符串，数字，还可以传递对象，数组甚至是回调函数，如下：

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

const element = <Welcome name="Sara" onNameChanged={this.handleName} />;
```

上述`name`属性与`onNameChanged`方法都能在子组件的`props`变量中访问

在子组件中，`props`在内部不可变的，如果想要改变它看，只能通过外部组件传入新的`props`来重新渲染子组件，否则子组件的`props`和展示形式不会改变

**三、区别**

相同点：

- 两者都是 JavaScript 对象
- 两者都是用于保存信息
- props 和 state 都能触发渲染更新

区别：

- props 是外部传递给组件的，而 state 是在组件内被组件自己管理的，一般在 constructor 中初始化
- props 在组件内部是不可修改的，但 state 在组件内部可以进行修改
- state 是多变的、可以修改

## 说说对 React 中Element、Component、Node、Instance 四个概念的理解

在 React 中，Element、Component、Node、Instance 是四个重要的概念。

1. Element：Element 是 React 应用中最基本的构建块，它是一个普通的 JavaScript 对象，用来描述 UI 的一部分。Element 可以是原生的 DOM 元素，也可以是自定义的组件。它的作用是用来向 React 描述开发者想在页面上 render 什么内容。Element 是不可变的，一旦创建就不能被修改。
2. Component：Component 是 React 中的一个概念，它是由 Element 构成的，可以是函数组件或者类组件。Component 可以接收输入的数据（props），并返回一个描述 UI 的 Element。Component 可以被复用，可以在应用中多次使用。分为 `Class Component` 以及 `Function Component`。
3. Node：Node 是指 React 应用中的一个虚拟节点，它是 Element 的实例。Node 包含了 Element 的所有信息，包括类型、属性、子节点等。Node 是 React 内部用来描述 UI 的一种数据结构，它可以被渲染成真实的 DOM 元素。
4. Instance：Instance 是指 React 应用中的一个组件实例，它是 Component 的实例。每个 Component 在应用中都会有一个对应的 Instance，它包含了 Component 的所有状态和方法。Instance 可以被用来操作组件的状态，以及处理用户的交互事件等。

## 怎么在代码中判断一个 React 组件是 class component 还是 function component？

可以使用JavaScript的`typeof`运算符和React的`Component`类来进行判断。

下面是一个示例的判断方法：

```javascript
function isClassComponent(component) {
  return (
    typeof component === 'function' &&
    !!component.prototype.isReactComponent
  );
}

// 示例用法
const MyComponent = () => <div>Hello, I'm a function component!</div>;
const MyClassComponent = class extends React.Component {
  render() {
    return <div>Hello, I'm a class component!</div>;
  }
};

console.log(isClassComponent(MyComponent)); // false
console.log(isClassComponent(MyClassComponent)); // true
```

上面定义了一个名为`isClassComponent`的函数，它接受一个组件作为参数。函数内部使用`typeof`运算符来判断该组件是否为函数类型，并通过检查`component.prototype.isReactComponent`属性来确定是否为Class组件。

## 什么是高阶组件？

**高阶组件**（Higher-Order Component, HOC）是 React 中的一种设计模式，用于增强或修改组件的行为。它是一个接受组件作为参数并返回一个新组件的函数。高阶组件本质上是一个函数，它用于复用组件逻辑和功能，避免在多个组件中重复代码。

**高阶组件的特点**

1. **函数式组件增强**：
   - **接受组件**：高阶组件（HOC）是一个函数，接受一个组件作为参数。
   - **返回新组件**：它返回一个新的组件，这个新的组件通常会封装和增强原始组件的功能。
2. **逻辑复用**：
   - **复用代码**：通过高阶组件，可以在多个组件中复用相同的逻辑和功能，而不需要重复代码。这有助于提高代码的可维护性和一致性。
3. **组件装饰**：
   - **功能增强**：高阶组件可以为原始组件添加额外的功能或数据，例如提供额外的 props、处理权限控制、数据获取等。

**使用示例**

以下是一个简单的高阶组件的示例：

```javascript
import React from 'react';

// 高阶组件的定义
const withUserData = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null,
      };
    }

    componentDidMount() {
      // 模拟数据获取
      setTimeout(() => {
        this.setState({ user: { name: 'John Doe', age: 30 } });
      }, 1000);
    }

    render() {
      // 将状态和 props 传递给原始组件
      return <WrappedComponent user={this.state.user} {...this.props} />;
    }
  };
};

// 使用高阶组件
const UserProfile = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
    </div>
  );
};

export default withUserData(UserProfile);
```

**高阶组件的常见用途**

1. **权限控制**：
   - **示例**：可以创建一个高阶组件来检查用户权限，并根据权限控制组件的渲染或访问。
2. **数据获取**：
   - **示例**：高阶组件可以在挂载时获取数据，并将数据传递给原始组件，避免在多个组件中重复数据获取逻辑。
3. **行为增强**：
   - **示例**：高阶组件可以为组件添加额外的功能，如事件处理、日志记录等。

**注意事项**

- **不要修改原始组件**：高阶组件应该尽量不修改原始组件的实现，而是通过组合来增强其功能。
- **组件命名**：高阶组件通常会返回一个新的组件，新的组件应该有明确的命名，以便于调试和阅读代码。
- **传递静态方法**：如果需要传递静态方法或属性，可能需要手动拷贝静态方法到新组件。


## 是否了解过 React 的架构?新的 Fiber 架构相较于之前的 Stack 架构有什么优势?


Stack 架构在进行虛拟 DOM 树比较的时候，采用的是递归，计算会消耗大量的时间、新的 Fiber 架构采用的是链表，可以实现时间切片，防止JS 的计算占用过多的时间从而导致浏览器出现丢帧的现象。

## constructor 中 super 与 props 参数一起使用的目的是什么？

在调用方法之前，子类构造函数无法使用this引用super()。

在ES6中，在子类的constructor中必须先调用super才能引用this。

在constructor中可以使用this.props

- 使用props：

```javascript
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);  // Prints { name: 'sudheer',age: 30 }
    }
}
```

- 不使用props：

```javascript
class MyComponent extends React.Component {
    constructor(props) {
        super();
        console.log(this.props); // Prints undefined
        // But Props parameter is still available
        console.log(props); // Prints { name: 'sudheer',age: 30 }
    }

    render() {
        // No difference outside constructor
        console.log(this.props) // Prints { name: 'sudheer',age: 30 }
    }
}
```

上面的代码片段揭示了this.props行为仅在构造函数中有所不同。外部构造函数相同。



## 什么是 JSX？

JSX即JavaScript XML。一种在React组件内部构建标签的类XML语法。JSX为react.js开发的一套语法糖，也是react.js的使用基础。React在不使用JSX的情况下一样可以工作，然而使用JSX可以提高组件的可读性，因此推荐使用JSX。

```javascript
class MyComponent extends React.Component {
  render() {
    let props = this.props;  
    return (
      <div className="my-component">
      <a href={props.url}>{props.name}</a>
      </div>
    );
  }
}
```

**优点**：

- 允许使用熟悉的语法来定义 HTML 元素树；
- 提供更加语义化且移动的标签；
- 程序结构更容易被直观化；
- 抽象了 React Element 的创建过程；
- 可以随时掌控 HTML 标签以及生成这些标签的代码；
- 是原生的 JavaScript。

## 说说React事件和原生事件的执行顺序

## react中，父子组件的生命周期执行顺序是怎么样的？

React的生命周期从广义上分为三个阶段：挂载、渲染、卸载，因此可以把React的生命周期分为两类：挂载卸载过程和更新过程。

**一、挂载卸载过程**

1. constructor，完成了React数据的初始化；
2. componentWillMount，组件初始化数据后，但是还未渲染DOM前；
3. componentDidMount，组件第一次渲染完成，此时dom节点已经生成；
4. componentWillUnmount，组件的卸载和数据的销毁。

**二、更新过程**

1. componentWillReceiveProps (nextProps)，父组件改变后的props需要重新渲染组件时；
2. shouldComponentUpdate(nextProps,nextState)，主要用于性能优化(部分更新)，因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，在这里return false可以阻止组件的更新；
3. componentWillUpdate (nextProps,nextState)，shouldComponentUpdate返回true后，组件进入重新渲染的流程；
4. componentDidUpdate(prevProps,prevState)，组件更新完毕后触发；
5. render()，渲染时触发。

**三、父子组件加载顺序**

观察父子组件的挂载生命周期函数，可以发现挂载时，子组件的挂载钩子先被触发；卸载时，子组件的卸载钩子后被触发。

我们经常在挂载函数上注册监听器，说明此时是可以与页面交互的，也就是说其实所有挂载钩子都是在父组件实际挂载到dom树上才触发的，不过是在父组件挂载后依次触发子组件的 componentDidmount ，最后再触发自身的挂载钩子，说白了，componentDidMount 其实是异步钩子。

相反，卸载的时候父节点先被移除，再从上至下依次触发子组件的卸载钩子；

但是我们也经常在卸载钩子上卸载监听器，这说明 componentWillUnmount 其实在父组件从dom树上卸载前触发的，先触发自身的卸载钩子，但此时并未从dom树上剥离，然后依次尝试触发所有子组件的卸载钩子，最后，父组件从dom树上完成实际卸载。



## 为什么不能在循环、条件或嵌套函数中调用 Hooks？



## 简单介绍下 React 中的 diff 算法

diff 算法主要基于三个规律：

- DOM 节点的跨层级移动的操作特别少，可以忽略不计
- 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构
- 对于同一层级的一组子节点，可以通过唯一的 id 进行区分

**tree diff**

因为上面的三个策略中的第一点， DOM 节点的跨级操作比较少，那么 diff 算法只会对相同层级的 DOM 节点进行比较。如果发现节点不存在 那么会将该节点以及其子节点完全删除，不会再继续比较。如果出现了 DOM 节点的跨层级的移动操作，那么会删除改节点以及其所有的子节点，然后再移动后的位置重新创建。

**component diff**

如果是同一类型的组件，那么会继续对比 VM 数

如果不是同一类型的组件，那么会将其和其子节点完全替换，不会再进行比对

同一类型的组件，有可能 VM 没有任何的变化，如果可以确定的知道这点，那么就可以节省大量的 diff 时间，所以用户可以设置 shouldComponentUpdate() 来判断是否需要进行 diff 算法。

**element diff**

当节点处于同一层级的时候时，有三种操作：INSERT_MAKEUP插入、 MOVE_EXISTING 移动、 REMOVE_NODE 删除

这里 React 有一个优化策略，对于同一层级的同组子节点，添加唯一的 key 进行区分。这样的话，就可以判断出来是否是移动节点。通过 key 发现新旧集合中的节点都是相同的节点，就只需要进行移动操作就可以。

## 在 react 中怎么实现组件间的过渡动画？

**一、是什么**

在日常开发中，页面切换时的转场动画是比较基础的一个场景

当一个组件在显示与消失过程中存在过渡动画，可以很好的增加用户的体验

在`react`中实现过渡动画效果会有很多种选择，如`react-transition-group`，`react-motion`，`Animated`，以及原生的`CSS`都能完成切换动画

**二、如何实现**

在`react`中，`react-transition-group`是一种很好的解决方案，其为元素添加`enter`，`enter-active`，`exit`，`exit-active`这一系列勾子

可以帮助我们方便的实现组件的入场和离场动画

其主要提供了三个主要的组件：

- CSSTransition：在前端开发中，结合 CSS 来完成过渡动画效果
- SwitchTransition：两个组件显示和隐藏切换时，使用该组件
- TransitionGroup：将多个动画组件包裹在其中，一般用于列表中元素的动画

**CSSTransition**

其实现动画的原理在于，当`CSSTransition`的`in`属性置为`true`时，`CSSTransition`首先会给其子组件加上`xxx-enter`、`xxx-enter-active`的`class`执行动画

当动画执行结束后，会移除两个`class`，并且添加`-enter-done`的`class`

所以可以利用这一点，通过`css`的`transition`属性，让元素在两个状态之间平滑过渡，从而得到相应的动画效果

当`in`属性置为`false`时，`CSSTransition`会给子组件加上`xxx-exit`和`xxx-exit-active`的`class`，然后开始执行动画，当动画结束后，移除两个`class`，然后添加`-enter-done`的`class`

如下例子：

```javascript
export default class App2 extends React.PureComponent {

  state = {show: true};

  onToggle = () => this.setState({show: !this.state.show});

  render() {
    const {show} = this.state;
    return (
      <div className={'container'}>
        <div className={'square-wrapper'}>
          <CSSTransition
            in={show}
            timeout={500}
            classNames={'fade'}
            unmountOnExit={true}
          >
            <div className={'square'} />
          </CSSTransition>
        </div>
        <Button onClick={this.onToggle}>toggle</Button>
      </div>
    );
  }
}
```

对应`css`样式如下：

```javascript
.fade-enter {
  opacity: 0;
  transform: translateX(100%);
}

.fade-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 500ms;
}

.fade-exit {
  opacity: 1;
  transform: translateX(0);
}

.fade-exit-active {
  opacity: 0;
  transform: translateX(-100%);
  transition: all 500ms;
}
```

**SwitchTransition**

`SwitchTransition`可以完成两个组件之间切换的炫酷动画

比如有一个按钮需要在`on`和`off`之间切换，我们希望看到`on`先从左侧退出，`off`再从右侧进入

`SwitchTransition`中主要有一个属性`mode`，对应两个值：

- in-out：表示新组件先进入，旧组件再移除；
- out-in：表示就组件先移除，新组建再进入

`SwitchTransition`组件里面要有`CSSTransition`，不能直接包裹你想要切换的组件

里面的`CSSTransition`组件不再像以前那样接受`in`属性来判断元素是何种状态，取而代之的是`key`属性

下面给出一个按钮入场和出场的示例，如下：

```javascript
import { SwitchTransition, CSSTransition } from "react-transition-group";

export default class SwitchAnimation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOn: true
    }
  }

  render() {
    const {isOn} = this.state;

    return (
      <SwitchTransition mode="out-in">
        <CSSTransition classNames="btn"
                       timeout={500}
                       key={isOn ? "on" : "off"}>
          {
          <button onClick={this.btnClick.bind(this)}>
            {isOn ? "on": "off"}
          </button>
        }
        </CSSTransition>
      </SwitchTransition>
    )
  }

  btnClick() {
    this.setState({isOn: !this.state.isOn})
  }
}
```

`css`文件对应如下：

```javascript
.btn-enter {
  transform: translate(100%, 0);
  opacity: 0;
}

.btn-enter-active {
  transform: translate(0, 0);
  opacity: 1;
  transition: all 500ms;
}

.btn-exit {
  transform: translate(0, 0);
  opacity: 1;
}

.btn-exit-active {
  transform: translate(-100%, 0);
  opacity: 0;
  transition: all 500ms;
}
```

**TransitionGroup**

当有一组动画的时候，就可将这些`CSSTransition`放入到一个`TransitionGroup`中来完成动画

同样`CSSTransition`里面没有`in`属性，用到了`key`属性

`TransitionGroup`在感知`children`发生变化的时候，先保存移除的节点，当动画结束后才真正移除

其处理方式如下：

- 插入的节点，先渲染dom，然后再做动画
- 删除的节点，先做动画，然后再删除dom

如下：

```javascript
import React, { PureComponent } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default class GroupAnimation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      friends: []
    }
  }

  render() {
    return (
      <div>
        <TransitionGroup>
          {
            this.state.friends.map((item, index) => {
              return (
                <CSSTransition classNames="friend" timeout={300} key={index}>
                  <div>{item}</div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
        <button onClick={e => this.addFriend()}>+friend</button>
      </div>
    )
  }

  addFriend() {
    this.setState({
      friends: [...this.state.friends, "coderwhy"]
    })
  }
}
```

对应`css`如下：

```javascript
复制.friend-enter {
    transform: translate(100%, 0);
    opacity: 0;
}

.friend-enter-active {
    transform: translate(0, 0);
    opacity: 1;
    transition: all 500ms;
}

.friend-exit {
    transform: translate(0, 0);
    opacity: 1;
}

.friend-exit-active {
    transform: translate(-100%, 0);
    opacity: 0;
    transition: all 500ms;
}
```

## 在 React 中可以做哪些性能优化？

- 使用 shouldComponentUpdate 避免不需要的渲染，但是如果对 props 和 state 做深比较，代价很大，所以需要根据业务进行些取舍；在有子组件的情况下，为了避免子组件的重复渲染，可以通过父组件来判断子组件是否需要 PureRender。
- 将 props 设置为数组或对象：每次调用 React 组件都会创建新组件，就算传入的数组或对象的值没有改变，他们的引用地址也会发生改变，比如，如果按照如下的写法，那么每次渲染时 style 都是一个新对象

```javascript
// 不推荐
<button style={{ color: 'red' }} />

// 推荐
const style = { color: 'red' }
<button style={style} />

// 不推荐
<button style={this.props.style || {} } />  

// 推荐
const defaultStyle = {}
<button style={this.props.style || defaultStyle } />   
```

- 将函数的绑定移动到构造函数内：可以避免每次都绑定事件。
- 使用 immutable 不可变数据，在我们项目中使用引用类型时，为了避免对原始数据的影响，一般建议使用 shallowCopy 和 deepCopy 对数据进行处理，但是这样会造成 CPU 和 内存的浪费，所以推荐使用 immutable，优点如下
  - 降低了“可变”带来的复杂度
  - 节省内存，immutable 使用结构共享尽量复用内存，没有被引用的对象会被垃圾回收
  - 可以更好的做撤销/重做，复制/粘贴，时间旅行
  - 不会有并发问题（因为数据本身就是不可变的）
  - 拥抱函数式编程
- 给子组件设置一个唯一的 key，因为在 diff 算法中，会用 key 作为唯一标识优化渲染

## 为什么不能直接使用 this.state 改变数据？

react中不能直接修改state，因为并不会重新触发render。

以如下方式更新状态，组件不会重新渲染。

```javascript
//Wrong
This.state.message =”Hello world”;
```

而是需要使用setState()方法，状态改变时，组件通过重新渲染做出响应。

```javascript
//Correct
This.setState({message: ‘Hello World’});
```

setState通过一个队列机制来实现 state 更新。当执行 setState 的时候，会将需要更新的 state 合并后放入状态队列，而不会立刻更新 this.state。队列机制可以高效的批量更新 state，如果不通过 setState 而直接修改 this.state，那么该 state 将不会被放入状态队列中，当下次调用 setState 并对状态队列进行合并时，将会忽略之前被直接修改的 state，而造成无法预知的错误。

## React Hooks带来了什么便利？



React Hooks 带来了许多便利，使得函数组件的开发更加简洁和高效。以下是主要的便利点：

1. **简化状态管理**

- `useState`：允许在函数组件中管理状态，避免了类组件中复杂的状态初始化和方法绑定。

  ```javascript
  const [count, setCount] = useState(0);
  ```

2. **简化副作用处理**

- `useEffect`：统一了副作用的处理，替代了`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`

  ，并可以处理多种副作用场景。

  ```javascript
  useEffect(() => {
    // 执行副作用
    return () => {
      // 清理副作用
  };
  }, [dependencies]);
```

3. **共享逻辑**

- **自定义 Hooks**：允许将逻辑提取到可复用的函数中，避免了类组件中重复的逻辑和代码。

  ```javascript
  function useCustomHook() {
    const [value, setValue] = useState(0);
    // 自定义逻辑
    return [value, setValue];
  }
```

4. **更清晰的组件结构**

- **函数组件**：Hooks 使函数组件能够管理状态和副作用，简化了组件的结构，避免了类组件中的复杂生命周期方法。

  ```javascript
  function MyComponent() {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      // 副作用逻辑
    }, []);
  
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
  }
  ```

5. **避免 this 绑定问题**

- **函数组件**：Hooks 消除了类组件中`this`的复杂性和绑定问题，使代码更简洁、更易理解。

  ```javascript
  function handleClick() {
    // 不需要绑定 `this`
  }
  ```

6. **改进了逻辑复用**

- **Hooks 组合**：可以将多个 Hooks 组合在一起，灵活地管理和复用逻辑。

  ```javascript
  function MyComponent() {
    const { data, loading } = useFetchData();
    const [count, setCount] = useState(0);
  
    return <div>{/* UI 逻辑 */}</div>;
  }
  ```

7. **提升代码的可读性和维护性**

- **逻辑集中**：通过 Hooks 将相关逻辑集中在一个地方，提升了代码的可读性和维护性。

  ```javascript
  function useCounter(initialValue) {
    const [count, setCount] = useState(initialValue);
  
    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
  
    return { count, increment, decrement };
  }
  ```

8. **支持异步操作**

- **`useEffect` 和自定义 Hooks**：支持处理异步操作和副作用，使得处理数据获取和副作用变得更加直观。

  ```javascript
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('api/data');
      const data = await response.json();
      // 处理数据
    }
  
    fetchData();
  }, []);
  ```

9. **性能优化**

- **`useMemo` 和 `useCallback`**：提供了优化性能的工具，避免不必要的计算和函数重新创建。

  ```javascript
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  const memoizedCallback = useCallback(() => { /* callback logic */ }, [dependencies]);
  ```

**总结**

React Hooks 提供了简洁的 API，使得函数组件能够管理状态、副作用和逻辑复用，从而提升了开发效率、代码可读性和维护性。它们消除了类组件中的复杂性，使得编写和理解 React 组件变得更加直观。



## 列举几个常见的 Hook?

在 React 中，Hooks 是一组可以让函数组件拥有状态和副作用的 API。

以下是一些常见的 Hook 及其用途：

1. **`**useState**`**

- **用途**：在函数组件中添加状态。

- **示例**：

  ```javascript
  import React, { useState } from 'react';
  
  function Counter() {
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    );
  }
  ```

2. **`useEffect`**

- **用途**：在函数组件中处理副作用，如数据获取、订阅和手动 DOM 操作。

- **示例：**

  ```javascript
  import React, { useEffect, useState } from 'react';
  
  function Example() {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => setData(data));
    }, []); // 空数组表示只在组件挂载时执行一次
  
    return <div>{data ? `Data: ${data}` : 'Loading...'}</div>;
  }
  ```

3. **`useContext`**

- **用途**：在组件中访问 React 的 Context。

- **示例：**

  ```javascript
  import React, { useContext, createContext } from 'react';
  
  const MyContext = createContext('defaultValue');
  
  function Display() {
    const value = useContext(MyContext);
    return <div>{value}</div>;
  }
  
  function App() {
    return (
      <MyContext.Provider value="Hello, World!">
        <Display />
      </MyContext.Provider>
    );
  }
  ```

4. **`useReducer`**

- **用途**：管理复杂状态逻辑，类似于 Redux 的 reducer。

- **示例：**

  ```javascript
  import React, { useReducer } from 'react';
  
  const initialState = { count: 0 };
  
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      default:
        throw new Error();
    }
  }
  
  function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return (
      <div>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      </div>
    );
  }
  ```

5. **`useMemo`**

- **用途**：优化性能，通过记忆化计算结果，避免不必要的重新计算。

- **示例：**

  ```javascript
  import React, { useMemo, useState } from 'react';
  
  function ExpensiveComponent({ compute }) {
    const result = useMemo(() => compute(), [compute]);
    return <div>Result: {result}</div>;
  }
  
  function App() {
    const [count, setCount] = useState(0);
  
    const compute = () => {
      // 模拟一个计算过程
      return count * 2;
    };
  
    return (
      <div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <ExpensiveComponent compute={compute} />
      </div>
    );
  }
  ```

6. **`useCallback`**

- **用途**：记忆化回调函数，避免在依赖项变化时重新创建函数。

- **示例：**

  ```javascript
  import React, { useCallback, useState } from 'react';
  
  function Button({ onClick }) {
    console.log('Button rendered');
    return <button onClick={onClick}>Click me</button>;
  }
  
  function App() {
    const [count, setCount] = useState(0);
  
    const handleClick = useCallback(() => {
      alert('Button clicked!');
    }, []); // 依赖项为空数组表示回调函数不会变化
  
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <Button onClick={handleClick} />
      </div>
    );
  }
  ```

7. **`useRef`**

- **用途**：在函数组件中创建可变的引用，通常用于访问 DOM 元素或保存任何可变数据。

- **示例：**

  ```javascript
  import React, { useRef } from 'react';
  
  function FocusInput() {
    const inputRef = useRef(null);
  
    const handleClick = () => {
      inputRef.current.focus();
    };
  
    return (
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={handleClick}>Focus the input</button>
      </div>
    );
  }
  ```

这些 Hooks 提供了处理状态、副作用、上下文、性能优化等常见需求的功能，使得函数组件变得更加灵活和强大。

## React Hooks 在使用上有哪些限制？

React Hooks 的限制主要有两条：

- 不要在循环、条件或嵌套函数中调用 Hook；
- 在 React 的函数组件中调用 Hook。

那为什么会有这样的限制呢？就得从 Hooks 的设计说起。Hooks 的设计初衷是为了改进 React 组件的开发模式。在旧有的开发模式下遇到了三个问题。

- 组件之间难以复用状态逻辑。过去常见的解决方案是高阶组件、render props 及状态管理框架。
- 复杂的组件变得难以理解。生命周期函数与业务逻辑耦合太深，导致关联部分难以拆分。
- 人和机器都很容易混淆类。常见的有 this 的问题，但在 React 团队中还有类难以优化的问题，他们希望在编译优化层面做出一些改进。

这三个问题在一定程度上阻碍了 React 的后续发展，所以为了解决这三个问题，Hooks 基于函数组件开始设计。然而第三个问题决定了 Hooks 只支持函数组件。

那为什么不要在循环、条件或嵌套函数中调用 Hook 呢？因为 Hooks 的设计是**类似于数组**实现。在调用时按顺序加入数组中，如果使用循环、条件或嵌套函数很有可能导致数组取值错位，执行错误的 Hook。当然，**实质上 React 的源码里不是数组，是链表**。

这些限制会在编码上造成一定程度的心智负担，新手可能会写错，为了避免这样的情况，可以引入 ESLint 的 Hooks 检查插件进行预防。

## useEffect 与 useLayoutEffect 有什么区别？

**共同点**

- 运用效果： useEffect 与 useLayoutEffect 两者都是用于处理副作用，这些副作用包括改变 DOM、设置订阅、操作定时器等。在函数组件内部操作副作用是不被允许的，所以需要使用这两个函数去处理。
- 使用方式： useEffect 与 useLayoutEffect 两者底层的函数签名是完全一致的，都是调用的 mountEffectImpl方法，在使用上也没什么差异，基本可以直接替换。

**不同点**

- 使用场景： useEffect 在 React 的渲染过程中是被异步调用的，用于绝大多数场景；而 useLayoutEffect 会在所有的 DOM 变更之后同步调用，主要用于处理 DOM 操作、调整样式、避免页面闪烁等问题。也正因为是同步处理，所以需要避免在 useLayoutEffect 做计算量较大的耗时任务从而造成阻塞。
- 使用效果： useEffect是按照顺序执行代码的，改变屏幕像素之后执行（先渲染，后改变DOM），当改变屏幕内容时可能会产生闪烁；useLayoutEffect是改变屏幕像素之前就执行了（会推迟页面显示的事件，先改变DOM后渲染），不会产生闪烁。useLayoutEffect总是比useEffect先执行。

在未来的趋势上，两个 API 是会长期共存的，暂时没有删减合并的计划，需要开发者根据场景去自行选择。React 团队的建议非常实用，如果实在分不清，先用 useEffect，一般问题不大；如果页面有异常，再直接替换为 useLayoutEffect 即可。

## 说说你对 useContext 的理解

## 说说你对 useMemo 的理解

## 说说你对自定义hook的理解

## 如何让 useEffect 支持 async/await？

## React 中怎么实现状态自动保存（KeepAlive）？

**什么是状态保存？**

假设有下述场景：

移动端中，用户访问了一个列表页，上拉浏览列表页的过程中，随着滚动高度逐渐增加，数据也将采用触底分页加载的形式逐步增加，列表页浏览到某个位置，用户看到了感兴趣的项目，点击查看其详情，进入详情页，从详情页退回列表页时，需要停留在离开列表页时的浏览位置上

类似的数据或场景还有已填写但未提交的表单、管理系统中可切换和可关闭的功能标签等，这类数据随着用户交互逐渐变化或增长，这里理解为状态，在交互过程中，因为某些原因需要临时离开交互场景，则需要对状态进行保存

在 React 中，我们通常会使用路由去管理不同的页面，而在切换页面时，路由将会卸载掉未匹配的页面组件，所以上述列表页例子中，当用户从详情页退回列表页时，会回到列表页顶部，因为列表页组件被路由卸载后重建了，状态被丢失。

**如何实现 React 中的状态保存**

在 Vue 中，我们可以非常便捷地通过 \<keep-alive> 标签实现状态的保存，该标签会缓存不活动的组件实例，而不是销毁它们

而在 React 中并没有这个功能，曾经有人在官方提过相关 issue ，但官方认为这个功能容易造成内存泄露，表示暂时不考虑支持，所以我们需要自己想办法了。

**常见的解决方式：手动保存状态**

手动保存状态，是比较常见的解决方式，可以配合 React 组件的 componentWillUnmount 生命周期通过 redux 之类的状态管理层对数据进行保存，通过 componentDidMount 周期进行数据恢复

在需要保存的状态较少时，这种方式可以比较快地实现我们所需功能，但在数据量大或者情况多变时，手动保存状态就会变成一件麻烦事了

作为程序员，当然是尽可能懒啦，为了不需要每次都关心如何对数据进行保存恢复，我们需要研究如何自动保存状态

**通过路由实现自动状态保存（通常使用 react-router）**

既然 React 中状态的丢失是由于路由切换时卸载了组件引起的，那可以尝试从路由机制上去入手，**改变路由对组件的渲染行为**

我们有以下的方式去实现这个功能：

- 重写 \<Route> 组件，可参考 [react-live-route](https://github.com/fi3ework/react-live-route)。重写可以实现我们想要的功能，但成本也比较高，需要注意对原始 \<Route> 功能的保存，以及多个 react-router 版本的兼容
- 重写路由库，可参考 [react-keeper](https://github.com/lanistor/react-keeper) 。重写路由库成本是一般开发者无法承受的，且完全替换掉路由方案是一个风险较大的事情，需要较为慎重地考虑。
- 基于 \<Route> 组件现有行为做拓展，可参考 [react-router-cache-route](https://github.com/CJY0208/react-router-cache-route) 。在阅读了 \<Route> 的源码后发现，如果使用 component 或者 render 属性，都无法避免路由在不匹配时被卸载掉的命运。但将 children 属性当作方法来使用，我们就有手动控制渲染的行为的可能。

上面几种方案，主要通过路由入手实现自动状态保存的可能，但终究不是真实的、纯粹的 KeepAlive 功能。

**模拟真实的 \<KeepAlive> 功能**

以下是期望的使用方式

```javascript
function App() {
  const [show, setShow] = useState(true)

  return (
    <div>
      <button onClick={() => setShow(show => !show)}>Toggle</button>
      {show && (
        <KeepAlive>
          <Test />
        </KeepAlive>
      )}
    </div>
  )
}
```

下面简单介绍下 [react-activation](https://github.com/CJY0208/react-activation) 的实现原理：由于 React 会卸载掉处于固有组件层级内的组件，所以我们需要将 \<KeepAlive> 中的组件，也就是其 children 属性抽取出来，渲染到一个不会被卸载的组件 \<Keeper> 内，再使用 DOM 操作将 \<Keeper> 内的真实内容移入对应 \<KeepAlive>，就可以实现此功能。

## 下面函数组件的输出分别是什么？

下面是一个简单的函数组件，有两个按钮：“alert”、“add”。

如果先点击“alert”按钮，再点击一次“add”按钮，那么弹窗框中的值和页面中展示`value`分别是什么？

```javascript
const FunctionComponent = () => {
  const [value, setValue] = useState(1)

  const log = () => {
    setTimeout(() => {
      alert(value)
    }, 3000);
  }

  return (
    <div>
      <p>FunctionComponent</p>
      <div>value: {value}</div>
      <button onClick={log}>alert</button>
      <button onClick={() => setValue(value + 1)}>add</button>
    </div>
  )
}
```

---

弹出的值是 **1**，页面显示的值是 **2**

我们发现弹出的值和当前页面显示的值不相同。

换句话说：**log 方法内的 value 和点击动作触发那一刻的 value 相同，value 的后续变化不会对 log 方法内的 value 造成影响**。

这种现象被称为“闭包陷阱”或者被叫做“Capture Value” ：函数式组件每次render 都会生产一个新的 log 函数，这个新的 log 函数会产生一个在当前这个阶段 value 值的闭包。

上面例子 “闭包陷阱” 的分析：

1. 初始次渲染，生成一个 log 函数（value = 1）
2. value 为 1 时，点击 alert 按钮执行 log 函数（value = 1）
3. 点击按钮增加 value，比如 value 增加到 6，组件 render ，生成一个新的 log 函数（value = 6）
4. 计时器触发，log 函数（value = 1）弹出闭包内的 value 为 1

如何让弹窗中展示最新的value值呢？

**使用 useRef 解决闭包陷阱的问题**

```javascript
const FunctionComponent = () => {
  const [value, setValue] = useState(1)
  const countRef = useRef(value)

  const log = () => {
    setTimeout(() => {
      alert(countRef.current)
    }, 3000);
  }

  useEffect(() => {
    countRef.current = value
  }, [value])

  return (
    <div>
      <p>FunctionComponent</p>
      <div>value: {value}</div>
      <button onClick={log}>alert</button>
      <button onClick={() => setValue(value + 1)}>add</button>
    </div>
  )
}
```

**useRef** 每次 render 时都会返回**同一个引用类型的对象**，我们设置值和读取值都在这个对象上处理，这样就能获取到最新的 value 值了。



## React Hooks 当中的 useEffect 是如何区分生命周期钩子的

useEffect可以看成是 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 三者的结合。

useEffect(callback, [source])接收两个参数，调用方式如下：

```javascript
useEffect(() => {
   console.log('mounted');
   
   return () => {
       console.log('willUnmount');
   }
 }, [source]);
```

生命周期函数的调用主要是通过第二个参数`[source]`来进行控制，有如下几种情况：

- [source]参数不传时，则每次都会优先调用上次保存的函数中返回的那个函数，然后再调用外部那个函数；
- [source]参数传[]时，则外部的函数只会在初始化时调用一次，返回的那个函数也只会最终在组件卸载时调用一次；
- [source]参数有值时，则只会监听到数组中的值发生变化后才优先调用返回的那个函数，再调用外部的函数。

## react-router 里的 \<Link> 标签和 \<a> 标签有什么区别？

对比 \<a> 标签, Link 避免了不必要的重新渲染。

react-router是伴随着react框架出现的路由系统，它也是公认的一种优秀的路由解决方案。在使用react-router时候，我们常常会使用其自带的路径跳转组件Link,通过实现跳转；

react-router 接管了其默认的链接跳转行为，与传统的页面跳转有区别的是，Link 的 **“跳转”** 行为只会触发相匹配的对应的页面内容更新，而不会刷新整个页面。

Link 跳转做了三件事情：

- 有onclick那就执行onclick
- click的时候阻止a标签默认事件
- 根据跳转 href，用 history 跳转，此时只是链接变了，并没有刷新页面

而 a 标签就是普通的超链接了，用于从当前页面跳转到href指向的另一个页面（非锚点情况）。使用React Hooks有什么优势？

hooks 是react 16.8 引入的特性，他允许你在不写class的情况下操作state 和react的其他特性。

React Hooks 要解决的问题是状态共享，是继 render-props 和 higher-order components 之后的第三种状态共享方案，不会产生 JSX 嵌套地狱问题。

这个状态指的是状态逻辑，所以称为状态逻辑复用会更恰当，因为只共享数据处理逻辑，不会共享数据本身。



## 简述下 React 的事件代理机制？

React 并不会把所有的处理函数直接绑定在真实的节点上。而是把所有的事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。

当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象。

当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。

这样做的优点是解决了兼容性问题，并且简化了事件处理和回收机制（不需要手动的解绑事件，React 已经在内部处理了）。但是有些事件 React 并没有实现，比如 window 的 resize 事件。

在`React@17.0.3`版本中：

- 所有事件都是委托在`id = root`的DOM元素中（网上很多说是在`document`中，`17`版本不是了）；
- 在应用中所有节点的事件监听其实都是在`id = root`的DOM元素中触发；
- `React`自身实现了一套事件冒泡捕获机制；
- `React`实现了合成事件`SyntheticEvent`；
- `React`在`17`版本不再使用事件池了（网上很多说使用了对象池来管理合成事件对象的创建销毁，那是`16`版本及之前）；
- 事件一旦在`id = root`的DOM元素中委托，其实是一直在触发的，只是没有绑定对应的回调函数；



![img](https://static.ecool.fun//article/eeeadcee-a840-40f8-9a26-3f2f747b2ef6.jpeg)

预览



盗用一张官方图，按官方解释，之所以会将事件委托从`document`中移到`id = root`的DOM元素，是为了**可以更加安全地进行新旧版本 React 树的嵌套**。

## React 的事件代理机制和原生事件绑定有什么区别？

- 事件传播与阻止事件的传播： React 的合成事件并没有实现事件捕获 只支持了事件冒泡。阻止事件传播 React 做了兼容性处理，只需要 e.preventDefault() 即可，原生存在兼容性问题。
- 事件类型：React 是 原生事件类型 的一个子集（React 只是实现了 DOM level3 的事件接口，有些事件 React 并没有实现，比如 window 的 resize 事件。）阻止 React 事件冒泡的行为只能用于 React 合成事件系统，但是 在原生事件中的阻止冒泡行为，却可以阻止 React 合成事件的传播。
- 事件的绑定方式：原生事件系统中支持多种不同的绑定事件的方式，React 中只有一种
- 事件对象：原生中存在 IE 的兼容性问题，React 做了兼容处理。

## React 的事件代理机制和原生事件绑定混用会有什么问题？

我们在平时的开发中应该尽可能的避免 React 的事件代理机制和原生事件绑定混用。

React 的合成事件层，并没有将事件直接绑定到 DOM 元素上，所以使用 e.stopPropagation() 来阻止原生 DOM 的冒泡的行为是不行的。阻止 React 事件冒泡的行为只能用于 React 合成事件系统，但是 在原生事件中的阻止冒泡行为，却可以阻止 React 合成事件的传播。



## React 组件间怎么进行通信？

**一、是什么**

我们将组件间通信可以拆分为两个词：

- 组件
- 通信

`React`的组件灵活多样，按照不同的方式可以分成很多类型的组件

而通信指的是发送者通过某种媒体以某种格式来传递信息到收信者以达到某个目的，广义上，任何信息的交通都是通信

组件间通信即指组件通过某种方式来传递信息以达到某个目的

**二、如何通信**

组件传递的方式有很多种，根据传送者和接收者可以分为如下：

- 父组件向子组件传递
- 子组件向父组件传递
- 兄弟组件之间的通信
- 父组件向后代组件传递
- 非关系组件传递

**父组件向子组件传递**

由于`React`的数据流动为单向的，父组件向子组件传递是最常见的方式

父组件在调用子组件的时候，只需要在子组件标签内传递参数，子组件通过`props`属性就能接收父组件传递过来的参数

```javascript
function EmailInput(props) {
  return (
    <label>
      Email: <input value={props.email} />
    </label>
  );
}

const element = <EmailInput email="123124132@163.com" />;
```

**子组件向父组件传递**

子组件向父组件通信的基本思路是，父组件向子组件传一个函数，然后通过这个函数的回调，拿到子组件传过来的值

父组件对应代码如下：

```javascript
class Parents extends Component {
  constructor() {
    super();
    this.state = {
      price: 0
    };
  }

  getItemPrice(e) {
    this.setState({
      price: e
    });
  }

  render() {
    return (
      <div>
        <div>price: {this.state.price}</div>
        {/* 向子组件中传入一个函数  */}
        <Child getPrice={this.getItemPrice.bind(this)} />
      </div>
    );
  }
}
```

子组件对应代码如下：

```javascript
class Child extends Component {
  clickGoods(e) {
    // 在此函数中传入值
    this.props.getPrice(e);
  }

  render() {
    return (
      <div>
        <button onClick={this.clickGoods.bind(this, 100)}>goods1</button>
        <button onClick={this.clickGoods.bind(this, 1000)}>goods2</button>
      </div>
    );
  }
}
```

**兄弟组件之间的通信**

如果是兄弟组件之间的传递，则父组件作为中间层来实现数据的互通，通过使用父组件传递

```javascript
class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {count: 0}
  }
  setCount = () => {
    this.setState({count: this.state.count + 1})
  }
  render() {
    return (
      <div>
        <SiblingA
          count={this.state.count}
        />
        <SiblingB
          onClick={this.setCount}
        />
      </div>
    );
  }
}
```

**父组件向后代组件传递**

父组件向后代组件传递数据是一件最普通的事情，就像全局数据一样

使用`context`提供了组件之间通讯的一种方式，可以共享数据，其他数据都能读取对应的数据

通过使用`React.createContext`创建一个`context`

```javascript
 const PriceContext = React.createContext('price')
```

`context`创建成功后，其下存在`Provider`组件用于创建数据源，`Consumer`组件用于接收数据，使用实例如下：

`Provider`组件通过`value`属性用于给后代组件传递数据：

```javascript
<PriceContext.Provider value={100}>
</PriceContext.Provider>
```

如果想要获取`Provider`传递的数据，可以通过`Consumer`组件或者或者使用`contextType`属性接收，对应分别如下：

```javascript
class MyClass extends React.Component {
  static contextType = PriceContext;
  render() {
    let price = this.context;
    /* 基于这个值进行渲染工作 */
  }
}
```

`Consumer`组件：

```javascript
<PriceContext.Consumer>
    { /*这里是一个函数*/ }
    {
        price => <div>price：{price}</div>
    }
</PriceContext.Consumer>
```

**非关系组件传递**

如果组件之间关系类型比较复杂的情况，建议将数据进行一个全局资源管理，从而实现通信，例如`redux`。关于`redux`的使用后续再详细介绍

**三、总结**

由于`React`是单向数据流，主要思想是组件不会改变接收的数据，只会监听数据的变化，当数据发生变化时它们会使用接收到的新值，而不是去修改已有的值

因此，可以看到通信过程中，数据的存储位置都是存放在上级位置中React 中如果绑定事件使用匿名函数有什么影响？

```javascript
class Demo {
  render() {
    return <button onClick={(e) => {
      alert('我点击了按钮')
    }}>
      按钮
    </button>
  }
}
```

这样的写法，因为使用的是匿名函数，所以组件每次都会认为是一个新的 props，不会使用缓存优化，在性能上会有一定的损耗。



## 说说你对 Redux 的理解？其工作原理？

## Redux 中异步的请求怎么处理

一般的异步请求，可以在 `componentDidmount` 中直接进⾏请求，⽆须借助redux。

但是在⼀定规模的项⽬中,上述⽅法很难进⾏异步流的管理,通常情况下我们会借助redux的异步中间件进⾏异步处理。

redux异步流中间件其实有很多，当下主流的异步中间件有两种`redux-thunk`、`redux-saga`。

1. **使用react-thunk中间件**

- **redux-thunk优点:**
  - 体积⼩: redux-thunk的实现⽅式很简单，只有不到20⾏代码
  - 使⽤简单: redux-thunk没有引⼊像`redux-saga`或者`redux-observable`额外的范式，上⼿简单

- **redux-thunk缺陷:**

  - 样板代码过多: 与redux本身⼀样,通常⼀个请求需要⼤量的代码,⽽且很多都是重复性质的

  - 耦合严重: 异步操作与redux的action偶合在⼀起,不⽅便管理

  - 功能孱弱: 有⼀些实际开发中常⽤的功能需要⾃⼰进⾏封装

2. 使用redux-saga中间件

- **redux-saga优点:**

  - 异步解耦: 异步操作被被转移到单独 saga.js 中，不再是掺杂在 action.js 或 component.js 中

  - action摆脱`thunk function`: dispatch 的参数依然是⼀个纯粹的 action (FSA)，⽽不是充满 “⿊魔法” thunk function

  - 异常处理: 受益于 `generator function` 的 saga 实现，代码异常/请求失败 都可以直接通过 `try/catch` 语法直接捕获处理

  - 功能强⼤: `redux-saga`提供了⼤量的 Saga 辅助函数和 Effect 创建器供开发者使⽤,开发者⽆须封装或者简单封装即可使⽤

  - 灵活: redux-saga可以将多个Saga可以串⾏/并⾏组合起来,形成⼀个⾮常实⽤的异步flow

  - 易测试，提供了各种case的测试⽅案，包括mock task，分⽀覆盖等等

- **redux-saga缺陷:**

  - 额外的学习成本: `redux-saga`不仅在使⽤难以理解的 `generator function`，⽽且有数⼗个API，学习成本远超redux-thunk。最重要的是你的额外学习成本是只服务于这个库的，与`redux-observable`不同，`redux-observable`虽然也有额外学习成本但是背后是rxjs和⼀整套思想

  - 体积庞⼤: 体积略⼤,代码近2000⾏，min版25KB左右

  - 功能过剩: 实际上并发控制等功能很难⽤到，但是我们依然需要引⼊这些代码

  - ts⽀持不友好: yield⽆法返回TS类型`redux-saga`可以捕获action，然后执行一个函数，那么可以把异步代码放在这个函数中。

## 使用 redux 有哪些原则？

**核心描述**

- 单一数据源：整个应用的全局 state 被存储在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
- State 是只读的：唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事情的普通对象。
- 使用纯函数来执行修改：为了描述 action 如何改变 state tree，你需要编写纯的 reducers。

**知识拓展**

- 什么时候应该使用 redux：
  - 在应用的大量地方，都存在大量的状态
  - 应用状态会随着时间的推移而频繁更新
  - 更新该状态的逻辑可能很复杂
  - 中型和大型代码量的应用，很多人协同开发
- reducer 是一个函数，接收当前的 state 和一个 action 对象，必要时决定如何更新状态，并返回新状态。reducer 必须符合以下规则：
  - 仅使用 state 和 action 参数计算新的状态值
  - 禁止直接修改 state。必须通过复制现有的 state 并对复制的值进行更改的方式来做不可变更新
  - 禁止任何异步逻辑、依赖随机值或导致其他副作用代码
- reducer 遵守上述规则的原因：
  - redux 的目标之一是使代码可预测。当函数的输出仅根据输入参数计算时，更容易理解该代码的工作原理并对其进行测试
  - 如果一个函数依赖于自身之外的变量，或者随机行为，你永远不知道运行它时会发生什么
  - 如果一个函数 mutate 了其他对象，比如它的参数，这可能会意外地改变应用程序的工作方式。这可能是错误的常见来源
- 不可变更新（Immutability），不能在 Redux 中更改 state 的原因：
  - 会导致bug，例如 UI 未正确更新以显示最新值
  - 更难理解状态更新的原因和方式
  - 编写测试变的困难
  - 打破了正确使用“时间旅行调试”的能力
  - 违背了 Redux 的预期精神和使用模式

## Redux 状态管理器和变量挂载到 window 中有什么区别？

Redux 状态管理器和将变量挂载到 `window` 对象上是两种不同的状态管理方法，它们各有优缺点。

**Redux 状态管理器**

**优点：**

1. **集中管理**：所有的状态都存储在 Redux store 中，方便管理和调试。
2. **可预测性**：状态变化是通过纯函数（reducers）和明确的 actions 来处理，使得状态变化可预测。
3. **中间件支持**：Redux 支持中间件，比如 `redux-thunk` 或 `redux-saga`，来处理异步操作和副作用。
4. **工具支持**：Redux 有强大的开发工具（如 Redux DevTools）来帮助调试和查看状态的变化。
5. **组件解耦**：通过 `connect` 或 `useSelector` 和 `useDispatch` 等 API，组件可以不直接依赖于具体的状态结构，增强了组件的解耦性和可测试性。

**缺点：**

1. **学习曲线**：对于新手来说，Redux 的概念和使用方式可能会比较复杂。
2. **样板代码**：Redux 的使用通常需要大量的样板代码，比如 actions、reducers 和 action creators。

**变量挂载到 `window`**

**优点：**

1. **简单直接**：直接在 `window` 对象上挂载变量可以快速实现简单的状态共享。
2. **易于访问**：全局变量可以在应用的任何地方直接访问，方便使用。

**缺点：**

1. **全局污染**：将变量挂载到 `window` 对象上可能会导致全局命名空间污染，容易引发命名冲突。
2. **不易维护**：随着应用的增长，全局变量可能会变得难以管理和维护。
3. **缺乏结构**：没有像 Redux 那样的结构化和规范化，状态管理变得不够一致和可预测。
4. **调试困难**：全局状态的变化不容易追踪，缺乏系统化的调试工具和机制。

总的来说，Redux 适合于需要复杂状态管理和维护的大型应用，而挂载到 `window` 可能适用于小型项目或简单的全局状态需求。



## mobx 和 redux 有什么区别？

**共同点**

- 为了解决状态管理混乱、无法有效同步的问题，统一维护管理应用状态
- 某一状态只有一个可信数据来源（通常命名为store，指状态容器）
- 操作更新状态方式统一，并且可控（通常以action方式提供更新状态的途径）
- 支持将store与React组件连接，如`react-redux`，`mobx-react`

**区别**

Redux更多的是遵循Flux模式的一种实现，是一个 JavaScript 库，它关注点主要是以下几方面∶

- Action∶ 一个JavaScript对象，描述动作相关信息，主要包含type属性和payload属性∶
- Reducer∶ 定义应用状态如何响应不同动作（action），如何更新状态;
- Store∶ 管理action和reducer及其关系的对象，主要提供以下功能∶
  - 维护应用状态并支持访问状态(getState());
  - 支持监听action的分发，更新状态(dispatch(action));
  - 支持订阅store的变更(subscribe(listener));
- 异步流∶ 由于Redux所有对store状态的变更，都应该通过action触发，异步任务（通常都是业务或获取数据任务）也不例外，而为了不将业务或数据相关的任务混入React组件中，就需要使用其他框架配合管理异步任务流程，如redux-thunk，redux-saga等;

Mobx是一个透明函数响应式编程的状态管理库，它使得状态管理简单可伸缩∶

- Action∶定义改变状态的动作函数，包括如何变更状态;
- Store∶ 集中管理模块状态（State）和动作(action)
- Derivation（衍生）∶ 从应用状态中派生而出，且没有任何其他影响的数据

**对比总结**

- redux将数据保存在单一的store中，mobx将数据保存在分散的多个store中
- redux使用`plain object`保存数据，需要手动处理变化后的操作;mobx适用`observable`保存数据，数据变化后自动处理响应的操作
- redux使用不可变状态，这意味着状态是只读的，不能直接去修改它，而是应该返回一个新的状态，同时使用纯函数;mobx中的状态是可变的，可以直接对其进行修改
- mobx相对来说比较简单，在其中有很多的抽象，mobx更多的使用面向对象的编程思维;redux会比较复杂，因为其中的函数式编程思想掌握起来不是那么容易，同时需要借助一系列的中间件来处理异步和副作用
- mobx中有更多的抽象和封装，调试会比较困难，同时结果也难以预测;而redux提供能够进行时间回溯的开发工具，同时其纯函数以及更少的抽象，让调试变得更加的容易

## Redux 和 Vuex 有什么区别，它们有什么共同思想吗？



## Redux 和 Vuex区别

**相同点**

- state 共享数据
- 流程一致：定义全局state，触发，修改state
- 原理相似，通过全局注入store。

**不同点**

- 从实现原理上来说：
  - Redux 使用的是不可变数据，而Vuex的数据是可变的。Redux每次都是用新的state替换旧的state，而Vuex是直接修改
  - Redux 在检测数据变化的时候，是通过 diff 的方式比较差异的，而Vuex其实和Vue的原理一样，是通过 getter/setter来比较的
- 从表现层来说：
  - vuex定义了state、getter、mutation、action四个对象；redux定义了state、reducer、action。
  - vuex中state统一存放，方便理解；reduxstate依赖所有reducer的初始值
  - vuex有getter,目的是快捷得到state；redux没有这层，react-redux mapStateToProps参数做了这个工作。
  - vuex中mutation只是单纯赋值(很浅的一层)；redux中reducer只是单纯设置新state(很浅的一层)。他俩作用类似，但书写方式不同
  - vuex中action有较为复杂的异步ajax请求；redux中action中可简单可复杂,简单就直接发送数据对象（{type:xxx, your-data}）,复杂需要调用异步ajax（依赖redux-thunk插件）。
  - vuex触发方式有两种commit同步和dispatch异步；redux同步和异步都使用dispatch

通俗点理解就是，vuex 弱化 dispatch，通过commit进行 store状态的一次更变；取消了action概念，不必传入特定的 action形式进行指定变更；弱化reducer，基于commit参数直接对数据进行转变，使得框架更加简易;

**共同思想**

- 单一的数据源
- 变化可以预测

本质上∶ redux与vuex都是对mvvm思想的服务，将数据从视图中抽离的一种方案。说说对 Redux 中间件的理解？常用的中间件有哪些？实现原理？

## Redux中的connect有什么作用？

connect负责连接React和Redux

**获取state**

connect 通过 context获取 Provider 中的 store，通过 store.getState() 获取整个store tree 上所有state

**包装原组件**

将state和action通过props的方式传入到原组件内部 `wrapWithConnect` 返回—个 `ReactComponent` 对象 Connect，Connect重新 render 外部传入的原组件 `WrappedComponent` ，并把 connect 中传入的 `mapStateToProps`，`mapDispatchToProps`与组件上原有的 props 合并后，通过属性的方式传给 `WrappedComponent`

**监听store tree变化**

connect缓存了`store tree`中state的状态，通过当前state状态 和变更前 state 状态进行比较，从而确定是否调用 `this.setState()`方法触发 Connect 及其子组件的重新渲染你在 React 项目中是如何使用 Redux 的? 项目结构是如何划分的？

## 为什么 useState 返回的是数组而不是对象？

useState 的用法：

```javascript
const [count, setCount] = useState(0)
```

可以看到 useState 返回的是一个数组，那么为什么是返回数组而不是返回对象呢？

要回答这个问题得弄明白 ES6 的解构赋值(destructring assignment)语法 , 来看 2 个简单的示例：

- 数组的解构赋值：

```javascript
const foo = ['one', 'two', 'three'];

const [red, yellow, green] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // "three"
```

- 对象的解构赋值：

```javascript
const user = {
    id: 42,
    is_verified: true
};

const { id, is_verified } = user;

console.log(id); // 42
console.log(is_verified); // true 
```

搞清楚了解构赋值，那上面的问题就比较好解释了。

如果 `useState` 返回数组，那么你可以顺便对数组中的变量命名，代码看起来也比较干净。而如果是对象的话返回的值必须和 `useState` 内部实现返回的对象同名，这样你只能在 `function component` 中使用一次，想要多次使用 `useState` 必须得重命名返回值。

```javascript
// 第一次使用
const { state, setState } = useState(false)
// 第二次使用
const { state: counter, setState: setCounter} = useState(0)
```

当然事情总是有两面性的，使用 array 也存在一些问题：

- 返回值强顺序，灵活性比较低。array[0] 为值，array[1] 为改变值的方法。
- 返回的值基本都得使用，对于有些返回值不想使用的话代码看起来有些怪，比如只想用 setState, 就得这么写：`const [, setState] = useState(false)`。
- 返回的参数不能太多，否则处理上面 2 个场景会很麻烦。

如果在自定义的Hook中遇到了以上几个问题，不妨试试返回 object。

简单总结一下，在自定义 hook 的时候可以遵循一个简单原则：当参数大于 2 个的时候返回值的类型返回 `object`， 否则返回数组。

## 说说你对 React Router 的理解？常用的 Router 组件有哪些？

## 说说 React Router 有几种模式，以及实现原理？

**一、是什么**

在单页应用中，一个`web`项目只有一个`html`页面，一旦页面加载完成之后，就不用因为用户的操作而进行页面的重新加载或者跳转，其特性如下：

- 改变 url 且不让浏览器向服务器发送请求
- 在不刷新页面的前提下动态改变浏览器地址栏中的URL地址

其中主要分成了两种模式：

- hash 模式：在url后面加上#，如http://127.0.0.1:5500/home/#/page1
- history 模式：允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录

**二、使用**

`React Router`对应的`hash`模式和`history`模式对应的组件为：

- HashRouter
- BrowserRouter

这两个组件的使用都十分的简单，作为最顶层组件包裹其他组件，如下所示

```javascript
// 1.import { BrowserRouter as Router } from "react-router-dom";
// 2.import { HashRouter as Router } from "react-router-dom";

import React from 'react';
import {
  BrowserRouter as Router,
  // HashRouter as Router  
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Backend from './pages/Backend';
import Admin from './pages/Admin';


function App() {
  return (
    <Router>
        <Route path="/login" component={Login}/>
        <Route path="/backend" component={Backend}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/" component={Home}/>
    </Router>
  );
}

export default App;
```

**三、实现原理**

路由描述了 `URL` 与 `UI `之间的映射关系，这种映射是单向的，即 URL 变化引起 UI 更新（无需刷新页面）

下面以`hash`模式为例子，改变`hash`值并不会导致浏览器向服务器发送请求，浏览器不发出请求，也就不会刷新页面

`hash` 值改变，触发全局 `window` 对象上的 `hashchange` 事件。所以 `hash` 模式路由就是利用 `hashchange` 事件监听 `URL` 的变化，从而进行 `DOM` 操作来模拟页面跳转

`react-router`也是基于这个特性实现路由的跳转

下面以`HashRouter`组件分析进行展开：

**HashRouter**

`HashRouter`包裹了整应用，

通过`window.addEventListener('hashChange',callback)`监听`hash`值的变化，并传递给其嵌套的组件

然后通过`context`将`location`数据往后代组件传递，如下：

```javascript
import React, { Component } from 'react';
import { Provider } from './context'
// 该组件下Api提供给子组件使用
class HashRouter extends Component {
  constructor() {
    super()
    this.state = {
      location: {
        pathname: window.location.hash.slice(1) || '/'
      }
    }
  }
  // url路径变化 改变location
  componentDidMount() {
    window.location.hash = window.location.hash || '/'
    window.addEventListener('hashchange', () => {
      this.setState({
        location: {
          ...this.state.location,
          pathname: window.location.hash.slice(1) || '/'
        }
      }, () => console.log(this.state.location))
    })
  }
  render() {
    let value = {
      location: this.state.location
    }
    return (
      <Provider value={value}>
        {
          this.props.children
        }
      </Provider>
    );
  }
}

export default HashRouter;
```

**Router**

`Router`组件主要做的是通过`BrowserRouter`传过来的当前值，通过`props`传进来的`path`与`context`传进来的`pathname`进行匹配，然后决定是否执行渲染组件

```javascript
复制import React, { Component } from 'react';
import { Consumer } from './context'
const { pathToRegexp } = require("path-to-regexp");
class Route extends Component {
  render() {
    return (
      <Consumer>
        {
          state => {
            console.log(state)
            let {path, component: Component} = this.props
            let pathname = state.location.pathname
            let reg = pathToRegexp(path, [], {end: false})
            // 判断当前path是否包含pathname
            if(pathname.match(reg)) {
              return <Component></Component>
            }
            return null
          }
        }
      </Consumer>
    );
  }
}
export default Route;
```



## 说说 React render 方法的原理？在什么时候会被触发？



## React Fiber是什么？

**Fiber 出现的背景**

首先要知道的是，JavaScript 引擎和页面渲染引擎两个线程是互斥的，当其中一个线程执行时，另一个线程只能挂起等待。

在这样的机制下，如果 JavaScript 线程长时间地占用了主线程，那么渲染层面的更新就不得不长时间地等待，界面长时间不更新，会导致页面响应度变差，用户可能会感觉到卡顿。

而这正是 React 15 的 Stack Reconciler 所面临的问题，即是 JavaScript 对主线程的超时占用问题。Stack Reconciler 是一个同步的递归过程，使用的是 JavaScript 引擎自身的函数调用栈，它会一直执行到栈空为止，所以当 React 在渲染组件时，从开始到渲染完成整个过程是一气呵成的。如果渲染的组件比较庞大，js 执行会占据主线程较长时间，会导致页面响应度变差。

而且所有的任务都是按照先后顺序，没有区分优先级，这样就会导致优先级比较高的任务无法被优先执行。

**Fiber 是什么**

Fiber 的中文翻译叫纤程，与进程、线程同为程序执行过程，Fiber 就是比线程还要纤细的一个过程。纤程意在对渲染过程实现进行更加精细的控制。

从架构角度来看，Fiber 是对 React 核心算法（即调和过程）的重写。

从编码角度来看，Fiber 是 React 内部所定义的一种数据结构，它是 Fiber 树结构的节点单位，也就是 React 16 新架构下的"虚拟 DOM"。

一个 fiber 就是一个 JavaScript 对象，Fiber 的数据结构如下：

```javascript
type Fiber = {
  // 用于标记fiber的WorkTag类型，主要表示当前fiber代表的组件类型如FunctionComponent、ClassComponent等
  tag: WorkTag,
  // ReactElement里面的key
  key: null | string,
  // ReactElement.type，调用`createElement`的第一个参数
  elementType: any,
  // The resolved function/class/ associated with this fiber.
  // 表示当前代表的节点类型
  type: any,
  // 表示当前FiberNode对应的element组件实例
  stateNode: any,

  // 指向他在Fiber节点树中的`parent`，用来在处理完这个节点之后向上返回
  return: Fiber | null,
  // 指向自己的第一个子节点
  child: Fiber | null,
  // 指向自己的兄弟结构，兄弟节点的return指向同一个父节点
  sibling: Fiber | null,
  index: number,

  ref: null | (((handle: mixed) => void) & { _stringRef: ?string }) | RefObject,

  // 当前处理过程中的组件props对象
  pendingProps: any,
  // 上一次渲染完成之后的props
  memoizedProps: any,

  // 该Fiber对应的组件产生的Update会存放在这个队列里面
  updateQueue: UpdateQueue<any> | null,

  // 上一次渲染的时候的state
  memoizedState: any,

  // 一个列表，存放这个Fiber依赖的context
  firstContextDependency: ContextDependency<mixed> | null,

  mode: TypeOfMode,

  // Effect
  // 用来记录Side Effect
  effectTag: SideEffectTag,

  // 单链表用来快速查找下一个side effect
  nextEffect: Fiber | null,

  // 子树中第一个side effect
  firstEffect: Fiber | null,
  // 子树中最后一个side effect
  lastEffect: Fiber | null,

  // 代表任务在未来的哪个时间点应该被完成，之后版本改名为 lanes
  expirationTime: ExpirationTime,

  // 快速确定子树中是否有不在等待的变化
  childExpirationTime: ExpirationTime,

  // fiber的版本池，即记录fiber更新过程，便于恢复
  alternate: Fiber | null,
}
```

**Fiber 如何解决问题的**

Fiber 把一个渲染任务分解为多个渲染任务，而不是一次性完成，把每一个分割得很细的任务视作一个"执行单元"，React 就会检查现在还剩多少时间，如果没有时间就将控制权让出去，故任务会被分散到多个帧里面，中间可以返回至主进程控制执行其他任务，最终实现更流畅的用户体验。

即是实现了"增量渲染"，实现了可中断与恢复，恢复后也可以复用之前的中间状态，并给不同的任务赋予不同的优先级，其中每个任务更新单元为 React Element 对应的 Fiber 节点。

**Fiber 实现原理**

实现的方式是requestIdleCallback这一 API，但 React 团队 polyfill 了这个 API，使其对比原生的浏览器兼容性更好且拓展了特性。

> window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间 timeout，则有可能为了在超时前执行函数而打乱执行顺序。

requestIdleCallback回调的执行的前提条件是当前浏览器处于空闲状态。

即requestIdleCallback的作用是在浏览器一帧的剩余空闲时间内执行优先度相对较低的任务。首先 React 中任务切割为多个步骤，分批完成。在完成一部分任务之后，将控制权交回给浏览器，让浏览器有时间再进行页面的渲染。等浏览器忙完之后有剩余时间，再继续之前 React 未完成的任务，是一种合作式调度。

简而言之，由浏览器给我们分配执行时间片，我们要按照约定在这个时间内执行完毕，并将控制权还给浏览器。

React 16 的Reconciler基于 Fiber 节点实现，被称为 Fiber Reconciler。

作为静态的数据结构来说，每个 Fiber 节点对应一个 React element，保存了该组件的类型（函数组件/类组件/原生组件等等）、对应的 DOM 节点等信息。

作为动态的工作单元来说，每个 Fiber 节点保存了本次更新中该组件改变的状态、要执行的工作。

每个 Fiber 节点有个对应的 React element，多个 Fiber 节点是如何连接形成树呢？靠如下三个属性：

```javascript
复制// 指向父级Fiber节点
this.return = null
// 指向子Fiber节点
this.child = null
// 指向右边第一个兄弟Fiber节点
this.sibling = null
```

## Fiber 为什么是 React 性能的一个飞跃？

React Fiber 架构是 React 性能飞跃的核心原因，其通过以下机制彻底改变了 React 的渲染和协调过程，解决了旧版架构的性能瓶颈：

**1. 异步可中断渲染机制**

旧版 React（16 之前）采用 **同步递归更新**，一旦开始渲染就无法中断，导致主线程长时间被占用，用户交互（如点击、滚动）无法及时响应，页面卡顿明显。  
Fiber 通过以下方式实现异步可中断渲染：
- **任务拆分**：将组件树遍历拆分为多个独立的小任务（Fiber 节点），每个任务仅处理一个组件节点。
- **时间切片**：利用浏览器的空闲时间（通过 `requestIdleCallback` 或 `MessageChannel` 模拟）分批次执行任务，避免单次渲染超过 16ms（一帧时间）导致丢帧。
- **中断与恢复**：任务执行过程中可随时中断，优先处理高优先级任务（如用户点击），之后从中断点继续执行，确保交互流畅性。

**2. 优先级调度与增量渲染**

Fiber 引入 **动态优先级机制**，根据任务类型分配优先级（如用户交互为最高优先级），并动态调整执行顺序：
- **优先级分类**：包括 Immediate（立即执行）、UserBlocking（用户交互相关）、Normal（普通更新）等，确保关键操作优先处理。
- **增量渲染**：将 DOM 更新分批提交，避免一次性大规模操作触发多次重排/重绘，减少浏览器计算开销。

**3. 链表结构与双缓冲技术**

Fiber 使用 **链表结构替代递归树**，通过 `child`、`sibling`、`return` 指针实现高效遍历，支持灵活的中断和恢复：
- **双缓冲机制**：维护两棵 Fiber 树（`current` 和 `workInProgress`），更新时在内存中构建新树，完成后直接切换，避免界面闪烁。
- **副作用链表**：在协调阶段收集需要更新的节点（如 DOM 修改），提交阶段一次性处理，减少真实 DOM 操作次数。

**4. 性能优化与错误处理**

- **错误边界**：每个 Fiber 节点可捕获子树的错误，防止整个应用崩溃，并展示降级 UI，提升健壮性。
- **高效 Diff 算法**：通过同级比较、`key` 优化，将 Diff 复杂度从 O(n³) 降至 O(n)，减少不必要的计算。
- **复用节点**：在更新时复用旧 Fiber 节点，减少内存分配和垃圾回收开销。

**5. 支持未来特性**

Fiber 为 React 的 **并发模式（Concurrent Mode）** 和高级功能（如 Suspense、渐进式 Hydration）奠定基础：
- **并发渲染**：允许同时处理多个更新任务，提升复杂场景（如数据预加载、动画并行）的性能。
- **时间切片扩展性**：通过调度器（Scheduler）实现更精细的任务控制，适应不同设备性能需求。

**总结**

React Fiber 通过 **异步可中断渲染、优先级调度、链表数据结构** 和 **双缓冲技术**，将同步阻塞式更新转变为异步增量式更新，解决了旧版架构的卡顿问题，显著提升了复杂应用的用户体验。其设计不仅优化了性能，还为 React 生态的未来扩展提供了技术基础。



## React Fiber 是如何实现更新过程可控？

React Fiber 通过以下核心机制实现了更新过程的可控性，解决了旧版同步递归更新导致的性能瓶颈，提升了用户体验：

**1. 任务拆分与时间分片**

- **化整为零**：将调和阶段（Reconciler）的虚拟 DOM 递归遍历拆分为多个小任务，每个任务仅处理一个 Fiber 节点。例如，一个包含多层嵌套的组件会被分解为多个独立任务（如处理 div、文本节点等）。
- **时间分片（Time Slicing）**：利用浏览器的空闲时间（通过 `requestIdleCallback` 或其 Polyfill）分批次执行任务，每帧最多执行 16ms 的任务，避免阻塞主线程。若当前帧时间不足，则挂起任务，下一帧继续执行。

**2. 可中断与恢复的链表结构**

- **链表替代递归栈**：Fiber 使用多向链表（如 `child`、`sibling`、`return` 指针）表示组件树，替代了旧版的递归调用栈。链表结构允许灵活调整遍历顺序，并支持随时中断和恢复任务。
- **双缓冲机制**：
  - **workInProgress tree**：当前正在构建的新 Fiber 树，记录更新过程中的副作用（如 DOM 修改）。
  - **current tree**：上一次渲染完成的 Fiber 树，用于与 workInProgress 树进行 Diff 比较。
  - 两棵树通过 `alternate` 属性关联，更新完成后 workInProgress 树会替换 current 树，减少内存分配开销。

**3. 优先级调度与动态调整**

- **任务优先级**：根据任务类型（如用户交互、动画、数据加载）动态分配优先级，高优先级任务（如点击事件）可抢占低优先级任务（如渲染）的执行权。优先级通过 `expirationTime` 实现，过期任务必须立即执行。
- **调度器（Scheduler）**：React 实现了自己的调度逻辑，通过循环检查任务优先级和剩余时间，决定是否继续执行、挂起或终止任务。例如，若新任务优先级更高，则终止当前任务并重新构建 workInProgress 树。

**4. 副作用收集与批量提交**

- **副作用链表**：在调和阶段，每个 Fiber 节点会记录自身的副作用（如 DOM 更新、生命周期调用），最终形成一条副作用链表。提交阶段（Commit Phase）会一次性处理链表中的所有副作用，确保 DOM 更新连续无闪烁。
- **错误边界**：Fiber 节点的链表结构允许捕获子树中的错误，防止整个应用崩溃，同时展示降级 UI。

**5. 挂起、恢复与终止的实现**

- **挂起**：当一帧时间不足时，记录当前处理到的 Fiber 节点，让出主线程控制权。
- **恢复**：浏览器空闲时，从上次中断的节点继续遍历链表，生成下一个任务。
- **终止**：若在调和过程中触发更高优先级任务，则终止当前任务，重新开始构建 workInProgress 树。

**总结**

React Fiber 通过 **任务分片、链表遍历、优先级调度、双缓冲机制** 实现了更新过程的可控性，解决了同步阻塞渲染导致的卡顿问题。其核心优势包括：
1. **响应性提升**：用户交互和动画可优先执行，避免界面冻结。
2. **高效渲染**：通过时间分片和副作用批量提交，减少浏览器重排/重绘次数。
3. **扩展性增强**：为并发模式（Concurrent Mode）、Suspense 等高级特性奠定基础。

这些机制共同确保了 React 在复杂应用场景下的流畅性和稳定性。



## React 有哪些性能优化的方法？

以下是 React 性能优化的主要方法，结合实践场景和底层原理，综合整理如下：

**1. 减少不必要的渲染**

- **使用 `React.memo` 和 `PureComponent`**  
  通过浅层比较（shallow comparison）避免组件在 props/state 未变化时重新渲染。`React.memo` 用于函数组件，`PureComponent` 用于类组件。
- **优化 `useCallback` 和 `useMemo`**  
  - `useCallback` 缓存函数引用，避免子组件因函数引用变化触发渲染。
  - `useMemo` 缓存计算结果，避免重复执行高开销运算（如大数据处理）。
- **避免内联对象和匿名函数**  
  内联对象或函数会导致每次渲染生成新引用，破坏浅比较优化。应通过 `useMemo` 或 `useCallback` 稳定引用。

**2. 按需加载与代码分割**

- **懒加载组件**  
  使用 `React.lazy` + `Suspense` 动态加载非首屏组件，减少初始包体积。适用于路由跳转或用户触发的组件加载（如弹窗）。
- **虚拟列表（Virtualization）**  
  仅渲染可视区域内的列表项，避免长列表全量渲染。推荐使用 `react-window` 或 `react-virtualized`。

**3. 优化 DOM 操作与渲染流程**

- **批量更新状态**  
  在 React 18+ 中，自动批量处理 `setState`，减少渲染次数。对于旧版本，可使用 `unstable_batchedUpdates` 手动合并更新。
- **调整 CSS 替代组件卸载**  
  通过 `opacity: 0` 或 `visibility: hidden` 隐藏复杂组件，而非卸载后重新挂载，减少 DOM 操作成本。
- **使用 `React.Fragment` 减少冗余 DOM**  
  避免在组件中包裹不必要的父元素，减少页面节点数量。

**4. 控制副作用与异步行为**

- **防抖（Debounce）与节流（Throttle）**  
  高频事件（如搜索输入、滚动）中，通过 `lodash.debounce` 或 `lodash.throttle` 限制回调触发频率，减少计算或请求开销。
- **分离副作用到 `useEffect`**  
  避免在渲染函数中执行网络请求或订阅操作，确保渲染逻辑纯粹。

**5. 状态管理与架构优化**

- **扁平化组件层级**  
  减少深层嵌套组件，降低 Diff 算法复杂度。
- **使用不可变数据**  
  通过 `immer` 或展开运算符生成新对象引用，避免因引用未变导致浅比较失效。
- **优先级调度（Concurrent Mode）**  
  React 18+ 的并发模式允许中断低优先级任务（如数据预加载），优先响应用户交互（如点击）。

**6. 工具与调试**

- **生产环境构建**  
  启用代码压缩和 React 生产模式，移除开发环境警告和调试代码。
- **性能分析工具**  
  使用 `React DevTools Profiler` 定位渲染瓶颈，结合 Chrome Performance 面板分析运行时性能。

**总结**

以上方法覆盖了 React 性能优化的核心方向：**减少渲染次数**、**降低计算开销**、**优化资源加载**和**精细化控制渲染流程**。实际项目中需结合具体场景选择组合策略（如高频交互场景优先防抖/节流，长列表使用虚拟化）。更多细节可参考以下来源：[React 性能优化完全指南](https://www.hellobit.com.cn/doc/2021/4/7/819.html)、[React.memo 与 useMemo 实践](https://avoid.overfit.cn/post/74f83a62d6744fd19674006eed5da9c9)。

## React中的路由懒加载是什么？原理是什么？

**React.lazy 是什么**

随着前端应用体积的扩大，资源加载的优化是我们必须要面对的问题，动态代码加载就是其中的一个方案。

webpack 提供了符合 ECMAScript 提案 的 import() 语法 ，让我们来实现动态地加载模块（注：require.ensure 与 import() 均为 webpack 提供的代码动态加载方案，在 webpack 2.x 中，require.ensure 已被 import 取代）。

在 React 16.6 版本中，新增了 React.lazy 函数，它能让你像渲染常规组件一样处理动态引入的组件，配合 webpack 的 Code Splitting ，只有当组件被加载，对应的资源才会导入 ，从而达到懒加载的效果。

**使用 React.lazy**

在实际的使用中，首先是引入组件方式的变化：

```javascript
// 不使用 React.lazy
import OtherComponent from './OtherComponent';
// 使用 React.lazy
const OtherComponent = React.lazy(() => import('./OtherComponent'))
```

React.lazy 接受一个函数作为参数，这个函数需要调用 import() 。它需要返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件。

React.lazy 方法返回的是一个 lazy 组件的对象，类型是 react.lazy，并且 lazy 组件具有 _status 属性，与 Promise 类似它具有 Pending、Resolved、Rejected 三个状态，分别代表组件的加载中、已加载、和加载失败三中状态。

需要注意的一点是，React.lazy 需要配合 Suspense 组件一起使用，在 Suspense 组件中渲染 React.lazy 异步加载的组件。如果单独使用 React.lazy，React 会给出错误提示。

**实现原理**

**Webpack 动态加载**

上面使用了 import() 语法，webpack 检测到这种语法会自动代码分割。使用这种动态导入语法代替以前的静态引入，可以让组件在渲染的时候，再去加载组件对应的资源，这个异步加载流程的实现机制是怎么样呢？

webpack 是通过创建 script 标签来实现动态加载的，找出依赖对应的 chunk 信息，然后生成 script 标签来动态加载 chunk，每个 chunk 都有对应的状态：未加载 、 加载中、已加载 。

**Suspense 组件**

Suspense 内部主要通过捕获组件的状态去判断如何加载，上面我们提到 React.lazy 创建的动态加载组件具有 Pending、Resolved、Rejected 三种状态，当这个组件的状态为 Pending 时显示的是 Suspense 中 fallback 的内容，只有状态变为 resolve 后才显示组件。

**Error Boundaries 处理资源加载失败场景**

如果遇到网络问题或是组件内部错误，页面的动态资源可能会加载失败，为了优雅降级，可以使用 Error Boundaries 来解决这个问题。

Error Boundaries 是一种组件，如果你在组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 生命周期函数，它就会成为一个 Error Boundaries 的组件。

它的用法也非常的简单，可以直接当作一个组件去使用，如下：

```html
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

**总结**

React.lazy() 和 React.Suspense 的提出为现代 React 应用的性能优化和工程化提供了便捷之路。 React.lazy 可以让我们像渲染常规组件一样处理动态引入的组件，结合 Suspense 可以更优雅地展现组件懒加载的过渡动画以及处理加载异常的场景。



## 说说 React 服务端渲染怎么做？原理是什么？

## 说说 React Jsx 转换成真实 DOM 过程？

## 说说你对 immutable 的理解？如何应用在 react 项目中？

## 什么是受控组件？

**受控组件**（Controlled Component）是指一个表单元素的值由 React 组件的状态（`state`）控制，而不是由 DOM 元素自身控制。也就是说，表单元素的值和状态都是由 React 组件的 `state` 进行管理的，表单元素的值由组件的 `state` 决定，并通过事件处理函数来更新 `state`。

**受控组件的特点**

1. **状态管理**：
   - **由组件状态控制**：受控组件的表单元素（如 `<input>`、`<textarea>` 和 `<select>`）的值由 React 组件的 `state` 控制。表单元素的值始终与组件的 `state` 保持同步。
2. **单向数据流**：
   - **从上到下**：表单元素的值由组件的 `state` 决定，当用户输入或选择时，事件处理函数会更新组件的 `state`，进而重新渲染表单元素。数据流是单向的，即数据从组件的 `state` 流向表单元素。
3. **事件处理**：
   - **更新状态**：每当用户对表单元素进行交互时（如输入文本、选择选项），会触发相应的事件处理函数，这些函数会更新组件的 `state`。组件的 `render` 方法会根据更新后的 `state` 重新渲染表单元素。

**受控组件的示例**

以下是一个使用受控组件的示例，其中 `<input>` 元素的值由组件的 `state` 控制：

```javascript
复制import React, { useState } from 'react';

function ControlledForm() {
  // 初始化状态
  const [value, setValue] = useState('');

  // 处理输入变化的函数
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // 处理表单提交的函数
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('提交的值: ' + value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        输入内容:
        {/* 受控组件 */}
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <button type="submit">提交</button>
    </form>
  );
}

export default ControlledForm;
```

## 说说 react 中引入 css 的方式有哪几种？区别？

**一、是什么**

组件式开发选择合适的`css`解决方案尤为重要

通常会遵循以下规则：

- 可以编写局部css，不会随意污染其他组件内的原生；
- 可以编写动态的css，可以获取当前组件的一些状态，根据状态的变化生成不同的css样式；
- 支持所有的css特性：伪类、动画、媒体查询等；
- 编写起来简洁方便、最好符合一贯的css风格特点

在这一方面，`vue`使用`css`起来更为简洁：

- 通过 style 标签编写样式
- scoped 属性决定编写的样式是否局部有效
- lang 属性设置预处理器
- 内联样式风格的方式来根据最新状态设置和改变css

而在`react`中，引入`CSS`就不如`Vue`方便简洁，其引入`css`的方式有很多种，各有利弊

**二、方式**

常见的`CSS`引入方式有以下：

- 在组件内直接使用
- 组件中引入 .css 文件
- 组件中引入 .module.css 文件
- CSS in JS

**在组件内直接使用**

直接在组件中书写`css`样式，通过`style`属性直接引入，如下：

```javascript
import React, { Component } from "react";

const div1 = {
  width: "300px",
  margin: "30px auto",
  backgroundColor: "#44014C",  //驼峰法
  minHeight: "200px",
  boxSizing: "border-box"
};

class Test extends Component {
  constructor(props, context) {
    super(props);
  }
 
  render() {
    return (
     <div>
       <div style={div1}>123</div>
       <div style={{backgroundColor:"red"}}>
     </div>
    );
  }
}

export default Test;
```

上面可以看到，`css`属性需要转换成驼峰写法

这种方式优点：

- 内联样式, 样式之间不会有冲突
- 可以动态获取当前state中的状态

缺点：

- 写法上都需要使用驼峰标识
- 某些样式没有提示
- 大量的样式, 代码混乱
- 某些样式无法编写(比如伪类/伪元素)

**组件中引入css文件**

将`css`单独写在一个`css`文件中，然后在组件中直接引入

`App.css`文件：

```javascript
.title {
  color: red;
  font-size: 20px;
}

.desc {
  color: green;
  text-decoration: underline;
}
```

组件中引入：

```javascript
import React, { PureComponent } from 'react';

import Home from './Home';

import './App.css';

export default class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <h2 className="title">我是App的标题</h2>
        <p className="desc">我是App中的一段文字描述</p >
        <Home/>
      </div>
    )
  }
}
```

这种方式存在不好的地方在于样式是全局生效，样式之间会互相影响

**组件中引入 .module.css 文件**

将`css`文件作为一个模块引入，这个模块中的所有`css`，只作用于当前组件。不会影响当前组件的后代组件

这种方式是`webpack`特工的方案，只需要配置`webpack`配置文件中`modules:true`即可

```javascript
import React, { PureComponent } from 'react';

import Home from './Home';

import './App.module.css';

export default class App extends PureComponent {
  render() {
    return (
      <div className="app">
        <h2 className="title">我是App的标题</h2>
        <p className="desc">我是App中的一段文字描述</p >
        <Home/>
      </div>
    )
  }
}
```

这种方式能够解决局部作用域问题，但也有一定的缺陷：

- 引用的类名，不能使用连接符(.xxx-xx)，在 JavaScript 中是不识别的
- 所有的 className 都必须使用 {style.className} 的形式来编写
- 不方便动态来修改某些样式，依然需要使用内联样式的方式；

**CSS in JS**

CSS-in-JS， 是指一种模式，其中`CSS`由 `JavaScript `生成而不是在外部文件中定义

此功能并不是 React 的一部分，而是由第三方库提供，例如：

- styled-components
- emotion
- glamorous

下面主要看看`styled-components`的基本使用

本质是通过函数的调用，最终创建出一个组件：

- 这个组件会被自动添加上一个不重复的class
- styled-components会给该class添加相关的样式

基本使用如下：

创建一个`style.js`文件用于存放样式组件：

```javascript
export const SelfLink = styled.div`
  height: 50px;
  border: 1px solid red;
  color: yellow;
`;

export const SelfButton = styled.div`
  height: 150px;
  width: 150px;
  color: ${props => props.color};
  background-image: url(${props => props.src});
  background-size: 150px 150px;
`;
```

引入样式组件也很简单：

```javascript
import React, { Component } from "react";

import { SelfLink, SelfButton } from "./style";

class Test extends Component {
  constructor(props, context) {
    super(props);
  }  
 
  render() {
    return (
     <div>
       <SelfLink title="People's Republic of China">app.js</SelfLink>
       <SelfButton color="palevioletred" style={{ color: "pink" }} src={fist}>
          SelfButton
        </SelfButton>
     </div>
    );
  }
}

export default Test;
```

**三、区别**

通过上面四种样式的引入，可以看到：

- 在组件内直接使用`css`该方式编写方便，容易能够根据状态修改样式属性，但是大量的演示编写容易导致代码混乱
- 组件中引入 .css 文件符合我们日常的编写习惯，但是作用域是全局的，样式之间会层叠
- 引入.module.css 文件能够解决局部作用域问题，但是不方便动态修改样式，需要使用内联的方式进行样式的编写
- 通过css in js 这种方法，可以满足大部分场景的应用，可以类似于预处理器一样样式嵌套、定义、修改状态等

至于使用`react`用哪种方案引入`css`，并没有一个绝对的答案，可以根据各自情况选择合适的方案

## React中为什么要给组件设置 key？

在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。

在 React Diff 算法中React 会借助元素的 Key 值来判断该元素是新创建的还是被移动而来的元素，从而减少不必要的元素重新渲染。

此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系。

## 为什么不能用数组下标来作为react组件中的key？

react 使用diff算法，使用key来做同级比对。如果使用数组下标作为key，有以下情况：

- 在数组头部或中部插入或删除元素： 所有key对应的节点的值发生更改，进行重新渲染。造成性能损耗
- 而如果使用数组中唯一值来作为key：不管是在何处插入或删除节点，其他key对应的节点的值未发生更改，只需插入或删除操作的数组节点。

## setState 是同步，还是异步的？

**react18之前**

setState在不同情况下可以表现为异步或同步。

在Promise的状态更新、js原生事件、setTimeout、setInterval..中是同步的。

在react的合成事件中，是异步的。

**react18之后**

setState都会表现为异步（即批处理）。
[官方详细说明。](https://github.com/reactwg/react-18/discussions/21)

**react18之前版本的解释**

在React中，如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state 。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。

原因： 在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state。

注意： setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

综上，setState 只在合成事件和 hook() 中是“异步”的，在 原生事件和 setTimeout 中都是同步的。

## setState 之后发生了什么

**简单版本**： React 利用状态队列机制实现了 setState 的“异步”更新，避免频繁的重复更新 state。

首先将新的 state 合并到状态更新队列中，然后根据更新队列和 shouldComponentUpdate 的状态来判断是否需要更新组件。

**复杂版本**：

- enqueueSetState 将 state 放入队列中，并调用 enqueueUpdate 处理要更新的 Component
- 如果组件当前正处于 update 事务中，则先将 Component 存入 dirtyComponent 中。否则调用batchedUpdates 处理。
- batchedUpdates 发起一次 transaction.perform() 事务
- 开始执行事务初始化，运行，结束三个阶段
  - 初始化：事务初始化阶段没有注册方法，故无方法要执行
  - 运行：执行 setSate 时传入的 callback 方法
  - 结束：更新 isBatchingUpdates 为 false，并执行 FLUSH_BATCHED_UPDATES 这个 wrapper 中的close方法，FLUSH_BATCHED_UPDATES在close阶段，会循环遍历所有的 dirtyComponents，调用updateComponent 刷新组件，并执行它的 pendingCallbacks, 也就是 setState 中设置的 callback。

## 在 shouldComponentUpdate 或 componentWillUpdate 中使用 setState 会发生什么？

当调用 setState 的时候，实际上会将新的 state 合并到状态更新队列中，并对 partialState 以及 _pendingStateQueue 更新队列进行合并操作。最终通过 enqueueUpdate 执行 state 更新。

如果在 shouldComponentUpdate 或 componentWillUpdate 中使用 setState，会使得 state 队列（_pendingStateQueue）不为 null，从而调用 updateComponent 方法，updateComponent 中会继续调用 shouldComponentUpdate 和 componentWillUpdate，因此造成死循环。



## React 中的 ref 有什么用？

使用 refs 获取。组件被调用时会新建一个该组件的实例。refs 会指向这个实例，可以是一个回调函数，回调函数会在组件被挂载后立即执行。

如果把 refs 放到原生 DOM 组件的 input 中，我们就可以通过 refs 得到 DOM 节点；如果把 refs 放到 React 组件中，那么我们获得的就是组件的实例，因此就可以调用实例的方法（如果想访问该组件的真实 DOM，那么可以用 React.findDOMNode 来找到 DOM 节点，但是不推崇此方法）。

refs 无法用于无状态组件，无状态组件挂载时只是方法调用，没有新建实例。在 v16 之后，可以使用 useRef。



## React.PureComponent 和 React.Component 有什么区别？

PureComponent 和 Component的区别是：Component需要手动实现 shouldComponentUpdate，而 PureComponent 通过浅对比默认实现了 shouldComponentUpdate 方法。

浅比较(shallowEqual)，即react源码中的一个函数，然后根据下面的方法进行是不是PureComponent的判断，帮我们做了本来应该我们在 shouldComponentUpdate 中做的事情

```javascript
if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate = !shallowEqual(prevProps, nextProps) || ! shallowEqual(inst.state, nextState);
}
```

注意： 浅比较只比较了第一层，复杂数据结构可能会导致更新问题

总结: PureComponent 不仅会影响本身，而且会影响子组件，所以 PureComponent 最佳情况是展示组件

## 如何在React中应用样式？

将样式应用于React组件有三种方法。

**外部样式表**

在此方法中，你可以将外部样式表导入到组件使用类中。 但是你应该使用className而不是class来为React元素应用样式, 这里有一个例子。

```javascript
import React from 'react';
import './App.css';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Dashboard } from './dashboard/dashboard';
import { UserDisplay } from './userdisplay';

function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
      <UserDisplay />
      <Footer />
    </div>
  );
}

export default App;
```

**内联样式**

在这个方法中，我们可以直接将 props 传递给HTML元素，属性为style。这里有一个例子。这里需要注意的重要一点是，我们将javascript对象传递给style，这就是为什么我们使用 `backgroundColor` 而不是CSS方法`backbackground-color`。

```javascript
import React from 'react';

export const Header = () => {

    const heading = 'TODO App'

    return(
        <div style={{backgroundColor:'orange'}}>
            <h1>{heading}</h1>
        </div>
    )
}
```

**定义样式对象并使用它**

因为我们将javascript对象传递给style属性，所以我们可以在组件中定义一个style对象并使用它。下面是一个示例，你也可以将此对象作为 props 传递到组件树中。

```javascript
复制import React from 'react';

const footerStyle = {
    width: '100%',
    backgroundColor: 'green',
    padding: '50px',
    font: '30px',
    color: 'white',
    fontWeight: 'bold'
}

export const Footer = () => {
    return(
        <div style={footerStyle}>
            All Rights Reserved 2019
        </div>
    )
}
```

## React 中，怎么实现父组件调用子组件中的方法？

要实现父组件调用子组件中的方法，需要通过以下步骤进行操作：

1. 在子组件中，创建一个公开的方法。这可以通过在子组件类中定义一个方法或者使用 React Hooks 中的 `useImperativeHandle` 来实现。

   - 如果是类组件，可以在子组件类中定义一个方法，并将其挂载到实例上。例如：

     ```javascript
     class ChildComponent extends React.Component {
       childMethod() {
         // 子组件中需要执行的操作
       }
     
       render() {
         // 子组件的渲染逻辑
       }
     }
     ```

   - 如果是函数式组件，可以使用 `useImperativeHandle` Hook 将指定的方法暴露给父组件。例如：

     ```javascript
     import { forwardRef, useImperativeHandle } from 'react';
     
     function ChildComponent(props, ref) {
       useImperativeHandle(ref, () => ({
         childMethod() {
           // 子组件中需要执行的操作
         }
       }));
     
       // 子组件的渲染逻辑
     }
     
     export default forwardRef(ChildComponent);
     ```

2. 在父组件中，首先引用或创建对子组件的引用。可以使用 `ref` 对象来保存对子组件的引用。

   - 如果是类组件，可以使用 `createRef` 创建一个 `ref` 对象，并将其传递给子组件的 `ref` prop。例如：

     ```javascript
     class ParentComponent extends React.Component {
       constructor(props) {
         super(props);
         this.childRef = React.createRef();
       }
     
       handleClick() {
         // 调用子组件的方法
         this.childRef.current.childMethod();
       }
     
       render() {
         return (
           <div>
             <ChildComponent ref={this.childRef} />
             <button onClick={() => this.handleClick()}>调用子组件方法</button>
           </div>
         );
       }
     }
     ```

   - 如果是函数式组件，可以使用 `useRef` 创建一个 `ref` 对象，并将其传递给子组件的 `ref` prop。例如：

     ```javascript
     function ParentComponent() {
       const childRef = useRef(null);
     
       const handleClick = () => {
         // 调用子组件的方法
         childRef.current.childMethod();
       };
     
       return (
         <div>
           <ChildComponent ref={childRef} />
           <button onClick={handleClick}>调用子组件方法</button>
         </div>
       );
     }
     ```

通过以上步骤，父组件就能够成功调用子组件中暴露的方法了。请注意，在函数式组件中，需要使用 `forwardRef` 来包裹子组件，并通过 `ref` 参数来定义暴露的方法。

## React中，能否直接将 props 的值复制给 state？

应该避免这种写法：

```javascript
constructor(props) {
 super(props);
 // 不要这样做
 this.state = { color: props.color };
}
```

因为这样做毫无必要（你可以直接使用 this.props.color），同时还产生了 bug（更新 prop 中的 color 时，并不会影响 state）。

只有在你刻意忽略 prop 更新的情况下使用。

此时，应将 prop 重命名为 initialColor 或 defaultColor。必要时，你可以修改它的 key，以强制 **重置** 其内部 state。

## useMemo和useCallback 的区别及使用场景?

useMemo 和 useCallback 接收的参数都是一样，第一个参数为回调，第二个参数为要依赖的数据
共同作用:
仅仅依赖数据发生变化，才会重新计算结果，也就是起到缓存的作用，
两者区别:
1.useMemo 计算结果是 return 回来的值,主要用于缓存计算结果的值。应用场景如:需要进行二次计算的状态

2.useCallback 计算结果是函数,主要用于缓存函数，应用场景如:需要缓存的函数，因为函数式组件每次任何一个state 的变化，整个组件都会被重新刷新，一些函数是没有必要被重新刷新的，此时就应该缓存起来，提高性能，和减少资源浪费。

## 谈一谈你对 React 中 Fiber 的理解以及什么是 Fiber 双缓冲?

- **FiberNode 作为一种架构:**在 React v15 以及之前的版本中，Reconceiler 采用的是递归的方式，因此被称之为 StackReconciler,到了 React v16 版本之后，引入了 Fiber,Reconceiler 也从 Stack Reconciler 变为了 Fiber Reconceiler，各个FiberNode 之间通过链表的形式串联了起来。

- **FiberNode 作为一种数据类型:**Fiber 本质上也是一个对象，是之前虚拟DOM 对象(React 元素，createElement 的返回值)的一种升级版本，每个 Fiber 对象里面会包含 React 元素的类型，周围链接的 FiberNode，DOM 相关信息。

- **FiberNode 作为动态的工作单元:**在每个 FiberNode 中，保存了“本次更新中该 React 元素变化的数据、要执行的工作(增删、改、更新Ref、副作用等)“等信息。

  所谓 Fiber 双缓冲树，指的是在内存中构建两颗树，并直接在内存中进行替换的技术。在 React 中使用 Wip Fiber Tree 和 CurrentFiber Tree 这两颗树来实现更新的逻辑。Wip Fiber Tree 在内存中完成更新，而Current fiber Tree 是最终要渲染的树，两颗树通过alternatè 指针相互指向，这样在下一次渲染的时候，直接复用 Wip Fiber Tree 作为下一次的渲染树，而上一次的渲染树又作为新的Wip Fiber Tree，这样可以加快 DOM 节点的替换与更新。

## 如何通过 React.memo 优化条件渲染？

使用 `React.memo` 优化条件渲染，主要是通过减少不必要的渲染来提高组件的性能。

`React.memo` 是一个高阶组件，在组件的 **props** 没有变化时跳过渲染，从而避免不必要的 DOM 更新。

**1. React.memo 的基本原理**

`React.memo` 是对函数组件的优化。当组件的 **props** 没有变化时，它会跳过该组件的渲染。通常情况下，React 会重新渲染组件，即使 **props** 没有改变，但通过 `React.memo`，我们可以控制这种行为。

**2. 条件渲染的优化**

在 React 中，条件渲染通常是根据某些条件来判断是否显示某个组件，比如通过 `&&` 或 `if` 来控制组件的显示与隐藏：

```
function MyComponent({ shouldRender }) {
  return (
    <div>
      {shouldRender && <ExpensiveComponent />}
    </div>
  );
}
```

**3. 使用 `React.memo` 优化条件渲染**

假设 `ExpensiveComponent` 是一个渲染非常消耗性能的组件，在条件渲染的场景下，我们可以通过 `React.memo` 来避免 `ExpensiveComponent` 的重复渲染，尤其是当 `shouldRender` 没有变化时。

**步骤 1：优化条件渲染**

我们可以对 `ExpensiveComponent` 使用 `React.memo` 来缓存它的渲染结果，只有当它的 **props** 发生变化时才重新渲染：

```
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  console.log('ExpensiveComponent rendered');
  return <div>{data}</div>;
});
```

**步骤 2：父组件的条件渲染**

然后，在父组件中做条件渲染时，`ExpensiveComponent` 会根据 **props** 是否变化来决定是否重新渲染：

```
function ParentComponent({ shouldRender, data }) {
  return (
    <div>
      {shouldRender && <ExpensiveComponent data={data} />}
    </div>
  );
}
```

**4. 自定义比较函数（可选）**

如果默认的浅比较不满足要求（即某些复杂的对象或深层嵌套的对象），我们可以传递一个自定义比较函数来决定是否更新组件：

```
const ExpensiveComponent = React.memo(
  function ExpensiveComponent({ data }) {
    console.log('ExpensiveComponent rendered');
    return <div>{data}</div>;
  },
  (prevProps, nextProps) => {
    // 自定义比较函数：只有当 data 发生变化时才重新渲染
    return prevProps.data === nextProps.data;
  }
);
```

**5. 优化场景**

- **避免不必要的重新渲染**：当父组件重新渲染，但子组件的 props 没有变化时，可以使用 `React.memo` 防止子组件的重新渲染。
- **条件渲染的场景**：当有复杂的组件或组件树需要根据某个条件渲染时，使用 `React.memo` 可以避免不必要的渲染。

## React 中 useEffect 和 useLayoutEffect 的区别?

## setState 是同步还是异步的？

##  useRef、ref、forwardsRef 的区别是什么?

## 为什么 Redux 的 reducer 中不能做异步操作？

## 使用 React hooks 怎么实现类里面的所有生命周期？



## 简述下 React 的生命周期？每个生命周期都做了什么？

**挂载**

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

**更新**

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

**卸载**

当组件从 DOM 中移除时会调用如下方法：

- componentWillUnmount()

**错误处理**

渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

- static getDerivedStateFromError()
- componentDidCatch()

**具体介绍**

**render()**

render() 方法是 class 组件中唯一必须实现的方法。

当 render 被调用时，它会检查 this.props 和 this.state 的变化并返回以下类型之一：

- React 元素。通常通过 JSX 创建。例如，\<div /> 会被 React 渲染为 DOM 节点，\<MyComponent /> 会被 React 渲染为自定义组件，无论是 \<div /> 还是 \<MyComponent /> 均为 React 元素。
- 数组或 fragments。 使得 render 方法可以返回多个元素。欲了解更多详细信息，请参阅 fragments 文档。
- Portals。可以渲染子节点到不同的 DOM 子树中。欲了解更多详细信息，请参阅有关 portals 的文档
- 字符串或数值类型。它们在 DOM 中会被渲染为文本节点
- 布尔类型或 null。什么都不渲染。（主要用于支持返回 test && \<Child /> 的模式，其中 test 为布尔类型。）

render() 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。

如需与浏览器进行交互，请在 componentDidMount() 或其他生命周期方法中执行你的操作。保持 render() 为纯函数，可以使组件更容易思考。

**constructor()**

如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。

在 React 组件挂载之前，会调用它的构造函数。在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 super(props)。否则，this.props 在构造函数中可能会出现未定义的 bug。

通常，在 React 中，构造函数仅用于以下两种情况：

通过给 this.state 赋值对象来初始化内部 state。

- 为事件处理函数绑定实例
- 在 constructor() 函数中不要调用 setState() 方法。如果你的组件需要使用内部 state，请直接在构造函数中为 this.state 赋值初始 state。

只能在构造函数中直接为 this.state 赋值。如需在其他方法中赋值，你应使用 this.setState() 替代。

要避免在构造函数中引入任何副作用或订阅。如遇到此场景，请将对应的操作放置在 componentDidMount 中。

**componentDidMount()**

componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。

这个方法是比较适合添加订阅的地方。如果添加了订阅，请不要忘记在 componentWillUnmount() 里取消订阅

你可以在 componentDidMount() 里直接调用 setState()。它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。如此保证了即使在 render() 两次调用的情况下，用户也不会看到中间状态。请谨慎使用该模式，因为它会导致性能问题。通常，你应该在 constructor() 中初始化 state。如果你的渲染依赖于 DOM 节点的大小或位置，比如实现 modals 和 tooltips 等情况下，你可以使用此方式处理。

**componentDidUpdate()**

componentDidUpdate() 会在更新后会被立即调用。首次渲染不会执行此方法。

当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。（例如，当 props 未发生变化时，则不会执行网络请求）。

```javascript
componentDidUpdate(prevProps) {
  // 典型用法（不要忘记比较 props）：
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

你也可以在 componentDidUpdate() 中直接调用 setState()，但请注意它必须被包裹在一个条件语句里，正如上述的例子那样进行处理，否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。不要将 props “镜像”给 state，请考虑直接使用 props。 欲了解更多有关内容，请参阅为什么 props 复制给 state 会产生 bug。

如果组件实现了 getSnapshotBeforeUpdate() 生命周期（不常用），则它的返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。

**componentWillUnmount()**

componentWillUnmount() 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等。

componentWillUnmount() 中不应调用 setState()，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

**shouldComponentUpdate()**

根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。

当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。返回值默认为 true。首次渲染或使用 forceUpdate() 时不会调用该方法。

此方法仅作为性能优化的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。你应该考虑使用内置的 PureComponent 组件，而不是手动编写 shouldComponentUpdate()。PureComponent 会对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。

如果你一定要手动编写此函数，可以将 this.props 与 nextProps 以及 this.state 与nextState 进行比较，并返回 false 以告知 React 可以跳过更新。请注意，返回 false 并不会阻止子组件在 state 更改时重新渲染。

我们不建议在 shouldComponentUpdate() 中进行深层比较或使用 JSON.stringify()。这样非常影响效率，且会损害性能。

目前，如果 shouldComponentUpdate() 返回 false，则不会调用 UNSAFE_componentWillUpdate()，render() 和 componentDidUpdate()。后续版本，React 可能会将 shouldComponentUpdate 视为提示而不是严格的指令，并且，当返回 false 时，仍可能导致组件重新渲染。

**static getDerivedStateFromProps()**

getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

此方法适用于罕见的用例，即 state 的值在任何时候都取决于 props。例如，实现 \<Transition> 组件可能很方便，该组件会比较当前组件与下一组件，以决定针对哪些组件进行转场动画。

派生状态会导致代码冗余，并使组件难以维护。 确保你已熟悉这些简单的替代方案：

- 如果你需要执行副作用（例如，数据提取或动画）以响应 props 中的更改，请改用 componentDidUpdate。
- 如果只想在 prop 更改时重新计算某些数据，请使用 memoization helper 代替。
- 如果你想在 prop 更改时“重置”某些 state，请考虑使组件完全受控或使用 key 使组件完全不受控代替。

此方法无权访问组件实例。如果你需要，可以通过提取组件 props 的纯函数及 class 之外的状态，在getDerivedStateFromProps()和其他 class 方法之间重用代码。

请注意，不管原因是什么，都会在每次渲染前触发此方法。这与 UNSAFE_componentWillReceiveProps 形成对比，后者仅在父组件重新渲染时触发，而不是在内部调用 setState 时。

**getSnapshotBeforeUpdate()**

getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()。

此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。

应返回 snapshot 的值（或 null）。

**Error boundaries**

Error boundaries 是 React 组件，它会在其子组件树中的任何位置捕获 JavaScript 错误，并记录这些错误，展示降级 UI 而不是崩溃的组件树。Error boundaries 组件会捕获在渲染期间，在生命周期方法以及其整个树的构造函数中发生的错误。

如果 class 组件定义了生命周期方法 static getDerivedStateFromError() 或 componentDidCatch() 中的任何一个（或两者），它就成为了 Error boundaries。通过生命周期更新 state 可让组件捕获树中未处理的 JavaScript 错误并展示降级 UI。

仅使用 Error boundaries 组件来从意外异常中恢复的情况；不要将它们用于流程控制。

**static getDerivedStateFromError()**

此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state。

**componentDidCatch()**

此生命周期在后代组件抛出错误后被调用。 它接收两个参数：

- error —— 抛出的错误。
- info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。

componentDidCatch() 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况。

React 的开发和生产构建版本在 componentDidCatch() 的方式上有轻微差别。

在开发模式下，错误会冒泡至 window，这意味着任何 window.onerror 或 window.addEventListener('error', callback) 会中断这些已经被 componentDidCatch() 捕获的错误。

相反，在生产模式下，错误不会冒泡，这意味着任何根错误处理器只会接受那些没有显式地被 componentDidCatch() 捕获的错误。

## React 18 的新特性有哪些？

## memo 和 useMemo 有和区别？

## 什么是 React Native？它的作用是什么？

## React Native 工作原理是什么？

##  函数组件和 class 组件有什么区别？

## 从 React 层面上， 能做的性能优化有哪些？

## 高阶组件理解多少？

## 在 React 项目中，一般怎么处理错误？

在 React 项目中，错误处理一般分为 **组件级错误** 和 **全局错误**，主要采用 **错误边界（Error Boundaries）**、**`try...catch`**、**全局监听** 以及 **日志上报** 等方式。

1. **错误边界（Error Boundaries）**（处理渲染、生命周期方法中的错误）

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error:', error, info);
  }

  render() {
    if (this.state.hasError) return <h1>出错了！</h1>;
    return this.props.children;
  }
}

// 使用：
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

2. **`try...catch` 处理事件错误**

```javascript
const handleClick = () => {
  try {
    // 可能出错的代码
  } catch (error) {
    console.error('事件错误:', error);
  }
};
<button onClick={handleClick}>点击</button>
```

3. **全局监听（`window.onerror`、`unhandledrejection`）**

对于 **未捕获的 JavaScript 错误**，可以用 `window.onerror` 或 `unhandledrejection` 进行兜底：

```javascript
window.onerror = (message, source, lineno, colno, error) => {
  console.error('全局错误:', { message, source, lineno, colno, error });
};

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise 未捕获错误:', event.reason);
});
```

4. **日志上报**

可以结合 **Sentry** 或其他监控系统，将错误上报：

```javascript
import * as Sentry from '@sentry/react';
Sentry.init({ dsn: 'your-dsn-url' });

<Sentry.ErrorBoundary fallback={<h1>出错了</h1>}>
  <MyComponent />
</Sentry.ErrorBoundary>;
```



## redux-thunk 和 redux 是什么关系？

## 在 React 中如何实现代码分割？有哪些常见方式？

在 React 中，代码分割主要依赖于 **`React.lazy` + `Suspense`** 和 **`React Loadable`（第三方库）**，此外 Webpack 的 **`import()`** 也能实现代码分割。

常见方式如下：

1. **`React.lazy` + `Suspense`**（官方推荐）

   ```javascript
   const LazyComponent = React.lazy(() => import('./LazyComponent'));
   function App() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <LazyComponent />
       </Suspense>
     );
   }
   ```

2. **`import()` 动态导入**（适用于路由懒加载）

   ```javascript
   import { lazy } from 'react';
   const LazyPage = lazy(() => import('./pages/LazyPage'));
   ```

3. **`React Loadable`（第三方库，适用于更复杂的场景）**

   ```javascript
   import Loadable from 'react-loadable';
   const LoadableComponent = Loadable({
     loader: () => import('./MyComponent'),
     loading: () => <div>Loading...</div>,
   });
   ```

4. **Webpack `import()` + `optimization.splitChunks`**（适用于手动分割多个模块）

   ```javascript
   module.exports = {
     optimization: {
       splitChunks: {
         chunks: 'all',
       },
     },
   };
   ```

## React Router 中，HashRouter 和 BrowserRouter 的区别和原理？

`React Router` 是一个用于处理 React 应用中的路由的库，其中 `HashRouter` 和 `BrowserRouter` 是两种主要的路由器组件。它们的主要区别在于路由的实现方式和 URL 的处理方式。下面是它们的区别和原理：

**1. `HashRouter`**

**原理**

- **哈希路由**：`HashRouter` 使用 URL 的哈希（`#`）部分来保持和同步路由信息。哈希路由器将路由信息附加在 URL 的 `#` 之后，浏览器不会将其发送到服务器，这样所有的路由信息都在客户端处理。

  **例如**：

  - 当前 URL：`http://example.com/#/home`
  - `HashRouter` 解析 URL 中的 `#/home` 部分来决定显示哪个组件。

- **工作机制**：

  - 浏览器的哈希变化不会导致页面重新加载，只会更新 `window.location.hash`。
  - 当 URL 中的哈希部分变化时，`HashRouter` 会监听这些变化并更新路由。

**优点**

- **服务器配置简化**：由于路由信息不发送到服务器，服务器不需要对这些路由信息进行处理。适用于不需要配置服务器的场景。

**缺点**

- **URL 体验较差**：哈希值对用户不太友好，不支持传统的 URL 链接和书签功能。

**2. `BrowserRouter`**

**原理**

- **HTML5 History API**：`BrowserRouter` 使用 HTML5 的 `History API` 来管理路由。它通过 `pushState` 和 `replaceState` 操作历史记录，来改变浏览器的 URL 地址而不重新加载页面。

  **例如**：

  - 当前 URL：`http://example.com/home`
  - `BrowserRouter` 直接解析 `/home` 来决定显示哪个组件。

- **工作机制**：

  - 通过 `History API` 更新浏览器的 URL，并监听这些变化来更新路由。
  - 需要服务器配置来处理路由，因为所有的路由信息都会发送到服务器，服务器需要进行相应的处理和配置。

**优点**

- **更干净的 URL**：没有 `#` 符号，URL 更符合传统的路由标准。
- **更好的用户体验**：支持完整的 URL 链接和书签功能。

**缺点**

- **服务器配置要求**：需要服务器进行配置以支持前端路由，通常需要配置服务器将所有的请求重定向到应用的入口点（如 `index.html`）。

## React中，useRef、ref、forwardsRef 的区别是什么?

`useRef`、`ref` 和 `forwardRef` 都涉及到引用（refs）的使用，但它们的用途和行为有所不同。下面是它们的主要区别：

**1. `useRef`**

- **用途**：在函数组件中创建和管理引用。`useRef` 返回一个可变的 `ref` 对象，该对象的 `.current` 属性可以用来访问 DOM 节点或保存任意值。

- **使用方式**：

  ```javascript
  import { useRef, useEffect } from 'react';
  
  function MyComponent() {
    const inputRef = useRef(null);
  
    useEffect(() => {
      inputRef.current.focus(); // 访问和操作 DOM 元素
    }, []);
  
    return <input ref={inputRef} />;
  }
  ```

- **特点**：

  - `useRef` 创建的引用对象在组件的整个生命周期内保持不变。
  - 可以用来保存任意数据，除了 DOM 节点。

**2. `ref`**

- **用途**：在类组件中使用，或者通过 `React.forwardRef` 在函数组件中使用，来访问 DOM 节点或组件实例。

- **使用方式**：

  ```javascript
  class MyClassComponent extends React.Component {
    constructor(props) {
      super(props);
      this.inputRef = React.createRef();
    }
  
    componentDidMount() {
      this.inputRef.current.focus(); // 访问和操作 DOM 元素
    }
  
   render() {
     return <input ref={this.inputRef} />;
   }
  }
  ```

  ```javascript
  function MyFunctionComponent(props, ref) {
    return <input ref={ref} />;
  }
  const ForwardedComponent = React.forwardRef(MyFunctionComponent);
  ```

- **特点**：

  - `ref` 用于访问类组件的实例或函数组件的 DOM 元素。
  - 在函数组件中使用 `ref` 需要配合 `React.forwardRef` 使用。

**3. `forwardRef`**

- **用途**：允许函数组件接收 `ref` 并将其转发到子组件的 DOM 元素或其他组件。

- **使用方式**：

  ```javascript
  import React, { forwardRef } from 'react';
  
  const MyComponent = forwardRef((props, ref) => (
    <input ref={ref} {...props} />
  ));
  
  function App() {
    const inputRef = useRef(null);
  
    useEffect(() => {
      inputRef.current.focus(); // 访问和操作 DOM 元素
    }, []);
  
    return <MyComponent ref={inputRef} />;
  }
  ```

- **特点**：

  - `forwardRef` 高阶组件允许函数组件接收 `ref`，并将 `ref` 转发到子组件的 DOM 元素或其他组件上。
  - 适用于需要将 `ref` 传递给深层组件的情况。

## useEffect 的第二个参数，是如何判断实现依赖是否发生变化的？

`useEffect` 的依赖数组的比较是通过浅比较（shallow comparison）实现的。

具体来说，以下是比较方法的细节：

**1. 基础数据类型的比较**

对于基本数据类型（如 `string`、`number`、`boolean`），React 直接比较它们的值：

- **相等**：`value1 === value2`。如果两个基本数据类型的值相等，React 认为它们没有变化。
- **不相等**：如果值不相等，则认为依赖项发生了变化。

**2. 引用类型的比较**

对于引用类型（如对象、数组、函数），React 进行浅比较，即比较引用的内存地址：

- **相同引用**：如果对象或数组的引用没有变化（即它们仍指向同一个内存地址），React 认为依赖项没有变化。
- **不同引用**：如果对象或数组的引用发生了变化（即它们指向不同的内存地址），React 认为依赖项发生了变化。

**浅比较的具体方法**

- **对象和数组的引用比较**：
  - React 通过 `===` 运算符来比较对象或数组的引用。
  - 这意味着即使对象或数组的内容发生了变化，只要它们的引用没有变化，React 认为它们没有变化。
- **函数的引用比较**：
  - 函数也是通过其引用进行比较的。如果一个函数的引用在不同的渲染中保持不变，React 认为函数没有变化。

**示例代码**

```javascript
import { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    // 副作用函数将在 `count` 或 `data` 变化时重新执行
   console.log('Effect triggered');
  }, [count, data]); // 依赖数组

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setData([...data, count])}>Add Data</button>
    </div>
  );
}
```

- **基础数据类型（`count`）**：
  - 每次点击按钮时，`count` 的值都会改变，React 会认为 `count` 发生了变化，从而触发 `useEffect`。
- **引用类型（`data`）**：
  - 每次点击“Add Data”按钮时，`data` 的引用会改变（由于使用了展开运算符创建了新数组），React 会认为 `data` 发生了变化，从而触发 `useEffect`。

**注意事项**

- **数组和对象的不可变性**：为确保 `useEffect` 能正确地检测依赖变化，通常建议使用不可变数据结构或确保数据结构的变化能够生成新的引用。
- **避免不必要的副作用执行**：在依赖数组中包含过多的依赖项，尤其是引用类型的依赖项，可能导致不必要的副作用执行，影响性能。

## forwardRef 作用是什么？

`forwardRef` 是 React 的一个高阶组件（HOC），用于将父组件的 `ref` 转发到子组件的 DOM 节点或组件实例中。它使得父组件能够直接访问子组件的 DOM 元素或方法。这在一些情况下非常有用，比如需要在父组件中操作子组件的 DOM 元素或调用子组件的方法时。

**使用场景**

1. **访问子组件的 DOM 节点：** 当需要对子组件的 DOM 元素进行操作（例如，获取焦点、调整大小等），而这个子组件是由其他组件包裹的情况下。
2. **组合高阶组件和 `ref`：** 在使用高阶组件（HOC）时，`ref` 不会自动转发到被包裹的组件中。使用 `forwardRef` 可以将 `ref` 转发到正确的组件或 DOM 元素。

**基本用法**

```javascript
import React, { forwardRef, useRef, useImperativeHandle } from 'react';

// 子组件
const Input = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} {...props} />;
});

// 父组件
function ParentComponent() {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // 调用子组件的 focus 方法
    }
  };

  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

export default ParentComponent;
```

**关键点**

- **`forwardRef`**：是一个 React 函数，用于包装组件并转发 `ref`。
- **`useImperativeHandle`**：用来自定义暴露给父组件的 `ref` 实例。可以将特定的函数或属性暴露给父组件。

## 怎么获取函数组件的实例？

在 React 中，函数组件没有实例，因此传统的 `ref` 机制（用于访问类组件实例的方法）不适用。不过，可以通过以下几种方式在函数组件中使用 `ref` 来访问 DOM 元素或函数组件的内部逻辑：

**1. 访问 DOM 元素**

对于函数组件中引用 DOM 元素，可以使用 `useRef` 来创建一个 ref，并将其绑定到 DOM 元素上：

```javascript
import React, { useRef, useEffect } from 'react';

const MyComponent = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    // 访问 DOM 元素
    if (inputRef.current) {
      inputRef.current.focus(); // 例如，设置焦点
    }
  }, []);

  return <input ref={inputRef} />;
};
```

**2. 使用 `forwardRef` 转发 Ref**

要在函数组件中访问子组件的 DOM 元素或通过 ref 传递组件实例，可以使用 `React.forwardRef` 来转发 ref：

```javascript
import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';

// 子组件使用 forwardRef 来接收父组件的 ref
const ChildComponent = forwardRef((props, ref) => {
  const localRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (localRef.current) {
        localRef.current.focus();
      }
    }
  }));

  return <input ref={localRef} />;
});

// 父组件使用 ref 来访问子组件的方法
const ParentComponent = () => {
  const childRef = useRef();

  useEffect(() => {
    // 调用子组件的 focus 方法
    if (childRef.current) {
      childRef.current.focus();
    }
  }, []);

  return <ChildComponent ref={childRef} />;
};
```

**3. `useImperativeHandle` 的作用**

`useImperativeHandle` 钩子允许你定制通过 ref 访问的实例值。例如，可以将特定的方法暴露给父组件，通过 ref 调用这些方法：

```javascript
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const localRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      localRef.current.focus();
    }
  }));

  return <input ref={localRef} {...props} />;
});

const ParentComponent = () => {
  const inputRef = useRef();

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
};
```

## React Reconciler 为何要采用 fiber 架构？

React Reconciler 采用 Fiber 架构主要是为了提升性能和用户体验。Fiber 是 React 16 引入的一种新的协调算法，它相对于旧版的 Reconciler 具备以下优势：

**1. 增量渲染**

- **旧版 Reconciler**：一次性计算并更新整个 UI 树，可能会导致性能瓶颈，尤其是在大型应用中。
- **Fiber 架构**：支持增量渲染，将渲染任务拆分为小的单元，分批执行。这样可以在长时间运行的任务中插入中断点，使得 UI 更响应式。

**2. 中断和优先级**

- **旧版 Reconciler**：一旦开始更新，渲染过程无法中断，可能会阻塞用户交互。
- **Fiber 架构**：允许中断和恢复工作，可以根据任务的优先级来调整渲染顺序。低优先级的任务可以在高优先级任务完成后再继续执行，提高了用户交互的流畅性。

**3. 任务调度**

- **旧版 Reconciler**：没有任务调度机制，所有更新都按顺序执行。
- **Fiber 架构**：使用任务调度机制（Scheduler）来管理和调度不同优先级的更新任务，确保重要任务（如用户输入、动画）优先处理。

**4. 异常处理**

- **旧版 Reconciler**：异常处理能力有限，无法优雅地处理渲染过程中的错误。
- **Fiber 架构**：允许局部错误处理，确保在渲染过程中即使发生异常，也能保证 UI 的部分更新和恢复。

**5. 渲染中断与恢复**

- **旧版 Reconciler**：无法中断和恢复渲染。
- **Fiber 架构**：支持在渲染过程中中断并恢复，能够平滑处理长时间运行的任务。

**6. 事务管理**

- **旧版 Reconciler**：处理复杂的事务和操作较为困难。
- **Fiber 架构**：将渲染任务分解为独立的事务，每个事务可以独立地管理和控制，简化了复杂操作的管理。

## fiber 架构的工作原理？

React 中的 Fiber 架构是一种新的协调算法，旨在提高 React 的性能和用户体验。它通过引入新的数据结构和机制，使得 React 能够更高效地处理 UI 更新。以下是 Fiber 架构的工作原理：

**1. Fiber 数据结构**

- **Fiber 节点**：Fiber 是一个表示组件的内部数据结构，每个 Fiber 节点对应一个 React 组件。它包含了组件的状态、更新信息和子组件的引用等。
- **Fiber 树**：Fiber 节点形成了一棵 Fiber 树，类似于旧版的虚拟 DOM 树。每个 Fiber 节点指向其父节点、子节点和兄弟节点。

**2. 工作单元和增量渲染**

- **工作单元**：渲染过程被分解为多个工作单元，每个单元代表一个小的渲染任务。这样可以将渲染过程拆分成可中断的任务，以避免长时间的阻塞。
- **增量渲染**：Fiber 允许将渲染任务拆分为增量的操作，逐步完成整个渲染过程。每次渲染会处理 Fiber 树的一部分，允许在任务之间插入中断点，从而提高了渲染的响应性。

**3. 调度优先级**

- **优先级调度**：Fiber 引入了任务调度机制，允许根据任务的优先级来决定渲染的顺序。高优先级的任务（如用户输入、动画）会优先处理，而低优先级的任务（如数据加载）会在空闲时间处理。
- **任务中断和恢复**：Fiber 支持在渲染过程中中断并恢复任务。当重要任务需要处理时，当前的渲染任务可以被中断，待重要任务完成后再恢复继续。

**4. 更新和协调**

- **更新队列**：每个 Fiber 节点都有一个更新队列，用于存储与组件相关的更新信息。更新队列可以包含多个更新，React 会根据更新的优先级和顺序进行协调。
- **协调过程**：Fiber 通过对比新旧 Fiber 树来决定哪些部分需要更新。这一过程称为协调（Reconciliation），它会检查节点的变更，生成更新的补丁。

**5. 渲染阶段和提交阶段**

- **渲染阶段**：在渲染阶段，Fiber 架构会计算出需要更新的部分，但不会立即更新 DOM。这一阶段主要用于计算新的 Fiber 树，并生成更新任务。
- **提交阶段**：在提交阶段，Fiber 会将渲染阶段计算出的更新应用到实际的 DOM 上。这个阶段是同步的，确保所有的更改都被正确地应用。

**6. 错误处理**

- **错误边界**：Fiber 提供了更好的错误处理机制，可以局部地处理渲染中的错误。即使在渲染过程中发生错误，也能保证 UI 的部分更新和恢复。

## 说说 React render 阶段的执行过程

在 React 的 Fiber 架构中，`render` 阶段是处理组件更新和生成虚拟 DOM 的关键阶段。

以下是 React 在 `render` 阶段的执行过程的详细步骤：

1. **触发渲染**

- **更新请求**：组件的状态或属性发生变化时，会触发一次渲染。更新可以由用户交互、网络请求响应或内部状态变化等引起。
- **调度更新**：React 会将渲染任务调度到 Fiber 树的更新队列中。调度过程使用 React 的调度器来确定任务的优先级。

2. **开始 Fiber 树的协调**

- **创建 Fiber 节点**：在 `render` 阶段，React 会为每个组件创建或更新 Fiber 节点。Fiber 节点用于表示组件及其状态，包括当前的属性、子节点和更新队列等。
- **更新 Fiber 树**：React 会将新的 Fiber 节点与旧的 Fiber 节点进行比较。这一步称为协调（Reconciliation）。React 会遍历 Fiber 树，对比新旧 Fiber 节点，计算出最小的更新集合。

3. **执行 `render` 方法**

- **执行组件的 `render` 方法**：对于每个 Fiber 节点，React 会执行组件的 `render` 方法。`render` 方法会返回一个虚拟 DOM 树，这个虚拟 DOM 树会被包装成新的 Fiber 节点。
- **构建新的 Fiber 树**：`render` 方法返回的虚拟 DOM 会被转换成新的 Fiber 节点，并替代旧的 Fiber 节点。新的 Fiber 节点将会作为子节点插入到父节点的子节点链中。

4. **更新 Fiber 节点**

- **处理更新**：在 Fiber 节点中，React 会处理更新队列，应用新的状态或属性。`pendingProps` 和 `memoizedProps` 分别表示待处理的属性和已记忆的属性。
- **标记更新类型**：React 会在 Fiber 节点中设置 `effectTag`，标记当前 Fiber 节点的更新类型，如插入、更新或删除。这些标记将用于提交阶段的实际 DOM 更新。

5. **构建 Fiber 树的副作用**

- **保存副作用**：在 `render` 阶段，React 会收集和保存副作用（side effects），例如需要在组件挂载或更新时执行的副作用操作（如数据获取、事件监听等）。这些副作用将在 `commit` 阶段应用到实际 DOM 上。

6. **完成 `render` 阶段**

- **生成新的 Fiber 树**：完成 `render` 阶段后，React 会生成一棵新的 Fiber 树，这棵树包含了所有更新后的 Fiber 节点。
- **准备提交**：新的 Fiber 树会被提交到 `commit` 阶段进行实际的 DOM 更新。提交过程包括应用副作用和实际的 DOM 操作。



## 说说 Fiber 的含义与数据结构

在 React 的 Fiber 架构中，“Fiber” 是一种表示组件及其状态的内部数据结构。它是对 React 组件的详细描述，旨在提高组件的渲染性能和用户体验。以下是 Fiber 的含义和数据结构的详细解释：

**1. Fiber 的含义**

- **Fiber 是一种内部数据结构**：它用于表示每个 React 组件的状态和属性。每个 Fiber 对象包含有关组件的信息，如更新状态、子组件、位置信息等。
- **Fiber 的目标**：通过 Fiber 数据结构，React 可以更高效地处理 UI 更新，支持增量渲染、任务中断和优先级调度。

**2. Fiber 数据结构**

Fiber 数据结构由多个字段组成，每个字段用于存储与组件相关的不同信息。主要字段包括：

- **`tag`**：指示 Fiber 节点的类型，如函数组件、类组件或 DOM 元素。
- **`key`**：唯一标识 Fiber 节点的键，用于优化子节点的匹配。
- **`elementType`**：组件的类型，表示组件的类型（函数组件、类组件等）。
- **`type`**：组件的具体类型或组件实例。例如，对于 DOM 元素，它可能是 `'div'` 或 `'span'`；对于类组件，它是类构造函数。
- **`return`**：指向 Fiber 节点的父节点。形成 Fiber 树的父子关系。
- **`child`**：指向 Fiber 节点的第一个子节点。用于构建 Fiber 树的结构。
- **`sibling`**：指向 Fiber 节点的下一个兄弟节点。用于在同一层级遍历子节点。
- **`stateNode`**：保存与组件关联的实际 DOM 节点或组件实例。例如，对于类组件，它是组件的实例；对于 DOM 元素，它是实际的 DOM 节点。
- **`alternate`**：指向 Fiber 节点的旧版本（即上一次渲染时的 Fiber 节点）。用于比较新旧 Fiber 树，进行更新和协调。
- **`updateQueue`**：保存组件的更新队列，包含需要应用的更新信息。每个更新记录可能包含一个新的状态或属性。
- **`effectTag`**：用于标记 Fiber 节点的更新效果（如插入、更新或删除）。在提交阶段，React 会根据这些标记进行实际的 DOM 更新。
- **`pendingProps`** 和 **`memoizedProps`**：分别表示待处理的属性和已记忆的属性。`pendingProps` 是新传入的属性，而 `memoizedProps` 是上一次渲染时的属性。

**3. Fiber 树**

- **Fiber 树结构**：Fiber 树类似于虚拟 DOM 树，表示组件的层级结构。每个 Fiber 节点代表一个组件或 DOM 元素。Fiber 树通过 `return`、`child` 和 `sibling` 字段构建成树形结构。
- **更新和协调**：在 Fiber 架构中，React 使用 Fiber 数据结构来处理组件更新和协调（Reconciliation）。通过比较新旧 Fiber 树，React 可以计算出需要更新的部分并生成补丁。

**4. Fiber 的优势**

- **增量渲染**：Fiber 支持将渲染任务拆分为多个增量的工作单元，允许中断和恢复渲染，避免长时间的阻塞。
- **优先级调度**：Fiber 引入了任务优先级调度，允许高优先级的任务（如用户输入）优先处理，提高响应性。
- **错误边界**：Fiber 提供了更好的错误处理机制，可以局部地处理渲染中的错误，保证应用的稳定性。

## 说说 React render 阶段的执行过程

在 React 的 Fiber 架构中，`render` 阶段是处理组件更新和生成虚拟 DOM 的关键阶段。

以下是 React 在 `render` 阶段的执行过程的详细步骤：

1. **触发渲染**

- **更新请求**：组件的状态或属性发生变化时，会触发一次渲染。更新可以由用户交互、网络请求响应或内部状态变化等引起。
- **调度更新**：React 会将渲染任务调度到 Fiber 树的更新队列中。调度过程使用 React 的调度器来确定任务的优先级。

2. **开始 Fiber 树的协调**

- **创建 Fiber 节点**：在 `render` 阶段，React 会为每个组件创建或更新 Fiber 节点。Fiber 节点用于表示组件及其状态，包括当前的属性、子节点和更新队列等。
- **更新 Fiber 树**：React 会将新的 Fiber 节点与旧的 Fiber 节点进行比较。这一步称为协调（Reconciliation）。React 会遍历 Fiber 树，对比新旧 Fiber 节点，计算出最小的更新集合。

3. **执行 `render` 方法**

- **执行组件的 `render` 方法**：对于每个 Fiber 节点，React 会执行组件的 `render` 方法。`render` 方法会返回一个虚拟 DOM 树，这个虚拟 DOM 树会被包装成新的 Fiber 节点。
- **构建新的 Fiber 树**：`render` 方法返回的虚拟 DOM 会被转换成新的 Fiber 节点，并替代旧的 Fiber 节点。新的 Fiber 节点将会作为子节点插入到父节点的子节点链中。

4. **更新 Fiber 节点**

- **处理更新**：在 Fiber 节点中，React 会处理更新队列，应用新的状态或属性。`pendingProps` 和 `memoizedProps` 分别表示待处理的属性和已记忆的属性。
- **标记更新类型**：React 会在 Fiber 节点中设置 `effectTag`，标记当前 Fiber 节点的更新类型，如插入、更新或删除。这些标记将用于提交阶段的实际 DOM 更新。

5. **构建 Fiber 树的副作用**

- **保存副作用**：在 `render` 阶段，React 会收集和保存副作用（side effects），例如需要在组件挂载或更新时执行的副作用操作（如数据获取、事件监听等）。这些副作用将在 `commit` 阶段应用到实际 DOM 上。

6. **完成 `render` 阶段**

- **生成新的 Fiber 树**：完成 `render` 阶段后，React 会生成一棵新的 Fiber 树，这棵树包含了所有更新后的 Fiber 节点。
- **准备提交**：新的 Fiber 树会被提交到 `commit` 阶段进行实际的 DOM 更新。提交过程包括应用副作用和实际的 DOM 操作。



## 说说 React commit 阶段的执行过程

在 React 的 Fiber 架构中，`commit` 阶段是将更新应用到实际 DOM 的关键步骤。这个阶段处理在 `render` 阶段中计算出的所有副作用，并实际更新页面内容。以下是 `commit` 阶段的详细执行过程：

1. **提交 Fiber 树**

- **获取 Fiber 树**：`commit` 阶段开始时，React 会获取从 `render` 阶段生成的 Fiber 树。这棵树包含所有需要更新的 Fiber 节点及其副作用标记。

2. **遍历 Fiber 树**

- **递归遍历**：React 会递归遍历 Fiber 树，从根节点开始，逐层处理每个 Fiber 节点。每个节点会根据其 `effectTag` 属性执行相应的操作。
- **处理副作用**：副作用包括插入、更新和删除 DOM 元素、执行生命周期方法、调用 `useEffect` 和 `useLayoutEffect` 的回调函数等。

3. **应用副作用**

- **插入节点**：对于标记为插入的 Fiber 节点，React 会在实际 DOM 中插入对应的节点。这包括创建新的 DOM 元素、设置属性和插入到正确的位置。
- **更新节点**：对于标记为更新的 Fiber 节点，React 会更新现有的 DOM 元素。这包括更新元素的属性、文本内容和样式等。
- **删除节点**：对于标记为删除的 Fiber 节点，React 会从实际 DOM 中移除对应的节点。这包括删除元素、清理事件监听器等。

4. **处理生命周期方法和副作用**

- **调用生命周期方法**：在 `commit` 阶段，React 会调用组件的生命周期方法，如 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount`。
- **执行 `useEffect` 和 `useLayoutEffect`**：React 会执行 `useEffect` 和 `useLayoutEffect` 的回调函数。这些回调函数在组件挂载和更新后执行，用于处理副作用操作（如数据获取、事件绑定等）。

5. **更新 Fiber 树**

- **更新 Fiber 节点**：在 `commit` 阶段完成后，React 会更新 Fiber 节点的状态和属性，将 `current` 树指向新的 Fiber 树。
- **清理工作**：完成副作用处理后，React 会清理 Fiber 节点上的副作用标记和临时状态，为下一次渲染做好准备。

6. **浏览器布局和绘制**

- **布局计算**：在实际 DOM 更新后，浏览器会进行布局计算，确定元素的最终位置和尺寸。
- **绘制**：浏览器会根据布局计算结果绘制页面内容。这个过程包括将元素绘制到屏幕上，并处理样式、颜色和图像等。



## React 中，fiber 是如何实现时间切片的？

Fiber 的时间切片（Time Slicing）是一种优化 React 渲染性能的技术，它允许将长时间运行的任务分解成多个小任务，以便在主线程上交替执行其他任务，从而提高用户界面的响应性。以下是时间切片在 Fiber 架构中实现的主要原理和步骤：

**1. 任务拆分和优先级**

- **任务拆分**：Fiber 架构允许将长时间运行的任务（如组件更新）拆分成多个小的 Fiber 节点处理单元。这些小任务可以在浏览器的空闲时间中逐步完成，而不是一次性处理所有任务。
- **优先级调度**：React 为不同的更新任务分配不同的优先级。例如，用户输入相关的更新（如点击和输入事件）通常会被赋予较高的优先级，而低优先级的更新（如数据预取）则可能在用户操作之后执行。优先级调度可以确保重要的任务优先处理。

**2. 任务调度**

- **调度器（Scheduler）**：React 使用调度器来控制任务的执行。调度器决定何时执行 Fiber 节点的更新工作，以及在主线程上分配的时间片。调度器会根据任务的优先级和浏览器的空闲时间来安排任务执行。
- **时间片切换**：时间切片的核心思想是将长时间运行的任务分割成多个时间片（时间段），并在每个时间片内处理一部分任务。在每个时间片结束时，React 会检查是否有更高优先级的任务需要处理，或者是否需要将当前任务暂停，等待下一次时间片继续处理。

**3. Fiber 节点的处理**

- **工作单元**：每个 Fiber 节点代表一个工作单元，处理 Fiber 节点的任务被称为“工作单元”。在时间切片过程中，React 会逐步处理这些工作单元，以便将渲染任务拆分成较小的部分。
- **中断与恢复**：如果在处理 Fiber 节点的过程中，浏览器遇到用户交互（如点击或滚动），React 可以中断当前任务，并优先处理这些用户交互相关的高优先级任务。一旦用户交互处理完成，React 会恢复中断的任务，继续处理剩余的 Fiber 节点。

**4. 流程实现**

1. **任务开始**：当 React 开始执行更新任务时，它会将任务拆分成多个 Fiber 节点的处理单元，并根据优先级安排这些任务。
2. **调度执行**：调度器会分配时间片来处理这些 Fiber 节点。每个时间片内，React 会处理一定数量的 Fiber 节点，更新虚拟 DOM 和实际 DOM。
3. **检查任务状态**：在每个时间片结束时，React 会检查是否有高优先级任务需要处理，或者是否需要暂停当前任务。调度器决定是否继续执行当前任务或切换到其他任务。
4. **恢复执行**：如果任务被中断，React 会在下一次时间片中恢复执行，继续处理未完成的 Fiber 节点。

**5. 用户交互**

- **响应用户操作**：时间切片技术确保用户操作（如输入、点击）能够及时响应。React 在处理高优先级任务时，能够快速响应用户交互，提高页面的交互性能。
- **优化渲染**：通过将长时间运行的任务分解成多个时间片，React 能够避免阻塞主线程，提高页面的整体性能和响应性。

**总结**

Fiber 的时间切片实现使得 React 能够高效地处理长时间运行的渲染任务，通过将任务拆分成多个小任务，并在主线程上分配时间片来逐步完成这些任务。这种方法可以显著提高用户界面的响应性和性能，确保高优先级任务能够及时处理，并优化页面渲染体验。



## 说说你对 createPortal 的了解

`ReactDOM.createPortal` 是 React 的一个 API，用于将子节点渲染到 DOM 的不同部分，而不是当前组件的父级节点中。这对于需要在 DOM 的不同层级中插入内容（如模态框、工具提示、下拉菜单等）非常有用，因为它允许我们将子元素渲染到指定的 DOM 节点中，保持其逻辑上的位置和结构。

**`createPortal` 的用法**

```javascript
ReactDOM.createPortal(child, container)
```

- **`child`**：要渲染的子元素或 React 元素。
- **`container`**：要将 `child` 渲染到的 DOM 节点。

**特点和使用场景**

1. **DOM 层级结构**：
   - 通过 `createPortal`，你可以将子元素插入到 DOM 的任意位置，这对于需要在页面不同层级中展示内容的情况很有帮助。例如，模态框通常需要渲染在页面的顶层。
2. **维持 React 组件的生命周期和状态**：
   - 使用 `createPortal` 渲染的元素仍然保持在 React 组件树中，因此它们会遵循 React 的生命周期方法，状态和上下文不会受到影响。
3. **避免 CSS 影响**：
   - 在某些情况下，使用 `createPortal` 可以避免子组件的 CSS 被父组件的样式干扰，因为渲染到的 DOM 节点通常是在 `body` 或其他顶层容器中。

**示例**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  render() {
    return ReactDOM.createPortal(
      <div className="modal">
        <h1>I'm a modal!</h1>
        <button onClick={this.props.onClose}>Close</button>
      </div>,
      document.body  // Modal 将被渲染到 body 元素中
    );
  }
}

export default Modal;
```

**原理**

- `createPortal` 创建的组件会挂载到指定的 DOM 节点 `container` 中，但它仍然在 React 的组件树中。这意味着 React 可以处理它的生命周期和更新，而不是直接操作 DOM。



## React 中的 createContext 和 useContext 分别有什么用？

在 React 中，`createContext` 和 `useContext` 是处理上下文的两个相关 API，但它们的功能和用途有所不同：

**1. `createContext`**

- **作用**：用于创建一个新的上下文对象。

- **用法**：调用 `createContext` 会返回一个上下文对象，这个对象包含 `Provider` 和 `Consumer` 组件。`Provider` 用于提供上下文的值，而 `Consumer` 用于消费上下文的值。

- 示例：

  ```javascript
  // 创建上下文对象
  const MyContext = createContext(defaultValue);
  
  // 提供上下文的值
  <MyContext.Provider value={someValue}>
    {/* 子组件 */}
  </MyContext.Provider>
  
  // 消费上下文的值
  <MyContext.Consumer>
    {value => /* 使用上下文的值 */}
  </MyContext.Consumer>
  ```

**2. `useContext`**

- **作用**：用于在函数组件中访问上下文的值。

- **用法**：`useContext` 是一个 Hook，用于在函数组件中消费上下文的值，而不需要使用 `Consumer` 组件。

- 示例：

  ```javascript
  import { useContext } from 'react';
  
  // 在函数组件中访问上下文
  const value = useContext(MyContext);
  ```

## 使用 react-router 跳转时，如何将参数传递给下一个页面？

在 `react-router` 中实现页面跳转并传递参数，可以通过以下几种方式来完成：

**通过 URL 参数传递**

**定义路由时：**

在定义路由时，可以使用 URL 参数。例如：

```javascript
<Route path="/user/:id" component={User} />
```

**跳转时：**

使用 `useHistory` 或 `useNavigate`（在 React Router v6 中）进行跳转时，可以将参数添加到 URL 中：

```javascript
import { useHistory } from 'react-router-dom'; // React Router v5

function RedirectToUser() {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/user/123`); // 跳转到 /user/123
  };

  return <button onClick={handleClick}>Go to User 123</button>;
}
import { useNavigate } from 'react-router-dom'; // React Router v6

function RedirectToUser() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/123`); // 跳转到 /user/123
  };

  return <button onClick={handleClick}>Go to User 123</button>;
}
```

**接收参数：**

在目标组件中，可以使用 `useParams` 钩子（在 React Router v6 中也是 `useParams`）来接收 URL 参数：

```javascript
import { useParams } from 'react-router-dom';

function User() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}
```

2. **通过查询字符串传递**

**跳转时：**

可以将参数作为查询字符串添加到 URL 中：

```javascript
import { useHistory } from 'react-router-dom'; // React Router v5

function RedirectToUser() {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/user?id=123`); // 跳转到 /user?id=123
  };

  return <button onClick={handleClick}>Go to User</button>;
}
import { useNavigate } from 'react-router-dom'; // React Router v6

function RedirectToUser() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user?id=123`); // 跳转到 /user?id=123
  };

  return <button onClick={handleClick}>Go to User</button>;
}
```

**接收查询参数：**

可以使用 `URLSearchParams` 来获取查询参数：

```javascript
import { useLocation } from 'react-router-dom';

function User() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get('id');
  return <div>User ID: {id}</div>;
}
```

3. **通过状态传递**

**跳转时：**

可以将参数作为状态传递：

```javascript
import { useHistory } from 'react-router-dom'; // React Router v5

function RedirectToUser() {
  const history = useHistory();

  const handleClick = () => {
    history.push({
      pathname: '/user',
      state: { id: 123 }
    });
  };

  return <button onClick={handleClick}>Go to User</button>;
}
import { useNavigate } from 'react-router-dom'; // React Router v6

function RedirectToUser() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/user', { state: { id: 123 } });
  };

  return <button onClick={handleClick}>Go to User</button>;
}
```

**接收状态：**

在目标组件中，可以通过 `useLocation` 钩子获取传递的状态：

```javascript
复制import { useLocation } from 'react-router-dom';

function User() {
  const location = useLocation();
  const id = location.state?.id;
  return <div>User ID: {id}</div>;
}
```

## react 中，数组用 useState 做状态管理的时候，使用 push，pop，splice 等直接更改数组对象，会引起页面渲染吗？

在 React 中，直接使用 `push`、`pop`、`splice` 等方法修改数组不会触发页面重新渲染。React 的状态更新机制依赖于状态的不可变性（immutability），即通过创建新的状态对象来更新状态。直接修改原始状态对象（如数组）不会创建新的对象引用，因此 React 不会检测到状态的变化，也不会触发重新渲染。

**为什么直接修改数组不触发渲染**

React 使用 `Object.is`（或其变体）来检查状态是否发生了变化。直接对数组进行 `push`、`pop`、`splice` 等操作，修改了原始数组的内容，但数组的引用（内存地址）没有改变。React 仅通过引用变化来判断状态是否更新，因此直接修改原始数组不会触发更新。

**正确的做法**

为了触发渲染，应该遵循不可变数据模式，即通过创建新数组来更新状态。以下是使用 `useState` 管理数组状态的推荐方法：

**示例：使用 `concat`、`slice`、`map` 等方法**

```javascript
import React, { useState } from 'react';

function MyComponent() {
    const [items, setItems] = useState([1, 2, 3]);

    // 添加新项
    const addItem = (item) => {
        setItems(prevItems => [...prevItems, item]);
    };

    // 移除最后一项
    const removeLastItem = () => {
        setItems(prevItems => prevItems.slice(0, -1));
    };

    // 更新特定项
    const updateItem = (index, newItem) => {
        setItems(prevItems => prevItems.map((item, i) => i === index ? newItem : item));
    };

    return (
        <div>
            <button onClick={() => addItem(4)}>Add Item</button>
            <button onClick={removeLastItem}>Remove Last Item</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default MyComponent;
```

**解释**

1. **添加新项**：
   - 使用展开运算符 `[...prevItems, item]` 创建一个新数组，并将新项添加到末尾。
2. **移除最后一项**：
   - 使用 `slice(0, -1)` 创建一个新数组，去除最后一项。
3. **更新特定项**：
   - 使用 `map` 方法创建一个新数组，并根据条件更新特定项。



## react 中，在什么场景下需要使用 useContext？

在 React 中，`useContext` 是一个用于在组件树中共享状态或数据的钩子。它允许我们在没有通过属性逐层传递的情况下，将数据从祖先组件传递到后代组件。`useContext` 主要用于避免 prop drilling 问题，即当需要将数据从顶层组件传递到深层嵌套的组件时，可能会涉及多层组件传递属性，代码会变得冗长和难以维护。

**使用 `useContext` 的场景**

1. **全局状态管理**：

   - 当你需要在多个组件之间共享全局状态时，`useContext` 是一个简单而有效的工具。例如，用户认证状态、主题设置或语言选择等全局数据可以通过 `useContext` 在整个应用中访问。

   ```javascript
   const UserContext = React.createContext();
   
   function App() {
       const [user, setUser] = useState(null);
   
       return (
           <UserContext.Provider value={user}>
               <UserProfile />
           </UserContext.Provider>
       );
   }
   
   function UserProfile() {
       const user = useContext(UserContext);
       return <div>{user ? `Welcome, ${user.name}` : 'Not logged in'}</div>;
   }
   ```

2. **避免 prop drilling**：

   - 当数据需要从顶层组件传递到深层嵌套的子组件时，使用 `useContext` 可以避免将数据逐层通过 `props` 传递。这样可以减少中间组件不必要的属性传递，保持代码的简洁和清晰。

   ```javascript
   const ThemeContext = React.createContext();
   
   function App() {
       const theme = 'dark';
   
       return (
           <ThemeContext.Provider value={theme}>
               <Toolbar />
           </ThemeContext.Provider>
       );
   }
   
   function Toolbar() {
       return (
           <div>
               <ThemedButton />
           </div>
       );
   }
   
   function ThemedButton() {
       const theme = useContext(ThemeContext);
       return <button className={theme}>Themed Button</button>;
   }
   ```

3. **跨组件通信**：

   - 在组件树的不同部分之间进行通信时，`useContext` 提供了一种简单的方式来共享信息，而不需要通过复杂的回调或全局事件总线。

4. **复杂应用中的配置和设置**：

   - 在需要全局配置（如路由、表单验证、国际化等）的复杂应用中，`useContext` 使得这些配置可以被所有需要的组件访问，而不需要反复传递。

5. **在与 `useReducer` 结合使用时**：

   - `useReducer` 可以用来管理复杂的本地状态。将 `useReducer` 与 `useContext` 结合使用时，可以将状态和分发函数提供给需要的组件，而无需逐层传递。

   ```javascript
   const CountContext = React.createContext();
   
   function reducer(state, action) {
       switch (action.type) {
           case 'increment':
               return { count: state.count + 1 };
           case 'decrement':
               return { count: state.count - 1 };
           default:
               throw new Error();
       }
   }
   
   function Counter() {
       const [state, dispatch] = useReducer(reducer, { count: 0 });
   
       return (
           <CountContext.Provider value={{ state, dispatch }}>
               <ChildComponent />
           </CountContext.Provider>
       );
   }
   
   function ChildComponent() {
       const { state, dispatch } = useContext(CountContext);
       return (
           <div>
               Count: {state.count}
               <button onClick={() => dispatch({ type: 'increment' })}>+</button>
               <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
           </div>
       );
   }
   ```

**适用性与注意事项**

- **适用性**：
  - `useContext` 适用于需要跨多个组件共享状态的场景，避免不必要的属性传递，特别是在状态涉及到多个组件层级时。
- **注意事项**：
  - 不要滥用 `useContext`。如果数据仅在少量组件之间共享，或局部状态足够处理问题，可能并不需要使用 `useContext`。
  - `useContext` 提供的数据是引用类型的，如果上下文中的数据变化会导致使用该上下文的所有组件重新渲染。因此，确保合理组织和管理上下文的数据以避免性能问题。

## React 中的 hooks 和 memorizedState 是什么关系?

在 React 中，**Hooks** 和 **MemorizedState** 都与组件的状态管理和性能优化有关，但它们的作用和实现方式不同。

**Hooks**

Hooks 是 React 16.8 引入的一组 API，使函数组件能够拥有状态和副作用管理的能力，之前这些特性只有在类组件中才可以使用。常用的 Hooks 包括：

- **`useState`**：用于在函数组件中添加状态。
- **`useEffect`**：用于处理副作用，如数据获取和订阅。
- **`useContext`**：用于在组件树中共享状态。
- **`useReducer`**：用于处理更复杂的状态逻辑。
- **`useMemo`** 和 **`useCallback`**：用于性能优化，避免不必要的重新渲染。

**MemorizedState**

**MemorizedState** 是 React 内部的一种实现机制，用于优化组件的性能。它是 React 在内部管理组件状态时使用的一种状态存储方式，尤其是与 Hooks 的实现密切相关。

- **在 React 中，`useState` 和 `useReducer` 的实现依赖于 MemorizedState**：当你调用 `useState` 或 `useReducer` 时，React 会为每个组件实例创建一个 `MemorizedState` 对象来存储状态。这些状态在组件重新渲染时会被保留，确保组件的状态在生命周期中保持一致。
- **`MemorizedState` 的作用是优化性能**：它帮助 React 追踪状态的变化，并在组件重新渲染时有效地管理和更新状态。

**Hooks 与 MemorizedState 的关系**

1. **状态管理**：Hooks（如 `useState` 和 `useReducer`）允许你在函数组件中管理状态。它们背后使用了 MemorizedState 来存储和管理这些状态。
2. **性能优化**：
   - **`useMemo` 和 `useCallback`**：这些 Hooks 依赖于 MemorizedState 来缓存计算结果和函数，从而避免不必要的重新计算和重新渲染。
   - **MemorizedState 的缓存机制**：React 使用 MemorizedState 来缓存组件的状态和计算结果，这与 `useMemo` 和 `useCallback` 的功能类似，但在更底层的实现中起作用。
3. **内部实现**：
   - **`useState` 和 `useReducer`**：当调用这些 Hooks 时，React 内部会创建一个 MemorizedState 对象来存储状态值。
   - **性能优化 Hooks**：`useMemo` 和 `useCallback` 使用 MemorizedState 来存储缓存的计算结果或函数引用，从而避免每次渲染时重新计算。



## React 中，怎么给 children 添加额外的属性？



在 React 中，`children` 是一个特殊的 prop，用于传递子组件或元素。虽然直接给 `children` 添加属性是不可能的，但可以使用一些方法来为子组件传递额外的属性。

**方法一：使用 React.cloneElement**

`React.cloneElement` 是 React 提供的一个 API，用于克隆一个元素并添加额外的属性。这种方法适用于在渲染过程中动态地为 `children` 添加属性。

**示例**：

```javascript
import React from 'react';

function ParentComponent({ children }) {
  // 为每个子元素添加额外的属性
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { extraProp: 'value' })
  );

  return <div>{childrenWithProps}</div>;
}

function ChildComponent(props) {
  return <div>{props.extraProp}</div>;
}

// 使用示例
export default function App() {
  return (
    <ParentComponent>
      <ChildComponent />
      <ChildComponent />
    </ParentComponent>
  );
}
```

**说明**：

- `React.Children.map` 遍历 `children` 并应用 `React.cloneElement`。
- `React.cloneElement` 克隆每个子元素，并添加 `extraProp` 属性。

**方法二：使用 Context API**

另一种方法是使用 React 的 Context API 传递额外的属性。这种方法适用于全局传递数据或配置，尤其是当有多个嵌套组件时。

**示例**：

```javascript
import React, { createContext, useContext } from 'react';

// 创建一个 Context
const ExtraPropsContext = createContext({ extraProp: 'default' });

function ParentComponent({ children }) {
  const extraProps = { extraProp: 'value' };

  return (
    <ExtraPropsContext.Provider value={extraProps}>
      {children}
    </ExtraPropsContext.Provider>
  );
}

function ChildComponent() {
  const { extraProp } = useContext(ExtraPropsContext);

  return <div>{extraProp}</div>;
}

// 使用示例
export default function App() {
  return (
    <ParentComponent>
      <ChildComponent />
      <ChildComponent />
    </ParentComponent>
  );
}
```

**说明**：

- 使用 `createContext` 和 `Provider` 传递额外的属性。
- 使用 `useContext` 在子组件中获取这些属性。

**方法三：通过 Props 传递**

直接将额外的属性作为普通的 prop 传递给子组件，这种方法适用于显式传递和少量的属性。

**示例**：

```javascript
import React from 'react';

function ParentComponent({ children }) {
  const extraProp = 'value';

  return (
    <div>
      {React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child, { extraProp }) : child
      )}
    </div>
  );
}

function ChildComponent(props) {
  return <div>{props.extraProp}</div>;
}

// 使用示例
export default function App() {
  return (
    <ParentComponent>
      <ChildComponent />
      <ChildComponent />
    </ParentComponent>
  );
}
```

**说明**：

- 在父组件中为子组件添加额外的 prop。



## React 中，构建组件的方式有哪些？

在 React 中，构建组件的方式主要有以下几种：

**1. 函数组件 (Function Components)**

函数组件是最常用的组件形式，使用 JavaScript 函数来定义。自 React Hooks 引入以来，函数组件得到了广泛使用。

```javascript
import React from 'react';

const MyComponent = () => {
  return <div>Hello, Function Component!</div>;
};

export default MyComponent;
```

**2. 类组件 (Class Components)**

类组件是通过 ES6 的类语法定义的，适合需要使用生命周期方法的场景。虽然现在推荐使用函数组件和 Hooks，但类组件依然在一些老旧代码中存在。

```javascript
import React, { Component } from 'react';

class MyClassComponent extends Component {
  render() {
    return <div>Hello, Class Component!</div>;
  }
}

export default MyClassComponent;
```

**3. 高阶组件 (Higher-Order Components, HOCs)**

高阶组件是接受一个组件作为参数并返回一个新的组件的函数。这种模式用于代码复用和逻辑封装。

```javascript
import React from 'react';

const withExtraInfo = (WrappedComponent) => {
  return (props) => {
    return (
      <div>
        <WrappedComponent {...props} />
        <p>Additional Info</p>
      </div>
    );
  };
};

export default withExtraInfo;
```

**4. 组合组件 (Composition Components)**

通过组合多个小组件来构建复杂组件。使用组合的方式可以提高组件的复用性和可维护性。

```javascript
const ParentComponent = () => (
  <div>
    <ChildComponentA />
    <ChildComponentB />
  </div>
);
```

**5. Render Props**

通过将一个函数作为 props 传递给组件，允许调用该函数来控制组件的渲染。这种模式用于实现复杂的逻辑和状态共享。

```javascript
const DataProvider = ({ render }) => {
  const data = { /* some data */ };
  return render(data);
};

// 使用
<DataProvider render={(data) => <MyComponent data={data} />} />
```

**6. 自定义 Hook**

虽然不直接构建组件，但自定义 Hook 是一种封装逻辑和状态的方式，可以在函数组件中复用。

```javascript
复制import { useState, useEffect } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);

  return data;
};
```



## React 是怎么渲染出页面的？

React 渲染页面的过程主要包括以下几个步骤：

**1. 创建虚拟 DOM**

- **组件定义**：当你定义一个组件并调用 `render` 方法时，React 会根据组件的 JSX 结构创建一个虚拟 DOM。这是一个轻量级的 JavaScript 对象，描述了 UI 的结构。

**2. 渲染到真实 DOM**

- **初始渲染**：在组件首次渲染时，React 会将虚拟 DOM 转换为实际的 DOM 元素，并将其插入到页面中。通常是通过 `ReactDOM.render()` 方法完成的。

```javascript
import ReactDOM from 'react-dom';

ReactDOM.render(<MyComponent />, document.getElementById('root'));
```

**3. 组件更新**

- **状态或属性变化**：当组件的状态（state）或属性（props）发生变化时，React 会重新调用组件的 `render` 方法，生成新的虚拟 DOM。

**4. Diff 算法**

- **比较新旧虚拟 DOM**：React 使用高效的 Diff 算法对比新旧虚拟 DOM，以找到需要更新的部分。这个过程称为“调和”（reconciliation）。

**5. 更新真实 DOM**

- **最小化 DOM 操作**：根据 Diff 算法的结果，React 会计算出最小的 DOM 更新操作，只对那些发生变化的部分进行实际更新，而不是重新渲染整个页面。

**6. 生命周期方法**

- **调用生命周期方法**：在渲染过程中，React 会调用组件的生命周期方法，例如 `componentDidMount`、`componentDidUpdate` 等，以允许开发者在不同的渲染阶段执行特定的逻辑。

**7. 批处理更新**

- **批量更新**：在事件处理时，React 会将多个状态更新合并为一次渲染，减少不必要的 DOM 操作，提高性能。

**8. 异步渲染**

- **并发渲染**：从 React 16 开始，React 支持异步渲染，可以在不阻塞主线程的情况下进行 UI 更新，以提升用户体验。



## React 中，如何实现类似于 Vue-router 提供的路由守卫？

在 React 中，虽然没有像 Vue-router 这样内置的路由守卫功能，但我们可以通过组合 React Router 和一些自定义逻辑来实现类似于 Vue-router 提供的路由守卫功能。

下面介绍几种实现方式。

**方法一：使用 `useEffect` 钩子在组件层面实现**

对于需要进行路由守卫的组件，可以在组件的 `useEffect` 中添加相应的导航逻辑。这种方式类似于 Vue 的 `beforeRouteEnter` 守卫。

```javascript
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = checkAuthentication(); // 自定义的身份验证逻辑
    if (!isAuthenticated) {
      navigate('/login'); // 如果未登录，重定向到登录页面
    }
  }, [navigate]);

  return <div>Protected Content</div>;
}
```

**方法二：使用高阶组件 (Higher-Order Component)**

通过高阶组件（HOC），可以将路由守卫的逻辑封装在组件外部，从而实现类似全局路由守卫的功能。

```javascript
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

const withAuthGuard = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const isAuthenticated = checkAuthentication(); // 自定义的验证逻辑
      if (!isAuthenticated) {
        navigate('/login'); // 如果未通过验证，重定向
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

const ProtectedComponent = () => {
  return <div>Protected Content</div>;
};

export default withAuthGuard(ProtectedComponent);
```

**方法三：通过 React Router `Outlet` 和中间件模式**

React Router 提供了 `<Outlet />` 组件，它可以允许我们将路由守卫逻辑应用到某些路由集合上。可以通过中间件模式对路由进行守卫。

```javascript
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

// 使用：
<Route path="/protected" element={<ProtectedRoute isAuthenticated={authStatus} />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

在上面的例子中，如果用户未通过身份验证，`ProtectedRoute` 将重定向到 `/login`，否则允许继续加载子路由。

**方法四：在路由配置中实现路由守卫逻辑**

可以通过在路由配置中直接实现身份验证或其他守卫逻辑。

```javascript
import { Route, Routes, Navigate } from 'react-router-dom';

function PrivateRoute({ element: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
}

function App() {
  const isAuthenticated = checkAuthentication(); // 自定义验证逻辑

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <PrivateRoute path="/dashboard" element={<Dashboard />} isAuthenticated={isAuthenticated} />
    </Routes>
  );
}
```

**方法五：使用 Redux 或 Context 实现全局守卫**

结合 `useContext` 或 `Redux`，可以将身份验证状态存储在全局状态中，然后在每个需要守卫的组件或路由上进行判断。

1. **通过 Context 实现：**

```javascript
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

function ProtectedComponent() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // 重定向到登录页面
    }
  }, [isAuthenticated, navigate]);

  return <div>Protected Content</div>;
}
```

1. **通过 Redux 实现：**

```javascript
复制import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectedComponent() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return <div>Protected Content</div>;
}
```



## 为什么 react 组件中， 都需要声明 import React from 'react'?

与 React 的早期设计和 JSX 语法的处理密切相关，具体来说，主要是以下原因：

1. **JSX 需要 React**

在 React 的早期版本中，JSX（JavaScript XML）是通过 JavaScript 语法扩展来实现的。JSX 代码本质上是一个类似 XML 的语法糖，它会被 Babel 转换为 `React.createElement()` 调用。

例如，下面的 JSX 代码：

```javascript
const element = <h1>Hello, world!</h1>;
```

在 Babel 转译后，会变成类似如下的代码：

```javascript
const element = React.createElement('h1', null, 'Hello, world!');
```

可以看到，JSX 最终会被转换为 `React.createElement()` 的调用。因此，在使用 JSX 时，必须导入 `React`，否则编译器会找不到 `React.createElement` 函数，导致错误。

2. **React 需要作为一个全局对象**

`React.createElement()` 是创建 React 元素的基础函数。为了能够正确生成虚拟 DOM 和管理组件，React 库提供了必要的 API。因此，导入 `React` 是为了能够调用这些方法。

3. **Babel 的转换（之前的工作原理）**

在 JSX 编译阶段，Babel 会将 JSX 转换为 `React.createElement()` 函数调用。因此，React 在 JSX 文件中成为了必需的导入项。如果没有导入 React，Babel 在转换过程中将无法找到 `React.createElement`，从而导致错误。

**随着 React 17 的更新：**

自 React 17 版本开始，**JSX 转换**的工作有所变化。React 17 引入了新的 JSX 转换方式，允许开发者不再显式地导入 `React`。这是通过新的 JSX 编译器来实现的，不再需要将 JSX 转换为 `React.createElement` 调用。

在 React 17 及以后的版本中，Babel 会自动处理 `React` 的引入，具体来说：

- **不再需要显式地导入 React**：如果你使用了 React 17 或更高版本，并且配置了正确的 Babel 插件（如 `@babel/preset-react`），JSX 的编译器会自动将 `React` 导入到每个文件中，从而不再需要手动编写 `import React from 'react';`。

4. **向后兼容**

虽然 React 17 之后不再强制要求显式导入 `React`，但由于许多项目仍然使用较旧的 React 版本，或者代码库中有其他工具、库的兼容性问题，开发者可能仍然看到许多项目中保留 `import React from 'react';`。此外，如果你使用 TypeScript，或者一些特殊的工具链配置，可能仍然需要手动导入。

## 在 React 项目中， 是否可以不用 react-router， 使用浏览器原生 history 路由来组织页面路由？

在 React 项目中，**可以不用 `react-router`**，直接使用浏览器原生的 **`history`** API 来组织页面路由。实际上，`react-router` 本质上也是基于浏览器的 `history` API 实现的路由功能，它提供了一个封装好的、更易于使用的路由管理工具。

使用浏览器原生 `history` API 进行路由管理

React 提供了 `history` API 作为浏览器的原生路由系统，包含了 `window.history` 相关方法（如 `pushState`, `replaceState`, `popState` 等）。你可以通过这些 API 手动实现路由的控制，并结合 React 状态管理来更新页面视图。

以下是使用原生 `history` API 管理路由的基本步骤：

1. **创建路由管理逻辑**

使用原生 `history` API，你需要自己处理 URL 的变化、浏览器历史栈的管理以及与 React 组件的匹配。

示例代码：

```javascript
import React, { useState, useEffect } from 'react';

// 简单的路由管理器
function useHistory() {
  const [location, setLocation] = useState(window.location.pathname);

  useEffect(() => {
    // 监听浏览器的历史变化
    const handlePopState = () => {
      setLocation(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const push = (path) => {
    window.history.pushState(null, '', path);
    setLocation(path);  // 更新当前路径
  };

  const replace = (path) => {
    window.history.replaceState(null, '', path);
    setLocation(path);  // 更新当前路径
  };

  return { location, push, replace };
}

const Route = ({ path, component }) => {
  return window.location.pathname === path ? component : null;
};

// 主应用组件
function App() {
  const { location, push } = useHistory();

  return (
    <div>
      <nav>
        <button onClick={() => push('/')}>Home</button>
        <button onClick={() => push('/about')}>About</button>
      </nav>

      <div>
        <Route path="/" component={<div>Home Page</div>} />
        <Route path="/about" component={<div>About Page</div>} />
      </div>
    </div>
  );
}

export default App;
```

2. **解释代码**

- `useHistory` 是自定义 Hook，用来管理路由的变化和浏览器的历史记录。
- `window.history.pushState` 用来修改浏览器的 URL，而不刷新页面。它会向历史记录栈中添加一个新的记录。
- `window.history.replaceState` 用来替换当前的 URL，而不新增历史记录。
- 通过监听 `popstate` 事件来处理浏览器后退、前进操作，确保页面和历史状态同步。
- `Route` 组件根据当前的 `window.location.pathname` 来判断是否匹配当前路由并渲染对应的内容。

3. **优缺点分析**

优点：

- **控制性更强**：使用原生的 `history` API，你完全控制路由的行为，可以根据需求自由设计路由逻辑。
- **依赖较少**：不需要额外安装第三方路由库（如 `react-router`），减少了项目的依赖。
- **更细粒度的控制**：可以在路由变更时执行自定义逻辑，比如路由过渡动画、权限控制等。

缺点：

- **代码复杂度较高**：需要自己处理路由匹配、页面切换、浏览器历史栈管理等逻辑，容易出现重复代码和潜在的 bug。
- **缺少功能**：像 `react-router` 提供的路由嵌套、动态路由、参数提取、重定向等功能需要你自己实现。
- **性能优化问题**：手动管理路由时，需要自己优化性能，尤其是与 React 组件的渲染结合时，可能需要更多的工作来确保视图的高效更新。

4. **与 `react-router` 的比较**

`react-router` 提供了大量现成的功能，如路由嵌套、重定向、动态路由匹配、路由守卫等，这些都是你使用原生 `history` API 时需要自己实现的。如果你的应用比较简单，不需要复杂的路由功能，使用原生 `history` API 是完全可行的。

但对于大型应用，`react-router` 提供了更加简洁、可扩展的路由管理方式，能大大减少开发成本，并且有广泛的社区支持。

5. **何时选择原生 `history` API**

你可以选择使用原生 `history` API 的情况包括：

- 应用的路由需求简单，不需要复杂的路由嵌套、动态路由、权限控制等功能。
- 希望减少第三方库的依赖，或者希望自己对路由的行为进行更细粒度的控制。
- 学习或实践如何在前端实现路由。

## React 为什么要自己实现调度器， 而不是直接使用 requestIdleCallback ？



主要是因为以下几个原因：

1. **对任务优先级的精确控制**

React 需要根据不同类型的任务（例如更新视图、处理事件、执行动画等）来控制任务的优先级，而 `requestIdleCallback` 并不提供足够细粒度的优先级控制。

- **React 的调度器**（比如 React Fiber 调度器）允许它精确地控制任务的优先级，支持 **高优先级任务**（例如用户输入）和 **低优先级任务**（例如空闲时的渲染更新）。
- `requestIdleCallback` 只提供了一个简单的空闲时间回调，它并没有内建对任务优先级的控制能力。所有的任务都会在浏览器空闲时执行，这样可能会导致一些高优先级任务被低优先级任务阻塞，无法及时处理。

2. **任务的中断与抢占**

React 需要在渲染过程中支持任务的中断和抢占，以保证用户交互的流畅性和响应性。React 调度器实现了 **时间切片** 和 **任务中断**，可以在渲染过程中暂停低优先级的任务，去执行高优先级的任务（比如响应用户输入）。

- **`requestIdleCallback`** 是在浏览器空闲时才执行的，无法灵活地中断正在进行的任务并优先处理高优先级任务。因此，React 需要更细粒度的调度来中断低优先级的渲染任务，确保用户交互的即时反馈。

3. **跨浏览器兼容性**

`requestIdleCallback` 是一个相对较新的浏览器 API，并不是所有浏览器都支持它，特别是在旧版浏览器中。为了确保 React 在更多浏览器上都能正常工作，React 选择使用自定义的调度机制来处理任务，而不依赖于 `requestIdleCallback`。

- React 的调度器（例如 Fiber 调度器）能在所有浏览器中正常工作，而不依赖于特定的浏览器 API。

4. **能耗管理**

React 自己实现的调度器可以对空闲时间和浏览器的任务执行进行优化，最大限度地减少电池消耗和资源浪费。通过精确控制何时以及如何执行任务，React 可以避免不必要的计算，尤其是在移动设备上。

- `requestIdleCallback` 调度任务的时机完全取决于浏览器空闲的状态，这可能导致在设备负载较高时浏览器频繁执行不必要的回调，消耗更多电量和计算资源。

5. **更强的可定制性**

React 需要支持许多不同类型的任务，例如事件处理、动画、数据加载和视图更新。React 自己的调度器能够更灵活地处理这些任务的优先级和执行时机。而 `requestIdleCallback` 仅提供一个回调，无法处理那么多类型的任务。



## React 中的 forwardsRef，作用是什么， 有哪些使用场景？

在 React 中，`forwardRef` 是一个高阶组件（HOC），用于**转发引用（ref）**到子组件的 DOM 元素或子组件内部的某个实例上。通常，React 的 `ref` 是用来直接访问 DOM 元素或组件实例的，但是在函数组件中，`ref` 是无法直接使用的，因为函数组件没有实例。

`forwardRef` 允许我们在函数组件中**传递** `ref`，将其绑定到组件内部的 DOM 元素或组件实例上，从而能够在父组件中访问这个子组件的 DOM 或实例方法。

1. **`forwardRef` 的作用**

`forwardRef` 使得我们能够将 `ref` 从父组件转发到子组件中，使得父组件能够访问子组件的内部 DOM 元素或方法。

2. **`forwardRef` 的语法**

`forwardRef` 接受一个函数组件，并返回一个新的组件，该组件会接收 `ref` 参数并将其转发到子组件。

```javascript
import React, { forwardRef } from 'react';

// 使用 forwardRef 创建一个转发 ref 的组件
const MyButton = forwardRef((props, ref) => {
  return <button ref={ref}>{props.children}</button>;
});

export default MyButton;
```

在上面的例子中，`MyButton` 组件是一个函数组件，接受 `props` 和 `ref` 作为参数。`forwardRef` 将 `ref` 转发到 `<button>` 元素上。

3. **使用场景**

场景 1：访问子组件的 DOM 元素

父组件想要直接访问子组件的 DOM 元素或执行某些操作（例如聚焦某个输入框）。

```javascript
import React, { useRef } from 'react';
import { forwardRef } from 'react';

// 定义一个转发 ref 的函数组件
const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

function ParentComponent() {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus();  // 访问子组件的 DOM 元素，执行聚焦操作
  };

  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

export default ParentComponent;
```

在这个例子中，`Input` 组件通过 `forwardRef` 转发 `ref`，让父组件能够直接访问并操作 `<input>` 元素，例如聚焦。

场景 2：将 `ref` 转发到第三方库的组件

在使用第三方库时，通常我们需要通过 `ref` 来获取其组件的 DOM 元素或实例方法。如果该库的组件是一个函数组件，而不是类组件，`ref` 默认是无法传递的。此时可以使用 `forwardRef` 来实现。

例如，第三方库中的一个组件：

```javascript
// ThirdPartyComponent.js
import React from 'react';

function ThirdPartyComponent() {
  return <div>Some third party component</div>;
}

export default ThirdPartyComponent;
```

如果我们想要通过 `ref` 访问这个 `div`，就可以使用 `forwardRef` 进行封装：

```javascript
// WrappedComponent.js
import React, { forwardRef } from 'react';
import ThirdPartyComponent from './ThirdPartyComponent';

const WrappedComponent = forwardRef((props, ref) => {
  return <ThirdPartyComponent ref={ref} {...props} />;
});

export default WrappedComponent;
```

场景 3：高阶组件中的 `ref` 转发

在某些高阶组件中，我们需要将 `ref` 转发到被包装组件的根元素。这样父组件可以使用 `ref` 获取到子组件的 DOM 元素。

```javascript
import React, { forwardRef } from 'react';

function withExtraStyles(Component) {
  return forwardRef((props, ref) => {
    return <Component ref={ref} {...props} style={{ color: 'red' }} />;
  });
}

const Button = (props) => {
  return <button {...props}>Click me</button>;
};

const StyledButton = withExtraStyles(Button);

function Parent() {
  const buttonRef = React.useRef();

  const handleClick = () => {
    console.log(buttonRef.current); // 访问按钮的 DOM 元素
  };

  return (
    <div>
      <StyledButton ref={buttonRef} onClick={handleClick} />
    </div>
  );
}
```

在这个例子中，`withExtraStyles` 是一个高阶组件（HOC），它通过 `forwardRef` 将 `ref` 转发到 `Button` 组件，并在 `StyledButton` 中添加样式。

## React 19 有哪些新特性？

Action

React 应用的一个常见场景是执行数据突变，然后更新状态作为响应。举个栗子，当用户提交表单更改姓名时，我们会发出 API 请求，然后处理响应。

回首往昔，我们需要手动处理待定状态、错误、乐观更新和顺序请求。

举个栗子，我们会这样处理 `useState` 中的待定状态和错误状态：

```javascript
// Action 之前的写法
function UpdateName({}) {
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const handleSubmit = async () => {
    setIsPending(true)
    const error = await updateName(name)
    setIsPending(false)

    if (error) {
      setError(error)
      return
    }
    redirect('/path')
  }

  return (
    <div>
      <input value={name} onChange={event => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  )
}
```

在 React 19 中，我们添加了在过渡中使用异步函数的支持，自动处理待定状态、错误、表单和乐观更新。

举个栗子，我们可以使用 `useTransition` 处理待定状态：

```javascript
// 使用 action 中的待定状态
function UpdateName({}) {
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [isPending, startTransition] = useTransition()
  const handleSubmit = async () => {
    startTransition(async () => {
      const error = await updateName(name)

      if (error) {
        setError(error)
        return
      }
      redirect('/path')
    })
  }

  return (
    <div>
      <input value={name} onChange={event => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  )
}
```

异步过渡会立即把 `isPending` 状态设置为 `true`，发出异步请求，并在任何过渡后把 `isPending` 切换为 `false`。这允许我们在数据更改时，保持当前 UI 的响应能力和交互性。

粉丝请注意，**按照惯例，使用异步过渡的函数称为“Action”（操作）**。

Action 会自动为我们管理提交数据：

- **待定状态**：Action 提供待定状态，该状态在请求开始时启动，且在提交最终状态更新时自动重置。
- **乐观更新**：Action 支持全新的 `useOptimistic` hook，因此我们可以在提交请求时，向用户表演即时反馈。
- **错误处理**：Action 提供错误处理，这样我们可以在请求失败时显示错误边界，且自动将乐观更新恢复为其原始值。
- **表单**：`<form>` 元素现在支持将函数传递给 `action` 和 `formAction` 属性。将函数传递给 `action` 属性默认使用 Action，并在提交后自动重置表单。

React 19 构建于 Action 之上，引入 `useOptimistic` 来管理乐观更新，并引入全新的 `React.useActionState` hook 来处理 Action 的常见情况。

在 `react-dom` 中，我们添加了 `<form>` Action 自动管理表单，并添加了 `useFormStatus` 支持表单中 Action 的常见情况。

在 React 19 中，上述例子可以简化为：

```javascript
// 使用 <form> Action 和 useActionState
function ChangeName({ name, setName }) {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get('name'))
      if (error) {
        return error
      }
      redirect('/path')
    }
  )

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </form>
  )
}
```

新型 hook：`useActionState`

为了使 Action 更容易处理常见情况，我们添加了一个全新的 `useActionState` hook：

```javascript
const [error, submitAction, isPending] = useActionState(
  async (previousState, newName) => {
    const error = await updateName(newName)
    if (error) {
      // 我们可以返回该 Action 的任何结果。
      // 比如，这里我们只返回了 error。
      return error
    }
    // 处理成功的逻辑
  }
)
```

`useActionState` 接受一个“Action”函数，并返回一个包装的 Action 来调用。

这能奏效，因为 Action 可以组合。当调用包装的 Action 时，`useActionState` 会返回 Action 的结果作为 `data`，并将 Action 的待定状态返回为 `pending`。

请注意，`React.useActionState` 以前在 Canary 版本中被称为 `ReactDOM.useFormState`，但我们已将其重命名，并弃用 `useFormState`。

React DOM：`<form>` Action

Action 还集成了 React 19 `react-dom` 中的 `<form>` 新功能。

我们添加了对将函数作为 `action` 和 `<form>`、`<input>`、`<button>` 等元素的 `formAction` 属性传递的支持，使用 Action 自动提交表单的元素：

```javascript
<form action={actionFunction}>
```

当 `<form>` Action 成功时，React 会自动重置非受控组件的表单。如果我们需要手动重置 `<form>`，可以调用全新的 `requestFormReset` React DOM API。

React DOM：新型 hook：`useFormStatus`

在设计系统中，通常会编写需要访问其所在 `<form>` 信息的设计组件，而无需将 `props` 向下透传到组件。

这可以通过 Context 实现，但为了使常见情况更容易，我们添加了一个全新的 `useFormStatus` Hook：

```javascript
import { useFormStatus } from 'react-dom'

function DesignButton() {
  const { pending } = useFormStatus()
  return <button type="submit" disabled={pending} />
}
```

`useFormStatus` 读取父级 `<form>` 的状态，就好像表单是 Context provider 一样。

新型 hook：`useOptimistic`

执行数据突变时的另一种常见 UI 模式是，在异步请求进行时乐观地展示最终状态。

在 React 19 中，我们添加了一个全新的 `useOptimistic` hook，从而简化此操作：

```javascript
function ChangeName({ currentName, onUpdateName }) {
  const [optimisticName, setOptimisticName] = useOptimistic(currentName)

  const submitAction = async formData => {
    const newName = formData.get('name')
    setOptimisticName(newName)
    const updatedName = await updateName(newName)
    onUpdateName(updatedName)
  }

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <p>
        <label>Change Name:</label>
        <input
          type="text"
          name="name"
          disabled={currentName !== optimisticName}
        />
      </p>
    </form>
  )
}
```

当 `updateName` 请求正在进行时，`useOptimistic` hook 会立即渲染 `optimisticName`。当更新完成或出错时，React 会自动切换回 `currentName` 的值。

新型 API：`use`

在 React 19 中，我们引入了一个全新的 `use` API 来读取渲染中的资源。

举个栗子，我们可以使用 `use` 读取 promise 对象，React 会暂停直到该 promise 对象解决：

```javascript
import { use } from 'react'

function Comments({ commentsPromise }) {
  // use 会暂停直到 promise 解决。
  const comments = use(commentsPromise)
  return comments.map(comment => <p key={comment.id}>{comment}</p>)
}

function Page({ commentsPromise }) {
  // 当 use 在 Comments 组件中暂停时，
  // 这个 Suspense 会展示出来。
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  )
}
```

粉丝请注意，**`use` 不支持渲染中创建的 promise 对象**。

如果我们尝试将渲染中创建的 promise 对象传递给 `use`，React 会发出警告。

要修复此问题，我们需要传递一个支持缓存 promise 对象的框架或 Suspense 驱动的库中的 promise 对象。将来，我们计划发布某些功能，更轻松地在渲染中缓存 promise 对象。

我们还可以使用 `use` 读取 Context，这允许我们条件读取 Context，比如在提前返回后：

```javascript
import { use } from 'react'
import ThemeContext from './ThemeContext'

function Heading({ children }) {
  if (children == null) {
    return null
  }
  // 由于提前返回，
  // 这里使用 useContext 无法奏效。
  const theme = use(ThemeContext)
  return <h1 style={{ color: theme.color }}>{children}</h1>
}
```

`use` API 能且仅能在 `render` 中调用，类似于 hook。与 hook 不同，`use` 可以条件调用。未来我们计划支持更多方式使用 `use` 在渲染中消费资源。

## React 服务器组件

服务器组件

服务器组件是一个新选项，允许在打包之前在与客户端应用或 SSR 服务器分开的环境中提前渲染组件。

这个独立的环境是服务器组件中的“服务器”。服务器可以在构建时在 CI 服务器上运行一次，也可以使用 Web 服务器针对每个请求运行。

React 19 包含 Canary 版本中包含的所有服务器组件功能。这意味着，伴随服务器组件一起提供的库现在可以将 React 19 作为具有 `react-server` 导出条件的 peer 依赖，以便在支持全栈 React 架构的框架中使用。

粉丝请注意，**如何建立对服务器组件的支持**？

虽然 React 19 的服务器组件是稳定的，且不会在主版本间损坏，但用于实现服务器组件的打包器器或框架的底层 API 不遵循语义化版本规范，且可能在 React 19.x 的次版本间损坏。

为了支持服务器组件作为打包器或框架，我们建议锁定特定的 React 版本，或者使用 Canary 版本。我们会继续与打包器和框架合作，以稳定将来用于实现服务器组件的 API。

Server Action（服务器操作）

服务器操作允许客户端组件调用在服务器上执行的异步函数。

当使用 `"use server"` 指令定义服务器操作时，您的框架会自动创建对服务器函数的引用，并将该引用传递给客户端组件。当客户端调用该函数时，React 会向服务器发送请求来执行该函数，并返回结果。

请注意，**没有专属服务器组件的指令**。

一个常见的误区是，服务器组件会使用 `"use server"` 表示，但其实服务器组件没有专属指令。`"use server"` 指令用于服务器操作。

服务器操作可以在服务器组件中创建，并作为属性传递给客户端组件，也可以在客户端组件中导入和使用。





## React 中，如何避免使用 context 时， 引起整个挂载节点树的重新渲染

在 React 中，使用 `context` 的一个常见问题是，当 `context` 的值发生变化时，整个依赖该 `context` 的组件树会重新渲染。

为了避免这种性能开销，可以采用以下优化策略：

**1. 将 Context 分离到更小的粒度**

将 `context` 拆分成多个独立的 `context`，每个 `context` 只管理独立的数据，而不是将所有状态集中在一个 `context` 中。

**示例：**

```javascript
const UserContext = React.createContext();
const ThemeContext = React.createContext();

// 分离用户数据和主题数据到不同的 context
function App() {
  return (
    <UserContext.Provider value={{ name: 'John' }}>
      <ThemeContext.Provider value="dark">
        <SomeComponent />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
```

这种方式能确保更改 `ThemeContext` 的值时，不会导致依赖 `UserContext` 的组件重新渲染。

**2. 使用 `React.memo` 优化子组件**

如果某些组件只需要 `context` 的一部分值，但渲染逻辑中不直接依赖它们，可以通过 `React.memo` 阻止不必要的渲染。

**示例：**

```
const UserContext = React.createContext();

function UserName() {
  const { name } = React.useContext(UserContext);
  console.log('UserName renders'); // 检查是否重新渲染
  return <div>User: {name}</div>;
}

const MemoizedUserName = React.memo(UserName);

function App() {
  const [user, setUser] = React.useState({ name: 'John' });

  return (
    <UserContext.Provider value={user}>
      <MemoizedUserName />
      <button onClick={() => setUser({ name: 'Doe' })}>Change Name</button>
    </UserContext.Provider>
  );
}
```



**3. 使用 `context` 的选择器**

借助外部库（如 `react-context-selector`）实现细粒度选择器，只订阅 `context` 的部分值，而不是整个 `context` 对象。

**示例：**

```javascript
import { createContext, useContextSelector } from 'use-context-selector';

const UserContext = createContext();

function UserName() {
  const name = useContextSelector(UserContext, user => user.name);
  console.log('UserName renders'); // 检查是否重新渲染
  return <div>User: {name}</div>;
}

function App() {
  const [user, setUser] = React.useState({ name: 'John', age: 30 });

  return (
    <UserContext.Provider value={user}>
      <UserName />
      <button onClick={() => setUser({ name: 'Doe', age: 30 })}>
        Change Name
      </button>
    </UserContext.Provider>
  );
}
```

在这种方式下，`UserName` 只会重新渲染当 `user.name` 发生变化时，而不会受到 `user.age` 的影响。



**4. 使用嵌套 `Provider`**

对于大型项目，可以将 `context` 的范围限制到尽可能小的组件子树。

**示例：**

```javascript
const UserContext = React.createContext();

function UserName() {
  const { name } = React.useContext(UserContext);
  return <div>User: {name}</div>;
}

function App() {
  const [user, setUser] = React.useState({ name: 'John' });

  return (
    <>
      <UserContext.Provider value={user}>
        <UserName />
      </UserContext.Provider>
      {/* 其他子树不受 UserContext 的影响 */}
    </>
  );
}
```



**5. 通过子组件的 props 传递 context 的值**

当 `context` 只需要被特定子组件使用时，可以直接将其值作为 `props` 传递，而不是通过 `useContext`。

**示例：**

```javascript
function UserName({ name }) {
  console.log('UserName renders'); // 检查是否重新渲染
  return <div>User: {name}</div>;
}

function App() {
  const [user, setUser] = React.useState({ name: 'John' });

  return (
    <>
      <UserName name={user.name} />
      <button onClick={() => setUser({ name: 'Doe' })}>Change Name</button>
    </>
  );
}
```



## React 的循环渲染中，为什么不推荐使用 index 作为元素的 key？

在 React 中，`key` 是用于标识每个列表项的唯一标识符，以便在渲染过程中有效跟踪每个元素的变化。

虽然可以使用 `index` 作为 `key`，但并不推荐这样做，原因如下：

**1. 会导致不必要的重新渲染**

当使用 `index` 作为 `key` 时，如果列表项的顺序发生变化（如增删或移动），React 无法正确识别哪个项是真正变化的。它可能会重用错误的 DOM 节点，导致性能问题或错误的 UI 展现。

**示例：**

```javascript
const items = ['A', 'B', 'C'];
// 使用 index 作为 key
{items.map((item, index) => (
  <div key={index}>{item}</div>
))}

// 假设删除了第一个项
const newItems = ['B', 'C'];
```

React 会将第二个列表项 `B` 误认为是原来的第一个项，因为它们的 `key` 是相同的。



**2. 导致状态错乱**

如果列表项中有状态（如输入框的值），当列表顺序变化时，状态可能被错误地绑定到其他项上，造成用户体验问题。

**示例：**

```javascript
function App() {
  const [items, setItems] = React.useState(['A', 'B', 'C']);
  
  const handleRemove = () => setItems(['B', 'C']);
  
  return (
    <>
      {items.map((item, index) => (
        <input key={index} defaultValue={item} />
      ))}
      <button onClick={handleRemove}>Remove First</button>
    </>
  );
}
```

移除第一项后，输入框的值会混乱，因为 React 认为 `B` 的输入框与原来的第一个输入框是同一个节点。



**3. 不满足唯一性要求**

React 要求每个 `key` 在同一级别的列表中必须是唯一的。如果使用 `index` 作为 `key`，当列表项的内容本身需要独立标识时，`index` 无法提供准确的唯一性。



**推荐的做法**

1. **使用唯一标识符**：如果列表项有唯一的 `id`，优先使用 `id` 作为 `key`。

   ```javascript
   const items = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
   {items.map(item => (
     <div key={item.id}>{item.name}</div>
   ))}
   ```

2. **动态生成唯一标识符**：如果列表项没有唯一 `id`，可以使用库（如 `uuid`）生成唯一的 `key`。

3. **仅在静态列表中使用 `index`**：如果列表内容不会动态增删或重排，可以安全使用 `index`。



## 说说你对 React 生态的了解

React 的生态系统非常丰富，是支撑其成为主流前端框架的重要原因之一。

可以从几个主要方面简要说明：



1. **状态管理**

- **Redux**：经典的状态管理方案，适合大型应用，配合中间件（如 redux-thunk、redux-saga）处理异步逻辑。
- **Zustand / Jotai / Recoil**：更现代、轻量的替代方案，适合中小型项目。
- **React Context + useReducer**：适合简单全局状态的共享，不依赖外部库。



2. **路由管理**

- **React Router**：React 官方推荐的路由库，支持嵌套路由、懒加载、动态路由等。
- **Next.js 自带路由**：基于文件系统的路由方案，简化配置流程。



3. **异步数据管理**

- **SWR / React Query**：支持缓存、自动重试、请求去重、依赖刷新等功能，极大提升了数据请求体验。
- **Axios / Fetch**：底层请求库，通常配合上述工具使用。



4. **组件库**

- **Ant Design / Material UI**：完整的企业级组件库，满足常规开发需求。
- **Tailwind CSS + Headless UI**：更注重样式和结构分离，适合需要高度定制的项目。
- **shadcn/ui**：基于 Tailwind 构建，现代化、高可定制的新兴组件库。



5. **框架扩展**

- **Next.js**：服务端渲染 + 静态生成的 React 应用框架，支持 SEO、路由、API 路由等。
- **Remix**：强调服务端优先的路由框架，增强数据获取和页面渲染逻辑。



6. **构建工具**

- **Vite / Webpack / Parcel**：React 可以在这些工具中灵活运行，Vite 更现代、热更新更快。
- **Create React App (CRA)**：React 官方脚手架，适合快速搭建项目。



7. **测试工具**

- **Jest**：React 官方推荐的测试框架。
- **React Testing Library**：以用户视角测试组件行为，更贴近真实交互。
- **Cypress / Playwright**：端到端测试工具，测试完整用户流程。



8. **动画与交互**

- **Framer Motion**：流畅强大的动画库，配合 React 使用简单高效。
- **React Spring**：基于物理的动画方案，适合复杂动画场景。



## 下面代码中，点击 “+3” 按钮后，age 的值是什么？

```javascript
import { useState } from 'react';

export default function Counter() {
  const [age, setAge] = useState(42);
  function increment() {
    setAge(age + 1); 
  }
  return (
    <>
      <h1>Your age: {age}</h1>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
    </>
  );
}
```

---

点击 +3 时，可能只更新为 43。

这是因为 `setAge(age + 1)` 即使多次调用，也不会立即更新组件状态，而是会进行合并，最终只触发一次重新渲染。

如果要实现调用三次就增加 3 ，可以将 `increment` 改为函数式更新：

```javascript
function increment() {
    setAge(a => a + 1); // 函数式更新
}
```



## 子组件是一个 Portal，发生点击事件能冒泡到父组件吗？

React 的 Portal 通过 React 的 context 和事件冒泡的机制工作。

在理解这个问题之前，首先要了解一些基本知识：

1. **React Context**：React 使用 context 来存储组件树的一些信息，比如事件处理程序。当组件使用 Portal 时，Portal 在 React 内部仍然保持在父组件树中，即使在 DOM 上渲染到其他地方。也就是说，Portal 的 context 依然从其父组件继承而来。
2. **DOM 事件冒泡**：DOM 中的事件（例如点击事件）通常会从触发事件的元素开始，然后逐步向上冒泡到父元素，直到 document 元素。在这个过程中，事件会按照 DOM 树的层级一层层地向上传递。
3. **React 的事件代理**：React 使用事件代理模式将所有事件都代理到顶层（`document` 或者 `root` DOM 节点）进行处理。这意味着当在子组件中触发一个事件时，无论子组件是否使用了 Portal，React 都会将事件传递到其父组件，然后逐级往上冒泡，直到到达代理事件的顶层。

在 React 中，当一个子组件使用 Portal 将其内容渲染到其他 DOM 节点时，尽管在 DOM 结构上子组件不再是父组件的直接子节点，但在 React 的组件树中，子组件仍然是父组件的子节点。这意味着 React 在监听和处理事件时，会沿着组件树的路径（而不是 DOM 树的路径）冒泡事件。因此，子组件中触发的事件仍然会冒泡到父组件。

总结：Portal 在 DOM 结构上将子组件渲染到其他位置，但在 React 的组件树中，它仍然是父组件的子组件。这使得事件可以从子组件沿着组件树冒泡到父组件。

## React 为什么要废弃 componentWillMount、componentWillReceiveProps、componentWillUpdate 这三个生命周期钩子？它们有哪些问题呢？React 又是如何解决的呢？

React 在 16.3 版本中：

- 将 `componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate` 三个生命周期钩子加上了 `UNSAFE` 前缀，变为 `UNSAFE_componentWillMount`、`UNSAFE_componentWillReceiveProps` 和 `UNSAFE_componentWillUpdate`。
- 并引入了一个新的生命周期钩子：`getDerivedStateFromProps`。

并在 17.0 以及之后的版本中：

- 删除了 `componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate` 这三个生命周期钩子。
- 不过 `UNSAFE_componentWillMount`、`UNSAFE_componentWillReceiveProps` 和 `UNSAFE_componentWillUpdate` 还是可以用的。

我们知道 React 的更新流程分为：render 阶段和 commit 阶段。

`componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate` 这三个生命周期钩子都是在 render 阶段执行的。

在 fiber 架构被应用之前，render 阶段是不能被打断的。当页面逐渐复杂之后，就有可能会阻塞页面的渲染，于是 React 推出了 fiber 架构。在应用 fiber 架构之后，低优先级任务的 render 阶段可以被高优先级任务打断。

而这导致的问题就是：**在 render 阶段执行的生命周期函数可能被执行多次**。

componentWillMount、componentWillReceiveProps、componentWillUpdate 这三个生命周期钩子，如果我们在其中执行一些具有副作用的操作，例如发送网络请求，就有可能导致一个同样的网络请求被执行多次，这显然不是我们想看到的。

而 React 又没法强迫开发者不去这样做，因为怎么样使用 React 是开发者的自由，所以 React 就新增了一个静态的生命周期 `getDerivedStateFromProps`，来解决这个问题。

用一个静态函数 `getDerivedStateFromProps `来取代被废弃的几个生命周期函数，这样开发者就无法通过 this 获取到组件的实例，也不能发送网络请求以及调用 this.setState。它就是强制开发者在 render 之前只做无副作用的操作，间接强制我们无法进行这些不合理不规范的操作，从而避免对生命周期的滥用。

## 为什么 react 需要 fiber 架构，而 Vue 却不需要？

React引入Fiber架构的主要原因是为了实现更好的异步渲染和更高效的任务调度。Fiber架构使得React能够更细粒度地控制和中断渲染过程，以便更好地响应用户交互、实现懒加载等功能。Vue在设计上采用了不同的策略，因此并不需要类似于Fiber的架构。

以下是一些原因解释为什么React选择了Fiber架构，而Vue没有类似的架构：

1. **异步渲染和任务优先级：** React的Fiber架构使得实现异步渲染和任务优先级变得更加容易。这对于复杂的用户界面和大规模应用中的性能优化非常重要。React可以通过中断和恢复渲染过程，根据任务的优先级调度渲染工作，从而更好地响应用户输入和满足实时性要求。
2. **更好的中断和恢复机制：** Fiber架构提供了一种更灵活的中断和恢复机制，允许React在渲染过程中暂停、中断，然后根据优先级恢复。这使得React能够更好地处理复杂的渲染逻辑，并在需要时放弃低优先级的工作。
3. **增量更新：** Fiber允许React实现增量更新，即只更新变化的部分而不必重新渲染整个组件树。这对于提高渲染性能和减少不必要的工作非常有帮助。

Vue在设计上采用了一种不同的响应式系统和渲染机制，不需要像React那样进行复杂的中断和任务调度。Vue的设计目标可能更注重简洁性和开发体验，而React的目标之一是提供更灵活和强大的性能优化工具。每个框架在设计上都有权衡和取舍，选择适合其目标和使用场景的策略。



## react 和 react-dom 是什么关系？

`react` 和 `react-dom` 是 React 库的两个主要部分，它们分别负责处理不同的事务。它们之间的关系可以理解为：

1. **`react`：** 这是 React 库的核心部分，包含了 React 的核心功能，如组件、状态、生命周期等。它提供了构建用户界面所需的基本构建块。当你编写 React 组件时，你实际上是在使用 `react` 包。
2. **`react-dom`：** 这是 React 专门为 DOM 环境提供的包，它包含了与浏览器 DOM 相关的功能。`react-dom` 提供了用于在浏览器中渲染 React 组件的方法，包括 `ReactDOM.render`。在 Web 开发中，`react-dom` 被用于将 React 应用渲染到浏览器的 DOM 中。

基本上，`react` 和 `react-dom` 是为了分离 React 的核心功能，以便更好地处理不同的环境和平台。这种分离使得 React 更加灵活，可以适应不同的渲染目标，而不仅仅局限于浏览器环境。

在使用 React 开发 Web 应用时，通常会同时安装和引入这两个包：

```bash
npm install react react-dom
```

然后在代码中引入：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <h1>Hello, React!</h1>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

在上面的例子中，`react` 库提供了 `App` 组件的定义，而 `react-dom` 库提供了 `ReactDOM.render` 方法，用于将组件渲染到 HTML 页面中。这种分工让 React 在不同平台上能够更灵活地适应各种渲染目标。



## React Portals 有什么用？

React Portals 是 React 提供的一种机制，用于将子组件渲染到父组件 DOM 层次结构之外的位置。它在处理一些特殊情况下的 UI 布局或交互时非常有用。以下是一些使用 React Portals 的常见情况：

1. **在模态框中使用：** 当你需要在应用的根 DOM 结构之外显示模态框（对话框）时，React Portals 可以帮助你将模态框的内容渲染到根 DOM 之外的地方，而不影响布局。
2. **处理 z-index 问题：** 在一些复杂的布局中，可能存在 z-index 的层级关系导致组件无法按照预期的方式叠加显示。使用 React Portals 可以将组件渲染到具有更高 z-index 的容器中，以解决这些问题。
3. **在全局位置显示组件：** 如果你希望某个组件在页面的固定位置显示，而不受父组件的定位影响，React Portals 可以将该组件渲染到 body 或其他容器中。
4. **在动画中使用：** 当你需要在页面中的某个位置执行动画时，React Portals 可以帮助你将动画的内容渲染到离该位置更近的 DOM 结构中，以提高动画性能。

使用 React Portals 的基本步骤如下：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

function MyPortalComponent() {
  return ReactDOM.createPortal(
    // 子组件的内容
    <div>
      This is rendered using a portal!
    </div>,
    // 渲染目标的 DOM 元素
    document.getElementById('portal-root')
  );
}

// 在应用的根组件中渲染 MyPortalComponent
function App() {
  return (
    <div>
      {/* 此处的内容在正常的 DOM 结构中 */}
      <p>This is a normal component.</p>

      {/* 使用 React Portals 渲染到 'portal-root' 元素外 */}
      <MyPortalComponent />
    </div>
  );
}

export default App;
```

在上面的例子中，`MyPortalComponent` 中的内容会被渲染到具有 id 为 'portal-root' 的 DOM 元素外。



## useMemo 和 useCallback 有什么区别？

在 React 中，`useMemo` 和 `useCallback` 都是用来优化性能的钩子函数，但它们的用途和作用稍有不同。

1. **useMemo**: `useMemo` 的主要作用是在组件重新渲染时，用来缓存计算结果，以避免不必要的重复计算。它接收两个参数：一个回调函数和一个依赖数组。回调函数用于进行计算，而依赖数组用于指定在数组中列出的依赖项发生变化时，才重新计算并返回新的值，否则会返回上一次缓存的值。

```javascript
const memoizedValue = useMemo(() => {
  // 进行耗时的计算
  return someValue;
}, [dependency1, dependency2]);
```

在上面的示例中，只有当 `dependency1` 或者 `dependency2` 发生变化时，`useMemo` 才会重新计算并返回新的值，否则会复用之前的值。

1. **useCallback**: `useCallback` 的作用是在组件重新渲染时，返回一个记忆化的回调函数，以避免不必要的函数重新创建。它也接收两个参数：一个回调函数和一个依赖数组。当依赖项发生变化时，会返回一个新的回调函数，否则会复用之前的回调函数。

```javascript
const memoizedCallback = useCallback(() => {
  // 处理事件的回调函数
}, [dependency1, dependency2]);
```

在这个示例中，只有当 `dependency1` 或者 `dependency2` 发生变化时，`useCallback` 才会返回一个新的回调函数，否则会返回之前的回调函数。

总结区别：

- `useMemo` 主要用于缓存计算结果，适用于任何需要缓存值的场景。
- `useCallback` 主要用于缓存回调函数，适用于需要传递给子组件的事件处理函数，以避免不必要的重新渲染。

另外，在大多数情况下，你不必在每个函数组件中都使用 `useMemo` 或 `useCallback`。

只有当你在性能测试中发现了性能问题，或者在特定情况下需要优化函数的创建和计算时，再考虑使用这些钩子。

## 我们应该在什么场景下使用 useMemo 和 useCallback ？

## 说说你对 useReducer 的理解

`useReducer` 是 React 提供的一个 Hook，用于在函数组件中管理状态。它与 `useState` 类似，但通常在需要处理复杂状态逻辑时使用，特别是当状态的更新依赖于先前的状态或需要多个值时。`useReducer` 的设计灵感来源于 Redux，它通过将状态管理逻辑抽象为一个“reducer”函数来让状态的变更变得更加清晰和可控。

1. **`useReducer` 的基本语法**

`useReducer` 接受两个参数：

- **reducer**：一个纯函数，用于处理状态的更新。它接收当前状态和一个动作对象，然后返回一个新的状态。
- **initialState**：初始状态，可以是任意类型的值（数字、对象、数组等）。

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

- `state`：当前的状态值。
- `dispatch`：一个函数，用来分发动作，触发状态更新。

2. **`reducer` 函数的定义**

`reducer` 函数接收两个参数：

- **state**：当前的状态。
- **action**：包含了要更新状态的指令或者数据的对象。

`reducer` 函数根据 `action` 的不同类型，返回一个新的状态。

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

3. **如何使用 `useReducer`**

在使用 `useReducer` 时，你需要：

1. 定义一个 `reducer` 函数来指定如何更新状态。
2. 使用 `useReducer` 获取 `state` 和 `dispatch`。
3. 使用 `dispatch` 来触发状态更新。

**示例：简单的计数器**

```javascript
import React, { useReducer } from 'react';

// 定义初始状态
const initialState = { count: 0 };

// 定义 reducer 函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}

export default Counter;
```

在上面的例子中，`useReducer` 管理了计数器的状态。`dispatch` 函数用于触发不同类型的动作（`increment` 和 `decrement`），`reducer` 函数根据动作类型返回新的状态。

4. **使用场景**

`useReducer` 适合处理以下场景：

- **复杂状态逻辑**：当一个状态依赖于多个字段时，或者状态更新涉及多个值的变化，`useReducer` 提供了更好的结构化方式。
- **多个状态更新依赖于先前的状态**：当状态更新涉及先前状态的计算时（例如，多个操作之间的连锁反应），使用 `useReducer` 更容易控制和管理。
- **优化性能**：在某些情况下，`useReducer` 可以帮助避免不必要的重渲染，因为它可以更精确地控制状态更新和渲染过程，尤其是当使用 `dispatch` 更新复杂状态时。

**例子：表单管理**

对于一个表单，如果每个输入字段的状态都需要管理，并且每个字段的更新需要独立处理，`useReducer` 会比 `useState` 更具可维护性。

```javascript
import React, { useReducer } from 'react';

// 初始状态
const initialState = { name: '', email: '' };

// reducer 函数
function reducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNameChange = (e) => {
    dispatch({ type: 'SET_NAME', payload: e.target.value });
  };

  const handleEmailChange = (e) => {
    dispatch({ type: 'SET_EMAIL', payload: e.target.value });
  };

  return (
    <form>
      <input
        type="text"
        value={state.name}
        onChange={handleNameChange}
        placeholder="Name"
      />
      <input
        type="email"
        value={state.email}
        onChange={handleEmailChange}
        placeholder="Email"
      />
    </form>
  );
}

export default Form;
```

5. **`useReducer` 与 `useState` 的区别**

- **状态管理复杂度**：`useReducer` 通常用于复杂状态管理，特别是当状态依赖于多个字段，或者更新逻辑复杂时。而 `useState` 更适合处理简单的、独立的状态。
- **可预测性和结构化**：`useReducer` 可以通过 `reducer` 函数将状态更新逻辑结构化，便于管理和调试。而 `useState` 每次更新状态都需要单独处理更新逻辑，随着状态复杂度增加，代码会变得难以维护。
- **性能**：`useReducer` 和 `useState` 在性能上没有显著的差异，但 `useReducer` 更适合在需要多次更新状态或复杂状态操作时使用。

## 讲讲 React.memo 和 JS 的 memorize 函数的区别

React.memo() 和 JS 的 memorize 函数都是用来对函数进行结果缓存，提高函数的性能表现。不过，它们之间还是有一些区别的：

1. **适用范围不同**：React.memo() 主要适用于优化 React 组件的性能表现，而 memorize 函数可以用于任何 JavaScript 函数的结果缓存。
2. **实现方式不同**：React.memo() 是一个 React 高阶组件（HOC），通过浅层比较 props 是否发生变化来决定是否重新渲染组件。而 memorize 函数则是通过将函数的输入参数及其计算结果保存到一个缓存对象中，以避免重复计算相同的结果。
3. **缓存策略不同**：React.memo() 的缓存策略是浅比较（shallow compare），只比较props 的第一层属性值是否相等，不会递归比较深层嵌套对象或数组的内容。而 memorize 函数的缓存策略是将输入参数转换成字符串后，作为缓存的键值。如果传入的参数不是基本类型时，则需要自己实现缓存键值的计算。
4. **应用场景不同**：React.memo() 主要适用于对不经常变化的组件进行性能优化，而 memorize 函数则主要适用于对计算量大、执行时间长的函数进行结果缓存。例如，对于状态不变的组件或纯函数，可以使用 React.memo() 进行优化；对于递归计算、复杂数学运算等耗时操作，可以使用 memorize 函数进行结果缓存。

综上所述，React.memo() 和 JS 的 memorize 函数虽然都是用于提高函数的性能表现，但其适用范围、实现方式、缓存策略和应用场景等方面还是有一定的区别。开发者需要根据具体情况来选择合适的性能优化手段，以提高应用程序的性能和响应速度。

## 如果在 useEffect 的第一个参数中 return 了一个函数，那么第二个参数分别传空数组和传依赖数组，该函数分别是在什么时候执行？

在 React 中，当 useEffect 第一个参数中返回一个函数时，这个函数会在组件卸载时执行。当传递空数组 [] 时，useEffect 只会在组件挂载和卸载时调用一次，因此返回的函数也只会在组件卸载时执行一次。

```javascript
useEffect(() => {
  // 在挂载时执行

  return () => {
    // 在卸载时执行
  }
}, []);
```

当传递依赖数组时，useEffect 会在组件挂载和依赖项更新时调用，因此返回的函数也会随着组件更新而执行。每次组件重新渲染时都会检查依赖项列表是否有变化，如果有变化则重新执行 useEffect，并在执行新的 useEffect 前先执行上一个 useEffect 返回的函数（如果存在）。

```javascript
useEffect(() => {
  // 在挂载、依赖列表变化及卸载时执行

  return () => {
    // 在下一次 useEffect 执行前执行
  }
}, [dep1, dep2]);
```

需要注意，这个函数的作用通常是清除 effect 留下的副作用，例如取消定时器、取消订阅等等。在函数中应该清理掉之前设置的任何 effect，在组件卸载时避免不必要的内存泄漏和资源浪费。



## useEffect 的第二个参数, 传空数组和传依赖数组有什么区别？

在 React 中，useEffect 是一个常用的 Hook，它用于处理组件生命周期中的副作用。

useEffect 接收两个参数，第一个是要执行的函数，第二个是依赖数组（可选）。

当传递空数组 [] 时，useEffect 只会在组件挂载和卸载时调用一次。这种情况下，useEffect 不会监听任何变量，并且不会对组件进行重新渲染。

```javascript
useEffect(() => {
  // 只在挂载和卸载时执行
}, []);
```

当传递依赖数组时，useEffect 会在组件挂载和依赖项更新时调用。当依赖项中的任何一个值发生变化时，useEffect 都将被重新调用。如果依赖数组为空，则每次组件重新渲染时都会调用 useEffect。

```javascript
useEffect(() => {
  // 在挂载、依赖列表变化及卸载时执行
}, [dep1, dep2]);
```

下面是这两种情况的总结：

- 当传递空数组 [] 时，useEffect 只会在组件挂载和卸载时调用一次，不会对组件进行重新渲染。
- 当传递依赖数组时，useEffect 会在组件挂载和依赖项更新时调用，每次更新时都会检查依赖项列表是否有变化，如果有变化则重新执行。

如果 useEffect 中使用了闭包函数，则应该确保所有引用的变量都在依赖项中被显示声明，否则可能会导致不必要的重新渲染或者无法获取最新的状态。



## 怎么判断一个对象是否是 React 元素？

如果想要判断一个对象是否是 React 元素，可以使用 `React.isValidElement()` 方法进行判断。该方法接收一个参数，返回一个布尔值，用于表示指定的对象是否是 React 元素。

以下是一个示例代码：

```javascript
import React from 'react';

const MyComponent = () => {
  return <div>Hello, world!</div>;
}

const elem = <MyComponent />;

console.log(React.isValidElement(elem)); // true
console.log(React.isValidElement({}));   // false
```

在上述代码中，定义了一个简单的组件 `MyComponent`，并通过 JSX 语法创建了一个 React 元素 `elem`。然后，使用 `React.isValidElement()` 方法对 `elem` 和一个普通对象 `{}` 进行判断，并输出结果。

需要注意的是，`React.isValidElement()` 方法只能用于判断是否为 React 元素，并不能判断元素的类型和其他属性。如果需要获取元素的类型或其他属性，可以直接访问元素的属性，例如 `type`、`props`、`key` 等。



## react是否支持给标签设置自定义的属性，比如给video标签设置webkit-playsinline？

如果你在react中这么样写：

```javascript
// Your code:
<div mycustomattribute="something" />
```

在react 15中将被渲染成：

```javascript
// React 15 output:
<div />
```

在react 16及之后的版本中将被渲染成：

```javascript
// React 16 output:
<div mycustomattribute="something" />
```

但这个会有限制，如果自定义的属性不是 `string`, `number` 或者 `object`，该属性依然会被忽略。

所以目前可以这样添加 webkit-playsinline 属性：

```javascript
<video width="750" height="500" controls webkit-playsinline="true">
	<source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4"/>
</video>
```

另外，还可以通过 `setAttribute` 进行设置，比如：

```javascript
复制import * as React from 'react';
import { Component } from 'react';

export class VideoComponent extends Component {
  videoContainer: HTMLDivElement;
  componentDidMount() {
    const video = document.createElement('video');
    video.autoplay = true;
    video.loop = true;
    video.muted = true; // fixes autoplay in chrome
    video.setAttribute('playsinline', 'true'); // fixes autoplay in webkit (ie. mobile safari)

    const source = document.createElement('source');
    source.src = '/path/to/your/video.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);

    this.videoContainer.appendChild(video);
  }
  render() {
    return (
      <div ref={(ref) => { this.videoContainer = ref; }} />
    );
  }
}
```

## 说说你对 dangerouslySetInnerHTML 的理解

## 说说你对 React Hook的闭包陷阱的理解，有哪些解决方案？

## React18新特性

React 18 引入了许多重要的特性，主要集中在以下方面：

1. **并发渲染 (Concurrent Rendering)**

React 18 引入了 **并发模式**，它允许 React 在后台异步渲染部分组件，从而提高用户界面的响应速度。并发渲染的引入可以显著提高复杂应用的性能，尤其是当涉及到大量状态更新时。

**主要特点：**

- **自动批处理**：React 18 中的并发渲染自动批处理多个状态更新，避免了多次渲染的浪费。
- **`startTransition` API**：使开发者能够标记不需要优先渲染的更新，减少应用的卡顿感。

2. **Suspense 的改进**

React 18 中对 **Suspense** 进行了改进，使其能够支持更多的场景，特别是在数据获取和代码分割的场景中。通过与并发模式结合，Suspense 可以使应用的加载过程更加平滑和高效。

**新特性：**

- **`Suspense` 支持在服务端渲染（SSR）中**：React 18 支持在服务器端渲染时使用 `Suspense`，从而实现更灵活的渲染过程。
- **`SuspenseList`**：可以将多个 Suspense 组件组合起来，使多个异步加载的组件能够更平滑地显示。

3. **React Server Components (实验性功能)**

React Server Components 是 React 18 中的一个实验性特性，它允许在服务器上渲染一部分 UI，而将其他部分交给客户端渲染。这样可以减少 JavaScript 的体积，优化应用的加载速度，尤其是在复杂的应用中。

**主要特点：**

- 将 React 组件拆分为 "客户端组件" 和 "服务器组件"，服务器组件不需要发送到客户端，减少了 JavaScript 包的大小。
- 提供更高效的数据加载和渲染流程。

4. **`useId` Hook**

React 18 引入了 `useId` hook，用于生成独一无二的 ID，特别是在服务端渲染和客户端渲染中需要保证一致性时。`useId` 可以帮助开发者避免由于客户端和服务端渲染结果不一致导致的 ID 冲突问题。

**用途：**

- 生成一致的、唯一的 ID，确保在服务器端渲染时和客户端渲染时 ID 一致。

5. **并发 Suspense 和流控制（Streaming and Suspense）**

React 18 在 **流式渲染**（Streaming Rendering）方面做了很多增强。流式渲染允许应用按需加载组件，并且这些组件可以并行加载，从而加速页面的呈现速度。

**主要特点：**

- 使用流式渲染，开发者可以更好地控制在服务器上渲染哪些部分，然后根据需要将其传输到客户端。
- 与 Suspense 配合，能更好地支持部分内容的异步加载。

6. **更好的 SSR 支持（服务端渲染）**

React 18 加强了对服务端渲染（SSR）的支持，包括对 Suspense 的支持，使得 SSR 渲染更加高效和灵活。React 18 引入了一个新的 SSR API，提供了更多的流控制和数据加载优化，允许更快的页面加载。

7. **React 18 中的自动批处理（Automatic Batching）**

React 18 引入了自动批处理机制，它使得在多个状态更新中，只会触发一次渲染，从而减少渲染次数，提高性能。以前，状态更新的批处理只有在事件处理函数中有效，而 React 18 将这种机制扩展到所有异步操作中（如 `setTimeout`, `Promise`, `fetch` 等）。

8. **`useSyncExternalStore` Hook**

React 18 提供了 `useSyncExternalStore` Hook，用于订阅外部的、同步的数据源，并能够确保与 React 的渲染周期同步。这对于外部数据源（例如 Redux、zustand 等）非常有用，能够确保应用状态的一致性。

**用途：**

- 用于访问外部存储（如 Redux store）时，确保状态的同步更新，特别是在服务端渲染的情况下。

9. **更新的 `useEffect` 和 `useLayoutEffect` 行为**

React 18 对 `useEffect` 和 `useLayoutEffect` 的行为进行了优化，特别是如何与并发渲染结合。这些优化减少了副作用的执行时机，提高了性能和用户体验。

10. **增强的开发者工具**

React 18 引入了对 **React DevTools** 的改进，使得开发者能够更好地调试和理解并发渲染、Suspense 和其他新特性。React DevTools 会显示更多关于组件的加载状态和渲染阶段的信息，帮助开发者分析性能瓶颈和优化路径。



## 实现一个 useTimeout Hook

`useTimeout` 是可以在函数式组件中，处理 `setTimeout` 计时器函数

**解决了什么问题？**

如果直接在函数式组件中使用 `setTimeout` ，会遇到以下问题：

- 多次调用setTimeout

```javascript
 function App() {  
    const [state, setState] = useState(1);  
    setTimeout(() => {  
        setState(state + 1);  
    }, 3000);  
    return (  
        // 我们原本的目的是在页面渲染完3s后修改一下state，但是你会发现当state+1后，触发了页面的重新渲染，就会重新有一个3s的定时器出现来给state+1，既而变成了每3秒+1。  
        <div> {state} </div>  
    );  
  }; 
```

- hooks 的闭包缺陷

```javascript
function App() {  
  const [count, setCount] = useState(0)  
  const [countTimeout, setCountTimeout] = useState(0)  
  useEffect(() => {  
      setTimeout(() => {  
          setCountTimeout(count)  
      }, 3000)  
      setCount(5)  
  }, [])  
  return (  
       //count发生了变化，但是3s后setTimout的count却还是0  
      <div>  
          Count: {count}  
          <br />  
          setTimeout Count: {countTimeout}  
      </div>  
  )  
}
```

**useTimeout 实现**

```javascript
function useTimeout(callback, delay) {
  const memorizeCallback = useRef();

  useEffect(() => {
    memorizeCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const timer = setTimeout(() => {
        memorizeCallback.current();
      }, delay);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [delay]);
};
```

**如何使用**

```javascript
  // callback 回调函数， delay 延迟时间
  useTimeout(callback, delay);
```

## 实现 useUpdate 方法，调用时强制组件重新渲染

可以利用 `useReducer` 每次调用 `updateReducer` 方法，来达到强制组件重新渲染的目的。

```javascript
复制import { useReducer } from 'react';

const updateReducer = (num: number): number => (num + 1) % 1_000_000;

export default function useUpdate(): () => void {
  const [, update] = useReducer(updateReducer, 0);

  return update;
}
```
