"use strict";

(() => {
  const mainMap = document.querySelector(`.map`);
  const mapMainPin = mainMap.querySelector(`.map__pin--main`);
  const errorTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);

  const onSuccess = (data) => {
    window.pin.renderPins(data);
  };

  const onError = (errorMessage) => {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(errorTemplate.cloneNode(true));

    const errorText = fragment.querySelector(`p`);
    const retry = fragment.querySelector(`button`);

    errorText.textContent = errorMessage;

    document.body.appendChild(fragment);

    const errorPopup = document.querySelector(`.error`);

    const dropError = () => {
      document.body.removeChild(errorPopup);
      deactivatePage();
      errorPopup.removeEventListener(`click`, onRetryClick);
      document.removeEventListener(`keydown`, onEscKeydown);
    };

    const onRetryClick = (evt) => {
      if (evt.target === retry && document.body.contains(errorPopup)) {
        dropError();
      }
    };

    const onEscKeydown = (evt) => {
      if (evt.key === `Escape` && document.body.contains(errorPopup)) {
        dropError();
      }
    };

    errorPopup.addEventListener(`click`, onRetryClick);
    document.addEventListener(`keydown`, onEscKeydown);
  };

  const activatePage = () => {

    window.backend.download(onSuccess, onError);

    window.util.isPageActive = true;

    mainMap.classList.remove(`map--faded`);

    window.form.enableForm();
  };

  const deactivatePage = () => {
    window.util.isPageActive = false;

    mainMap.classList.add(`map--faded`);

    window.form.disableForm();
  };

  mapMainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0 && window.util.isPageActive !== true) {
      activatePage();
    }
  });

  mapMainPin.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter` && window.util.isPageActive !== true) {
      activatePage();
    }
  });

  deactivatePage();

  window.dragAndDrop.moveElement(mapMainPin, mapMainPin);
})();

