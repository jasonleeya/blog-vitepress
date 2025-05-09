var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import grayMatter from 'gray-matter';
import * as fs from 'fs';
var dirPath = './posts/article/前端面试题合集';
import MarkdownIt from 'markdown-it';
import { createHighlighter } from 'shiki';
var md;
var langs = ['javascript', 'css', 'html', 'typescript', 'js', 'shell', 'vue', 'json'];
var highlighter = await createHighlighter({
    themes: ['vitesse-light'],
    langs: langs,
});
md = MarkdownIt({
    highlight: function (str, lang) {
        if (!lang || lang && !langs.includes(lang)) {
            lang = 'text';
        }
        try {
            var code = highlighter.codeToHtml(str, {
                lang: lang,
                theme: 'vitesse-light',
            });
            return "<div class=\"language-".concat(lang, " \"><span class=\"lang\">").concat(lang, "</span>").concat(code, "</div>");
        }
        catch (e) {
            return str;
        }
    }
});
md.renderer.rules.link_open = function (tokens, idx) {
    var href = tokens[idx].attrGet('href');
    return "<a href=\"".concat(href, "\" target=\"_blank\" rel=\"noopener noreferrer\">");
};
function readFile() {
    console.log('读取文件中...');
    var category = fs.readdirSync(dirPath + '/category', 'utf-8');
    console.log('文件读取完成');
    var fileDataList = [];
    console.log('解析题目中');
    category.forEach(function (item) {
        var path = dirPath + '/category/' + item;
        var result = grayMatter(fs.readFileSync(path, 'utf-8'));
        var fileContent = result.content;
        var fileData = __assign(__assign({}, result.data), { count: 0 });
        var questionStringArray = splitQuestions(fileContent);
        var questionList = [];
        questionStringArray.forEach(function (questionString) {
            var question = parseQuestion(questionString);
            questionList.push(question);
        });
        console.log('解析' + item + '完成');
        console.log('生成' + fileData.category + '.json文件中');
        fs.writeFileSync("".concat(dirPath, "/json/").concat(fileData.category, ".json"), JSON.stringify(questionList));
        console.log('写入' + fileData.category + '.json文件完成');
        console.log('----------------------');
        fileData.count = questionList.length;
        fileDataList.push(fileData);
    });
    console.log('题目解析完成');
    console.log('生成fileData.json文件中');
    fs.writeFileSync("".concat(dirPath, "/json/fileData.json"), JSON.stringify(fileDataList));
    console.log('写入fileData.json文件完成');
    console.log('脚本执行完成');
}
function splitQuestions(fileContent) {
    var reg = /##(\s|\S)+?(?=##|$)/g;
    var match = fileContent.match(reg);
    if (!match)
        return [];
    return match;
}
function parseQuestion(question) {
    var _a, _b, _c;
    var title = (_a = question.match(/(?<=## )(.*)/g)) === null || _a === void 0 ? void 0 : _a[0];
    var description = (_b = question.match(/(?<=##.*(\r\n)+)[\s\S]+(?=---)/)) === null || _b === void 0 ? void 0 : _b[0];
    description = description ? description + '---\r\n' : '';
    var answer = ((_c = question.match(/(?<=##.*(\r\n)+)[\s\S]+/g)) === null || _c === void 0 ? void 0 : _c[0]) || '';
    if (answer.includes('---')) {
        answer = answer.split('---')[1];
    }
    var result = { title: title, description: '', answer: '' };
    try {
        result.description = description ? md.render(description.trim()) : '';
    }
    catch (e) {
        console.log('解析' + title + '描述错误');
    }
    try {
        result.answer = md.render(answer.trim());
    }
    catch (e) {
        console.log('解析' + title + '答案错误');
    }
    return result;
}
readFile();
//别管tsc报错
// tsc posts/article/前端面试题合集/node.mts
// node posts/article/前端面试题合集/node.mjs
