'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat.js');
var constant = require('./common/constant.js');
var picker = require('./common/picker.js');
var panelTimePick = require('./time-picker-com/panel-time-pick.js');
var panelTimeRange = require('./time-picker-com/panel-time-range.js');
var props = require('./common/props.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
var customParseFormat__default = /*#__PURE__*/_interopDefaultLegacy(customParseFormat);

dayjs__default["default"].extend(customParseFormat__default["default"]);
var TimePicker = vue.defineComponent({
  name: "ElTimePicker",
  install: null,
  props: {
    ...props.timePickerDefaultProps,
    isRange: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const commonPicker = vue.ref(null);
    const type = props.isRange ? "timerange" : "time";
    const panel = props.isRange ? panelTimeRange["default"] : panelTimePick["default"];
    const refProps = {
      ...props,
      focus: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.handleFocus();
      },
      blur: () => {
        var _a;
        (_a = commonPicker.value) == null ? void 0 : _a.handleBlur();
      }
    };
    vue.provide("ElPopperOptions", props.popperOptions);
    ctx.expose(refProps);
    return () => {
      var _a;
      const format = (_a = props.format) != null ? _a : constant.DEFAULT_FORMATS_TIME;
      return vue.h(picker["default"], {
        ...props,
        format,
        type,
        ref: commonPicker,
        "onUpdate:modelValue": (value) => ctx.emit("update:modelValue", value)
      }, {
        default: (scopedProps) => vue.h(panel, scopedProps)
      });
    };
  }
});

exports["default"] = TimePicker;
//# sourceMappingURL=time-picker.js.map
