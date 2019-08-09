const { readdirSync } = require('fs')
const path = require('path')
const dirpath = path.join(__dirname)
const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

