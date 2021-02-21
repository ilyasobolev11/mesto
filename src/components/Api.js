export default class Api {
  constructor({url, token}) {
    this._url = url;
    this._token = token;
  }

  _getResponseBody(res, textErr) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${textErr}: ${res.status} - ${res.statusText}`));
  }

  getUserData(path) {
    return fetch(`${this._url}${path}`, {
      headers: this._token
    })
      .then((res) => this._getResponseBody(res, 'getUserData'));
  }

  getInitialCards(path) {
    return fetch(`${this._url}${path}`, {
      headers: this._token
    })
      .then((res) => this._getResponseBody(res, 'getInitialCards'));
  }

  updateUserData({userName, status}, path) {
    return fetch(`${this._url}${path}`, {
      method: 'PATCH',
      headers: {
        ...this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        about: status
      })
    })
      .then((res) => this._getResponseBody(res, 'updateUserData'));
  }

  updateAvatar(avatar, path) {
    return fetch(`${this._url}${path}`, {
      method: 'PATCH',
      headers: {
        ...this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatar)
    })
      .then((res) => this._getResponseBody(res, 'updateAvatar'));
  }

  sendNewCard(cardData, path) {
    return fetch(`${this._url}${path}`, {
      method: 'POST',
      headers: {
        ...this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    })
      .then((res) => this._getResponseBody(res, 'sendNewCard'));
  }

  deleteCard(path) {
    return fetch(`${this._url}${path}`, {
      method: 'DELETE',
      headers: this._token
    })
      .then((res) => this._getResponseBody(res, 'deleteCard'))
  }

  putLike(path) {
    return fetch(`${this._url}${path}`, {
      method: 'PUT',
      headers: this._token
    })
      .then((res) => this._getResponseBody(res, 'putLike'))
  }

  removeLike(path) {
    return fetch(`${this._url}${path}`, {
      method: 'DELETE',
      headers: this._token
    })
      .then((res) => this._getResponseBody(res, 'removeLike'))
  }
}
