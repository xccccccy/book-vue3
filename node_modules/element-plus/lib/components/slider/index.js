'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./src/index.js');
require('./src/slider.type.js');

index["default"].install = (app) => {
  app.component(index["default"].name, index["default"]);
};
const _Slider = index["default"];
const ElSlider = _Slider;

exports.ElSlider = ElSlider;
exports["default"] = _Slider;
//# sourceMappingURL=index.js.map
