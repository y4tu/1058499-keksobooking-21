'use strict';

const mainMap = document.querySelector(`.map`);
const cardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`);

const typeMap = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

let cardPopupRef = null;

const createCard = (ad) => {
  const {author, offer} = ad;
  const {avatar} = author;

  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
  } = offer;

  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(`.popup__avatar`);
  const titleElement = cardElement.querySelector(`.popup__title`);
  const addressElement = cardElement.querySelector(`.popup__text--address`);
  const offerPriceElement = cardElement.querySelector(`.popup__text--price`);
  const typeElement = cardElement.querySelector(`.popup__type`);
  const capacityElement = cardElement.querySelector(`.popup__text--capacity`);
  const timeElement = cardElement.querySelector(`.popup__text--time`);
  const descElement = cardElement.querySelector(`.popup__description`);
  const featuresElement = cardElement.querySelector(`.popup__features`);
  const photosElement = cardElement.querySelector(`.popup__photos`);
  const photoElement = cardElement.querySelector(`.popup__photo`);
  const closeElement = cardElement.querySelector(`.popup__close`);

  imageElement.src = avatar;
  titleElement.textContent = title;
  addressElement.textContent = address;
  offerPriceElement.textContent = price + `₽/ночь`;
  typeElement.textContent = typeMap[type];
  capacityElement.textContent = `${rooms} комнаты для ${guests} гостей`;
  timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  descElement.textContent = description;
  featuresElement.innerHTML = ``;
  photosElement.innerHTML = ``;

  features.forEach((item) => {
    const featureItem = document.createElement(`li`);

    featureItem.classList.add(`popup__feature`, `popup__feature--${item}`);

    featuresElement.append(featureItem);
  });

  photos.forEach((item) => {
    const photoItem = photoElement.cloneNode();
    photoItem.src = `${item}`;
    photosElement.append(photoItem);
  });

  closeElement.addEventListener(`click`, onCardRemove);
  document.addEventListener(`keydown`, onEscKeydown);

  cardPopupRef = cardElement;

  if (cardElement.hasChildNodes()) {
    const children = cardElement.childNodes;

    Array.from(children).forEach((item) => {
      if (item.textContent === `` && item.tagName !== `IMG` && !item.hasChildNodes()) {
        cardElement.removeChild(item);
      }
    });
  }

  return cardElement;
};

const onCardRemove = () => {
  if (cardPopupRef) {
    mainMap.removeChild(cardPopupRef);
    cardPopupRef = null;
    document.removeEventListener(`keydown`, onEscKeydown);
    window.pin.dropActiveClass();
  }
};

const onEscKeydown = (evt) => {
  if (evt.key === `Escape`) {
    onCardRemove();
  }
};

window.card = {
  create: createCard,
  remove: onCardRemove,
};
