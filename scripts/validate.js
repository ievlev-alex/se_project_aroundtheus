const showInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(options.errorClass);
};

const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }
  hideInputError(formElement, inputElement, options);
};

function setEventListeners(formElement, options) {
  const inputElements = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(inputElements, buttonElement, options);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, buttonElement, options);
    });
  });
}

function enableValidation(options) {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );

  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

const hasInvalidInput = (inputElements) => {
  return inputElements.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputElements, buttonElement, options) => {
  if (hasInvalidInput(inputElements)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    return buttonElement.setAttribute("disabled", true);
  }
  buttonElement.classList.remove(options.inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-textfield",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button-inactive",
  inputErrorClass: "modal__form-textfield-error",
  errorClass: "modal__error-text-visible",
};

enableValidation(config);
