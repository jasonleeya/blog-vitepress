const fs = require('fs');
const grayMatter = require('gray-matter');
const posts = []
function readAllPosts(parentPath = './posts') {
  try {
    const files = fs.readdirSync(parentPath);
    files.forEach(item=>{
      const path = parentPath + '/' + item;
      if (fs.statSync(path).isDirectory()) {
        readAllPosts(path)
      } else {
        const content = fs.readFileSync(path, 'utf-8');
        console.log(grayMatter(content).data)
      }
    })
  }catch(err) {
    console.error(err);
  }
}
readAllPosts()
