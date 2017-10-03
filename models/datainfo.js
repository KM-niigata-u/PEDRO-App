var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sb = require('./sensorbase.js');
var SensorInfoSchema = sb.getInfoSchema();

var DataInfoSchema = new Schema({
    label : String,
    discription : String,
    item : [SensorInfoSchema]
});

module.exports = mongoose.model('datainfo', DataInfoSchema);
