'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const EventHandler = {
  type: props.definePropType(Function)
};
const tooltipV2TriggerProps = props.buildProps({
  onBlur: EventHandler,
  onClick: EventHandler,
  onFocus: EventHandler,
  onMouseDown: EventHandler,
  onMouseEnter: EventHandler,
  onMouseLeave: EventHandler
});

exports.tooltipV2TriggerProps = tooltipV2TriggerProps;
//# sourceMappingURL=trigger.js.map
