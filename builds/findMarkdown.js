const fs = require('fs')

// 读取所有 Markdown 文件的内容
function findMarkdown(dir, callback) {
  fs.readdir(dir, function (err, files) {
    if (err) throw err

    files.forEach((fileName) => {
      let innerDir = `${dir}/${fileName}`

      if (fileName.indexOf('.') !== 0) {
        fs.stat(innerDir, function (err, stat) {

          if (stat.isDirectory()) {
            findMarkdown(innerDir, callback)
          } else {
            callback(innerDir)
          }
        })
      }

    })
  })
}

module.exports = findMarkdown;
