class FortuneCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        const style = document.createElement("style");
        style.innerHTML = `
        * {
            font-size: 36px;
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
        if(!data) {
            console.log("how did we get here");
            return;
        }

        const div = this.shadowRoot.querySelector("div");
        div.innerHTML = `
            <p class="fc-name">${data.name}</div>
            <p class="fc-id">${data.id}</div>
            <p class="fc-text">${data.text}</div><br><br>
            <button class="fc-delete">
            DELETE
            </button>
        `;
    }
}

customElements.define("fortune-card", FortuneCard);