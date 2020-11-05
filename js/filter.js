'use strict';

(() => {
  const mainMap = document.querySelector(`.map`);
  const mapFilters = mainMap.querySelector(`.map__filters`);
  const housingType = mapFilters.querySelector(`#housing-type`);

  const filterType = (data, type) => {
    let array = [];

    if (type !== `any`) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].offer.type === type) {
          array.push(data[i]);
        }
      }
    }

    return array;
  };

  const filterPinQantity = (array) => {
    return array.slice(0, 5);
  };

  window.filter = {
    mapFilters,
    housingType,
    filterPinQantity,
    filterType,
  };
})();
