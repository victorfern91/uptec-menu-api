#! /usr/bin/env node

const moment = require('moment');
const menu = require('./menu-parser');
const prettyjson = require('prettyjson');
const GLOBALS = require('./server/globals');

menu.getMenuForCurrentWeek()
  .then(meals => {
    let day = moment().format('dddd').toLowerCase();
    if (GLOBALS.workingDays.indexOf(day) >= 0) {
      console.log(prettyjson.render(meals[day]));
    } else {
      console.log(prettyjson.render({
        message: `Today is ${day}, you shouldn't have to work 😝`
      }));
    }
  });
