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

  const similarPins = mainMap.querySelector(`.map__pins`);

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

  const renderPins = (array) => {
    if (mainMap.classList.contains(`map--faded`)) {
      const fragment = document.createDocumentFragment();

      array.forEach((item) => fragment.appendChild(window.pin.createPin(item)));

      similarPins.appendChild(fragment);
    }
  };

  window.map = {
    mainMap,
    adForm,
    adFormElements,
    mapFiltersControls,
    formInputAddress,
    isPageActive,
    calcAdAddress,
    activatePage,
    deActivatePage,
    renderPins,
  };
})();
