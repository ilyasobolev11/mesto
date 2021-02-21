export default class UserInfo {
  constructor(nameElementSelector, statusElementSelector, avatarElementSelector) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._statusElement = document.querySelector(statusElementSelector);
    this._avatarElement = document.querySelector(avatarElementSelector);
  }

  getUserInfo = () => {
    return {
      userName: this._nameElement.textContent,
      status: this._statusElement.textContent
    };
  }

  getUserId = () => { // возможно это избыточно и стоит организовать предачу id через getUserInfo?
    return this._userId;
  }

  setUserInfo = ({name, about, avatar, _id}) => {
    this._nameElement.textContent = name;
    this._statusElement.textContent = about;
    this._userId = _id;
    this._avatarElement.src = avatar;

  }
}
