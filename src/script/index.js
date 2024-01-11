import { initialCards } from "./constants.js";
import { disabledButton, config, resetErrors } from "./validate.js";
import { openPopup, closePopup } from "./modal.js";

const cardTemplate = document.getElementById("photos-grid-template");
const photoGridContainner = document.querySelector(".photo-grid__items");
const changeButton = document.querySelector(".profile__change-button");
const addButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_theme_edit-profile");
const popupAddphoto = document.querySelector(".popup_theme_add-photo");
const inputName = document.querySelector(".popup__input_theme_name");
const profileName = document.querySelector(".profile__name");
const inputJob = document.querySelector(".popup__input_theme_job");
const profileJob = document.querySelector(".profile__job");
const formElementEdit = document.querySelector(".popup__form_theme_edit");
const formElementAdd = document.querySelector(".popup__form_theme_add");
const popupPhotoOpen = document.querySelector(".popup_theme_photo");
const popupImg = popupPhotoOpen.querySelector(".popup__img");
const popupTitle = popupPhotoOpen.querySelector(".popup__title-img");
const saveButtonEdit = popupEditProfile.querySelector(".popup__save-button");
const saveButtonAdd = popupAddphoto.querySelector(".popup__save-button");
const popupInputsAdd = popupAddphoto.querySelectorAll(config.inputSelector);
const popupInputsEdit = popupEditProfile.querySelectorAll(config.inputSelector);
const title = document.querySelector("#nameCard");
const urlImg = document.querySelector("#urlCard");

changeButton.addEventListener("click", () => {
  const defaultValueName = profileName.textContent;
  const defaultValueJob = profileJob.textContent;
  inputName.value = defaultValueName;
  inputJob.value = defaultValueJob;
  openPopup(popupEditProfile);
  disabledButton(saveButtonEdit, config);
  resetErrors(popupInputsEdit, config);
});

addButton.addEventListener("click", () => {
  formElementAdd.reset();
  openPopup(popupAddphoto);
  disabledButton(saveButtonAdd, config);
  resetErrors(popupInputsAdd, config);
});

document.querySelectorAll(".popup__close-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const popupNode = event.currentTarget.closest(".popup");
    if (!popupNode) return;

    closePopup(popupNode);
  });
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

formElementEdit.addEventListener("submit", handleFormSubmit);

function createCard(data, onLikeClick, onCardPhotoClick, onRemoveCardClick) {
  const tamplateElement = cardTemplate.content
    .querySelector(".photo-grid__item")
    .cloneNode(true);
  const photoGridImg = tamplateElement.querySelector(".photo-grid__image");
  const templateTitle = tamplateElement.querySelector(".photo-grid__title");
  const buttonDelete = tamplateElement.querySelector(
    ".photo-grid__delete-button"
  );

  tamplateElement
    .querySelector(".photo-grid__like-button")
    .addEventListener("click", onLikeClick);

  photoGridImg.src = data.imageURL;
  photoGridImg.alt = data.altText;
  templateTitle.textContent = data.title;

  buttonDelete.addEventListener("click", onRemoveCardClick);

  photoGridImg.addEventListener("click", onCardPhotoClick);

  return tamplateElement;
}

function handleLikeCard(event) {
    event.target.classList.toggle('photo-grid__like-button_active');
}

function handleCardPhotoClick(event) {
    openPhotoPopup(event.target.src, event.target.alt);
}

function handleRemoveCardClick(event) {
    const card = event.target.closest('.photo-grid__item');
    if (!card) return;

    card.remove();
}

function renderCard(data, container) {
  container.appendChild(createCard(data, handleLikeCard, handleCardPhotoClick, handleRemoveCardClick));
}

initialCards.forEach((item) => {
  renderCard(item, photoGridContainner);
});

function renderCardAdd(card, container) {
  container.prepend(createCard(card, handleLikeCard, handleCardPhotoClick, handleRemoveCardClick));
}

function handleAddCard(event) {
  event.preventDefault();

  renderCardAdd(
    {
      imageURL: urlImg.value,
      altText: title.value,
      title: title.value,
    },
    photoGridContainner
  );

  closePopup(popupAddphoto);
  formElementAdd.reset();
}

formElementAdd.addEventListener("submit", handleAddCard);

function openPhotoPopup(imageURL, titleText) {
  popupImg.src = imageURL;
  popupImg.alt = titleText;
  popupTitle.textContent = titleText;

  openPopup(popupPhotoOpen);
}
