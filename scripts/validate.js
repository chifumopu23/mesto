const configValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
};

const showError = (errorElement, inputElement, configValidate) => {
  inputElement.classList.add(configValidate.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideError = (errorElement, inputElement, configValidate) => {
  inputElement.classList.remove(configValidate.inputErrorClass);
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

const disabledButton = (button, config) => {
  button.classList.add(config);
  button.disabled = 'disabled';
};

const undisabledButton = (button, config) => {
  button.classList.remove(config);
  button.disabled = false;
};

const toggleButtonState = (button, isActive, config) => {
  if (isActive) {
    undisabledButton(button, config);
  } else {
    disabledButton(button, config);
  }
};

const setEventListener = (formElement, configValidate) => {
  const inputList = formElement.querySelectorAll(configValidate.inputSelector);
  const submitButton = formElement.querySelector(
    configValidate.submitButtonSelector
  );

  [...inputList].forEach((input) => {
    input.addEventListener('input', (e) => {
      console.log('gdgdgdgdg');

      checkInputValidity(input, formElement, configValidate.inputErrorClass);
      toggleButtonState(
        submitButton,
        formElement.checkValidity(),
        configValidate.inactiveButtonClass
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

enableValidation(configValidate);
