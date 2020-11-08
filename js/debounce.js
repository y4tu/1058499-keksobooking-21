'use strict';

(() => {
  const DEBOUNCE_INTERVAL = 300;

  const execute = (cb) => {
    let lastTimeout = null;

    return (parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = {
    execute,
  };
})();
