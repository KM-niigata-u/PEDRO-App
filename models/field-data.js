var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FieldData = new Schema({
    Time : { type: String, require: true, unique: true },
    Temperature : { type: String },
    Humidity : { type: String },
    Precipitation : { type: String },
    VWC_1 : { type: String },
    pF_1 : { type: String },
    SoilTemperature_1 : { type: String },
    VWC_2 : { type: String },
    pF_2 : { type: String },
    SoilTemperature_2 : { type: String },
    VWC_3 : { type: String },
    pF_3 : { type: String },
    SoilTemperature_3 : { type: String },
    VWC_4 : { type: String },
    pF_4 : { type: String },
    SoilTemperature_4 : { type: String }
});

module.exports = mongoose.model('field-data', FieldData);
