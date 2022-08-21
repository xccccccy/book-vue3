'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
require('../../popper/index.js');
require('../../../hooks/index.js');
var props = require('../../../utils/vue/props.js');
var index = require('../../../hooks/use-delayed-toggle/index.js');
var content = require('../../popper/src/content.js');
var index$1 = require('../../../hooks/use-popper-container/index.js');
var trigger = require('../../popper/src/trigger.js');

const triggers = ["hover", "focus", "click", "contextmenu"];
const useTooltipContentProps = props.buildProps({
  ...index.useDelayedToggleProps,
  ...content.usePopperContentProps,
  appendTo: {
    type: props.definePropType([String, Object]),
    default: index$1.POPPER_CONTAINER_SELECTOR
  },
  content: {
    type: String,
    default: ""
  },
  rawContent: {
    type: Boolean,
    default: false
  },
  persistent: Boolean,
  ariaLabel: String,
  visible: {
    type: props.definePropType(Boolean),
    default: null
  },
  transition: {
    type: String,
    default: "el-fade-in-linear"
  },
  teleported: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean
  }
});
const useTooltipTriggerProps = props.buildProps({
  ...trigger.usePopperTriggerProps,
  disabled: Boolean,
  trigger: {
    type: props.definePropType([String, Array]),
    default: "hover"
  }
});
const useTooltipProps = props.buildProps({
  openDelay: {
    type: Number
  },
  visibleArrow: {
    type: Boolean,
    default: void 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  showArrow: {
    type: Boolean,
    default: true
  }
});

exports.useTooltipContentProps = useTooltipContentProps;
exports.useTooltipProps = useTooltipProps;
exports.useTooltipTriggerProps = useTooltipTriggerProps;
//# sourceMappingURL=tooltip.js.map
