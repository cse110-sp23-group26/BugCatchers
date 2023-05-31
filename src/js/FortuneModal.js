class FortuneModal extends HTMLElement {
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
        }
        `;

        container.appendChild(fortuneModalContent);
        shadow.appendChild(style);
        shadow.appendChild(container);
    }

    /**
     * Passed in as JSON format as follows:
     * 
     * {
     *      "name": ...
     *      "id": ...
     *      "text": ...
     * }
     */
    set data(data) {
        if (!data) return;

        const fortuneCardContent = this.shadowRoot.getElementById("content");
        const container = this.shadowRoot.querySelector(".container");

        const textParagraph = document.createElement("p");
        textParagraph.classList.add("fc-text");
        textParagraph.textContent = data.text;

        const nameParagraph = document.createElement("p");
        nameParagraph.classList.add("fc-name");
        nameParagraph.textContent = data.name;

        fortuneCardContent.append(textParagraph, nameParagraph);

        container.addEventListener("click", () => {
            this.remove();
        });
    }
}

customElements.define("fortune-modal", FortuneModal);