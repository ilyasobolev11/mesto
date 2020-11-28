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

  //Раньше так и было. Просто в этом спринте поднималась тема делегирования событий, решил что стоит попрактиковаться.
  deleteButton.addEventListener('click', removeCardElement);
  //этот слушатель убирает эффект focus на кнопке при нажатии. если его убрать, то при нажатии на кнопку она будет выделяться до того момента, пока пользователь не кликнет в другом месте
  //likeButton.addEventListener('mousedown', evt => evt.preventDefault());
  likeButton.addEventListener('click', toggleLikeButtonStatus);
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
  userNameElement.textContent = userNameInput.value;
  userStatusElement.textContent = statusInput.value;
  closePopup(popupEditProfile);
}

function submitCreateCardForm (evt) {
  addCardInContainer(createCard(placeNameInput.value, imgLinkInput.value));
  closePopup(popupCreateCard);
}

//вынес все операции по подготовке формы перед открытием в одну функцию
function resetForm(popup) {
  resetFormInputs(popup);
  resetInputsErrors(popup);
  disableButton(popup.querySelector(validationConfig.submitButtonSelector), validationConfig);
}

//Согласен с тем, что расставлять preventDefault() всем кнопкам в ручную было не лучшей идеей, но, по правде, я просто забыл это убрать. Как и было сказанно выше, эта функция позволяет убрать эффект focus при обычном нажатии на кнопку. Попробуйте, например, нажать на кнопку закрытия попапа, она выделится рамкой.
// document.querySelectorAll('button').forEach(button => {
//   button.addEventListener('mousedown', evt => evt.preventDefault());
// })

editButton.addEventListener('click', () => {
  resetForm(popupEditProfile);
  fillEditProfilePopup();
  showPopup(popupEditProfile);
});

addButton.addEventListener('click', () => {
  resetForm(popupCreateCard);
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
})

editProfileForm.addEventListener('submit', submitEditProfileForm);

createCardForm.addEventListener('submit', submitCreateCardForm);

renderInitialCards();
