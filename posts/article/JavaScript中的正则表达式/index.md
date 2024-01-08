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
  <read/>
</ClientOnly>

# JavaScript中的正则表达式

正则表达式（Regular Expression，简称 Regex或者Regexp）是一种有用于匹配和操作文本的强大工具，它是由一系列字符和特殊字符组成的模式。在Javascript中正则表达式也有广泛的用途，但很多人都会被那一串串火星文似的语句所困惑。这篇文章将会介绍正则表达式的基本用法，让你远离正则恐惧症。

网上有其实有很多正则表达式的教程，为什么还要多次一举写这篇文章呢？其实我也是读那些优秀的文章学会的，但是过程是非常枯燥的，而且常常是过来一段时间后又会忘记，不得不再次翻阅那些博客，所以我写下此篇文章一是为了巩固正则知识，二是想以一种全新的方式写一篇正则教程，帮助到大家。话不多说了，让我们开始吧。

## 正则两种匹配模式

正则表达式有两种匹配模式，一是字符匹配，二是位置匹配。

### 字符匹配

正如正则表达式的作用，它可以匹配字符，当我们想匹配 `hello regexp` 中的 `regexp` 时，表达式为：`/regexp/`

<ClientOnly>
  <RegexpTest/>
</ClientOnly>

> 本篇文章参考自 [《JS正则表达式完整教程（略长）》](https://juejin.cn/post/6844903487155732494)
