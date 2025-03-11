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
// Combined solution for all platforms including iOS
document.addEventListener("DOMContentLoaded", function() {
  // Store a variable to track if we're in fullscreen mode
  let isFullScreen = false;
  
  // Check if device is iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  // For iOS, add meta tags programmatically if they don't exist
  if (isIOS) {
    // Add apple-mobile-web-app-capable meta tag if it doesn't exist
    if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
      const metaCapable = document.createElement('meta');
      metaCapable.name = 'apple-mobile-web-app-capable';
      metaCapable.content = 'yes';
      document.head.appendChild(metaCapable);
    }
    
    // Add apple-mobile-web-app-status-bar-style meta tag if it doesn't exist
    if (!document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')) {
      const metaStatus = document.createElement('meta');
      metaStatus.name = 'apple-mobile-web-app-status-bar-style';
      metaStatus.content = 'black-translucent';
      document.head.appendChild(metaStatus);
    }
    
    // Check if running in standalone mode (added to home screen)
    const isInStandaloneMode = window.navigator.standalone;
    
    // If not in standalone mode, show a banner with instructions
    if (!isInStandaloneMode) {
      // Create a banner to instruct iOS users on how to get fullscreen
      const banner = document.createElement('div');
      banner.style.position = 'fixed';
      banner.style.bottom = '0';
      banner.style.left = '0';
      banner.style.width = '100%';
      banner.style.padding = '10px';
      banner.style.backgroundColor = 'rgba(0,0,0,0.8)';
      banner.style.color = 'white';
      banner.style.zIndex = '9999';
      banner.style.textAlign = 'center';
      banner.style.fontSize = '14px';
      banner.innerHTML = `
        <p>For fullscreen on iOS, add this page to your home screen:</p>
        <p>Tap share icon → "Add to Home Screen" → Open from home screen</p>
        <button id="close-banner" style="padding:5px;margin-top:5px;background:#fff;color:#000;border:none;border-radius:5px;">Dismiss</button>
      `;
      document.body.appendChild(banner);
      
      // Add click event to close the banner
      document.getElementById('close-banner').addEventListener('click', function() {
        banner.style.display = 'none';
      });
    }
  }
  
  // Function to enter fullscreen (for non-iOS)
  function enterFullScreen() {
    if (isIOS) return; // Skip for iOS
    
    let elem = document.documentElement;
    
    if (!document.fullscreenElement && 
        !document.webkitFullscreenElement && 
        !document.mozFullScreenElement &&
        !document.msFullscreenElement) {
      
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
  
  // Function to exit fullscreen (for non-iOS)
  function exitFullScreen() {
    if (isIOS) return; // Skip for iOS
    
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
    // Skip if already in fullscreen or if it's iOS
    if (isFullScreen || isIOS) return;
    
    // Enter fullscreen on click
    enterFullScreen();
  });
  
  // Special handler for buttons with onclick attribute
  document.addEventListener("click", function(event) {
    // Skip if not in fullscreen or if it's iOS
    if (!isFullScreen || isIOS) return;
    
    // Check if the clicked element is a button
    if (event.target.tagName === "BUTTON") {
      // Exit fullscreen if it's a button with onclick
      if (event.target.hasAttribute("onclick")) {
        exitFullScreen();
      }
    }
  });
  
  // Listen for fullscreen change events (for non-iOS)
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
