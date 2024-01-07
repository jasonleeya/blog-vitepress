---
category: 文章
tags:
  - Markdown
---
<script setup>import Read from "@components/Read.vue";</script>

<ClientOnly>
  <read/>
</ClientOnly>

![cover](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2023_12/markdown.svg)

# Markdown入门指南

Markdown是一种轻量级标记语言，排版语法简洁，让人们更多地关注内容本身而非排版。它使用易读易写的纯文本格式编写文档，可与HTML混编，可导出 HTML、PDF 以及本身的 `.md` 格式的文件。因简洁、高效、易读、易写，Markdown被大量使用，如Github、简书,知乎等，而在这里，介绍 Markdown 主要是因为 VitePress 引擎是通过将 `.md` 文件编译成 Vue 组件并最终编译成网页，也可以说 Markdown 是 VitePress,VuePress,Hexo 等引擎的灵魂所在，VitePress对传统markdown语法进行了拓展，本文仅介绍markdown的基本语法。


## 标题
在文字前加上#，通过#的个数表示不同级别的标题，最多支持六级标题。
```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```
效果：

![标题效果](https://6c73-lsj97-9giu4cj4abdc0985-1256331827.tcb.qcloud.la/imgs/2023_12/202312_1.png)


## 段落
段落之间使用一个或多个空行进行分隔。
```markdown
这是第一个段落。

这是第二个段落。
```
效果：
这是第一个段落。

这是第二个段落。

## 强调
使用 * 或 _ 进行强调。
```markdown
*强调文本1* <br/>
**强调文本2** <br/>
***强调文本3*** <br/>
_也可以强调_ <br/>
```
效果：<br/>
*强调文本1*<br/>
**强调文本2**<br/>
***强调文本3***<br/>
_也可以强调_<br/>

## 列表
使用*、+或-表示无序列表，使用数字加.表示有序列表。

```markdown
* 无序列表项1
+ 无序列表项2
- 无序列表项3

1. 有序列表项1
2. 有序列表项2
3. 有序列表项3
```
效果：
* 无序列表项1
+ 无序列表项2
- 无序列表项3

1. 有序列表项1
2. 有序列表项2
3. 有序列表项3

## 链接
使用[]表示链接文字，紧接着使用()表示链接地址。
```markdown
[baidu.com](http://baidu.com)
```
效果：
[baidu.com](http://baidu.com)

## 图片
和链接类似，只需要在链接的基础上添加一个感叹号!。
```markdown
![图片描述](http://example.com/image.jpg)
```
效果：
![avatar](https://q.qlogo.cn/g?b=qq&nk=1615685977&s=100)

## 引用
使用>表示引用。
```markdown
> 这是引用的文本。
<br/>也可以嵌套
> > > 这是嵌套的文本。
```
效果：
> 这是引用的文本。
<br/>也可以嵌套
> > > 这是嵌套的文本。

## 粗体和斜体

使用**表示粗体，*表示斜体。
```markdown
**粗体文本**
*斜体文本*
```
**粗体文本**
*斜体文本*

## 代码
使用 ` 表示行内代码，使用``` 表示多行代码块。
```markdown
`这是行内代码`

\```
这是
多行
代码块
\```
(代码没被转义，请忽略'\')
```
效果：
`这是行内代码`

```
这是
多行
代码块
```

## 分隔线
使用三个或多个星号 (***)、破折号 (---) 或下划线 (___) ，并且不能包含其他内容。
```markdown
***
---
___
```
效果：

***

---

___

## 表格{#anchor-id}
添加表格要使用三个或多个连字符（---）创建每列的标题，并使用管道（|）分隔每列。
```
| 表头1 | 表头2 |
|------|------|
| 数据1 | 数据2 |
| 数据3 | 数据4 |
```
| 表头1 | 表头2 |
|-----|-----|
| 数据1 | 数据2 |
| 数据3 | 数据4 |

## 锚点

锚点可以让页面跳转至设置标记的地方，要设置锚点需要在目标处设置带有唯一id的标记,并在需要跳转的地方设置跳转链接。

锚点设置
```html
## 表格{#anchor-id}
```
设置跳转链接
```
[跳转至表格](#anchor-id)
```
点击查看效果：
[跳转至表格](#anchor-id)

## emoji表情
一些Markdown应用程序允许您通过键入表情符号短代码来插入表情符号。这些以冒号开头和结尾，并包含表情符号的名称。
```markdown
:smile:
```
效果：:smile: <br>
可以在此[表情符号简码列表](https://gist.github.com/rxaviers/7360908)查阅更多emoji表情，但值得注意的是，表情符号简码因应用程序而异。

## 内嵌HTML标签

markdown支持直接在文件中嵌入HTML元素，而元素也是可以直接设置样式的，也可以使用`script`标签写js代码（可能是VitePress的markdown拓展内容，原生markdown可能并不支持js代码），需要注意的是，块级元素必须要在前后加上空行。
```html
<span>span</span><br>
<del>del</del><br>
<a href="http://www.baidu.com">a标签</a>
<img src="https://q.qlogo.cn/g?b=qq&nk=1615685977&s=100" alt="img标签">

<p>p标签</p>

<hr>

<div style="width: 100px;height: 50px;line-height: 50px;text-align: center; background-color: pink">div标签</div>

<table>
  <tr>
    <th>表头1</th>
    <th>表头1</th>
  </tr>
  <tr>
    <td>1</td>
    <td>2</td>
  </tr>
  <tr>
    <td>3</td>
    <td>4</td>
  </tr>
</table>

<script >
  console.log('%c 打开控制台查看 ','color:white;background:red')
</script>
```
效果：
<br>
<span>span</span><br>
<del>del</del><br>
<a href="http://www.baidu.com">a标签</a>
<img src="https://q.qlogo.cn/g?b=qq&nk=1615685977&s=100" alt="img标签">

<p>p标签</p>

<hr>

<div style="width: 100px;height: 50px;line-height: 50px;text-align: center; background-color: pink">div标签</div>

<table>
  <tr>
    <th>表头1</th>
    <th>表头1</th>
  </tr>
  <tr>
    <td>1</td>
    <td>2</td>
  </tr>
  <tr>
    <td>3</td>
    <td>4</td>
  </tr>
</table>

<script >
  console.log('%c 打开控制台查看 ','color:white;background:red')
</script>

## VitePress markdown增强语法

可参考VitePress官方网站[Markdown 扩展](https://vitepress.qzxdp.cn/guide/markdown.html)
