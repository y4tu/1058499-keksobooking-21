'use strict';

const MAP_PIN_MAIN_OFFSET_X = 65;
const MAP_PIN_MAIN_OFFSET_Y = 65;
const TAIL = 22;

const Borders = {
  TOP: 130,
  BOTTOM: 630,
  LEFT: 0,
  RIGHT: 1200,
};

const limits = {
  top: Math.floor(Borders.TOP - MAP_PIN_MAIN_OFFSET_Y / 2 - TAIL),
  bottom: Math.floor(Borders.BOTTOM - MAP_PIN_MAIN_OFFSET_Y / 2 - TAIL),
  left: Math.floor(Borders.LEFT - MAP_PIN_MAIN_OFFSET_X / 2),
  right: Math.floor(Borders.RIGHT - MAP_PIN_MAIN_OFFSET_X / 2),
};

const moveElement = (targetElement, drivenElement) => {
  const onTargetElementMouseMove = (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (parseInt(drivenElement.style.top, 10) > limits.bottom) {
        drivenElement.style.top = `${limits.bottom}px`;
      } else if (parseInt(drivenElement.style.top, 10) < limits.top) {
        drivenElement.style.top = `${limits.top}px`;
      } else {
        drivenElement.style.top = `${drivenElement.offsetTop - shift.y}px`;
      }

      if (parseInt(drivenElement.style.left, 10) > limits.right) {
        drivenElement.style.left = `${limits.right}px`;
      } else if (parseInt(drivenElement.style.left, 10) < limits.left) {
        drivenElement.style.left = `${limits.left}px`;
      } else {
        drivenElement.style.left = `${drivenElement.offsetLeft - shift.x}px`;
      }

      window.form.calcAdAddress(
          parseInt(drivenElement.style.left, 10),
          parseInt(drivenElement.style.top, 10)
      );
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  targetElement.addEventListener(`mousedown`, onTargetElementMouseMove);
};

window.dragAndDrop = {
  moveElement,
};
