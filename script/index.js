import { initialCards } from './cards.js';

const cardTemplate = document.getElementById("photos-grid-template");
const photoGridСontainner = document.querySelector(".photo-grid__items");
export const changeButton = document.querySelector(".profile__change-button");
export const addButton = document.querySelector(".profile__add-button");
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

changeButton.addEventListener("click", () => {
    const defaultValueName = profileName.textContent;
    const defaultValueJob = profileJob.textContent;
    inputName.value = defaultValueName;
    inputJob.value = defaultValueJob;
    openPopup(popupEditProfile);
});

addButton.addEventListener("click", () => {
    formElementAdd.reset();
    openPopup(popupAddphoto);
});

function openPopup(popupNode){
    popupNode.classList.add('popup_visible');
    popupNode.addEventListener('click', closePopupByOverlay);
    document.addEventListener('keydown', closePopupByKey);
}

function closePopup(popupNode) {
    popupNode.classList.remove('popup_visible');
    popupNode.removeEventListener('click', closePopupByOverlay);
    document.removeEventListener('keydown', closePopupByKey);
}


function closePopupByOverlay(event) {
    if (event.target === event.currentTarget) {
      closePopup(event.target);
    }
  }

  function closePopupByKey(event) {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_visible');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }
  
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
    renderCard(item, photoGridСontainner);
});

function renderCardAdd(card, container) {
    container.prepend(createCard(card));
}

function handleAddCard(event) {
    event.preventDefault();
    const title = document.querySelector("#nameCard").value;

    renderCardAdd({
        imageURL: document.querySelector("#urlCard").value,
        altText: title,
        title
    }, photoGridСontainner);

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
 
  
  
  
  
  
  


