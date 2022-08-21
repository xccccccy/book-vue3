'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
require('../../utils/index.js');
require('../../constants/index.js');
var aria = require('../../constants/aria.js');
var event = require('../../utils/dom/event.js');

const useEscapeKeydown = (handler) => {
  const cachedHandler = (e) => {
    const event = e;
    if (event.key === aria.EVENT_CODE.esc) {
      handler == null ? void 0 : handler(event);
    }
  };
  vue.onMounted(() => {
    event.on(document, "keydown", cachedHandler);
  });
  vue.onBeforeUnmount(() => {
    event.off(document, "keydown", cachedHandler);
  });
};

exports.useEscapeKeydown = useEscapeKeydown;
//# sourceMappingURL=index.js.map
