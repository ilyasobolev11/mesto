export default class Card {
  constructor(
    {name, link, likes, _id, owner},
    templateSelector,
    currentUserId,
    openPopupZoomImgHandler,
    openPopupConfirmDeleteCard,
    putLike,
    removeLike,
    imgPlaceholder
  ) {
    this._name = name;
    this._link = link;
    this.likes = likes;
    this.id = _id;
    this._cardOwnerId = owner._id;
    this._templateSelector = templateSelector;
    this._currentUserId = currentUserId;
    this._cardImgClickHandler = openPopupZoomImgHandler;
    this._deleteBtnClickHandler = openPopupConfirmDeleteCard;
    this._putLikeHandler = putLike;
    this._removeLikeHandler = removeLike;
    this._imgPlaceholder = imgPlaceholder;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);
  }

  toggleLikeBtnState() {
    this._likeButton.classList.toggle('elements__like-btn_active');
  }

  //как тут быть? реализовать по приципу "оптимистичный UI", или дожидаться ответа от сервера и только потом проставлять кол. лайков?
  likeBtnClickHandler() {
    this.toggleLikeBtnState();
    if (this._likeButton.classList.contains('elements__like-btn_active')) {
      //this._likesCountElement.textContent = Number(this._likesCountElement.textContent) + 1;
      this._putLikeHandler(this);
    } else {
      //this._likesCountElement.textContent = Number(this._likesCountElement.textContent) - 1;
      this._removeLikeHandler(this);
    }
  }

  _setLikesInitialValue() {
    this._likeState = this.likes.some(({_id}) => _id === this._currentUserId);
    if (this._likeState) {
      this._likeButton.classList.add('elements__like-btn_active');
    }
  }

  updateLikesCount() {
    this._likesCountElement.textContent = this.likes.length;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this.likeBtnClickHandler());
    this._likeButton.addEventListener('mousedown', evt => evt.preventDefault());
    this._imgElement.addEventListener('click', () => {
      this._cardImgClickHandler(this._link, this._name);
    });
    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', () => {
        this._deleteBtnClickHandler(this);
      });
    }
  }

  _checkOwner() {
    if (this._cardOwnerId !== this._currentUserId) {
      this._deleteButton.remove();
      this._deleteButton = undefined;
    }
  }

  generateCardElement() {
    this.cardElement = this._getTemplate();
    this._imgElement =
      this.cardElement
      .querySelector('.elements__item-img');
    this._likeButton =
      this.cardElement
      .querySelector('.elements__like-btn');
    this._likesCountElement =
      this.cardElement
      .querySelector('.elements__likes-count');
    this._deleteButton =
      this.cardElement
      .querySelector('.elements__delete-btn')

    this._checkOwner();
    this._setEventListeners();

    this.cardElement
      .querySelector('.elements__item-title')
      .textContent = this._name;
    this._imgElement.src = this._link;
    this._imgElement.alt = `Фото - ${this._name}`;
    this._setLikesInitialValue();
    this.updateLikesCount();

    this._imgElement.onerror = () => {
      if (this._imgPlaceholder) {
        this._imgElement.src = this._imgPlaceholder;
      }
    }

    return this.cardElement;
  }
}
