import _postList from '../posts.json'
import {ref,watch} from 'vue'
import axios from "axios";
import {useData} from "vitepress";

_postList.sort((a, b) => (new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()))
    .sort((a, b) => (b.sticky || 0) - (a.sticky || 0))
const postList = ref<PostMeta[]>(JSON.parse(JSON.stringify(_postList)))
const hotList = ref<PostMeta[]>([])

export function usePosts() {

  const total = _postList.length
  const tags = new Set<string>()
  _postList.forEach(post => {
    post.tags.forEach(tag => {
      tags.add(tag)
    })
  })

  const getPostByTag = (tag: string) => {
    const list:PostMeta[] = JSON.parse(JSON.stringify(_postList))
    if(!tag) {
      postList.value = list
    } else {
      postList.value = list.filter(post => post.tags.includes(tag))
    }
    console.log('%c postList.value ','color:white;background:red',postList.value)
  }

  const categoryMap = new Map<string, number>()
  _postList.forEach(post => {
    categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1)
  })

  const categoryStatistics:Category[] = []
  const cList = Array.from(categoryMap)
  const categoryInfo = useData().theme.value.categoryInfo as Category[]
  cList.forEach(([key, value]) => {
    const category = categoryInfo.find(item => item.name === key)
    if (category) {
      categoryStatistics.push({
        ...category,
        count: value
      })
    }
  })
  const aaa = ref(0)
  const getPostsByCategory = (category: string) => {
    const list:PostMeta[]  = JSON.parse(JSON.stringify(_postList))
    if(!category) {
      postList.value = list
    } else {
      postList.value = list.filter(post => post.category === category)
    }
  }


  let recentlyUpdatedCount: number = 0
  const oneMonth = 30 * 24 * 60 * 60 * 1000
  const now = new Date()
  _postList.forEach(post => {
    const date = new Date(post.updateTime)
    if (now.getTime() - date.getTime() < oneMonth) {
      recentlyUpdatedCount++
    }
  })


  axios.post<ResponseData<PostMeta[]>>('/getHotPosts').then(res => {
    hotList.value = res?.data?.data || []
  })

  return {
    postList,
    total,
    tags: Array.from(tags),
    tagsCount: tags.size,
    getPostByTag,
    categoryStatistics,
    getPostsByCategory,
    recentlyUpdatedCount,
    hotList
  }
}
