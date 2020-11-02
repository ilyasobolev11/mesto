const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-btn');
const userNameElement = profile.querySelector('.profile__user-name');
const userStatusElement = profile.querySelector('.profile__user-status');

const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-btn');
const popupForm = popup.querySelector('.popup__form');
const userNameInput= popup.querySelector('.popup__input_type_user-name');
const userStatusInput = popup.querySelector('.popup__input_type_user-status');

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
