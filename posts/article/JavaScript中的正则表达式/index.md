---
category: 文章
tags:
  - JavaScript
  - 正则表达式
---

<script setup>
import Read from "@components/Read.vue";
import RegexpTest from "./RegexpTest.vue";
</script>

<ClientOnly>
  <read></read>
</ClientOnly>

![cover](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2024_01/regexp.jpg)

# JavaScript中的正则表达式

正则表达式（Regular Expression，简称 Regex或者Regexp）是一种有用于匹配和操作文本的强大工具，它是由一系列字符和特殊字符组成的模式。在JavaScript中正则表达式也有广泛的用途，但很多人都会被那一串串火星文似的语句所困惑。这篇文章将会介绍正则表达式的基本用法，让你远离正则恐惧症。

网上有很多正则表达式的教程，为什么还要多次一举写这篇文章呢？其实我也是读那些优秀的文章学会的，但是过程是非常枯燥的，而且往往是过来一段时间后又会忘记，不得不再次翻阅那些博客，所以我写下此篇文章一是为了巩固正则知识，二是想以一种全新的方式写一篇正则教程，希望帮助到大家。话不多说了，让我们开始吧。

> 文章部分内容参考自书籍《[JavaScript正则表达式迷你书](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/docs/JavaScript%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E8%BF%B7%E4%BD%A0%E4%B9%A6.pdf)》，有兴趣的同学可以自行下载阅读。

## 正则两种匹配模式

正则表达式有两种匹配模式，一是字符匹配，二是位置匹配。

### 字符匹配

正如正则表达式的作用，它可以匹配字符，当我们想匹配 `hello regexp` 中的 `regexp` 时，表达式为：`/regexp/`。

<ClientOnly>
  <RegexpTest text="hello regexp" answer="regexp" description="在下面输入框输入<b>regexp</b>，匹配下面文本中的<b>regexp</b>。"></RegexpTest>
</ClientOnly>

:::info 提示
为了方便大家加深记忆，我做了一个练习模块。在下方输入框输入正确的正则表达式，目标文本将会可视化显示匹配的内容，点击右下角 `?`
显示答案。

输入框后一个斜杠后面的 `g` 是一个正则修饰符，`global`
的缩写，表示全局匹配，即正则会从左至右匹配所有符合条件的文本，如果不加 `g` 修饰符，则只会匹配第一个符合条件的文本。
:::

上面的例子体现了正则表达式的精准匹配，但正则不仅能够精准匹配，还能够实现模糊匹配。
正则有两个方向上的模糊匹配，横向和纵向匹配。

#### 两种模糊匹配

- 横向模糊匹配

横向匹配指的是，一个正则表达式可匹配字符串的长度不是固定的。

其实现方式是使用量词，譬如表达式 `{m,n}`，这个表达式表示匹配的字符出现次数在 `m` 到 `n` 之间。

比如匹配 `/be{1,3}r/g` 能匹配字符串 `ber beer beeer`中的每个单词，其中每个 `b` 和 `r` 中间的 `e` 出现 1 到 3 次。

![img_1](./imgs/img_1.svg)

<ClientOnly>
  <RegexpTest :text="['ber','beer','beeer']" answer="be{1,3}r" description="在下面输入框输入<b>be{1,3}r</b>，匹配下面每一行文本。"></RegexpTest>
</ClientOnly>

- 纵向模糊匹配

纵向模糊匹配指的是，当正则匹配到具某一位具体字符时，它可以匹配多个字符。

例如要匹配 `test text teat tect`中的每个单词，需要用到字符集合的匹配方式，正则为`/te[sxac]t/`。

![img_1](./imgs/img_2.svg)

<ClientOnly>
  <RegexpTest :text="['test','text','teat','tect']" answer="te[sxac]t" description="在下面输入框输入<b>te[sxac]t</b>，匹配下面每一行文本。"></RegexpTest>
</ClientOnly>

#### 字符集合

当我们要匹配的某个字符有很多中可能时，字符集能实现这种匹配。字符集合语法是用中括号 `[]`
将字符的所有可能包含起来，例如 `[abc]` 匹配 `a`、`b` 或者 `c`。

值得注意的是，虽然叫字符集合，但它只能匹配一个字符，正如上面测试中，`[sxac]` 只能表示 `test text teat tect` 中第三个字母的可能集合。

如果我们想匹配的字符特别多，但是是在某个范围并且连续的，那么可以使用正则里的范围匹配 规则，例如 `[a-z]` 匹配 `a` 到 `z`
之间的任意一个字符，`[0-9]` 匹配 `0` 到 `9` 之间的任意一个字符。

