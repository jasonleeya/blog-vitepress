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
    <div class="description" v-if="currentQuestion.description" v-html="currentQuestion?.description"></div>
    <p><b>参考答案：</b></p>
    <div class="answer-wrapper">
      <div class="answer" :class="{unreadable:!isLookAnswer}" v-html="currentQuestion?.answer"></div>
      <look-answer class="look-answer" @click="handleLookAnswer" v-if="isShowLookAnswerBtn&&currentQuestion.answer">查看答案</look-answer>
    </div>
    <action-bar></action-bar>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import ActionBar from "./ActionBar.vue";
import {useQuestion} from "../hooks";
import LookAnswer from "./LookAnswer.vue";
import {useIsMobile} from "@hooks/useIsMobile";

const {currentQuestion, currentIndex, questionList, questionListLength} = useQuestion()

const isLookAnswer = ref(false)
const isShowLookAnswerBtn = ref(true)

watch(currentIndex, () => {
  isLookAnswer.value = false
  isShowLookAnswerBtn.value = true
  if (!questionList.value.length) return

  currentQuestion.value = JSON.parse(JSON.stringify(questionList.value[currentIndex.value]))
  document.documentElement.scrollTop = 0

}, {immediate: true})


const isMobile = useIsMobile()

const handleLookAnswer = () => {
  if (isMobile) {
    setTimeout(() => {
      isLookAnswer.value = true
      isShowLookAnswerBtn.value = false
    }, 400)
  } else {
    isLookAnswer.value = true
    isShowLookAnswerBtn.value = false
  }
}

</script>

<style scoped lang="scss">

.answer-wrapper{
  position: relative;
}
.answer {

  &.unreadable {
    filter: blur(5px);
    user-select: none;
  }
}

.look-answer {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
}


.index {
  margin-left: -18px;
  color: var(--vp-c-text-3);
}
</style>
<style>
.shiki.vitesse-light {
  background: transparent !important;
}
</style>
