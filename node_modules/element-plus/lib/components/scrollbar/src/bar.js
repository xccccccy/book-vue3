'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const barProps = props.buildProps({
  always: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: ""
  },
  height: {
    type: String,
    default: ""
  },
  ratioX: {
    type: Number,
    default: 1
  },
  ratioY: {
    type: Number,
    default: 1
  }
});

exports.barProps = barProps;
//# sourceMappingURL=bar.js.map
