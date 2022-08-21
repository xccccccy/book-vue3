'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const carouselItemProps = props.buildProps({
  name: { type: String, default: "" },
  label: {
    type: [String, Number],
    default: ""
  }
});

exports.carouselItemProps = carouselItemProps;
//# sourceMappingURL=carousel-item.js.map
