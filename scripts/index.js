const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-btn');
const userNameElement = profile.querySelector('.profile__user-name');
const userStatusElement = profile.querySelector('.profile__user-status');

const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-btn');
const popupForm = popup.querySelector('.popup__form');
const userNameInput= popup.querySelector('.popup__input_type_user-name');
const userStatusInput = popup.querySelector('.popup__input_type_user-status');

const elementsList = document.querySelector('.elements__list');

const cardTemplate = document.querySelector('#card-template').content;

function getCloneNode (template) {
  const element = template.cloneNode(true);
  return element;
}

function removeCardElement (evt) {
  evt.target.closest('.elements__item').remove();
}

function toggleLikeButtonStatus (evt) {
  evt.target.classList.toggle('elements__like-btn_active');
}

function createCard (name, imgLink) {
  const cardElement = getCloneNode(cardTemplate);//ТУТ - убрал в тело функции где использую
  const cardTitleElement = cardElement.querySelector('.elements__item-title');//ТУТ - убрал в тело функции где использую
  const cardImageElement = cardElement.querySelector('.elements__item-img');//ТУТ - убрал в тело функции где использую

  cardTitleElement.textContent = name;
  cardImageElement.src = imgLink;
  cardImageElement.alt = `Фото - ${name}`;

  cardElement.querySelector('.elements__delete-btn').addEventListener('click', removeCardElement);
  cardElement.querySelector('.elements__like-btn').addEventListener('click', toggleLikeButtonStatus);

  return cardElement;
}

function addCardInContainer (cardElement) {
  elementsList.prepend(cardElement);
}

function renderInitialCards () {
  initialCards.forEach(item => addCardInContainer(createCard(item.name, item.link)));
}

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

renderInitialCards();
