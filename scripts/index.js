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
// Edit Profile Modal Variables
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-modal");
const profileCloseBtn = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

// Add New Card Modal Variables
const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-modal");
const addCardCloseBtn = addCardModal.querySelector(".modal__close");
const addCardTitleInput = document.querySelector("#add-title-input");
const addCardLinkInput = document.querySelector("#add-link-input");
const addCardForm = addCardModal.querySelector(".modal__form");

// Image Modal
const imageModal = document.querySelector("#image-modal");
const imageCloseBtn = imageModal.querySelector(".modal__close");
const imageModalPicture = imageModal.querySelector(".modal__image");
const imageModalTitle = imageModal.querySelector("#image-modal-title");

// Card Template
const cardListEl = document.querySelector(".elements__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Functions
function openPopUp(modal) {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  modal.classList.add("modal_opened");
}
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
}
function submitProfileEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function cardRender(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function addImage(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardLinkInput.value;
  cardRender({ name, link }, cardListEl);
  closePopUp(addCardModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  // Like button
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // Delete Button
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Image modal
  cardImageEl.addEventListener("click", () => {
    imageModalPicture.src = cardData.link;
    imageModalTitle.src = cardData.name;
    imageModalTitle.textContent = cardData.name;
    openPopUp(imageModal);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}
initialCards.forEach((cardData) => cardRender(cardData, cardListEl));

// Event Listneres
profileEditBtn.addEventListener("click", () => openPopUp(profileEditModal));
profileCloseBtn.addEventListener("click", () => closePopUp(profileEditModal));
profileEditForm.addEventListener("submit", submitProfileEdit);

addCardBtn.addEventListener("click", () => openPopUp(addCardModal));
addCardCloseBtn.addEventListener("click", () => closePopUp(addCardModal));

addCardForm.addEventListener("submit", addImage);

imageCloseBtn.addEventListener("click", () => closePopUp(imageModal));
