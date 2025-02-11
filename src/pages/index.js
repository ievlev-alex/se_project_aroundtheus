import "../styles/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  profileEditBtn,
  addCardBtn,
} from "../utils/constants.js";

// Popups
const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const profilePopup = new PopupWithForm("#profile-modal", (formData) => {
  userInfo.setUserInfo(formData);
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#add-modal", (formData) => {
  const card = new Card(
    { name: formData["image-title"], link: formData.link },
    "#card-template",
    (name, link) => imagePopup.open({ name, link })
  );
  cardSection.addItem(card.createCard());
});
addCardPopup.setEventListeners();

// Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", (name, link) =>
        imagePopup.open({ name, link })
      );
      cardSection.addItem(card.createCard());
    },
  },
  ".elements__list"
);

cardSection.renderItems();

// Event listeners
profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  document.querySelector("#profile-title-input").value = userData.name;
  document.querySelector("#profile-description-input").value = userData.job;
  formValidators["editForm"].resetValidation();
  profilePopup.open();
});

addCardBtn.addEventListener("click", () => {
  formValidators["cardForm"].resetValidation();
  addCardPopup.open();
});

// Validation
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-textfield",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__form-textfield-error",
  errorClass: "modal__error-text-visible",
};

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    if (formName) {
      formValidators[formName] = validator;
      validator.enableValidation();
    }
  });
};
console.log("Form Validators:", formValidators);
enableValidation(validationSettings);
