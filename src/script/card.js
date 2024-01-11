import { openPhotoPopup } from "./modal";

export function handleLikeCard(event) {
  event.target.classList.toggle("photo-grid__like-button_active");
}

export function handleCardPhotoClick(event) {
  openPhotoPopup(event.target.src, event.target.alt);
}

export function handleRemoveCardClick(event) {
  const card = event.target.closest(".photo-grid__item");
  if (!card) return;

  card.remove();
}

export function createCard(
  data,
  onLikeClick,
  onCardPhotoClick,
  onRemoveCardClick
) {
  const cardTemplate = document.getElementById("photos-grid-template");
  const tamplateElement = cardTemplate.content
    .querySelector(".photo-grid__item")
    .cloneNode(true);
  const photoGridImg = tamplateElement.querySelector(".photo-grid__image");
  const templateTitle = tamplateElement.querySelector(".photo-grid__title");
  const buttonDelete = tamplateElement.querySelector(
    ".photo-grid__delete-button"
  );

  tamplateElement
    .querySelector(".photo-grid__like-button")
    .addEventListener("click", onLikeClick);

  photoGridImg.src = data.imageURL;
  photoGridImg.alt = data.altText;
  templateTitle.textContent = data.title;

  buttonDelete.addEventListener("click", onRemoveCardClick);

  photoGridImg.addEventListener("click", onCardPhotoClick);

  return tamplateElement;
}
