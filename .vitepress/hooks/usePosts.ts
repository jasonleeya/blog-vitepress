import _postList from '@/posts.json'
import {ref} from 'vue'
import axios from "axios";
import {useData} from "vitepress";

_postList.sort((a, b) => (new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()))
    .sort((a, b) => (b.sticky || 0) - (a.sticky || 0))
const postList = ref<PostMeta[]>(JSON.parse(JSON.stringify(_postList)))
const hotList = ref<PostMeta[]>([])

export function usePosts() {

  const postsTotal: number = _postList.length

  const getAllPosts = () => {
    postList.value = JSON.parse(JSON.stringify(_postList))
  }
  const groupPostListByTag = (tag: string) => {
    const list: PostMeta[] = JSON.parse(JSON.stringify(_postList))
    if (!tag) {
      postList.value = list
    } else {
      postList.value = list.filter(post => post.tags.includes(tag))
    }
  }

  const categoryMap = new Map<string, number>()
  const tagMap = new Map<string, number>()

  _postList.forEach(post => {
    categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1)

    post.tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })

  const categories: Category[] = []
  const cList = Array.from(categoryMap)
  const categoryInfo = useData<{ categoryInfo: Category[] }>().theme.value.categoryInfo as Category[]
  cList.forEach(([key, value]) => {
    const category = categoryInfo.find(item => item.name === key)
    if (category) {
      categories.push({
        ...category, count: value
      })
    }
  })

  const groupPostListByCategory = (category: string) => {
    const list: PostMeta[] = JSON.parse(JSON.stringify(_postList))
    if (!category) {
      postList.value = list
    } else {
      postList.value = list.filter(post => post.category === category)
    }
  }

  const tagColors = [['#ec1414', '#fadada'], ['#e55428', '#f6d9ce'], ['#ff7b00', '#fae8d4'], ['#dcbe04', '#f8efbb'], ['#8bcc1b', '#dbefb7'], ['#309800', '#d6f5c9'], ['#04c4aa', '#d4faf5'], ['#00bbf9', '#d7eefc'], ['#364fd3', '#d4dafc'], ['#9b5de5', '#ecd7fa'], ['#7026b7', '#e5d1f8'],]
  const tags: Tag[] = Array.from(tagMap).map((item, index) => ({
    name: item[0], count: item[1], color: tagColors[index % tagColors.length][0], backgroundColor: tagColors[index % tagColors.length][1]
  }))

  const getTagColorByName = (tag: string): { color: string, backgroundColor: string } => {
    return tags.find((item) => item.name === tag)
  }

  // let recentlyUpdatedCount: number = 0
  // const oneMonth = 30 * 24 * 60 * 60 * 1000
  // const now = new Date()
  // _postList.forEach(post => {
  //   const date = new Date(post.updateTime)
  //   if (now.getTime() - date.getTime() < oneMonth) {
  //     recentlyUpdatedCount++
  //   }
  // })

  const getPostsByCreateTime = () => {
    const list: PostMeta[] = JSON.parse(JSON.stringify(_postList))
    list.sort((a, b) => (new Date(b.createTime).getTime() - new Date(a.createTime).getTime()))
    return list
  }

  const getHotPostList = async () => {
    return axios.post<ResponseData<PostMeta[]>>('/getHotPosts').then(res => {
      return hotList.value = res?.data?.data || []
    })
  }

  const resetPostList = () => {
    postList.value = JSON.parse(JSON.stringify(_postList))
  }
  return {
    postList, getAllPosts, postsTotal, tags, groupPostListByTag, categories, groupPostListByCategory, getHotPostList, getTagColorByName, getPostsByCreateTime, resetPostList
  }
}
