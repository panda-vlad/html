const { readdirSync, readdir } = require('fs');
const path = require('path');
const dirpath = path.join(__dirname);
const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

for (const dir of getDirectories(dirpath)) {
  readdir(dir, (err, files) => {
    for (const file of files) {
      if (path.extname(file) === '.json')
        console.log(file);
    }
  });
}



// console.log(getDirectories(dirpath));

