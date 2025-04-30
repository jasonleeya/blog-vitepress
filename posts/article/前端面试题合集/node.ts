const grayMatter = require('gray-matter');
const fs = require('fs');
const dirPath = './posts/article/前端面试题合集';
// const MarkdownIt = require('markdown-it')
// const md = MarkdownIt()

function readFile() {
  console.log('读取文件中...')
  const category = fs.readdirSync(dirPath + '/category', 'utf-8');

  let fileDataList = []
  console.log('读取完成')
  console.log('解析问题中')
  category.forEach(item => {
    const path = dirPath + '/category/' + item;
    const result = grayMatter(fs.readFileSync(path, 'utf-8'));
    const fileContent = result.content
    const fileData = {...result.data, count: 0}
    const questionStringArray = parseQuestions(fileContent)
    const questionList = []
    questionStringArray.forEach(questionString => {
      const question = splitQuestion(questionString)
      questionList.push(question)
    })
    console.log('解析完成')
    console.log('生成json文件中')
    fs.writeFileSync(`${dirPath}/json/${fileData.category}.json`, JSON.stringify(questionList))
    console.log('生成完成')
    fileData.count = questionList.length
    fileDataList.push(fileData)
  })

  console.log('生成fileData.json文件中')
  fs.writeFileSync(`${dirPath}/json/fileData.json`, JSON.stringify(fileDataList))
  console.log('脚本执行完成')
}

function parseQuestions(fileContent: string) {
  const reg = /##(\s|\S)+?(?=##|$)/g
  const match = fileContent.match(reg)
  if (!match) return []
  return match
}

function splitQuestion(question: string) {
  const title = question.match(/## (.*)/)?.[1]
  const answer = question.match(/(?<=##.*(\r\n)+)[\s\S]+/g)?.[0] || ''

  return {
    title,
    // answer: md.render(answer.trim())
    answer: answer.trim()
  }
}

readFile()

export {};

// tsc posts/article/前端面试题合集/node.ts
// node posts/article/前端面试题合集/node.js
