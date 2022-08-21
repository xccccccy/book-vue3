'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const tooltipV2RootProps = props.buildProps({
  delayDuration: {
    type: Number,
    default: 300
  },
  defaultOpen: Boolean,
  open: {
    type: Boolean,
    default: void 0
  },
  onOpenChange: {
    type: props.definePropType(Function)
  },
  "onUpdate:open": {
    type: props.definePropType(Function)
  }
});

exports.tooltipV2RootProps = tooltipV2RootProps;
//# sourceMappingURL=root.js.map
