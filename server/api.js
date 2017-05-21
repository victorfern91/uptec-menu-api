const express = require('express');
const moment = require('moment');
const menu = require('../menu-parser');
const GLOBALS = require('./globals');

const router = express.Router()

router.get('/', (req, res) => {
  menu.getMenuForCurrentWeek()
  .then(meals => {
    res.send(meals);
  })
  .catch(err => {
    sendErrorMessage(res, err);
  });
});

router.get('/:day', (req, res) => {
  menu.getMenuForCurrentWeek()
  .then(meals => {
    let day = req.params.day === 'today' ? moment().format('dddd').toLowerCase() : req.params.day;
    if (GLOBALS.workingDays.indexOf(day) >= 0) {
      res.json(meals[day]);
    } else {
      res.status(400).send({
        message: `Today is ${day}, you shouldn't have to work 😝`
      })
    }
  })
  .catch(err => {
    sendErrorMessage(res, err);
  });
});

function sendErrorMessage(res, err) {
  if(err.parserError) {
    res.status(400).send({
      message: 'Maybe is too soon to get this week menu 😳 Please, try later'
    });
  } else {
    res.status(400).send(err);
  }
}

module.exports = router;
