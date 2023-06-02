let UserBirthDay;
let UserBirthMonth;
let UserBirthYear;
let UserMood;


function dialogueGo(speakerName, welcomeMsg) {
    let speakerContainer = document.querySelector('.speaker');
    let dialogueContainer = document.querySelector('.dialogue-text');
    speakerContainer.textContent = speakerName;
    dialogueContainer.textContent = welcomeMsg;

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
    let curDialogue = document.querySelector('.dialogue-text');
    curDialogue.textContent = 'Would you like to know what the stars say about your futures?';

    // change arrow avg into yes text box
    const rect = `
        <rect width="100%" height="100%" rx="10" ry="10" fill="#1e3799"/>
        <!-- this is for the extra style of the rectangular box
            <rect width="100%" height="100%" rx="10" ry="10" fill="url(#pattern)"/>
        -->
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff">Yes!</text>
    `;
    arrowElement.innerHTML = rect;
    arrowElement.style.bottom = '10%'; // originally 0
    arrowElement.style.width = '80'; // originally 45
    arrowElement.style.height = '50'; // originally 25 

    arrowElement.removeEventListener('click', boxInit);
    arrowElement.addEventListener('click', showBox);
}

/**
 * Hide the arrow and show the input box
 */
function showBox() {
    // select the arrow and hide it
    const arrowElement = document.querySelector('.arrow');
    arrowElement.style.display = 'none';
    arrowElement.style.pointerEvents = 'none';

    // show the input box
    const boxInput = document.querySelector('#dataInput');
    boxInput.removeAttribute('hidden');

    let curDialogue = document.querySelector('.dialogue-text');
    curDialogue.textContent = 'Now tell me, what day were you born? (enter to proceed)';
    boxInput.style.letterSpacing = '12px';
    boxInput.placeholder = 'dd';

    arrowElement.removeEventListener('click', showBox);
    boxInput.addEventListener('input', dayCheck);
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
    if ((event.key==='Enter')&&(computedStyle.color==='rgb(0, 0, 0)')) {
        console.log(boxInput.value);
        // store birthday
        UserBirthDay = boxInput.value;
        let curDialogue = document.querySelector('.dialogue-text');
        curDialogue.textContent = 'Curious! Now, what month were you born? (enter to proceed)';
        boxInput.removeEventListener('input', dayCheck);
        boxInput.removeEventListener('keydown', handleKeyDownDay);
        boxInput.value = '';
        boxInput.placeholder = 'mm';
        boxInput.addEventListener('input', monthCheck);
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
    if ((event.key==='Enter')&&(computedStyle.color==='rgb(0, 0, 0)')) {
        console.log(boxInput.value);
        // store birth month
        UserBirthMonth = boxInput.value;
        let curDialogue = document.querySelector('.dialogue-text');
        curDialogue.textContent = 'Oh! Do tell me the year you were born (enter to proceed)';
        boxInput.removeEventListener('input', monthCheck);
        boxInput.removeEventListener('keydown', handleKeyDownMonth);
        boxInput.value = '';
        boxInput.placeholder = 'yyyy';
        boxInput.addEventListener('input', yearCheck);
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
    if ((event.key==='Enter')&&(computedStyle.color==='rgb(0, 0, 0)')) {
        console.log(boxInput.value);
        // store birth year
        UserBirthYear = boxInput.value;
        let curDialogue = document.querySelector('.dialogue-text');
        curDialogue.textContent = 'Finally, tell me what your current mood is';
        boxInput.removeEventListener('input', yearCheck);
        boxInput.removeEventListener('keydown', handleKeyDownYear);
        boxInput.value = '';
        boxInput.placeholder = 'Anything';
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
        // remove the input box
        console.log(boxInput.value);
        // store mood
        UserMood = boxInput.value;
        boxInput.value = '';
        boxInput.hidden = true;
        let curDialogue = document.querySelector('.dialogue-text');
        curDialogue.textContent = 'The stars have given their answer!';
        boxInput.removeEventListener('input', checkMood);
        boxInput.removeEventListener('keydown', handleKeyDownMood);
        boxInput.removeEventListener('input', inputCheck(/.*/));

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
function showPred() {
    const arrowElement = document.querySelector('.arrow');
    let curDialogue = document.querySelector('.dialogue-text');

    // based on UserBirthDay, UserBirthMonth, UserBirthYear, UserMood
    // generate response
    let userBirthMonthDay = getMonthString(UserBirthMonth) + ' ' + UserBirthDay;
    let UserConstellation = getConstellation(userBirthMonthDay);
    let response = GetJsonResponse(UserConstellation, UserBirthDay, UserBirthMonth, UserBirthYear, UserMood);
    // add the fortune card to local storage
    let new_fortunes = {"name": UserConstellation,"id": Date.now(), "text": response};
    addFortuneCard(new_fortunes);
    // update the dortune card list
    updateFortuneCardList();

    curDialogue.textContent = response;
    
    arrowElement.removeEventListener('click', showPred);
    arrowElement.addEventListener('click', boxInit);
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