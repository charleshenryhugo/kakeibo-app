const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, './client/src/svgs'); // path to your SVG files

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 

  files.forEach((file, index) => {
    const oldPath = path.join(directoryPath, file);
    const newPath = path.join(directoryPath, `icon${index + 1}.svg`);

    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      console.log(`Renamed ${oldPath} to ${newPath}`);
    });
  });
});