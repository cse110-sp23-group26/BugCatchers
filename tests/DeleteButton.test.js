import { JSDOM } from "jsdom";
const getConstellation = require('../src/js/util/GetConstellation.js');
const addDeleteListener = require('../src/js/DeleteFortuneCard.js"');

describe('Testing the delete functionality of the button in the fortune card', () => {
  let dom;
  let container;

  beforeEach(() => {
    dom = new JSDOM(`
    <div id="main">
      <button id = "addCards">Add Fortune Cards</button>
    </div>
    `);
    container = dom.window.document.querySelector("#main");
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
      removeItem: jest.fn()
    };
  });

  it('should delete the card when the delete button is clicked', async () => {
    // test cases
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

    global.localStorage.getItem.mockReturnValueOnce(JSON.stringify(fortuneCards));

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
            // if delete button clicked, the fortune card data in localstorage with same id would be deleted
            // and the fortune card div in html also be deleted
            addDeleteListener(buttonElement);

            mainElement.appendChild(cardElement);
        });
    });
    
    const button = container.querySelector('#addCards');
    button.dispatchEvent(new dom.window.Event('click'));

    // 延时以等待 DOM 更新
    await new Promise(r => setTimeout(r, 100));

    const cardElements = container.querySelectorAll('.fortune-card');
    expect(cardElements.length).toBe(fortuneCards.length);
    for (let cardElement of cardElements) {
      expect(cardElement).toBeInTheDocument();
    }

    const deleteButton = cardElements[0].querySelector('.fc-delete');
    deleteButton.dispatchEvent(new dom.window.Event('click'));

    // 延时以等待 DOM 更新
    await new Promise(r => setTimeout(r, 100));

    expect(cardElements[0]).not.toBeInTheDocument();
    expect(localStorage.removeItem).toHaveBeenCalledWith(fortuneCards[0].id);
  });
});