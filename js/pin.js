'use strict';

(() => {
  const DefaultMainPinCoords = {
    LEFT: `570px`,
    TOP: `375px`,
  }
  const mainMap = document.querySelector(`.map`);
  const similarPins = mainMap.querySelector(`.map__pins`);
  const mapFiltersContainer = mainMap.querySelector(`.map__filters-container`);
  const mapPinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

  const createPin = (ad) => {
    const pinElement = mapPinTemplate.cloneNode(true);
    const image = pinElement.querySelector(`img`);

    image.src = ad.author.avatar;
    image.alt = ad.offer.title;
    pinElement.style = `left: ${ad.location.x}px; top: ${ad.location.y}px;`;

    const addCardToPin = () => {

      window.card.removeCard();

      return window.card.createCard(ad);
    };

    pinElement.addEventListener(`click`, () => {
      mainMap.insertBefore(addCardToPin(), mapFiltersContainer);
    });

    pinElement.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        mainMap.insertBefore(addCardToPin(), mapFiltersContainer);
      }
    });

    return pinElement;
  };

  const renderPins = (array) => {
    window.card.removeCard();
    removePins();

    const fragment = document.createDocumentFragment();

    array.forEach((item) => fragment.appendChild(window.pin.createPin(item)));

    similarPins.appendChild(fragment);
  };

  const removePins = () => {
    const pins = document.querySelectorAll(`.map__pin`);
    const mainPin = document.querySelector(`.map__pin--main`);

    mainPin.style = `left: ${DefaultMainPinCoords.LEFT}; top: ${DefaultMainPinCoords.TOP};`;

    for (let i = 1; i < pins.length; i++) {
      similarPins.removeChild(pins[i]);
    }
  };

  window.pin = {
    createPin,
    renderPins,
    removePins,
  };
})();
