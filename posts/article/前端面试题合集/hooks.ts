import {ref, computed, watchEffect} from "vue";

type Category = {
  category: string
  order: number
  count: number
  icon?: string
  filePath:string
}
type Question = {
  title: string
  description: string
  answer: string
}

const categoryList = ref<Category[]>([]);
const currentCategory = ref<string>('');
const questionList = ref<Question[]>([]);
const currentIndex = ref<number>(0);
const currentQuestion = ref<Question>(null)
const isPracticing = ref<boolean>(false)
const isLearned = ref<boolean>(false);
const isCollected = ref<boolean>(false);
const questionListLength = computed(() => questionList.value.length)
const userAnswerData = ref<{ [key: string]: { isCollected?: boolean, isLearned?: boolean } }>({})


// 获取url参数, c: category, q: question
let searchParams: URLSearchParams
let c: string
let q: string
if (!import.meta.env.SSR) {
  searchParams = new URLSearchParams(window.location.search);
  c = searchParams.get('c');
  q = searchParams.get('q');
}

const getFileData = async ():Promise<Category[]> => {
  return fetch(import.meta.env.VITE_FILE_BASE_URL + '/json/question/fileData.json').then(res => res.json())
}
try {
  categoryList.value = await getFileData()
} catch (e) {
  console.log(e)
}

// 获取本地用户答题数据
const getUserAnswerData = () => {
  if (!import.meta.env.SSR) {
    userAnswerData.value = Object.assign(userAnswerData.value, JSON.parse(localStorage.getItem('userAnswerData') || '{}'))
  }
}
getUserAnswerData()

currentCategory.value = c ? c : categoryList.value.find(item => item.order === 1).category

const getQuestionList = async (filePath: string):Promise<Question[]> => {
  return fetch(import.meta.env.VITE_FILE_BASE_URL + '/' + filePath)
      .then(res => res.json())
}

export const useQuestion = () => {
  // 依赖currentCategory获取题目list
  watchEffect(async () => {
    const currentCategoryData = categoryList.value.find(item => item.category === currentCategory.value)
    const list = await getQuestionList(currentCategoryData.filePath)
    questionList.value = list.map(item => {
        return {
          ...item,
          title: item.title.replace(/\\/g, '')
        }
      })

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
    if (!import.meta.env.SSR) {
      localStorage.setItem('userAnswerData', JSON.stringify(userAnswerData.value))
    }
  }

  return {
    categoryList,
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
