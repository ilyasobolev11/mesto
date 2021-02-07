import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit, resetValidation, getInitialValues) {
    super(popupSelector);
    this._form = this.popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitHandler = submit;
    this._resetValidation = resetValidation;
    this._getInitialValues = getInitialValues;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => this._inputValues[input.name] = input.value);
    return this._inputValues;
  }

  _setInputValues() {
    this._inputList.forEach(input => input.value = this._initialValues[input.name]);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues())
      this.close();
    });
  }

  open() {
    super.open();
    if (this._getInitialValues) {
      this._initialValues = this._getInitialValues();
      this._setInputValues();
    }
  }

  close() {
    super.close();
    this._form.reset();
    this._resetValidation();
  }
}
