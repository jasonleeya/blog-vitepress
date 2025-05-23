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
  imgs: string[];
  heat?: number;
}

interface Category {
  name: string,
  icon: string,
  description: string,
  count: number
}

interface Tag {
  name: string,
  count?: number,
  color: string
  backgroundColor: string
}

interface BingImg {
  url: string
  wallpaper: string
  locales: {
    zh: {
      title: string
      copyright: string
      description: string
      headline: string
      quickFact: string
    }
  }
}

interface SidebarItem {
  text: string
  collapsed?: boolean
  link?: string
  items?: SidebarItem[]
}

interface Work {
  id: number,
  title: string,
  date: string
  img: string
  // desc: string
  link: string
}
