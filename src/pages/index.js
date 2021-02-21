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

const elementListNotification = new ContainerStatusNotification(
  selectorObj.textNotification,
  selectorObj.loagingSpinner,
  selectorObj.containerSelector
);

function renderCard(item) {
  const card = new Card(
    item,
    selectorObj.cardTemplateSelector,
    userInfo.getUserId,
    popupZoomImg.open,
    popupConfirmDeleteCard.open,
    putLike,
    removeLike,
    imgPlaceholder
  );
  return card.generateCardElement();
}

function submitCard() {
  api.sendNewCard(this.inputValues, '/cards ') // что делать с приватными полями в колбэках? (я их, на всякий, сделал публичными)
    .then((cardData) => {
      cardList.addItem(renderCard(cardData));
    })
    .catch(handleError)
    .finally(() => {
      this.close();
      this.submitButton.textContent = this.submitButtonText.ready;
    });
}

function deleteCard() {
  api.deleteCard(`/cards/${this.currentCard.id}`)
    .then((res) => {
      console.log(res.message);
      this.currentCard.cardElement.remove();
      delete this.currentCard;
      // Как логичнее организовать удаление?
      // Здесь я всего лишь удалил свойство currentCard, содержащее ссылку на объект,
      // а как избавиться от самого объекта, на котором строилась удаленная карточка?
      // Или этим займется сборщик мусора?
      elementListNotification.check();
    })
    .catch(handleError)
    .finally(() => {
      this.close();
      this.submitButton.textContent = this.submitButtonText.ready;
    });
}

function putLike() {
  api.putLike(`/cards/likes/${this.id}`)
    .then(({likes}) => {
      this.likes = likes;
      this.updateLikesCount();
    })
    .catch(handleError);
}

function removeLike() {
  api.removeLike(`/cards/likes/${this.id}`)
    .then(({likes}) => {
      this.likes = likes;
      this.updateLikesCount();
    })
    .catch(handleError);
}

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

const api = new Api(apiConfig);

function submitAvatar() {
  api.updateAvatar(this.inputValues, '/users/me/avatar')
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch(handleError)
    .finally(() => {
      this.close();
      this.submitButton.textContent = this.submitButtonText.ready;
    });
}

function submitUserData() {
  api.updateUserData(this.inputValues, '/users/me')
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch(handleError)
    .finally(() => {
      this.close();
      this.submitButton.textContent = this.submitButtonText.ready;
    });
}

function renderInitialData() {
  // Упала читаемость, но так не надо ждать распаковки res от api.getInitialCards + если запрос провалится,
  // то api.getUserData все-равно выполнится, а вот в обратную сломаются оба. Я не знаю как дать обоим независимость
  // - так что-бы один не ждал другого, запросы и распаковка обоих выполнялись параллельно, но при этом, метод обработки готовых
  // данных происходил по очереди - сначала userInfo.setUserInfo, а потом cardList.renderItems...

  Promise.all([
    api.getInitialCards('/cards'),
    api.getUserData('/users/me')
      .then((userData) => {
        userInfo.setUserInfo(userData);
      })
  ])
  .then(([initialCards]) => {
    elementListNotification.toggleLoadingSpinnerVisibility();
    cardList.renderItems(initialCards);
  })
  .catch(handleError);

  // Promise.all([
  //   api.getUserData('/users/me'),
  //   api.getInitialCards('/cards')
  // ])
  //   .then(([userData, initialCards]) => {
  //     userInfo.setUserInfo(userData);
  //     elementListNotification.toggleLoadingSpinnerVisibility();
  //     cardList.renderItems(initialCards);
  //   })
  //   .catch((err) => console.log(err));
}

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

// не забанят?
// setInterval(updateCardList, 30000);
