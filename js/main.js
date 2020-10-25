"use strict";
//
//
//
//
// const mapFiltersFieldset = mapFilters.querySelector(`.map__features`);
// const adFormInputAddress = adForm.querySelector(`input[name="address"]`);
// const adFormSubmit = adForm.querySelector(`.ad-form__submit`);
// const formInputTitle = adForm.querySelector(`select[name="title"]`);
// const formInputType = adForm.querySelector(`select[name="type"]`);
// const formInputPrice = adForm.querySelector(`select[name="price"]`);
// const formInputTimeIn = adForm.querySelector(`select[name="timein"]`);
// const formInputTimeOut = adForm.querySelector(`select[name="timeout"]`);
// const formInputRooms = adForm.querySelector(`select[name="rooms"]`);
// const formInputGuests = adForm.querySelector(`select[name="capacity"]`);
// const housingRoomsOptions = formInputRooms.querySelectorAll(`option`);
// const housingGuestsOptions = formInputRooms.querySelectorAll(`option`);

(() => {
  const ADS_NUMBER = 8;
  const mapMainPin = window.map.mainMap.querySelector(`.map__pin--main`);
  const ads = window.data.generateAds(ADS_NUMBER);


  window.map.deActivatePage();

  mapMainPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0 && window.map.isPageActive !== true) {
      window.map.renderPins(ads);
      window.map.activatePage();
      window.map.calcAdAddress();
    }
  });

  mapMainPin.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter` && window.map.isPageActive !== true) {
      window.map.renderPins(ads);
      window.map.activatePage();
      window.map.calcAdAddress();
    }
  });
})();

