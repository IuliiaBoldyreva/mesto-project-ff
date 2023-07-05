import { addButton, changeButton } from "./index.js";

function showError(inputElement, erorrElement, config){
    inputElement.classList.add(config.inputErrorClass);
    erorrElement.textContent = inputElement.validationMessage;
}


function hideError(inputElement, erorrElement, config){
    inputElement.classList.remove(config.inputErrorClass);
    erorrElement.textContent = '';
}


function checkInputValidity(inputElement, formElement, config){
    const isInputValid = inputElement.validity.valid;
    const erorrElement = formElement.querySelector(`#${inputElement.name}-error`);
    
    if(!isInputValid){
        showError(inputElement, erorrElement, config);
    } else {
        hideError(inputElement, erorrElement, config);
    }
}

function disabledButton(buttonElement, config){
    buttonElement.disabled = "disabled";
    buttonElement.classList.add(config.inactiveButtonClass);
}

function enableButton(buttonElement, config){
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(buttonElement, isActive, config){
    if(!isActive){
        disabledButton(buttonElement, config);
    } else {
        enableButton(buttonElement, config);
    }
}


function setEventListner(formElement, config){
    console.log({formElement})
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButtonElement = formElement.querySelector(config.submitButtonElement);

    toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

    [...inputList].forEach(function(inputElement){
        inputElement.addEventListener("input", function(){
            toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
            checkInputValidity(inputElement, formElement, config);
        })
    })

    formElement.addEventListener("submit", (evt) =>{
        evt.preventDefault();
        if(!formElement.checkValidity()) return;
    });
}



function enableValidation(formSelector, openFormButton){
    const config = {
        formSelector: formSelector,
        inputSelector: ".popup__input",
        submitButtonElement: ".popup__save-button",
        inactiveButtonClass: "popup__save-button_invalid",
        inputErrorClass: "popop__input_state_invalid",
    };
    const formElement = document.querySelector(config.formSelector);

    openFormButton.addEventListener('click', function() {
        const inputElement = formElement.querySelector(config.inputSelector);
        const erorrElement = formElement.querySelector(`#${inputElement.name}-error`);
        hideError(inputElement, erorrElement, config);
    });

    setEventListner(formElement, config);
}

enableValidation('.popup__form_theme_edit', changeButton);
enableValidation('.popup__form_theme_add', addButton);
