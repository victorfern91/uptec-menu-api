const moment = require('moment');
// menu-parser constants
const URL = require('../globals').urlParameters;
const HOLIDAYS = require('../globals').portugalHolidays;

function getMenuURLForCurrentWeek() {
  const year = moment().year();
  const month = moment().format('MM');

  let firstDay = moment().day('monday');
  firstDay = isHoliday(firstDay) ? moment().day('tuesday') : firstDay;
  firstDay = firstDay.format('DD-MM-YYYY');

  let lastDay = moment().day('friday');
  lastDay = isHoliday(lastDay) ? moment().day('thursday') : lastDay;
  lastDay = lastDay.format('DD-MM-YYYY');

  return `http://${URL.domain}/${year}/${month}/${URL.prefix}-${firstDay}-${URL.to}-${lastDay}${URL.extension}`;
}

function isHoliday(day) {
  return ( HOLIDAYS.indexOf(day.format('DD-MM')) >= 0 );
}

module.exports = {
  getMenuURLForCurrentWeek
}
