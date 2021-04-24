import './index.css'

import {
  selectorObj,
  validationConfig,
  submitButtonTextConfig,
  apiConfig,
  avatarElement,
  editButton,
  addButton
} from '../utils/constants.js';
import imgPlaceholder from '../images/img-placeholder.jpg';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import ContainerStatusNotification from '../components/ContainerStatusNotification.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api';

function handleError(err) {
  console.log(err);
}

function renderCard(item) {
  const card = new Card(
    item,
    selectorObj.cardTemplateSelector,
    userInfo.userId,
    popupZoomImg.open,
    popupConfirmDeleteCard.open,
    putLike,
    removeLike,
    imgPlaceholder
  );
  return card.generateCardElement();
}

function submitCard(inputValues) {
  api.sendNewCard(inputValues, '/cards ')
    .then((cardData) => {
      cardList.addItem(renderCard(cardData));
    })
    .catch(handleError)
    .finally(() => {
      popupCreateCard.close();
      popupCreateCard.submitButton.textContent = popupCreateCard.submitButtonText.ready;
    });
}

function deleteCard() {
  api.deleteCard(`/cards/${popupConfirmDeleteCard.currentCard.id}`)
    .then((res) => {
      console.log(res.message);
      popupConfirmDeleteCard.currentCard.cardElement.remove();

      elementListNotification.check();
    })
    .catch(handleError)
    .finally(() => {
      popupConfirmDeleteCard.close();
      popupConfirmDeleteCard.submitButton.textContent = popupConfirmDeleteCard.submitButtonText.ready;
    });
}

function putLike(card) {
  api.putLike(`/cards/likes/${card.id}`)
    .then(({likes}) => {
      card.likes = likes;//TODO: мб передать в метод ниже и там установить?
      card.updateLikesCount();
    })
    .catch((err) => {
      handleError(err);
      card.toggleLikeBtnState();
      //card.updateLikesCount();
    });
}

function removeLike(card) {
  api.removeLike(`/cards/likes/${card.id}`)
    .then(({likes}) => {
      card.likes = likes;
      card.updateLikesCount();
    })
    .catch((err) => {
      handleError(err);
      card.toggleLikeBtnState();
      //card.updateLikesCount();
    });
}

function submitAvatar(inputValues) {
  api.updateAvatar(inputValues, '/users/me/avatar')
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch(handleError)
    .finally(() => {
      popupEditAvatar.close();//TODO: при ошибке не должен закрывать
      popupEditAvatar.submitButton.textContent = popupEditAvatar.submitButtonText.ready;
    });
}

function submitUserData(inputValues) {
  api.updateUserData(inputValues, '/users/me')
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch(handleError)
    .finally(() => {
      popupEditProfile.close();
      popupEditProfile.submitButton.textContent = popupEditProfile.submitButtonText.ready;
    });
}

function renderInitialData() {
  Promise.all([
    api.getUserData('/users/me'),
    api.getInitialCards('/cards')
  ])
    .then(([userData, initialCards]) => {
      userInfo.setUserInfo(userData);
      elementListNotification.toggleLoadingSpinnerVisibility();
      cardList.renderItems(initialCards);
    })
    .catch((err) => console.log(err));
}

const api = new Api(apiConfig);

const elementListNotification = new ContainerStatusNotification(
  selectorObj.textNotification,
  selectorObj.loagingSpinner,
  selectorObj.containerSelector
);

const cardList = new Section(
  {
    render: renderCard,
    checkContainer: elementListNotification.check
  },
  selectorObj.containerSelector
);

const userInfo = new UserInfo(
  selectorObj.userNameElementSelector,
  selectorObj.statusElementSelector,
  selectorObj.avatarElementSelector
);

const editAvatarFormVlidation = new FormValidator(validationConfig, selectorObj.editAvatarFormSelector);
editAvatarFormVlidation.enableValidation();

const editProfileFormValidation = new FormValidator(validationConfig, selectorObj.editProfileFormSelector);
editProfileFormValidation.enableValidation();

const createCardFormValidation = new FormValidator(validationConfig, selectorObj.createCardFormSelector);
createCardFormValidation.enableValidation();

const popupEditAvatar = new PopupWithForm(
  selectorObj.popupEditAvatarSelector,
  submitAvatar,
  submitButtonTextConfig.popupEditAvatar,
  editAvatarFormVlidation.resetValidation
);

const popupEditProfile = new PopupWithForm(
  selectorObj.popupEditProfileSelector,
  submitUserData,
  submitButtonTextConfig.popupEditProfile,
  editProfileFormValidation.resetValidation,
  userInfo.getUserInfo
);

const popupCreateCard = new PopupWithForm(
  selectorObj.popupCreateCardSelector,
  submitCard,
  submitButtonTextConfig.popupCreateCard,
  createCardFormValidation.resetValidation
);

const popupConfirmDeleteCard = new PopupWithForm(
  selectorObj.popupConfirmDeleteCard,
  deleteCard,
  submitButtonTextConfig.popupConfirmDeleteCard
);

const popupZoomImg = new PopupWithImage(selectorObj.popupZoomImgSelector);
popupZoomImg.setEventListeners();

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('mousedown', evt => evt.preventDefault());
});

avatarElement.addEventListener('mousedown', evt => evt.preventDefault());
avatarElement.addEventListener('click', () => {
  popupEditAvatar.open();
});

editButton.addEventListener('click', () => {
  popupEditProfile.open();
});

addButton.addEventListener('click', () => {
  popupCreateCard.open();
});

renderInitialData();

// function updateCardList() {
//   api.getInitialCards('/cards')
//     .then((initialCards) => {
//       const container = document.querySelector(selectorObj.containerSelector);
//       container.innerHTML = "";
//       cardList.renderItems(initialCards);
//     })
//     .catch((err) => console.log(err));
// }

// setInterval(updateCardList, 30000);
