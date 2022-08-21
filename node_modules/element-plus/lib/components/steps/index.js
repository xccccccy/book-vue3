'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var index = require('./src/index.js');
var item = require('./src/item.js');
var install = require('../../utils/vue/install.js');

const ElSteps = install.withInstall(index["default"], {
  Step: item["default"]
});
const ElStep = install.withNoopInstall(item["default"]);

exports.ElStep = ElStep;
exports.ElSteps = ElSteps;
exports["default"] = ElSteps;
//# sourceMappingURL=index.js.map
