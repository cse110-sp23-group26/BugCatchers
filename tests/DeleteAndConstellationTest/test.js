// test.js
// test cases


window.onload = function() {
    const fortuneCards = [
        {
            "name": "Rui Li",
            "id": "1",
            "fortuneText": "May 11"
        },
        {
            "name": "AAAA",
            "id": "2",
            "fortuneText": "Jan21"
        },
        {
            "name": "BBBB",
            "id": "3",
            "fortuneText": "march11"
        },
        {
            "name": "CCCC",
            "id": "4",
            "fortuneText": "dEC 21"
        },
        {
            "name": "DDDD",
            "id": "5",
            "fortuneText": "April 30"
        }
    ]

    document.getElementById('addCards').addEventListener('click', function() {
        // Write test cases to localStorage
        localStorage.setItem('FortunesCard', JSON.stringify(fortuneCards));

        // Clear any existing cards
        const mainElement = document.querySelector('main');
        const existingCards = mainElement.querySelectorAll('.fortune-card');
        existingCards.forEach(card => card.remove());

        // Retrieve cards from localStorage and add to main element
        const cardsData = JSON.parse(localStorage.getItem('FortunesCard'));
        cardsData.forEach(cardData => {
            const cardElement = document.createElement('div');
            cardElement.className = 'fortune-card';
            
            const nameElement = document.createElement('div');
            nameElement.className = 'fc-name';
            nameElement.textContent = cardData.name;
            cardElement.appendChild(nameElement);

            const idElement = document.createElement('div');
            idElement.className = 'fc-id';
            idElement.textContent = cardData.id;
            cardElement.appendChild(idElement);

            const textElement = document.createElement('div');
            textElement.className = 'fc-text';
            let Constellation = getConstellation(cardData.fortuneText);
            textElement.textContent = Constellation;
            cardElement.appendChild(textElement);

            const imgElement = document.createElement('img');
            imgElement.className = 'fc-constellation';
            imgElement.src = `../../src/assets/constellation/${Constellation}.png`;
            imgElement.alt = `${Constellation}`;
            cardElement.appendChild(imgElement);

            const lineBreak = document.createElement("br");
            cardElement.appendChild(lineBreak);

            const buttonElement = document.createElement('button');
            buttonElement.className = 'fc-delete';
            buttonElement.textContent = 'DELETE'; // Added text for demonstration purposes
            cardElement.appendChild(buttonElement);

            // add the delete lister here
            addDeleteListener(buttonElement);

            mainElement.appendChild(cardElement);
        });
    });

}