class DropdownMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set items(value) {
        this._items = value;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <select>
                <option value="any">All</option>
                ${this._items.map(item => `<option value="${item.id}">${item.name}</option>`).join('')}
            </select>
        `;
    }
}

customElements.define('dropdown-menu', DropdownMenu);
