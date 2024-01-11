function openPopup(popupNode) {
  popupNode.classList.add("popup_visible");
  popupNode.addEventListener("click", closePopupByOverlay);
  document.addEventListener("keydown", closePopupByKey);
}

function closePopup(popupNode) {
  popupNode.classList.remove("popup_visible");
  popupNode.removeEventListener("click", closePopupByOverlay);
  document.removeEventListener("keydown", closePopupByKey);
}

function closePopupByOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

function closePopupByKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_visible");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export { openPopup, closePopup };
