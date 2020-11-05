'use strict';

(() => {
  const mainMap = document.querySelector(`.map`);
  const mapFilters = mainMap.querySelector(`.map__filters`);
  const housingType = mapFilters.querySelector(`#housing-type`);

  // const filterType = (data) => {
  //   data.filter(item => item.offer.type.value);
  // };
  //
  //
  //
  //
  // const filterFunction = (array, property, propertyValue) => {
  //   array.forEach((item) => {
  //     if
  //   })
  //
  //   if (property !== `any` && property === propertyValue) {
  //     array.filter(() => property === propertyValue);
  //   }
  // };

  const filterPinQantity = (array) => {
    return array.slice(0, 5);
  };

  window.filter = {
    mapFilters,
    housingType,
    filterPinQantity,
    // filterType,
  };
})();
