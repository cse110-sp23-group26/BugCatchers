window.addEventListener('DOMContentLoaded', init);

function init() {
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

    document.querySelector("body").appendChild(fortuneCard);
    document.querySelector("body").appendChild(fortuneCard2);
}