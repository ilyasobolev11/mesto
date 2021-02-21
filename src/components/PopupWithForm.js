import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit, submitBtnTextConfig, resetValidation, getInitialValues) {
    super(popupSelector);
    this._form = this.popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this.submitButton = this._form.querySelector('.popup__submit-btn');
    this.submitButtonText = submitBtnTextConfig;
    this._submitHandler = submit;
    this._resetValidation = resetValidation;
    this._getInitialValues = getInitialValues;

    this._setEventListeners();
  }

  _getInputValues() {
    if (this._inputList) {
      this._inputValues = {};
      this._inputList.forEach(input => this._inputValues[input.name] = input.value);
      return this._inputValues;
    }
  }

  _setInputValues() {
    this._inputList.forEach(input => input.value = this._initialValues[input.name]);
  }

  _setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      if (this.submitButtonText) {
        this.submitButton.textContent = this.submitButtonText.submitProcess;
      }
      this._submitHandler(this._getInputValues());
    });
  }

  open(currentCard) {
    super.open();
    if (this._resetValidation) {
      this._resetValidation();
    }
    if (this.submitButtonText) {
      this.submitButton.textContent = this.submitButtonText.default;
    }
    if (this._getInitialValues) {
      this._initialValues = this._getInitialValues();
      this._setInputValues();
    }
    if (currentCard) {
      this.currentCard = currentCard;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
