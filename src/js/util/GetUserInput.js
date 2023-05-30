function welcomeResponse(speakerName, welcomeMsg) {
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

        getInputs();
    });
}

function getInputs() {
    // get input if user click the DOWN arrow
    const arrowElement = document.querySelector('.arrow');
    arrowElement.addEventListener('click', () => {
        // want to hide the svg event & disable pointer event
        arrowElement.style.display = 'none';
        arrowElement.style.pointerEvents = 'none';

        // update the prompt
        let curDialogue = document.querySelector('.dialogue-text');
        curDialogue.textContent = 'Oh! Do tell me the year you were born (enter to proceed)';

        // locate the container where all interactivity take place
        // and update the position
        const boxInput = document.querySelector('#dataInput');
        boxInput.style.letterSpacing = '12px';
        boxInput.placeholder = 'yyyy';
        boxInput.removeAttribute('hidden');

        // TODO: tell the user to press enter in order to proceed
        // want to do a mouse hovering event but will fix it later

        // validity check of the input
        boxInput.addEventListener('input', () => {
            const inputValue = boxInput.value;
            if (/^\d{4}$/.test(inputValue)) {
                boxInput.style.color = 'black'; // Set text color to black
            } else {
                boxInput.style.color = 'red'; // Set text color to red
            }
        });

        // if press enter, proceed to the next question
        boxInput.addEventListener('keydown', (event) => {
            if ((event.key==='Enter')&&(boxInput.style.color==='black')) {
                curDialogue.textContent = 'Finally, tell me what your current mood is';
                boxInput.style.letterSpacing = 'normal';
                boxInput.removeAttribute('placeholder');
                // TODO: this is where we need to take care of the long inputs

            }
        });
    });
}