
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
}