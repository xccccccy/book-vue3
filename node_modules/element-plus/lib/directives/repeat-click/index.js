'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var event = require('../../utils/dom/event.js');

var RepeatClick = {
  beforeMount(el, binding) {
    let interval = null;
    let startTime;
    const handler = () => binding.value && binding.value();
    const clear = () => {
      if (Date.now() - startTime < 100) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };
    event.on(el, "mousedown", (e) => {
      if (e.button !== 0)
        return;
      startTime = Date.now();
      event.once(document, "mouseup", clear);
      clearInterval(interval);
      interval = setInterval(handler, 100);
    });
  }
};

exports["default"] = RepeatClick;
//# sourceMappingURL=index.js.map
