'use strict';

(() => {
  const MAP_PIN_MAIN_OFFSET_X = 65;
  const MAP_PIN_MAIN_OFFSET_Y = 65;
  const TALE = 22;

  const mainMap = document.querySelector(`.map`);
  const mapPinMain = mainMap.querySelector(`.map__pin--main`);
  const mapFilters = mainMap.querySelector(`.map__filters`);
  const mapFiltersControls = mapFilters.querySelectorAll(`.map__filter`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormElements = adForm.querySelectorAll(`fieldset`);
  const formInputAddress = adForm.querySelector(`input[name="address"]`);
  const adFormSubmit = adForm.querySelector(`.ad-form__submit`);
  const formInputTitle = adForm.querySelector(`input[name="title"]`);
  const formInputType = adForm.querySelector(`#type`);
  const formInputPrice = adForm.querySelector(`#price`);
  const formInputTimeIn = adForm.querySelector(`#timein`);
  const formInputTimeOut = adForm.querySelector(`#timeout`);
  const formInputRooms = adForm.querySelector(`#room_number`);
  const formInputCapacity = adForm.querySelector(`#capacity`);

  let isPageActive = false;

  const calcAdAddress = () => {
    const x = Math.round(parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN_OFFSET_X / 2);

    const y = Math.round(isPageActive ?
      parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_OFFSET_Y / 2 + TALE :
      parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_OFFSET_Y / 2);

    return `${x}, ${y}`;
  };

  const activatePage = () => {
    isPageActive = true;

    mainMap.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    formInputAddress.value = calcAdAddress();

    window.util.toggleAdFormElements(adFormElements, isPageActive);
    window.util.toggleAdFormElements(mapFiltersControls, isPageActive);
  };

  const deActivatePage = () => {
    isPageActive = false;

    mainMap.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);

    formInputAddress.value = calcAdAddress();

    window.util.toggleAdFormElements(adFormElements, isPageActive);
    window.util.toggleAdFormElements(mapFiltersControls, isPageActive);
  };

  const adFormValidation = () => {
    formInputTitle.addEventListener(`input`, () => {
      if (formInputTitle.validity.valueMissing) {
        formInputTitle.setCustomValidity(`Введите заголовок!`);
      } else if (formInputTitle.validity.tooShort) {
        formInputTitle.setCustomValidity(`Введите ещё ${30 - formInputTitle.value.length} символов!`);
      } else if (formInputTitle.validity.tooLong) {
        formInputTitle.setCustomValidity(`Слишком длинный заголовок. Удалите ${formInputTitle.value.length - 100} символов!`);
      } else {
        formInputTitle.setCustomValidity(``);
      }

      formInputTitle.reportValidity();
    });

    adForm.addEventListener(`change`, () => {
      switch (formInputType.value) {
        case `bungalow`:
          formInputPrice.min = 0;
          formInputPrice.placeholder = `0`;
          break;

        case `flat`:
          formInputPrice.min = 1000;
          formInputPrice.placeholder = `1000`;
          break;

        case `house`:
          formInputPrice.min = 5000;
          formInputPrice.placeholder = `5000`;
          break;

        case `palace`:
          formInputPrice.min = 10000;
          formInputPrice.placeholder = `10000`;
          break;
      }
    });

    formInputTimeIn.addEventListener(`change`, () => {
      if (formInputTimeIn.value === `12:00`) {
        formInputTimeOut.value = `12:00`;
      } else if (formInputTimeIn.value === `13:00`) {
        formInputTimeOut.value = `13:00`;
      } else if (formInputTimeIn.value === `14:00`) {
        formInputTimeOut.value = `14:00`;
      }
    });

    formInputTimeOut.addEventListener(`change`, () => {
      if (formInputTimeOut.value === `12:00`) {
        formInputTimeIn.value = `12:00`;
      } else if (formInputTimeOut.value === `13:00`) {
        formInputTimeIn.value = `13:00`;
      } else if (formInputTimeOut.value === `14:00`) {
        formInputTimeIn.value = `14:00`;
      }
    });

    adForm.addEventListener(`change`, () => {
      if (+formInputRooms.value === 100 && +formInputCapacity.value !== 0) {
        formInputRooms.setCustomValidity(`Не для гостей`);
      } else if (+formInputRooms.value !== 100 && +formInputCapacity.value === 0) {
        formInputRooms.setCustomValidity(`Слишком мало места`);
      } else if (+formInputCapacity.value !== 0 && +formInputRooms.value < +formInputCapacity.value) {
        formInputRooms.setCustomValidity(`Слишком мало места`);
      } else {
        formInputRooms.setCustomValidity(``);
      }
      formInputRooms.reportValidity();
    });
  };

  const onFormSubmit = () => {
    adFormSubmit.addEventListener(`submit`, () => {
      adFormValidation();
      deActivatePage();
    });
  };

  window.form = {
    isPageActive,
    calcAdAddress,
    onFormSubmit,
    activatePage,
    deActivatePage,
    adFormValidation,
  };

})();
