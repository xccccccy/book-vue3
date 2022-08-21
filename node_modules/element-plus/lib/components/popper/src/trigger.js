'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../../utils/index.js');
var props = require('../../../utils/vue/props.js');

const usePopperTriggerProps = props.buildProps({
  virtualRef: {
    type: props.definePropType(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: Function,
  onMouseleave: Function,
  onClick: Function,
  onKeydown: Function,
  onFocus: Function,
  onBlur: Function,
  onContextmenu: Function,
  id: String,
  open: Boolean
});

exports.usePopperTriggerProps = usePopperTriggerProps;
//# sourceMappingURL=trigger.js.map
