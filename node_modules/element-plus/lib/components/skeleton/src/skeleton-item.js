'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const skeletonItemProps = props.buildProps({
  variant: {
    type: String,
    values: [
      "circle",
      "rect",
      "h1",
      "h3",
      "text",
      "caption",
      "p",
      "image",
      "button"
    ],
    default: "text"
  }
});

exports.skeletonItemProps = skeletonItemProps;
//# sourceMappingURL=skeleton-item.js.map
