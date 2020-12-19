import {initialCards, validationConfig} from './data.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-btn');
const userNameElement = profile.querySelector('.profile__user-name');
const userStatusElement = profile.querySelector('.profile__user-status');
const addButton = profile.querySelector('.profile__add-btn');

const textNotificationElement = document.querySelector('.elements__text-notification');
const elementsList = document.querySelector('.elements__list');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editProfileCloseButton = popupEditProfile.querySelector('.popup__close-btn');
const editProfileForm = popupEditProfile.querySelector('.popup__form');
const userNameInput = editProfileForm.querySelector('.popup__input_type_user-name');
const statusInput = editProfileForm.querySelector('.popup__input_type_status');

const popupCreateCard = document.querySelector('.popup_type_create-card');
const createCardCloseButton = popupCreateCard.querySelector('.popup__close-btn');
const createCardForm = popupCreateCard.querySelector('.popup__form');
const placeNameInput = createCardForm.querySelector('.popup__input_type_place-name');
const imgLinkInput = createCardForm.querySelector('.popup__input_type_img-link');

const popupZoomImg = document.querySelector('.popup_type_zoom-img');
const zoomImgCloseButton = popupZoomImg.querySelector('.popup__close-btn');
const imgElement = popupZoomImg.querySelector('.popup__img');
const imgCaptionElement = popupZoomImg.querySelector('.popup__img-caption');

const editProfileFormValidation = new FormValidator(validationConfig, editProfileForm);
editProfileFormValidation.enableValidation();
const createCardFormValidation = new FormValidator(validationConfig, createCardForm);
createCardFormValidation.enableValidation();

function toggleDisplayTextNotification () {
  textNotificationElement.classList.toggle('elements__text-notification_hidden');
}

//убрал переменную elementsListWasEmpty из глобальной области видимости
const checkElementListContent = (function () {
  let elementsListWasEmpty = true;
  return function () {
    if (elementsList.hasChildNodes() && elementsListWasEmpty){
      toggleDisplayTextNotification();
      elementsListWasEmpty = false;
    } else if (!elementsList.hasChildNodes()) {
      toggleDisplayTextNotification();
      elementsListWasEmpty = true;
    }
  }
})();

function showPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscPress);
}

function resetFormInputs(popup) {
  popup.querySelector('.popup__form').reset();
}

function closePopup (popupType) {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPress);
}

function handlePopupOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function handleEscPress(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function fillEditProfilePopup () {
  userNameInput.value = userNameElement.textContent;
  statusInput.value = userStatusElement.textContent;
}

function openPopupZoomImgHandler(name, link) {
  imgElement.src = link;
  imgElement.alt = `Фото - ${name}`;
  imgCaptionElement.textContent = name;

  showPopup(popupZoomImg);
}

function addCardInContainer (cardElement) {
  elementsList.prepend(cardElement);
  checkElementListContent();
}

function renderCard(cardData) {
  const card = new Card(cardData, '#card-template', checkElementListContent, openPopupZoomImgHandler);
  addCardInContainer(card.generateCardElement());
}

function renderInitialCards () {
  initialCards.forEach(item => renderCard(item));
}

function submitEditProfileForm (evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userStatusElement.textContent = statusInput.value;
  closePopup(popupEditProfile);
}

function submitCreateCardForm (evt) {
  evt.preventDefault();
  renderCard({
    name: placeNameInput.value,
    link: imgLinkInput.value
  });
  closePopup(popupCreateCard);
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('mousedown', evt => evt.preventDefault());
});

editButton.addEventListener('click', () => {
  resetFormInputs(popupEditProfile);
  editProfileFormValidation.resetValidation();
  fillEditProfilePopup();
  showPopup(popupEditProfile);
});

addButton.addEventListener('click', () => {
  resetFormInputs(popupCreateCard);
  createCardFormValidation.resetValidation();
  showPopup(popupCreateCard);
});

editProfileCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

createCardCloseButton.addEventListener('click', () => {
  closePopup(popupCreateCard);
});

zoomImgCloseButton.addEventListener('click', () => closePopup(popupZoomImg));

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('mousedown', handlePopupOverlayClick);
});

editProfileForm.addEventListener('submit', submitEditProfileForm);

createCardForm.addEventListener('submit', submitCreateCardForm);

renderInitialCards();