<ClientOnly>
  <RegexpTest :text="['ABCDEFGHIJKLMNOPQRSTUVWXYZ']" answer="[J-S]" description="匹配下面文本中<b>J-S</b>之间所有字符"></RegexpTest>
</ClientOnly>

如果在字符集合中前面加一个 `^`，那么它表示匹配不包含在字符集合中的字符。例如，`[^4-8]` 匹配除了 `4` 到 `8` 之间的任意一个字符。

<ClientOnly>
  <RegexpTest :text="['bear','beor','beer','beur']" :answer="['be[^ou]r','be[^uo]r']" description="匹配下面除<b>beor</b>，<b>beur</b>之外的所有单词。"></RegexpTest>
</ClientOnly>

除了一个范围内的字符集合可以缩写外，正则中还内置了很多字符集的简写：
| 缩写 | 字符集合 | 含义 |
|----|---------------------|-----------------------------------------------------|
| .  | [^\n\r\u2028\u2029] | 通配符，匹配除了换行符、回车符、行分隔符和段分隔符以外的任意一个字符 |
| \d | [0-9]               | 数字，`d` 是 `digit` 的简称 |
| \D | [^0-9]              | 除数字外的任意字符 |
| \w | [0-9a-zA-Z_]        | 数字、大小写字母和下划线，`w` 是 `word` 的简称 |
| \W | [^0-9a-zA-Z_]       | 非字母、数字、下划线 |
| \s | [ \t\v\n\r\f]       | 空白字符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符，`s` 是 `space` 的简称 |
| \S | [^ \t\v\n\r\f]      | 非空白字符 |

:::tip 提示
当我们想匹配字符 `.` 需要写成 `\.` 进行转义。包括后面会学到的一些元字符，我们要匹配它们本身的时候，都需要在前面加上 `\` 进行转义。 
:::

#### 量词

量词也称限定符，它们的作用是限定匹配的次数，量词一共有 6 种，分别是 `*`、`+`、`?`、`{n}`、`{n,}` 和 `{n,m}`。

- `*` 表示 0 个或多个。

<ClientOnly>
  <RegexpTest :text="['br','ber','beer']" answer="be*r" description="使用<b>*</b>匹配下面三个单词"></RegexpTest>
</ClientOnly>

- `+` 表示 1 个或多个

<ClientOnly>
  <RegexpTest :text="['br','ber','beer']" answer="be+r" description="使用<b>+</b>匹配<b>ber</b>和<b>beer</b>"></RegexpTest>
</ClientOnly>

- `?` 表示 0 个或 1 个

<ClientOnly>
  <RegexpTest :text="['br','ber','beer']" answer="be?r" description="使用<b>?</b>匹配<b>br</b>和<b>ber</b>"></RegexpTest>
</ClientOnly>

- `{n}` 表示 n 个

<ClientOnly>
  <RegexpTest :text="['br','ber','beer']" answer="be{2}r" description="使用<b>{n}</b>匹配<b>beer</b>"></RegexpTest>
</ClientOnly>

- `{n,}` 表示 n 个或多个

<ClientOnly>
  <RegexpTest :text="['br','ber','beer','beeer']" answer="be{2,}r" description="使用<b>{n,}</b>匹配<b>beer</b>和<b>beeer</b>"></RegexpTest>
</ClientOnly>

- `{n,m}` 表示 n 到 m 个

<ClientOnly>
  <RegexpTest :text="['br','ber','beer','beeer']" answer="be{1,2}r" description="使用<b>{n,m}</b>匹配<b>ber</b>和<b>beer</b>"></RegexpTest>
</ClientOnly>

以上的量词默认都是贪婪匹配模式，即匹配尽可能多的字符，请看下面的例子：

```js
const text = '量词有"贪婪匹配"和"惰性匹配"两种模式'
const reg = /".+"/g

console.log(text.match(reg)) // ['"贪婪匹配"和"惰性匹配"']
```

我们期望正则能将 **贪婪匹配** 和 **惰性匹配**匹配出来，但是事与愿违，造成这种情况是因为当正则匹配到第二个 `"`
时没有结束，它是贪婪的，能匹配到的 `"` 多多益善，直到匹配到最后一个 `"` 返回了结果。要想达到惰性匹配，需要在量词后面加上 `?`：

```js
const text = '量词有"贪婪匹配"和"惰性匹配"两种模式'
const reg = /".+?"/g

console.log(text.match(reg)) // ['"贪婪匹配"', '"惰性匹配"']
```

