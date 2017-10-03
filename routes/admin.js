var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ dest: '../public/data' });

var mongoose = require('mongoose');
var csv = require('csv');
var fs = require('fs');

var SensorData = require('../models/sensordata');
var DataInfo = require('../models/datainfo');
var sb = require('../models/sensorbase');
var Sensor = sb.getModel();
var SensorInfo = sb.getInfoModel();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: '管理者ページ' });
});

router.get('/add/:id', function(req, res, next) {
  var id = req.params.id;
  DataInfo.findOne({'_id':id}, function(err, doc){
    if (err) {
      console.log(err);
    }
    res.render('add', {
      title : 'データの追加',
      doc : doc
    })
  });
});

router.post('/add/csv', upload.single('file'), function(req, res, next) {
  console.log(req.file);
  console.log(req.file.path);
  console.log(req.body);
  saveFile(req.file.path, req.body.id, req.body.label);
  res.redirect('/datalist')
});

router.post('/add/info', function(req, res, next) {
  var dataInfo = new DataInfo({
    label : req.body.label,
    discription : req.body.discription
  });
  dataInfo.save(function(err){
    if (err) { console.log(err); }
  });
  res.redirect('/datalist');
});

router.post('/add/info2', upload.single('file'), function(req, res, next) {
  console.log(req.body);
  var dataInfo = new DataInfo({
    label : req.body.label,
    discription : req.body.discription
  });
  dataInfo.save(function(err, doc){
    if (err) {
      console.log(err);
    }
    saveFile(req.file.path, doc._id, req.body.label);
  });
  res.redirect('/admin');
});


router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  DataInfo.findOne({'_id':id}, function(err, doc){
    if (err) {
      console.log(err);
    }
    res.render('delete', {
      title : '削除',
      doc : doc
    })
  });
});

router.post('/remove', function(req, res, next) {
  var id = req.body.id;
  DataInfo.findOne({'_id':id}, function(err, doc){
    if (err) {
      console.log(err);
    }
    doc.remove(function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect('/datalist');
    });
  });
});

router.post('/remove/all', function(req, res, next) {
  console.log("\nremove!!!!!!!!!!!!!!\n");
  SensorData.remove({}, function(err){
    console.log(err);
  });
  res.redirect('/datalist');
});


function saveFile(filepath, info_id, label) {
  var parse = csv.parse({columns: true});
  var readableStream = fs.createReadStream(filepath, {encoding: 'utf-8'});
  var sensorNames = new Array();
  console.log("do save");

  function save(data){
    var time = "";
    var sensors = new Array();
    var sensorNames_tmp = new Array();

    for (key in data) {
      if (key.toLowerCase() == 'time') {
        time = data[key];
      }else {
        sensors.push(new Sensor({
          'name' : key,
          'value' : data[key]
        }));
        sensorNames_tmp.push(key);
      }
    }
    if (sensorNames.length < sensorNames_tmp.length) {
      for (var i = sensorNames.length; i < sensorNames_tmp.length; i++) {
        sensorNames[i] = sensorNames_tmp[i];
      }
    }
    var sensorData = new SensorData({
      'label' : label,
      'time' : time,
      'data' : sensors
    });
    sensorData.save(function(err){
      if (err) { console.log(err); }
    });
  }

  readableStream.pipe(parse);

  parse.on('readable', () => {
    var tmp;
    while(tmp = parse.read()) {
      save(tmp);
    }
  });

  parse.on('end', () => {
    console.log("end");

    DataInfo.findOne({'_id':info_id}, function(err, doc){
      if (err) {
        console.log(err);
      }

      var sensorInfos = new Array();
      for (var i = 0; i < sensorNames.length; i++) {
        sensorInfos.push(new Sensor({
          'name' : sensorNames[i]
        }));
      }
      doc.item = sensorInfos;

      doc.save(function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
  });
}

module.exports = router;
