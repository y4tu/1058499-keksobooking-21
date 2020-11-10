"use strict";

const mainMap = document.querySelector(`.map`);
const mapMainPin = mainMap.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const adFormReset = document.querySelector(`.ad-form__reset`);
const adFormFilters = document.querySelector(`.map__filters`);
const mapFilters = mainMap.querySelector(`.map__filters`);

let target = null;

const onSuccessDownload = (data) => {
  window.data = data;

  const filteredData = window.filter.getOffers(data);

  window.pin.render(filteredData, target);
};

const onError = (errorMessage) => {
  deactivatePage();
  window.messages.showErrorMessage(errorMessage);
};

const onSuccessUpload = () => {
  onReset();
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
  mapFilters.reset();
  window.photos.resetAvatar();
  window.photos.resetImagePreview();
  window.form.onTypeInput();
  window.form.onRoomsInput();
  deactivatePage();
};

const activatePage = () => {
  window.form.isPageActive = true;
  mainMap.classList.remove(`map--faded`);
  window.backend.download(onSuccessDownload, onError);
  window.form.enableForm();
};

const deactivatePage = () => {
  window.form.isPageActive = false;
  mainMap.classList.add(`map--faded`);
  window.pin.remove();
  window.card.remove();
  window.form.disableForm();
};

mapMainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0 && window.form.isPageActive !== true) {
    activatePage();
  }
});

mapMainPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter` && window.form.isPageActive !== true) {
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

onReset();

window.dragAndDrop.moveElement(mapMainPin, mapMainPin);

