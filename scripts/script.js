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
