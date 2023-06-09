/**
 * Class representing the popup that appears when clicking on a fortune card.
 * @extends HTMLElement
 */
class FortuneModal extends HTMLElement {
	/**
	 * Creates a FortuneModal element.
	 */
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });
	
		const container = document.createElement("div");
		container.setAttribute("class", "container");
		const fortuneModalContent = document.createElement("div");
		fortuneModalContent.setAttribute("id", "content");
	
		const style = document.createElement("style");
		style.innerHTML = `
		html, body {
			height: 100%;
			margin: 0;
		}

		.container {
			height: 100%;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.6);
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 12;
		}

		.fc-title {
			font-size: 36px;
			font-weight: bold;
			color: white;
			text-align: center;
		}

		.fc-image {
			display: block;
			margin: 0 auto;
			width: 150px;
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
		}

		.fc-text {
			text-align: center;
		}

		.zodiac-text {
			text-align: center;
			color: #BCCCDC;
			font-style: italic;
		}

		.fc-image-container {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		#content {
			position: relative;
			font-size: 18px;
			font-family: 'Nunito', sans-serif;
			background-color: #348AA7;
			color: white;
			padding: 25px;
			margin: 15px;
			border-radius: 20px;
			width: 40%;
			height: 60%;
			z-index: 13;
		}
		`;
	
		container.appendChild(fortuneModalContent);
		shadow.appendChild(style);
		shadow.appendChild(container);
	}
	
	/**
	 * Sets various values of the FortuneModal element.
	 * 
	 * @param {object} data - Passed in as JSON format as follows:
	 * {
	 *      "name": ...string
	 *      "id": ...num
	 *      "text": ...string
	 *      "birthday": ...string
	 *      "mood": ...string
	 *      "time": ...string
	 *      "modal-text": ... (only displayed when fortune is clicked)
	 * }
	 */
	set data(data) {
		if (!data) return;
	
		const fortuneCardContent = this.shadowRoot.getElementById("content");
		const container = this.shadowRoot.querySelector(".container");
		// zodiac title
		const title = document.createElement("h1");
		title.classList.add("fc-title");
		title.textContent = data.name;
		// fortune response
		const textParagraph = document.createElement("p");
		textParagraph.classList.add("fc-text");
		textParagraph.textContent = data.text;
		// zodiac img
		const image = document.createElement("img");
		image.src = `assets/constellation/big/white/${data.name}.png`;
		image.classList.add("fc-image");
	
		const zodiacInfo = getConstellationInfo(data.name);
		// zodiacInfo[0]: zodiac info
		// zodiacInfo[1]: zodiac color
		const zodiacParagraph = document.createElement("p");
		zodiacParagraph.classList.add("zodiac-text");
		zodiacParagraph.textContent = zodiacInfo[0];
	
		const imageContainer = document.createElement("div");
		imageContainer.classList.add("fc-image-container");
		imageContainer.appendChild(image);
	
		fortuneCardContent.append(title, textParagraph, imageContainer, zodiacParagraph);
		fortuneCardContent.style.backgroundColor = zodiacInfo[1];
	
		container.addEventListener("click", () => {
			this.remove();
		});
	}
}
  
customElements.define("fortune-modal", FortuneModal);
  