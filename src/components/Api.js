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

  _request(endpoint, options = {}) {
    const finalOptions = {
      headers: this._headers,
      ...options,
    };
    const url = `${this._baseUrl}${endpoint}`;
    return fetch(url, finalOptions)
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  getUserInfo() {
    return this._request("/users/me");
  }

  updateUserInfo(data) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  updateAvatar(data) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  getInitialCards() {
    return this._request("/cards");
  }

  createCard(data) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  dislikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
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
