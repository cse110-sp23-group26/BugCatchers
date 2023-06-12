import {writeToDialogue} from "./writeToDialogue";
import {getConstellation} from "./getConstellation";
import {generateFinalFortune} from "./responseGenerator";
import {addFortuneCard} from "./addFortuneCard";
import {updateFortuneCardList} from "../main-app";
import {showConstellationImage} from "./constellationAnimation";

let userBirthDay;
let userBirthMonth;
// let userBirthYear;
let userMood;

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export async function startDialogueSequence(welcomeMsg, speakerName) {
	// Wait a second before typing to let the starting bubble animation play
	await (new Promise((res)=>{setTimeout(res,1000)}));

	// Writes the welcome dialogue and then prompts the user for astrology
	writeToDialogue(welcomeMsg, speakerName, promptAstrology);

	const boxInput = document.querySelector('#dataInput');
	const arrowElement = document.querySelector('.arrow');

	boxInput.addEventListener("input", isNonEmpty);

	/**
	 * Check whether a number input's value is between its min and max
	 * @param {InputEvent | InputElement} event an input event on an input element
	 */
	function validateNumberInput(event) {
		let input;
		if (event?.target) {
			input = event.target;
		} else {
			input = event;
		}
		let min = parseInt(input.min);
		let max = parseInt(input.max);
		let val = Number(input.value);
		let valid = !isNaN(val) && val >= min && val <= max;
	
		// check validity
		if (valid) {
			input.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.1)";
		} else {
			input.style.boxShadow = "0px 0px 10px 3px red";
		}
		return valid;
	}

	function isNonEmpty(event) {
		let input;
		if (event?.target) {
			input = event.target;
		} else {
			input = event;
		}
		let valid = input.value.length > 0;
		if (valid) {
			input.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.1)";
		} else {
			input.style.boxShadow = "0px 0px 10px 3px red";
		}
		return valid;
	}


	/**
	 * Prevents an input from receiving any input but numbers
	 * @param {InputEvent} e the event to target
	 */
	function forceNumbersOnly(e) {
		if (e.key.length === 1 && e.key.match(/^\d$/) === null) {
			e.preventDefault();
		}
	}
	
	/**
	 * Remove the arrow and add the input box
	 */
	function promptAstrology() {
		// proceed dialogue text
		arrowElement.style.display = "none";
		writeToDialogue('Would you like to know what the stars say about your future?', speakerName, null, () => {
			let button = document.querySelector(".interactive > button");
			button.textContent = "Yes!"
			button.style.display = "";
		
			function handleClick(e) {
				e.preventDefault();
				e.stopPropagation();
				button.removeEventListener("click", handleClick);
				button.style.display = "none";
				getBirthMonth(button);
			}
		
			button.addEventListener("click", handleClick);
		});
	}
	
	/**
	 * Hide the arrow and show the input box
	 */
	function getBirthMonth() {
		// show the input box
		document.querySelector('.interactive > label').style.display = "";
		arrowElement.style.display = "";
	
		boxInput.value = "";
		boxInput.type = "number";
		boxInput.setAttribute("min", "1");
		boxInput.setAttribute("max", "12");
	
		// If the user has already inputted their birth month, show it as default
		let birthMonth = localStorage.getItem('UserBirthMonth');
		if (birthMonth) {
			boxInput.value = birthMonth;
		}
	
		let cancelTyping = writeToDialogue("Now tell me, what month were you born?");
	
		function submitMonth(e) {
			if (e?.key === "Enter" || e.target.id === arrowElement.id) {
				if (validateNumberInput(boxInput)) {
					localStorage.setItem('UserBirthMonth', boxInput.value);
					userBirthMonth = parseInt(boxInput.value);
					arrowElement.removeEventListener("click", submitMonth);
					boxInput.removeEventListener("keydown", submitMonth);
					cancelTyping[0]();
					getBirthDay();
				}
			}
		}

		boxInput.addEventListener("input", validateNumberInput);
		boxInput.addEventListener("keydown", forceNumbersOnly);
		boxInput.addEventListener("keydown", submitMonth);
		arrowElement.addEventListener("click", submitMonth);
	}

	
	function getBirthDay() {

		let cancelTyping = writeToDialogue("Curious! Now, what day were you born?");

		boxInput.value = "";
		boxInput.type = "number";
		boxInput.setAttribute("min", "1");
		boxInput.setAttribute("max", DAYS_IN_MONTH[userBirthMonth - 1]);

		// If the user has already inputted their birth day, show it as default
		let birthDay = localStorage.getItem('UserBirthDay');
		if (birthDay) {
			boxInput.value = birthDay;
		}

		function submitDay(e) {
			if (e?.key === "Enter" || e.target.id === arrowElement.id) {
				if (validateNumberInput(boxInput)) {
					localStorage.setItem('UserBirthDay', boxInput.value);
					userBirthDay = parseInt(boxInput.value);
					arrowElement.removeEventListener("click", submitDay);
					boxInput.removeEventListener("keydown", submitDay);
					cancelTyping[0]();
					getBirthYear();
				}
			}
		}

		// The boxInput already has a validateNumberInput on it from getUserMonth
		boxInput.addEventListener("keydown", submitDay);
		arrowElement.addEventListener("click", submitDay);
	}

	function getBirthYear() {
		let cancelTyping = writeToDialogue("Oh! Do tell me the year you were born!");

		boxInput.value = "";
		boxInput.type = "number";
		boxInput.setAttribute("min", "1900");
		boxInput.setAttribute("max", (new Date()).getUTCFullYear() - 13);

		// If the user has already inputted their birth year, show it as default
		let birthYear = localStorage.getItem('UserBirthYear');
		if (birthYear) {
			boxInput.value = birthYear;
		}

		function submitYear(e) {
			if (e?.key === "Enter" || e.target.id === arrowElement.id) {
				if (validateNumberInput(boxInput)) {
					localStorage.setItem('UserBirthYear', boxInput.value);
					// userBirthYear = parseInt(boxInput.value);
					arrowElement.removeEventListener("click", submitYear);
					boxInput.removeEventListener("keydown", submitYear);
					cancelTyping[0]();
					getMood();
				}
			}
		}

		// The boxInput already has a validateNumberInput on it from getUserMonth
		boxInput.addEventListener("keydown", submitYear);
		arrowElement.addEventListener("click", submitYear);
	}

	function getMood() {
		writeToDialogue("Finally, tell me what your current mood is.")

		boxInput.type = "text";
		boxInput.removeEventListener("keydown", forceNumbersOnly);
		boxInput.removeEventListener("input", validateNumberInput);

		boxInput.value = "";

		function submitMood(e) {
			if (!isNonEmpty(boxInput)) return;
			if (e?.key === "Enter" || e.target.id === arrowElement.id) {
				userMood = boxInput.value;
				arrowElement.removeEventListener("click", submitMood);
				boxInput.removeEventListener("keydown", submitMood);
				showPred();
			}
		}
		
		boxInput.addEventListener("keydown", submitMood);
		arrowElement.addEventListener("click", submitMood);
	}

	function getMonthString(monthNumber) {
		const months = [
			'January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'
		];
	
		if (monthNumber >= 1 && monthNumber <= 12) {
			return months[monthNumber - 1];
		} else {
			return 'None';
		}
	}
	
	/**
	 * Get prediction and back to the main page
	 */
	async function showPred() {
		// Hide the text input
		document.querySelector('.interactive > label').style.display = "none";
		
		// Based on user info, generate a response
		let userBirthMonthDay = getMonthString(userBirthMonth) + ' ' + userBirthDay;
		let userConstellation = getConstellation(userBirthMonthDay);
		let response = await generateFinalFortune(userConstellation);

		if (userMood == "Powell"){
			userConstellation = "Powell";
		}

		let curText = `The holy ${userConstellation} answered your call!`;
		// Powell!!!
		if (userMood == "Powell") {
			curText = "The holy—— uh, wait... well, oops, Professor Powell answered your call...";
			response = [
				"Hello, kids!",
				"Did you check your MIDTERM grade?",
				"Do you like it?",
				"RELAX! I'm just asking.",
				"I won't change it even if you don't like it."
			];
		}
		
		// add the fortune card to local storage
		// current response date
		const currentDate = new Date();
		const dateString = `${
			currentDate.getFullYear()
		}-${
			currentDate.getMonth() + 1
		}-${
			currentDate.getDate()
		}: ${
			currentDate.getHours()
		}:${
			currentDate.getMinutes()
		}:${
			currentDate.getSeconds()
		}`;

		let newFortunes = {
			"name": userConstellation,
			"id": Date.now(),
			"text": response,
			"birthday": userBirthMonthDay,
			"mood": userMood,
			"time": dateString
		};

		addFortuneCard(newFortunes);
		// update the Fortune card list
		updateFortuneCardList();

		writeToDialogue(curText, null, ()=>{
			let char = document.getElementById("char");
			if (userMood === "Powell") {
				char.src = "assets/constellation/big/white/Powell.png";
			}
			writeToDialogue(response, userMood === "Powell" ? "Powell " : speakerName, () =>{
				char.src = "assets/char-celeste.png";
				promptAstrology();
			});
		}, () => {
			showConstellationImage(userConstellation);
		});
	}
}