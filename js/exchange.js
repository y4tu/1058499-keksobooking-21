'use strict';

(() => {
  const DOWNLOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const StatusCode = {
    OK: 200,
  };
  const TIMEOUT_IN_MS = 10000;

  const download = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, DOWNLOAD_URL);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}. Перезагрузите страницу.`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения. Перезагрузите страницу.`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс. Перезагрузите страницу.`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.send();
  };

  window.exchange = {
    download,
  };
})();
