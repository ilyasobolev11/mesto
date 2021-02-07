const selectorObj = {
    editButtonSelector: '.profile__edit-btn',
    addButtonSelector: '.profile__add-btn',
    userNameElementSelector: '.profile__user-name',
    statusElementSelector: '.profile__user-status',
    cardTemplateSelector: '#card-template',
    containerSelector: '.elements__list',
    textNotification: {
      selector: '.elements__text-notification',
      hiddenElementClass: 'elements__text-notification_hidden'
    },
    popupEditProfileSelector: '.popup_type_edit-profile',
    editProfileFormSelector: '.popup_type_edit-profile .popup__form',
    popupCreateCardSelector: '.popup_type_create-card',
    createCardFormSelector: '.popup_type_create-card .popup__form',
    popupZoomImgSelector: '.popup_type_zoom-img'
  };

const validationConfig= {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    submitButtonSelector: '.popup__submit-btn',
    disabledButtonClass: 'popup__submit-btn_disabled'
  };

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

const editButton = document.querySelector(selectorObj.editButtonSelector);
const addButton = document.querySelector(selectorObj.addButtonSelector);

export {
    selectorObj,
    validationConfig,
    initialCards,
    editButton,
    addButton
};
