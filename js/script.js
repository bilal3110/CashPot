document.addEventListener("DOMContentLoaded", function () {
  // Spin wheel animation
  const spinWheel = document.querySelector(".spin-wheel");
  let isSpinning = false;

  spinWheel.addEventListener("click", function () {
    if (isSpinning) return;

    isSpinning = true;
    const wheel = document.querySelector(".wheel-sections");
    const randomDegrees = 1080 + Math.floor(Math.random() * 360); 

    wheel.style.transition =
      "transform 3s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
    wheel.style.transform = `rotate(${randomDegrees}deg)`;
  });

  // Audio control
  const audioControl = document.querySelector(".audio-control");
  let isMuted = false;

  audioControl.addEventListener("click", function () {
    isMuted = !isMuted;
    this.querySelector("svg").style.opacity = isMuted ? 0.5 : 1;
  });
});


//Full Screen
// Store a variable to track if we're in fullscreen mode
let isFullScreen = false;

// Check if device is iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Function to enter fullscreen
function enterFullScreen() {
  // For non-iOS devices, use standard fullscreen API
  let elem = document.documentElement;
  
  if (!document.fullscreenElement && 
      !document.webkitFullscreenElement && 
      !document.mozFullScreenElement &&
      !document.msFullscreenElement) {
    
    isFullScreen = true;
    
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen(); // Firefox
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(); // Safari, Chrome, Opera
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen(); // IE/Edge
    }
  }
}

// Function to exit fullscreen
function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  
  isFullScreen = false;
}

// Document click handler for entering fullscreen
document.addEventListener("click", function(event) {
  // If not in fullscreen mode, any click will enter fullscreen
  if (!isFullScreen) {
    enterFullScreen();
  }
});

// Special event handler specifically for buttons with onclick
document.addEventListener("click", function(event) {
  // Check if we're in fullscreen mode
  if (isFullScreen) {
    // Use event.target instead of closest to get exactly what was clicked
    let clickedElement = event.target;
    
    // Check if the clicked element is a button
    if (clickedElement.tagName === "BUTTON") {
      // Debug logging
      console.log("Button clicked while in fullscreen mode");
      console.log("Has onclick attribute:", clickedElement.hasAttribute("onclick"));
      
      // Exit fullscreen if it's a button with onclick
      if (clickedElement.hasAttribute("onclick")) {
        console.log("Attempting to exit fullscreen");
        exitFullScreen();
      }
    }
  }
});

// Listen for fullscreen change events to update our tracking variable
document.addEventListener("fullscreenchange", function() {
  console.log("Fullscreen change detected");
  isFullScreen = !!document.fullscreenElement;
  console.log("Is fullscreen now:", isFullScreen);
});
document.addEventListener("webkitfullscreenchange", function() {
  isFullScreen = !!document.webkitFullscreenElement;
});
document.addEventListener("mozfullscreenchange", function() {
  isFullScreen = !!document.mozFullScreenElement;
});
document.addEventListener("MSFullscreenChange", function() {
  isFullScreen = !!document.msFullscreenElement;
});

function checkOrientation() {
  if (screen.orientation.type.startsWith("portrait")) {
    alert(
      "Please rotate your device to landscape mode for the best experience."
    );
  }
}

checkOrientation();
screen.orientation.addEventListener("change", checkOrientation);
