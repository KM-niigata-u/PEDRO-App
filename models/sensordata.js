var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sb = require('./sensorbase.js');
var SensorSchema = sb.getSchema();

var SensorDataSchema = new Schema({
    //info_id : String,
    label : String,
    time : Date,
    data : [SensorSchema]
});

module.exports = mongoose.model('sensordata', SensorDataSchema);
