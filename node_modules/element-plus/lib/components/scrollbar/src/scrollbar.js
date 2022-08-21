'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');
var core = require('@vueuse/core');

const scrollbarProps = props.buildProps({
  height: {
    type: [String, Number],
    default: ""
  },
  maxHeight: {
    type: [String, Number],
    default: ""
  },
  native: {
    type: Boolean,
    default: false
  },
  wrapStyle: {
    type: props.definePropType([String, Object, Array]),
    default: ""
  },
  wrapClass: {
    type: [String, Array],
    default: ""
  },
  viewClass: {
    type: [String, Array],
    default: ""
  },
  viewStyle: {
    type: [String, Array, Object],
    default: ""
  },
  noresize: Boolean,
  tag: {
    type: String,
    default: "div"
  },
  always: {
    type: Boolean,
    default: false
  },
  minSize: {
    type: Number,
    default: 20
  }
});
const scrollbarEmits = {
  scroll: ({
    scrollTop,
    scrollLeft
  }) => core.isNumber(scrollTop) && core.isNumber(scrollLeft)
};

exports.scrollbarEmits = scrollbarEmits;
exports.scrollbarProps = scrollbarProps;
//# sourceMappingURL=scrollbar.js.map
