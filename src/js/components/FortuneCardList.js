/**
 * Class representing the left sidebar containing fortune cards that appears when clicking the green leaf icon.
 * @extends HTMLElement
 */
class FortuneCardList extends HTMLElement {
	/**
	 * Creates a FortuneCardList element.
	 */
	constructor() {
		super();

		// Create a shadow root
		this.attachShadow({ mode: 'open' });

		// Create a container element for the content
		this.container = document.createElement('div');
		this.container.setAttribute('id', 'content-container');

		// Create the content element
		this.content = document.createElement('div');
		this.content.style.display = 'none';

		// Make scrollable
		this.content.classList.add('scrollable-div');
		this.content.style.overflow = 'auto';
		this.content.style.maxHeight = '600px';
		this.content.style.border = '8px solid #ccc';
		this.content.style.borderRadius = '25px';
		this.content.style.backgroundColor = '#ECDFCD';

		// Add the content element to the container
		this.container.appendChild(this.content);

		// Append the container to the shadow root
		this.shadowRoot.appendChild(this.container);
	}
}

// Define the custom element for the web component
customElements.define('click-to-show', FortuneCardList);
