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

  window.enterFullScreen = function () {
    if (isFullScreen) return;

    if (isIOS) {
      // iOS workaround: Fake fullscreen by forcing elements to take full screen
      document.body.classList.add("ios-fullscreen");
      document.documentElement.classList.add("ios-fullscreen");
    } else {
      // Regular fullscreen for other browsers
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
    }

    isFullScreen = true;
  };

  window.exitFullScreen = function () {
    if (!isFullScreen) return;

    if (isIOS) {
      // Remove fake fullscreen styling
      document.body.classList.remove("ios-fullscreen");
      document.documentElement.classList.remove("ios-fullscreen");
    } else {
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

    isFullScreen = false;
  };

  // iOS-specific fixes
  if (isIOS) {
    const video = document.getElementById("bgVideo");
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
