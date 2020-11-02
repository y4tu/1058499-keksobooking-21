'use strict';

(() => {
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
    const fragment = document.createDocumentFragment();

    array.forEach((item) => fragment.appendChild(window.pin.createPin(item)));

    similarPins.appendChild(fragment);
  };

  window.pin = {
    createPin,
    renderPins,
  };
})();
