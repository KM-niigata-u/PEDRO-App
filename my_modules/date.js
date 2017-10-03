exports.getToday = function() {
  var date = new Date();
  var year = date.getFullYear();
  var month = addZero(date.getMonth()+1);
  var day = addZero(date.getDate());
  return year+'-'+month+'-'+day;
}

addZero = function(num) {
  if (num < 10) {
    num = '0' + num;
  }
  return '' + num;
}
