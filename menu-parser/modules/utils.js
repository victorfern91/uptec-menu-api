const spawn = require('child_process').spawn;

module.exports = {
  removeFile: function (filePath) {
    console.log(`Deleting ${filePath}`);
    const rm = spawn('rm', [filePath]);
  },
  
  wget: function(url, dest) {
    return spawn('wget', [url, '-O', dest]);
  }
}
