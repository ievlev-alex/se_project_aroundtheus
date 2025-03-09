class Card {
  constructor(data, cardSelector, handleImageClick, confirmDeletePopup, api) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._confirmDeletePopup = confirmDeletePopup;
    this._api = api;
    this._cardId = data._id;
    this._likes = data.isLiked || false;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  _handleLikeClick() {
    const apiMethod = this._likes ? this._api.dislikeCard : this._api.likeCard;

    apiMethod
      .call(this._api, this._cardId)
      .then((res) => {
        this._likes = res.isLiked;
        this._likeButton.classList.toggle("card__like-button_active");
      })
      .catch((err) => console.error(err));
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._confirmDeletePopup.setData(this);
      this._confirmDeletePopup.open();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardTitle = this._element.querySelector(".card__title");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    if (this._likes === true) {
      this._likeButton.classList.add("card__like-button_active");
    }
    return this._element;
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}

export default Card;
