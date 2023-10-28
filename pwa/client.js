
function refreshTime() {
  const timeDisplay = document.getElementById("time");
  const myDate = new Date();
  var myHour = myDate.getHours();
  var myMinute = myDate.getMinutes();
  var mySecond = myDate.getSeconds();
  var ampm = myHour >= 12 ? 'pm' : 'am';
  myHour = myHour % 12;
  myHour = myHour ? myHour : 12; // the hour '0' should be '12'
  myMinute = myMinute < 10 ? '0'+myMinute : myMinute;
  mySecond = mySecond < 10 ? '0'+mySecond : mySecond;
  var strTime = myHour + ':' + myMinute + ':' + mySecond + ' ' + ampm;

  timeDisplay.textContent = strTime;
}


setInterval(refreshTime, 1000);
