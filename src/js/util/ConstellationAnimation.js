// Given a constellation parameter.
// Constellation images slowly appear in the center of the webpage, and at the same time, the background gradually dims (up to 50%)
// After the picture fully emerges, it slowly disappears. Web page backgrounds are slowly coming back.

// In the end, the webpage is fully restored. The whole process lasts about 3-5 seconds.

function showConstellationImage(constellation) {
    
    // add the image
    const imageSrc = `assets/constellation/big/white/${constellation}.png`;
    const image = new Image();
    image.src = imageSrc;
    image.style.position = "fixed";
    image.style.top = "40%";
    image.style.left = "50%";
    image.style.transform = "translate(-50%, -50%)";
    image.style.opacity = "0";
    image.style.transition = "opacity 2s ease-in-out";
    
    // add the overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 2s ease-in-out";
    

    document.body.appendChild(overlay);
    document.body.appendChild(image);
  
    setTimeout(() => {
      overlay.style.opacity = "0.5";
      image.style.opacity = "1";
    }, 0);
  
    const totalDuration = 5000; // 整个过程的持续时间（毫秒）
    const startFadeOutTime = totalDuration - 2000; // 图片淡出开始的时间（毫秒）
  
    setTimeout(() => {
      image.style.opacity = "0";
      overlay.style.opacity = "0";
    }, startFadeOutTime);
  
    // remove the img and overlay
    setTimeout(() => {
      overlay.remove();
      image.remove();
    }, totalDuration);
  }