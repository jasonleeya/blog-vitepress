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
                console.log(grayMatter(content).data);
            }
        });
    }
    catch (err) {
        console.error(err);
    }
}
readAllPosts();
