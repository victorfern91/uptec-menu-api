const fs = require('fs');
const moment = require('moment');
const spawn = require('child_process').spawn;
// app constants
const APP = require('../globals').appParameters

function getFile(url) {
  return new Promise((resolve, reject) => {
    const localFilename = `${moment().format('YYYY_WW')}.pdf`;
    const appDirPath = __filename.slice(0, __filename.indexOf(APP.name) + APP.name.length);
    const currentWeekFilePath = `${appDirPath}/files/${localFilename}`

    if (fs.existsSync(currentWeekFilePath)) {
      console.log('File already downloaded');
      resolve(currentWeekFilePath);
    } else {
      console.log(`Downloading from ${url}`);
      const wget = spawn('wget', [url, '-O', currentWeekFilePath]);

      wget.on('error', (err) => {
        reject(err);
      });

      wget.on('close', () => {
        console.log(`Download complete and stored at ${currentWeekFilePath}`);
        resolve(currentWeekFilePath);
      });
    }
  });
}

module.exports = {
  getFile
};
