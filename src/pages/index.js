import './index.css'

import {
  selectorObj,
  initialCards,
  validationConfig,
  editButton,
  addButton
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import ContainerNotification from '../components/ContainerNotification.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

//не избыточно ли для функции, проверки наличия элементов в контейнере и показа соответствующего сообщения, делать отдельный класс?
//возможно проще было оставить эту функцию отдельно в index.js или разместить ее в классе Section?
const elementListNotification = new ContainerNotification(selectorObj.textNotification, selectorObj.containerSelector);

function renderCard(item) {
  const card = new Card(item, selectorObj.cardTemplateSelector, elementListNotification.check, popupZoomImg.open);
  return card.generateCardElement();
}

function submitCreateCardForm(inputValues) {
  cardList.addItem(renderCard(inputValues));
}

const cardList = new Section(
  {
    items: initialCards,
    render: renderCard,
    checkContainer: elementListNotification.check
  },
  selectorObj.containerSelector
);

const userInfo = new UserInfo(selectorObj.userNameElementSelector, selectorObj.statusElementSelector);

const editProfileFormValidation = new FormValidator(validationConfig, selectorObj.editProfileFormSelector);
editProfileFormValidation.enableValidation();

const createCardFormValidation = new FormValidator(validationConfig, selectorObj.createCardFormSelector);
createCardFormValidation.enableValidation();

const popupEditProfile = new PopupWithForm(
  selectorObj.popupEditProfileSelector,
  userInfo.setUserInfo,
  editProfileFormValidation.resetValidation,
  userInfo.getUserInfo
);
popupEditProfile.setEventListeners();

const popupCreateCard = new PopupWithForm(
  selectorObj.popupCreateCardSelector,
  submitCreateCardForm,
  createCardFormValidation.resetValidation
);
popupCreateCard.setEventListeners();

const popupZoomImg = new PopupWithImage(selectorObj.popupZoomImgSelector);
popupZoomImg.setEventListeners();

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('mousedown', evt => evt.preventDefault());
});

editButton.addEventListener('click', () => {
  popupEditProfile.open();
});

addButton.addEventListener('click', () => {
  popupCreateCard.open();
});

cardList.renderItems();
