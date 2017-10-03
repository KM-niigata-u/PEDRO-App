var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorData = require('../models/sensordata');
var DataInfo = require('../models/datainfo');
var sb = require('../models/sensorbase');
var Sensor = sb.getModel();

var today = require('../my_modules/date').getToday();

router.get('/:label', function(req, res, next) {
  var label = req.params.label;
  SensorData.find({
    'label' : label
  }).exec(function(err, docs) {
    res.render('data', {
      title : label,
      label : label,
      docs : docs,
      today : today
    });
  });
});

router.post('/search/:label', function(req, res, next) {
  var label = req.params.label;
  var date = req.body.date;
  var time = req.body.time;
  var name = req.body.name;

  var datetime = new Date(date + " " + time);
  console.log("search: "+datetime);

  SensorData.find({
    'label' : label,
    'time' : datetime
  }).exec(function(err, docs) {
    res.render('data', {
      title : label,
      label : label,
      docs : docs,
      today : today
    });
  });

});

module.exports = router;
