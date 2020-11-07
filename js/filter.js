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
  const Guests = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
  };

  const mainMap = document.querySelector(`.map`);
  const mapFilters = mainMap.querySelector(`.map__filters`);
  const housingType = mapFilters.querySelector(`#housing-type`);
  const housingPrice = mapFilters.querySelector(`#housing-price`);
  const housingRooms = mapFilters.querySelector(`#housing-rooms`);
  const housingGuests = mapFilters.querySelector(`#housing-guests`);
  const housingFeatures = mapFilters.querySelector(`#housing-features`);
  const typeFilter = document.querySelector(`#housing-type`);

  const filterType = (ad) => {
    return housingType.value === ad.offer.type || housingType.value === Conditions.ANY;
  };

  const filterPrice = (ad) => {
    let priceId = ad.offer.price;

    switch (housingPrice.value) {
      case `${Conditions.ANY}`:
        return true;
      case `${Conditions.LOW}`:
        if (priceId < Prices.LOW) {
          priceId = `low`;
        }
        return housingPrice.value === priceId;
      case `${Conditions.MIDDLE}`:
        if (priceId <= Prices.HIGH && priceId >= Prices.LOW) {
          priceId = `middle`;
        }
        return housingPrice.value === priceId;
      case `${Conditions.HIGH}`:
        if (priceId > Prices.HIGH) {
          priceId = `high`;
        }
        return housingPrice.value === priceId;
    }
  };

  const filterRooms = (ad) => {
    return +housingRooms.value === ad.offer.rooms || housingRooms.value === Conditions.ANY;
  };

  const filterGuests = (ad) => {
    switch (housingGuests.value) {
      case Conditions.ANY:
        return true;
      case `${Guests.ZERO}`:
        return ad.offer.guests === Guests.ZERO;
      case `${Guests.ONE}`:
        return ad.offer.guests >= Guests.ONE;
      case `${Guests.TWO}`:
        return ad.offer.guests >= Guests.TWO && ad.offer.guests !== Guests.ZERO;
    }
  };

  const filterFeatures = (ad) => {
    const featuresMap = {
      wifi: housingFeatures.querySelector(`#filter-wifi`),
      dishwasher: housingFeatures.querySelector(`#filter-dishwasher`),
      parking: housingFeatures.querySelector(`#filter-parking`),
      washer: housingFeatures.querySelector(`#filter-washer`),
      elevator: housingFeatures.querySelector(`#filter-elevator`),
      conditioner: housingFeatures.querySelector(`#filter-conditioner`),
    };

    const contains = (arr, elem) => {
      return arr.find((i) => i === elem);
    };
    if (!featuresMap.wifi.checked &&
      !featuresMap.dishwasher.checked &&
      !featuresMap.parking.checked &&
      !featuresMap.washer.checked &&
      !featuresMap.elevator.checked &&
      !featuresMap.conditioner.checked) {
      return true;
    }
    if (featuresMap.wifi.checked) {
      return contains(ad.offer.features, `wifi`);
    }
    if (featuresMap.dishwasher.checked) {
      return contains(ad.offer.features, `dishwasher`);
    }
    if (featuresMap.parking.checked) {
      return contains(ad.offer.features, `parking`);
    }
    if (featuresMap.washer.checked) {
      return contains(ad.offer.features, `washer`);
    }
    if (featuresMap.elevator.checked) {
      return contains(ad.offer.features, `elevator`);
    }
    if (featuresMap.conditioner.checked) {
      return contains(ad.offer.features, `conditioner`);
    }
  };

  const filterPins = (array) => {
    let filteredData = [];
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
