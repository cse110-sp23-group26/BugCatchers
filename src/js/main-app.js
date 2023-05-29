
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Rui Li's edit 28/05/23:
// Added a json 'fortunes' which contains 2 test fortune card to local storage 
// Instead add fortune cards to html body, added it to a <div class = "fortuneCardList">

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

window.addEventListener('DOMContentLoaded', init);

function init() {
    // Default variables to set (i.e Celeste's name, default welcoming message etc.)
    speakerName = 'Celeste';
    welcomeMsg = 'Hello user! What can I do for you? Hello user! What can I do for you?'

    // set those two data to local storage
    const fortunes = [
        {
            "name": "Celeste",
            "id": "fortune1",
            "text": "you will not die soon probably"
        },
        {
            "name": "Celeste",
            "id": "fortune2",
            "text": "you will literally explode"
        }
    ]
    // Add fortune cards to local storage and HTML
    for (let fortune of fortunes) {
        addFortuneCard(fortune);
    }

    // init check-in system
    // this fcuntion in js/util/CheckIn.js
    initializeCheckIn();
    // add event listener to check in button
    // this fcuntion in js/util/CheckIn.js
    document.getElementById('check-in-button').addEventListener('click', function() {
        let result = checkIn();
        // Update the display
        document.getElementById('last-check-in-date').textContent = 'Last Check-In: ' + result.date;
        document.getElementById('check-in-count').textContent = 'Count: ' + result.count;
    });

    // TODO: get username
    // insert default text to the character and dialogue blobs
    let speakerContainer = document.querySelector('.speaker');
    let dialogueContainer = document.querySelector('.dialogue-text');
    speakerContainer.textContent = speakerName;
    dialogueContainer.textContent = welcomeMsg;

    // get input if user click the DOWN arrow
    const arrowElement = document.querySelector('.arrow');
    // Add click event listener to the arrow element
    arrowElement.addEventListener('click', () => {
        // Event handler code here
        console.log('Arrow clicked!');
        let curDialogue = document.querySelector('.dialogue-text')
        curDialogue.textContent = 'Would you like to know what the stars say about your futures?'

        // switch the DOWN arrow with a yes button
        
    });
    
}


