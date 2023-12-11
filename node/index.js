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
var fs = require('fs');
var grayMatter = require('gray-matter');
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
                var content = fs.readFileSync(path, 'utf-8');
                posts.push(__assign({ path: path }, grayMatter(content).data));
            }
        });
    }
    catch (err) {
        console.error(err);
    }
}
readAllPosts();
fs.writeFileSync('./.vitepress/posts.json', JSON.stringify(posts));
