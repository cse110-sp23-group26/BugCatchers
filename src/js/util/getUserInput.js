let UserBirthDay;
let UserBirthMonth;
let UserBirthYear;
let UserMood;


function dialogueGo(welcomeMsg, speakerName) {
	writeToDialogue(welcomeMsg, speakerName, boxInit);
}

/**
 * Check whether the input of the user is valid
 * @param {*} pattern 
 */
function inputCheck(pattern) {
	const boxInput = document.querySelector('#dataInput');
	const inputValue = boxInput.value;
	const valid = pattern.test(inputValue);

	// check validity
	if (valid || (!inputValue)) {
		boxInput.style.border = "2px solid #071b6c";
        boxInput.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.1)";
	} else {
		boxInput.style.border = "2px solid red";
        boxInput.style.boxShadow = "0px 0px 10px 3px red";
	}
}

/**
 * Remove the arrow and add the input box
 */
function boxInit() {
	// proceed dialogue text
	const arrowElement = document.querySelector('.arrow');
	arrowElement.style.display = "none";
	writeToDialogue('Would you like to know what the stars say about your future?', null, null, () => {
		let button = document.querySelector(".interactive > button");
		button.textContent = "Yes!"
		button.style.display = "";

		function handleClick(e) {
			e.preventDefault();
			e.stopPropagation();
			button.removeEventListener("click", handleClick);
			button.style.display = "none";
			showBox(button);
		}

		button.addEventListener("click", handleClick);
	});
}

/**
 * Hide the arrow and show the input box
 */
function showBox() {
	// show the input box
	const boxInput = document.querySelector('#dataInput');
	boxInput.removeAttribute('hidden');

	writeToDialogue("Now tell me, what day were you born?");

	arrowElement.removeEventListener('click', showBox);
	boxInput.addEventListener('input', dayCheck);

	// If the user has already input the birthday, show it as default
	if(localStorage.getItem('UserBirthDay')){
		boxInput.value = localStorage.getItem('UserBirthDay');

		// Manually trigger input event to check validity
		const event = new Event('input');
		boxInput.dispatchEvent(event);
	}
}

/**
 * Check the input of day from user
 */
function dayCheck() {
	const boxInput = document.querySelector('#dataInput');

	// check validity
	const pattern = /^(0[1-9]|[1-2][0-9]|3[0-1])$/
	boxInput.addEventListener('input', inputCheck(pattern));

	// record data
	boxInput.addEventListener('keydown', handleKeyDownDay);
}

/**
 * Helper function for dayCheck and to avoid the recursive call.
 * Recursive call would lead to fatal error of variable update.
 * @param {*} event 
 */
function handleKeyDownDay(event) {
	const boxInput = document.querySelector('#dataInput');
	const computedStyle = window.getComputedStyle(boxInput);

	// if validity check passes
	if ((event.key==='Enter')&&(computedStyle.borderColor==='rgb(7, 27, 108)')&&(boxInput.value)) {
		// store birthday
		UserBirthDay = boxInput.value;
		// cache in local storage
		localStorage.setItem('UserBirthDay', UserBirthDay);
		let curDialogue = document.querySelector('.dialogue-text');
		curDialogue.textContent = 'Curious! Now, what month were you born?';

		boxInput.removeEventListener('input', dayCheck);
		boxInput.removeEventListener('keydown', handleKeyDownDay);
		boxInput.value = '';
		boxInput.placeholder = 'mm';
		boxInput.setAttribute("min", "1");
		boxInput.setAttribute("max", "12");
		boxInput.addEventListener('input', monthCheck);

		// If the user has already input the birthday, show it as default
		if(localStorage.getItem('UserBirthMonth')){
			boxInput.value = localStorage.getItem('UserBirthMonth');

			// Manually trigger input event to check validity
			const event = new Event('input');
			boxInput.dispatchEvent(event);
		}
	}
}

