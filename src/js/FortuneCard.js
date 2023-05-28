// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Rui's edit 28/05/23:
// changed the variable name div to fortuneCardContent
// changed the innerhtml staff to create element and append it to fortuneCardContent
// add the delete button funtion:
//     when delete clicked:
//     delete the element in localstorage with same id
//     remove fortune card from html

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

class FortuneCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const fortuneCardContent = document.createElement("div");
        const style = document.createElement("style");
        style.innerHTML = `
        div {
            position: relative;
            font-size: 25px;
            font-family: 'Nunito', sans-serif;
            background-color: #348AA7;
            color: white;
            padding: 25px;
            margin: 15px;
            border-radius: 20px;
            width: 30%;
        }

        .fc-name {
            position: absolute;
            bottom: 8px;
            right: 16px;
            font-size: 18px;
        }
        `;
        shadow.appendChild(style);
        shadow.appendChild(fortuneCardContent);
    }

    /**
     * Passed in as JSON format as follows:
     * 
     * {
     *      "name": ...
     *      "id": ...
     *      "text": ...
     *      "modal-text": ... (only displayed when fortune is clicked)
     * }
     */
    set data(data) {
        if (!data) return;

        const fortuneCardContent = this.shadowRoot.querySelector("div");

        const textParagraph = document.createElement("p");
        textParagraph.classList.add("fc-text");
        textParagraph.textContent = data.text;

        const nameParagraph = document.createElement("p");
        nameParagraph.classList.add("fc-name");
        nameParagraph.textContent = data.name;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("fc-delete");
        deleteButton.textContent = "DELETE";

        fortuneCardContent.append(textParagraph, nameParagraph, deleteButton);

        deleteButton.addEventListener('click', (event) => {
            // get the ancestor element fortune-card where the click happened
            // and record the id
            console.log(event.target);
            const fortuneCard = event.target.getRootNode().host;
            const id = data.id;

            // delete the corresponding data from localStorage
            let fortunes = JSON.parse(localStorage.getItem('FortunesCard'));
            fortunes = fortunes.filter(fortune => fortune.id !== id);
            localStorage.setItem('FortunesCard', JSON.stringify(fortunes));

            // delete the fortune card from html
            fortuneCard.remove();
        });
    }
}

customElements.define("fortune-card", FortuneCard);
