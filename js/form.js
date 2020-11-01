'use strict';

(() => {
  const MAP_PIN_MAIN_OFFSET_X = 65;
  const MAP_PIN_MAIN_OFFSET_Y = 65;
  const TAIL = 22;
  const MAX_ROOMS = 100;
  const MIN_GUESTS = 0;
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  const selects = document.querySelectorAll(`select`);
  const inputs = document.querySelectorAll(`input`);
  const textarea = document.querySelector(`textarea`);
  const mainMap = document.querySelector(`.map`);
  const mapPinMain = mainMap.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const formInputAddress = adForm.querySelector(`#address`);
  const formInputTitle = adForm.querySelector(`#title`);
  const formInputType = adForm.querySelector(`#type`);
  const formInputPrice = adForm.querySelector(`#price`);
  const formInputTimeIn = adForm.querySelector(`#timein`);
  const formInputTimeOut = adForm.querySelector(`#timeout`);
  const formInputRooms = adForm.querySelector(`#room_number`);
  const formInputCapacity = adForm.querySelector(`#capacity`);

  const priceMap = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  const calcAdAddress = (xCoord, yCoord) => {
    const x = Math.round(xCoord + MAP_PIN_MAIN_OFFSET_X / 2);

    const y = Math.round(window.util.isPageActive ?
      yCoord + MAP_PIN_MAIN_OFFSET_Y / 2 + TAIL :
      yCoord + MAP_PIN_MAIN_OFFSET_Y / 2);

    formInputAddress.value = `${x}, ${y}`;
  };

  const enableForm = () => {
    adForm.classList.remove(`ad-form--disabled`);

    window.util.toggleAdFormElements(selects, window.util.isPageActive);
    window.util.toggleAdFormElements(inputs, window.util.isPageActive);

    textarea.disabled = !window.util.isPageActive;
  };

  const disableForm = () => {
    adForm.classList.add(`ad-form--disabled`);

    calcAdAddress(parseInt(mapPinMain.style.left, 10), parseInt(mapPinMain.style.top, 10));

    window.util.toggleAdFormElements(selects, window.util.isPageActive);
    window.util.toggleAdFormElements(inputs, window.util.isPageActive);

    textarea.disabled = !window.util.isPageActive;
  };

  const onTitleInput = (evt) => {
    if (evt.target.value.length === 0) {
      formInputTitle.setCustomValidity(`Введите заголовок!`);
    } else if (evt.target.value.length < MIN_TITLE_LENGTH) {
      formInputTitle.setCustomValidity(`Не менее ${MIN_TITLE_LENGTH} символов!`);
    } else if (evt.target.value.length > MAX_TITLE_LENGTH) {
      formInputTitle.setCustomValidity(`Не более ${MAX_TITLE_LENGTH} символов!`);
    } else {
      formInputTitle.setCustomValidity(``);
    }
  };

  const onPriceInput = () => {
    formInputPrice.min = priceMap[formInputType.value];
    formInputPrice.placeholder = priceMap[formInputType.value];

    if (formInputPrice.value < +formInputPrice.min || formInputPrice.value > +formInputPrice.max) {
      formInputPrice.setCustomValidity(`От ${formInputPrice.min} до ${formInputPrice.max}`);
    } else {
      formInputPrice.setCustomValidity(``);
    }
  };

  const onCheckTimeChange = (evt) => {
    formInputTimeOut.value = evt.target.value;
    formInputTimeIn.value = evt.target.value;
  };

  const onRoomsInput = () => {
    if (+formInputRooms.value === MAX_ROOMS && +formInputCapacity.value !== MIN_GUESTS) {
      formInputRooms.setCustomValidity(`Не для гостей`);
    } else if (+formInputRooms.value !== MAX_ROOMS && +formInputCapacity.value === MIN_GUESTS) {
      formInputRooms.setCustomValidity(`Слишком мало места`);
    } else if (+formInputCapacity.value !== MIN_GUESTS && +formInputRooms.value < +formInputCapacity.value) {
      formInputRooms.setCustomValidity(`Слишком мало места`);
    } else {
      formInputRooms.setCustomValidity(``);
    }
    formInputRooms.reportValidity();
  };

  formInputTitle.addEventListener(`change`, onTitleInput);
  formInputPrice.addEventListener(`change`, onPriceInput);
  formInputTimeIn.addEventListener(`change`, onCheckTimeChange);
  formInputTimeOut.addEventListener(`change`, onCheckTimeChange);
  formInputRooms.addEventListener(`change`, onRoomsInput);
  formInputCapacity.addEventListener(`change`, onRoomsInput);

  window.form = {
    formInputAddress,
    MAP_PIN_MAIN_OFFSET_X,
    MAP_PIN_MAIN_OFFSET_Y,
    TAIL,
    calcAdAddress,
    enableForm,
    disableForm,
  };
})();
