const puppeteer = require('puppeteer');

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