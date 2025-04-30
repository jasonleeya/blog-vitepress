<!--
 * @Author: 李双江
 * @Date: 2025/4/29 18:13:33
 * @LastEditors: 李双江
 * @LastEditTime: 2025/4/29 18:13:33
 * @Description:
-->
<template>
  <div class="practice">
    <h1><span class="index">【{{ currentIndex + 1 }}/{{ questionListLength }}】</span>{{ currentQuestion?.title }}</h1>
    <div class="answer" v-html="currentQuestion?.answer" v-if="isLoaded"></div>
    <action-bar></action-bar>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, PropType, ref, watch, watchEffect} from "vue";
import {createHighlighter} from 'shiki'
import MarkdownIt from 'markdown-it'
import ActionBar from "./ActionBar.vue";
import {useQuestion} from "../hooks.mjs";

const {currentQuestion, currentIndex, questionList,questionListLength} = useQuestion()
let highlighter = null
const md = MarkdownIt({
  highlight: (str, lang) => {
    const code = highlighter.codeToHtml(str, {
      lang,
      theme: 'vitesse-light',
    })
    return `<div class="language-${lang} "><span class="lang">${lang}</span>${code}</div>`
  }
})

const isLoaded = ref(false)
onMounted(async () => {
  highlighter = await createHighlighter({
    themes: ['vitesse-light'],
    langs: ['javascript', 'css', 'html', 'typescript', 'js', 'bash', 'vue'],
  })
  isLoaded.value = true
})


// highlighter = await createHighlighter({
//   themes: ['vitesse-light'],
//   langs: ['javascript','css','html','typescript','js','bash','vue'],
// })



watch(currentIndex,  (index) => {
  if(!questionList.value.length) return

  const question = JSON.parse(JSON.stringify(questionList.value[currentIndex.value]))

  function _check() {
    if (isLoaded.value) {
      question.answer = md.render(question.answer)
      currentQuestion.value = question
    } else {
      requestAnimationFrame(() => _check())
    }
  }

  _check()

}, {immediate: true})


</script>

<style scoped lang="scss">
.answer {
  min-height: calc(100vh - 800px);
}

.index {
  margin-left: -18px;
  color: #999;
}
</style>
<style>
.shiki.vitesse-light {
  background: transparent !important;
}
</style>
