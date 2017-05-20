const moment = require('moment');
// menu-parser constants
const URL = require('../globals').urlParameters;

function getMenuURLForCurrentWeek() {
  const year = moment().year();
  const month = moment().format('MM');
  const firstDay = moment().day('monday').format('DD-MM-YYYY');
  const lastDay = moment().day('friday').format('DD-MM-YYYY');
  return `http://www.${URL.domain}/${year}/${month}/${URL.prefix}-${firstDay}-${URL.to}-${lastDay}${URL.extension}`;
}

module.exports = {
  getMenuURLForCurrentWeek
}
