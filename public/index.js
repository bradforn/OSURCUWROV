


var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);

// Create h264 player
var uri = "ws://" + document.location.host;
var wsavc = new WSAvcPlayer(canvas, "webgl", 1, 35);

wsavc.connect(uri);

window.wsavc = wsavc;

console.log("wsavc exported to rest of program");


var updateInterval = 100; //ms

var hasGP = false;
var repGP;

const sticks = new Array(4); // L/LR, L/UD, R/LR, R/UD


function canGame() {
console.log("GGGGGGame");
  return "getGamepads" in navigator;
}

function reportOnGamepad() {
  var gp = navigator.getGamepads()[0];

  if (gp.buttons[0].pressed)
    wsavc.buttonA();
  if (gp.buttons[1].pressed)
    wsavc.buttonB();
  if (gp.buttons[2].pressed)
    wsavc.buttonX();
  if (gp.buttons[3].pressed)
    wsavc.buttonY();
  if (gp.buttons[4].pressed)
    wsavc.buttonLB();
  if (gp.buttons[5].pressed)
    wsavc.buttonRB();
  if (gp.buttons[6].pressed)
    wsavc.buttonLT();
  if (gp.buttons[7].pressed)
    wsavc.buttonRT();
  if (gp.buttons[8].pressed)
    wsavc.buttonBack();
  if (gp.buttons[9].pressed)
    wsavc.buttonStart();
  if (gp.buttons[10].pressed)
    wsavc.buttonLTH();
  if (gp.buttons[11].pressed)
    wsavc.buttonRTH();
  if (gp.buttons[12].pressed)
    wsavc.buttonDU();
  if (gp.buttons[13].pressed)
    wsavc.buttonDD();
  if (gp.buttons[14].pressed)
    wsavc.buttonDL();
  if (gp.buttons[15].pressed)
    wsavc.buttonDR();


  if (sticks[0] != gp.axes[0]) {
    sticks[0] = gp.axes[0];
    wsavc.stickLeftLR(gp.axes[0]);
  }
  if (sticks[1] != gp.axes[1]) {
    sticks[1] = gp.axes[1];
    wsavc.stickLeftUD(gp.axes[1]);
  }
  if (sticks[2] != gp.axes[2]) {
    sticks[2] = gp.axes[2];
    wsavc.stickRightLR(gp.axes[2]);
  }
  if (sticks[3] != gp.axes[3]) {
    sticks[3] = gp.axes[3];
    wsavc.stickRightUD(gp.axes[3]);
  }
}

//setup an interval for Chrome
var checkGP = window.setInterval(function() {
  console.log('checkGP');
  if (navigator.getGamepads()[0]) {
    console.log('if (navigator.getGamepads()[0]) == true');
    if (!hasGP) {
	console.log('	if (!hasGP) == true');
	$(window).trigger("gamepadconnected");
	console.log('	$(window).trigger("gamepadconnected");');
    }
    window.clearInterval(checkGP);
  }

}, updateInterval);




$(document).ready(function() {
  if (canGame()) {
    var prompt = "To begin using your gamepad, connect it and press any button!";
    $("#gamepadPrompt").text(prompt);
    $(window).on("gamepadconnected", function() {
      hasGP = true;
      $("#gamepadPrompt").html("Gamepad connected!");
      console.log("connection event");
      repGP = window.setInterval(reportOnGamepad, updateInterval);
    });
    $(window).on("gamepaddisconnected", function() {
      console.log("disconnection event");
      $("#gamepadPrompt").text(prompt);
      window.clearInterval(repGP);
    });

  }

});
