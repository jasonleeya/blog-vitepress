import grayMatter from 'gray-matter';
import * as fs from 'fs';

const dirPath = './posts/article/前端面试题合集';
import MarkdownIt from 'markdown-it'
import {createHighlighter} from 'shiki'

let md
const langs = ['javascript', 'css', 'html', 'typescript', 'js', 'shell', 'vue', 'json']
const highlighter = await createHighlighter({
  themes: ['vitesse-light'],
  langs,
})
md = MarkdownIt({
  highlight: (str, lang) => {
    if(!lang || lang&&!langs.includes(lang)) {
      lang = 'text'
    }
    try {
      const code = highlighter.codeToHtml(str, {
        lang,
        theme: 'vitesse-light',
      })
      return `<div class="language-${lang} "><span class="lang">${lang}</span>${code}</div>`
    } catch (e) {
      return str
    }
  }
})
md.renderer.rules.link_open = (tokens, idx) => {
  const href = tokens[idx].attrGet('href');
  return `<a href="${href}" target="_blank" rel="noopener noreferrer">`;
};


type Category = {
  category: string
  count: number
}

function readFile() {
  console.log('读取文件中...')
  const category = fs.readdirSync(dirPath + '/category', 'utf-8');
  console.log('文件读取完成')

  let fileDataList = []
  console.log('解析题目中')
  category.forEach(item => {
    const path = dirPath + '/category/' + item;
    const result = grayMatter(fs.readFileSync(path, 'utf-8'));
    const fileContent = result.content
    const fileData: Category = {...(result.data as Category), count: 0}
    const questionStringArray = splitQuestions(fileContent)
    const questionList = []
    questionStringArray.forEach(questionString => {
      const question = parseQuestion(questionString)
      questionList.push(question)
    })
    console.log('解析' + item + '完成')
    console.log('生成' + fileData.category + '.json文件中')
    fs.writeFileSync(`${dirPath}/json/${fileData.category}.json`, JSON.stringify(questionList))
    console.log('写入' + fileData.category + '.json文件完成')
    console.log('----------------------')
    fileData.count = questionList.length
    fileDataList.push(fileData)
  })
  console.log('题目解析完成')
  console.log('生成fileData.json文件中')
  fs.writeFileSync(`${dirPath}/json/fileData.json`, JSON.stringify(fileDataList))
  console.log('写入fileData.json文件完成')
  console.log('脚本执行完成')
}

function splitQuestions(fileContent: string) {
  const reg = /##(\s|\S)+?(?=##|$)/g
  const match = fileContent.match(reg)
  if (!match) return []
  return match
}

function parseQuestion(question: string) {
  const title = question.match(/(?<=## )(.*)/g)?.[0]
  let description = question.match(/(?<=##.*(\r\n)+)[\s\S]+(?=---)/)?.[0]
  description = description ? description + '---\r\n' : ''
  let answer = question.match(/(?<=##.*(\r\n)+)[\s\S]+/g)?.[0] || ''
  if (answer.includes('---')) {
    answer = answer.split('---')[1]
  }

  let result = {title, description: '', answer: ''}
  try {
    result.description = description ? md.render(description.trim()) : ''
  } catch (e) {
    console.log('解析'+title+ '描述错误')
  }

  try {
    result.answer = md.render(answer.trim())
  } catch (e) {
    console.log('解析'+title+ '答案错误')
  }


  return result
}

readFile()
export {};

//别管tsc报错
// tsc posts/article/前端面试题合集/node.mts
// node posts/article/前端面试题合集/node.mjs
