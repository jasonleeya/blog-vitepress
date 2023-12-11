import postList from '../posts.json'

export function usePosts(): { postList: PostMeta[] } {
  return {
    postList,
  }
}
