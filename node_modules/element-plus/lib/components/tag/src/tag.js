'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const tagProps = props.buildProps({
  closable: Boolean,
  type: {
    type: String,
    values: ["success", "info", "warning", "danger", ""],
    default: ""
  },
  hit: Boolean,
  disableTransitions: Boolean,
  color: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    values: ["large", "default", "small"]
  },
  effect: {
    type: String,
    values: ["dark", "light", "plain"],
    default: "light"
  }
});
const tagEmits = {
  close: (evt) => evt instanceof MouseEvent,
  click: (evt) => evt instanceof MouseEvent
};

exports.tagEmits = tagEmits;
exports.tagProps = tagProps;
//# sourceMappingURL=tag.js.map
