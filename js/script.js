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

// Universal fullscreen solution that works with your existing exit button
document.addEventListener("DOMContentLoaded", function() {
  // Track fullscreen state
  let isFullScreen = false;
  
  // Detect iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  // Function to enter fullscreen
  window.enterFullScreen = function() {
    // If already in fullscreen, do nothing
    if (isFullScreen) return;
    
    const elem = document.documentElement;
    
    if (!document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.mozFullScreenElement &&
        !document.msFullscreenElement) {
      
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
    }
  };
  
  // Function to exit fullscreen - making this a global function
  // so it can be called from your button's onclick handler
  window.exitFullScreen = function() {
    // If not in fullscreen, do nothing
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
  
  // Add click handler to the document for entering fullscreen
  document.addEventListener('click', function(event) {
    // Don't trigger on clicks to buttons
    if (event.target.tagName === 'BUTTON') {
      return;
    }
    
    // Only trigger fullscreen on click when not already in fullscreen
    if (!isFullScreen) {
      window.enterFullScreen();
    }
  });
  
  // Listen for fullscreen change events to track state correctly
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
  
  // Special handling for iOS
  if (isIOS) {
    // Create a small notification for iOS users
    const iosNote = document.createElement('div');
    iosNote.style.position = 'fixed';
    iosNote.style.bottom = '10px';
    iosNote.style.left = '10px';
    iosNote.style.padding = '8px';
    iosNote.style.backgroundColor = 'rgba(0,0,0,0.7)';
    iosNote.style.color = 'white';
    iosNote.style.borderRadius = '5px';
    iosNote.style.fontSize = '12px';
    iosNote.style.zIndex = '9999';
    iosNote.innerHTML = 'iOS has limited fullscreen support. For best experience, add to home screen.';
    iosNote.style.display = 'none'; 
    document.body.appendChild(iosNote);
    
    // Show the note briefly when attempting fullscreen on iOS
    window.enterFullScreen = function() {
      iosNote.style.display = 'block';
      setTimeout(function() {
        iosNote.style.display = 'none';
      }, 5000); 
    };
    
    window.exitFullScreen = function() {
      // Just hide the notification on iOS
      iosNote.style.display = 'none';
    };
  }
}); 

// Orientation check
function checkOrientation() {
  if (screen.orientation.type.startsWith("portrait")) {
    alert(
      "Please rotate your device to landscape mode for the best experience."
    );
  }
}

checkOrientation();
screen.orientation.addEventListener("change", checkOrientation);
