'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');
var typescript = require('../../../utils/typescript.js');

const tabBar = props.buildProps({
  tabs: {
    type: props.definePropType(Array),
    default: () => typescript.mutable([])
  }
});

exports.tabBar = tabBar;
//# sourceMappingURL=tab-bar.js.map
