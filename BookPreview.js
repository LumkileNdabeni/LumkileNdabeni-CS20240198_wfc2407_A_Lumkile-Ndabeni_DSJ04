class BookPreview extends HTMLElement {
  constructor() {
      super();
      // Attach a shadow DOM to encapsulate styles and markup
      this.attachShadow({ mode: 'open' });
  }

  // Specify which attributes to observe for changes
  static get observedAttributes() {
      return ['author', 'id', 'image', 'title'];
  }

  // Callback function that runs when an observed attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
          this.render(); // Re-render the component when an attribute changes
      }
  }

  // Called when the component is added to the DOM
  connectedCallback() {
      this.render(); // Initial render
      this.addEventListeners(); // Set up event listeners
  }

  // Function to render the component's HTML
  render() {
      const { author, id, image, title } = this.attributes;
      this.shadowRoot.innerHTML = `
          <style>
.preview {
  border-width: 0;
  width: 100%;
  font-family: Roboto, sans-serif;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: left;
  border-radius: 8px;
  border: 1px solid rgba(var(--color-dark), 0.15);
  background: rgba(var(--color-light), 1);
}

@media (min-width: 60rem) {
  .preview {
    padding: 1rem;
  }
}

.preview_hidden {
  display: none;
}

.preview:hover {
  background: rgba(var(--color-blue), 0.05);
}

.preview__image {
  width: 48px;
  height: 70px;
  object-fit: cover;
  background: grey;
  border-radius: 2px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

.preview__info {
  padding: 1rem;
}

.preview__title {
  margin: 0 0 0.5rem;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  color: rgba(var(--color-dark), 0.8)
}

.preview__author {
  color: rgba(var(--color-dark), 0.4);
}
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

  // Function to add event listeners to the component
  addEventListeners() {
      // Listen for clicks on the preview button
      this.shadowRoot.querySelector('.preview').addEventListener('click', () => {
          // Dispatch a custom event with the book ID
          this.dispatchEvent(new CustomEvent('book-preview-clicked', {
              detail: { id: this.getAttribute('id') }, // Pass the book ID
              bubbles: true, // Allow the event to bubble up
              composed: true // Allow the event to cross shadow DOM boundaries
          }));
      });
  }
}

// Define the new element
customElements.define('book-preview', BookPreview);
