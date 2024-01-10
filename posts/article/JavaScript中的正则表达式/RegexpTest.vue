<script lang="ts" setup>
import {nextTick, PropType, ref} from "vue";
import {useIsMobile} from "../../../.vitepress/hooks/useIsMobile.mjs";

const props = defineProps({
  text: {
    type: [Array, String] as PropType<string[] | string>,
    default: () => []
  },
  answer: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  answerType: {
    type: Number as PropType<1 | 2>, //1精准答案，2开放题
    default: 1
  },
  //当答案模式为2时，排除一些比如“.+”,“.*”或者直接使用题目文本的答案
  excludedAnswers: {
    type: Array as PropType<string[]>,
    default: () => []
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

const result = ref(props.text)
const regexp = ref('')

const isMobile = useIsMobile()
const INPUT_MIN_WIDTH = 80
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
  let reg = new RegExp(regexp.value, props.flags)

  let isCorrect: boolean

  if (props.answerType === 1) {
    if (Array.isArray(props.answer)) {
      isCorrect = props.answer.includes(regexp.value)
    } else {
      isCorrect = regexp.value === props.answer
    }
    if (Array.isArray(props.text)) {
      result.value = props.text.map((item) => {
        return item.replace(reg, `<span class="highlight ${isCorrect ? 'correct' : 'error'}">$&</span>`)
      });
    } else {
      result.value = props.text.replace(reg, `<span class="highlight ${isCorrect ? 'correct' : 'error'}">$&</span>`);
    }
  } else {
    if (Array.isArray(props.text)) {
      result.value = props.text.map((item) => {
        let match = item.match(reg)
        let answerMatch = item.match(new RegExp(Array.isArray(props.answer) ? props.answer[0] : props.answer, props.flags))
        if(props.excludedAnswers.includes(regexp.value)){
          return item.replace(reg, `<span class="highlight error">$&</span>`)
        }
        if (match && match[0] === (answerMatch && answerMatch[0])) {
          return item.replace(answerMatch[0], `<span class="highlight correct">$&</span>`)
        }
        return item.replace(reg, `<span class="highlight error">$&</span>`)
      })
    }else {
      let match = props.text.match(reg)
      let answerMatch = props.text.match(new RegExp(Array.isArray(props.answer) ? props.answer[0] : props.answer, props.flags))

      if(props.excludedAnswers.includes(regexp.value)){
        result.value = props.text.replace(reg, `<span class="highlight error">$&</span>`)
        return
      }
      if (match && match[0] === (answerMatch && answerMatch[0])) {
        result.value = props.text.replace(answerMatch[0], `<span class="highlight correct">$&</span>`)
      } else {
        result.value = props.text.replace(reg, `<span class="highlight error">$&</span>`)
      }
    }
  }
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
    <div class="content">
      <div class="description" v-html="description"></div>
      <template v-if="Array.isArray(text)">
        <div v-for="(item,index) in result" :key="index" class="text" v-html="item"></div>
      </template>
      <template v-else>
        <div class="text" v-html="result"></div>
      </template>
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
          :content="answerType === 1 ? '显示答案' : '参考答案'"
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
