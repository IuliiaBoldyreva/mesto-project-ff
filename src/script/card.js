import { addLike, deleteCard, deleteLike } from "./api";
import { openPhotoPopup } from "./modal";

export function handleLikeCard(event) {
  const cardId = event.target.getAttribute("data-id");
  const hasLike = event.target.classList.contains("photo-grid__like-button_active");

  const cardNode = event.target.closest(".photo-grid__item");
  const likeCountNode = cardNode.querySelector(".photo-grid__like-count");

  const likeMethod = hasLike ? deleteLike : addLike;

  likeMethod(cardId).then((updatedCard) => {
    event.target.classList.toggle("photo-grid__like-button_active");
    likeCountNode.textContent = updatedCard.likes.length;
  })
  .catch(console.log);
}

export function handleCardPhotoClick(event) {
  openPhotoPopup(event.target.src, event.target.alt);
}

export function handleRemoveCardClick(event) {
  const cardId = event.target.getAttribute("data-id");

  deleteCard(cardId)
    .then(() => {
      const cardNode = event.target.closest(".photo-grid__item");
      if (!cardNode) return;

      cardNode.remove();
    })
    .catch(console.log);
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
  buttonDelete.setAttribute("data-id", data.id);
  const likeCountNode = tamplateElement.querySelector(
    ".photo-grid__like-count"
  );
  const likeButton = tamplateElement.querySelector(".photo-grid__like-button");
  likeButton.setAttribute("data-id", data.id);

  likeButton.addEventListener("click", onLikeClick);

  photoGridImg.src = data.imageURL;
  photoGridImg.alt = data.altText;
  templateTitle.textContent = data.title;
  likeCountNode.textContent = data.likes.length;

  if (data.hasLike) {
    likeButton.classList.add("photo-grid__like-button_active");
  }
  if (data.canDelete) {
    buttonDelete.addEventListener("click", onRemoveCardClick);
  } else {
    buttonDelete.remove();
  }

  photoGridImg.addEventListener("click", onCardPhotoClick);

  return tamplateElement;
}
