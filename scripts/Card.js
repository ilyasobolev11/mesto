export default class Card {
  constructor(data, templateSelector, checkElementListContent, openPopupZoomImgHandler) {
    this._name = data.name;
    this._link = data.link;
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
    this._checkElementListContent();
  }

  _toggleLikeButtonStatus() {
    this.classList.toggle('elements__like-btn_active');
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._toggleLikeButtonStatus);
    this._likeButton.addEventListener('mousedown', evt => evt.preventDefault());
    this._imgElement.addEventListener('click', () => {
      this._cardImgClickHandler(this._name, this._link);
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
