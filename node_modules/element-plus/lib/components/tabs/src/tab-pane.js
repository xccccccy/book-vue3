'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const tabPaneProps = props.buildProps({
  label: {
    type: String,
    default: ""
  },
  name: {
    type: [String, Number],
    default: ""
  },
  closable: Boolean,
  disabled: Boolean,
  lazy: Boolean
});

exports.tabPaneProps = tabPaneProps;
//# sourceMappingURL=tab-pane.js.map
