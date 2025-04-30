<script lang="ts" setup>
import {nextTick, onMounted, PropType, ref} from "vue";

const props = defineProps({
  text: {
    type: [Array, String] as PropType<string[] | string>,
    default: () => []
  },
  answer: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  questionType: {
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
const userAnswer = ref('')
const handleInput = (e: Event) => {
  userAnswer.value = (e.target as HTMLInputElement).innerText
  match()
}
const match = () => {
  if (!userAnswer.value) {
    return result.value = props.text
  }
  let regexp = new RegExp(userAnswer.value, props.flags)

  let isCorrect: boolean

  const textList = Array.isArray(props.text) ? props.text : [props.text]

  if (props.questionType === 1) {
    if (Array.isArray(props.answer)) {
      isCorrect = props.answer.includes(userAnswer.value)
    } else {
      isCorrect = userAnswer.value === props.answer
    }
    result.value = textList.map((item) => {
      return item.replace(regexp, `<span class="highlight ${isCorrect ? 'correct' : 'error'}">$&</span>`)
    });
  } else if (props.questionType === 2) {
    result.value = textList.map((item) => {
      let match = item.match(regexp)
      let answerMatch = item.match(new RegExp(Array.isArray(props.answer) ? props.answer[0] : props.answer, props.flags))
      if (props.excludedAnswers.includes(userAnswer.value)) {
        return item.replace(regexp, `<span class="highlight error">$&</span>`)
      }
      if (match && match[0] === (answerMatch && answerMatch[0])) {
        return item.replace(answerMatch[0], `<span class="highlight correct">$&</span>`)
      }
      return item.replace(regexp, `<span class="highlight error">$&</span>`)
    })
  }
}

const showAnswer = (e: MouseEvent) => {
  e.preventDefault()
  userAnswer.value = Array.isArray(props.answer) ? props.answer[0] : props.answer
  fakeInput.value.innerText = userAnswer.value
  match()
}

const fakeInput = ref()
onMounted(() => {
  fakeInput.value!.contentEditable = true
})
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
    <div class="bottom" @click="fakeInput.focus()">
      <span class="before">/</span>
      <div class="fake-input" ref="fakeInput" @input="handleInput" spellcheck="false"></div>
      <span class="after">/{{ flags }}</span>
      <span class="show-answer">?</span>

      <el-tooltip
          :content="questionType === 1 ? '显示答案' : '参考答案'"
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

    .before, .after {
      font-size: 16px;
      margin: 0 2px;
      color: var(--vp-code-color);
      font-weight: bold;
      opacity: 0.5;
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

.fake-input {
  outline: none;
  font-size: 16px;
  margin: 0 2px;
  color: var(--vp-code-color);
  font-weight: bold;
  --placeholder: '正则表达式';


  &:empty {
    &:before {
      content: var(--placeholder);
      color: #999;
    }
  }
}
</style>
