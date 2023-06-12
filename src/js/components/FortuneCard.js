import { getConstellationInfo } from "../util/getConstellationColor.js";
import { updateFortuneCardList } from "../main-app.js";

/**
 * Class representing a fortune card element that appears in the left sidebar when clicking the green leaf icon.
 * @extends HTMLElement
 */
class FortuneCard extends HTMLElement {
  /**
   * Creates a FortuneCard element.
   */
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.fortuneCardContent = document.createElement("div");
    const style = document.createElement("style");

    style.innerHTML = `
		div {
			position: relative;
			font-size: 12px;
			font-family: "Nunito", sans-serif;
			background-color: #348AA7;
			color: white;
			padding: 25px;
			margin: 15px;
			border-radius: 20px;
			width: 70%;
			transition: transform 0.2s;
		}
		.fc-image {
			display: block;
			margin: 0 auto;
			width: 50px;
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
		}
		.fc-mood {
			position: absolute;
			bottom: 35px;
			right: 16px;
			font-size: 12px;
			color: white;
			font-style: italic;
		}
		.fc-time {
			position: absolute;
			bottom: 20px;
			right: 16px;
			font-size: 12px;
			color: white;
			font-style: italic;
		}
		`;
    shadow.appendChild(style);
    shadow.appendChild(this.fortuneCardContent);
    this.fortuneCardContent.addEventListener("mouseenter", () =>
      this.handleMouseEnter()
    );
    this.fortuneCardContent.addEventListener("mouseleave", () =>
      this.handleMouseLeave()
    );
  }

  handleMouseEnter() {
    this.fortuneCardContent.style.transform = "scale(1.1)";
  }

  handleMouseLeave() {
    this.fortuneCardContent.style.transform = "scale(1)";
  }

  /**
   * Sets various values of the FortuneCard element.
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

    const fortuneCardContent = this.shadowRoot.querySelector("div");
    // zodiacInfo[0]: zodiac info
    // zodiacInfo[1]: zodiac color
    // eslint-disable-next-line no-undef
    const zodiacInfo = getConstellationInfo(data.name);

    //zodiac image
    const image = document.createElement("img");
    image.classList.add("fc-image");
    image.src = `assets/constellation/big/white/${data.name}.png`;

    // mood and time
    const moodParagraph = document.createElement("p");
    moodParagraph.classList.add("fc-mood");
    moodParagraph.textContent = `${data.mood}`;
    const timeParagraph = document.createElement("p");
    timeParagraph.classList.add("fc-time");
    timeParagraph.textContent = `${data.time}`;

    // delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("fc-delete");
    Object.assign(deleteButton.style, closeButtonStyles);

    // append content to fortune card
    fortuneCardContent.innerHTML = "";
    fortuneCardContent.appendChild(image);
    fortuneCardContent.appendChild(moodParagraph);
    fortuneCardContent.appendChild(timeParagraph);
    fortuneCardContent.appendChild(deleteButton);
    fortuneCardContent.style.backgroundColor = zodiacInfo[1];

    deleteButton.addEventListener("click", (event) => {
      // get the ancestor element fortune-card where the click happened
      // and record the id
      const fortuneCard = event.target.getRootNode().host;
      const id = data.id;

      // delete the corresponding data from localStorage
      let fortunes = JSON.parse(localStorage.getItem("FortunesCard"));
      fortunes = fortunes.filter((fortune) => fortune.id !== id);
      localStorage.setItem("FortunesCard", JSON.stringify(fortunes));

      // delete the fortune card from html
      fortuneCard.remove();
      // eslint-disable-next-line no-undef
      updateFortuneCardList();
      event.stopPropagation();
    });

    fortuneCardContent.addEventListener("click", () => {
      const fortuneModal = document.createElement("fortune-modal");
      const modalText = data["modal-text"] ? data["modal-text"] : data.text;
      fortuneModal.data = {
        name: data.name,
        id: data.id,
        text: data.text,
        birthday: data.birthday,
        mood: data.mood,
        time: data.time,
        "modal-text": modalText,
      };

      document.querySelector("body").appendChild(fortuneModal);
    });
  }
}

customElements.define("fortune-card", FortuneCard);

const closeButtonStyles = {
  background: `url("assets/trash_bin-modified.png") no-repeat`,
  backgroundSize: "contain",
  border: "none",
  width: "45px",
  height: "45px",
  cursor: "pointer",
};
