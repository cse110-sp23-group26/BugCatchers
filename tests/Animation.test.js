const puppeteer = require('puppeteer');
const { showConstellationImage } = require('../src/js/util/constellationAnimation.js');

test("Constellation image should appear and disappear correctly", async () => {
	// Setup puppeteer
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://cse110-sp23-group26.github.io/BugCatchers/'); // Replace with your local server address

	// Define a handler function to be evaluated within the page context
	const handleTest = (constellation) => new Promise((resolve) => {
		showConstellationImage(constellation);
		
		// Check the initial state
		let image = document.querySelector('img');
		let overlay = document.querySelector('div');
		expect(image).toBeTruthy();
		expect(overlay).toBeTruthy();
		expect(image.style.opacity).toBe('0');
		expect(overlay.style.opacity).toBe('0');

		setTimeout(() => {
			// Check the state after the first timeout
			image = document.querySelector('img');
			overlay = document.querySelector('div');
			expect(image.style.opacity).toBe('1');
			expect(overlay.style.opacity).toBe('0.5');
		}, 0);

		setTimeout(() => {
			// Check the state after the second timeout
			image = document.querySelector('img');
			overlay = document.querySelector('div');
			expect(image.style.opacity).toBe('0');
			expect(overlay.style.opacity).toBe('0');
		}, 3000);

		setTimeout(() => {
			// Check the state after the third timeout
			image = document.querySelector('img');
			overlay = document.querySelector('div');
			expect(image).toBeNull();
			expect(overlay).toBeNull();
			resolve();
		}, 5000);
	});

	// Run the test
	await page.evaluate(handleTest, 'Aquarius');

	await browser.close();
});