/**
 * Check the input of month from user
 */
function monthCheck() {
	const boxInput = document.querySelector('#dataInput');

	// remove previous input listener style checker
	boxInput.removeEventListener('input', inputCheck(/^(0[1-9]|[1-2][0-9]|3[0-1])$/));

	// check validity
	boxInput.addEventListener('input', inputCheck(/^(0[1-9]|1[0-2])$/));

	// record data
	boxInput.addEventListener('keydown', handleKeyDownMonth);
}

/**
 * Helper function for monthCheck and to avoid the recursive call.
 * Recursive call would lead to fatal error of variable update.
 * @param {*} event 
 */
function handleKeyDownMonth(event) {
	const boxInput = document.querySelector('#dataInput');
	const computedStyle = window.getComputedStyle(boxInput);

	// if validity check passes
	if ((event.key==='Enter')&&(computedStyle.borderColor==='rgb(7, 27, 108)')&&(boxInput.value)) {
		// console.log(boxInput.value);
		// store birth month
		UserBirthMonth = boxInput.value;
		// cache in local storage
		localStorage.setItem('UserBirthMonth', UserBirthMonth);
		let curDialogue = document.querySelector('.dialogue-text');
		curDialogue.textContent = 'Oh! Do tell me the year you were born!';

		boxInput.removeEventListener('input', monthCheck);
		boxInput.removeEventListener('keydown', handleKeyDownMonth);
		boxInput.value = '';
		boxInput.placeholder = 'yyyy';
		boxInput.setAttribute("min", "1900");
		boxInput.setAttribute("max", "2023");
		boxInput.addEventListener('input', yearCheck);

		// If the user has already input the birthday, show it as default
		if(localStorage.getItem('UserBirthYear')) {
			boxInput.value = localStorage.getItem('UserBirthYear');

			// Manually trigger input event to check validity
			const event = new Event('input');
			boxInput.dispatchEvent(event);
		}
	}
}

/**
 * Check the input of year from user
 */
function yearCheck() {
	const boxInput = document.querySelector('#dataInput');

	// remove previous input listener style checker
	boxInput.removeEventListener('input', inputCheck(/^(0[1-9]|1[0-2])$/));

	// check validity
	boxInput.addEventListener('input', inputCheck(/^(19[0-9]{2}|20[0-1][0-9]|202[0-3])$/));

	// record data
	boxInput.addEventListener('keydown', handleKeyDownYear);
}

/**
 * Helper function for yearCheck and to avoid the recursive call.
 * Recursive call would lead to fatal error of variable update.
 * @param {*} event 
 */
function handleKeyDownYear(event) {
	const boxInput = document.querySelector('#dataInput');
	const computedStyle = window.getComputedStyle(boxInput);

	// if validity check passes
	if ((event.key==='Enter')&&(computedStyle.borderColor==='rgb(7, 27, 108)')&&(boxInput.value)) {
		// store birth year
		UserBirthYear = boxInput.value;
		// cache in local storage
		localStorage.setItem('UserBirthYear', UserBirthYear);
		let curDialogue = document.querySelector('.dialogue-text');
		curDialogue.textContent = 'Finally, tell me what your current mood is';
		boxInput.removeEventListener('input', yearCheck);
		boxInput.removeEventListener('keydown', handleKeyDownYear);
		boxInput.value = '';
		boxInput.placeholder = 'Anything';
		boxInput.setAttribute("type", "text");
		boxInput.style.letterSpacing = 'normal';
		boxInput.removeAttribute('placeholder');
		boxInput.addEventListener('input', checkMood);
	}
}

/**
 * Check the input of mood from user
 */
function checkMood() {
	const boxInput = document.querySelector('#dataInput');

	// remove previous input listener style checker
	boxInput.removeEventListener('input', inputCheck(/^(19[0-9]{2}|20[0-1][0-9]|202[0-3])$/));

	// unrestrict
	boxInput.addEventListener('input', inputCheck(/.*/));

	// record data
	boxInput.addEventListener('keydown', handleKeyDownMood);
}

