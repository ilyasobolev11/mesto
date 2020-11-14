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
const addButton = profile.querySelector('.profile__add-btn');

const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-btn');
const popupTitle = popup.querySelector('.popup__title');
const popupForm = popup.querySelector('.popup__form');
const popupInputs = popup.querySelectorAll('.popup__input');
const submitButton = popup.querySelector('.popup__submit-btn');

const textNotification = document.querySelector('.elements__text-notification');
const elementsList = document.querySelector('.elements__list');
let elementsListWasEmpty = true;

const cardTemplate = document.querySelector('#card-template').content.querySelector('.elements__item');//чтоб не превращал разрывы строк в текстовые узлы

//Проверка - показывать ли сообщение "Нет добавленных мест", организаванная одной функцией.
//Позже разбил ее на части, поместив куски проверки в removeCardElement и addCardInContainer, которые будут вызывать toggleDisplayTextNotification.
//Хотел бы узнать, какой из вариантов логичнее/читабельнее или оба ужасны?

/*function check () {
  if (elementsList.hasChildNodes() && elementsListWasEmpty){
    textNotification.classList.add('elements__text-notification_hidden');
    elementsListWasEmpty = false;
  } else if (!elementsList.hasChildNodes()) {
    textNotification.classList.remove('elements__text-notification_hidden');
    elementsListWasEmpty = true;
  }
}*/

function toggleDisplayTextNotification () {
  textNotification.classList.toggle('elements__text-notification_hidden');
}

function removeCardElement (evt) {
  evt.target.closest('.elements__item').remove();
  if (!elementsList.hasChildNodes()) {
    toggleDisplayTextNotification();
    elementsListWasEmpty = true;
  }
}

function toggleLikeButtonStatus (evt) {
  evt.target.classList.toggle('elements__like-btn_active');
}

function createCard (name, imgLink) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.elements__item-title');//может обойтись без констант и обращаться на прямую? Будет ли так экономичней?
  const cardImageElement = cardElement.querySelector('.elements__item-img');
  const deleteButton = cardElement.querySelector('.elements__delete-btn');
  const likeButton = cardElement.querySelector('.elements__like-btn');

  cardTitleElement.textContent = name;
  cardImageElement.src = imgLink;
  cardImageElement.alt = `Фото - ${name}`;

  deleteButton.addEventListener('click', removeCardElement);
  likeButton.addEventListener('click', toggleLikeButtonStatus);
  likeButton.addEventListener('mousedown', evt => evt.preventDefault());//отмена focus при нажатии

  return cardElement;
}

function addCardInContainer (cardElement) {
  elementsList.prepend(cardElement);
  if (elementsListWasEmpty) {
    toggleDisplayTextNotification();
    elementsListWasEmpty = false;
  }
}

function renderInitialCards () {
  initialCards.forEach(item => addCardInContainer(createCard(item.name, item.link)));
}

function showPopup() {
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');

  if (popupForm.name === 'editProfileForm') {
    popupForm.removeEventListener('submit', submitEditProfileForm);
    popupForm.reset();
    popupForm.removeAttribute('name');
  }
  else if (popupForm.name === 'createNewCardForm') {
    popupForm.removeEventListener('submit', submitCreateNewCardForm);
    popupForm.reset();
    popupForm.removeAttribute('name');
  }
}

function submitEditProfileForm (evt) {
  evt.preventDefault();
  userNameElement.textContent = popupInputs[0].value;
  userStatusElement.textContent = popupInputs[1].value;
  closePopup();
}

function submitCreateNewCardForm (evt) {
  evt.preventDefault();
  addCardInContainer(createCard(popupInputs[0].value, popupInputs[1].value));
  closePopup();
}

function showEditProfilePopup () {
  popupTitle.textContent = 'Редактировать профиль';
  popupForm.name = 'editProfileForm';
  popupInputs[0].placeholder = 'Имя';
  popupInputs[0].name = 'popupUserName';
  popupInputs[0].value = userNameElement.textContent;
  popupInputs[1].type = 'text';
  popupInputs[1].placeholder = 'О себе';
  popupInputs[1].name = 'popupStatus';
  popupInputs[1].value = userStatusElement.textContent;
  submitButton.textContent = 'Сохранить';
  closeButton.ariaLabel = 'Закрыть окно редактирования информации о пользователе';

  popupForm.addEventListener('submit', submitEditProfileForm);

  showPopup();
}

function showCreateNewCardPopup () {
  popupTitle.textContent = 'Новое место';
  popupForm.name = 'createNewCardForm';
  popupInputs[0].placeholder = 'Название';
  popupInputs[0].name = 'popupPlaceName';
  popupInputs[1].type = 'url';
  popupInputs[1].placeholder = 'Ссылка на картинку';
  popupInputs[1].name = 'popupImgLink';
  submitButton.textContent = 'Создать';
  closeButton.ariaLabel = 'Закрыть окно создания нового места';

  popupForm.addEventListener('submit', submitCreateNewCardForm);

  showPopup();
}

editButton.addEventListener('click', showEditProfilePopup);
addButton.addEventListener('click', showCreateNewCardPopup);
closeButton.addEventListener('click', closePopup);
closeButton.addEventListener('mousedown', evt => evt.preventDefault());

renderInitialCards();
