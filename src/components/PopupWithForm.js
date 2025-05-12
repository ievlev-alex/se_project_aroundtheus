import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, settings) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = this._form.querySelectorAll("input");
    this._submitBtn = this._popup.querySelector(".modal__button");
    this._submitBtnText = this._submitBtn.textContent;
    this._inactiveButtonClass = settings.inactiveButtonClass;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(formData) {
    this._inputList.forEach((input) => {
      input.value = formData[input.name];
    });
  }

  disableButton() {
    this._submitBtn.classList.add(this._inactiveButtonClass);
    this._submitBtn.disabled = true;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    this._isSaving = isLoading;
    if (isLoading) {
      this.disableButton();
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }

  getForm() {
    return this._form;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;
