---
category: 文章
tags:
  - VitePress
  - 网站搭建
createTime: 2023-09-14 22:53:12
updateTime: 2023-12-21 00:10:00
---
<script setup>import Read from "@components/Read.vue";</script>

<ClientOnly>
  <read></read>
</ClientOnly>

![cover](https://vitepress.dev/vitepress-logo-large.webp)

# 使用VitPress搭建个人网站

作为一个和Vue打了几年交道的前端程序员，个人网站自然也得是用Vue搭建，刚开始选择了VuePress静态网站生成器进行搭建，还是熟悉的味道，配合白嫖的静态网站托管服务，不用后端服务，不用云服务器，非常巴适。但是后来发现由Vite 孕育而生的VitePress博客引擎，更轻更快的特点深深的吸引了我，于是本着爱折腾的心觉得将博客用VitePress重新编写。本文将介绍使用VitePress搭建网站的简单步骤，让你可以轻松打造出专属的个人或团队站点

## 先决条件

* [Node.js](https://nodejs.org/en) 版本 18 或更高版本。
* 具有 Markdown 语法支持的文本编辑器。

## 创建项目文件夹并进入

```shell
mkdir blog-vitepress
cd blog-vitepress

```

## 初始化npm

:::code-group

```sh [npm]
npm init
```
```sh [pnpm]
pnpm init
```
```sh [yarn]
yarn init
```
:::

## 安装vitepress

:::code-group

```sh [npm]
npm install -D vitepress
```
```sh [pnpm]
pnpm add -D vitepress@latest
```
```sh [yarn]
yarn add -D vitepress
```
:::

## 设置向导

:::code-group
```sh [npm]
npx vitepress init
```
```sh [pnpm]
pnpm dlx vitepress init
```
:::

经过可视化向导我们可以得到一个文件夹


## 文件结构

生成的文件结构如下所示
```
.
├─.vitepress
├─config.js
├─api-examples.md
├─markdown-examples.md
├─index.md
└─package.json
```

## 启动项目
:::code-group

```sh [npm]
npm run docs:dev
```
```sh [pnpm]
pnpm run docs:dev
```
```sh [yarn]
yarn docs:dev
```
:::

开发服务器应该在[http://localhost:5173](http://localhost:5173)上运行。在浏览器中访问 URL 以查看正在运行的新网站。

## 总结


通过这几个简单的步骤，你已经成功地使用VitePress搭建了一个静态网站。当然，VitePress还有更多的高级特性和插件可供探索，参考官方文档[VitePress官方文档](https://vitepress.dev/)你可以根据自己的需求进一步定制和扩展你的网站。希望你能享受使用VitePress构建个性化网站的过程！


