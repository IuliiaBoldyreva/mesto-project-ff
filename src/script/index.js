import { config } from "./constants.js";
import { enableValidation, clearValidation } from "./validate.js";
import { openPopup, closePopup } from "./modal.js";
import {
  createCard,
  handleLikeCard,
  handleCardPhotoClick,
  handleRemoveCardClick,
} from "./card.js";
import {
  addCard,
  getInitialCards,
  getUserData,
  updateUserData,
  updateAvatar
} from "./api.js";

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const profilePhoto = document.querySelector(".profile__photo");
const photoGridContainner = document.querySelector(".photo-grid__items");
const changeButton = document.querySelector(".profile__change-button");
const addButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_theme_edit-profile");
const popupAddphoto = document.querySelector(".popup_theme_add-photo");
const popupAvatar = document.querySelector(".popup_theme_edit-avatar");
const inputName = document.querySelector(".popup__input_theme_name");
const inputJob = document.querySelector(".popup__input_theme_job");
const inputAvatarUrl = document.querySelector("#avatarUrl");
const formElementEdit = document.querySelector(".popup__form_theme_edit");
const formElementAdd = document.querySelector(".popup__form_theme_add");
const formElementAvatar = document.querySelector(".popup__form_theme_avatar");
const avatarPhoto = document.querySelector(".profile__container");
const title = document.querySelector("#nameCard");
const urlImg = document.querySelector("#urlCard");

changeButton.addEventListener("click", () => {
  clearValidation(formElementEdit, config);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  openPopup(popupEditProfile);
});

addButton.addEventListener("click", () => {
  clearValidation(formElementAdd, config);

  openPopup(popupAddphoto);
});

avatarPhoto.addEventListener("click", () => {
  clearValidation(formElementAvatar, config);
  inputAvatarUrl.value = profilePhoto.src;

  openPopup(popupAvatar);
});

document.querySelectorAll(".popup__close-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const popupNode = event.currentTarget.closest(".popup");
    if (!popupNode) return;

    closePopup(popupNode);
  });
});

function toggleFormLoadingState(formNode) {
  const submitButton = formNode.querySelector(".popup__save-button");

  submitButton.classList.toggle('popup__save-button_loading');
}

function handleFormSubmit(event) {
  event.preventDefault();
  toggleFormLoadingState(event.target)

  updateUserData({ name: inputName.value, about: inputJob.value })
    .then((userData) => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      closePopup(popupEditProfile);
    })
    .catch(console.log)
    .finally(() => {
      toggleFormLoadingState(event.target)
    })
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

function handleAddCard(event) {
  event.preventDefault();
  toggleFormLoadingState(event.target)

  addCard({ name: title.value, link: urlImg.value })
    .then((card) => {
      photoGridContainner.prepend(
        createCard(
          {
            id: card._id,
            imageURL: card.link,
            altText: card.name,
            title: card.name,
            likes: card.likes,
            canDelete: true,
            hasLike: false,
          },
          handleLikeCard,
          handleCardPhotoClick,
          handleRemoveCardClick
        )
      );

      closePopup(popupAddphoto);
    })
    .catch(console.log)
    .finally(() => {
      toggleFormLoadingState(event.target)
    })
}
formElementAdd.addEventListener("submit", handleAddCard);

function handleEditAvatar(event) {
  event.preventDefault();
  toggleFormLoadingState(event.target);
  updateAvatar(inputAvatarUrl.value)
    .then(() => {
      profilePhoto.src = inputAvatarUrl.value;
      closePopup(popupAvatar);
    })
    .catch(console.log)
    .finally(() => {
      toggleFormLoadingState(event.target);
    })
}

formElementAvatar.addEventListener("submit", handleEditAvatar);


enableValidation(config);

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profilePhoto.src = userData.avatar;

    cards.forEach((item) => {
      renderCard(
        {
          id: item._id,
          title: item.name,
          imageURL: item.link,
          altText: item.name,
          likes: item.likes,
          canDelete: item.owner._id === userData._id,
          hasLike: item.likes.some((user) => user._id === userData._id),
        },
        photoGridContainner
      );
    });
  })
  .catch(console.log);
