'use strict';

const DefaultMainPinCoords = {
  LEFT: `570px`,
  TOP: `375px`,
};
const mainMap = document.querySelector(`.map`);
const similarPins = mainMap.querySelector(`.map__pins`);
const mapFiltersContainer = mainMap.querySelector(`.map__filters-container`);
const mapPinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

let currentPinElement = null;

const dropActiveClass = () => {
  const mapPinElements = similarPins.querySelectorAll(`.map__pin`);

  mapPinElements.forEach((item) => {
    if (item.classList.contains(`map__pin--active`)) {
      item.classList.remove(`map__pin--active`);
    }
  });
};

const create = (ad) => {
  const pinElement = mapPinTemplate.cloneNode(true);
  const image = pinElement.querySelector(`img`);

  currentPinElement = pinElement;

  image.src = ad.author.avatar;
  image.alt = ad.offer.title;
  pinElement.style = `left: ${ad.location.x}px; top: ${ad.location.y}px;`;

  const addCardToPin = () => {

    window.card.remove();

    return window.card.create(ad);
  };

  pinElement.addEventListener(`click`, () => {
    mainMap.insertBefore(addCardToPin(), mapFiltersContainer);

    dropActiveClass();

    pinElement.classList.add(`map__pin--active`);
  });

  pinElement.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      mainMap.insertBefore(addCardToPin(), mapFiltersContainer);

      dropActiveClass();

      pinElement.classList.add(`map__pin--active`);
    }
  });

  return pinElement;
};

const render = (array) => {
  window.card.remove();
  remove();

  const fragment = document.createDocumentFragment();

  array.forEach((item) => fragment.appendChild(create(item)));

  similarPins.appendChild(fragment);
};

const remove = () => {
  const pins = document.querySelectorAll(`.map__pin`);
  const mainPin = document.querySelector(`.map__pin--main`);

  mainPin.style = `left: ${DefaultMainPinCoords.LEFT}; top: ${DefaultMainPinCoords.TOP};`;

  for (let i = 1; i < pins.length; i++) {
    similarPins.removeChild(pins[i]);
  }
};

window.pin = {
  dropActiveClass,
  create,
  render,
  remove,
};
