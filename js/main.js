"use strict";

(() => {
  const mainMap = document.querySelector(`.map`);
  const mapMainPin = mainMap.querySelector(`.map__pin--main`);

  const activatePage = () => {
    window.util.isPageActive = true;

    mainMap.classList.remove(`map--faded`);

    window.form.enableForm();
  };

  const deactivatePage = () => {
    window.util.isPageActive = false;

    mainMap.classList.add(`map--faded`);

    window.form.disableForm();
  };

  deactivatePage();

  mapMainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0 && window.util.isPageActive !== true) {
      window.pin.renderPins(window.data.ads);
      activatePage();
    }
  });

  mapMainPin.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter` && window.util.isPageActive !== true) {
      window.pin.renderPins(window.data.ads);
      activatePage();
    }
  });

  window.gragAndDrop.moveElement(mapMainPin, mapMainPin);
})();

