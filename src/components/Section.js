export default class Section {
  constructor ({render, checkContainer}, containerSelector) {
    this._render = render;
    this._checkContainer = checkContainer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item, append) {
    if (append) {
      this._container.append(item);
    } else {
      this._container.prepend(item);
    }
    if (this._checkContainer) {
      this._checkContainer();
    }
  }

  renderItems(cards) {
    if (cards.length > 0) {
      cards.forEach(item => this.addItem(this._render(item), true));
    } else if (this._checkContainer) {
      this._checkContainer();
    }
  }
}
