'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../types.js');
var error = require('../error.js');
var shared = require('@vue/shared');
var core = require('@vueuse/core');

const SCOPE = "utils/vue/style";
function addUnit(value, defaultUnit = "px") {
  if (!value)
    return "";
  if (shared.isString(value)) {
    return value;
  } else if (core.isNumber(value)) {
    return `${value}${defaultUnit}`;
  }
  error.debugWarn(SCOPE, "binding value must be a string or number");
}

exports.addUnit = addUnit;
//# sourceMappingURL=style.js.map
