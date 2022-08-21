'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../utils/index.js');
var row = require('./src/row.js');
var install = require('../../utils/vue/install.js');

const ElRow = install.withInstall(row["default"]);

exports.rowProps = row.rowProps;
exports.ElRow = ElRow;
exports["default"] = ElRow;
//# sourceMappingURL=index.js.map
