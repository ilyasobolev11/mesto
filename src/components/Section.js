export default class Section {
  constructor ({items, render, checkContainer}, containerSelector) {
    this._renderedItems = items;
    this._render = render;
    this._checkContainer = checkContainer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.prepend(item);
    if (this._checkContainer) {
      this._checkContainer();
    }
  }

  renderItems() {
    this._renderedItems.forEach(item => this.addItem(this._render(item)));
  }
}
