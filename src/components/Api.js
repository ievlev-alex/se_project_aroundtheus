class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      throw new Error(`Error: ${res.status} - ${text}`);
    });
  }

  _handleError(error) {
    console.error("API Error:", error);
    return Promise.reject(error);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }
  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  getAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]).catch(
      (error) => {
        this._handleError(error);
        return Promise.reject(error);
      }
    );
  }
}
export default Api;
