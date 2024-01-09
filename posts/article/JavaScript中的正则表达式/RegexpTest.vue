<script lang="ts" setup>
import {nextTick, PropType, ref} from "vue";
import {useIsMobile} from "../../../.vitepress/hooks/useIsMobile.mjs";

const props = defineProps({
  text: {
    type: Array as PropType<string[]>,
    default: () => ['hello regexp']
  },
  answer: {
    type: [String, Array] as PropType<string | string[]>,
    default: 'regexp'
  },
  description: {
    type: String as PropType<string>,
    default: `在下面输入框输入<b>regexp</b>，匹配下面文本中的<b>regexp</b>。`
  },
  flags: {
    type: String as PropType<string>,
    default: 'g'
  }
})

const result = ref(props.text)
const regexp = ref('')

const isMobile = useIsMobile()
const INPUT_MIN_WIDTH = 90
const INPUT_MAX_WIDTH = isMobile.value ? 300 : 500
const inputWidth = ref(INPUT_MIN_WIDTH)
const inputRef = ref()
const hiddenTextRef = ref()
const handleInput = () => {
  match()
  nextTick(() => {
    inputWidth.value = getHiddenTextWidth()
  })
}

const match = () => {
  if (!regexp.value) {
    return result.value = props.text
  }
  const reg = new RegExp(regexp.value, props.flags)

  let isCorrect: boolean
  if (Array.isArray(props.answer)) {
    isCorrect = props.answer.includes(regexp.value)
  } else {
    isCorrect = regexp.value === props.answer
  }
  result.value = props.text.map((item) => {
    return item.replace(reg, `<span class="highlight ${isCorrect ? 'correct' : 'error'}">$&</span>`)
  })
}
const getHiddenTextWidth = () => {
  if (!hiddenTextRef.value) {
    return INPUT_MIN_WIDTH
  }
  const width = hiddenTextRef.value.clientWidth
  if (width > INPUT_MAX_WIDTH) {
    return INPUT_MAX_WIDTH
  }
  if (width < INPUT_MIN_WIDTH && !regexp.value) {
    return INPUT_MIN_WIDTH
  }
  return width
}

const showAnswer = () => {
  regexp.value = Array.isArray(props.answer) ? props.answer[0] : props.answer
  match()
  nextTick(() => {
    inputWidth.value = getHiddenTextWidth()
  })
}
</script>

<template>
  <div class="card">
    <div class="title">练习</div>
    <div class="content">
      <div class="description" v-html="description"></div>
      <div v-for="(item,index) in result" :key="index" class="text" v-html="item"></div>
    </div>
    <div class="bottom" @click="inputRef.focus()">
      <div ref="hiddenTextRef" class="hidden-text">{{ regexp }}</div>
      <span class="before">/</span>
      <input ref="inputRef" v-model="regexp" :style="{width: inputWidth + 'px'}" class="input"
             placeholder="正则表达式"
             spellcheck="false"
             type="text" @input="handleInput">
      <span class="after">/{{ flags }}</span>
      <span class="show-answer">?</span>

      <el-tooltip
          content="显示答案"
          effect="dark"
          placement="top">
        <span class="show-answer" @click="showAnswer">?</span>
      </el-tooltip>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.card {
  width: 100% !important;
  margin-bottom: 16px;

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

  .bottom {
    min-height: 60px;
    background: var(--vp-c-bg-soft);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    box-sizing: border-box;
    font-size: 18px;
    color: #999;
    line-height: 1em;
    position: relative;
    user-select: none;

    .input,.before, .after {
      font-size: 16px;
      margin: 0 2px;
      color: var(--vp-code-color);
      font-weight: bold;
    }
    .before, .after{
      opacity: 0.6;
    }
    .hidden-text {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      font-size: 16px;
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
}
</style>