/**
 * Helper function for checkMood and to avoid the recursive call.
 * Recursive call would lead to fatal error of variable update.
 * @param {*} event 
 */
function handleKeyDownMood(event) {
    const boxInput = document.querySelector('#dataInput');

    // if validity check passes
    if (event.key==='Enter') {
        // console.log(boxInput.value);
        // store mood
        UserMood = boxInput.value;
        let userBirthMonthDay = getMonthString(UserBirthMonth) + ' ' + UserBirthDay;
        let UserConstellation = getConstellation(userBirthMonthDay);

        // Powell!!!
        if(UserMood == "Powell"){
            UserConstellation = "Powell";
        }

        // remove the input box
        boxInput.value = '';
        boxInput.hidden = true;
        let curDialogue = document.querySelector('.dialogue-text');
        let curText = `The holy ${UserConstellation} answered your call!`;
        // Powell!!!
        if (UserMood == "Powell"){
            curText = "The holy—— uh, wait... well, oops, Professor Powell answered your call..."
        }
        curDialogue.textContent = curText;
        boxInput.removeEventListener('input', checkMood);
        boxInput.removeEventListener('keydown', handleKeyDownMood);
        boxInput.removeEventListener('input', inputCheck(/.*/));

        // animation
        showConstellationImage(UserConstellation);

        // change arrow back
        const svg = document.querySelector('.arrow');
        svg.style.display = "block";
        svg.style.pointerEvents = 'auto';
        svg.style.cursor = 'pointer';

        const origArr = `
            <path d="M22.5 25C18.0184 25 7.59473 12.6404 1.55317 4.96431C-0.122281 2.83559 1.72264 -0.179893 4.39835 0.243337C10.2831 1.17415 18.2164 2.28736 22.5 2.28736C26.7836 2.28736 34.7169 1.17415 40.6017 0.243339C43.2774 -0.17989 45.1223 2.83559 43.4468 4.96431C37.4053 12.6404 26.9816 25 22.5 25Z" fill="white"/>
        `;
        svg.innerHTML = origArr;
        svg.style.bottom = '0'; 
        svg.style.width = '45'; 
        svg.style.height = '25';

        // click to view result
        svg.addEventListener('click', showPred);
    }
} 

/**
 * Get prediction and back to the main page
 */
async function showPred() {

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

	const arrowElement = document.querySelector('.arrow');

	// based on UserBirthDay, UserBirthMonth, UserBirthYear, UserMood
	// generate response
	let userBirthMonthDay = getMonthString(UserBirthMonth) + ' ' + UserBirthDay;
	let UserConstellation = getConstellation(userBirthMonthDay);
	let response = await generateFinalFortune(UserConstellation);
	// Powell!!!
	if (UserMood == "Powell"){
		UserConstellation = "Powell";
		response = "Professor Powell: Hello, kids! Did you checked your MIDTERM grade? Do you like it? RELAX! Just ask. I won't change it even though you don't like it.";
	}
	// add the fortune card to local storage
	// current response date
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;
	const currentDay = currentDate.getDate();
	const currentHour = currentDate.getHours();
	const currentMinute = currentDate.getMinutes();
	const currentSecond = currentDate.getSeconds();
	const dateString = `${currentYear}-${currentMonth}-${currentDay}: ${currentHour}:${currentMinute}:${currentSecond}`;
	let new_fortunes = {"name": UserConstellation,"id": Date.now(), "text": response, "birthday": userBirthMonthDay, "mood": UserMood, "time": dateString, };
	addFortuneCard(new_fortunes);
	// update the Fortune card list
	updateFortuneCardList();
  
	split_and_display(response);
	
	arrowElement.removeEventListener('click', showPred);
	arrowElement.addEventListener('click', boxInit);
}