const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const selectors = {
  page: '.page',
  user: '.user',
  name: '.user__name',
  job: '.user__job',
  editBtn: '.user__edit-btn',
  closeBtn: '.popup__close-btn',
  addBtn: '.user__add-btn',
  likeBtn:  '.place-item__like-btn',
  deleteBtn: '.place-item__delete-btn',
  popup: '.popup',
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
  imgTitle: '.place-item__title'
}

const page = document.querySelector(selectors.page);
const user = document.querySelector(selectors.user);
const userName = user.querySelector(selectors.name);
const userJob = user.querySelector(selectors.job);
const editButton = user.querySelector(selectors.editBtn);
const addButton = user.querySelector(selectors.addBtn);
const popup = document.querySelector(selectors.popup);
const popupEdit = document.querySelector(selectors.popEdit);
const popupAdd = document.querySelector(selectors.popAdd);
const popupViewer = document.querySelector(selectors.popViewer);
const closeButton = popup.querySelector(selectors.closeBtn);
const formEdit = document.querySelector(selectors.editForm);
const formAdd = document.querySelector(selectors.addForm);
const nameInput = formEdit.querySelector(selectors.inputName);
const jobInput = formEdit.querySelector(selectors.inputJob);
const titleInput = formAdd.querySelector(selectors.inputTitle);
const linkInput = formAdd.querySelector(selectors.inputLink);
const places = document.querySelector(selectors.places);
const template = document.querySelector(selectors.template).content.querySelector('.place-item');
const imageItem = places.querySelector(selectors.img);
const likeButton = template.querySelector(selectors.likeBtn);
const popupImage = popupViewer.querySelector(selectors.popImage);
const popupFigcaption = popupViewer.querySelector(selectors.popFigcaption);

// функция открытия попапа
function openPopup(pop) {
  pop.classList.add('popup_opened');
}

// функция закрытия попапа
function close() {
  popup.classList.remove('popup_opened');
}

// функция для кнопки закрытия попапа
function closePopup(evt) {
  const target = evt.target;
  if (target.classList.contains('popup__close-btn') || target.classList.contains('popup__save-btn')) {
    target.closest('.popup').classList.remove('popup_opened');
  }
}

// функция заполняющая инпуты окна редактирования профиля
function setPopupInputValue() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// функция передающая значения инпутов окна редактирования
function formSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  close();
}

// функция создания и удаления карточки
function createItem(name, link) {
  const itemTemplate = template.cloneNode(true);
  const itemTitle = itemTemplate.querySelector(selectors.imgTitle);
  const itemImage = itemTemplate.querySelector(selectors.img);
  const deleteButton = itemTemplate.querySelector(selectors.deleteBtn);

  deleteButton.addEventListener('click', function () {
    itemTemplate.remove();
  })

  itemTitle.textContent = name;
  itemImage.src = link;
  itemImage.alt = `${name}`;
  places.prepend(itemTemplate);
}

// функция создания карточек из массива
function createDefaultItems() {
  initialCards.map( function (item) {
    return createItem(item.name, item.link);
  });
}

// применение функции создания карточек из массива
createDefaultItems();

// функция передающая значения инпутов окна создания новой карточки
function formSubmitHandlerAddItem(evt) {
  evt.preventDefault();
  createItem(titleInput.value, linkInput.value);
}

// функция изменяющая кнопку лайка на активный
function likeActive(like) {
  const target = like.target;
  if (target.classList.contains('place-item__like-btn')){
    target.classList.toggle('place-item__like-btn_active');
  }
}

// функция открытия изображения
function openViewer(evt) {
  const target = evt.target;
  if (target.classList.contains('place-item__image')) {
    popupImage.src = target.src;
    popupFigcaption.textContent = target.alt;
    openPopup(popupViewer);
  }
}

// событие при клике на кнопку закрытия
page.addEventListener('click', closePopup);

// событие при клике на кнопку изображении
places.addEventListener('click', openViewer)

// событие при клике на кнопку редактирования
editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  setPopupInputValue();
});

// событие при клике на кнопку добавления новой карточки
addButton.addEventListener('click', function () {
  openPopup(popupAdd);
});

// событие при клике на кнопку лайка
places.addEventListener('click', likeActive)

// событие при нажатии кнопки сохранить окна редактирования
formEdit.addEventListener('submit', formSubmitHandler);

// событие при нажатии кнопки создать окна добавления карточки
formAdd.addEventListener('submit', formSubmitHandlerAddItem);

