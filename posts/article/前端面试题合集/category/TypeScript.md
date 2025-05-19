---
category: TypeScript
order: 15
---
<script setup>
import NavHead from "../components/NavHead.vue";
</script>
<nav-head link="/article/前端面试题合集/read.html">
</nav-head>

# TypeScript

## 什么是 TypeScript？它与 JavaScript 有什么关系？

## TypeScript 的主要特性有哪些？

## 解释静态类型和动态类型的区别

## 什么是类型注解和类型推断？

## 使用 TypeScript 的优势和缺点是什么？

## 如何安装和编译 TypeScript 文件？

## 什么是 TypeScript 的对象类型？怎么定义对象类型？

## TypeScript 的内置数据类型有哪些？
**boolean**：表示布尔值，可以是 true 或 false。
**number**：表示数字，包括整数和浮点数。
**string**：表示字符串。可以使用单引号或双引号来表示字符串。
**void**：表示没有任何返回值的函数的返回类型。
**null** 和 **undefined**：这两个类型是所有类型的子类型。 symbol：表示独特的值，类似于数字或字符串。
除此之外，TypeScript 还支持以下复合类型：

**array**：表示一个元素类型为 T 的数组。例如，number[] 表示一个数字数组。
**tuple**：表示已知元素数量和类型的数组。例如，[string, number] 表示一个字符串和数字组成的元组。
**enum**：表示一个命名的常量枚举。
**any**：表示任意类型。
**unknown**：与 any 类似，但是在更严格的类型检查下使用。
**object**：表示非原始类型的对象。
还有一些其他的类型，例如 never、union 和 intersection，它们可以用于描述更复杂的类型。

## Typescript中 interface 和 type 的差别是什么？

**相同点**

- 都可以描述一个对象或者函数

**interface**

```typescript
interface User {
  name: string
  age: number
}

interface SetUser {
  (name: string, age: number): void;
}
```

**type**

```typescript
type User = {
  name: string
  age: number
};

type SetUser = (name: string, age: number)=> void;
```

- 都允许拓展（extends）

interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。

**interface extends interface**

```typescript
interface Name { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}
```

**type extends type**

```typescript
type Name = { 
  name: string; 
}
type User = Name & { age: number  };
```

**interface extends type**

```typescript
type Name = { 
  name: string; 
}
interface User extends Name { 
  age: number; 
}
```

**type extends interface**

```typescript
interface Name { 
  name: string; 
}
type User = Name & { 
  age: number; 
}
```

**不同点**

- type 可以而 interface 不行

**type 可以声明基本类型别名，联合类型，元组等类型**

```typescript
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]
```

**type 语句中还可以使用 typeof 获取实例的 类型进行赋值**

```typescript
// 当你想获取一个变量的类型时，使用 typeof
let div = document.createElement('div');
type B = typeof div
```

**其他骚操作**

```typescript
type StringOrNumber = string | number;  
type Text = string | { text: string };  
type NameLookup = Dictionary<string, Person>;  
type Callback<T> = (data: T) => void;  
type Pair<T> = [T, T];  
type Coordinates = Pair<number>;  
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```

- interface 可以而 type 不行

**interface 能够声明合并**

```typescript
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
```

一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。

## 如何将 TypeScript 代码编译为 JavaScript 代码？

## 什么是 TypeScript 的类型系统？请列举一些常见的类型

## 联合类型和交叉类型如何定义？

## 开发过程中为什么会选择使用 TypeScript, 相比于 JavaScript 开发，有哪些优点？

## 说一说 TypeScript 中的类及其特性

TypeScript 引入了类，以便它们可以利用诸如封装和抽象之类的面向对象技术的好处。

TypeScript 编译器将 TypeScript 中的类编译为普通的 JavaScript 函数，以跨平台和浏览器工作。

一个类包括以下内容：

- 构造器（Constructor）
- 属性（Properties）
- 方法（Methods）
  

```javascript
class Employee {
    empID: number;
    empName: string;
 
    constructor(ID: number, name: string) {
        this.empName = name;
        this.empID = ID;
    }
 
    getSalary(): number {
        return 40000;
    }
}
```
}
类的其他特性有：

- 继承（Inheritance）
- 封装（Encapsulation）
- 多态（Polymorphism）
- 抽象（Abstraction）



## TypeScript 支持的访问修饰符有哪些？

TypeScript支持访问修饰符 public，private 和 protected，它们决定了类成员的可访问性。

- 公共（public），类的所有成员，其子类以及该类的实例都可以访问。
- 受保护（protected），该类及其子类的所有成员都可以访问它们。 但是该类的实例无法访问。
- 私有（private），只有类的成员可以访问它们。

如果未指定访问修饰符，则它是隐式公共的，因为它符合 JavaScript 的便利性。

## Typescript 中泛型是什么？

## 如何定义和使用泛型函数？

## Boolean 和 boolean 有什么区别？

## 解释 keyof 和 typeof 的作用

## type 和 interface 的区别

## any、unknown 和 never 的区别是什么？

## Exclude 与 Omit 有什么区别？

## any、unknown、never 和 void 类型的区别是什么？

## Typescript中never 和 void 的区别？

## 说说 const 和 readonly 的区别

## TypeScript 中的 getter/setter 是什么？你如何使用它们？

Getter 和 setter 是特殊类型的方法，可帮助你根据程序的需要委派对私有变量的不同级别的访问。

Getters 允许你引用一个值但不能编辑它。Setter 允许你更改变量的值，但不能查看其当前值。这些对于实现封装是必不可少的。

例如，新雇主可能能够了解get公司的员工人数，但无权set了解员工人数。

