class BookPreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Use Shadow DOM for encapsulation
    }

    static get observedAttributes() {
        return ['author', 'id', 'image', 'title'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        const { author, id, image, title } = this.attributes;
        this.shadowRoot.innerHTML = `
            <style>
              
            </style>
            <button class="preview" data-preview="${id.value}">
                <img class="preview__image" src="${image.value}" />
                <div class="preview__info">
                    <h3 class="preview__title">${title.value}</h3>
                    <div class="preview__author">${author.value}</div>
                </div>
            </button>
        `;
    }

    addEventListeners() {
        this.shadowRoot.querySelector('.preview').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('book-preview-clicked', {
                detail: { id: this.getAttribute('id') },
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define('book-preview', BookPreview);
