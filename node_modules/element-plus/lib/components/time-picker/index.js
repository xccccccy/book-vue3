'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var timePicker = require('./src/time-picker.js');
var picker = require('./src/common/picker.js');
var panelTimePick = require('./src/time-picker-com/panel-time-pick.js');
var dateUtils = require('./src/common/date-utils.js');
var constant = require('./src/common/constant.js');
var props = require('./src/common/props.js');

const _TimePicker = timePicker["default"];
_TimePicker.install = (app) => {
  app.component(_TimePicker.name, _TimePicker);
};
const ElTimePicker = _TimePicker;

exports.CommonPicker = picker["default"];
exports.TimePickPanel = panelTimePick["default"];
exports.extractDateFormat = dateUtils.extractDateFormat;
exports.extractTimeFormat = dateUtils.extractTimeFormat;
exports.rangeArr = dateUtils.rangeArr;
exports.DEFAULT_FORMATS_DATE = constant.DEFAULT_FORMATS_DATE;
exports.DEFAULT_FORMATS_DATEPICKER = constant.DEFAULT_FORMATS_DATEPICKER;
exports.DEFAULT_FORMATS_TIME = constant.DEFAULT_FORMATS_TIME;
exports.timePickerDefaultProps = props.timePickerDefaultProps;
exports.ElTimePicker = ElTimePicker;
exports["default"] = _TimePicker;
//# sourceMappingURL=index.js.map
