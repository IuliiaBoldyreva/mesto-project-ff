const initialCards = [
    {
        title: "Индонезия",
        imageURL: "./images/indonezia.jpg",
        altText: "Фото природы тайланда, зелёные травянные поля"
    },
    {
        title: "Монтенегро",
        imageURL: "./images/montenegro.jpg",
        altText: "горный хребет с водой у подножья в монтенегро"
    },
    {
        title: "Фонтант \"Треви\", Рим",
        imageURL: "./images/rome.jpg",
        altText: "фонтант треви в риме"
    },
    {
        title: "Морское побережье",
        imageURL: "./images/sea.jpg",
        altText: "море окруженное скалами"
    },
    {
        title: "Альпы",
        imageURL: "././images/alpina.jpg",
        altText: "заснеженные горы"
    },
    {
        title: "Тайланд",
        imageURL: "./images/thailand.jpg",
        altText: "чайное поле"
    }
];

const cardTemplate = document.getElementById("photos-grid-template");
const photoGridItems = document.querySelector(".photo-grid__items");
const changeButton = document.querySelector(".profile__change-button");
const addButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_theme_editprofile");
const popupAddphoto = document.querySelector(".popup_theme_addphoto");
const inputName = document.querySelector(".popup__input_theme_name");
const profileName = document.querySelector(".profile__name");
const inputJob = document.querySelector(".popup__input_theme_job");
const profileJob = document.querySelector(".profile__job");
const formElementEdit = document.querySelector(".popup__form_theme_edit");
const formElementAdd = document.querySelector(".popup__form_theme_add");
const popupPhotoOpen = document.querySelector(".popup_theme_photo");
const photoGridImg = cardTemplate.querySelector(".photo-grid__image");



changeButton.addEventListener("click", () => {
    const defaultValueName = profileName.textContent;
    const defaultValueJob = profileJob.textContent;
    inputName.value = defaultValueName;
    inputJob.value = defaultValueJob;
    popupEditProfile.classList.add("popup_visible");
});

addButton.addEventListener("click", () => {
    popupAddphoto.classList.add("popup_visible");
});

function closePopup() {
    popupEditProfile.classList.remove("popup_visible");
    popupAddphoto.classList.remove("popup_visible");
    popupPhotoOpen.classList.remove("popup_visible");
}

document.querySelectorAll(".popup__close-button").forEach((button) => {
    button.addEventListener("click", closePopup);
})

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup();
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
    renderCard(item, photoGridItems);
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
    }, photoGridItems);

    closePopup();

    document.querySelector("#nameCard").value = '';
    document.querySelector("#urlCard").value = '';
}


formElementAdd.addEventListener('submit', handleAddCard);

function openPhotoPopup(imageURL, titleText) {
   
    const popupImg = popupPhotoOpen.querySelector(".popup__img");
    const popupTitle = popupPhotoOpen.querySelector(".popup__title-img");
  
    popupImg.src = imageURL;
    popupImg.alt = titleText;
    popupTitle.textContent = titleText;

    popupPhotoOpen.classList.add("popup_visible");

}
 
  
  
  
  
  
  


