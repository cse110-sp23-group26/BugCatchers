let UserBirthDay;
let UserBirthMonth;
let UserBirthYear;
let UserMood;

/**
 * Sets up user interaction with the dialogue box.
 * @param {string} speakerName - The character that is currently speaking
 * @param {string} welcomeMsg - The welcome message to be initially displayed
 */
function dialogueGo() {
    let speakerContainer = document.querySelector('.speaker');
    let dialogueContainer = document.querySelector('.dialogue-text');
    speakerContainer.textContent = 'Celeste';
    dialogueContainer.textContent = 'Hello child! What can I do for you?';

    // get input if user click the DOWN arrow
    const arrowElement = document.querySelector('.arrow');
    // Add click event listener to the arrow element
    arrowElement.addEventListener('click', boxInit);
}

/**
 * Check whether the input of the user is valid
 * @param {*} pattern 
 */
function inputCheck(pattern) {
	const boxInput = document.querySelector('#dataInput');
	const inputValue = boxInput.value;
	const valid = pattern.test(inputValue);

	// console.log(pattern);

	// check validity
	if (valid) {
		boxInput.style.color = 'black'; 
	} else {
		boxInput.style.color = 'red';
	}
}

/**
 * Remove the arrow and add the input box
 */
function boxInit() {
    // proceed dialogue text
    const arrowElement = document.querySelector('.arrow');
    const exitElement = document.querySelector('#exitButton');
    let curDialogue = document.querySelector('.dialogue-text');
    curDialogue.textContent = 'Would you like to know what the stars say about your futures?';

    // unhide the revert button
    exitElement.style.display = 'block';

    arrowElement.removeEventListener('click', boxInit);
    arrowElement.addEventListener('click', showBox);
    exitElement.addEventListener('click', ()=>{
        arrowElement.removeEventListener('click', showBox);
        arrowElement.addEventListener('click', boxInit);
        exitElement.style.display = 'none';
        dialogueGo();
    });
}



/**
 * Hide the arrow and show the input box
 */
function showBox() {
	// select the arrow and hide it
	const arrowElement = document.querySelector('.arrow');
	const exitElement = document.querySelector('#exitButton');
	arrowElement.style.display = 'none';
	arrowElement.style.pointerEvents = 'none';
	exitElement.style.display = 'none';

	// show the input box
	const boxInput = document.querySelector('#dataInput');
	boxInput.setAttribute("type", "number");
	boxInput.setAttribute("min", "1");
	boxInput.setAttribute("max", "31");
	boxInput.removeAttribute('hidden');

	let curDialogue = document.querySelector('.dialogue-text');
	curDialogue.textContent = 'Now tell me, what day were you born?';
	boxInput.style.letterSpacing = '12px';
	boxInput.placeholder = 'dd';

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
	const pattern = /^([1-9]|[1-2][0-9]|3[0-1])$/;
	boxInput.addEventListener('input', inputCheck(pattern));

	// record data
	boxInput.addEventListener('keydown', handleKeyDownDay);
}

/**
 * Helper function for dayCheck and to avoid the recursive call.
 * Recursive call would lead to fatal error of variable update.
 * @param {*} event - Detects the user pressing enter
 */