```javascript
const fullNameMaxLength = 10;
class Employee {
  private _fullName: string = "";
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }
    this._fullName = newName;
  }
}
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  console.log(employee.fullName);
}
```

## 如何用 TypeScript 实现枚举类型的反向映射？

## TypeScript is 这个关键字是做什么？

## TypeScript in 这个关键字是做什么？

## infer 关键字是什么?

## const 和 readonly 的区别？

## 联合类型是什么？

## 介绍一下 TS 中的泛型

## 联合类型是什么？

## 什么是类型断言？如何使用？

## 如何实现类型保护（Type Guards）？

## 什么是声明文件（.d.ts）？它的作用是什么？

## 如何在 TypeScript 中定义类？类的继承如何实现？

## 抽象类的作用是什么？如何定义？

## 解释类的继承和多态

## 什么是Typescript的方法重载？

在TypeScript中，方法重载（Method Overloading）是一种允许函数在不同参数数量或参数类型下具有不同的返回类型或行为的特性。这允许您以一种更灵活的方式定义函数，并根据传入的参数类型或数量来选择适当的行为或返回类型。

方法重载通常用于提供更加严格的类型检查和更好的类型推断，以及在代码中提供更清晰的接口。它使得函数可以根据不同的参数签名，提供不同的实现方式，而无需使用额外的运行时检查。

要定义方法重载，您需要按照以下步骤进行：

1. 首先，定义一个函数的多个签名（overload signatures）。每个签名包含一个参数列表和一个返回类型。
2. 然后，定义一个实际的函数体，这个函数体实现了多个签名所涵盖的不同情况。

这里有一个简单的例子，演示了如何在TypeScript中使用方法重载：

```typescript
function greet(name: string): string;
function greet(age: number): string;
function greet(value: string | number): string {
  if (typeof value === "string") {
    return `Hello, ${value}!`;
  } else {
    return `You are ${value} years old!`;
  }
}

console.log(greet("Lydia")); // Output: "Hello, Lydia!"
console.log(greet(30)); // Output: "You are 30 years old!"
```

上面定义了`greet`函数的两个不同的签名：一个接受`string`类型参数，另一个接受`number`类型参数。然后，我们实现了一个函数体，根据传入的参数类型进行相应的处理。

使用方法重载，TypeScript能够更好地检查函数调用，以确保传递的参数类型与预期的类型相符，并提供适当的类型推断，从而增加代码的类型安全性和可读性。

## 解释一下TypeScript中的枚举

枚举是TypeScipt数据类型，它允许我们定义一组命名常量。 使用枚举使记录意图或创建一组不同的案例变得更加容易。 它是相关值的集合，可以是数字值或字符串值。

```typescript
enum Gender {
    Male,
    Female
    Other
}
console.log(Gender.Male); // Output: 0

//We can also access an enum value by it's number value.
console.log(Gender[1]); // Output: Female
```

## 枚举和常量枚举的区别

## 什么是元组？它与数组有什么区别？

## extends 条件类型怎么定义？

## infer 关键字是什么？

## Typescript 中什么是装饰器，它们可以应用于什么？

装饰器是一种特殊的声明，它允许你通过使用@\<name>注释标记来一次性修改类或类成员。每个装饰器都必须引用一个将在运行时评估的函数。

例如，装饰器@sealed将对应于sealed函数。任何标有 的@sealed都将用于评估sealed函数。

```javascript
function sealed(target) {
  // do something with 'target' ...
}
```

它们可以附加到：

- 类声明
- 方法
- 配件
- 特性
- 参数

注意：默认情况下不启用装饰器。要启用它们，你必须`experimentalDecorators从tsconfig.json`文件或命令行编辑编译器选项中的字段。

## 解释类装饰器、方法装饰器和属性装饰器。
## 装饰器的执行顺序是怎样的？

## 你了解 TypeScript 哪些内置了工具类型？（如 Partial、Required、Readonly 等）

## 什么是 TypeScript Declare 关键字?

我们知道所有的JavaScript库/框架都没有TypeScript声明文件，但是我们希望在TypeScript文件中使用它们时不会出现编译错误。为此，我们使用declare关键字。在我们希望定义可能存在于其他地方的变量的环境声明和方法中，可以使用declare关键字。

例如，假设我们有一个名为myLibrary的库，它没有TypeScript声明文件，在全局命名空间中有一个名为myLibrary的命名空间。如果我们想在TypeScript代码中使用这个库，我们可以使用以下代码:

```javascript
declare var myLibrary;  
```

TypeScript运行时将把myLibrary变量赋值为任意类型。这是一个问题，我们不会得到智能感知在设计时，但我们将能够使用库在我们的代码。

## tsconfig.json文件有什么用？

## 如何通过 keyof 和 in 关键字操作类型？

## 模块（Modules）和命名空间（Namespaces）的区别是什么？

## 如何处理第三方库的类型定义？

## 如何解决 TypeScript 中的类型兼容性问题（如协变、逆变）？

## 如何通过 tsconfig.json 配置 TypeScript 项目？

## 纯 TS 项目工程中, 如何使用 alias path?

## 解释 TypeScript 中的逆变（Contravariance）和协变（Covariance）

## 如何实现一个 DeepReadonly 类型？

## 如何递归地将对象类型转换为只读类型？

## 如何实现一个 IsNever 类型工具？

## 如何在 TypeScript 中实现一个简单的状态管理库？

## 如何处理 TypeScript 中的类型循环引用？

## 如何处理 TypeScript 中的类型错误？

## 如何实现一个类型工具 UnionToIntersection\<U> 将联合类型转换为交叉类型？

