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


let isFullScreen = false;

function enterFullScreen() {
  let elem = document.documentElement;

  if (
    !document.fullscreenElement &&
    !document.webkitFullscreenElement &&
    !document.mozFullScreenElement &&
    !document.msFullscreenElement
  ) {
    isFullScreen = true;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen(); 
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(); 
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen(); 
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

document.addEventListener("click", function (event) {
  if (!isFullScreen) {
    enterFullScreen();
  } else {
    exitFullScreen();
  }
});

document.addEventListener("fullscreenchange", function () {
  isFullScreen = !!document.fullscreenElement;
});
document.addEventListener("webkitfullscreenchange", function () {
  isFullScreen = !!document.webkitFullscreenElement;
});
document.addEventListener("mozfullscreenchange", function () {
  isFullScreen = !!document.mozFullScreenElement;
});
document.addEventListener("MSFullscreenChange", function () {
  isFullScreen = !!document.msFullscreenElement;
});

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
}
function checkOrientation() {
  if (screen.orientation.type.startsWith("portrait")) {
    alert(
      "Please rotate your device to landscape mode for the best experience."
    );
  }
}

checkOrientation();
screen.orientation.addEventListener("change", checkOrientation);