以可看到，在惰性匹配的模式下，正则一旦匹配到满足的内容，就会返回。

<ClientOnly>
  <RegexpTest text="<&#8203;span>正则表达式<&#8203;/span>" description="使用<b>惰性匹配</b>匹配出<b><&#8203;span></b>和<b><&#8203;/span></b>。" :answer="['<.+?>','<.*?>']"></RegexpTest>
</ClientOnly>

#### 分支

类似字符集合可以表示单个字符的多种可能，正则的分支可以用来表示字符串或者表达式的多种可能，比如 `(ab|cd|ef)` 表示 `ab`
或者 `cb`或者 `ef`；`(ab{2,3}c|a[^b]c)` 表示可以是 `ab{2,3}c`模式也可以是 `a[^b]c`模式

<ClientOnly>
<RegexpTest :text="['黄焖鸡','猪脚饭']" description="<b>今天中午吃什么？</b>作为一个选择困难症患者，我表示都可以。请用<b>分支</b>匹配所有食物。" :answer="['(黄焖鸡|猪脚饭)','(猪脚饭|黄焖鸡)','黄焖鸡|猪脚饭','猪脚饭|黄焖鸡']"></RegexpTest>
</ClientOnly>

---

::: info 下面我们针对来前面部分所学内容做一些练习

<ClientOnly>
<RegexpTest text='<&#8203;div id="container" class="main"><&#8203;/div>' description='请匹配下面HTML标签中的<b>id="container"</b>。' answer='id=".*?"' :questionType="2"></RegexpTest>
</ClientOnly>

<ClientOnly>
<RegexpTest text="1949-10-01" description="请匹配下面<b>日期</b>（开放题）" answer="\d{1,4}-(0\d|1[0-2])-(0\d|[12]\d|3[01])" :questionType="2" :excludedAnswers="['1949-10-01','.+','.*']"></RegexpTest>
</ClientOnly>

<ClientOnly>
<RegexpTest :text="['#fff','#FFF','#000','#ffffff','#FFFFFF','#000000','#FF0000','#ff0000']" description="请匹配下面<b>所有颜色格式</b>（开放题）" :answer="['#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})']" :questionType="2" :excludedAnswers="['.+','.*']"></RegexpTest>
</ClientOnly>
:::

### 位置匹配

前面我们学习了正则表达式的字符匹配，现在我们来介绍介绍位置匹配。

那么什么是位置匹配呢？让我们来看看下面几个例子：
    
 > 金额 `￥1988888` 转化为千分法： 转化为千分法 `￥1,988,888`。

 > 将手机号码 `18888888888` 转化为速记法： `188-8888-8888`。

上面的例子可以看到，在某些数字中间添加了逗号和横杠，这些符号正是正则表达式通过“位置匹匹配”匹配到了这些“位置”从而添加的。

这些“位置”我们可以理解为**相邻字符之间的位置**。你可能将其与空格混淆，空格通常作为单词间的分隔，位置是字符间的分隔，确切说是字符的边界，并且空格之间也是存在位置的，例如，我们将 `hello world`的全部位置用 `-` 标注出来为：

```javascript
const text = 'hello world'
console.log(text.replaceAll('','-'))  //-h-e-l-l-o- -w-o-r-l-d-
```

正则表达式中如何进行位置匹配呢？ 正则中用来表示位置的符号有：`^`、`$`、`\b`、`\B`、`(?=p)`、`(?!p)`、`(?<=p)`、`(?<!p)`,我逐个介绍一下。

#### ^和$

`^`表示匹配输入字符串的开始位置。

<ClientOnly>
<RegexpTest :text="['1stPage.vue','page1.vue','page.vue']" description="文件名是不能以数字开头的，请使用<b>^</b>匹配出以<b>数字开头的</b>文件名" answer="^\d+\w+\.vue" :questionType="2" :excludedAnswers="['1stPage.vue','page1.vue','page.vue','.+','.*']"></RegexpTest>
</ClientOnly>


`$`表示匹配输入字符串的结束位置。

<ClientOnly>
<RegexpTest :text="['index.vue','img.png','index.js','img.jpg']" description="请用<b>$</b>匹配下面文件中的<b>图片格式</b>的文件" answer=".+\.(png|jpg)$" :questionType="2" :excludedAnswers="['img.png','img.jpg','.+','.*']"></RegexpTest>
</ClientOnly>

#### \b和\B

- `\b`表示匹配一个单词的边界，具体将有一下三点原则：

1. `\w` 和 `\W` 之间的位置，也就是单词与非单词之间的位置，例如：`hello world` 中用 `-` 表示该位置就是 `hello- -world`

