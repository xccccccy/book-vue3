'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var iconsVue = require('@element-plus/icons-vue');
var props = require('../../../utils/vue/props.js');

const IconMap = {
  success: "icon-success",
  warning: "icon-warning",
  error: "icon-error",
  info: "icon-info"
};
const IconComponentMap = {
  [IconMap.success]: iconsVue.CircleCheckFilled,
  [IconMap.warning]: iconsVue.WarningFilled,
  [IconMap.error]: iconsVue.CircleCloseFilled,
  [IconMap.info]: iconsVue.InfoFilled
};
const resultProps = props.buildProps({
  title: {
    type: String,
    default: ""
  },
  subTitle: {
    type: String,
    default: ""
  },
  icon: {
    values: ["success", "warning", "info", "error"],
    default: "info"
  }
});

exports.IconComponentMap = IconComponentMap;
exports.IconMap = IconMap;
exports.resultProps = resultProps;
//# sourceMappingURL=result.js.map
