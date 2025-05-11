import grayMatter from 'gray-matter';
import * as fs from 'fs';
import * as crypto from "node:crypto";
import MarkdownIt from 'markdown-it'
import {createHighlighter} from 'shiki'
import COS from "cos-nodejs-sdk-v5";
import * as process from "node:process";

const dirPath = './posts/article/前端面试题合集';

const env: Record<string, string> = {}

 const getEnv =  ()=>{
  const envFile =  fs.readFileSync('./.env');
  envFile.toString().split('\n').forEach(line => {
    const [key, value] = line.split('=');
    env[key] = value?.trim();
  })
}
getEnv()
console.log(env)

const cos = new COS({
  SecretId: env.VITE_COS_SECRET_ID,
  SecretKey: env.VITE_COS_SECRET_KEY,
});

const langs = ['javascript', 'css', 'html', 'typescript', 'js', 'shell', 'vue', 'json']
const highlighter = await createHighlighter({
  themes: ['vitesse-light'],
  langs,
})
const md = MarkdownIt({
  highlight: (str, lang) => {
    if (!lang || lang && !langs.includes(lang)) {
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
  filePath: string
  order: number
}

async function readFile() {
  console.log('读取文件中...')
  const category = fs.readdirSync(dirPath + '/category', 'utf-8');
  console.log('文件读取完成')

  let fileDataList = []
  console.log('解析题目中')

  for (const item of category) {
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
    console.log('上传' + fileData.category + '.json文件中')
    let filePath
    try {
      filePath = await upload(fileData.category, JSON.stringify(questionList));
    } catch (e){
      console.log('上传' + fileData.category + '.json文件失败',e)
      process.exit(1)
    }
    console.log(`上传${fileData.category}.json文件成功,路径：${filePath}`)

    // console.log('生成' + fileData.category + '.json文件中')
    // fs.writeFileSync(`${dirPath}/json/${fileData.category}.json`, JSON.stringify(questionList))
    // console.log('写入' + fileData.category + '.json文件完成')
    console.log('----------------------')

    fileData.count = questionList.length
    fileData.filePath = filePath
    fileDataList.push(fileData)
  }
  console.log('题目解析完成')
  console.log('生成fileData.json文件中')
  fs.writeFileSync(`${dirPath}/fileData.json`, JSON.stringify(fileDataList))
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
  let description = question.match(/(?<=##.*(\r\n)+)[\s\S]+(?=(\r\n)---(\r\n))/)?.[0]
  description = description ? description + '\r\n---\r\n' : ''
  let answer = question.match(/(?<=##.*(\r\n)+)[\s\S]+/g)?.[0] || ''

  if (answer.match(/(\r\n)---(\r\n)/)) {
    answer = answer.match(/(?<=(\r\n)---(\r\n)+)[\s\S]+/g)?.[0] || '';
  }

  let result = {title, description: '', answer: ''}
  try {
    result.description = description ? md.render(description.trim()) : ''
  } catch (e) {
    console.log('解析' + title + '描述错误')
  }

  try {
    result.answer = md.render(answer.trim())
  } catch (e) {
    console.log('解析' + title + '答案错误')
  }


  return result
}

async function upload(category: string, data: string):Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5' );
    hash.update(data);
    const md5 = hash.digest('hex');
    const path = `json/question/${category}_${md5}.json`;

    cos.putObject({
      Bucket: env.VITE_COS_BUCKET,
      Region: env.VITE_COS_REGION,
      Key: path,
      Body: data
    }, function (err, data) {
      if (err) {
        console.log(category + '.json上传失败');
        reject(err);
      } else {
        console.log(category + '.json上传成功');
        resolve(path);
      }
    })
  })
}

readFile()
export {};

//必须单独拿出来编译，别管tsc报错
// tsc --target esnext --module nodeNext --skipLibCheck  posts/article/前端面试题合集/node.mts
// node posts/article/前端面试题合集/node.mjs
