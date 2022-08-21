'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
require('../../../constants/index.js');
var props = require('../../../utils/vue/props.js');
var icon = require('../../../utils/vue/icon.js');
var validator = require('../../../utils/vue/validator.js');
var event = require('../../../constants/event.js');
var core = require('@vueuse/core');
var shared = require('@vue/shared');

const switchProps = props.buildProps({
  modelValue: {
    type: [Boolean, String, Number],
    default: false
  },
  value: {
    type: [Boolean, String, Number],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 40
  },
  inlinePrompt: {
    type: Boolean,
    default: false
  },
  activeIcon: {
    type: icon.iconPropType,
    default: ""
  },
  inactiveIcon: {
    type: icon.iconPropType,
    default: ""
  },
  activeText: {
    type: String,
    default: ""
  },
  inactiveText: {
    type: String,
    default: ""
  },
  activeColor: {
    type: String,
    default: ""
  },
  inactiveColor: {
    type: String,
    default: ""
  },
  borderColor: {
    type: String,
    default: ""
  },
  activeValue: {
    type: [Boolean, String, Number],
    default: true
  },
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false
  },
  name: {
    type: String,
    default: ""
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  id: String,
  loading: {
    type: Boolean,
    default: false
  },
  beforeChange: {
    type: props.definePropType(Function)
  },
  size: {
    type: String,
    validator: validator.isValidComponentSize
  }
});
const switchEmits = {
  [event.UPDATE_MODEL_EVENT]: (val) => core.isBoolean(val) || shared.isString(val) || core.isNumber(val),
  [event.CHANGE_EVENT]: (val) => core.isBoolean(val) || shared.isString(val) || core.isNumber(val),
  [event.INPUT_EVENT]: (val) => core.isBoolean(val) || shared.isString(val) || core.isNumber(val)
};

exports.switchEmits = switchEmits;
exports.switchProps = switchProps;
//# sourceMappingURL=switch.js.map
