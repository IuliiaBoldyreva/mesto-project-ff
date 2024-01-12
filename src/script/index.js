import { initialCards, config } from "./constants.js";
import { disabledButton, resetErrors, enableValidation } from "./validate.js";
import { openPopup, closePopup } from "./modal.js";
import {
  createCard,
  handleLikeCard,
  handleCardPhotoClick,
  handleRemoveCardClick,
} from "./card.js";

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

function renderCard(data, container) {
  container.appendChild(
    createCard(
      data,
      handleLikeCard,
      handleCardPhotoClick,
      handleRemoveCardClick
    )
  );
}

initialCards.forEach((item) => {
  renderCard(item, photoGridContainner);
});

function renderCardAdd(card, container) {
  container.prepend(
    createCard(
      card,
      handleLikeCard,
      handleCardPhotoClick,
      handleRemoveCardClick
    )
  );
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

enableValidation(config);
