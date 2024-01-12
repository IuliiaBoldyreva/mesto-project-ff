import indoneziaImgSrc from "../images/indonezia.jpg";
import montenegroImgSrc from "../images/montenegro.jpg";
import romeImgSrc from "../images/rome.jpg";
import seaImgSrc from "../images/sea.jpg";
import alpinaImgSrc from "../images/alpina.jpg";
import thailandImgSrc from "../images/thailand.jpg";

export const initialCards = [
  {
    title: "Индонезия",
    imageURL: indoneziaImgSrc,
    altText: "Фото природы тайланда, зелёные травянные поля",
  },
  {
    title: "Монтенегро",
    imageURL: montenegroImgSrc,
    altText: "горный хребет с водой у подножья в монтенегро",
  },
  {
    title: 'Фонтант "Треви", Рим',
    imageURL: romeImgSrc,
    altText: "фонтант треви в риме",
  },
  {
    title: "Морское побережье",
    imageURL: seaImgSrc,
    altText: "море окруженное скалами",
  },
  {
    title: "Альпы",
    imageURL: alpinaImgSrc,
    altText: "заснеженные горы",
  },
  {
    title: "Тайланд",
    imageURL: thailandImgSrc,
    altText: "чайное поле",
  },
];

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonElement: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_invalid",
  inputErrorClass: "popop__input_state_invalid",
};
