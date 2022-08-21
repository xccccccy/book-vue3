'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@popperjs/core');
require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const POSITIONING_STRATEGIES = ["fixed", "absolute"];
const usePopperCoreConfigProps = props.buildProps({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: props.definePropType(Array),
    default: () => []
  },
  gpuAcceleration: {
    type: Boolean,
    default: true
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String,
    values: core.placements,
    default: "bottom"
  },
  popperOptions: {
    type: props.definePropType(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: POSITIONING_STRATEGIES,
    default: "absolute"
  }
});
const usePopperContentProps = props.buildProps({
  ...usePopperCoreConfigProps,
  style: { type: props.definePropType([String, Array, Object]) },
  className: { type: props.definePropType([String, Array, Object]) },
  effect: {
    type: String,
    default: "dark"
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: true
  },
  pure: Boolean,
  popperClass: {
    type: props.definePropType([String, Array, Object])
  },
  popperStyle: {
    type: props.definePropType([String, Array, Object])
  },
  referenceEl: {
    type: props.definePropType(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  zIndex: Number
});

exports.usePopperContentProps = usePopperContentProps;
exports.usePopperCoreConfigProps = usePopperCoreConfigProps;
//# sourceMappingURL=content.js.map
