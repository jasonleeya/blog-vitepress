interface ResponseData<T> {
  code: number;
  msg: string;
  data: T;
}

interface PostMeta {
  path: string;
  title: string;
  tags: string[];
  category: string;
  updateTime: string;
  createTime: string;
  description: string;
  sticky: number;
  author: string;
  cover: string;
  heat?: number;
}

interface Category {
  name: string,
  icon: string,
  description: string,
  folder: string,
  count: number
}
