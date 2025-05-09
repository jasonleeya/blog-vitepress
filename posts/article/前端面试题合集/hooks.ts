import {ref, computed, watchEffect, onMounted} from "vue";
import category from './json/fileData.json'

const currentCategory = ref<string>('');
const questionList = ref([]);
const currentIndex = ref(0);
const currentQuestion = ref(null)
const isPracticing = ref(false)
const isLearned = ref(false);
const isCollected = ref(false);
const questionListLength = computed(() => questionList.value.length)
const userAnswerData = ref({})

type Category = {
  category: string
  order: number
  count: number
  icon?: string
}


// 获取url参数, c: category, q: question
let searchParams
let c
let q
// @ts-ignore
if (!import.meta.env.SSR) {
   searchParams = new URLSearchParams(window.location.search);
   c = searchParams.get('c');
   q = searchParams.get('q');
}

// 获取用户答题数据
const getUserAnswerData = () => {
  // @ts-ignore
  if (!import.meta.env.SSR) {
    userAnswerData.value = Object.assign(userAnswerData.value, JSON.parse(localStorage.getItem('userAnswerData') || '{}'))
  }
}
getUserAnswerData()

currentCategory.value =c?c: (category as Category[]).find(item => item.order === 1).category

export const useQuestion = () => {

  // 依赖currentCategory获取题目list
  watchEffect(async () => {
    const file = await import(`./json/${currentCategory.value}.json`);
    let list = file.default
    list = list.map(item => {
      return {
        ...item,
        title: item.title.replace(/\\/g, '')
      }
    })
    questionList.value = list

    // 如果url有问题，设置当前题目
    if (q) {
      const index = list.findIndex(item => item.title === q);
      if (index !== -1) {
        currentIndex.value = index
        currentQuestion.value = list[index]
        isPracticing.value = true
      }
    }
  })

  // 依赖currentIndex获取当前题目, 设置答题状态
  watchEffect(() => {
    if (!questionList.value.length || !currentQuestion.value) return
    const currentQuestionTitle = questionList.value[currentIndex.value]?.title
    isLearned.value = userAnswerData.value[currentQuestionTitle]?.isLearned || false
    isCollected.value = userAnswerData.value[currentQuestionTitle]?.isCollected || false
  })

  // 依赖currentQuestion和currentCategory设置url参数
  watchEffect(() => {
    // @ts-ignore
    if (!import.meta.env.SSR) {
      const searchParams = new URLSearchParams(window.location.search);

    if (currentQuestion.value) {
      searchParams.set('q', currentQuestion.value?.title);
    } else {
      searchParams.delete('q');
    }
    if (currentCategory.value) {
      searchParams.set('c', currentCategory.value);
    }
    history.replaceState(null, '', '?' + searchParams.toString());
    }
  })

  // 依赖isPracticing设置当前题目
  watchEffect(() => {
    if (!isPracticing.value && currentQuestion.value) {
      currentQuestion.value = null
    }
  })

  // 设置答题状态并本地存储
  const storeState = () => {
    const questionTitle = questionList.value[currentIndex.value].title
    if (!userAnswerData.value[questionTitle]) {
      userAnswerData.value[questionTitle] = {}
    }
    if (!isLearned.value && !isCollected.value && userAnswerData.value[questionTitle]) {
      delete userAnswerData.value[questionTitle]
    } else {
      userAnswerData.value[questionTitle].isLearned = isLearned.value
      userAnswerData.value[questionTitle].isCollected = isCollected.value
    }
    //@ts-ignore
    if (!import.meta.env.SSR) {
      localStorage.setItem('userAnswerData', JSON.stringify(userAnswerData.value))
    }
  }

  return {
    categoryList: category,
    currentCategory,
    questionList,
    currentIndex,
    currentQuestion,
    isPracticing,
    isLearned,
    isCollected,
    questionListLength,
    storeState,
    userAnswerData,
    getUserAnswerData
  }
}
