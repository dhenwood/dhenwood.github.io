//Gets the Device Name
function getDeviceName() {
        const params = new URLSearchParams(window.location.search);
        const serialNumber = params.get('roomname')
        var serialResult;
        serialNumber === null ? serialResult = 'Display name not set' : serialResult = serialNumber
        document.getElementById('roomName').textContent = serialResult;
}

function refreshTime() {
  //const timeDisplay = document.getElementById("time");
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



async function init() {
        try {
                //xapi = await getXAPI();
                //const xapistatus = document.getElementById('xapistatus');
                document.getElementById('xapistatus').textContent = "jsxapi available";
                //xapistatus.textContent = "jsxapi available";
                //myState.textContent = "Occupied";
                //unique_id = createPersistentCookie();
                //content.textContent = "Navigator ID: " + unique_id;
                setupSubscriptions();
                getCurrent();
                //updateSerial();
          //refreshTime()
          setInterval(refreshTime, 1000);
          getDeviceName();
        } catch(e) {
                //content.textContent = e.message;
                //const xapistatus = document.getElementById('xapistatus');
                //xapistatus.textContent = "error getting jsxapi object";
                document.getElementById('xapistatus').textContent = 'Error: ' + e.message;
        }
}
 
window.onload = async function() {
        init();         
}; 

const timeDisplay = document.getElementById("time");
const xapistatus = document.getElementById('xapistatus');

//Gets the current xStatus of LedControl Color and displays on the page.
function getCurrent() {
        //Example xapi xStatus
        xapi.Status.UserInterface.LedControl.Color.get().then((color) => {
                setLedColor(color)
    })     
    .catch(function(error) {
                console.log(error);
    });
}

function setLedColor(color) {
        console.log("COLOR: " + color)
        switch(color) {
                case 'Green':
                case 'Yellow':
                case 'Red':
                case 'Blue':
                case 'Purple':
                case 'Orange':
                         //document.getElementById('roomName').innerHTML = color;
                        document.getElementById('roomName').style.height ='130px';
                        document.getElementById('roomName').style.backgroundColor = color;
                        document.getElementById('roomOccupied').style.height ='130px';
                        document.getElementById('roomOccupied').style.backgroundColor = color;
                        if(color == 'Green'){
                                document.getElementById('roomOccupied').innerHTML = 'Room is free';
                        }else{
                                document.getElementById('roomOccupied').innerHTML = 'Room Occupied';
                        }
                         break;
                case 'Off':
                        document.getElementById('ledRect').style.fill = 'black';
                        break;
                default:
                        console.log("Unexpected color")
                        document.getElementById('ledRect').style.fill = 'grey';
        }
}


//Gets the current xStatus of LedControl Color and displays on the page.
function setupSubscriptions() {
        //Example xapi xStatus
        xapi.Status.UserInterface.LedControl.Color.on(color => {
                setLedColor(color)
        });
}
