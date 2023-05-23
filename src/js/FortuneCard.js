class FortuneCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        const style = document.createElement("style");
        style.innerHTML = `
        div {
            font-size: 25px;
            font-family: 'Nunito', sans-serif;
            background-color: #348AA7;
            color: white;
            padding: 25px;
            border-radius: 20px;
            width: 30%;
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
     * }
     */
    set data(data) {
        if(!data) return;

        const div = this.shadowRoot.querySelector("div");
        div.innerHTML = `
            <h2 class="fc-name">${data.name}</h2>
            <p class="fc-text">${data.text}</p><br><br>
            <button class="fc-delete">
            DELETE
            </button>
        `;
    }
}

customElements.define("fortune-card", FortuneCard);