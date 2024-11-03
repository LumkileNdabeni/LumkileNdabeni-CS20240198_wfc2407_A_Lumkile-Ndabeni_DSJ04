class DropdownMenu extends HTMLElement {
    constructor() {
        super();
        // Attach a shadow DOM to encapsulate styles and markup
        this.attachShadow({ mode: 'open' });
    }

    // Setter for the items property, which will trigger a render
    set items(value) {
        this._items = value; // Store the items to be rendered
        this.render(); // Render the dropdown with the new items
    }

    // Function to render the dropdown menu
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Component styles */
                select {
                    width: 100%; /* Make the dropdown full width */
                    padding: 8px; /* Add padding for better appearance */
                    border: 1px solid #ccc; /* Add a border */
                    border-radius: 4px; /* Rounded corners */
                }
            </style>
            <select>
                <option value="any">All</option> <!-- Default option -->
                ${this._items.map(item => `<option value="${item.id}">${item.name}</option>`).join('')}
            </select>
        `;
    }
}

// Define the new element
customElements.define('dropdown-menu', DropdownMenu);
