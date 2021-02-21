const selectorObj = {
    editButtonSelector: '.profile__edit-btn',
    addButtonSelector: '.profile__add-btn',
    userNameElementSelector: '.profile__user-name',
    statusElementSelector: '.profile__user-status',
    avatarContainerElementSelector: '.profile__cover',
    avatarElementSelector: '.profile__avatar',
    cardTemplateSelector: '#card-template',
    containerSelector: '.elements__list',
    loagingSpinner: {
      selector: '.elements__spinner',
      visibleElementClass: 'elements__spinner_hidden'
    },
    textNotification: {
      selector: '.elements__text-notification',
      visibleElementClass: 'elements__text-notification_visible'
    },
    popupEditAvatarSelector: '.popup_type_edit-avatar',
    editAvatarFormSelector: '.popup_type_edit-avatar .popup__form',
    popupEditProfileSelector: '.popup_type_edit-profile',
    editProfileFormSelector: '.popup_type_edit-profile .popup__form',
    popupCreateCardSelector: '.popup_type_create-card',
    createCardFormSelector: '.popup_type_create-card .popup__form',
    popupConfirmDeleteCard: '.popup_type_confirm-delete-card',
    popupZoomImgSelector: '.popup_type_zoom-img'
  };

const validationConfig= {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    submitButtonSelector: '.popup__submit-btn',
    disabledButtonClass: 'popup__submit-btn_disabled'
  };

const submitButtonTextConfig = {
  popupEditAvatar: {
    default: 'Сохранить',
    submitProcess: 'Сохранение...',
    ready: 'Готово'
  },
  popupEditProfile: {
    default: 'Сохранить',
    submitProcess: 'Сохранение...',
    ready: 'Готово'
  },
  popupCreateCard: {
    default: 'Создать',
    submitProcess: 'Создание...',
    ready: 'Готово'
  },
  popupConfirmDeleteCard: {
    default: 'Да',
    submitProcess: 'Удаление...',
    ready: 'Готово'
  }
}

const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-20',
  token: {authorization: '614d3213-6f90-4cae-80f4-7341542ff306'}
}

const editButton = document.querySelector(selectorObj.editButtonSelector);
const addButton = document.querySelector(selectorObj.addButtonSelector);
const avatarElement = document.querySelector(selectorObj.avatarContainerElementSelector);

export {
    selectorObj,
    validationConfig,
    submitButtonTextConfig,
    apiConfig,
    avatarElement,
    editButton,
    addButton
};
