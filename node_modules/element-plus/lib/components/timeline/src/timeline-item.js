'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');
var icon = require('../../../utils/vue/icon.js');

const timelineItemProps = props.buildProps({
  timestamp: {
    type: String,
    default: ""
  },
  hideTimestamp: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String,
    default: "bottom"
  },
  type: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    default: "normal"
  },
  icon: {
    type: icon.iconPropType,
    default: ""
  },
  hollow: {
    type: Boolean,
    default: false
  }
});

exports.timelineItemProps = timelineItemProps;
//# sourceMappingURL=timeline-item.js.map