function handleKeyDownDay(event) {
	const boxInput = document.querySelector('#dataInput');
	const computedStyle = window.getComputedStyle(boxInput);

	// if validity check passes
	if ((event.key==='Enter')&&(computedStyle.color==='rgb(0, 0, 0)')) {
		console.log(boxInput.value);
		// store birthday
		UserBirthDay = boxInput.value;
		// cache in local storage
		localStorage.setItem('UserBirthDay', UserBirthDay);
		let curDialogue = document.querySelector('.dialogue-text');
		curDialogue.textContent = 'Curious! Now, what month were you born? (enter to proceed)';

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
	boxInput.removeEventListener('input', inputCheck(/^([1-9]|[1-2][0-9]|3[0-1])$/));

	// check validity
	boxInput.addEventListener('input', inputCheck(/^([1-9]|1[0-2])$/));

	// record data
	boxInput.addEventListener('keydown', handleKeyDownMonth);
}

/**
 * Helper function for monthCheck and to avoid the recursive call.
 * Recursive call would lead to fatal error of variable update.
 * @param {*} event - Detects the user pressing enter
 */
function handleKeyDownMonth(event) {
	const boxInput = document.querySelector('#dataInput');
	const computedStyle = window.getComputedStyle(boxInput);

	// if validity check passes
	if ((event.key==='Enter')&&(computedStyle.color==='rgb(0, 0, 0)')) {
		console.log(boxInput.value);
		// store birth month
		UserBirthMonth = boxInput.value;
		// cache in local storage
		localStorage.setItem('UserBirthMonth', UserBirthMonth);
		let curDialogue = document.querySelector('.dialogue-text');
		curDialogue.textContent = 'Oh! Do tell me the year you were born (enter to proceed)';

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
	boxInput.removeEventListener('input', inputCheck(/^([1-9]|1[0-2])$/));

	// check validity
	boxInput.addEventListener('input', inputCheck(/^(19[0-9]{2}|20[0-1][0-9]|202[0-3])$/));

	// record data
	boxInput.addEventListener('keydown', handleKeyDownYear);
}

/**
 * Helper function for yearCheck and to avoid the recursive call.
 * Recursive call would lead to fatal error of variable update.
 * @param {*} event - Detects the user pressing enter
 */
function handleKeyDownYear(event) {
	const boxInput = document.querySelector('#dataInput');
	const computedStyle = window.getComputedStyle(boxInput);

	// if validity check passes
	if ((event.key==='Enter')&&(computedStyle.color==='rgb(0, 0, 0)')) {
		console.log(boxInput.value);
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
 * @param {*} event - Detects the user pressing enter
 */
function handleKeyDownMood(event) {
    const boxInput = document.querySelector('#dataInput');

    // if validity check passes
    if (event.key==='Enter') {
        // remove the input box
        console.log(boxInput.value);
        // store mood
        UserMood = boxInput.value;
        let userBirthMonthDay = getMonthString(UserBirthMonth) + ' ' + UserBirthDay;
        let UserConstellation = getConstellation(userBirthMonthDay);

        // Powell!!!
        if(UserMood == "Powell"){
            UserConstellation = "Powell";
        }

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


        // ---------------------------------TODO----------------------------------
        // TODO: need to get back to the previous phase if the user input
        // does not pass sanity
        // ---------------------------------TODO----------------------------------


        // animation
        showConstellationImage(UserConstellation);

        // change arrow back
        const svg = document.querySelector('.arrow');
        svg.style.display = "block";
        svg.style.pointerEvents = 'auto';
        svg.style.cursor = 'pointer';

        // click to view result
        svg.addEventListener('click', showPred);
    }
} 

/**
 * Get prediction and back to the main page
 */
async function showPred() {
	const arrowElement = document.querySelector('.arrow');
	let curDialogue = document.querySelector('.dialogue-text');

	// based on UserBirthDay, UserBirthMonth, UserBirthYear, UserMood
	// generate response
	let userBirthMonthDay = getMonthString(UserBirthMonth) + ' ' + UserBirthDay;
	let UserConstellation = getConstellation(userBirthMonthDay);
	let response = await GetJsonResponse(UserConstellation, UserBirthDay, UserBirthMonth, UserBirthYear, UserMood);
	
	// Powell!!!
	if (UserMood == "Powell"){
		UserConstellation = "Powell";
		response = "Professor Powell: Hello, kids! \n Did you checked your MIDTERM grade? \n Do you like it? \n RELAX! Just ask. I won't change it even though you don't like it.";
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

/**
 * After splitting a string into pieces, displays each of the pieces every four seconds in the dialogue box.
 * @param {string} string - The string to be split
 */
async function split_and_display(string) {
    const arrowElement = document.querySelector('.arrow');
    arrowElement.style.display = 'none';
    let curDialogue = document.querySelector('.dialogue-text');
    let strings = await splitString(string);

   //Loop thorugh each string, clear the dialogue box, and type the string
    for (let i = 0; i < strings.length; i++) {
        //Clear the box for each string
        curDialogue.textContent = '';
        await typeWriter(strings[i]);
        //If user click box, skip the typing animation
        curDialogue.addEventListener('click', () =>{
            curDialogue.textContent = strings[i];
        })
        //If user click box, and string is printed already, show next string
        if (curDialogue.textContent == strings[i]) {
            continue;
        }
        //If user doesn't click box, wait for 2 seconds before showing next string
        await delay(5000) // Adjust the delay between texts here (in milliseconds)
    }
    //Function that delays the arrow appearing
    function arrow_delay() {
        arrowElement.style.display = 'block';
    }
    setTimeout(arrow_delay, 7500);
}

//Function that takes a string and makes a typing animation, output = dialogue-text
async function typeWriter(string) {
    let index = 0;
    let curDialogue = document.querySelector('.dialogue-text');
    function printNextChar() {
        if (index < string.length) {
        curDialogue.textContent += string[index];
        index++;
        return new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms before typing the next character
        }
    }
    while (printNextChar()) {
        await printNextChar();
    }
}

/**
 * Splits a string into chunks of maximum size 100 characters.
 * @param {string} str - The string to be split
 * @returns {array} - The pieces of the split string
 */
async function splitString(str) {
    let chunkSize = 120;
    let chunks = str.match(new RegExp(String.raw`\S(?:.{0,${chunkSize - 2}}\S)?(?= |$)`, 'g'));
    return chunks;
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Converts a number into its corresponding month (e.g. 1 gets converted to 'January')
 * @param {number} monthNumber - The number corresponding to the month
 * @returns {string} - A string containing the month
 */
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
