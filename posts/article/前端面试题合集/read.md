<script setup>
import Back from "./components/Back.vue";
import fileData from './fileData.json';
import { withBase } from 'vitepress';

const list = fileData.sort((a,b)=>a.order-b.order)
</script>

# 前端面试题合集

<p></p>
<Back/>

<p v-for="(item,index) in fileData" :key="item.category">
<a  :href="withBase(`category/${item.category}`)">{{index + 1}}. {{item.category}}</a>
</p>


> **网上收集题目主要来源**
> - [leetcode](https://leetcode.cn/problemset/)
> - [interview-question](https://github.com/pro-collection/interview-question/issues?page=1)
> - [字节跳动最常考的 64 道JS算法题](https://segmentfault.com/a/1190000039801667)
> - https://github.com/azl397985856/leetcode
> - [113道前端工程化面试八股文（答案、分析和深入提问）整理](https://blog.csdn.net/ocean2103/article/details/142679336)
> - [Web 中高级前端面试题集合（200+）](https://segmentfault.com/a/1190000021966814)
> - [面试专区|【100道React高频题整理(附答案背诵版)】](https://blog.csdn.net/qq_40522090/article/details/139922740)
> - [面试专区|【39道UniApp高频题整理(附答案背诵版)】](http://blog.csdn.net/qq_40522090/article/details/139922669)
> - [面试专区|【74道TypeScript高频题整理(附答案背诵版)】](https://blog.csdn.net/qq_40522090/article/details/139922650)
> - [面试专区|【74道Node.js高频题整理(附答案背诵版)】](https://blog.csdn.net/qq_40522090/article/details/139738677)
> - [前端面试题宝典](https://fe.ecool.fun/)
> - [面试鸭](https://www.mianshiya.com/)
> - [Type Challenges](https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md)
