'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const thumbProps = props.buildProps({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true
  },
  always: Boolean
});

exports.thumbProps = thumbProps;
//# sourceMappingURL=thumb.js.map
