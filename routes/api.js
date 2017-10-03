// routes
// API機能
// httpクエリの内容に応じてDBのデータを返却

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorData = require('../models/sensordata');
var DataInfo = require('../models/datainfo');

router.get('/get/sensordata', function(req, res, next) {
  var label = req.query.label;
  var first = req.query.first;
  var last = req.query.last;
  if (first == null) { //firstに値が入っていない（null...（実際はundifined））場合，0で初期化
    first = 0;
  }
  if (last == null) { //lastに値が入っていない（null...（実際はundifined））場合，本日の日付で初期化
    last = require('../my_modules/date').getToday();
  }
  //検索
  SensorData.find({
    'label' : label,
    'time' : {$gte : first, $lte : last}
  },{
    '_id' : 0,
    'label' : 1,
    'time' :  1,
    'data.name' : 1,
    'data.value' : 1
  })
  .sort( { 'time' : 1 } )  //timeの昇順でソート
  .exec(function(err, docs) {
    res.send(docs);  //得られたドキュメント(JSON)を送信
  });
});

router.get('/get/datainfo', function(req, res, next) {
  var label = req.query.label;
  if (label == null) {
    DataInfo.find().exec(function(err, docs) {
      res.send(docs);
    });
  }else {
    DataInfo.find({
      'label' : label
    }).exec(function(err, docs) {
      res.send(docs);
    });
  }
});

module.exports = router;
