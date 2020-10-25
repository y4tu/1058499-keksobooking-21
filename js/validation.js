'use strict';

(() => {
  const adFormValidation = () => {
    formInputTitle.addEventListener(`invalid`, () => {
      formInputTitle.addEventListener(`input`, () => {

      });
    });
    formInputRooms.addEventListener(`invalid`, (evt) => {
      evt.preventDefault();
      if (housingRoomsOptions.textContent === `1 комната` && housingGuestsOptions.textContent !== `для 1 гостя`) {
        formInputRooms.setCustomValidity(`Количество комнат не соответствует количеству гостей`);
      } else if (housingRoomsOptions.textContent === `2 комнаты` && housingGuestsOptions.textContent !== `для 2 гостей`) {
        formInputRooms.setCustomValidity(`Количество комнат не соответствует количеству гостей`);
      } else if (housingRoomsOptions.textContent === `3 комнаты` && housingGuestsOptions.textContent !== `для 3 гостей`) {
        formInputRooms.setCustomValidity(`Количество комнат не соответствует количеству гостей`);
      } else if (housingRoomsOptions.textContent === `100 комнат` && housingGuestsOptions.textContent !== `не для гостей`) {
        formInputRooms.setCustomValidity(`Количество комнат не соответствует количеству гостей`);
      } else {
        formInputRooms.setCustomValidity(``);
      }
    });
  };

  const onFormSubmit = () => {
    adFormSubmit.addEventListener(`submit`, () => {
      adFormValidation();
    });
  };


})();
