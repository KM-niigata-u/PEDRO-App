var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorSchema = new Schema({
  name : String, //任意の名前
  value : Number //計測値
});

var SensorInfoSchema = new Schema({
  name : String, //任意の名前
  type : String, //計測項目
  place : String //計測場所
});

exports.getSchema = function() {
  return SensorSchema;
}

exports.getInfoSchema = function() {
  return SensorInfoSchema;
}

exports.getModel = function() {
  return mongoose.model('sensor', SensorSchema);
}

exports.getInfoModel = function() {
  return mongoose.model('sensorinfo', SensorInfoSchema);
}
