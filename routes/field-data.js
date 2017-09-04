var express = require('express');
var csv = require('csv');
var fs = require('fs');

var router = express.Router();

var filename = "./ped/field_2017.csv";
var parse = csv.parse({columns: true});
var readableStream = fs.createReadStream(filename, {encoding: 'utf-8'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  var data = [];

  readableStream.pipe(parse);

  parse.on('readable', () => {
    var tmp;
    while(tmp = parse.read()) {
      data.push(tmp);
    }
  });

  parse.on('end', () => {
    console.log(data);
    res.send(data);
  });



});

module.exports = router;
