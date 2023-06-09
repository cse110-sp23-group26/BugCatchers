const puppeteer = require('puppeteer');

describe('Basic user flow for Website', () => {
  let browser;
  let page;

  // First, visit our website
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/src/index.html');
  });

  afterAll(async () => {
    await browser.close();
  });

  // Next, check the fortune card list to make sure there are no card there
  it('should have 0 Fortune Cards initially', async () => {
    await page.waitForSelector('.fortuneCardList');
    const numCards = await page.$$eval('.fortuneCardList fortune-card', (cards) => cards.length);
    expect(numCards).toBe(0);
  });

  // Check-in system initial
  it('should display "None" and "0" for check-in before clicking', async () => {
    await page.waitForSelector('#last-check-in-date');
    await page.waitForSelector('#check-in-count');
    
    const lastCheckInDate = await page.$eval('#last-check-in-date', (element) => element.textContent);
    const checkInCount = await page.$eval('#check-in-count', (element) => element.textContent);
    
    expect(lastCheckInDate.trim()).toBe('Last Check-In: None');
    expect(checkInCount.trim()).toBe('Count: 0');
  });

  it('should display today\'s date and 1 after clicking check-in', async () => {
    await page.waitForSelector('#check-in-button');
    
    // Get the date before the check
    const beforeDate = await page.$eval('#last-check-in-date', (element) => element.textContent);
    const beforeCount = await page.$eval('#check-in-count', (element) => element.textContent);
    
    // click check-in button
    await page.click('#check-in-button');
    
    // wait for update
    await page.waitForTimeout(2000);
    
    // get the date and count after click
    const afterDate = await page.$eval('#last-check-in-date', (element) => element.textContent);
    const afterCount = await page.$eval('#check-in-count', (element) => element.textContent);
    
    // check if it is correct
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    expect(beforeDate.trim()).toBe('Last Check-In: None');
    expect(beforeCount.trim()).toBe('Count: 0');
    expect(afterDate.trim()).toBe(`Last Check-In: ${formattedDate}`);
    expect(afterCount.trim()).toBe('Count: 1');
  });

});
