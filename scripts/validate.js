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
  popup.querySelectorAll(validationConfig.inputSelector).forEach(inputElement => {
    hideInputError(popup.querySelector(validationConfig.formSelector), inputElement, validationConfig);
  });
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

//вынес в функцию, чтобы блокировать кнопку при открытии попапа. Раньше после первого использования попапа, при его повторном открытии, она была активна, вплоть до того момента как сработате событие input в одном из полей
function disableButton(button, config) {
  button.classList.add(config.disabledButtonClass);
  button.setAttribute('disabled', 'true');
}

function enableButton(button, config) {
  button.classList.remove(config.disabledButtonClass);
  button.removeAttribute('disabled');
}

function hasInvalidInput(inputList) {
  return Array.from(inputList).some(inputElement => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, submitButton, config) {
  if (hasInvalidInput(inputList)) {
    disableButton(submitButton, config);
  } else {
    enableButton(submitButton, config);
  }
}

function setEventListeners(formElement, inputList, submitButton, config) {
  toggleButtonState(inputList, submitButton, config);
  inputList.forEach(inputElement => {
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

    formElement.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(formElement, inputList, submitButton, config);
  });
}

enableValidation(validationConfig);
