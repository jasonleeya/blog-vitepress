import axios from "axios";
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
        const result = grayMatter(fs.readFileSync(path, 'utf-8'))
        const fileData = result.data
        const fileContent = result.content

        posts.push({
          path:path.replace(/\.md$/i, '').replace(/^\./,''),
          ...fileData,
          title: fileData.title ? fileData.title : getPostTitle(fileContent) || '',
          updateTime: fileData.updateTime ? fileData.updateTime : getFileLastUpdateTimeFromGit(path),
          cover: fileData.cover ? fileData.cover : getPostFirstImgAsCover(fileContent) || '',
          sticky: fileData.sticky || 0,
          author: fileData.author || '',
          description: fileData.description || getPostDescription(fileContent) || '',
          createTime:  fileData.updateTime ? fileData.updateTime : getFileCreateTime(path)
        })
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

function getPostFirstImgAsCover(content: string) {
  return content.match(/!\[.*]\((.*)\)/)?.[1]
}

function getPostDescription(content: string) {
  return content.match(/(?:\n*# .*\n+)?(?:#+ .*\n+)?\n*(.*)/)?.[1] || ''
}

function getFileCreateTime(filePath: string) {
  return fs.statSync(filePath).ctime
}
