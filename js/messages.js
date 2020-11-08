'use strict';

const main = document.querySelector(`main`);
const errorTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);
const successTemplate = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);

const showErrorMessage = (errorMessage) => {
  main.appendChild(errorTemplate.cloneNode(true));

  const errorText = document.querySelector(`.error__message`);

  errorText.textContent = errorMessage;

  const messagePopup = document.querySelector(`.error`);

  const dropMessage = () => {
    main.removeChild(messagePopup);
    document.removeEventListener(`keydown`, onEscKeydown);
  };

  const onClick = () => {
    if (main.contains(messagePopup)) {
      dropMessage();
    }
  };

  const onEscKeydown = (evt) => {
    if (evt.key === `Escape` && main.contains(messagePopup)) {
      dropMessage();
    }
  };

  messagePopup.addEventListener(`click`, onClick);
  document.addEventListener(`keydown`, onEscKeydown);
};

const showSuccessMessage = () => {
  main.appendChild(successTemplate.cloneNode(true));

  const messagePopup = document.querySelector(`.success`);

  const dropMessage = () => {
    main.removeChild(messagePopup);
    document.removeEventListener(`keydown`, onEscKeydown);
  };

  const onClick = () => {
    if (main.contains(messagePopup)) {
      dropMessage();
    }
  };

  const onEscKeydown = (evt) => {
    if (evt.key === `Escape` && main.contains(messagePopup)) {
      dropMessage();
    }
  };

  messagePopup.addEventListener(`click`, onClick);
  document.addEventListener(`keydown`, onEscKeydown);
};

window.messages = {
  showErrorMessage,
  showSuccessMessage,
};
