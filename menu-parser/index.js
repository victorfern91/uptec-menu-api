// this is necessary because node doesn't has await and async keywords included
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const url = require('./modules/url');
const Parser = require('./modules/parser');
const downloader = require('./modules/downloader');

const getMenuForCurrentWeek = async(() => {
  const menuUrl = url.getMenuURLForCurrentWeek();
  const file = await(downloader.getFile(menuUrl));
  const parser = new Parser(file);
  const menu = await(parser.getMenu());

  return menu;
});

module.exports = {
  getMenuForCurrentWeek
}
