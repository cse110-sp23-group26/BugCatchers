const puppeteer = require('puppeteer');
// const showConstellationImage = require("../src/js/util/constellationAnimation.js");

describe('Animation for showConstellationImage', () => {
  let browser;
  let page;
  jest.setTimeout(10000); // 设置全局超时时间为 10 秒
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: 'new' });
    page = await browser.newPage();
    await page.goto('https://cse110-sp23-group26.github.io/BugCatchers/');
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should perform the animation correctly', async () => {
    await page.evaluate(() => {
      showConstellationImage('leo');
    });

    // Wait for the animation to complete
    await page.waitForTimeout(5000); // Adjust the duration here (in milliseconds)

    // Check if the animation is completed correctly
    const imageOpacity = await page.$eval('img', (element) => parseFloat(element.style.opacity));
    const overlayOpacity = await page.$eval('div', (element) => parseFloat(element.style.opacity));

    // This is NaN because at the constellationAnimation.js, we finally removed the animation image
    expect(imageOpacity).toBe(NaN);
    expect(overlayOpacity).toBe(NaN);
  });
});

function showConstellationImage(constellation) {
	// add the image
	const image = document.createElement("img");
	image.src = `assets/constellation/big/white/${constellation}.png`;
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

	const totalDuration = 5000; // 整个过程的持续时间（毫秒）- Duration of the entire process (milliseconds)
	const startFadeOutTime = totalDuration - 2000; // 图片淡出开始的时间（毫秒）- The time at which the image fade starts (in milliseconds)

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
