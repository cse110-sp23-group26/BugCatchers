class FortuneModal extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });

		const container = document.createElement("div");
		container.setAttribute("class", "container");
		const fortuneModalContent = document.createElement("div");
		fortuneModalContent.setAttribute("id", "content");

		const style = document.createElement("style");
		style.textContent = `
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

	set data(data) {
		if (!data) return;

		const fortuneCardContent = this.shadowRoot.getElementById("content");
		const container = this.shadowRoot.querySelector(".container");

		this.createTitle(fortuneCardContent, data);
		this.createTextParagraph(fortuneCardContent, data);
		this.createImageContainer(fortuneCardContent, data);
		this.createZodiacParagraph(fortuneCardContent, data);

		container.addEventListener("click", () => {
			this.remove();
		});
	}

	createTitle(parentElement, data) {
		const title = document.createElement("h1");
		title.classList.add("fc-title");
		title.textContent = data.name;
		parentElement.appendChild(title);
	}

	createTextParagraph(parentElement, data) {
		const textParagraph = document.createElement("p");
		textParagraph.classList.add("fc-text");
		textParagraph.textContent = data.text;
		parentElement.appendChild(textParagraph);
	}

	createImageContainer(parentElement, data) {
		const image = document.createElement("img");
		image.src = `assets/constellation/big/white/${data.name}.png`;
		image.classList.add("fc-image");

		const imageContainer = document.createElement("div");
		imageContainer.classList.add("fc-image-container");
		imageContainer.appendChild(image);
		parentElement.appendChild(imageContainer);
	}

	createZodiacParagraph(parentElement, data) {
		const zodiacInfo = getConstellationInfo(data.name);
		const zodiacParagraph = document.createElement("p");
		zodiacParagraph.classList.add("zodiac-text");
		zodiacParagraph.textContent = zodiacInfo[0];
		parentElement.appendChild(zodiacParagraph);
		parentElement.style.backgroundColor = zodiacInfo[1];
	}
}

customElements.define("fortune-modal", FortuneModal);