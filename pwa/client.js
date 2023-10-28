
//Gets the Device Name
function getDeviceName() {
        const params = new URLSearchParams(window.location.search);
        const serialNumber = params.get('roomname')
        var serialResult;
        serialNumber === null ? serialResult = 'peripheralSerial not set' : serialResult = serialNumber
        document.getElementById('roomName').innerHTML = serialResult;
}

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


//setInterval(refreshTime, 1000);
//getDeviceName();

async function init() {
        try {
                //xapi = await getXAPI();
                //xapistatus.textContent = "jsxapi available";
                //myState.textContent = "Occupied";
                //unique_id = createPersistentCookie();
                //content.textContent = "Navigator ID: " + unique_id;
                //setupSubscriptions();
                //getCurrent();
                //updateSerial();
          refreshTime()
          getDeviceName();
        } catch(e) {
                content.textContent = e.message;
                //xapistatus.textContent = "error getting jsxapi object";
        }
}
 
window.onload = async function() {
        init();         
}; 
