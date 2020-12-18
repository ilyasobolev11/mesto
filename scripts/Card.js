export default class Card {
  constructor(data, templateSelector, checkElementListContent, showPopup, popup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._checkElementListContent = checkElementListContent;
    this._showPopup = showPopup;
    this._popup = popup;
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
    this._cardElement = null; //видел, что некоторые ревьюеры рекомендовали чистить это свойство после удаления из DOM. зачем это делать?
    this._checkElementListContent();
  }

  _toggleLikeButtonStatus() {
    this.classList.toggle('elements__like-btn_active');
  }

  _fillZoomImgPopup(name, link) {
    this._popup.querySelector('.popup__img').src = link;
    this._popup.querySelector('.popup__img').alt = `Фото - ${name}`;
    this._popup.querySelector('.popup__img-caption').textContent = name;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector('.elements__delete-btn')
      .addEventListener('click', () => {
        this._removeCardElement();
      });
    this._cardElement
      .querySelector('.elements__like-btn')
      .addEventListener('click', this._toggleLikeButtonStatus);
    this._cardElement
      .querySelector('.elements__like-btn')
      .addEventListener('mousedown', evt => evt.preventDefault());
    this._cardElement
      .querySelector('.elements__item-img')
      .addEventListener('click', () => {
        this._fillZoomImgPopup(this._name, this._link);
        this._showPopup(this._popup);
      });
  }

  generateCardElement() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();

    this._cardElement
      .querySelector('.elements__item-title')
      .textContent = this._name;
    this._cardElement
      .querySelector('.elements__item-img')
      .src = this._link;
    this._cardElement
      .querySelector('.elements__item-img')
      .alt = `Фото - ${this._name}`;

    return this._cardElement;
  }
}
