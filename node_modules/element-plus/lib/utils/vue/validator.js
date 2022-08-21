'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../constants/index.js');
var size = require('../../constants/size.js');
var datePick = require('../../constants/date-pick.js');

const isValidComponentSize = (val) => ["", ...size.componentSizes].includes(val);
const isValidDatePickType = (val) => [...datePick.datePickTypes].includes(val);

exports.isValidComponentSize = isValidComponentSize;
exports.isValidDatePickType = isValidDatePickType;
//# sourceMappingURL=validator.js.map
