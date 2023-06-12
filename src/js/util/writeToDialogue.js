// The maximum characters for a given line of text to fit on a dialogue box
const CHUNK_SIZE = 100;
// The number of milliseconds to wait between typing two consecutive characters
const TYPING_DELAY = 40;

/**
 * Writes out a string of text to the dialogue box
 * @param {string} speaker the name of the person talking
 * @param {string | array<string>} text an array of lines or a string of dialogue
 * @param {function} userNext function that is called when user clicks on finished dialogue
 * @param {function} doneTyping function that is called when typing out a single line is completed
 */
export function writeToDialogue(text, speaker, userNext, doneTyping){
	if (speaker) {
		// Set the speaker if the parameter is provided
		document.querySelector("span.speaker").textContent = speaker;
	}

	/**
	 * Splits a string into chunks that are less than a certain number of characters long
	 * @param {string} str the string to split into chunksnod
	 * @param {number} chunkSize the maximum size of an individual chunk
	 * @returns an array of chunks of the string
	 */
	function splitString(str, chunkSize) {
		let arr = str.split(" ");
		let chunks = [];
		let line = "";
		for (let word of arr) {
			if ((line.length + word.length) < chunkSize) {
				line += ` ${word}`;
			} else {
				chunks.push(line.trim());
				line = word;
			}
		}
		if (line) {
			chunks.push(line.trim());
		}
		return chunks;
	}
	
	// If text is a string, split it, up into chunks, 
	// but if it's pre-chunked and an array, just use the array
	let strings = typeof text === "string" ? 
		splitString(text, CHUNK_SIZE) : 
		text;
	let stringArr = strings.splice(0, 1)[0].split("");
	let curDialogue = document.querySelector(".dialogue-text>.text");
	let shadowText = document.querySelector(".dialogue-text>.shadow-text");
	let textBox = document.querySelector("#text-box");

	/**
	 * Types out a string array over time to the dialogue box 
	 * @param {number} delay in ms of how long to wait before adding the next character of the 
	 * @returns the id of the interval that adds the characters of the string
	 */
	function typeWriter(delay) {
		let intervalId = setInterval(()=>{
			if (stringArr.length > 0) {
				curDialogue.textContent += stringArr.splice(0, 1);
			} else {
				clearInterval(intervalId);
				if (strings.length === 0 && doneTyping) doneTyping();
			}
		}, delay);
		return intervalId;
	}

	let cancelFunc = [];

	/**
	 * Types out all of the strings in the "strings" array, adds an event listener
	 * to print out the rest of the current dialogue line when clicked, advances 
	 * dialogue to the next string in the array once it's done printing out the
	 * current line. 
	 */
	function advanceDialogue(){
		if (stringArr.length === 0 && strings.length > 0) {
			stringArr = strings.splice(0, 1)[0].split("");
		}
		// Clear the box for each new line
		curDialogue.textContent = "";
		// Populate the shadow text so that the bounding box is filled
		shadowText.textContent = stringArr.join("");
		// Type the string
		let intervalId = typeWriter(TYPING_DELAY);		

		function handleClick() {
			clearInterval(intervalId);
			if (stringArr.length > 0) {
				curDialogue.textContent += stringArr.join("");
				stringArr.splice(0, stringArr.length);
				if (strings.length === 0 && doneTyping) doneTyping();
			} else {
				textBox.removeEventListener("click", handleClick);
				if (strings.length === 0) {
					if (userNext) userNext();
				} else {
					advanceDialogue();
				}
			}
		}

		cancelFunc.splice(0, 1, handleClick);

		// If user clicks box, skip the typing animation
		// or display the next line of text if done typing
		textBox.addEventListener("click", handleClick);
	}
	
	// Start the sequence to step through the dialogue
	advanceDialogue();
	return cancelFunc;
}