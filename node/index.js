"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../.vitepress/utils");
var fs = require('fs');
var grayMatter = require('gray-matter');
var childProcess = require('child_process');
var posts = [];
function readAllPosts(parentPath) {
    if (parentPath === void 0) { parentPath = './posts'; }
    try {
        var files = fs.readdirSync(parentPath);
        files.forEach(function (item) {
            var path = parentPath + '/' + item;
            if (fs.statSync(path).isDirectory()) {
                readAllPosts(path);
            }
            else {
                var result = grayMatter(fs.readFileSync(path, 'utf-8'));
                var fileData = result.data;
                var fileContent = result.content;
                posts.push(__assign(__assign({ path: path }, fileData), { title: fileData.title ? fileData.title : getPostTitle(fileContent) || '', date: (0, utils_1.formatDate)(fileData.date ? fileData.date : getFileLastUpdateTimeFromGit(path)), cover: fileData.cover ? fileData.cover : getPostFirstImgAsCover(fileContent) || '', sticky: fileData.sticky || false, author: fileData.author || '' }));
            }
        });
    }
    catch (err) {
        console.error(err);
    }
    fs.writeFileSync('./.vitepress/posts.json', JSON.stringify(posts));
}
readAllPosts();
function getFileLastUpdateTimeFromGit(url) {
    var _a;
    return (_a = childProcess.spawnSync("git", ["log", "-1", '--pretty="%ci"', url]).stdout) === null || _a === void 0 ? void 0 : _a.toString().replace(/["']/g, "").trim();
}
function getPostTitle(content) {
    var _a;
    return (_a = content.match(/# (.*)/)) === null || _a === void 0 ? void 0 : _a[1];
}
function getPostFirstImgAsCover(content) {
    var _a;
    return (_a = content.match(/!\[.*]\((.*)\)/)) === null || _a === void 0 ? void 0 : _a[1];
}
