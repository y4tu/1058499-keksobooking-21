"use strict";

(() => {
  const mainMap = document.querySelector(`.map`);
  const mapMainPin = mainMap.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);

  const onSuccessDownload = (data) => {
    window.pin.renderPins(data);
  };

  const onError = (errorMessage) => {
    deactivatePage();
    window.messages.showErrorMessage(errorMessage);
  };

  const onSuccessUpload = () => {
    deactivatePage();
    window.messages.showSuccessMessage();
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), onSuccessUpload, onError);
  };

  const activatePage = () => {

    window.backend.download(onSuccessDownload, onError);

    window.util.isPageActive = true;

    mainMap.classList.remove(`map--faded`);

    window.form.enableForm();
  };

  const deactivatePage = () => {
    window.pin.removePins();

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

  adForm.addEventListener(`submit`, onSubmit);

  window.dragAndDrop.moveElement(mapMainPin, mapMainPin);
})();

