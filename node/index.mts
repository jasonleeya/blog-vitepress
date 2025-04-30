const axios = require('axios');
axios.defaults.baseURL = 'https://tcb.lsj97.com/api/blog'

const fs = require('fs');
const grayMatter = require('gray-matter');
const childProcess = require('child_process')
const posts = []

function readAllPosts(parentPath = './posts') {
  try {
    const files = fs.readdirSync(parentPath);
    files.forEach(item => {
      const path = parentPath + '/' + item;
      if (fs.statSync(path).isDirectory()) {
        readAllPosts(path)
      } else {
        if (path.match(/index\.md$/)) {
          const result = grayMatter(fs.readFileSync(path, 'utf-8'));
          const fileData = result.data
          const fileContent = result.content

          posts.push({
            path:path.replace(/index\.md$/i, '').replace(/^\./,''),
            ...fileData,
            tags: fileData.tags ? fileData.tags : [],
            category: fileData.category ? fileData.category : '',
            title: fileData.title ? fileData.title : getPostTitle(fileContent) || '',
            updateTime:formatDate(fileData.updateTime ? fileData.updateTime : getFileLastUpdateTimeFromGit(path)),
            cover: fileData.cover||'',
            imgs: getPostImgs(fileContent) || '',
            sticky: fileData.sticky || 0,
            author: fileData.author || '',
            description: fileData.description || getPostDescription(fileContent) || '',
            createTime:formatDate(fileData.createTime ? fileData.createTime : getFileCreateTime(path)),
          })
        }
      }
    })
  } catch (err) {
    console.error(err);
  }
  fs.writeFileSync('./.vitepress/posts.json', JSON.stringify(posts))
}

readAllPosts()
axios.post('/updatePosts', {postList:posts}).then(res=>{
  console.log('文章列表更新数据库成功',res.data)
})

function getFileLastUpdateTimeFromGit(url: string) {
  return childProcess.spawnSync("git", ["log", "-1", '--pretty="%ci"', url]).stdout?.toString().replace(/["']/g, "").trim();
}

function getPostTitle(content: string) {
  return content.match(/# (.*)/)?.[1]
}

function getPostImgs(content: string) {
  const match = content.match(/!\[[^\]]*]\([^)]*\)/g)
  if(!match) return []
  return match.map(item=>{
    return item.match(/!\[[^\]]*]\(([^)]*)\)/)?.[1]
  })
}

function getPostDescription(content: string) {
  return content.replace(/\r\n/g,'\n').match(/\n*# .*\n+(?:#+ .*\n+)?\n*(.*)/)?.[1] || ''
}

function getFileCreateTime(filePath: string) {
  return childProcess.spawnSync("git", ["log", "--diff-filter=A", '--pretty="%ci"', filePath]).stdout?.toString().replace(/["']/g, "").trim();
}

function formatDate(date: Date | string | number, fmt: string = "yyyy-MM-dd hh:mm:ss") {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  const o: Record<string, number> = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] + "" : ("00" + o[k]).substr(("" + o[k]).length),
      );
    }
  }
  return fmt;
}
