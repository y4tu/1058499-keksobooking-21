"use strict";

(() => {
  const ERROR_COLOR = `rgb(255, 86, 53)`;
  const ERROR_TEXT_COLOR = `rgb(255, 255, 255)`;

  const mainMap = document.querySelector(`.map`);
  const mapMainPin = mainMap.querySelector(`.map__pin--main`);

  let ads = [];

  const getAds = (data) => {
    data.forEach((item) => {
      ads.push(item);
    });
  };

  const showErrorMessage = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; color: ${ERROR_TEXT_COLOR}; background-color: ${ERROR_COLOR}`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.appendChild(node);
  };

  const activatePage = (data) => {

    getAds(data);

    window.util.isPageActive = true;

    mainMap.classList.remove(`map--faded`);

    window.form.enableForm();
  };

  const deactivatePage = () => {
    window.util.isPageActive = false;

    mainMap.classList.add(`map--faded`);

    window.form.disableForm();
  };

  const onPinMousedown = (data) => {
    mapMainPin.addEventListener(`mousedown`, (evt) => {
      if (evt.button === 0 && window.util.isPageActive !== true) {
        activatePage(data);
        window.pin.renderPins(ads);
      }
    });
  };

  const onPinKeydownEnter = (data) => {
    mapMainPin.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter` && window.util.isPageActive !== true) {
        activatePage(data);
        window.pin.renderPins(ads);
      }
    });
  };

  deactivatePage();

  window.exchange.download(onPinMousedown, showErrorMessage);
  window.exchange.download(onPinKeydownEnter, showErrorMessage);
  window.dragAndDrop.moveElement(mapMainPin, mapMainPin);
})();

