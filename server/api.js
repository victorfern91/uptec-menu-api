const express = require('express');
const moment = require('moment');
const menu = require('../menu-parser');
const GLOBALS = require('./globals');

const router = express.Router();

router.get('/', (req, res) => {
  menu.getMenuForCurrentWeek().then(meals => {
    res.send(meals);
  });
});

router.get('/:day', (req, res) => {
  menu.getMenuForCurrentWeek().then(meals => {
    let day = req.params.day === 'today' ? moment().format('dddd').toLowerCase() : req.params.day;
    if (GLOBALS.workingDays.indexOf(day) >= 0) {
      res.json(meals[day]);
    } else {
      res.status(400).send({
        message: `Today is ${day}, you shouldn't have to work 😝`
      })
    }
  });
});

router.get('/:day/:type', (req, res) => {
  menu.getMenuForCurrentWeek().then(meals => {
    res.json(meals[req.params.day][req.params.type]);
  });
});

module.exports = router;
