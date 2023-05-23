window.addEventListener('DOMContentLoaded', init);

function init() {
    const fortuneCard = document.createElement("fortune-card");
    fortuneCard.data = {
        "name": "Fortune",
        "id": "fortune1",
        "text": "you will not die soon probably"
    }

    document.querySelector("body").appendChild(fortuneCard);
}