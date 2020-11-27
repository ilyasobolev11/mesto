const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-btn');
const userNameElement = profile.querySelector('.profile__user-name');
const userStatusElement = profile.querySelector('.profile__user-status');
const addButton = profile.querySelector('.profile__add-btn');

const textNotificationElement = document.querySelector('.elements__text-notification');
const elementsList = document.querySelector('.elements__list');
let elementsListWasEmpty = true;

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
const impCaptionElement = popupZoomImg.querySelector('.popup__img-caption');

const cardTemplate = document.querySelector('#card-template').content.querySelector('.elements__item');

function toggleDisplayTextNotification () {
  textNotificationElement.classList.toggle('elements__text-notification_hidden');
}

function checkElementListContent() {
  if (elementsList.hasChildNodes() && elementsListWasEmpty){
    toggleDisplayTextNotification();
    elementsListWasEmpty = false;
  } else if (!elementsList.hasChildNodes()) {
    toggleDisplayTextNotification();
    elementsListWasEmpty = true;
  }
}

function showPopup(popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscPress);
}


function resetForm(popup) {
  const form = popup.querySelector('.popup__form');
  if (form) {
    form.reset();
  }
}

function closePopup (popupType) {
  popupType.classList.remove('popup_opened');
  resetForm(popupType);
  resetInputsErrors(popupType);
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

function fillZoomImgPopup(name, imgLink) {
  imgElement.src = imgLink;
  imgElement.alt = `Фото - ${name}`;
  impCaptionElement.textContent = name;
}

function toggleLikeButtonStatus (evt) {
  evt.target.classList.toggle('elements__like-btn_active');
}

function addCardInContainer (cardElement) {
  elementsList.prepend(cardElement);
  checkElementListContent();
}

function removeCardElement (evt) {
  evt.target.closest('.elements__item').remove();
  checkElementListContent();
}

function createCard (name, imgLink) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.elements__item-title');
  const cardImageElement = cardElement.querySelector('.elements__item-img');

  cardTitleElement.textContent = name;
  cardImageElement.src = imgLink;
  cardImageElement.alt = `Фото - ${name}`;

  return cardElement;
}

function renderInitialCards () {
  initialCards.forEach(item => addCardInContainer(createCard(item.name, item.link)));
}

function submitEditProfileForm (evt) {
  evt.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userStatusElement.textContent = statusInput.value;
  editProfileForm.reset();
  closePopup(popupEditProfile);
}

function submitCreateCardForm (evt) {
  evt.preventDefault();
  addCardInContainer(createCard(placeNameInput.value, imgLinkInput.value));
  createCardForm.reset();
  closePopup(popupCreateCard);
}

editButton.addEventListener('mousedown', evt => evt.preventDefault());
editButton.addEventListener('click', () => {
  fillEditProfilePopup();
  showPopup(popupEditProfile);
});

addButton.addEventListener('mousedown', evt => evt.preventDefault());
addButton.addEventListener('click', () => showPopup(popupCreateCard));

elementsList.addEventListener('mousedown', evt => {
  if (evt.target.classList.contains('elements__like-btn')) {
    evt.preventDefault();
  }
});

elementsList.addEventListener('click', evt => {
  if (evt.target.classList.contains('elements__like-btn')) {
    toggleLikeButtonStatus(evt);
  } else if (evt.target.classList.contains('elements__delete-btn')) {
    removeCardElement(evt);
  } else if (evt.target.classList.contains('elements__item-img')) {
    fillZoomImgPopup(evt.target.alt.slice(7), evt.target.src);//slice уместен или лучше подняться до родителя и от туда найти title карточки?
    showPopup(popupZoomImg);
  }
});

editProfileCloseButton.addEventListener('mousedown', evt => evt.preventDefault());
editProfileCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

createCardCloseButton.addEventListener('mousedown', evt => evt.preventDefault());
createCardCloseButton.addEventListener('click', () => {
  closePopup(popupCreateCard);
});

zoomImgCloseButton.addEventListener('mousedown', evt => evt.preventDefault());
zoomImgCloseButton.addEventListener('click', () => closePopup(popupZoomImg));

Array.from(document.querySelectorAll('.popup')).forEach(popup => {
  popup.addEventListener('mousedown', handlePopupOverlayClick);
})

editProfileForm.addEventListener('submit', submitEditProfileForm);

createCardForm.addEventListener('submit', submitCreateCardForm);

renderInitialCards();
