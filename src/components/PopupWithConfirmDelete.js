import Popup from "./Popup.js";

class PopupWithConfirmDelete extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector("form");
  }

  setData(card) {
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmit(this._card);
      this.close();
    });
  }
}

export default PopupWithConfirmDelete;
