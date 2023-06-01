let changeButton = document.querySelector(".profile__change-button");
let popup = document.querySelector(".popup");
let inputName = document.querySelector(".popup__name-input");
let profileName = document.querySelector(".profile__name");
let inputJob = document.querySelector(".popup__job-input");
let profileJob = document.querySelector(".profile__job");
let formElement = document.querySelector(".popup__form");

changeButton.addEventListener("click", () => {

    let defaultValueName = profileName.textContent;
    let defaultValueJob = profileJob.textContent;
    inputName.value = defaultValueName;
    inputJob.value = defaultValueJob;
    
    popup.classList.add("popup_visible");
});

let closeButton = document.querySelector(".popup__close-button");

closeButton.addEventListener("click", () => {
    popup.classList.remove("popup_visible");
});



function handleFormSubmit(evt) {

    evt.preventDefault(); 

    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    popup.classList.remove("popup_visible");
}


formElement.addEventListener('submit', handleFormSubmit); 