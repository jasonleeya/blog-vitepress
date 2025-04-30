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
import * as grayMatter from 'gray-matter';
import * as fs from 'fs';
var dirPath = './posts/article/前端面试题合集';
import * as MarkdownIt from 'markdown-it';
import { createHighlighter } from 'shiki';
var md;
var highlighter = await createHighlighter({
    themes: ['vitesse-light'],
    langs: ['javascript', 'css', 'html', 'typescript', 'js', 'bash', 'vue'],
});
md = MarkdownIt({
    highlight: function (str, lang) {
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
function readFile() {
    console.log('读取文件中...');
    var category = fs.readdirSync(dirPath + '/category', 'utf-8');
    var fileDataList = [];
    console.log('读取完成');
    console.log('解析问题中');
    category.forEach(function (item) {
        var path = dirPath + '/category/' + item;
        var result = grayMatter(fs.readFileSync(path, 'utf-8'));
        var fileContent = result.content;
        var fileData = __assign(__assign({}, result.data), { count: 0 });
        var questionStringArray = parseQuestions(fileContent);
        var questionList = [];
        questionStringArray.forEach(function (questionString) {
            var question = splitQuestion(questionString);
            questionList.push(question);
        });
        console.log('解析完成');
        console.log('生成json文件中');
        fs.writeFileSync("".concat(dirPath, "/json/").concat(fileData.category, ".json"), JSON.stringify(questionList));
        console.log('生成完成');
        fileData.count = questionList.length;
        fileDataList.push(fileData);
    });
    console.log('生成fileData.json文件中');
    fs.writeFileSync("".concat(dirPath, "/json/fileData.json"), JSON.stringify(fileDataList));
    console.log('脚本执行完成');
}
function parseQuestions(fileContent) {
    var reg = /##(\s|\S)+?(?=##|$)/g;
    var match = fileContent.match(reg);
    if (!match)
        return [];
    return match;
}
function splitQuestion(question) {
    var _a, _b;
    var title = (_a = question.match(/## (.*)/)) === null || _a === void 0 ? void 0 : _a[1];
    var answer = ((_b = question.match(/(?<=##.*(\r\n)+)[\s\S]+/g)) === null || _b === void 0 ? void 0 : _b[0]) || '';
    return {
        title: title,
        answer: md.render(answer.trim())
    };
}
readFile();
// tsc posts/article/前端面试题合集/node.mts
// node posts/article/前端面试题合集/node.mjs
