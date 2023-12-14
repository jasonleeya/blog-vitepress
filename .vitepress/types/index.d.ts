interface ResponseData<T> {
  code: number;
  msg: string;
  data: T;
}
interface PostMeta {
  path: string;
  title: string;
  tags: string[];
  categories: string[];
  updateTime: string;
  createTime: string;
  description: string;
  sticky: number;
  author: string;
  cover: string;
  heat: number;
}
