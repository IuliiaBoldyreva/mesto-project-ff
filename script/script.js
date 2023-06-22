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
        title: "Индонезия",
        imageURL: "./images/thailand.jpg",
        altText: "чайное поле"
    }
  ];

const cardTemplate = document.getElementById("photos-grid-template");
const photoGridItems = document.querySelector(".photo-grid__items");
const changeButton = document.querySelector(".profile__change-button");
const addButton = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup_theme_editprofile");
const popupAddphoto = document.querySelector(".popup_theme_addphoto");
const inputName = document.querySelector(".popup__input_theme_name");
const profileName = document.querySelector(".profile__name");
const inputJob = document.querySelector(".popup__input_theme_job");
const profileJob = document.querySelector(".profile__job");
const formElement = document.querySelector(".popup__form");

initialCards.forEach((initialCard) => {
    const cardClone = document.importNode(cardTemplate.content, true);
    const photoGridImg = cardClone.querySelector(".photo-grid__image");
    const photoGridTitle = cardClone.querySelector(".photo-grid__title");
    
    cardClone.querySelector('.photo-grid__like-button').addEventListener('click', (event) => {
        event.target.classList.toggle('photo-grid__like-button_active');
    });

    photoGridImg.src = initialCard.imageURL;
    photoGridImg.alt = initialCard.altText;
    photoGridTitle.textContent = initialCard.title;

    photoGridItems.appendChild(cardClone);
});



changeButton.addEventListener("click", () => {
    const defaultValueName = profileName.textContent;
    const defaultValueJob = profileJob.textContent;
    inputName.value = defaultValueName;
    inputJob.value = defaultValueJob;
    popup.classList.add("popup_visible");
});

addButton.addEventListener("click", () => {
    popupAddphoto.classList.add("popup_visible");
});

function closePopup() {
    popup.classList.remove("popup_visible");
    popupAddphoto.classList.remove("popup_visible");
}

document.querySelectorAll(".popup__close-button").forEach((button) =>{
    button.addEventListener("click", closePopup);
})

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup();
}


formElement.addEventListener('submit', handleFormSubmit); 