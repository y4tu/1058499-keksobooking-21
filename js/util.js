'use strict';

(() => {
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
    nodes.forEach((node) => {
      node.disabled = !flag;
    });
  };

  window.util = {
    getRandomInRange,
    getRandomArray,
    getRandomArrayElement,
    getLocation,
    getPrice,
    toggleAdFormElements,
  };
})();
