'use strict';

const MAX_RENDERED_PINS = 5;
const Conditions = {
  ANY: `any`,
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`,
};
const Prices = {
  LOW: 10000,
  HIGH: 50000,
};

const mainMap = document.querySelector(`.map`);
const mapFilters = mainMap.querySelector(`.map__filters`);
const housingType = mapFilters.querySelector(`#housing-type`);
const housingPrice = mapFilters.querySelector(`#housing-price`);
const housingRooms = mapFilters.querySelector(`#housing-rooms`);
const housingGuests = mapFilters.querySelector(`#housing-guests`);

const filterType = (ad) => {
  return housingType.value === ad.offer.type || housingType.value === Conditions.ANY;
};

const filterPrice = (ad) => {
  switch (housingPrice.value) {
    case Conditions.ANY:
      return true;
    case Conditions.LOW:
      return ad.offer.price < Prices.LOW;
    case Conditions.MIDDLE:
      return ad.offer.price <= Prices.HIGH && ad.offer.price >= Prices.LOW;
    case Conditions.HIGH:
      return ad.offer.price > Prices.HIGH;
  }

  return false;
};

const filterRooms = (ad) => {
  return +housingRooms.value === ad.offer.rooms || housingRooms.value === Conditions.ANY;
};

const filterGuests = (ad) => {
  return housingGuests.value <= ad.offer.guests || housingGuests.value === Conditions.ANY;
};

const filterFeatures = (ad) => {
  const activeFeatures = mapFilters.querySelectorAll(`.map__checkbox:checked`);

  return Array.from(activeFeatures).every((item) => {
    return ad.offer.features.includes(item.value);
  });
};

const getOffers = (array) => {
  const filteredData = [];

  for (let i = 0; i < MAX_RENDERED_PINS; i++) {
    if (filterType(array[i]) &&
        filterPrice(array[i]) &&
        filterRooms(array[i]) &&
        filterGuests(array[i]) &&
        filterFeatures(array[i])) {
      filteredData.push(array[i]);
    }
  }

  return filteredData;
};

const onFilterChange = () => {
  const filteredData = getOffers(window.data);
  window.pin.render(filteredData);
};

mapFilters.addEventListener(`change`, window.util.debounce(onFilterChange));

window.filter = {
  getOffers,
};
