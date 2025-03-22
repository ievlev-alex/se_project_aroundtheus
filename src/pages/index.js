import "../styles/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirmDelete from "../components/PopupWithConfirmDelete.js";
import {
  profileEditBtn,
  addCardBtn,
  validationSettings,
  avatarElement,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "660f60ae-1ffb-44a2-ae40-5e62b3aee5a2",
    "Content-Type": "application/json",
  },
});

function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (name, link) => imagePopup.open({ name, link }),
    confirmDeletePopup,
    api
  );
  return card.createCard();
}

function handleDeleteCard(card) {
  confirmDeletePopup.disableButton();
  return api
    .deleteCard(card._cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => console.error(err));
}
// Popups

const imagePopup = new PopupWithImage("#image-modal");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__photo",
});

const profilePopup = new PopupWithForm(
  "#profile-modal",
  (formData) => {
    function makeRequest() {
      return api
        .updateUserInfo({
          name: formData["name"],
          about: formData["about"],
        })
        .then((userData) => {
          userInfo.setUserInfo(userData);
        });
    }
    handleSubmit(makeRequest, profilePopup);
  },
  validationSettings
);

const addCardPopup = new PopupWithForm(
  "#add-modal",
  (formData) => {
    function makeRequest() {
      return api
        .createCard({
          name: formData["image-title"],
          link: formData["link"],
        })
        .then((cardData) => {
          const cardElement = createCard(cardData);
          cardSection.addItem(cardElement);
        });
    }
    handleSubmit(makeRequest, addCardPopup);
  },
  validationSettings
);

const avatarPopup = new PopupWithForm(
  "#change-modal",
  (formData) => {
    function makeRequest() {
      return api
        .updateAvatar({
          avatar: formData.avatar,
        })
        .then((userData) => {
          userInfo.setUserAvatar(userData.avatar);
        });
    }
    handleSubmit(makeRequest, avatarPopup);
  },
  validationSettings
);

const confirmDeletePopup = new PopupWithConfirmDelete(
  "#delete-modal",
  handleDeleteCard,
  validationSettings
);

// Section
const cardSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      return createCard(cardData);
    },
  },
  ".elements__list"
);

api
  .getAppData()
  .then(([user, cards]) => {
    if (user) {
      userInfo.setUserInfo(user);
    } else {
      console.error("User data not available.");
    }

    const greetingCard = cards.find(
      (card) => card.name === "Greetings from the server!"
    );
    if (greetingCard) {
      api
        .deleteCard(greetingCard._id)
        .then(() => {
          const remainingCards = cards.filter(
            (card) => card._id !== greetingCard._id
          );
          cardSection.renderItems(remainingCards);
        })
        .catch((err) => console.log("Error deleting card:", err));
    } else {
      cardSection.renderItems(cards);
    }
  })
  .catch((err) => console.error("Failed to load initial data:", err));

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

avatarElement.addEventListener("click", () => {
  formValidators["avatarForm"].resetValidation();
  avatarPopup.open();
});

addCardPopup.setEventListeners();
confirmDeletePopup.setEventListeners();
imagePopup.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();

// Validation
const formValidators = {};

const enableValidation = (config) => {
  const formList = [
    profilePopup.getForm(),
    addCardPopup.getForm(),
    avatarPopup.getForm(),
  ];

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
