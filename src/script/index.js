import { initialCards } from './cards.js';
import { disabledButton, config, hideError } from './validate.js';
import {openPopup, closePopup, closePopupByOverlay, closePopupByKey} from './modal.js';

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

function resetErrors(inputsList){
    [...inputsList].forEach(function (inputElement) {
        const erorrElement = document.querySelector(`#${inputElement.name}-error`);
        hideError(inputElement, erorrElement, config);
    });
}

changeButton.addEventListener("click", () => {
    const defaultValueName = profileName.textContent;
    const defaultValueJob = profileJob.textContent;
    inputName.value = defaultValueName;
    inputJob.value = defaultValueJob;
    openPopup(popupEditProfile);
    disabledButton(saveButtonEdit, config);
    resetErrors(popupInputsEdit);
});

addButton.addEventListener("click", () => {
    formElementAdd.reset();
    openPopup(popupAddphoto);
    disabledButton(saveButtonAdd, config);
    resetErrors(popupInputsAdd);
});
  
document.querySelectorAll(".popup__close-button").forEach((button) => {
    button.addEventListener("click", (event) => {
        const popupNode = event.currentTarget.closest('.popup');
        if (!popupNode) return;

        closePopup(popupNode);
    });
})

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(popupEditProfile);
}

formElementEdit.addEventListener('submit', handleFormSubmit);

function createCard(data) {
    const tamplateElement = cardTemplate.content.querySelector(".photo-grid__item").cloneNode(true);
    const photoGridImg = tamplateElement.querySelector(".photo-grid__image");
    const templateTitle = tamplateElement.querySelector(".photo-grid__title");
    const buttonDelete = tamplateElement.querySelector(".photo-grid__delete-button");

    tamplateElement.querySelector('.photo-grid__like-button').addEventListener('click', (event) => {
        event.target.classList.toggle('photo-grid__like-button_active');
    });

    photoGridImg.src = data.imageURL;
    photoGridImg.alt = data.altText;
    templateTitle.textContent = data.title;

    buttonDelete.addEventListener("click", () => {
        tamplateElement.remove();
    });

    photoGridImg.addEventListener("click", () => {
        openPhotoPopup(data.imageURL, data.title);
    });


    return tamplateElement;
};

function renderCard(data, container) {
    container.appendChild(createCard(data));
}

initialCards.forEach((item) => {
    renderCard(item, photoGridContainner);
});

function renderCardAdd(card, container) {
    container.prepend(createCard(card));
}

function handleAddCard(event) {
    event.preventDefault();

     renderCardAdd({
       imageURL: urlImg.value,
      altText: title.value,
       title: title.value
    }, photoGridContainner);

    closePopup(popupAddphoto);
    formElementAdd.reset();
}

formElementAdd.addEventListener('submit', handleAddCard);

function openPhotoPopup(imageURL, titleText) {
    popupImg.src = imageURL;
    popupImg.alt = titleText;
    popupTitle.textContent = titleText;

    openPopup(popupPhotoOpen)
}


