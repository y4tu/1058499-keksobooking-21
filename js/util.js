'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const selects = adForm.querySelectorAll(`select`);
  const inputs = adForm.querySelectorAll(`input`);

  let isPageActive = false;

  const getRandomInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomArray = (array) => {
    return array.slice(0, Math.floor(Math.random() * array.length));
  };

  const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

  const getLocation = (min, max) => getRandomInRange(min, max);

  const getPrice = (multiplier) => Math.round(Math.random() * multiplier);

  const toggleAdFormElements = (nodes, flag) => {
    // nodes.forEach((node) => {
    //   node.disabled = !flag;
    // });

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].disabled = !flag;
    }
  };

  window.util = {
    isPageActive,
    selects,
    inputs,
    getRandomInRange,
    getRandomArray,
    getRandomArrayElement,
    getLocation,
    getPrice,
    toggleAdFormElements,
  };
})();
