class FormValidator {
  constructor(validationConfig, formElement) {
    this._config = validationConfig;
    this._formElement = formElement;
  }

  _enableButton() {
    this._submitButtonElement
      .classList
      .remove(this._config.disabledButtonClass);
    this._submitButtonElement
      .removeAttribute('disabled');
  }

  _disableButton() {
    this._submitButtonElement
      .classList
      .add(this._config.disabledButtonClass);
    this._submitButtonElement
      .setAttribute('disabled', 'true');
  }

  _toggleButtonState() {
    if (this._formElement.checkValidity()) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  }

  _hideInputError(inputElement) {
    const errorElement =
      this._formElement
      .querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
  }

  _showInputError(inputElement) {
    const errorElement =
      this._formElement
      .querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._submitButtonElement =
      this._formElement
      .querySelector(this._config.submitButtonSelector);
    this._inputList =
      this._formElement
      .querySelectorAll(this._config.inputSelector);
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
    this._toggleButtonState();
  }

  enableValidation() {
    this._formElement.addEventListener('submit', evt => evt.preventDefault());
    this._setEventListeners();
  }
}
