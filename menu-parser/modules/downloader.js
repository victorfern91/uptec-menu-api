const fs = require('fs');
const utils = require('./utils');
// app constants
const APP = require('../globals').appParameters;
const URL = require('../globals').urlParameters;

function getFile(url) {
  return new Promise((resolve, reject) => {
    const ementaIndex = url.indexOf(URL.prefix);
    const localFilename = `${url.slice(ementaIndex, url.length)}`;
    const appDirPath = __filename.slice(0, __filename.indexOf(APP.name) + APP.name.length);
    const currentWeekFilePath = `${appDirPath}/files/${localFilename}`

    if (fs.existsSync(currentWeekFilePath)) {
      console.log('File already downloaded');
      resolve(currentWeekFilePath);
    } else {
      console.log(`Downloading from ${url}`);
      const wget = utils.wget(url, currentWeekFilePath);

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
