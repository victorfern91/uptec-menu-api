const moment = require('moment');
// menu-parser constants
const URL = require('../globals').urlParameters;

function getMenuForCurrentWeek() {
  const momentInstance = moment()
  return getUrl(momentInstance);
}

function getMenuForWeek(weekNumber) {
  const momentInstance = moment().week(weekNumber);
  return getUrl(momentInstance);
}

function getUrl(momentInstance) {
  const year = momentInstance.year();
  const month = momentInstance.format('MM');
  const firstDay = momentInstance.day('monday').format('DD-MM-YYYY');
  const lastDay = momentInstance.day('friday').format('DD-MM-YYYY');
  return `http://www.${URL.domain}/${year}/${month}/${URL.prefix}-${firstDay}-${URL.to}-${lastDay}${URL.extension}`;
}

module.exports = {
  getMenuForCurrentWeek,
  getMenuForWeek
}
