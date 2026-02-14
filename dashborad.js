// =======================
// QR ATTENDANCE LOGIC
// =======================

let attendanceTimer;
let expiryTime;

// START ATTENDANCE
function startAttendance(){

closeAttendance();

const qrWrapper = document.getElementById("qrWrapper");
const qrDiv = document.getElementById("qrcode");

qrDiv.innerHTML="";
qrWrapper.style.display="block";

// create session id
const sessionId = "SESSION_"+Date.now();

// expiry = 2 minutes
expiryTime = Date.now() + 120000;

// save session locally (simulate server)
localStorage.setItem("activeSession",sessionId);
localStorage.setItem("sessionExpiry",expiryTime);

// IMPORTANT → CHANGE IP TO YOUR COMPUTER IP
const qrURL = `http://10.87.15.137:5500/scan.html?session=${sessionId}`;
new QRCode(qrDiv,{
text:qrURL,
width:220,
height:220
});

startTimer();
}

// TIMER
function startTimer(){
attendanceTimer = setInterval(()=>{

let timeLeft = expiryTime - Date.now();

if(timeLeft<=0){
closeAttendance();
return;
}

let sec = Math.floor(timeLeft/1000);
let m = Math.floor(sec/60);
let s = sec%60;

document.getElementById("timerText").innerText =
`Expires in ${m}:${s.toString().padStart(2,"0")}`;

},1000);
}

// CLOSE SESSION
function closeAttendance(){

clearInterval(attendanceTimer);

document.getElementById("qrWrapper").style.display="none";
document.getElementById("qrcode").innerHTML="";
document.getElementById("timerText").innerText="";

localStorage.removeItem("activeSession");
localStorage.removeItem("sessionExpiry");
}