import Popup from "./Popup.js";

class PopupWithChangeProfile extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = this._form.querySelectorAll("input");
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

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmit(this._getInputValues());
      this._form.reset();
      this.close();
    });
  }
}

export default PopupWithChangeProfile;
