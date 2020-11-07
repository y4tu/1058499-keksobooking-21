"use strict";

(() => {
  const mainMap = document.querySelector(`.map`);
  const mapMainPin = mainMap.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormReset = document.querySelector(`.ad-form__reset`);
  const adFormFilters = document.querySelector(`.map__filters`);

  let target = null;

  const onSuccessDownload = (data) => {
    window.data = data;

    const filteredData = window.filter.filterPins(data);

    window.pin.renderPins(filteredData, target);
  };

  const onError = (errorMessage) => {
    deactivatePage();
    window.messages.showErrorMessage(errorMessage);
  };

  const onSuccessUpload = () => {
    onReset();
    deactivatePage();
    window.messages.showSuccessMessage();
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (adForm.checkValidity()) {
      window.backend.upload(new FormData(adForm), onSuccessUpload, onError);
    }
  };

  const onReset = () => {
    adForm.reset();
    deactivatePage();
  };

  const activatePage = () => {
    window.util.isPageActive = true;
    mainMap.classList.remove(`map--faded`);
    window.form.enableForm();
    window.backend.download(onSuccessDownload, onError);
  };

  const deactivatePage = () => {
    window.util.isPageActive = false;
    mainMap.classList.add(`map--faded`);
    window.form.disableForm();
    window.pin.removePins();
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

  adFormReset.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    onReset();
  });

  adFormReset.addEventListener(`keydown`, (evt) => {
    evt.preventDefault();
    if (evt.key === `Enter`) {
      onReset(evt);
    }
  });

  adFormFilters.addEventListener(`click`, (evt) => {
    target = evt.target;
  });

  deactivatePage();

  window.dragAndDrop.moveElement(mapMainPin, mapMainPin);
})();

