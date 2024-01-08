<script setup lang="ts">
import {ref} from "vue";
import {useIsMobile} from "../../../.vitepress/hooks/useIsMobile.mjs";

const text = ref('hello regexp')
const result = ref(text.value)
const regexp = ref('')

const isMobile = useIsMobile()
const INPUT_MIN_WIDTH = 90
const INPUT_MAX_WIDTH = isMobile.value ? 300 : 500
const inputWidth = ref(INPUT_MIN_WIDTH)
const inputRef = ref()
const hiddenTextRef = ref()
const handleInput = () => {
  inputWidth.value = getHiddenTextWidth()
  match()
}

const match = () => {
  if (!regexp.value) {
    return result.value = text.value
  }
  const reg = new RegExp(regexp.value, 'g')
  result.value = text.value.replace(reg, '<span class="highlight">$&</span>')
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

</script>

<template>

  <div class="card">
    <div class="content">
      <div class="description">在下面输入框输入'/regexp/'，匹配下面文本中的 "regexp"。</div>
      <div class="text" v-html="result"></div>
    </div>
    <div class="bottom" @click="inputRef.focus()">
      <div class="hidden-text" ref="hiddenTextRef">{{ regexp }}</div>
      /<input type="text" ref="inputRef" class="input" placeholder="正则表达式" v-model="regexp" @input="handleInput"
              :style="{width: inputWidth + 'px'}" spellcheck="false">/g
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;

  .content {
    .description {
      color: #666;
    }

    .text {
      font-size: 18px;
      font-weight: bold;
      margin: 15px 0;

      :deep(.highlight) {
        color: var(--vp-c-brand);
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

    .input {
      font-size: 18px;
      margin: 0 10px;
      color: var(--vp-code-color);
    }

    .hidden-text {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }
}
</style>
