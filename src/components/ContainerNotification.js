export default class ContainerNotification {
  constructor({selector, hiddenElementClass}, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._notification = document.querySelector(selector);
    this._hiddenNotificationClass = hiddenElementClass;
  }

  check = () => {
    if (this._container.hasChildNodes()) {
      this._notification.classList.add(this._hiddenNotificationClass);
    }
    else {
      this._notification.classList.remove(this._hiddenNotificationClass);
    }
  }
}
