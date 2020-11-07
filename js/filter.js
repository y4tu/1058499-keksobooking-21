'use strict';

(() => {
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
      case `${Conditions.ANY}`:
        return true;
      case `${Conditions.LOW}`:
        return housingPrice.value === ad.offer.price < Prices.LOW;
      case `${Conditions.MIDDLE}`:
        return housingPrice.value === ad.offer.price <= Prices.HIGH && ad.offer.price >= Prices.LOW;
      case `${Conditions.HIGH}`:
        return housingPrice.value === ad.offer.price > Prices.HIGH;
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

  const filterPins = (array) => {
    const filteredData = [];
    let counter = 0;

    for (let i = 0; i < array.length; i++) {
      counter++;

      if (filterType(array[i]) &&
        filterPrice(array[i]) &&
        filterRooms(array[i]) &&
        filterGuests(array[i]) &&
        filterFeatures(array[i])) {
        filteredData.push(array[i]);
      }
      if (counter === MAX_RENDERED_PINS) {
        break;
      }
    }

    return filteredData;
  };

  const onFilterChange = () => {
    const filteredData = filterPins(window.data);
    window.pin.renderPins(filteredData);
  };

  mapFilters.addEventListener(`change`, onFilterChange);

  window.filter = {
    filterPins,
  };
})();
