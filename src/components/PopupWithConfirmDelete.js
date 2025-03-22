import Popup from "./Popup.js";

class PopupWithConfirmDelete extends Popup {
  constructor(popupSelector, handleSubmit, settings) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector("form");
    this._submitBtn = this._popup.querySelector(".modal__button");
    this._inactiveButtonClass = settings.inactiveButtonClass;
  }

  setData(card) {
    this._card = card;
  }

  disableButton() {
    this._submitBtn.disabled = true;
    this._submitBtn.classList.add(this._inactiveButtonClass);
  }

  enableButton() {
    this._submitBtn.disabled = false;
    this._submitBtn.classList.remove(this._inactiveButtonClass);
  }

  open() {
    super.open();
    this.enableButton();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmit(this._card)
        .then(() => {
          this.close();
        })
        .catch((err) => console.error(err));
    });
  }
}

export default PopupWithConfirmDelete;
