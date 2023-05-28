
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Rui Li's edit 28/05/23:
// Added a json 'fortunes' which contains 2 test fortune card to local storage 
// Instead add fortune cards to html body, added it to a <div class = "fortuneCardList">

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



window.addEventListener('DOMContentLoaded', init);

function init() {
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
    localStorage.setItem('FortunesCard', JSON.stringify(fortunes));

    // create fortune card and append it to 
    const fortuneCard = document.createElement("fortune-card");
    fortuneCard.data = {
        "name": "Celeste",
        "id": "fortune1",
        "text": "you will not die soon probably"
    }
    const fortuneCard2 = document.createElement("fortune-card");
    fortuneCard2.data = {
        "name": "Celeste",
        "id": "fortune2",
        "text": "you will literally explode"
    }
    const fortuneCardList = document.querySelector(".fortuneCardList");
    fortuneCardList.appendChild(fortuneCard);
    fortuneCardList.appendChild(fortuneCard2);

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
}
