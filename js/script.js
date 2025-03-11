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
  // If it's iOS, we need to use a different approach
  if (isIOS) {
    // Using the viewport meta tag approach for iOS
    const metaViewport = document.querySelector('meta[name=viewport]');
    if (!metaViewport) {
      // If there's no viewport meta tag, create one
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.getElementsByTagName('head')[0].appendChild(meta);
    } else {
      // Modify existing viewport meta tag
      metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }
    
    // Force to landscape if device supports it
    if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
      window.screen.orientation.lock('landscape').catch(function() {
        // Ignore if it fails
      });
    }
    
    // Hide any browser UI elements
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    }
    
    // Scroll to top and prevent scrolling
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    
    isFullScreen = true;
    return;
  }
  
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
  // If it's iOS, revert our workaround
  if (isIOS) {
    // Restore viewport settings
    const metaViewport = document.querySelector('meta[name=viewport]');
    if (metaViewport) {
      metaViewport.content = 'width=device-width, initial-scale=1.0';
    }
    
    // Restore scrolling
    document.body.style.overflow = '';
    
    // Try to exit fullscreen API (even though it's limited on iOS)
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    
    isFullScreen = false;
    return;
  }
  
  // For non-iOS devices, use standard fullscreen API
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

// Wait for the page to fully load before adding event listeners
window.addEventListener('load', function() {
  // Document click handler for entering/exiting fullscreen
  document.addEventListener("click", function(event) {
    // If not in fullscreen mode, any click will enter fullscreen
    if (!isFullScreen) {
      enterFullScreen();
    }
    // If in fullscreen, check if clicked on a button with onclick attribute
    else if (isFullScreen) {
      // Check if the clicked element is a button with an onclick attribute
      let clickedElement = event.target.closest("button");
      if (clickedElement && clickedElement.hasAttribute("onclick")) {
        exitFullScreen();
      }
    }
  });
  
  // Listen for fullscreen change events to update our tracking variable (for non-iOS)
  if (!isIOS) {
    document.addEventListener("fullscreenchange", function() {
      isFullScreen = !!document.fullscreenElement;
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
