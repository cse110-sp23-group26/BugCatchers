function dialogueGo(speakerName, welcomeMsg) {
    let speakerContainer = document.querySelector('.speaker');
    let dialogueContainer = document.querySelector('.dialogue-text');
    speakerContainer.textContent = speakerName;
    dialogueContainer.textContent = welcomeMsg;

    // get input if user click the DOWN arrow
    const arrowElement = document.querySelector('.arrow');
    // Add click event listener to the arrow element
    arrowElement.addEventListener('click', () => {
        // proceed dialogue text
        let curDialogue = document.querySelector('.dialogue-text');
        curDialogue.textContent = 'Would you like to know what the stars say about your futures?';

        // change arrow avg into yes text box
        const rect = `
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" rx="10" ry="10" fill="#1e3799"/>
                <!-- this is for the extra style of the rectangular box
                    <rect width="100%" height="100%" rx="10" ry="10" fill="url(#pattern)"/>
                -->
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff">Yes!</text>
                </svg>
        `;
        arrowElement.innerHTML = rect;

        // CONVERTION: move the rectangle upward and increase its size
        arrowElement.style.bottom = '10%'; // originally 0
        arrowElement.style.width = '80'; // originally 45
        arrowElement.style.height = '50'; // originally 25        

        // TODO: tell the user to press enter in order to proceed
            // want to do a mouse hovering event but will fix it later

        boxInit();
        const boxInput = document.querySelector('#dataInput');
        boxInput.addEventListener('input', dayCheck);
    });
}

function boxInit() {
    const arrowElement = document.querySelector('.arrow');
    arrowElement.addEventListener('click', () => {
        // want to hide the svg event & disable pointer event
        arrowElement.style.display = 'none';
        arrowElement.style.pointerEvents = 'none';

        const boxInput = document.querySelector('#dataInput');
        boxInput.removeAttribute('hidden');

        let curDialogue = document.querySelector('.dialogue-text');
        curDialogue.textContent = 'Now tell me, what day were you born? (enter to proceed)';
        boxInput.style.letterSpacing = '12px';
        boxInput.placeholder = 'dd';

        // boxInput.addEventListener('input', dayCheck);
    });
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
    const computedStyle = window.getComputedStyle(boxInput);

    // if validity check passes
    if (event.key==='Enter') {
        console.log(boxInput.value);
        boxInput.hidden = true;
        let curDialogue = document.querySelector('.dialogue-text');
        curDialogue.textContent = 'The stars have given their answer!';
        boxInput.removeEventListener('input', checkMood);
        boxInput.removeEventListener('keydown', handleKeyDownMood);

        // change arrow back
        const svg = document.querySelector('.arrow');
        const textElement = svg.querySelector('text');
        svg.style.display = "block";
        textElement.textContent = 'View Results!';
        console.log(svg);
        // const origArr = `
        //     <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M22.5 25C18.0184 25 7.59473 12.6404 1.55317 4.96431C-0.122281 2.83559 1.72264 -0.179893 4.39835 0.243337C10.2831 1.17415 18.2164 2.28736 22.5 2.28736C26.7836 2.28736 34.7169 1.17415 40.6017 0.243339C43.2774 -0.17989 45.1223 2.83559 43.4468 4.96431C37.4053 12.6404 26.9816 25 22.5 25Z" fill="white"/>
        //     </svg>
        // `;
        // arrowElement.innerHTML = origArr;
        // arrowElement.style.bottom = '0'; 
        // arrowElement.style.width = '45'; 
        // arrowElement.style.height = '25';
    }
} 

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

function arrowBack() {
    const arrowElement = document.querySelector('.arrow');
    arrowElement.addEventListener('click', () => {
        let curDialogue = document.querySelector('.dialogue-text');
        curDialogue.textContent = 'SHOULD INVOKE SOME FUNCTION TO GET PREDICTIONS HERE';
        arrowElement.addEventListener('click', () => {

        });
    });
}
