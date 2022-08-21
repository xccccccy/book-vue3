'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var lodashUnified = require('lodash-unified');
require('../types.js');
require('../objects.js');
var shared = require('@vue/shared');

const wrapperKey = Symbol();
const propKey = "__elPropsReservedKey";
function buildProp(option, key) {
  if (!shared.isObject(option) || !!option[propKey])
    return option;
  const { values, required, default: defaultValue, type, validator } = option;
  const _validator = values || validator ? (val) => {
    let valid = false;
    let allowedValues = [];
    if (values) {
      allowedValues = Array.from(values);
      if (shared.hasOwn(option, "default")) {
        allowedValues.push(defaultValue);
      }
      valid || (valid = allowedValues.includes(val));
    }
    if (validator)
      valid || (valid = validator(val));
    if (!valid && allowedValues.length > 0) {
      const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
      vue.warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
    }
    return valid;
  } : void 0;
  const prop = {
    type: shared.isObject(type) && Object.getOwnPropertySymbols(type).includes(wrapperKey) ? type[wrapperKey] : type,
    required: !!required,
    validator: _validator,
    [propKey]: true
  };
  if (shared.hasOwn(option, "default"))
    prop.default = defaultValue;
  return prop;
}
const buildProps = (props) => lodashUnified.fromPairs(Object.entries(props).map(([key, option]) => [
  key,
  buildProp(option, key)
]));
const definePropType = (val) => ({ [wrapperKey]: val });

exports.buildProp = buildProp;
exports.buildProps = buildProps;
exports.definePropType = definePropType;
exports.propKey = propKey;
//# sourceMappingURL=props.js.map
