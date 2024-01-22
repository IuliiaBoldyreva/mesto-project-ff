function showError(inputElement, erorrElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  erorrElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, erorrElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  erorrElement.textContent = "";
}

function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const erorrElement = formElement.querySelector(`#${inputElement.name}-error`);

  if (!isInputValid) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(
        inputElement.getAttribute("data-custom-error")
      );
    }
    showError(inputElement, erorrElement, config);
  } else {
    hideError(inputElement, erorrElement, config);
  }
}

function disabledButton(buttonElement, config) {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}

function enableButton(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(buttonElement, isValid, config) {
  if (!isValid) {
    disabledButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}

function setEventListner(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(
    config.submitButtonElement
  );

  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      inputElement.setCustomValidity("");
      toggleButtonState(
        submitButtonElement,
        formElement.checkValidity(),
        config
      );
      checkInputValidity(inputElement, formElement, config);
    });
  });

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
}

function enableValidation(config) {
  const formsList = document.querySelectorAll(config.formSelector);

  formsList.forEach(function (formElement) {
    setEventListner(formElement, config);
  });
}

function clearValidation(formElement, config) {
  formElement.reset();
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(
    config.submitButtonElement
  );

  inputList.forEach(function (inputElement) {
    const erorrElement = document.querySelector(`#${inputElement.name}-error`);
    hideError(inputElement, erorrElement, config);
  });
  toggleButtonState(submitButtonElement, false, config);
}

export { enableValidation, clearValidation };
