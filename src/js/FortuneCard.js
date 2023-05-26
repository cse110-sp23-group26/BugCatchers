class FortuneCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
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
        shadow.appendChild(div);
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
        if(!data) return;

        const div = this.shadowRoot.querySelector("div");
        div.innerHTML = `
            <p class="fc-text">${data.text}</p><br><br>
            <p class="fc-name">${data.name}</p>
            <button class="fc-delete">
            DELETE
            </button>
        `;
    }
}

customElements.define("fortune-card", FortuneCard);