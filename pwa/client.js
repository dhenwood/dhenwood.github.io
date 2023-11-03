//Gets the Device Name
function getDeviceName() {
        const params = new URLSearchParams(window.location.search);
        const serialNumber = params.get('roomname')
        var serialResult;
        serialNumber === null ? serialResult = 'Display name not set' : serialResult = serialNumber
        document.getElementById('roomName').textContent = serialResult;
}

function refreshTime() {
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

  document.getElementById('time').textContent = strTime;
}



async function init() {
        try {
                xapi = await getXAPI();
                document.getElementById('xapistatus').textContent = "jsxapi available";
                setupSubscriptions();
                getCurrent();
                setInterval(refreshTime, 1000);
                getDeviceName();
        } catch(e) {
                document.getElementById('xapistatus').textContent = 'Error: ' + e.message;
        }
}
 
window.onload = async function() {
        init();         
}; 


//Gets the current xStatus of LedControl Color and displays on the page.
function getCurrent() {
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
                        document.getElementById('roomName').style.height ='130px';
                        document.getElementById('roomOccupied').style.height ='130px';
                        document.getElementById('id1').style.backgroundColor = color;
                        document.getElementById('id2').style.backgroundColor = color;
                        if(color == 'Green'){
                                document.getElementById('roomOccupied').innerHTML = "Room is available";
                        }else if(color == 'Yellow'){
                                document.getElementById('roomOccupied').innerHTML = "Room is booked";
                                document.getElementById('id1').style.backgroundColor = "Orange"; // Yellow does not display well
                                document.getElementById('id2').style.backgroundColor = "Orange"; // Yellow does not display well
                        }else{
                                document.getElementById('roomOccupied').innerHTML = "Room is occupied";
                        }
                         break;
                case 'Off':
                        document.getElementById('roomOccupied').innerHTML = "Room is occupied";
                        document.getElementById('id1').style.backgroundColor = 'red';
                        document.getElementById('id2').style.backgroundColor = 'red';
                        break;
                default:
                        console.log("Unexpected color")
                        document.getElementById('roomOccupied').innerHTML = "An Error has occured";
                        document.getElementById('id1').style.backgroundColor = 'grey';
                        document.getElementById('id2').style.backgroundColor = 'grey';
        }
}


//Gets the current xStatus of LedControl Color and displays on the page.
function setupSubscriptions() {
        //Example xapi xStatus
        xapi.Status.UserInterface.LedControl.Color.on(color => {
                setLedColor(color)
        });
}
