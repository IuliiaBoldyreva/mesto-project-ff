const changeButton = document.querySelector(".profile__change-button");
const popup = document.querySelector(".popup");
const inputName = document.querySelector(".popup__input_theme_name");
const profileName = document.querySelector(".profile__name");
const inputJob = document.querySelector(".popup__input_theme_job");
const profileJob = document.querySelector(".profile__job");
const formElement = document.querySelector(".popup__form");

changeButton.addEventListener("click", () => {
    const defaultValueName = profileName.textContent;
    const defaultValueJob = profileJob.textContent;
    inputName.value = defaultValueName;
    inputJob.value = defaultValueJob;
    popup.classList.add("popup_visible");
});

const closeButton = document.querySelector(".popup__close-button");

function closePopup() {
    popup.classList.remove("popup_visible");
}

closeButton.addEventListener("click", closePopup);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit); 