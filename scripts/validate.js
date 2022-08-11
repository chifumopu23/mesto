const showError = (errorElement, inputElement, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideError = (errorElement, inputElement, inputErrorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const checkInputValidity = (inputElement, formElement, config) => {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (!isInputValid) {
    showError(errorElement, inputElement, config);
  } else {
    hideError(errorElement, inputElement, config);
  }
};

const toggleButtonState = (button, isActive, inactiveButtonClass) => {
  if (isActive) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(inactiveButtonClass);
    button.disabled = 'disabled';
  }
};

const setEventListener = (
  formElement,
  { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }
) => {
  const inputList = formElement.querySelectorAll(inputSelector);
  const submitButton = formElement.querySelector(submitButtonSelector);

  [...inputList].forEach((input) => {
    input.addEventListener('input', (e) => {
      checkInputValidity(input, formElement, inputErrorClass);
      toggleButtonState(
        submitButton,
        formElement.checkValidity(),
        inactiveButtonClass
      );
    });
  });
};

const enableValidation = ({ formSelector, ...rest }) => {
  const forms = document.querySelectorAll(formSelector);

  Array.from(forms).forEach((formElement) => {
    setEventListener(formElement, rest);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
});
