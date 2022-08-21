'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./src/index.js');
require('./src/transfer.js');
var event = require('../../constants/event.js');

index["default"].install = (app) => {
  app.component(index["default"].name, index["default"]);
};
const _Transfer = index["default"];
const ElTransfer = _Transfer;

exports.CHANGE_EVENT = event.CHANGE_EVENT;
exports.ElTransfer = ElTransfer;
exports["default"] = _Transfer;
//# sourceMappingURL=index.js.map
