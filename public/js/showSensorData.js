$(function(){

  var label = $('#label').text();
  console.log(label);

  updateInfo();
  updateSensorData();


  function updateInfo(data) {
    $.get('/api/get/datainfo',{label:label})
    .done(function(data){
      $("#text-info-discription").text(data[0].discription);
      $("#output-info").append("<tr id='row-1' />");
      $("#output-info").append("<tr id='row-2' />");
      $("#output-info").append("<tr id='row-3' />");
      $("tr#row-1").append("<td>計測名</td>");
      $("tr#row-2").append("<td>計測項目</td>");
      $("tr#row-3").append("<td>計測場所</td>");
      for (var obj of data[0].item) {
        $("tr#row-1").append("<td>"+obj.name+"</td>");
        $("tr#row-2").append("<td>"+obj.type+"</td>");
        $("tr#row-3").append("<td>"+obj.place+"</td>");
      }

    })
    .fail(function(){
      console.log('failed');
    });
  }


  function updateSensorData() {
    $.get('/api/get/sensordata',{label:label})
    .done(function(data){
      updateGraph(data);
      updateTable(data);
    })
    .fail(function(){
      console.log('failed');
    });
  }


  function updateGraph(data) {
    var times = new Array();
    var values = new Array();
    var values2 = new Array();
    var values3 = new Array();
    var label = "no label"
    var loop_first = true;
    for (var i in data) {
      if (loop_first) {
        label = data[i].data[0].name;
        label2 = data[i].data[1].name;
        label3 = data[i].data[2].name;
        times.push(changeDateFormat(data[i].time));
        values.push(data[i].data[0].value);
        values2.push(data[i].data[1].value);
        values3.push(data[i].data[2].value);
        loop_first=false;
      }else if (label == data[i].data[0].name) {
        times.push(changeDateFormat(data[i].time));
        values.push(data[i].data[0].value);
        values2.push(data[i].data[1].value);
        values3.push(data[i].data[2].value);
      }
    }

    var ctx = $('#myChart')[0].getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: times,
        datasets: [{
          label: label,
          data: values,
          backgroundColor: "rgba(255,100,31,0.4)"
        },
        {
          label: label2,
          data: values2,
          backgroundColor: "rgba(153,255,51,0.4)"
        }]
      }
    });

    var ctx2 = $('#myChart2')[0].getContext('2d');
    var myChart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: times,
        datasets: [{
          label: label3,
          data: values3,
          backgroundColor: "rgba(111,151,255,0.4)"
        }]
      }
    });
  }


  function updateTable(data) {
    for (var i in data) {
      $("#output-table").append("<tr id='row"+i+"' />");
      $("tr#row"+i).append("<td rowspan='2'>"+changeDateFormat(data[i].time)+"</td>");
      for (var obj of data[i].data) {
        $("tr#row"+i).append("<td><a>"+obj.name+"</a></td>");
      }
      $("tr#row"+i).after("<tr id='row"+i+"-child' />");
      for (var obj of data[i].data) {
        $("tr#row"+i+"-child").append("<td>"+obj.value+"</td>");
      }
    }
  }


  function changeDateFormat(isodate) {
    var date = new Date(isodate)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    month = ('0' + month).slice(-2);
    day = ('0' + day).slice(-2);
    hour = ('0' + hour).slice(-2);
    min = ('0' + min).slice(-2);
    sec = ('0' + sec).slice(-2);

    return year+'/'+month+'/'+day+' '+hour+':'+min+':'+sec;
  }

});
