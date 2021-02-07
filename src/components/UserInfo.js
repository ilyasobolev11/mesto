export default class UserInfo {
  constructor(nameElementSelector, statusElementSelector) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._statusElement = document.querySelector(statusElementSelector);
  }

  getUserInfo = () => {
    return {
      userName: this._nameElement.textContent,
      status: this._statusElement.textContent
    }
  }

  setUserInfo = ({userName, status}) => {
    this._nameElement.textContent = userName;
    this._statusElement.textContent = status;
  }
}
