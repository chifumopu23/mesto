const showError = (errorElement, inputElement) => {
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = inputElement.validationMessage;
};

const hideError = (errorElement, inputElement) => {
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = inputElement.validationMessage;
};

const checkInputValidity = (inputElement, formElement) => {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (!isInputValid) {
    showError(errorElement, inputElement);
  } else {
    hideError(errorElement, inputElement);
  }
};

const setEventListener = (formElement) => {
  const inputList = formElement.querySelectorAll('.popup__input');

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  [...inputList].forEach((input) => {
    input.addEventListener('input', (e) => {
      checkInputValidity(input, formElement);
    });
  });
};

const enableValidation = () => {
  const forms = document.querySelectorAll('.popup__form');

  forms.forEach((form) => {
    setEventListener(form);
  });
};

enableValidation();
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__input-error',
// })
