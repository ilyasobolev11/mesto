let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-btn');
let userNameElement = profile.querySelector('.profile__user-name');
let userStatusElement = profile.querySelector('.profile__user-status');

let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-btn');
let popupForm = popup.querySelector('.popup__form');
let userNameInput= popup.querySelector('.popup__input_type_user-name');
let userStatusInput = popup.querySelector('.popup__input_type_user-status');

function showPopup () {
  popup.classList.add('popup_opened');
  userNameInput.value = userNameElement.textContent;
  userStatusInput.value = userStatusElement.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function submitPopupForm (evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userStatusElement.textContent = userStatusInput.value;
  closePopup();
}

editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', submitPopupForm);
