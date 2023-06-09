// Go to our web page
// and take a screenshot save as BugCatcherWeb.png

const puppeteer = require('puppeteer');
describe('End-to-end test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should navigate to our web and take a screenshot', async () => {
    await page.goto('http://127.0.0.1:5500/src/index.html');
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Bug Catchers');
    
    const pageUrl = await page.url();
    expect(pageUrl).toBe('http://127.0.0.1:5500/src/index.html');
    
    await page.screenshot({ path: 'BugCatcherWeb.png' });
  });
});
