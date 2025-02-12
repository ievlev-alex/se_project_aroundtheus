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
  validationSettings,
} from "../utils/constants.js";

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", (name, link) =>
    imagePopup.open({ name, link })
  );
  return card.createCard();
}

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
  const cardElement = createCard({
    name: formData["image-title"],
    link: formData.link,
  });
  cardSection.addItem(cardElement);
});
addCardPopup.setEventListeners();

// Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".elements__list"
);
cardSection.renderItems();

// Event listeners
profileEditBtn.addEventListener("click", () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  formValidators["editForm"].resetValidation();
  profilePopup.open();
});

addCardBtn.addEventListener("click", () => {
  formValidators["cardForm"].resetValidation();
  addCardPopup.open();
});

// Validation
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

enableValidation(validationSettings);
