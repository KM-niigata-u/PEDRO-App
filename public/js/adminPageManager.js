$(function(){

  updateInfo();

  function updateInfo(data) {
    $.get('/api/get/datainfo')
    .done(function(data){
      for (var i in data) {
        $("#datalist-field").append("<table id='table"+i+"' border=1 />")
        $("table#table"+i).append("<tr id='row1-"+i+"' />");
        $("tr#row1-"+i).append("<td rowspan='2'><a href='/data/"+data[i].label+"'>"+data[i].label+"</a></td>");
        $("tr#row1-"+i).append("<td><a href='/admin/delete/"+data[i].label+"'>削除</a></td>");
        $("table#table"+i).append("<tr id='row2-"+i+"' />");
        $("tr#row2-"+i).append("<td><a href='/admin/add/"+data[i].label+"'>データの追加</a></td>");
      }
    })
    .fail(function(){
      console.log('failed');
    });
  }

});
