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
      video.play().catch((error) => console.log("Autoplay blocked:", error));
    }
  });
});

//Full Screen
document.addEventListener("DOMContentLoaded", function () {
  let isFullScreen = false;
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  window.enterFullScreen = function () {
    if (isFullScreen) return;

    if (isIOS) {
      function hideSafariUI() {
        setTimeout(function () {
          window.scrollTo(0, 1);
        }, 100);
      }

      window.addEventListener("load", hideSafariUI);
      window.addEventListener("orientationchange", hideSafariUI);
      window.addEventListener("touchstart", hideSafariUI);
    } else {
      const elem = document.documentElement;

      if (elem.requestFullscreen) {
        elem.requestFullscreen().then(() => {
          isFullScreen = true; // ✅ Only set when fullscreen is successful
        }).catch((err) => console.error("Fullscreen failed:", err));
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
        isFullScreen = true;
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
        isFullScreen = true;
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
        isFullScreen = true;
      }
    }
  };

  window.exitFullScreen = function () {
    if (!isFullScreen) return;

    if (isIOS) {
      document.body.classList.remove("ios-fullscreen");
      document.documentElement.classList.remove("ios-fullscreen");
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          isFullScreen = false; // ✅ Reset only after exit
        }).catch((err) => console.error("Exit fullscreen failed:", err));
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        isFullScreen = false;
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        isFullScreen = false;
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        isFullScreen = false;
      }
    }
  };

  // iOS-specific fixes
  if (isIOS) {
    const video = document.getElementById("bgVideo");
    if (video) {
      video.setAttribute("playsinline", "true");
      video.setAttribute("webkit-playsinline", "true");
    }
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
