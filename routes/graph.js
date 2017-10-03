var express = require('express');
var router = express.Router();

var SensorData = require('../models/sensordata');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('graph', {
    title: 'グラフ',
    test: 'hello!hello...'
   });
});

router.get('/:label', function(req, res, next) {
  var label = req.params.label;
  var dataname1 = req.query.dataname1;
  SensorData.find({
    'label' : label
  }).exec(function(err, docs) {
    if (err) {
      console.log(err);
    }
    times = new Array();
    data1 = new Array();
    for (var doc of docs) {
      times.push(doc.time);
      for (var d of doc.data) {
        if (d.name == dataname1) {
          data1.push(d.value);
        }
      }
    }
    res.render('graph', {
      title : 'グラフ',
      times : times,
      dataname1 : dataname1,
      data1 : data1
    });
  });
});

module.exports = router;
