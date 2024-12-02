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
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["profileEditForm"];

// Add New Card Modal Variables
const addCardBtn = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-modal");
const addCardTitleInput = document.querySelector("#add-title-input");
const addCardLinkInput = document.querySelector("#add-link-input");
const addCardForm = document.forms["addCardForm"];

// Image Modal
const imageModal = document.querySelector("#image-modal");
const imageModalPicture = imageModal.querySelector(".modal__image");
const imageModalTitle = imageModal.querySelector("#image-modal-title");

// Card Template
const cardListEl = document.querySelector(".elements__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Close Button
const closeButtons = document.querySelectorAll(".modal__close");

// Functions
function openPopUp(modal) {
  modal.classList.add("modal_opened");
}
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function addImage(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  evt.target.reset();
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
    imageModalTitle.alt = cardData.name;
    imageModalTitle.textContent = cardData.name;
    openPopUp(imageModal);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

profileTitleInput.value = profileTitle.textContent;
profileDescriptionInput.value = profileDescription.textContent;

closeButtons.forEach((button) => {
  const popUp = button.closest(".modal");
  button.addEventListener("click", () => closePopUp(popUp));
});

// Event Listneres
profileEditBtn.addEventListener("click", () => openPopUp(profileEditModal));
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardBtn.addEventListener("click", () => openPopUp(addCardModal));
addCardForm.addEventListener("submit", addImage);
