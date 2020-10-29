'use strict';

(() => {
  const moveElement = (targetElement, drivenElement) => {
    targetElement.addEventListener(`mousedown`, (evt) => {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let dragged = false;

      window.form.calcAdAddress(
          parseInt(drivenElement.style.left, 10),
          parseInt(drivenElement.style.top, 10)
      );

      const borders = {
        top: 130,
        bottom: 630,
        left: 0,
        right: 1200,
      };

      const limits = {
        top: Math.round(borders.top - window.form.MAP_PIN_MAIN_OFFSET_Y / 2 - window.form.TAIL),
        bottom: Math.round(borders.bottom - window.form.MAP_PIN_MAIN_OFFSET_Y / 2 - window.form.TAIL),
        left: Math.round(borders.left - window.form.MAP_PIN_MAIN_OFFSET_X / 2),
        right: Math.round(borders.right - window.form.MAP_PIN_MAIN_OFFSET_X / 2),
      };

      const onMouseMove = function (moveEvt) {
        dragged = true;

        moveEvt.preventDefault();

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        const pinLimitation = () => {
          if (parseInt(drivenElement.style.top, 10) > limits.bottom) {
            drivenElement.style.top = `${limits.bottom}px`;
          } else if (parseInt(drivenElement.style.top, 10) < limits.top) {
            drivenElement.style.top = `${limits.top}px`;
          } else if (parseInt(drivenElement.style.left, 10) > limits.right) {
            drivenElement.style.left = `${limits.right}px`;
          } else if (parseInt(drivenElement.style.left, 10) < limits.left) {
            drivenElement.style.left = `${limits.left}px`;
          } else {
            drivenElement.style.top = (drivenElement.offsetTop - shift.y) + `px`;
            drivenElement.style.left = (drivenElement.offsetLeft - shift.x) + `px`;
          }
        };

        pinLimitation();

        window.form.calcAdAddress(
            parseInt(drivenElement.style.left, 10),
            parseInt(drivenElement.style.top, 10)
        );
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        if (dragged) {
          const onClickPreventDefault = (clickEvt) => {
            clickEvt.preventDefault();
            targetElement.removeEventListener(`click`, onClickPreventDefault);
          };
          targetElement.addEventListener(`click`, onClickPreventDefault);
        }
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };

  window.gragAndDrop = {
    moveElement,
  };
})();
