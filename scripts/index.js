let user = document.querySelector('.user')
let editButton = user.querySelector('.user__edit-btn')
let userName = user.querySelector('.user__name')
let userJob = user.querySelector('.user__job')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close-btn')
let formElement = popup.querySelector('.popup__form')
let nameInput = formElement.querySelector('.popup__input_type_name')
let jobInput = formElement.querySelector('.popup__input_type_job')

function openPopup() {
  popup.classList.add('popup_opened')
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function formSubmitHandler(evt) {
  evt.preventDefault()
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup()
}

editButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)
formElement.addEventListener('submit', formSubmitHandler)

