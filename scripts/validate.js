const validationConfig= {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__submit-btn',
  disabledButtonClass: 'popup__submit-btn_disabled'
};

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

function resetInputsErrors(popup) {
  const inputList = popup.querySelectorAll(validationConfig.inputSelector);
  if (inputList) {
    Array.from(inputList).forEach(inputElement => {
      hideInputError(popup.querySelector(validationConfig.formSelector), inputElement, validationConfig);
    });
  }
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return Array.from(inputList).some(inputElement => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, submitButton, config) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(config.disabledButtonClass);
    submitButton.setAttribute('disabled', 'true');
  } else {
    submitButton.classList.remove(config.disabledButtonClass);
    submitButton.removeAttribute('disabled');
  }
}

function setEventListeners(formElement, inputList, submitButton, config) {
  toggleButtonState(inputList, submitButton, config);
  Array.from(inputList).forEach(inputElement => {
    inputElement.addEventListener('input', () =>{
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, submitButton, config);
    });
  });
}

function enableValidation(config) {
  const formList = document.forms;
  Array.from(formList).forEach(formElement => {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButton = formElement.querySelector(config.submitButtonSelector);

    setEventListeners(formElement, inputList, submitButton, config);
  })
}

enableValidation(validationConfig);
