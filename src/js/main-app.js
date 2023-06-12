import {startDialogueSequence} from "./util/getUserInput";
import {initializeCheckIn, checkIn} from "./util/checkIn";

window.addEventListener("DOMContentLoaded", init);

function init() {
	// Default variables to set (i.e Celeste's name, default welcoming message etc.)
	const WELCOME_MSG = "Hello child! What can I do for you?";

	// --------------------------START OF DIALOGUE SEQUENCE-----------------------
	// TODO: store username somewhere
	/**
	 * This block of code is from "./util/GetUserInput.js" that operates 
	 * on the user input. Currently the work flow is fine but need to call
	 * on some prediction function, based on user input, from "GetUserInput.js"
	 */
	let curName = "Celeste";
	// eslint-disable-next-line no-undef
	startDialogueSequence(WELCOME_MSG, curName);
	// ---------------------------END OF DIALOGUE SEQUENCE------------------------

	// --------------------------init check-in system-----------------------
	// this fcuntion in js/util/CheckIn.js
	// eslint-disable-next-line no-undef
	initializeCheckIn();
	// add event listener to check in button
	// this fcuntion in js/util/CheckIn.js
	document.getElementById("check-in-button").addEventListener("click", function () {
		// eslint-disable-next-line no-undef
		let result = checkIn();
		// Update the display
		document.getElementById("last-check-in-date").textContent = "Last Check-In: " + result.date;
		document.getElementById("check-in-count").textContent = "Count: " + result.count;
	});
	// --------------------------end of init check-in system-----------------------


	// --------------------------FORTUNE CARD LIST MENU-----------------------
	// FortuneCardList listeners
	const menu = document.getElementById("menu");
	const cardList = document.getElementById("card-list");
	const overlay = createOverlay();
	overlay.addEventListener("click", () => {
		menu.click();
	});

	// Add a click event listener to toggle the visibility of the content
	menu.addEventListener("click", () => {
		// check if the List is opening right now
		if (cardList.content.style.display === "none") {
			// create List title
			const ListTitle = document.createElement("h2");
			ListTitle.classList.add("fc-list-title");
			ListTitle.textContent = "Saved Fortune!";
			// Apply the styles
			Object.assign(ListTitle.style, ListTitleStyles);
			cardList.content.appendChild(ListTitle);
			
			// Read from localstorage
			let fortunes = JSON.parse(localStorage.getItem("FortunesCard")) || [];
			// issue #41, if no data in fortunes, add a fortune card said no recording
			if (fortunes.length == 0){
				const emptyFortuneCardList = document.createElement("p");
				emptyFortuneCardList.classList.add("fc-list-empty");
				emptyFortuneCardList.textContent = "no content";
				// Apply the styles
				Object.assign(emptyFortuneCardList.style, emptyFortuneCardListStyles);
				cardList.content.appendChild(emptyFortuneCardList);
			}

			for (let fortune of fortunes) {
				const fortuneCard = document.createElement("fortune-card");
				fortuneCard.data = fortune;
				// Add to HTML
				cardList.content.appendChild(fortuneCard);
			}

			// add close button on right buttom
			const closeButton = document.createElement("button");
			closeButton.classList.add("fc-list-close-btn");

			Object.assign(closeButton.style, closeButtonStyles);

			closeButton.addEventListener("click", e => {
				const menu = document.getElementById("menu");
				menu.click();
				e.stopPropagation();
			});

			cardList.content.appendChild(closeButton);
			cardList.content.style.display = "block";
			cardList.style.zIndex = "11";
			// add the overlay
			overlay.style.display = "block";
		} else {
			cardList.content.innerHTML = "";
			overlay.style.display = "none";
			cardList.content.style.display = "none";
		}
	});
	// --------------------------END OF FORTUNE CARD LIST MENU-----------------------
}



// update the fortune card list by simply click the menu button twice
export function updateFortuneCardList(){
	const menu = document.getElementById("menu");
	menu.click();
	menu.click();
}


const ListTitleStyles = {
	position: "relative",
	fontFamily: "Nunito, sans-serif",
	margin: "15px",
	fontWeight: "bold",
};
const closeButtonStyles = {
	position: "relative",
	left: "70%", 
	background: `url("assets/close_button.png") no-repeat`,
	backgroundSize: "contain",
	border: "none",
	width: "100px",
	height: "35px",
	cursor: "pointer"
};
const emptyFortuneCardListStyles = {
	color: "grey",
	position: "relative",
	fontFamily: "Nunito, sans-serif",
	margin: "15px",
	fontWeight: "bold",
};

// create the overlay when we open the fortune card list
function createOverlay(){
	const overlay = document.createElement("div");
	overlay.id = "overlay";
	document.body.appendChild(overlay);

	// set over lay style
	overlay.style.position = "fixed";
	overlay.style.top = "0";
	overlay.style.left = "0";
	overlay.style.width = "100%";
	overlay.style.height = "100%";
	overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
	overlay.style.display = "none";
	overlay.style.zIndex = "10";
	return overlay;
}