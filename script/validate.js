function showError(inputElement, erorrElement, config){
    inputElement.classList.add(config.inputErrorClass);
    erorrElement.textContent = inputElement.validationMessage;
}


export function hideError(inputElement, erorrElement, config){
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

export function disabledButton(buttonElement, config){
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

function enableValidation(config){
    
    const formsList = document.querySelectorAll(config.formSelector);

    [...formsList].forEach(function (formElement) {
        setEventListner(formElement, config);
    });

    // openFormButton.addEventListener('click', function() {
    //     const inputs = formElement.querySelectorAll(config.inputSelector);
    //     inputs.forEach(input => {
    //         const erorrElement = formElement.querySelector(`#${input.name}-error`);
    //         hideError(input, erorrElement, config);
    //     });
    // });

   
}

export const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonElement: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_invalid",
    inputErrorClass: "popop__input_state_invalid",
};

enableValidation(config);

