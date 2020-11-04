'use strict';

(() => {
  const API_URL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 10000;

  const StatusCode = {
    OK: 200,
  };

  const download = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, `${API_URL}/data`);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}.`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения.`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс.`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.send();
  };

  const upload = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`POST`, `${API_URL}`);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess();
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}.`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения.`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс.`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`POST`, API_URL);
    xhr.send(data);
  };

  window.backend = {
    download,
    upload,
  };
})();
