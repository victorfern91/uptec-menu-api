const express = require('express');
const CONFIG = require('./config');
const api = require('./api');

const app = express();

app.use('/menu/', api);

app.listen(CONFIG.port, () => {
  console.log(`Server running @ ${CONFIG.port}`);
});
