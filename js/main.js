"use strict";

(() => {
  const mainMap = document.querySelector(`.map`);
  const mapMainPin = mainMap.querySelector(`.map__pin--main`);

  window.form.onFormSubmit();

  window.form.deActivatePage();

  window.form.adFormValidation();

  mapMainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0 && window.form.isPageActive !== true) {
      window.pin.renderPins(window.data.ads);
      window.form.activatePage();
      window.form.calcAdAddress();
    }
  });

  mapMainPin.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter` && window.form.isPageActive !== true) {
      window.pin.renderPins(window.data.ads);
      window.form.activatePage();
      window.form.calcAdAddress();
    }
  });
})();

