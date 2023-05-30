
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Rui Li's edit 28/05/23:
// Added a json 'fortunes' which contains 2 test fortune card to local storage 
// Instead add fortune cards to html body, added it to a <div class = "fortuneCardList">

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

window.addEventListener('DOMContentLoaded', init);

function init() {
    // Default variables to set (i.e Celeste's name, default welcoming message etc.)
    const WELCOME_MSG = 'Hello user! What can I do for you?'

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
    let curName = 'Celeste';
    welcomeResponse(curName, WELCOME_MSG);


    // FortuneCardList listeners
    const menu = document.getElementById("menu");
    const CardList = document.getElementById("CardList");
    // Add a click event listener to toggle the visibility of the content
    menu.addEventListener('click', () => {
        if (CardList.content.style.display === 'none') {
            // Read from localstorage
            let fortunes = JSON.parse(localStorage.getItem('FortunesCard')) || [];
            let i = 0;
            while (i < fortunes.length) {
                const fortuneCard = document.createElement("fortune-card");
                fortuneCard.data = fortunes[i];
                // Add to HTML
                CardList.content.appendChild(fortuneCard);
                i++;
            }
            CardList.content.style.display = 'block';
        } else {
            CardList.content.innerHTML = '';
            CardList.content.style.display = 'none';
        }
    });
    
}


