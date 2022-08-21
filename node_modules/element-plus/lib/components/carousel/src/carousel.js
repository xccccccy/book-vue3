'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');
var core = require('@vueuse/core');

const carouselProps = props.buildProps({
  initialIndex: {
    type: Number,
    default: 0
  },
  height: { type: String, default: "" },
  trigger: {
    type: String,
    default: "hover"
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3e3
  },
  indicatorPosition: { type: String, default: "" },
  indicator: {
    type: Boolean,
    default: true
  },
  arrow: {
    type: String,
    default: "hover"
  },
  type: { type: String, default: "" },
  loop: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    default: "horizontal",
    validator(val) {
      return ["horizontal", "vertical"].includes(val);
    }
  },
  pauseOnHover: {
    type: Boolean,
    default: true
  }
});
const carouselEmits = {
  change: (current, prev) => [current, prev].every(core.isNumber)
};

exports.carouselEmits = carouselEmits;
exports.carouselProps = carouselProps;
//# sourceMappingURL=carousel.js.map
