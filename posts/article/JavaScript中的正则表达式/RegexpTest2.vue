<script lang="ts" setup>
import {nextTick, PropType, ref} from "vue";
import {useIsMobile} from "../../../.vitepress/hooks/useIsMobile.mjs";

const props = defineProps({
  text: {
    type: String as PropType<string>,
    default: () => []
  },
  answer: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  description: {
    type: String as PropType<string>,
    default: ``
  },
  flags: {
    type: String as PropType<string>,
    default: 'g'
  }
})

const userAnswer = ref('')
const isMobile = useIsMobile()
const INPUT_MIN_WIDTH = 80
const INPUT_MAX_WIDTH = isMobile.value ? 300 : 500
const inputWidth = ref(INPUT_MIN_WIDTH)
const inputRef = ref()
const hiddenTextRef = ref() // 隐藏文本用于计算input宽度
const handleInput = () => {
  match()
  setInputWidth()
}

const match = () => {

}
const setInputWidth = () => {
  nextTick(() => {
    if (!hiddenTextRef.value) {
      inputWidth.value = INPUT_MIN_WIDTH
      return
    }
    let width = hiddenTextRef.value.clientWidth
    if (width > INPUT_MAX_WIDTH) {
      width = INPUT_MAX_WIDTH
    }
    if (width < INPUT_MIN_WIDTH && !userAnswer.value) {
      width = INPUT_MIN_WIDTH
    }
    inputWidth.value = width
  });
}

const showAnswer = (e: MouseEvent) => {

  handleInput()
}
</script>

<template>
  <div class="card">
    <div class="content">
      <div class="description" v-html="description"></div>
      <div class="code">
        <span>const text =</span>
        <span class="text" v-html="text"></span>
      </div>
    </div>
    <div class="answer" @click="inputRef.focus()">
      <div ref="hiddenTextRef" class="hidden-text">{{ userAnswer }}</div>
      const regexp =
      <span class="before">/</span>
      <input ref="inputRef"
             v-model="userAnswer"
             :style="{width: inputWidth + 'px'}"
             class="input"
             placeholder="正则表达式"
             spellcheck="false"
             type="text"
             enterkeyhint="done"
             @input="handleInput">
      <span class="after">/{{ flags }}</span>

    </div>
    <div class="code">
      const result = text.match(regexp)
    </div>

    <el-tooltip
        content="显示答案"
        effect="dark"
        placement="top">
      <span class="show-answer" @click="showAnswer">?</span>
    </el-tooltip>
  </div>
</template>


<style lang="scss" scoped>
.card {
  width: 100% !important;
  margin: 16px 0;

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: rgb(48, 49, 51);
  }

  .content {
    .description {
      color: #666;

      :deep(b) {
        color: var(--vp-code-color);
      }
    }

    .text {
      font-size: 18px;
      font-weight: bold;
      margin: 15px 0;
      color: var(--vp-c-text-2);

      :deep(.highlight) {
        &.correct {
          color: var(--vp-c-brand);
        }

        &.error {
          color: var(--vp-c-red-3);
        }
      }
    }
  }

  .code{
    padding: 10px 5px;
  }
  .answer {
    min-height: 40px;
    background: var(--vp-c-bg-soft);
    border-radius: 5px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 18px;
    color: #999;
    line-height: 1em;
    position: relative;
    user-select: none;
    padding: 10px 5px;

    .input, .before, .after {
      font-size: 16px;
      margin: 0 2px;
      color: var(--vp-code-color);
      font-weight: bold;
    }

    .before, .after {
      opacity: 0.5;
    }

    .hidden-text {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      font-size: 16px;
      user-select: none;
      pointer-events: none;
    }
  }
  .show-answer {
    position: absolute;
    right: 8px;
    bottom: 8px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    color: var(--vp-c-brand);
    background: var(--vp-c-brand-soft);
    font-weight: bold;
  }
}
</style>
