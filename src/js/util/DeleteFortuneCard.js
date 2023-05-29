// DeleteFortuneCards.js

// Assume the structure of the fortune card would be:
// <div class="fortune-card">
//   <div class="fc-name">...</div>
//   <div class="fc-id">...</div>
//   <div class="fc-text">...</div>
//   <button class="fc-delete">
//     <img src="<insert trash can icon.svg>"></img>
//   </button>
// </div>

// Assume the fortune data in localstorage:
// {
//     "name": "Celeste",
//     "id": "lsdkjfpoweihgpoh",
//     "fortuneText": "this is your fortune"
// }

// If you use a custom element, replace fortune-card with your custon element
// I assume the keyword of the fortune card in localstorage is 'FortunesCard', replace it if it is not


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Every time when you create a new fortune card, you created a DELETE button
// Then call this funcion to add the event listener
// Check tests/DeleteAndConstellationTest/ for this example: 
/*
const buttonElement = document.createElement('button');
buttonElement.className = 'fc-delete';
buttonElement.textContent = 'DELETE'; // Added text for demonstration purposes
cardElement.appendChild(buttonElement);

// add the delete lister here
addDeleteListener(buttonElement);
*/

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/*
function addDeleteListener(button) {
    button.addEventListener('click', function(event) {
        // get the ancestor element fortune-card where the click happened
        // and record the id
        const fortuneCard = event.target.closest('.fortune-card');
        const idElement = fortuneCard.querySelector('.fc-id');
        const id = idElement.textContent;
      
        // delete the corrsponsand data from localStorage
        let fortunes = JSON.parse(localStorage.getItem('FortunesCard'));
        fortunes = fortunes.filter(fortune => fortune.id !== id);
        localStorage.setItem('FortunesCard', JSON.stringify(fortunes));
  
        // delete the fortune card from html
        fortuneCard.remove();
    });
}
*/