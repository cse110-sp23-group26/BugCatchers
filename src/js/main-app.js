
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Rui Li's edit 28/05/23:
// Added a json 'fortunes' which contains 2 test fortune card to local storage 
// Instead add fortune cards to html body, added it to a <div class = "fortuneCardList">

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

window.addEventListener('DOMContentLoaded', init);

function init() {
	// Default variables to set (i.e Celeste's name, default welcoming message etc.)
	const WELCOME_MSG = 'Hello child! What can I do for you?'

	// --------------------------START OF DIALOGUE SEQUENCE-----------------------
	// TODO: store username somewhere
	/**
	 * This block of code is from "./util/GetUserInput.js" that operates 
	 * on the user input. Currently the work flow is fine but need to call
	 * on some prediction function, based on user input, from "GetUserInput.js"
	 */
	let curName = 'Celeste';
	dialogueGo();
	// ---------------------------END OF DIALOGUE SEQUENCE------------------------


	// --------------------------init check-in system-----------------------
	// this fcuntion in js/util/CheckIn.js
	initializeCheckIn();
	// add event listener to check in button
	// this fcuntion in js/util/CheckIn.js
	document.getElementById('check-in-button').addEventListener('click', function () {
		let result = checkIn();
		// Update the display
		document.getElementById('last-check-in-date').textContent = 'Last Check-In: ' + result.date;
		document.getElementById('check-in-count').textContent = 'Count: ' + result.count;
	});
	// --------------------------end of init check-in system-----------------------


	// --------------------------FORTUNE CARD LIST MENU-----------------------
	// FortuneCardList listeners
	const menu = document.getElementById("menu");
	const CardList = document.getElementById("CardList");
	const OverLay = createOverLay();
	OverLay.addEventListener('click', () => {
		menu.click();
	});

	// Add a click event listener to toggle the visibility of the content
	menu.addEventListener('click', () => {
		// check if the List is opening right now
		if (CardList.content.style.display === 'none') {
			// create List title
			const ListTitle = document.createElement('h2');
			ListTitle.classList.add("fc-list-title");
			ListTitle.textContent = 'Saved Fortune!';
			// Apply the styles
			Object.assign(ListTitle.style, ListTitleStyles);
			CardList.content.appendChild(ListTitle);
			
			// Read from localstorage
			let fortunes = JSON.parse(localStorage.getItem('FortunesCard')) || [];
			// issue #41, if no data in fortunes, add a fortune card said no recording
			if (fortunes.length == 0){
				const emptyFortuneCardList = document.createElement('p');
				emptyFortuneCardList.classList.add("fc-list-empty");
				emptyFortuneCardList.textContent = 'no content';
				// Apply the styles
				Object.assign(emptyFortuneCardList.style, emptyFortuneCardListStyles);
				CardList.content.appendChild(emptyFortuneCardList);
			}
			for (let fortune of fortunes) {
				const fortuneCard = document.createElement("fortune-card");
				fortuneCard.data = fortune;
				// Add to HTML
				CardList.content.appendChild(fortuneCard);
			}

			// add close button on right buttom
			const closeButton = document.createElement('button');
			closeButton.classList.add("fc-list-close-btn");
			// closeButton.textContent = 'Close';
			Object.assign(closeButton.style, closeButtonStyles);
			closeButton.addEventListener('click', e => {
				const menu = document.getElementById("menu");
				menu.click();
				e.stopPropagation();
			});
			CardList.content.appendChild(closeButton);
			CardList.content.style.display = 'block';
			CardList.style.zIndex = '11'; 
			// add the OverLay
			OverLay.style.display = 'block';
		} else {
			CardList.content.innerHTML = '';
			OverLay.style.display = 'none';
			CardList.content.style.display = 'none';
		}
	});
	// --------------------------END OF FORTUNE CARD LIST MENU-----------------------
}



// update the fortune card list by simply click the menu button twice
function updateFortuneCardList(){
	const menu = document.getElementById("menu");
	menu.click();
	menu.click();
}


// /**
//  * Adds a button to the text box and adds an event listener for click that calls the action parameter
//  * @param buttonText is a string that represents the text that is on a button
//  */
// function addButtonToTextBox(buttonText) {
//     const button = document.createElement('button');
//     // Set button properties
//     button.textContent = buttonText; // Set the text content of the button
//     button.classList.add('yes-button'); // Add a CSS class for styling (optional)
//     button.disabled = false; // Set the disabled property (true or false)

//     // Apply button styles
//     button.style.padding = '10px 20px'; // Set padding
//     button.style.backgroundColor = 'blue'; // Set background color
//     button.style.color = 'white'; // Set text color
//     button.style.border = 'none'; // Remove border
//     button.style.cursor = 'pointer'; // Set cursor style

//     // Append the button to a parent element
//     const parentElement = document.querySelector(".interactive");
//     parentElement.innerHTML = '';
//     parentElement.appendChild(button);

//     button.addEventListener('click', async (event) => {
//         button.remove();
//         let birthday = await get_birthday();
//         let sign = await getConstellation(birthday);
		
//         let generators = [templete1,templete2,templete3,templete4,templete5];

//         let reponse = await generators[Math.floor(Math.random()*generators.length)](sign);

//         let curDialogue = document.querySelector('.dialogue-text')

//         // split responses and display
//         const arrowElement = document.querySelector('.arrow');
//         await split_and_display(reponse).then(arrowElement.style.display = 'block');

//         // add to local storage with random id.
//         let new_fortunes = {"name": "Celeste","id": Math.floor(Math.random() * (1000 - 0 + 1)) + 0, "text": reponse};
//         addFortuneCard(new_fortunes);
//         updateFortuneCardList();
//     });

// }

// function get_birthday() {
//     return "Jan 11";
// }

// async function split_and_display(string) {
//     let maxLength = 100;
//     const strings = [];
//     let index = 0;
//     let curDialogue = document.querySelector('.dialogue-text')
//     while (index < string.length) {
//       const substring = string.substring(index, index + maxLength);
//       strings.push(substring);
//       index += maxLength;
//     }


//     strings.forEach((text, index) => {
//         setTimeout(() => {
//             curDialogue.textContent = text;
//           // Alternatively, you can display the text in the DOM or perform other actions
//         }, index * 5000);
//       });

// }

const ListTitleStyles = {
	position: "relative",
	fontFamily: 'Nunito, sans-serif',
	margin: "15px",
	fontWeight: "bold",
};
const closeButtonStyles = {
	position: "relative",
	left: "70%", 
	background: `url('assets/close_button.png') no-repeat`,
	backgroundSize: 'contain', 
	border: 'none', 
	width: '100px', 
	height: '35px', 
	cursor: 'pointer'
};
const emptyFortuneCardListStyles = {
	color: "grey",
	position: "relative",
	fontFamily: 'Nunito, sans-serif',
	margin: "15px",
	fontWeight: "bold",
};
// create the OverLay when we open the fortune card list
function createOverLay(){
	const OverLay = document.createElement('div');
	OverLay.id = 'OverLay';
	document.body.appendChild(OverLay);

	// set over lay style
	OverLay.style.position = 'fixed';
	OverLay.style.top = '0';
	OverLay.style.left = '0';
	OverLay.style.width = '100%';
	OverLay.style.height = '100%';
	OverLay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	OverLay.style.display = 'none';
	OverLay.style.zIndex = '10';
	return OverLay;
}