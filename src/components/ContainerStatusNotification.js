export default class ContainerStatusNotification {
  constructor(textNotification, loagingSpinner, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._textNotification = document.querySelector(textNotification.selector);
    this._loagingSpinner = document.querySelector(loagingSpinner.selector);
    this._visibleTextNotificationClass = textNotification.visibleElementClass;
    this._visibleLoagingSpinnerClass = loagingSpinner.visibleElementClass;
  }

  check = () => {
    if (this._container.hasChildNodes()) {
      this._textNotification.classList.remove(this._visibleTextNotificationClass);
    }
    else {
      this._textNotification.classList.add(this._visibleTextNotificationClass);
    }
  }

  toggleLoadingSpinnerVisibility = () => {
    this._loagingSpinner.classList.toggle(this._visibleLoagingSpinnerClass);
  }
}
