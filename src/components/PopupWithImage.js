import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgElement = this.popup.querySelector('.popup__img');
    this._imgCaptionElement = this.popup.querySelector('.popup__img-caption');
  }

  open(link, text) {
    super.open();
    this._imgElement.src = link;
    this._imgElement.alt = `Фото - ${text}`;
    this._imgCaptionElement.textContent = text;
  }
}
