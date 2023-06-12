const puppeteer = require('puppeteer');
require('jest-localstorage-mock');


describe('Basic user flow for Website', () => {
  let browser;
  let page;

  // First, visit our website
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('https://cse110-sp23-group26.github.io/BugCatchers/');
    // localStorage.removeItem('LastCheckInTime');
    // localStorage.removeItem('CheckInCount');
  });

  afterAll(async () => {
    await browser.close();
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

  // Next, check the fortune card list to make sure there are no card there
  it('should have 0 Fortune Cards initially', async () => {
    // open the menu
    let menuElement = await page.$('#menu');
    await menuElement.click();
    
    const numCards = await page.$$eval('fortune-card', (prodItems) => {
      return prodItems.length;
    });
    await menuElement.click();
    expect(numCards).toBe(0);
  });

  // // test to get a user input and make a fortune card, then check the length of the card list
  // it('should input user data and get response', async () => {
  //   // 等待箭头元素加载完成
  //   let arrowElement = await page.$('.arrow');
  
  //   // 模拟点击箭头
  //   await arrowElement.click();
  
  //   // 等待输入框元素加载完成
  //   await page.waitForSelector('#dataInput');
  
  //   // 输入 UserBirthDay
  //   await page.type('#dataInput', '09');
  //   await page.keyboard.press('Enter');
  
  //   // 输入 UserBirthMonth
  //   await page.type('#dataInput', '09');
  //   await page.keyboard.press('Enter');
  
  //   // 输入 UserBirthYear
  //   await page.type('#dataInput', '2000');
  //   await page.keyboard.press('Enter');
  
  //   // 输入 UserMood
  //   await page.type('#dataInput', 'test');
  //   await page.keyboard.press('Enter');
  
  //   // 等待箭头元素加载完成
  //   await page.waitForSelector('.arrow');
    
  //   arrowElement = await page.$('.arrow');
  //   // 模拟点击箭头
  //   await arrowElement.click();
  
  //   // 等待一段时间，以确保结果显示在页面上
  //   await page.waitForTimeout(2000);

  //   // open the menu
  //   let menuElement = await page.$('#menu');
  //   await menuElement.click();

  //   const numCards = await page.$$eval('fortune-card', (prodItems) => {
  //     return prodItems.length;
  //   });
  //   expect(numCards).toBe(1);
  // });

  // add a test to delete the card and see the length of the fortune card list
});
