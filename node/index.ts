import {formatDate} from "../.vitepress/utils";

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
          path,
          ...fileData,
          title: fileData.title ? fileData.title : getPostTitle(fileContent) || '',
          date: formatDate(fileData.date ? fileData.date : getFileLastUpdateTimeFromGit(path)),
          cover: fileData.cover ? fileData.cover : getPostFirstImgAsCover(fileContent) || '',
          sticky: fileData.sticky || false,
          author: fileData.author || '',
        })
      }
    })
  } catch (err) {
    console.error(err);
  }
  fs.writeFileSync('./.vitepress/posts.json', JSON.stringify(posts))
}

readAllPosts()

function getFileLastUpdateTimeFromGit(url: string) {
  return childProcess.spawnSync("git", ["log", "-1", '--pretty="%ci"', url]).stdout?.toString().replace(/["']/g, "").trim();
}

function getPostTitle(content: string) {
  return content.match(/# (.*)/)?.[1]
}

function getPostFirstImgAsCover(content: string) {
  return content.match(/!\[.*]\((.*)\)/)?.[1]
}


