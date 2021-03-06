'use strict';

const MAP_PIN_MAIN_OFFSET_X = 65;
const MAP_PIN_MAIN_OFFSET_Y = 65;
const TAIL = 22;
const MAX_ROOMS = 100;
const MIN_GUESTS = 0;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_HOUSING_PRICE = 1000000;

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

let isPageActive = false;

const calcAdAddress = (xCoord, yCoord) => {
  const x = Math.round(xCoord + MAP_PIN_MAIN_OFFSET_X / 2);

  const y = Math.round(isPageActive ?
    yCoord + MAP_PIN_MAIN_OFFSET_Y / 2 + TAIL :
    yCoord + MAP_PIN_MAIN_OFFSET_Y / 2);

  formInputAddress.value = `${x}, ${y}`;
};

const enableForm = () => {
  isPageActive = true;

  adForm.classList.remove(`ad-form--disabled`);

  calcAdAddress(parseInt(mapPinMain.style.left, 10), parseInt(mapPinMain.style.top, 10));

  window.util.toggleAdFormElements(selects, isPageActive);
  window.util.toggleAdFormElements(inputs, isPageActive);

  textarea.disabled = !isPageActive;
};

const disableForm = () => {
  isPageActive = false;

  adForm.classList.add(`ad-form--disabled`);

  calcAdAddress(parseInt(mapPinMain.style.left, 10), parseInt(mapPinMain.style.top, 10));

  window.util.toggleAdFormElements(selects, isPageActive);
  window.util.toggleAdFormElements(inputs, isPageActive);

  textarea.disabled = !isPageActive;
};

const onTypeInput = () => {
  formInputPrice.placeholder = priceMap[formInputType.value];
  formInputPrice.min = priceMap[formInputType.value];
  formInputPrice.max = MAX_HOUSING_PRICE;
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
  formInputPrice.max = MAX_HOUSING_PRICE;

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

formInputType.addEventListener(`change`, onTypeInput);
formInputTitle.addEventListener(`change`, onTitleInput);
formInputPrice.addEventListener(`change`, onPriceInput);
formInputTimeIn.addEventListener(`change`, onCheckTimeChange);
formInputTimeOut.addEventListener(`change`, onCheckTimeChange);
formInputRooms.addEventListener(`change`, onRoomsInput);
formInputCapacity.addEventListener(`change`, onRoomsInput);
adForm.addEventListener(`submit`, onRoomsInput);

window.form = {
  isPageActive,
  calcAdAddress,
  enableForm,
  disableForm,
  onTypeInput,
  onRoomsInput,
};
