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

document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".bg-vid");

  // Ensure video plays after user interaction
  document.addEventListener("click", function () {
    if (video.paused) {
      video.play().catch(error => console.log("Autoplay blocked:", error));
    }
  });
});


//Full Screen
document.addEventListener("DOMContentLoaded", function () {
  let isFullScreen = false;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Function to enter fullscreen
  window.enterFullScreen = function () {
    if (isFullScreen) return;
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    isFullScreen = true;
  };

  // Function to exit fullscreen
  window.exitFullScreen = function () {
    if (!isFullScreen) return;
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
  };

  // Enable fullscreen on any touch/click
  document.addEventListener("click", function () {
    if (!isFullScreen) {
      window.enterFullScreen();
    }
  });

  // Track fullscreen state
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

  // Special handling for iOS to prevent fullscreen video
  if (isIOS) {
    const video = document.querySelector(".bg-vid");
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
  }
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