2. `^` 与 `\w` 之间的位置，表示着这个单词位于文本开头，这个位置就在这个开头位置，例如：`hello world` 中用 `-` 表示该位置就是 `-hello world`

3. `\w` 与 `$` 之间的位置，表示着这个单词位于文本结尾，这个位置就在这个结尾位置，例如：`hello world` 中用 `-` 表示该位置就是 `hello world-`

<ClientOnly>
<RegexpTest :text="['never','verb','error']" description="请用<b>\b</b>匹配单词<b>nerver</b>中的<b>er</b>" answer="er\b" :questionType="2"></RegexpTest>
</ClientOnly>

- `\B`则和`\b`相反，表示匹配一个非单词的边界，意味着这个位置不能时单词边界。

<ClientOnly>
<RegexpTest :text="['never','verb','error']" description="请用<b>\B</b>匹配单词<b>verb</b>中的<b>er</b>" answer="\Ber\B" :questionType="2"></RegexpTest>
</ClientOnly>

#### 零宽断言

“零宽断言”又是一个让人摸不着头脑的名词。“零宽”意思就是宽度为零，不占据位置，这也和前面介绍的“位置”是一个意思，断言就是表示一种条件判断，所以正则表达式中“零宽断言”可以理解为匹配满足特定条件的位置的一种表达式。零宽断言表达式有四种，分别是：`(?=p)`、`(?!p)`、`(?<=p)`、`(?<!p)`。

- `(?=p)` 为正向先行断言，我们不用去记它的名字，只需要明白，这个表达式的作用是匹配一个位置，紧接该位置之后的字符满足表达式p，也可以理解为：p前面的位置。
  
看下面这个例子：

```js
var string = 'I like singing, dancing, rapping, and playing basketball'
console.log(string.replace(/(?=ing)/g,'-')) 'I like s-ing-ing, danc-ing, rapp-ing, and play-ing basketball'
```
我们可以看到，replace函数将`(?=ing)` 匹配到的位置替换成了横杠，这些位置他的后面都是 `ing`。

<ClientOnly>
<RegexpTest text="天才就是1%的灵感加上99%的汗水" description="用<b>(?=p)</b>匹配<b>百分比中的数字</b>" answer="\d+(?=%)"></RegexpTest>
</ClientOnly>

- `(?!p)` 为负向先行断言，这个表达式的作用是匹配一个位置，紧接该位置之后的字符序列不满足表达式p。

和`(?=p)`相反的是，`(?<!p)` 匹配的位置后面不能是满表达式exp的。

还是看个例子：

```javascript
const string = 'I`m singing while you`re dancing'
console.log(string.replace(/(?!ing)/g,'-')) // -I-`-m- -si-n-gi-n-g- -w-h-i-l-e- -y-o-u-`-r-e- -d-a-n-ci-n-g-
```
可以看到，字符串中除了`ing`之外的位置都被替换成了横杠，这恰好和前面的 `(?=ing)` 的例子是相反的。

<ClientOnly>
<RegexpTest text="date: 4 Aug 3PM" description="用<b>(?!p)</b>匹配下列文本中<b>没有PM的数字</b>" answer="\d+(?!PM)"></RegexpTest>
</ClientOnly>

- `(?<=p)` 为正向后行断言，这个表达式的作用是匹配一个位置，紧接该位置之前的字符满足表达式p，

<ClientOnly>
<RegexpTest text="LoL heroes can be upgraded to lv18, and they will have ultimate skills at lv6" description="用<b>(?<=p)</b>匹配<b>等级</b>中的<b>数字</b>,例如<b>lv6</b>中的<b>6</b>" answer="(?<=lv)\d+"></RegexpTest>
</ClientOnly>


- `(?<!p)` 为负向后行断言，这个表达式的作用是匹配一个位置，紧接该位置之前的字符序列不满足表达式p。

<ClientOnly>
<RegexpTest text="Product Code: 1064, Price: $5" description="用<b>(?<&#8203;!p)</b>匹配下列文本中<b>前面没有 $ 的数字</b>" answer="(?<!\$)\d+"></RegexpTest>
</ClientOnly>

:::danger 警告
部分浏览器不支持后行断言也就是 **(?<=p)** 和 **(?<!p)**，可以使用替代方案：[javascript regex - look behind alternative?](https://stackoverflow.com/questions/7376238/javascript-regex-look-behind-alternative)
:::

#### 位置匹配的特性

-------------------------------------------未完待续-----------------------------------------------
