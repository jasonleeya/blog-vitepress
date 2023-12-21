
# Markdown入门指南

Markdown是一种轻量级标记语言，排版语法简洁，让人们更多地关注内容本身而非排版。它使用易读易写的纯文本格式编写文档，可与HTML混编，可导出 HTML、PDF 以及本身的 .md 格式的文件。因简洁、高效、易读、易写，Markdown被大量使用，如Github、简书,知乎等，而在这里，介绍markdown主要是因为VitePress引擎是通过将.md文件编译成Vue组件并最终编译成网页，也可以说markdown是VitePress,VuePress,Hexo等引擎的灵魂所在，VitePress对传统markdown语法进行了拓展，本篇文章将介绍markdown的基本语法以及VitePress对markdown的语法拓展。

## 基本语法

### 标题
在文字前加上#，通过#的个数表示不同级别的标题，最多支持六级标题。
```markdown
# 一级标题
## 二级标题
### 三级标题
```
