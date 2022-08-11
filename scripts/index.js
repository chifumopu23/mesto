const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const selectors = {
  user: '.user',
  name: '.user__name',
  job: '.user__job',
  editBtn: '.user__edit-btn',
  closeBtn: '.popup__close-btn',
  addBtn: '.user__add-btn',
  likeBtn: '.place-item__like-btn',
  deleteBtn: '.place-item__delete-btn',
  popEdit: '.popup_type_edit',
  popAdd: '.popup_type_add',
  popViewer: '.popup_type_viewer',
  popImage: '.popup__image',
  popFigcaption: '.popup__figcaption',
  editForm: '.popup__form_type_edit',
  addForm: '.popup__form_type_add',
  inputName: '.popup__input_type_name',
  inputJob: '.popup__input_type_job',
  inputTitle: '.popup__input_type_title',
  inputLink: '.popup__input_type_link',
  template: '#template-item',
  places: '.places__items',
  img: '.place-item__image',
  imgTitle: '.place-item__title',
};

const user = document.querySelector(selectors.user);
const userName = user.querySelector(selectors.name);
const userJob = user.querySelector(selectors.job);
const buttonEdit = user.querySelector(selectors.editBtn);
const buttonAdd = user.querySelector(selectors.addBtn);
const popupEdit = document.querySelector(selectors.popEdit);
const popupAdd = document.querySelector(selectors.popAdd);
const popupViewer = document.querySelector(selectors.popViewer);
const buttonsClose = document.querySelectorAll(selectors.closeBtn);
const formEdit = document.querySelector(selectors.editForm);
const formAdd = document.querySelector(selectors.addForm);
const nameInput = formEdit.querySelector(selectors.inputName);
const jobInput = formEdit.querySelector(selectors.inputJob);
const titleInput = formAdd.querySelector(selectors.inputTitle);
const linkInput = formAdd.querySelector(selectors.inputLink);
const places = document.querySelector(selectors.places);
const template = document
  .querySelector(selectors.template)
  .content.querySelector('.place-item');
const imageItem = places.querySelector(selectors.img);
const likeButton = template.querySelector(selectors.likeBtn);
const popupImage = popupViewer.querySelector(selectors.popImage);
const popupFigcaption = popupViewer.querySelector(selectors.popFigcaption);

// функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', function (e) {
    closePopupEsc(e);
  });
}

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', function (e) {
    closePopupEsc(e);
  });
}

// функция закрытия при нажатии ESC
function closePopupEsc(e) {
  if (e.key === 'Escape') {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
}

//функция закрытия при клике на оверлей
function closePopupOverlay(e) {
  if (e.target.classList.contains('popup')) {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
}

// функция заполняющая инпуты окна редактирования профиля
function setPopupInputValue() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// функция передающая значения инпутов окна редактирования
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

// функция создания карточки
function createCard(name, link) {
  const cardElement = template.cloneNode(true);
  const cardTitle = cardElement.querySelector(selectors.imgTitle);
  const cardImage = cardElement.querySelector(selectors.img);
  const cardDeleteButton = cardElement.querySelector(selectors.deleteBtn);
  const cardLikeButton = cardElement.querySelector(selectors.likeBtn);

  // событие при клике на кнопку корзины
  cardDeleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

  // событие при клике на кнопку лайка
  cardLikeButton.addEventListener('click', likeActive);

  // событие при клике на кнопку изображении
  cardImage.addEventListener('click', () => handleCardClick(name, link));

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  return cardElement;
}

function createItem(name, link) {
  const itemTemplate = createCard(name, link);
  places.prepend(itemTemplate);
}

function createDefaultItems() {
  initialCards.map(function (item) {
    return createItem(item.name, item.link);
  });
}
// функция дективации кнопки
function disabledButton() {
  const buttonDisabled = formAdd.querySelector('.popup__save-btn');
  buttonDisabled.classList.add('popup__button_disabled');
  buttonDisabled.disabled = 'disabled';
}
createDefaultItems();

// функция передающая значения инпутов окна создания новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  createItem(titleInput.value, linkInput.value);
  evt.target.reset();
  closePopup(popupAdd);
}

// функция изменяющая кнопку лайка на активный
function likeActive(like) {
  const target = like.target;
  target.classList.toggle('place-item__like-btn_active');
}

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupFigcaption.textContent = name;
  openPopup(popupViewer);
}

// событие при клике на кнопку закрытия
buttonsClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

document.addEventListener('click', function (e) {
  closePopupOverlay(e);
});

// событие при клике на кнопку редактирования
buttonEdit.addEventListener('click', function () {
  openPopup(popupEdit);
  setPopupInputValue();
});

// событие при клике на кнопку добавления новой карточки
buttonAdd.addEventListener('click', function () {
  openPopup(popupAdd);
  disabledButton();
});

// событие при нажатии кнопки сохранить окна редактирования
formEdit.addEventListener('submit', handleProfileFormSubmit);

// событие при нажатии кнопки создать окна добавления карточки
formAdd.addEventListener('submit', handleAddCardFormSubmit);
