'use strict';

(() => {
  const MAP_PIN_MAIN_OFFSET_X = 65;
  const MAP_PIN_MAIN_OFFSET_Y = 65;
  const TALE = 22;
  const MAX_ROOMS = 100;
  const MIN_GUESTS = 0;

  const selects = document.querySelectorAll(`select`);
  const inputs = document.querySelectorAll(`input`);
  const textarea = document.querySelector(`textarea`);
  const mainMap = document.querySelector(`.map`);
  const mapPinMain = mainMap.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  // const adFormSubmit = adForm.querySelector(`.ad-form__submit`);
  const formInputAddress = adForm.querySelector(`input[name="address"]`);
  const formInputTitle = adForm.querySelector(`input[name="title"]`);
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

  const calcAdAddress = () => {
    const x = Math.round(parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN_OFFSET_X / 2);

    const y = Math.round(window.util.isPageActive ?
      parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_OFFSET_Y / 2 + TALE :
      parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_OFFSET_Y / 2);

    return `${x}, ${y}`;
  };

  // const onFormSubmit = () => {
  //   adFormSubmit.addEventListener(`submit`, () => {
  //     window.form.adFormValidation();
  //     deactivatePage();
  //   });
  // };

  const enableForm = () => {
    adForm.classList.remove(`ad-form--disabled`);

    formInputAddress.value = calcAdAddress();

    window.util.toggleAdFormElements(selects, window.util.isPageActive);
    window.util.toggleAdFormElements(inputs, window.util.isPageActive);

    textarea.disabled = !window.util.isPageActive;
  };

  const disableForm = () => {
    adForm.classList.add(`ad-form--disabled`);

    formInputAddress.value = calcAdAddress();

    window.util.toggleAdFormElements(selects, window.util.isPageActive);
    window.util.toggleAdFormElements(inputs, window.util.isPageActive);

    textarea.disabled = !window.util.isPageActive;
  };

  const onTitleInput = () => {
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
  };

  const onPriceInput = () => {
    adForm.addEventListener(`change`, () => {
      formInputPrice.min = priceMap[formInputType.value];
      formInputPrice.placeholder = priceMap[formInputType.value];
    });
  };

  const onTimeInput = () => {
    (() => {
      formInputTimeIn.addEventListener(`change`, () => {
        if (formInputTimeIn.value !== formInputTimeOut.value) {
          formInputTimeOut.value =
            formInputTimeIn.value;
        } else if (formInputTimeOut.value !== formInputTimeIn.value) {
          formInputTimeIn.value = formInputTimeOut.value;
        }
      });
      formInputTimeOut.addEventListener(`change`, () => {
        if (formInputTimeIn.value !== formInputTimeOut.value) {
          formInputTimeIn.value =
            formInputTimeOut.value;
        } else if (formInputTimeOut.value !== formInputTimeIn.value) {
          formInputTimeOut.value = formInputTimeIn.value;
        }
      });
    })();
  };

  const onRoomsInput = () => {
    adForm.addEventListener(`change`, () => {
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
    });
  };

  const adFormValidation = () => {
    onTitleInput();
    onPriceInput();
    onTimeInput();
    onRoomsInput();
  };

  window.form = {
    calcAdAddress,
    enableForm,
    disableForm,
    // onFormSubmit,
    adFormValidation,
  };
})();
