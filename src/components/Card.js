export default class Card {
  constructor({name, link}, templateSelector, checkElementListContent, openPopupZoomImgHandler) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._checkElementListContent = checkElementListContent;
    this._cardImgClickHandler = openPopupZoomImgHandler;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
  }

  _removeCardElement() {
    this._cardElement.remove();
    this._cardElement = null;
    if (this._checkElementListContent) {
      this._checkElementListContent();
    }
  }

  _toggleLikeButtonStatus() {
    this.classList.toggle('elements__like-btn_active');
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._toggleLikeButtonStatus);
    this._likeButton.addEventListener('mousedown', evt => evt.preventDefault());
    this._imgElement.addEventListener('click', () => {
      this._cardImgClickHandler(this._link, this._name);
    });
    this._deleteButton.addEventListener('click', () => {
      this._removeCardElement();
    });
  }

  generateCardElement() {
    this._cardElement = this._getTemplate();
    this._imgElement =
      this._cardElement
      .querySelector('.elements__item-img');
    this._likeButton =
      this._cardElement
      .querySelector('.elements__like-btn');
    this._deleteButton =
      this._cardElement
      .querySelector('.elements__delete-btn')

    this._setEventListeners();

    this._cardElement
      .querySelector('.elements__item-title')
      .textContent = this._name;
    this._imgElement.src = this._link;
    this._imgElement.alt = `Фото - ${this._name}`;

    return this._cardElement;
  }
}
