const fs = require('fs')
const {resolve} = require('path')
const {readdir} = require('fs').promises

const readFileAsync = function(filename, enc) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, enc, function(err, data) {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const normalizeText = function(text) {
  if (!text || typeof text !== 'string') {
    return text
  }

  return text
    .replace(/ \* /g, ' ')
    .replace(/\n\n/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/ {2,}/g, ' ')
    .replace(/\u200B/g, '')
    .replace(/\r/g, '')
    .trim()
}

async function readAllFilesAsync(dir) {
  const dirents = await readdir(dir, {withFileTypes: true})
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name)
      if (dirent.isDirectory()) {
        return readAllFilesAsync(res)
      } else {
        return readFileAsync(res, 'utf-8')
      }
    })
  )

  return Array.prototype.concat(...files)
}

module.exports = {readAllFilesAsync, readFileAsync, normalizeText}
