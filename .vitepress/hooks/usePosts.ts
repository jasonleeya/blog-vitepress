import postList from '../posts.json'
import {toRef, Ref, ref} from 'vue'
import axios from "axios";

export function usePosts() {
  const total = postList.length
  const tags = new Set<string>()
  postList.forEach(post => {
    post.tags.forEach(tag => {
      tags.add(tag)
    })
  })
  const getPostByTag = (tag: string) => {
    return postList.filter(post => post.tags.includes(tag))
  }
  const categories: Set<string> = new Set()
  postList.forEach(post => {
    post.categories.forEach(category => {
      categories.add(category)
    })
  })
  const getPostByCategory = (category: string) => {
    return postList.filter(post => post.categories.includes(category))
  }

  let recentlyUpdatedCount: number = 0
  const oneMonth = 30 * 24 * 60 * 60 * 1000
  const now = new Date()
  postList.forEach(post => {
    const date = new Date(post.updateTime)
    if (now.getTime() - date.getTime() < oneMonth) {
      recentlyUpdatedCount++
    }
  })

  const hotList = ref<PostMeta[]>([])
  axios.post<ResponseData<PostMeta[]>>('/getHotPosts').then(res=>{
    hotList.value =   res?.data?.data||[]
  })

  postList.sort((a, b) => (new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()))
      .sort((a, b) => (b.sticky || 0) - (a.sticky || 0))
  return {
    postList: toRef(postList) as Ref<PostMeta[]>,
    total,
    tags,
    tagsCount: tags.size,
    getPostByTag,
    categories,
    categoriesCount: categories.size,
    getPostByCategory,
    recentlyUpdatedCount,
    hotList
  }
}
