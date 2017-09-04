var mongoose = require('mongoose');
var csv = require('csv');
var fs = require('fs');

var FieldData = require('./models/field-data')

var filename = "./ped/field_2017.csv";
var parse = csv.parse({columns: true});
var readableStream = fs.createReadStream(filename, {encoding: 'utf-8'});

console.log("Update database 'pedrodb'...");

function saveDB(data){
  console.log("do save");
  FieldData.find({ "Time" : data["Time"] }, function(err, result){
    if (err){
      console.log(err);
    }

    console.log(result.length);

    if (result.length == 0) {
        console.log("insert");
        var fieldData = new FieldData();

        fieldData.Time = data["Time"];
        fieldData.Temperature = data["Temperature"];
        fieldData.Humidity = data["Humidity"];
        fieldData.Precipitation = data["Precipitation"];
        fieldData.VWC_1 = data["VWC_1"];
        fieldData.pF_1 = data["pF_1"];
        fieldData.SoilTemperature_1 = data["SoilTemperature_1"];
        fieldData.VWC_2 = data["VWC_2"];
        fieldData.pF_2 = data["pF_2"];
        fieldData.SoilTemperature_2 = data["SoilTemperature_2"];
        fieldData.VWC_3 = data["VWC_3"];
        fieldData.pF_3 = data["pF_3"];
        fieldData.SoilTemperature_3= data["SoilTemperature_3"];
        fieldData.VWC_4 = data["VWC_4"];
        fieldData.pF_4 = data["pF_4"];
        fieldData.SoilTemperature_4 = data["SoilTemperature_4"];

        fieldData.save(function(err){
          if (err) { console.log(err); }
        });
    }
  });
}

readableStream.pipe(parse);

parse.on('readable', () => {
  var tmp;
  while(tmp = parse.read()) {
    saveDB(tmp);
  }
});

parse.on('end', () => {
  console.log("end");
});
