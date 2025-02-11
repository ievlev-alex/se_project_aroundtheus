import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageModalPicture = this._popup.querySelector(".modal__image");
    this._imageModalTitle = this._popup.querySelector("#image-modal-title");
  }

  open(formData) {
    this._imageModalPicture.src = formData.link;
    this._imageModalPicture.alt = formData.name;
    this._imageModalTitle.textContent = formData.name;
    super.open();
  }
}

export default PopupWithImage;
