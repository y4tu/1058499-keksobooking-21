'use strict';

(() => {
  const mapFiltersContainer = window.map.mainMap.querySelector(`.map__filters-container`);
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
      window.map.mainMap.insertBefore(addCardToPin(), mapFiltersContainer);
    });

    pinElement.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        window.map.mainMap.insertBefore(addCardToPin(), mapFiltersContainer);
      }
    });

    return pinElement;
  };

  window.pin = {
    createPin,
  };
})();
