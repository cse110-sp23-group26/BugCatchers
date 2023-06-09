/**
 * Has a function called generateFinalFortune which returns a text string
 * that has a final version of a fortune that will be given to the user
 */

//  ---------------------- BEGIN UTILITY FUNCTIONS ----------------------------
/**
 * Reads each of the JSON files containing fortunes.
 * @returns {object} - An object containing the JSON from each of the JSON files
 */
async function readJSON() {
	let astro = await fetch('conf/Astrology.json');
	astro = await astro.json();

	let suggestion = await fetch('conf/Suggestions.json');
	suggestion = await suggestion.json();

	let fortune = await fetch('conf/Fortunes.json');
	fortune = await fortune.json();
	
	let transitional = await fetch('conf/Transitional.json');
	transitional = await transitional.json();

	return {
		astro: astro,
		suggestion: suggestion,
		fortune: fortune,
		transitional: transitional
	}
}

/**
 * Picks a random item from an array
 * @param {array} list - the array to choose from
 * @returns a random item from the list
 */
function randomFromList(list) {
	return list[Math.floor(Math.random()*list.length)];
}

/**
 * Makes a string lowercase at the start
 * @param {string} s - the string to make lowercased
 * @returns {string} - the string s with a lowercase character at the start
 */
function lowercaseStart(s) {
	return s.charAt(0).toLowerCase() + s.slice(1);
}

// ------------------------- BEGIN RESPONSE FUNCTIONS -------------------------

/**
 * Randomly generates a fortune about money
 * @param {string} sign - The zodiac sign to generate a fortune for
 * @returns {string} - The randomly generated fortune
 */
function responseMoney(sign) {
	// Changed from concatenation to string templating to clean up code a bit
	const fortune = generateFortuneObject(sign);
	return `The stars have spoken. ${fortune.fortune_money_text} ${sign
		} are ${fortune.astro_feature_text}. ${fortune.suggestion_text}`;
}

/**
 * Randomly generates a fortune about work
 * @param {string} sign - The zodiac sign to generate a fortune for
 * @returns {string} - The randomly generated fortune
 */
function responseWork(sign) {
	const fortune = generateFortuneObject(sign);
	return `The stars are telling me your future. ${fortune.fortune_work_text} ${
		sign} are ${fortune.astro_feature_text}. ${fortune.suggestion_text}`;
}

/**
 * Randomly generates a fortune with a random topic
 * @param {string} sign - The zodiac sign to generate a fortune for
 * @returns {string} - The randomly generated fortune
 */
function responseRandom(sign) {
	const fortune = generateFortuneObject(sign);
	let random_text = [
		fortune.fortune_money_text, 
		fortune.fortune_school_text, 
		fortune.fortune_relation_text, 
		fortune.fortune_work_text, 
		fortune.fortune_generic_text
	]
	random_text = random_text[Math.floor(Math.random()*random_text.length)]

	return `The heavens have foretold your future. ${random_text} ${sign
		} are ${fortune.astro_feature_text}. ${fortune.suggestion_text}`;
}

let FORTUNE_DATA = null;
readJSON().then(e =>{
	FORTUNE_DATA = e;
})

// A list of functions that can be used to generate a fortune
const GENERATORS = [responseMoney, responseWork, responseRandom];

/**
 * Generates an object that has a specific fortune for a variety of categories for a response generator to use
 * @param {string} sign - A string containing the zodiac sign to generate a fortune for
 * @returns {object} - An object containing various fortune strings that can be used to generate a fortune
 */
function generateFortuneObject(sign) {
	const signData = FORTUNE_DATA.astro[sign];
	const fortune = FORTUNE_DATA.fortune;
	const suggestion = FORTUNE_DATA.suggestion;
	const transitional = FORTUNE_DATA.transitional;

	return {
		astro_info_text: randomFromList(signData["info"]),
		astro_feature_text: lowercaseStart(randomFromList(signData["features"])),
		fortune_money_text: randomFromList(fortune["Money"]),
		fortune_school_text: randomFromList(fortune["School"]),
		fortune_relation_text: randomFromList(fortune["Relation"]),
		fortune_work_text: randomFromList(fortune["Work"]),
		fortune_generic_text: randomFromList(fortune["Generic"]),
		suggestion_text: randomFromList(suggestion["suggestions"]),
		transitional: randomFromList(transitional["transitional"])
	}
}

/**
 * Returns a randomly generated fortune based on the user's constellation
 * 
 * @param {string} sign - The zodiac sign to generate a fortune for
 * @returns - A string containing the randomly generated fortune
 */
async function generateFinalFortune(sign){
	let generator = GENERATORS[Math.floor(Math.random()*GENERATORS.length)];
	let response = await generator(sign);
	return response;
}