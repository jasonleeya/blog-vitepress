<script lang="ts" setup>
import { onMounted, PropType, ref} from "vue";

const props = defineProps({
  text: {
    type: String as PropType<string>,
    default: () => []
  },
  answer: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  replacerAnswer: {
    type: String as PropType<string>,
    default: ''
  },
  description: {
    type: String as PropType<string>,
    default: ``
  },
  flags: {
    type: String as PropType<string>,
    default: ''
  }
})

const userAnswer = ref('')
const userAnswerReplacer = ref('')
const handleInput = (e: Event) => {
  userAnswer.value = (e.target as HTMLInputElement).innerText
  match()
}
const handleInput2 = (e: Event) => {
  userAnswerReplacer.value = (e.target as HTMLInputElement).innerText
  match()
}

const result = ref<any>('')
const match = () => {
  if (!userAnswer.value) {
    return result.value = ''
  }
  try {
    const regexp = new RegExp(userAnswer.value, props.flags)
    result.value = props.text.replace(regexp, userAnswerReplacer.value
        .replace(/\$\{/g, '').replace(/}/g, '').replace(/RegExp\./g, ''))
  } catch (e) {
    result.value = ''
  }
}

const showAnswer = (e: MouseEvent) => {
  e.preventDefault()
  userAnswer.value = Array.isArray(props.answer) ? props.answer[0] : props.answer
  fakeInput1.value.innerText = userAnswer.value

  userAnswerReplacer.value = props.replacerAnswer
  fakeInput2.value.innerText = userAnswerReplacer.value
  match()
}
const fakeInput1 = ref()
const fakeInput2 = ref()
onMounted(() => {
  fakeInput1.value!.contentEditable = true
  fakeInput2.value!.contentEditable = true
})
</script>

<template>
  <div class="card">
    <div class="content">
      <div class="description" v-html="description"></div>
      <div class="code">
        <span style="color: #0033B3">const&nbsp;</span>
        <span style="color: #248F8F">text&nbsp;</span>
        <span>= </span>
        <span style="color: #067D17;">"</span>
        <span class="text" v-html="text" style="color: #067D17;"></span>
        <span style="color: #067D17;">"</span>
      </div>
    </div>
    <div class="answer" @click="fakeInput1.focus()">
      <span style="color: #0033B3">const&nbsp;</span>
      <span style="color: #248F8F">regexp&nbsp;</span>
      <span>= </span>
      <span class="before">/</span>
      <div class="fake-input" ref="fakeInput1" @input="handleInput" spellcheck="false"></div>
      <span class="after">/{{ flags }}</span>
    </div>
    <div class="code">
      <span style="color: #0033B3">const&nbsp;</span>
      <span style="color: #248F8F">result&nbsp;</span>
      <span>= </span>
      <span style="color: #248F8F">text</span>
      <span>.</span>
      <span style="color: #a9a94e">replace</span>
      <span>(</span>
      <span style="color: #248F8F">regexp</span>
      <span>,&nbsp;(&nbsp;) => {</span>
    </div>
    <div class="answer" @click="fakeInput2.focus()">
      <span style="color: #0033B3">&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;</span>
      <span>`</span>
      <div class="fake-input" ref="fakeInput2" style="--placeholder: '替换的内容'" @input="handleInput2"
           spellcheck="false"></div>
      <span>`</span>
    </div>
    <div class="code">
      <span>&nbsp;&nbsp;})</span>
    </div>
    <div class="code">
      <span style="color: #830091">console.</span>
      <span style="color: #a9a94e">log</span>
      <span>(</span>
      <span style="color: #248F8F">result</span>
      <span>)</span>
    </div>
    <div class="console">
      <span style="color: #56a4c4">></span><span v-if="result">
      <span class="item">"{{ result }}"</span>
    </span>
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

  .code {
    padding: 0 10px;
    font-size: 18px;
  }

  .answer {
    min-height: 40px;
    background: var(--vp-c-bg-alt);
    border-radius: 5px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 1em;
    position: relative;
    user-select: none;
    padding: 15px 10px;

    .before, .after {
      font-size: 16px;
      margin: 0 2px;
      color: var(--vp-code-color);
      font-weight: bold;
      opacity: 0.5;
    }
  }

  .show-answer {
    position: absolute;
    right: 10px;
    bottom: 10px;
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

  .console {
    margin: 10px 8px;
    font-size: 16px;

    .item {
      color: #DC362E;
      padding: 0 5px;

      &:last-child {
        padding-right: 1px;
      }
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
