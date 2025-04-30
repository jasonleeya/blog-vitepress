import {ref, computed, watchEffect} from "vue";
import category from './json/fileData.json'

const currentCategory = ref<string>('');
const questionList = ref([]);
const currentIndex = ref(0);
const currentQuestion = ref(null)
const isPracticing = ref(false)
const isLearned = ref(false);
const isCollected = ref(false);
const questionListLength = computed(() => questionList.value.length)
let userAnswerData

type Category = {
  category: string
  order: number
  count: number
  icon?: string
}

//@ts-ignore
if (!import.meta.env.SSR) {
  userAnswerData = JSON.parse(localStorage.getItem('userAnswerData') || '{}')
}

currentCategory.value = (category as Category[]).find(item => item.order === 1).category

export const useQuestion = () => {


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
  })

  watchEffect(() => {
    if (!questionList.value.length || !currentQuestion.value) return
    const currentQuestionTitle = questionList.value[currentIndex.value]?.title
    //@ts-ignore
    if (!import.meta.env.SSR) {
      userAnswerData = JSON.parse(localStorage.getItem('userAnswerData') || '{}')
    }
    isLearned.value = userAnswerData[currentQuestionTitle]?.isLearned || false
    isCollected.value = userAnswerData[currentQuestionTitle]?.isCollected || false
  })


  const storeState = () => {
    //@ts-ignore
    if (!import.meta.env.SSR) {
      userAnswerData = JSON.parse(localStorage.getItem('userAnswerData') || '{}')
    }
    const questionTitle = questionList.value[currentIndex.value].title
    if (!userAnswerData[questionTitle]) {
      userAnswerData[questionTitle] = {}
    }
    if (!isLearned.value && !isCollected.value && userAnswerData[questionTitle]) {
      delete userAnswerData[questionTitle]
    } else {
      userAnswerData[questionTitle].isLearned = isLearned.value
      userAnswerData[questionTitle].isCollected = isCollected.value
    }
    //@ts-ignore
    if (!import.meta.env.SSR) {
      localStorage.setItem('userAnswerData', JSON.stringify(userAnswerData))
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
    userAnswerData
  }
}
