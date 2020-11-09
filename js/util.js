'use strict';

const DEBOUNCE_INTERVAL = 300;

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
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].disabled = !flag;
  }

};

const debounce = (cb) => {
  let lastTimeout = null;

  return (parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

window.util = {
  getRandomInRange,
  getRandomArray,
  getRandomArrayElement,
  getLocation,
  getPrice,
  toggleAdFormElements,
  debounce,
};
