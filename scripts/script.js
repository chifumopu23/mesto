let editButton = document.querySelector('.edit-btn');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.close-btn');

function openPopup() {
  popup.classList.add('open-popup');
}

function closePopup() {
  popup.classList.remove('open-popup');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

let formElement = document.querySelector('.user-form');
let nameInput = document.querySelector('.input-name');
let jobInput = document.querySelector('.input-job');

function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  let userName = document.querySelector('.user-info__name');
  let userJob = document.querySelector('.user-info__job');

 userName.textContent = nameValue;
 userJob.textContent = jobValue;
 closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

