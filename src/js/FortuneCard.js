class FortuneCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const div = document.createElement("div");
        const style = document.createElement("style");
        style.innerHTML = "";
        shadow.append(style, div);
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
        <<div class="fc-name">${data.name}</div>
        <div class="fc-id">${data.id}</div>
        <div class="fc-text">${data.text}</div>
        <button class="fc-delete">
          <img src="<insert trash can icon.svg>"></img>
        </button>
        `;
    }
}

customElements.define("fortune-card", FortuneCard);