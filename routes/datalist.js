var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorData = require('../models/sensordata');
var DataInfo = require('../models/datainfo');
var sb = require('../models/sensorbase');
var Sensor = sb.getModel();

router.get('/', function(req, res, next) {
  DataInfo.find(function(err, docs) {
    if (err) {
      console.log(err);
    }
    res.render('datalist', {
      title : '圃場環境　計測データ',
      docs : docs,
    });
  });
});

module.exports = router;
