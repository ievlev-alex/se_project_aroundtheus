import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// Elements
const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

// DOM elements
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.querySelector("#profileEditForm");
const editForm = document.forms["editForm"];
const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-modal");
const addCardTitleInput = document.querySelector("#add-title-input");
const addCardLinkInput = document.querySelector("#add-link-input");
const addCardForm = document.forms["addCardForm"];
const imageModal = document.querySelector("#image-modal");
const imageModalPicture = imageModal.querySelector(".modal__image");
const imageModalTitle = imageModal.querySelector("#image-modal-title");
const cardListEl = document.querySelector(".elements__list");
const closeButtons = document.querySelectorAll(".modal__close");

// Functions
function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleCloseModal);
  modal.addEventListener("click", handleCloseModal);
}
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleCloseModal);
  modal.removeEventListener("click", handleCloseModal);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  formValidators["editForm"].disableButton();

  closePopUp(profileEditModal);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.createCard();
}

function renderCard(cardData, cardListEl) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

function addImage(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  formValidators["editForm"].disableButton();
  closePopUp(addCardModal);
}

// Image modal
function handleImageClick(name, link) {
  imageModalPicture.src = link;
  imageModalPicture.alt = name;
  imageModalTitle.textContent = name;
  openPopUp(imageModal);
}

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

closeButtons.forEach((button) => {
  const popUp = button.closest(".modal");
  button.addEventListener("click", () => closePopUp(popUp));
});

// Closing the Popup by Clicking on the Overlay and by Pressing Esc.
function handleCloseModal(evt) {
  const openedModal = document.querySelector(".modal_opened");
  if (!openedModal) return;

  if (evt.type === "keydown" && evt.key === "Escape") {
    closePopUp(openedModal);
  } else if (evt.type === "click" && evt.target === openedModal) {
    closePopUp(openedModal);
  }
}

// Event Listneres
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  formValidators["editForm"].resetValidation();
  openPopUp(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardBtn.addEventListener("click", () => openPopUp(addCardModal));
addCardForm.addEventListener("submit", addImage);

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
