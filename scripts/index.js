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
}

function closePopup (popupType) {
  popupType.classList.remove('popup_opened');
  resetInputsErrors(popupType);//эту функцию надо в этом файле выше объявлять или оставить в файле с валидацией? просто скрипт с валидацией подключается последним, так что я не уверен выполняет ли функция условаие - *Функции, декларированные как function functionName() {} (function declaration), должны быть вызваны после объявления.*
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
  const deleteButton = cardElement.querySelector('.elements__delete-btn');
  const likeButton = cardElement.querySelector('.elements__like-btn');

  cardTitleElement.textContent = name;
  cardImageElement.src = imgLink;
  cardImageElement.alt = `Фото - ${name}`;

  deleteButton.addEventListener('click', removeCardElement);
  likeButton.addEventListener('click', toggleLikeButtonStatus);
  likeButton.addEventListener('mousedown', evt => evt.preventDefault());
  cardImageElement.addEventListener('click', () => {
    fillZoomImgPopup(name, imgLink);
    showPopup(popupZoomImg);
  });

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

editProfileCloseButton.addEventListener('mousedown', evt => evt.preventDefault());
editProfileCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
  editProfileForm.reset();
});

createCardCloseButton.addEventListener('mousedown', evt => evt.preventDefault());
createCardCloseButton.addEventListener('click', () => {
  closePopup(popupCreateCard);
  createCardForm.reset();
});

zoomImgCloseButton.addEventListener('mousedown', evt => evt.preventDefault());
zoomImgCloseButton.addEventListener('click', () => closePopup(popupZoomImg));

editProfileForm.addEventListener('submit', submitEditProfileForm);

createCardForm.addEventListener('submit', submitCreateCardForm);

renderInitialCards();
