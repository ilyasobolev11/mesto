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

const elementsList = document.querySelector('.elements__list');

const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-btn');
const popupForm = popup.querySelector('.popup__form');
const userNameInput= popup.querySelector('.popup__input_type_user-name');
const userStatusInput = popup.querySelector('.popup__input_type_user-status');

const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.cloneNode(true);
const cardTitleElement = cardElement.querySelector('.elements__item-title');
const cardImageElement = cardElement.querySelector('.elements__item-img');

function createCard (name, imgLink) {
  cardTitleElement.textContent = name;
  cardImageElement.src = imgLink;
  cardImageElement.alt = `Фото - ${name}`;
  const modifiedCardElement = cardElement.cloneNode(true);
  modifiedCardElement.querySelector('.elements__delete-btn').addEventListener('click', evt => evt.target.closest('.elements__item').remove());
  modifiedCardElement.querySelector('.elements__like-btn').addEventListener('click', evt => evt.target.classList.toggle('elements__like-btn_active'));

  return modifiedCardElement;
}

function renderInitialCards () {
  initialCards.forEach(item => elementsList.append(createCard(item.name, item.link)));
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
